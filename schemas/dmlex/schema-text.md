---
title: DMLex Schema Terms
---

# DMLex Schema Terms

[DMLex](https://docs.oasis-open.org/lexidma/dmlex/v1.0/dmlex-v1.0.html), the OASIS Data Model for Lexicography (v1.0, OASIS Standard), models dictionaries ("lexicographic resources"): entries, senses, definitions, examples, pronunciations and inflected forms, plus optional modules for crosslingual (bilingual and multilingual) resources, controlled values, linking between entries and senses, inline annotation, and etymology. This MASP Schema was auto-generated from DMLex's RDF vocabulary using the `scripts/owl-to-masp.py` script.

The source is [`dmlex.ttl`](https://docs.oasis-open.org/lexidma/dmlex/v1.0/os/schemas/RDF/dmlex.ttl), the vocabulary file that defines the `https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#` namespace (see the spec's [RDF serialization design principles](https://docs.oasis-open.org/lexidma/dmlex/v1.0/dmlex-v1.0.html)). It combines all six modules; OASIS also publishes them as separate files alongside it.

Conversion notes:

- DMLex links into the W3C OntoLex-Lemon model (e.g. `Entry` is a subclass of `ontolex:LexicalEntry`); those OntoLex terms are referenced by IRI but not documented here.
- Converted with `--flatten-mixins`. DMLex gives properties shared by several classes an undocumented "Has…" mixin class as their domain (e.g. `label` has domain `HasLabel`, a superclass of `Entry`, `Sense`, `Example` and others). Here those mixins are dropped and each property is put directly on the classes that use it, so `Entry` lists all of its properties itself.
- Some apparent errors in `dmlex.ttl` show through:
  - `InflectedFormTag`, `LabelTag`, `PartOfSpeechTag` and `TranscriptionSchemeTag` are declared as subclasses of `HasInflectedForm`, which gives them the `inflectedForm` property. This looks like a typo for `HasForHeadwords`.
  - Nothing is declared as a subclass of `HasForHeadwords`, so `forHeadwords` and `forTranslations` are put on the classes that restrict them (the four tag classes above). `forLanguage` has no such restriction, so it has no domain here.
  - `ItemMarker` is declared only as a subclass of `HasLemma` and is not used anywhere else, so it is not included.
- Converted with `--describe-restrictions`. DMLex expresses arity ("exactly 1 `headword`" on `Entry`, "at most 1 `title`" on `LexicographicResource`, …) as 101 OWL class restrictions. A schema can't enforce these per class, so each class's description ends with them as "Constraints: …", and the property tables show every property as not required. The draft [LDAC-DMLex profile](../../profiles/ldac-dmlex/profile-crate/index.html) carries them as real, per-class cardinality rules. The [DMLex spec](https://docs.oasis-open.org/lexidma/dmlex/v1.0/dmlex-v1.0.html) and its SHACL shapes ([`dmlex.shacl`](https://docs.oasis-open.org/lexidma/dmlex/v1.0/os/schemas/RDF/dmlex.shacl)) give the same arities.
- `dmlex.ttl` differs slightly from the separate module files: `MemberType` allows at most one `role` (exactly one in the Linking module file), and `Etymon` is not a subclass of `HasTranslation` (it is in the Etymology module file).

## All Rules:

${rules.all}
