#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.11"
# dependencies = ["rdflib"]
# ///
"""OWL to MASP converter.

Converts an OWL ontology into a MASP schema crate (schemas/<name>/schema-crate/
ro-crate-metadata.json). See scripts/owl-to-masp.spec.md for the design spec
this implementation follows -- update the spec first if the design changes.

Usage:
    uv run scripts/owl-to-masp.py \
        --input https://www.ica.org/standards/RiC/RiC-O_1-1.rdf \
        --output-dir schemas/ric \
        --namespace https://www.ica.org/standards/RiC/ontology# \
        --name "Records in Context Ontology"

--input is repeatable: give it more than once to merge several ontologies
into a single schema crate (see spec: "Merging multiple ontologies into one
schema"), e.g.:
    uv run scripts/owl-to-masp.py \
        --input schemas/lexinfo/lexinfo.owl \
        --input https://www.w3.org/ns/lemon/ontolex \
        --input https://www.w3.org/ns/lemon/synsem \
        --output-dir schemas/lexinfo \
        --name "LexInfo + OntoLex-Lemon (core, synsem)"
"""

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import urlopen

from rdflib import OWL, RDF, RDFS, SKOS, XSD, BNode, Graph, Namespace, URIRef

LEXINFO = Namespace("http://www.lexinfo.net/ontology/3.0/lexinfo#")

# Annotation properties carrying usage examples of a term, all ported to
# skos:example (see spec: "Usage examples"). lexinfo:example is LexInfo's own
# frame-usage annotation, e.g. "his reputation SANK low".
EXAMPLE_PREDICATES = (SKOS.example, LEXINFO.example)
SKOS_PREFIX = str(SKOS)

XSD_TO_SCHEMA = {
    str(XSD.string): "schema:Text",
    str(XSD.normalizedString): "schema:Text",
    str(XSD.token): "schema:Text",
    str(XSD.language): "schema:Text",
    str(XSD.boolean): "schema:Boolean",
    str(XSD.date): "schema:Date",
    str(XSD.dateTime): "schema:DateTime",
    str(XSD.integer): "schema:Integer",
    str(XSD.int): "schema:Integer",
    str(XSD.nonNegativeInteger): "schema:Integer",
    str(XSD.positiveInteger): "schema:Integer",
    str(XSD.decimal): "schema:Number",
    str(XSD.float): "schema:Number",
    str(XSD.double): "schema:Number",
    str(XSD.anyURI): "schema:URL",
}

RDFLIB_FORMAT_BY_EXTENSION = {
    ".rdf": "xml",
    ".owl": "xml",
    ".ttl": "turtle",
    ".n3": "n3",
    ".nt": "nt",
    ".jsonld": "json-ld",
    ".json": "json-ld",
}

ENCODING_FORMAT_BY_EXTENSION = {
    ".rdf": "application/rdf+xml",
    ".owl": "application/rdf+xml",
    ".ttl": "text/turtle",
    ".n3": "text/n3",
    ".nt": "application/n-triples",
    ".jsonld": "application/ld+json",
    ".json": "application/ld+json",
}

RESOURCE_DESCRIPTOR_ID = "#hasSpecializedSchema"
CREATE_ACTION_ID = "#owl-to-masp-conversion"
SCRIPT_URL = "https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/scripts/owl-to-masp.py"


def parse_args(argv=None):
    parser = argparse.ArgumentParser(description="Convert an OWL ontology into a MASP schema crate")
    parser.add_argument(
        "-i",
        "--input",
        required=True,
        action="append",
        help="Path or URL to an OWL file. Repeatable -- give it more than once to merge several "
        "ontologies into a single schema crate.",
    )
    parser.add_argument("-o", "--output-dir", required=True, help="Output directory, e.g. schemas/ric")
    parser.add_argument(
        "-n",
        "--namespace",
        action="append",
        default=None,
        help="Only convert classes/properties whose IRI starts with this prefix (default: no filtering). "
        "Repeatable -- a term matching any one of the given prefixes is included.",
    )
    parser.add_argument("--name", help="Human-readable schema name for schema-text.md")
    parser.add_argument(
        "--describe-restrictions",
        action="store_true",
        help='Append each class\'s OWL restrictions to its rdfs:comment as "Constraints: ..." '
        '(e.g. "exactly 1 headword"). See spec: "Describing restrictions".',
    )
    parser.add_argument(
        "--flatten-mixins",
        action="store_true",
        help="Don't emit mixin classes (undeclared classes, and unlabelled, uncommented superclasses such as "
        "DMLex's HasLabel); move their properties' domains onto the real classes that use them. "
        'See spec: "Flattening mixin classes".',
    )
    return parser.parse_args(argv)


