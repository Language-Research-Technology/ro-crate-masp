---
title: LexInfo + OntoLex-Lemon Schema Terms
---

# LexInfo + OntoLex-Lemon Schema Terms

This MASP Schema was auto-generated from three merged ontologies using the `scripts/owl-to-masp.py` script (see spec: "Merging multiple ontologies into one schema"): the [LexInfo ontology](https://lexinfo.net/) (v3.0), and the [OntoLex-Lemon](https://www.w3.org/2016/05/ontolex/) `ontolex` (core) and `synsem` modules that LexInfo's own properties specialise. Converting all three together, rather than as three separate schemas, means classes like `ontolex:LexicalEntry` and `ontolex:LexicalSense` — which many LexInfo properties point at as their domain — resolve to real, documented classes here instead of bare external IRIs.

The ontologies' named individuals (e.g. the `lexinfo:PartOfSpeech` values `lexinfo:noun`, `lexinfo:verb`, or the `lexinfo:Case`, `lexinfo:Gender` and `lexinfo:Tense` values) are ported as instances of their class and listed in an `ItemList` per class. Properties whose range is one of those classes (e.g. `lexinfo:partOfSpeech`) offer the standard values from that list, but keep the class in their range too, so other instances of the class are still valid.

## All Rules:

${rules.all}

## Value Lists

${rules.allItemLists}
