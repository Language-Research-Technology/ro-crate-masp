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

from rdflib import OWL, RDF, RDFS, XSD, BNode, Graph

XSD_TO_SCHEMA = {
    str(XSD.string): "schema:Text",
    str(XSD.normalizedString): "schema:Text",
    str(XSD.token): "schema:Text",
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
    expanded = preferred_literal(graph, subject, RDFS.label)
    return label, (expanded if expanded is not None else label)


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


def build_class_entities(graph, namespace):
    entities = []
    # Plain rdfs:Class (no owl:Class typing) is the idiom lightweight RDFS
    # vocabularies use instead of full OWL -- see spec: "Plain RDFS
    # vocabularies (no OWL typing)". Unioned with owl:Class rather than
    # replacing it so ontologies that do use full OWL typing (RiC-O, the
    # fixture) are unaffected; a subject asserted as both isn't emitted twice.
    class_subjects = set(graph.subjects(RDF.type, OWL.Class)) | set(graph.subjects(RDF.type, RDFS.Class))
    for subject in sorted(class_subjects, key=str):
        if isinstance(subject, BNode) or not in_namespace(subject, namespace):
            continue
        entity = {"@id": str(subject), "@type": "rdfs:Class"}
        entity["rdfs:label"], entity["name"] = label_and_name(graph, subject)
        comment = preferred_literal(graph, subject, RDFS.comment)
        if comment is not None:
            entity["rdfs:comment"] = comment
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
    property_subjects = (
        set(graph.subjects(RDF.type, OWL.ObjectProperty))
        | set(graph.subjects(RDF.type, OWL.DatatypeProperty))
        | set(graph.subjects(RDF.type, RDF.Property))
    )
    for subject in sorted(property_subjects, key=str):
        if isinstance(subject, BNode) or not in_namespace(subject, namespace):
            continue
        entity = {"@id": str(subject), "@type": "rdf:Property"}
        entity["rdfs:label"], entity["name"] = label_and_name(graph, subject)
        comment = preferred_literal(graph, subject, RDFS.comment)
        if comment is not None:
            entity["rdfs:comment"] = comment

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
        label = preferred_literal(graph, subject, RDFS.label)
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


def replace_ranges_with_item_lists(property_entities, item_lists):
    for entity in property_entities:
        ranges = entity.get("rangeIncludes")
        if ranges is None:
            continue
        refs = ranges if isinstance(ranges, list) else [ranges]
        refs = [{"@id": item_lists[r["@id"]]["@id"]} if r["@id"] in item_lists else r for r in refs]
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

    return {
        "@context": [
            "https://w3id.org/ro/crate/1.2/context",
            {"@vocab": "http://schema.org/"},
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


def convert(input_sources, output_dir, namespace=None, name=None, start_time=None):
    # Accept a bare string, same as every caller before --input became
    # repeatable (the CLI, the Python unit tests, the JS shell-out test) --
    # only a merge needs to actually pass a list.
    sources = [input_sources] if isinstance(input_sources, str) else list(input_sources)

    graph, fetched = load_ontology(sources)

    class_entities = build_class_entities(graph, namespace)
    property_entities = build_property_entities(graph, namespace)
    instance_entities, item_lists = build_instance_entities(graph, class_entities, namespace)
    replace_ranges_with_item_lists(property_entities, item_lists)
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
    metadata_path = convert(args.input, args.output_dir, args.namespace, args.name)
    print(f"Wrote {metadata_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