def fetch_input(source):
    parsed = urlparse(source)
    if parsed.scheme in ("http", "https"):
        with urlopen(source) as response:  # noqa: S310 - deliberate, user-supplied ontology URL
            raw_bytes = response.read()
        filename = Path(parsed.path).name or "ontology.owl"
    else:
        path = Path(source)
        raw_bytes = path.read_bytes()
        filename = path.name
    return raw_bytes, filename


def guess_formats(filename):
    ext = Path(filename).suffix.lower()
    rdflib_format = RDFLIB_FORMAT_BY_EXTENSION.get(ext)
    encoding_format = ENCODING_FORMAT_BY_EXTENSION.get(ext)
    if rdflib_format is None:
        print(f"warning: unrecognised extension {ext!r} for {filename}, assuming RDF/XML", file=sys.stderr)
        rdflib_format = "xml"
    if encoding_format is None:
        print(f"warning: no encodingFormat mapping for extension {ext!r} on {filename}", file=sys.stderr)
    return rdflib_format, encoding_format


def load_ontology(sources):
    """Fetch and parse one or more OWL sources into a single shared graph.

    Multiple sources are merged by calling Graph.parse() once per source
    against the same Graph instance -- rdflib already accumulates triples
    across repeated parse() calls, so no separate merge step is needed. This
    is the mechanism behind --input being repeatable (spec: "Merging
    multiple ontologies into one schema").

    Returns (graph, fetched) where fetched is a list of
    (raw_bytes, filename, encoding_format) tuples in input order, for the
    provenance/file-copying step.
    """
    graph = Graph()
    fetched = []
    for source in sources:
        raw_bytes, filename = fetch_input(source)
        rdflib_format, encoding_format = guess_formats(filename)
        graph.parse(data=raw_bytes, format=rdflib_format)
        fetched.append((raw_bytes, filename, encoding_format))
    return graph, fetched


def in_namespace(iri, namespaces):
    """namespaces: None or empty -> no filtering (everything typed
    appropriately is included). A bare string or a list/tuple of prefixes ->
    included iff the IRI starts with at least one of them (a merged,
    multi-source run typically passes one prefix per --input, or none at
    all to admit every source unfiltered -- spec: "Merging multiple
    ontologies into one schema")."""
    if not namespaces:
        return True
    prefixes = (namespaces,) if isinstance(namespaces, str) else tuple(namespaces)
    return any(str(iri).startswith(prefix) for prefix in prefixes)


def preferred_literal(graph, subject, predicate):
    literals = list(graph.objects(subject, predicate))
    if not literals:
        return None
    for literal in literals:
        if getattr(literal, "language", None) == "en":
            return str(literal)
    for literal in literals:
        if getattr(literal, "language", None) is None:
            return str(literal)
    return str(literals[0])


def english_label(graph, subject):
    """The @en rdfs:label, else an untagged one, else None -- never another
    language. Callers fall back to the local name, so a term labelled only
    in other languages (e.g. synsem:isA, whose labels are af/de/es/...) gets
    "isA" rather than whichever label rdflib happens to return first. See
    spec: "Multiple/no rdfs:label".
    """
    labels = list(graph.objects(subject, RDFS.label))
    for language in ("en", None):
        for literal in labels:
            if getattr(literal, "language", None) == language:
                return str(literal)
    return None


def rdf_list_items(graph, list_node):
    items = []
    current = list_node
    while current is not None and current != RDF.nil:
        first = graph.value(current, RDF.first)
        if first is not None:
            items.append(first)
        current = graph.value(current, RDF.rest)
    return items


