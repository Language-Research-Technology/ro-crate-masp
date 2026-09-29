---
title: Web Annotation Vocabulary Schema Terms
---

# Web Annotation Vocabulary Schema Terms

This MASP Schema was machine-ported from the [W3C Web Annotation Vocabulary](https://www.w3.org/TR/annotation-vocab/) (namespace `http://www.w3.org/ns/oa#`, source [oa.ttl](https://www.w3.org/ns/oa.ttl)) using the `scripts/owl-to-masp.py` script. It has not been hand-edited.

All of the vocabulary's classes and properties are included. Its named individuals, the `oa:Motivation` values (`oa:commenting`, `oa:tagging`, etc.) and the `oa:Direction` values (`oa:ltrDirection`, `oa:rtlDirection`), are ported as instances of their class and listed in an `ItemList` per class (`#itemlist_Motivation`, `#itemlist_Direction`). Properties whose range is one of those classes (`oa:motivatedBy`, `oa:hasPurpose`, `oa:textDirection`) take their values from that list. The Annotation Protocol preferences `oa:PreferContainedDescriptions` and `oa:PreferContainedIRIs` are not ported, as they are HTTP `Prefer` header values rather than crate metadata.

## All Rules:

${rules.all}

## Value Lists

${rules.allItemLists}
