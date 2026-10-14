---
title: LDAC-DMLex Profile (DRAFT)
---

# LDAC-DMLex Profile (DRAFT)

> **DRAFT.** This is a draft Language Data Commons (LDAC) adaptation of [DMLex](https://docs.oasis-open.org/lexidma/dmlex/v1.0/dmlex-v1.0.html), the OASIS Data Model for Lexicography. It is a first, machine-generated version and will be refined.

## Overview

This profile describes a dictionary (in DMLex terms, a *lexicographic resource*) as an RO-Crate, using the DMLex RDF vocabulary (the `dmlex:` terms, `https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#`). The terms themselves are documented in the [DMLex schema](../../../schemas/dmlex/schema-crate/index.html) converted from DMLex's RDF vocabulary.

A crate that conforms to this profile:

- has at least one `dmlex:LexicographicResource`. The crate's root `Dataset` can be that resource itself, by also being typed `dmlex:LexicographicResource`.
- uses the `dmlex:` prefix in its `@context`, and writes properties as `dmlex:headword`, `dmlex:sense` and so on, because the validator matches property names as written.
- gives objects (entries, senses, definitions, examples, labels, …) an `@id` and a `dmlex:` type, where the DMLex RDF serialization often uses untyped blank nodes.

For an example, see [`examples/abandon`](../examples/abandon/ro-crate-metadata.json): the basic entry example (A.1.1) from the DMLex specification, as an RO-Crate.

## How this draft was made

Each DMLex class has a class rule here, and each property that DMLex allows on that class has its own property rule with DMLex's cardinality (e.g. exactly one `dmlex:headword` per `dmlex:Entry`, at most one `dmlex:title` per `dmlex:LexicographicResource`). These were generated from the 101 OWL cardinality restrictions in [`dmlex.ttl`](https://docs.oasis-open.org/lexidma/dmlex/v1.0/os/schemas/RDF/dmlex.ttl), using the DMLex schema in this repository for which properties belong to which class. The only addition so far is that a crate must contain a lexicographic resource.

Things to refine:

- `dmlex.ttl` restricts a property `dmlex:language` on `HeadwordTranslation`, `HeadwordExplanation`, `ExampleTranslation` (at most 1) and `EtymonUnit` (exactly 1), but never defines it; it presumably means `dmlex:langCode`. Those four constraints are not included.
- `dmlex.ttl` makes the four `…Tag` classes subclasses of `HasInflectedForm`, which gives them `dmlex:inflectedForm` here; this looks like a typo for `HasForHeadwords`. `dmlex:forLanguage` has no class at all. See the [DMLex schema](../../../schemas/dmlex/schema-crate/index.html) notes.
- DMLex's *controlled values* (part-of-speech tags, label tags, …) are free text here; an LDAC version might point them at shared value lists.
- Nothing yet says how a dictionary relates to the rest of an LDAC collection (e.g. as an object in an LDAC `RepositoryCollection`).

## All Rules

${rules.all}