def resolve_class_expression(graph, node, subject, warn_label):
    """Resolve a domain/range/subClassOf object to a list of named-class IRIs.

    A plain URIRef resolves to itself. A blank node is expanded if it is an
    owl:unionOf of named classes (the idiom RiC-O uses in place of multiple
    rdfs:domain/rdfs:range triples); any other blank node (e.g. an
    owl:Restriction) is dropped with a warning.
    """
    if not isinstance(node, BNode):
        return [str(node)]

    union_of = graph.value(node, OWL.unionOf)
    if union_of is not None:
        resolved = []
        for member in rdf_list_items(graph, union_of):
            if isinstance(member, BNode):
                print(
                    f"warning: skipping blank-node member of owl:unionOf in {warn_label} on {subject}",
                    file=sys.stderr,
                )
                continue
            resolved.append(str(member))
        return resolved

    print(f"warning: skipping blank-node {warn_label} on {subject}", file=sys.stderr)
    return []


def resolve_objects(graph, subject, predicate, warn_label):
    resolved = []
    for obj in graph.objects(subject, predicate):
        resolved.extend(resolve_class_expression(graph, obj, subject, warn_label))
    return resolved


def local_name(iri):
    iri = str(iri)
    if "#" in iri:
        return iri.rsplit("#", 1)[-1]
    return iri.rstrip("/").rsplit("/", 1)[-1]


def label_and_name(graph, subject):
    """MASP/JSON-LD convention (see spec: "Label vs. name"): rdfs:label is the
    bare term itself (matching schema.org, e.g. "isPartOf"), while name carries
    the expanded, human-readable phrase -- which is what OWL's own rdfs:label
    usually holds (e.g. "is part of"). So we swap them on the way in.
    """
    label = local_name(subject)
    expanded = english_label(graph, subject)
    return label, (expanded if expanded is not None else label)


def describe_expression(graph, node):
    """Render an OWL class expression as a short phrase using bare term
    names, e.g. "partOfSpeech some AdjectivePOS" or "IntransitiveFrame and
    at least 1 predicativeAdjective". Returns None for anything not handled.
    """
    if not isinstance(node, BNode):
        return local_name(node)
    for operator, joiner in ((OWL.intersectionOf, " and "), (OWL.unionOf, " or ")):
        members = graph.value(node, operator)
        if members is not None:
            parts = [describe_expression(graph, member) for member in rdf_list_items(graph, members)]
            if not parts or None in parts:
                return None
            return joiner.join(parts)
    on_property = graph.value(node, OWL.onProperty)
    if on_property is None or isinstance(on_property, BNode):
        return None
    prop = local_name(on_property)
    value = graph.value(node, OWL.hasValue)
    if value is not None:
        return f"{prop} = {local_name(value)}"
    for predicate, word in ((OWL.someValuesFrom, "some"), (OWL.allValuesFrom, "only")):
        filler = graph.value(node, predicate)
        if filler is not None:
            filler_text = describe_expression(graph, filler)
            return None if filler_text is None else f"{prop} {word} {filler_text}"
    on_class = graph.value(node, OWL.onClass)
    of_type = f" of type {local_name(on_class)}" if on_class is not None and not isinstance(on_class, BNode) else ""
    for predicates, word in (
        ((OWL.cardinality, OWL.qualifiedCardinality), "exactly"),
        ((OWL.minCardinality, OWL.minQualifiedCardinality), "at least"),
        ((OWL.maxCardinality, OWL.maxQualifiedCardinality), "at most"),
    ):
        for predicate in predicates:
            count = graph.value(node, predicate)
            if count is not None:
                return f"{word} {count} {prop}{of_type}"
    return None


