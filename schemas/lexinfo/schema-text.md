---
title: LexInfo + OntoLex-Lemon Schema Terms
---

# LexInfo + OntoLex-Lemon Schema Terms

This MASP Schema was auto-generated from three merged ontologies using the `scripts/owl-to-masp.py` script (see spec: "Merging multiple ontologies into one schema"): the [LexInfo ontology](https://lexinfo.net/) (v3.0), and the [OntoLex-Lemon](https://www.w3.org/2016/05/ontolex/) `ontolex` (core) and `synsem` modules that LexInfo's own properties specialise. Converting all three together, rather than as three separate schemas, means classes like `ontolex:LexicalEntry` and `ontolex:LexicalSense` — which many LexInfo properties point at as their domain — resolve to real, documented classes here instead of bare external IRIs.

## All Rules:

${rules.all}
