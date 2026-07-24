# OWL to MASP Converter — Spec

- Issue: https://github.com/Language-Research-Technology/ro-crate-masp/issues/29
- Implementation: `scripts/owl-to-masp.py` (Python, run via `uv run`)
- Status: draft — spec written before implementation; update this file as design decisions are made or revised.

## Problem

We want to bring external OWL ontologies (starting with [Records in Context Ontology, RiC-O](https://www.ica.org/standards/RiC/RiC-O_1-1.html)) into the MASP ecosystem so their classes and properties can be used directly in RO-Crates, and specialised by MASP profiles. 

`scripts/mode-to-masp.js` is the closest existing analogue: it converts a Crate-O mode file into a MASP profile crate. This converter plays the same role for OWL sources, but OWL/RDF parsing is much better served by Python's `rdflib` than anything available in the Node/JS ecosystem this repo otherwise uses — see [Constraint Modeling Note](../README.md#constraint-modeling-note) for the JSON-LD shape it must produce. So this script is deliberately Python, invoked via `uv run`, while everything downstream (validator, doc generator) stays JS and consumes the MASP JSON it emits.

## Goals

- Given a path or URL to an OWL file (RDF/XML, Turtle, or JSON-LD — whatever `rdflib` parses), generate a **MASP schema crate** (`ro-crate-metadata.json` + a stub `schema-text.md`) under `schemas/<name>/`.
- Map OWL classes to `rdfs:Class` rule entities, and OWL object/datatype properties to `rdf:Property` rule entities, following the vocabulary in `lib/masp-validator.js` (see [Mapping rules](#owl--masp-mapping-rules) below).
- Preserve human-readable labels and comments (`rdfs:label`, `rdfs:comment`) from the source ontology so generated docs are meaningful without hand-editing.
- Produce output that `generate-masp-docs.js` can immediately build into documentation (`npm run build:*`-style) and that `MaspValidator` can load without modification.
- Be re-runnable: converting the same OWL source twice should produce the same crate (mod formatting, and setting aside the provenance timestamp — see [Provenance](#provenance-source-file--createaction) below), so schemas can be regenerated as the upstream ontology evolves.
- Keep the crate self-contained and honest about its own provenance: bundle the original OWL file alongside the generated crate, and record a `CreateAction` describing that this specific script produced `ro-crate-metadata.json` from that file.

## Non-goals (first version)

- No SHACL shape import — only the OWL constructs MASP already models (classes, properties, domain/range, cardinality-ish annotations if present, subclassing where MASP inheritance rules allow it).
- No attempt to convert OWL restrictions (`owl:Restriction`, cardinality axioms, `owl:unionOf`, etc.) beyond straightforward `rdfs:domain`/`rdfs:range` — flag anything richer as a warning and skip rather than guess.
- No automatic generation of `profile-text.md` prose (as this is a not for profiles whith highly specialized rules) — only a minimal placeholder `schema-text.md` template (matching the shape of e.g. `schemas/austalk/schema-text.md`) using the `${rules.all}` / `${rules.allItemLists}` placeholders with space to put in explanatory text.
- Not building the RiC-O schema itself in this issue — that's the follow-up once the converter exists (see the issue body: "ready to build some tests and example RO-Crates" is a separate step).
- No Crate-O `crate-o-mode.json` generation — that's `scripts/generate-mode-file.js`'s job and can be run afterwards on the converter's output.

## Inputs & Outputs

**Input:** one OWL file (local path or URL), e.g. `https://www.ica.org/standards/RiC/RiC-O_1-1.rdf`.

**Output:** a directory shaped like the existing `schemas/*/schema-crate/` convention:

```
schemas/<name>/
  schema-text.md                  # generated stub, placeholders only
  schema-crate/
    ro-crate-metadata.json        # generated MASP schema crate
    <original-owl-filename>       # the source OWL file, copied in verbatim
```

The source OWL file is copied into `schema-crate/` under its original filename (the last path segment of `--input`, whether that's a local path or a URL) so the crate is self-contained and the exact bytes that were converted are citable alongside the result — not just linked to an external, possibly-mutable URL. See [Provenance](#provenance-source-file--createaction) for how this file and the conversion itself are recorded in the crate's own metadata.

## CLI interface

```bash
uv run scripts/owl-to-masp.py \
  --input https://www.ica.org/standards/RiC/RiC-O_1-1.rdf \
  --output-dir schemas/ric \
  --namespace https://www.ica.org/standards/RiC/ontology# \
  --name "Records in Context Ontology"
```

Flags (mirrors the option style of `scripts/mode-to-masp.js`):

| Flag | Alias | Required | Description |
|---|---|---|---|
| `--input` | `-i` | yes | Path or URL to the OWL file |
| `--output-dir` | `-o` | yes | Output directory, e.g. `schemas/ric` |
| `--namespace` | `-n` | no | Restricts conversion to classes/properties whose IRI starts with this prefix (see [Namespace filtering](#namespace-filtering-not-compaction) below); defaults to no filtering (convert everything typed `owl:Class`/`owl:ObjectProperty`/`owl:DatatypeProperty`) |
| `--name` | | no | Human-readable schema name for `schema-text.md` (defaults to `owl:Ontology` `rdfs:label` if present) |

Declare dependencies inline via PEP 723 script metadata at the top of `owl-to-masp.py` (so `uv run` auto-installs them, no separate `requirements.txt`/`pyproject.toml` needed):

```python
# /// script
# dependencies = ["rdflib"]
# ///
```

## OWL → MASP mapping rules

Based on the rule vocabulary documented in `CLAUDE.md` and implemented in `lib/masp-validator.js` / seen in existing schemas (e.g. `schemas/austalk/schema-crate/ro-crate-metadata.json`):

| OWL construct | MASP entity | Notes |
|---|---|---|
| `owl:Class` | `rdfs:Class` entity | `@id` is the **full class IRI, unchanged** — see [Namespace filtering, not compaction](#namespace-filtering-not-compaction); `rdfs:label`/`name`/`rdfs:comment` set per [Label vs. name](#label-vs-name) below |
| `owl:ObjectProperty` / `owl:DatatypeProperty` | `rdf:Property` entity | same label/name/comment handling, full IRI `@id` |
| `rdfs:domain` | `domainIncludes` on the property entity | one value → `{"@id": ...}` object; 2+ values → array of the same, matching `austalk:age_from`'s single-domain shape and `schema-org`'s multi-value shape. A blank-node domain that is an `owl:unionOf` of named classes (see below) expands into one entry per union member — it is **not** dropped like other blank nodes. |
| `rdfs:range` (class) | `rangeIncludes` on the property entity | same one-vs-many object/array rule, same `owl:unionOf` expansion; points at the full IRI of the range class, even if that class is outside `--namespace` (external range references are allowed; see edge cases) |
| `rdfs:range` (datatype, e.g. `xsd:string`, `xsd:date`) | `rangeIncludes` → `{"@id": "schema:Text"}` / `{"@id": "schema:Date"}` / etc. | uses the fixed table below; unmapped datatypes warn on stderr and fall back to `schema:Text` |
| `rdfs:subClassOf` (named class only) | `rdfs:subClassOf` on the `rdfs:Class` entity, **always as an array** | Confirmed by precedent: `schemas/schema-org/schema-crate/ro-crate-metadata.json` keeps `rdfs:subClassOf` directly on its `rdfs:Class` entities as an array even for a single superclass (e.g. `https://schema.org/3DModel` → `["https://schema.org/MediaObject"]`), with no flattening. `prov:specializationOf` is a *profile*-only construct (seen in `profiles/ldac/profile-crate/ro-crate-metadata.json`) used when a profile specialises a schema term — out of scope here since this converter emits a schema, not a profile. MASP's "no runtime inheritance" rule (`CLAUDE.md` §"Profiles vs Schemas") applies to *profiles* compiling a flattened property set, not to schemas carrying their source hierarchy. Anonymous superclass expressions (`owl:Restriction` blank nodes) are dropped from this list — see edge cases. |
| Root `owl:Ontology` entity | crate root `Dataset` (`hasResource` → one `ResourceDescriptor`) + that `ResourceDescriptor` (`hasPart` listing every generated rule, sorted by IRI) | mirrors the shape in `schemas/austalk/schema-crate/ro-crate-metadata.json` lines 1-95 (metadata descriptor + root `Dataset` + `#hasSpecializedSchema` `ResourceDescriptor`), minus the doc-only `hasPart` entries (`schema-documentation.md`, `crate-o-mode.json`, `index.html`) since those are produced later by `generate-masp-docs.js` / `generate-mode-file.js`, not by this converter |
| OWL enumerated classes (`owl:oneOf`) | `ItemList` entity | stretch goal — flag as unsupported if not present in v1 |
| The conversion run itself | a `CreateAction` referenced from the root `Dataset`'s `mentions`, plus a `File` entity (the copied OWL source) and a `SoftwareApplication` entity (the script) | see [Provenance](#provenance-source-file--createaction) below |

Value constraints (fixed values, patterns) should **not** be written as a bare `value` field per the [Constraint Modeling Note](../README.md#constraint-modeling-note) — if the OWL source ever implies a fixed value (rare, but e.g. via `owl:hasValue`), model it as a `PropertyValue` entity referenced through `rangeIncludes`, consistent with the rest of the repo.

### Label vs. name

MASP follows the schema.org/JSON-LD convention (confirmed by `schemas/schema-org`, where every term's `rdfs:label` — e.g. `"isPartOf"`, `"author"` — is identical to its `name` and to the property/class name you'd actually write in a JSON-LD document, with no spaces) that **`rdfs:label` is the term itself**, not prose. OWL ontologies don't always follow this: RiC-O's `rdfs:label` is a space-separated, human-expanded phrase (e.g. `https://www.ica.org/standards/RiC/ontology#isComponentOfTransitive` has the OWL `rdfs:label` `"is component of transitive"`), which is exactly backwards for MASP/JSON-LD purposes.

Resolved: for every generated `rdfs:Class`/`rdf:Property` entity —

- **`rdfs:label`** is set to the **local name** — the term's own IRI fragment (the part after the last `#`, or after the last `/` if there is no `#`). For `https://www.ica.org/standards/RiC/ontology#isComponentOfTransitive` that's `isComponentOfTransitive`: exactly the string you'd use as a JSON-LD property/type name.
- **`name`** is set to the OWL ontology's own `rdfs:label` literal (the expanded, human-readable phrase, e.g. `"is component of transitive"`), using the same language-tag preference as elsewhere ([Multiple/no `rdfs:label`](#edge-cases--open-questions) below). If the source ontology has no `rdfs:label` at all for a term, `name` falls back to the same local-name value as `rdfs:label`, so `name` is always present.

This also lines up with how `lib/masp-validator.js`'s `Rule` base class already resolves a rule's display name — `asFirstString(entity["name"]) || asFirstString(entity["rdfs:label"]) || this.id` — i.e. it already prefers `name` over `rdfs:label`, so this convention was implicit in the validator before this converter existed; RiC-O's OWL just happened to have the two swapped relative to what MASP expects.

### Namespace filtering, not compaction

`--namespace` does **not** compact `@id`s (no `ric:Record`-style prefixed names) — every generated `@id` is the term's full IRI, matching the precedent already set by `schemas/schema-org` (`"@id": "https://schema.org/3DModel"`), not the inconsistent `austalk:`/`ausnc:` prefixes used in `schemas/austalk` (those aren't actually resolvable — no matching `@context` prefix definition exists for them in that file).

Instead, `--namespace` **filters which terms get converted at all**: only subjects typed `owl:Class`/`owl:ObjectProperty`/`owl:DatatypeProperty` whose IRI starts with the given namespace become MASP rule entities. This matters because real-world OWL files (RiC-O included) import other vocabularies (PROV, SKOS, Dublin Core, etc.) — without filtering, converting RiC-O would also try to re-mint schema entities for every imported term, most of which aren't meant to be redefined here. Properties whose `rdfs:range` points at a class *outside* the namespace are still allowed to reference that class's full IRI (external range references are normal and fine) — only whether a term becomes its *own* generated `rdfs:Class`/`rdf:Property` entity is filtered.

### `owl:unionOf` domain/range expansion

**Discovered running the converter against the real RiC-O ontology** (per the workflow in [Test plan](#test-plan) — this is the first real construct that tripped up the fixture-only implementation, written back here before being fixed): RiC-O expresses "this property's domain/range is A or B" not as multiple `rdfs:domain`/`rdfs:range` triples, but as a single triple pointing at a blank node shaped like:

```turtle
ex:hasOrHadManager rdfs:domain [
    a owl:Class ;
    owl:unionOf ( ex:Instantiation ex:RecordResource )
] .
```

This is extremely common — 121 of RiC-O's ~550 properties use it on domain and/or range. Treating it as an unsupported blank node (the original v1 rule) silently dropped `domainIncludes`/`rangeIncludes` entirely from a fifth of all properties, which is a correctness bug, not an acceptable gap: the union members are named, resolvable classes, and MASP's `domainIncludes`/`rangeIncludes` already natively support multiple values.

Resolved: when a domain/range/subClassOf object is a blank node, check whether it has an `owl:unionOf` (an RDF collection/list, `owl:unionOf rdf:parseType="Collection"` in RDF/XML, `owl:unionOf ( ... )` in Turtle). If so, walk the list and treat each **named** member as its own domain/range value (contributing to the same one-vs-many object/array field as if it had been a separate `rdfs:domain`/`rdfs:range` triple). Any list member that is itself a blank node is skipped with a warning, same as before. Only blank nodes that are *not* a resolvable `owl:unionOf` (e.g. an `owl:Restriction`, as in the fixture's anonymous `ex:Gadget` superclass) are dropped entirely, as originally specified.

### XSD → schema.org datatype table

| XSD datatype | schema.org range |
|---|---|
| `xsd:string`, `xsd:normalizedString`, `xsd:token` | `schema:Text` |
| `xsd:boolean` | `schema:Boolean` |
| `xsd:date` | `schema:Date` |
| `xsd:dateTime` | `schema:DateTime` |
| `xsd:integer`, `xsd:int`, `xsd:nonNegativeInteger`, `xsd:positiveInteger` | `schema:Integer` |
| `xsd:decimal`, `xsd:float`, `xsd:double` | `schema:Number` |
| `xsd:anyURI` | `schema:URL` |
| anything else | `schema:Text`, with a warning printed to stderr |

### Provenance: source file & CreateAction

Every generated crate records where it came from and how, using standard RO-Crate provenance entities rather than a bespoke shape:

```jsonc
// The copied source file, e.g. schema-crate/RiC-O_1-1.rdf
{
  "@id": "RiC-O_1-1.rdf",
  "@type": "File",
  "name": "RiC-O_1-1.rdf",
  "description": "Source OWL ontology this schema was converted from",
  "encodingFormat": "application/rdf+xml"
}
```
```jsonc
// The script that did the converting
{
  "@id": "https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/scripts/owl-to-masp.py",
  "@type": "SoftwareApplication",
  "name": "owl-to-masp.py",
  "url": "https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/scripts/owl-to-masp.py"
}
```
```jsonc
// The conversion event, linking the two together and to the result
{
  "@id": "#owl-to-masp-conversion",
  "@type": "CreateAction",
  "name": "Convert OWL ontology to MASP schema crate",
  "object": { "@id": "RiC-O_1-1.rdf" },
  "instrument": { "@id": "https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/scripts/owl-to-masp.py" },
  "result": { "@id": "./" },
  "startTime": "2026-07-24T03:21:09+00:00"
}
```

The root `Dataset`'s `hasPart` gains the source file's `@id`, and its `mentions` (previously always an empty array) gains `{"@id": "#owl-to-masp-conversion"}` — `mentions` is the conventional place in this repo's crates for referencing entities that describe the dataset without being literal parts of it.

**Idempotency vs. the timestamp:** the goal that "converting the same OWL source twice produces the same crate" and a provenance record that says *when* the conversion happened are in tension — `startTime` necessarily differs between two real runs. Resolved by making the internal `convert()` function accept an optional `start_time` override (the CLI always omits it and gets the real current time; tests pass a fixed value to get true byte-for-byte equality). This isn't a compromise on the idempotency goal — it means "the same *rules* come out of the same input," not "the file's bytes never change including its own timestamp of generation," which was never a sensible bar for a provenance-bearing artifact.

## Edge cases & open questions

- **Multiple/no `rdfs:label`, language-tagged labels:** resolved — when picking the OWL `rdfs:label` literal to use for the generated `name` field (see [Label vs. name](#label-vs-name)), prefer a literal tagged `@en`, else the first untagged (no language) literal, else the first literal found in whatever order `rdflib` returns (not guaranteed stable across ontology re-fetches, but stable for a fixed local file). Same preference order for `rdfs:comment`. Other languages are dropped, not merged in — acceptable for v1 since RiC-O's primary documentation language is English.
- **Cardinality:** OWL doesn't have a direct analogue to `sh:minCount`/`sh:maxCount` unless the source ontology uses SHACL or OWL restrictions alongside it. Default to leaving cardinality unset (i.e. optional/unbounded) rather than guessing; profiles that specialise the schema can tighten it.
- **subClassOf / inheritance:** resolved — see mapping table above (plain passthrough, matching `schemas/schema-org`'s precedent). Still worth a throwaway check against RiC-O's actual class hierarchy (it's deep, with multiple inheritance in places) to confirm nothing stranger is needed.
- **Large ontologies:** RiC-O has several hundred classes/properties — output must be deterministic and diff-friendly. Resolved: classes and properties are each sorted by IRI before being written, both in the `@graph` array and in the `ResourceDescriptor`'s `hasPart` list, so regenerating after an upstream update produces a minimal, reviewable git diff.
- **Blank nodes / anonymous restrictions:** resolved — a blank-node `rdfs:domain`/`rdfs:range`/`rdfs:subClassOf` object is first checked for `owl:unionOf` and expanded if present (see [`owl:unionOf` domain/range expansion](#owlunionof-domainrange-expansion) above, added after finding this in real RiC-O data). Any other blank node (e.g. `owl:Restriction`) is dropped from that field, and a warning naming the subject is printed to stderr. The conversion continues rather than failing either way.
- **Namespace compaction:** resolved — no compaction; see [Namespace filtering, not compaction](#namespace-filtering-not-compaction) above.

## Test plan

Two layers, mirroring how the rest of this repo tests generators (Mocha/Chai in `test/`) while keeping the converter's own logic testable without Node in the loop:

1. **Python unit tests** (`test/owl-to-masp/test_owl_to_masp.py`, run via `uv run pytest test/owl-to-masp`, or `npm run test:owl-to-masp` — a repo-root `pyproject.toml` declares `pytest`/`rdflib` under `[tool.uv] dev-dependencies` so `uv run` resolves them into an isolated project `.venv` rather than silently falling back to whatever happens to be on the global `PATH`) exercise the converter's internal functions directly against a small hand-written fixture ontology at `test_data/owl/fixture.ttl`. This fixture must cover, per the mapping rules above: two classes related by `rdfs:subClassOf` (one with an *additional* anonymous `owl:Restriction` superclass, to prove non-`unionOf` blank nodes are dropped not crashed on), an object property (domain/range both in-namespace classes), a datatype property (`xsd:string` range, to prove the XSD table), one class/property **outside** `--namespace` (to prove the namespace filter excludes it, including as an unfiltered `rangeIncludes` target where relevant), a property whose domain is an `owl:unionOf` of two named classes (to prove union expansion, per the RiC-O-derived rule above), and at least one class/property whose OWL `rdfs:label` is a multi-word phrase distinct from its IRI's local name (to prove the `rdfs:label`-becomes-local-name / `name`-becomes-expanded-phrase split, per [Label vs. name](#label-vs-name)). Assertions: exact `rdfs:Class`/`rdf:Property` shapes (including the object-vs-array rules), `ResourceDescriptor`/`Dataset` shape, sorted ordering, idempotency (running the conversion twice on the same fixture with a fixed `start_time` yields identical JSON), that the source `fixture.ttl` is copied byte-for-byte into `schema-crate/` as a `File` entity referenced from the root `Dataset`'s `hasPart`, and that a `CreateAction` referenced from `mentions` links that `File` (`object`), the script (`instrument`), and the root dataset (`result`).
2. **One JS integration test** (`test/owl-to-masp.test.js`, part of the normal `npm test` run, following the `execSync`-based shell-out pattern already used in `test/mode-round-trip.test.js`) shells out to `uv run scripts/owl-to-masp.py` against the same fixture, then loads the generated `ro-crate-metadata.json` through `MaspValidator` to confirm the *actual JS consumer* accepts the output without modification — this is the check that matters most, since a converter that only satisfies its own Python tests but produces something `MaspValidator` rejects would defeat the point.

Workflow for extending this beyond the fixture (per the issue's plan of converting RiC-O next): run the converter against the real RiC-O OWL file as an exploratory/manual step once the fixture-based tests above are green. Any new construct or edge case that trips up that real run gets written back into this spec's mapping table / edge-case list first, then turned into an addition to the `fixture.ttl` + a new assertion in `test_owl_to_masp.py`, and only then implemented — not patched ad hoc against RiC-O alone. This keeps the fixture suite a complete, minimal reproduction of every construct the converter is known to handle, independent of RiC-O's size and any network access to fetch it.