def structural_description(graph, subject, name):
    """Fallback description for a term with no rdfs:comment: its label
    phrase plus what the OWL structure says about it, so terms that share a
    label (e.g. lexinfo:Adjective and lexinfo:AdjectivePOS, both "adjective")
    can be told apart. See spec: "Comment fallback".
    """
    sentences = [name]
    supers = sorted(local_name(o) for o in graph.objects(subject, RDFS.subClassOf) if not isinstance(o, BNode))
    if supers:
        sentences.append(f"A kind of {', '.join(supers)}")
    super_props = sorted(local_name(o) for o in graph.objects(subject, RDFS.subPropertyOf) if not isinstance(o, BNode))
    if super_props:
        sentences.append(f"A sub-property of {', '.join(super_props)}")
    inverses = sorted(local_name(o) for o in graph.objects(subject, OWL.inverseOf) if not isinstance(o, BNode))
    if inverses:
        sentences.append(f"Inverse of {', '.join(inverses)}")
    definitions = sorted(
        text
        for text in (describe_expression(graph, o) for o in graph.objects(subject, OWL.equivalentClass))
        if text is not None
    )
    if definitions:
        sentences.append(f"Equivalent to: {'; '.join(definitions)}")
    return ". ".join(sentences) + "." if len(sentences) > 1 else name


def comment_or_label_fallback(graph, subject, entity):
    """rdfs:comment if the ontology has one; otherwise a description built
    from the label phrase and the term's OWL structure (unless that would
    just repeat the bare term), so readers that only show the description
    (e.g. Crate-O help) still get something useful. See spec: "Comment
    fallback".
    """
    comment = preferred_literal(graph, subject, RDFS.comment)
    if comment is None:
        fallback = structural_description(graph, subject, entity["name"])
        if fallback != entity["rdfs:label"]:
            comment = fallback
    if comment is not None:
        entity["rdfs:comment"] = comment


def usage_examples(graph, subject):
    """Every usage example in every language -- unlike labels, examples in
    different languages are distinct content, not translations, so none are
    dropped. Emitted as plain strings, not {"@value", "@language"} objects:
    ro-crate-excel can't round-trip language-tagged values through the
    synced .xlsx (see spec: "Usage examples"). Sorted for stable output.
    """
    literals = {literal for predicate in EXAMPLE_PREDICATES for literal in graph.objects(subject, predicate)}
    return sorted({str(literal) for literal in literals})


def add_usage_examples(graph, subject, entity):
    examples = usage_examples(graph, subject)
    if examples:
        entity["skos:example"] = examples


def as_id_field(iris):
    refs = [{"@id": iri} for iri in iris]
    if not refs:
        return None
    if len(refs) == 1:
        return refs[0]
    return refs


def range_ref(iri):
    mapped = XSD_TO_SCHEMA.get(str(iri))
    if mapped is not None:
        return mapped
    if str(iri).startswith(str(XSD)):
        print(f"warning: unmapped XSD datatype {iri}, falling back to schema:Text", file=sys.stderr)
        return "schema:Text"
    return str(iri)


def property_subjects_of(graph):
    return (
        set(graph.subjects(RDF.type, OWL.ObjectProperty))
        | set(graph.subjects(RDF.type, OWL.DatatypeProperty))
        | set(graph.subjects(RDF.type, RDF.Property))
    )


def implicit_classes(graph):
    """Named terms that are used as classes without being declared as one:
    either side of rdfs:subClassOf, or the object of rdfs:domain/rdfs:range
    (RDFS semantics make all of these classes). DMLex relies on this for its
    "Has..." mixin classes (e.g. dmlex:HasLabel), which are only ever used
    as superclasses and property domains. Anything typed as a property is
    excluded -- lemon:generates is a property that also, wrongly, has an
    rdfs:subClassOf. See spec: "Implicit classes".
    """
    used = set()
    for subject, obj in graph.subject_objects(RDFS.subClassOf):
        used |= {subject, obj}
    for predicate in (RDFS.domain, RDFS.range):
        used |= set(graph.objects(None, predicate))
    # Datatypes (xsd:string, rdfs:Literal) and OWL/RDF built-ins are not
    # classes to convert, even when --namespace doesn't filter them out.
    builtin_prefixes = tuple(str(ns) for ns in (XSD, RDF, RDFS, OWL))
    return {
        term for term in used if not isinstance(term, BNode) and not str(term).startswith(builtin_prefixes)
    } - property_subjects_of(graph)


