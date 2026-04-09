# Project Context: ro-crate-masp

**What it is:** Proof-of-concept Node.js tooling for **RO-Crate Machine Actionable Profiles and Schemas (MASP)**. Profiles and schemas are themselves RO-Crates containing rules as contextual entities.

**Package name:** `ro-crate-maps` (npm) - TODO - CHANGE THIS TO MASP

**Related repo:** `../crate-o/` (branch `MASP`) — the editor being extended to consume MASP profiles.

## Key commands

```bash
npm test                        # Mocha unit tests
npm run build                   # Build all profile/schema docs
npm run build:workflow-profile  # Build Workflow RO-Crate profile docs
npm run validate:workflow        # Validate example crate against workflow profile
node generate-masp-docs.js <profile-crate> <text.md> <output.md>  # Generate docs
```

## Architecture

- **`generate-masp-docs.js`** — CLI: generates human-readable docs from a MASP profile crate + markdown text. Supports `--multi-page` for large schemas.
- **`lib/masp-validator.js`** — validates a candidate RO-Crate against a MASP profile crate
- **`validate-crate.js`** — CLI wrapper for the validator
- **`scripts/generate-schema-org-crate.js`** — fetches schema.org JSON-LD and converts to a MASP schema crate

## Profiles and schemas

```
profiles/
  ldac/          # LDAC profile
  ro-crate/      # Core RO-Crate profile
  ro-crate-masp/ # The MASP spec itself (self-describing)
  workflow/      # Workflow RO-Crate profile port
schemas/
  ldac/
  austalk/
  schema-org/    # Full schema.org as a MASP schema crate (~1010 classes, ~1676 properties)
  template/
```

Each profile/schema directory contains:
- `profile-crate/ro-crate-metadata.json` — the machine-readable MASP crate
- `profile-text.md` — human-authored narrative text
- `profile-crate/profile-documentation.md` — generated output (do not hand-edit)

## Key concepts

- **Profile crate**: An RO-Crate whose entities describe classes, properties, and validation rules
- **Class entity**: has `@type: rdfs:Class`, `subClassOf`, `domainIncludes` links
- **Property entity**: has `@type: rdf:Property`, `domainIncludes`, `rangeIncludes`
- **Rules**: encoded as `PropertyValueSpecification` or similar contextual entities linked from class/property entities
- **Validation**: `masp-validator.js` walks the candidate crate, checks required properties, value types, and cardinality against the profile

## Notes

- Spec background: [The Notes](https://docs.google.com/document/d/17WRkGPIGtoQoSPlTbStBKUyHTzjrOZb620S1gdk0ei8/edit)
- Previous prototype work was under the name "SoSS+" in the `ro-crate-schema-tools` repo
- `SOSS` was renamed to `MASP` throughout the codebase
