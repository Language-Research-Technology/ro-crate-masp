# Schema.org Vocabulary

This is the full [schema.org](https://schema.org) vocabulary expressed as a MASP schema crate. It is generated automatically from the [official schema.org JSON-LD dump](https://schema.org/version/latest/schemaorg-current-https.jsonld) using `scripts/generate-schema-org-crate.js`.

## Purpose

This schema serves as:

- A **reference implementation** demonstrating MASP documentation generation at scale (~800 classes, ~1400 properties)
- A **base vocabulary** that other MASP profiles and schemas can specialise via `prov:specializationOf`

## Regenerating

To regenerate this schema from the latest schema.org release:

```bash
npm run generate:schema-org-crate
npm run build:schema-org-schema
```

${rules.all}

${rules.allItemLists}