def describe_restrictions(graph, class_entities):
    """Append a class's anonymous restriction superclasses (dropped from
    rdfs:subClassOf) to its rdfs:comment, e.g. DMLex's Entry gets
    "Constraints: exactly 1 headword; at most 1 homographNumber." MASP schema
    property rules have one global sh:minCount/sh:maxCount, so per-class
    arity can only be documented here, not enforced (that needs a profile).
    See spec: "Describing restrictions".
    """
    for entity in class_entities:
        constraints = []
        for obj in graph.objects(URIRef(entity["@id"]), RDFS.subClassOf):
            if isinstance(obj, BNode) and (obj, RDF.type, OWL.Restriction) in graph:
                text = describe_expression(graph, obj)
                if text is not None:
                    on_property = graph.value(obj, OWL.onProperty)
                    constraints.append((local_name(on_property) if on_property is not None else "", text))
        if not constraints:
            continue
        sentence = "Constraints: " + "; ".join(text for _, text in sorted(constraints)) + "."
        comment = (entity.get("rdfs:comment") or "").rstrip()
        if comment and not comment.endswith((".", "!", "?")):
            comment += "."
        entity["rdfs:comment"] = f"{comment} {sentence}" if comment else sentence


def build_class_entities(graph, namespace):
    entities = []
    # Plain rdfs:Class (no owl:Class typing) is the idiom lightweight RDFS
    # vocabularies use instead of full OWL -- see spec: "Plain RDFS
    # vocabularies (no OWL typing)". Unioned with owl:Class rather than
    # replacing it so ontologies that do use full OWL typing (RiC-O, the
    # fixture) are unaffected; a subject asserted as both isn't emitted twice.
    class_subjects = set(graph.subjects(RDF.type, OWL.Class)) | set(graph.subjects(RDF.type, RDFS.Class))
    class_subjects |= implicit_classes(graph)
    for subject in sorted(class_subjects, key=str):
        if isinstance(subject, BNode) or not in_namespace(subject, namespace):
            continue
        entity = {"@id": str(subject), "@type": "rdfs:Class"}
        entity["rdfs:label"], entity["name"] = label_and_name(graph, subject)
        comment_or_label_fallback(graph, subject, entity)
        add_usage_examples(graph, subject, entity)
        super_classes = resolve_objects(graph, subject, RDFS.subClassOf, "rdfs:subClassOf")
        if super_classes:
            entity["rdfs:subClassOf"] = [{"@id": iri} for iri in super_classes]
        entities.append(entity)
    return entities


def build_property_entities(graph, namespace):
    entities = []
    # Plain rdf:Property (no owl:ObjectProperty/DatatypeProperty typing) is
    # the property-side counterpart of the rdfs:Class case above -- same
    # reasoning, same spec section.
    property_subjects = property_subjects_of(graph)
    for subject in sorted(property_subjects, key=str):
        if isinstance(subject, BNode) or not in_namespace(subject, namespace):
            continue
        entity = {"@id": str(subject), "@type": "rdf:Property"}
        entity["rdfs:label"], entity["name"] = label_and_name(graph, subject)
        comment_or_label_fallback(graph, subject, entity)
        add_usage_examples(graph, subject, entity)

        domains = resolve_objects(graph, subject, RDFS.domain, "rdfs:domain")
        domain_field = as_id_field(domains)
        if domain_field is not None:
            entity["domainIncludes"] = domain_field

        ranges = [range_ref(iri) for iri in resolve_objects(graph, subject, RDFS.range, "rdfs:range")]
        if len(ranges) == 1:
            entity["rangeIncludes"] = {"@id": ranges[0]}
        elif ranges:
            entity["rangeIncludes"] = [{"@id": r} for r in ranges]

        entities.append(entity)
    return entities


def find_mixins(graph, class_entities):
    """Mixin classes: implicit (undeclared) classes, plus declared classes
    with no rdfs:label and no rdfs:comment that are only there to be
    superclasses (DMLex's HasListingOrder). See spec: "Flattening mixin
    classes".
    """
    declared = set(graph.subjects(RDF.type, OWL.Class)) | set(graph.subjects(RDF.type, RDFS.Class))
    mixins = set()
    for entity in class_entities:
        subject = URIRef(entity["@id"])
        if subject not in declared:
            mixins.add(entity["@id"])
        elif (
            (subject, RDFS.label, None) not in graph
            and (subject, RDFS.comment, None) not in graph
            and (None, RDFS.subClassOf, subject) in graph
        ):
            mixins.add(entity["@id"])
    return mixins


