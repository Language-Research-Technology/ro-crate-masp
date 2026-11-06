---
title: AusTalk Vocabulary Schema Terms
---

# AusTalk Vocabulary Schema Terms

The AusTalk schema is used for describing the AusTalk corpus of Australian English and is published at https://w3id.org/austalk/schema. The schema is based on archive material of the AusTalk static site and other repositories:
- [austalk-static-site](https://github.com/Alveo/austalk-static-site): The austalk.edu.au website
- [bigasc-metadata](https://github.com/ptsefton/bigasc-metadata): Code to generate metadata for the AusTalk (Big ASC) corpus
- [smallasc](https://github.com/Alveo/smallasc)
- [language-data-commons-vocabs/vocabs/austalk](https://github.com/Language-Research-Technology/language-data-commons-vocabs/tree/master/vocabs/austalk)

### Namespaces

The terms keep the namespaces of the original AusTalk metadata, so that they are the same terms as in existing AusTalk RDF data rather than new copies of them:

| Prefix | Namespace |
| ------ | --------- |
| `austalk:` | `http://ns.austalk.edu.au/` |
| `ausnc:` | `http://ns.ausnc.org.au/schemas/ausnc_md_model/` |

These come from the AusTalk metadata scripts of 2012 ([`schema/austalk.owl` and `readme.md` in bigasc-metadata](https://github.com/ptsefton/bigasc-metadata)); `ausnc:` is the Australian National Corpus (AusNC) metadata model, reused for items and some corpus-level metadata. Neither namespace resolves, so each term carries its label and description in this schema and a `url` to this documentation.

<br>

## All Rules:

${rules.all}

<br>

${rules.allDefinedTermSets}

