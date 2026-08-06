---
title: Records in Context Ontology Schema Terms
---

# Records in Context Ontology Schema Terms

The [Records in Context Ontology (RiC-O)](https://www.ica.org/standards/RiC/RiC-O_1-1.html) is published by the International Council on Archives (ICA) Expert Group on Archival Description (EGAD) as part of *Records in Context*, a conceptual model for archival description. This schema is a machine-generated MASP conversion of [RiC-O 1.1](https://www.ica.org/standards/RiC/RiC-O_1-1.rdf), produced by [`scripts/owl-to-masp.py`](https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/scripts/owl-to-masp.py) — see that script's [spec](https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/scripts/owl-to-masp.spec.md) for the conversion's mapping rules and known limitations, and [`schema-crate/RiC-O_1-1.rdf`](schema-crate/RiC-O_1-1.rdf) for the exact source file converted (also recorded via a `CreateAction` in `ro-crate-metadata.json`).

Conversion caveats:
- Only the ~660 classes and properties defined in RiC-O's own namespace (`https://www.ica.org/standards/RiC/ontology#`) were converted; terms it imports from other vocabularies (SKOS, Dublin Core, etc.) are not included as their own entities, though properties may still reference them.
- `owl:Restriction`-based `rdfs:subClassOf` axioms (e.g. cardinality or `someValuesFrom` restrictions) are not modelled — only named superclasses are kept, so some of RiC-O's OWL semantics are intentionally simplified for MASP's class/property rule model.
- Cardinality (`sh:minCount`/`sh:maxCount`) is left unset throughout; RiC-O does not express this in a form the converter maps automatically.
- Each class/property's `rdfs:label` is its JSON-LD term name (the IRI's local name, e.g. `isComponentOfTransitive`); the expanded, human-readable OWL label (e.g. "is component of transitive") is in `name` instead — see the spec's "Label vs. name" section.
- This is a **schema**, not a profile: it defines the available terms but doesn't itself constrain which are required in a conforming RO-Crate. A profile specialising a subset of RiC-O for a particular use (e.g. describing archival record sets in an RO-Crate) would be a separate, hand-authored crate in `profiles/`.

## All Rules:

${rules.all}