def nearest_real_classes(graph, iri, mixins, real_ids, direction):
    """Walk rdfs:subClassOf from a mixin, down (to its subclasses) or up (to
    its superclasses), through any other mixins, stopping at the first
    non-mixin classes reached."""
    found, seen, stack = set(), set(), [URIRef(iri)]
    while stack:
        node = stack.pop()
        if node in seen:
            continue
        seen.add(node)
        if direction == "down":
            neighbours = graph.subjects(RDFS.subClassOf, node)
        else:
            neighbours = graph.objects(node, RDFS.subClassOf)
        for neighbour in neighbours:
            if isinstance(neighbour, BNode):
                continue
            if str(neighbour) in mixins:
                stack.append(neighbour)
            elif direction == "up" or str(neighbour) in real_ids:
                found.add(str(neighbour))
    return found


def restricting_classes(graph, property_iri, real_ids):
    """Classes that carry an OWL restriction on the property, e.g.
    LabelTag rdfs:subClassOf [ owl:onProperty dmlex:forHeadwords ; ... ]."""
    found = set()
    for subject, obj in graph.subject_objects(RDFS.subClassOf):
        if isinstance(obj, BNode) and str(graph.value(obj, OWL.onProperty)) == property_iri and str(subject) in real_ids:
            found.add(str(subject))
    return found


def flatten_mixins(graph, class_entities, property_entities):
    """Drop mixin classes and put their properties straight onto the classes
    that use them: a property whose domain is a mixin gets the nearest real
    subclasses of that mixin as its domain instead (or, if it has none, the
    classes that carry a restriction on the property), and mixins are
    removed from every class's rdfs:subClassOf. Returns the remaining class
    entities. See spec: "Flattening mixin classes".
    """
    mixins = find_mixins(graph, class_entities)
    real = [entity for entity in class_entities if entity["@id"] not in mixins]
    real_ids = {entity["@id"] for entity in real}

    for entity in real:
        supers = []
        for ref in entity.get("rdfs:subClassOf", []):
            if ref["@id"] in mixins:
                supers.extend(sorted(nearest_real_classes(graph, ref["@id"], mixins, real_ids, "up")))
            else:
                supers.append(ref["@id"])
        if supers:
            entity["rdfs:subClassOf"] = [{"@id": iri} for iri in dict.fromkeys(supers)]
        else:
            entity.pop("rdfs:subClassOf", None)

    for entity in property_entities:
        for field in ("domainIncludes", "rangeIncludes"):
            value = entity.get(field)
            if value is None:
                continue
            refs = value if isinstance(value, list) else [value]
            if not any(ref["@id"] in mixins for ref in refs):
                continue
            resolved = []
            for ref in refs:
                if ref["@id"] not in mixins:
                    resolved.append(ref["@id"])
                    continue
                targets = nearest_real_classes(graph, ref["@id"], mixins, real_ids, "down")
                if not targets and field == "domainIncludes":
                    targets = restricting_classes(graph, entity["@id"], real_ids)
                    if targets:
                        print(
                            f"warning: mixin {ref['@id']} has no subclasses; domain of {entity['@id']} "
                            "taken from the classes that restrict it",
                            file=sys.stderr,
                        )
                resolved.extend(sorted(targets))
            resolved = list(dict.fromkeys(resolved))
            if not resolved:
                print(f"warning: {entity['@id']} has no {field} left after flattening mixins", file=sys.stderr)
                del entity[field]
            elif field == "domainIncludes":
                entity[field] = as_id_field(resolved)
            else:
                entity[field] = {"@id": resolved[0]} if len(resolved) == 1 else [{"@id": r} for r in resolved]
    return real


