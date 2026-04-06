# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**RO-Crate Machine Actionable Schemas and Profile (RO-Crate-MASP)** is a proof-of-concept for machine-actionable profiles and validation schemas for [RO-Crates](https://www.researchobject.org/ro-crate/). The three main capabilities are:

1. **Validation** — validate a candidate RO-Crate against rules defined in a Profile/Schema crate
2. **Documentation generation** — generate markdown docs from a Profile crate
3. **Editor configuration** — (planned)

## Commands

```bash
npm install          # Install dependencies
npm test             # Run all tests (Mocha, ~8 tests)

# Run a single test file
npx mocha test/ldac-validator.test.js

# Build documentation for a profile/schema
npm run build:ldac-profile
npm run build:workflow-profile
# (see package.json for all build:* targets)

# Validate a crate from the CLI
node validate-crate.js <target-crate.json> <profile-crate.json>
node validate-crate.js --json <target-crate.json> <profile-crate.json>  # JSON output
```

## Architecture

### Core Engine

**`lib/masp-validator.js`** — the entire validation engine (~1,100 lines):
- `MaspValidator` — loads a Profile/Schema crate, parses its rules, and validates target crates
- `ClassRule` — validates entity `@type` and cardinality constraints (`sh:minCount`/`sh:maxCount`)
- `PropertyRule` — validates property constraints (cardinality, `rangeIncludes`, fixed `value`)
- `ItemListRule` — validates properties against enumerated value sets
- `TermRule` — validates defined term sets (stub, for future expansion)

`parseRules()` walks the `ResourceDescriptor` entity in the profile crate, building a rule graph. `validateCrate(targetCrate)` runs all rules against every entity in the target crate, returning:
```js
{ error: [{message, rule, entity}], success: [{message, rule}], rules: { [ruleId]: { [entityId]: {...} } } }
```

### Profile/Schema Crate Format

Profiles and schemas are themselves RO-Crates (`ro-crate-metadata.json`). Rules live as entities in `@graph`:

- **`Dataset` (root)** has a `hasResource` pointing to a `ResourceDescriptor`
- **`ResourceDescriptor`** lists all rule entities via `hasPart`
- **`rdfs:Class` entities** — class rules: `prov:specializationOf` links to the schema.org type; `sh:minCount`/`sh:maxCount` set cardinality; `@reverse.domainIncludes` links to property rules
- **`rdf:Property` entities** — property rules: `domainIncludes` points to their class; `rangeIncludes` restricts value types; optional `value` fixes the value; `sh:minCount`/`sh:maxCount` set cardinality
- **`ItemList` entities** — enumeration constraints; referenced by property rules via `itemListElement`

### Profiles vs Schemas

Both use identical crate structure. Conceptually:
- **Profiles** (`profiles/`) — strict, define what a conforming crate *must* contain
- **Schemas** (`schemas/`) — more permissive, extend or specialise profiles for a domain (e.g., LDAC, AusTalk)

Each profile/schema directory contains:
```
profile-crate/
  ro-crate-metadata.json   # Machine-readable rules
  profile-text.md          # Human-readable description template
  profile-documentation.md # Generated output (do not edit manually)
```

### Documentation Generation

**`generate-masp-docs.js`** combines `ro-crate-metadata.json` + `profile-text.md` → `profile-documentation.md`. The template uses `${rules.all}`, `${rules.allItemLists}`, etc. as placeholders for auto-generated rule summaries. Pass `--multi-page` to generate a multi-page HTML site (used for schema-org).

### Tests

Tests live in `test/` and use Mocha + Chai (`expect` style). They load real profile crates from `profiles/` and real sample crates from `test_data/`, so changes to either affect tests.