def build_instance_entities(graph, class_entities, namespace):
    """Instances of converted classes (e.g. oa:commenting a oa:Motivation)
    become instance entities listed in one ItemList per class -- the same
    shape the workflow profile uses for ComputerLanguage values. See spec:
    "Instances (named individuals)".
    """
    class_ids = {entity["@id"] for entity in class_entities}
    class_names = {entity["@id"]: entity["name"] for entity in class_entities}
    instances = []
    members = {}
    for subject in sorted(set(graph.subjects(RDF.type, None)), key=str):
        if isinstance(subject, BNode) or not in_namespace(subject, namespace) or str(subject) in class_ids:
            continue
        types = sorted(str(t) for t in graph.objects(subject, RDF.type) if str(t) in class_ids)
        if not types:
            continue
        label = english_label(graph, subject)
        entity = {
            "@id": str(subject),
            "@type": types[0] if len(types) == 1 else types,
            "name": label if label is not None else local_name(subject),
        }
        comment = preferred_literal(graph, subject, RDFS.comment)
        if comment is not None:
            entity["description"] = comment
        instances.append(entity)
        for class_id in types:
            members.setdefault(class_id, []).append(str(subject))

    item_lists = {}
    for class_id in sorted(members):
        item_lists[class_id] = {
            "@id": f"#itemlist_{local_name(class_id)}",
            "@type": "ItemList",
            "name": f"{class_names[class_id]} values",
            "itemListElement": [{"@id": iri} for iri in members[class_id]],
        }
    return instances, item_lists


def add_item_lists_to_ranges(property_entities, item_lists):
    for entity in property_entities:
        ranges = entity.get("rangeIncludes")
        if ranges is None:
            continue
        refs = ranges if isinstance(ranges, list) else [ranges]
        # Keep the class so custom instances still validate; the ItemList
        # supplies the standard values (see spec: "Instances (named individuals)").
        expanded = []
        for r in refs:
            expanded.append(r)
            if r["@id"] in item_lists:
                expanded.append({"@id": item_lists[r["@id"]]["@id"]})
        refs = expanded
        entity["rangeIncludes"] = refs[0] if len(refs) == 1 else refs


def ontology_metadata(graph, namespace):
    ontologies = list(graph.subjects(RDF.type, OWL.Ontology))
    subject = None
    for candidate in ontologies:
        if in_namespace(candidate, namespace):
            subject = candidate
            break
    if subject is None and ontologies:
        subject = ontologies[0]
    if subject is None:
        return None, None
    return (
        preferred_literal(graph, subject, RDFS.label),
        preferred_literal(graph, subject, RDFS.comment),
    )


def build_resource_descriptor(rule_entities):
    parts = [{"@id": entity["@id"]} for entity in sorted(rule_entities, key=lambda e: e["@id"])]
    return {
        "@id": RESOURCE_DESCRIPTOR_ID,
        "@type": "ResourceDescriptor",
        "name": "Specialized Schema Terms",
        "hasRole": {"@id": "http://www.w3.org/ns/dx/prof/role/schema"},
        "hasPart": parts,
    }


def build_provenance_entities(fetched, start_time):
    """fetched: list of (raw_bytes, filename, encoding_format), one per
    --input, in input order (see load_ontology)."""
    file_entities = []
    for _raw_bytes, filename, encoding_format in fetched:
        file_entity = {
            "@id": filename,
            "@type": "File",
            "name": filename,
            "description": "Source OWL ontology this schema was converted from",
        }
        if encoding_format:
            file_entity["encodingFormat"] = encoding_format
        file_entities.append(file_entity)

    script_entity = {
        "@id": SCRIPT_URL,
        "@type": "SoftwareApplication",
        "name": "owl-to-masp.py",
        "url": SCRIPT_URL,
    }

    # as_id_field collapses a single source to the plain {"@id": ...} shape
    # every existing single-input crate already has -- a merge is the only
    # case that produces the array form (spec: "Merging multiple ontologies
    # into one schema").
    create_action = {
        "@id": CREATE_ACTION_ID,
        "@type": "CreateAction",
        "name": "Convert OWL ontology to MASP schema crate",
        "object": as_id_field([entity["@id"] for entity in file_entities]),
        "instrument": {"@id": SCRIPT_URL},
        "result": {"@id": "./"},
        "startTime": start_time,
    }
    return file_entities, script_entity, create_action


def build_crate_graph(
    class_entities,
    property_entities,
    instance_entities,
    item_list_entities,
    name,
    description,
    file_entities,
    script_entity,
    create_action,
):
    root_dataset = {
        "@id": "./",
        "@type": "Dataset",
        "name": name,
        "hasResource": [{"@id": RESOURCE_DESCRIPTOR_ID}],
        "hasPart": [{"@id": entity["@id"]} for entity in file_entities],
        "mentions": [{"@id": create_action["@id"]}],
    }
    if description:
        root_dataset["description"] = [description]

    metadata_descriptor = {
        "@id": "ro-crate-metadata.json",
        "@type": "CreativeWork",
        "conformsTo": {"@id": "https://w3id.org/ro/crate/1.1"},
        "about": {"@id": "./"},
    }

    resource_descriptor = build_resource_descriptor(class_entities + property_entities + item_list_entities)

    graph = [
        metadata_descriptor,
        root_dataset,
        resource_descriptor,
        *file_entities,
        script_entity,
        create_action,
    ]
    graph.extend(class_entities)
    graph.extend(property_entities)
    graph.extend(item_list_entities)
    graph.extend(instance_entities)

    local_context = {"@vocab": "http://schema.org/"}
    # skos: isn't in the RO-Crate context; only declare it when used so
    # crates without examples are unchanged.
    if any("skos:example" in entity for entity in class_entities + property_entities):
        local_context["skos"] = SKOS_PREFIX

    return {
        "@context": [
            "https://w3id.org/ro/crate/1.2/context",
            local_context,
            {"@base": None},
        ],
        "@graph": graph,
    }


def write_schema_crate(output_dir, crate, name, fetched):
    output_dir = Path(output_dir)
    schema_crate_dir = output_dir / "schema-crate"
    schema_crate_dir.mkdir(parents=True, exist_ok=True)

    metadata_path = schema_crate_dir / "ro-crate-metadata.json"
    metadata_path.write_text(json.dumps(crate, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    for raw_bytes, filename, _encoding_format in fetched:
        (schema_crate_dir / filename).write_bytes(raw_bytes)

    schema_text_path = output_dir / "schema-text.md"
    if not schema_text_path.exists():
        schema_text_path.write_text(
            f"---\ntitle: {name} Schema Terms\n---\n\n"
            f"# {name} Schema Terms\n\n"
            "TODO: describe the source ontology and any conversion caveats here.\n\n"
            "## All Rules:\n\n"
            "${rules.all}\n",
            encoding="utf-8",
        )

    return metadata_path


def convert(
    input_sources, output_dir, namespace=None, name=None, start_time=None, flatten=False, restrictions=False
):
    # Accept a bare string, same as every caller before --input became
    # repeatable (the CLI, the Python unit tests, the JS shell-out test) --
    # only a merge needs to actually pass a list.
    sources = [input_sources] if isinstance(input_sources, str) else list(input_sources)

    graph, fetched = load_ontology(sources)

    class_entities = build_class_entities(graph, namespace)
    property_entities = build_property_entities(graph, namespace)
    if flatten:
        class_entities = flatten_mixins(graph, class_entities, property_entities)
    if restrictions:
        describe_restrictions(graph, class_entities)
    instance_entities, item_lists = build_instance_entities(graph, class_entities, namespace)
    add_item_lists_to_ranges(property_entities, item_lists)
    ontology_label, ontology_comment = ontology_metadata(graph, namespace)
    resolved_name = name or ontology_label or "Untitled Schema"
    resolved_start_time = start_time or datetime.now(timezone.utc).isoformat()

    file_entities, script_entity, create_action = build_provenance_entities(fetched, resolved_start_time)
    crate = build_crate_graph(
        class_entities,
        property_entities,
        instance_entities,
        list(item_lists.values()),
        resolved_name,
        ontology_comment,
        file_entities,
        script_entity,
        create_action,
    )
    return write_schema_crate(output_dir, crate, resolved_name, fetched)


def main(argv=None):
    args = parse_args(argv)
    metadata_path = convert(
        args.input,
        args.output_dir,
        args.namespace,
        args.name,
        flatten=args.flatten_mixins,
        restrictions=args.describe_restrictions,
    )
    print(f"Wrote {metadata_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
