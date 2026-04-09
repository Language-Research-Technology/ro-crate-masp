# GitHub Copilot Instructions

## Project Overview

**RO-Crate Machine Actionable Schemas and Profile (RO-Crate-MASP)** is a Node.js proof-of-concept for machine-actionable profiles and validation schemas for [RO-Crates](https://www.researchobject.org/ro-crate/). Three capabilities:

1. **Validation** — validate a candidate RO-Crate against rules in a Profile/Schema crate
2. **Documentation generation** — generate HTML/markdown docs from a Profile crate
3. **Editor configuration** — planned

## Key Commands

```bash
npm install                               # install dependencies
npm test                                  # run all tests (Mocha/Chai, ~72 tests)
npx mocha test/ldac-validator.test.js     # run a single test file
npm run build                             # rebuild all profile/schema documentation
npm run build:ldac-profile                # rebuild one target (see package.json for all)
node validate-crate.js <target> <profile> # CLI validator
node validate-crate.js --json <target> <profile>
```

## Architecture

### Core Engine — `lib/masp-validator.js`

The entire validation engine. Key classes:

- **`MaspValidator`** — loads a Profile/Schema crate, calls `parseRules()`, then `validateCrate(targetCrate)`
- **`ClassRule`** — validates entity `@type` and cardinality (`sh:minCount`/`sh:maxCount`)
- **`PropertyRule`** — validates property cardinality, `rangeIncludes`, and fixed `value`
- **`ItemListRule`** — validates properties against enumerated value sets
- **`TermRule`** — validates defined term sets (stub)

`parseRules()` walks the `ResourceDescriptor` entity in the profile crate to build a rule graph.

`validateCrate(targetCrate)` returns:
```js
{
  error:   [{ message, rule, entity }],
  success: [{ message, rule }],
  rules:   { [ruleId]: { [entityId]: { ... } } }
}
```

### Profile/Schema Crate Format

Profiles and schemas are RO-Crates (`ro-crate-metadata.json`). Rules are entities in `@graph`:

| Entity type | Role |
|---|---|
| `Dataset` (root) | has `hasResource` → `ResourceDescriptor` |
| `ResourceDescriptor` | lists rule entities via `hasPart`; `hasRole` identifies schema vs vocabulary vs example |
| `rdfs:Class` | class rule: `prov:specializationOf` → schema.org type; `sh:minCount`/`sh:maxCount`; `@reverse.domainIncludes` → property rules |
| `rdf:Property` | property rule: `domainIncludes` → class; `rangeIncludes` → value types; optional `value` for fixed values |
| `ItemList` | enumeration constraint; referenced via `itemListElement` |

`hasRole` values:
- `http://www.w3.org/ns/dx/prof/role/schema` — class/property rules
- `http://www.w3.org/ns/dx/prof/role/vocabulary` — enumeration values
- `http://www.w3.org/ns/dx/prof/role/example` — example crates

### Profiles vs Schemas

Same crate structure; different intent:
- **`profiles/`** — strict, define what a conforming crate *must* contain
- **`schemas/`** — more permissive, domain extensions (LDAC, AusTalk, Schema.org)

Each directory contains:
```
profile-crate/
  ro-crate-metadata.json     # machine-readable rules (edit this)
  profile-documentation.md   # generated — do not edit manually
  index.html                  # generated — do not edit manually
```
And alongside it:
```
profile-text.md              # human-written narrative template
```

### Documentation Generator — `generate-masp-docs.js`

Combines `ro-crate-metadata.json` + `profile-text.md` → `profile-documentation.md` + `index.html`.

Template placeholders (used inside `profile-text.md`):
- `${rules.all}` — all classes + properties tables
- `${rules.allDefinedTermSets}` — all DefinedTermSet tables
- `${rules.allItemLists}` — all ItemList tables
- `${rules.examples}` — example crate summaries

Pass `--multi-page` to generate a multi-page HTML site (one page per class/property) — used for the schema-org schema which has 2400+ entities.

### Tests — `test/`

Mocha + Chai (`expect` style). Tests load real profile crates from `profiles/` and real sample crates from `test_data/` — changes to either affect test results.

## Coding Conventions

- Plain Node.js — no TypeScript, no build step
- `ro-crate` npm package used to load crates: `new ROCrate(json, { array: true, link: true })`
- With `link: true`, entity references resolve to live objects; `@reverse` links are available
- `hasRole` may be a single object or an array — always normalise before `.some()`:
  ```js
  (Array.isArray(x) ? x : x ? [x] : []).some(...)
  ```
- Generated files (`profile-documentation.md`, `index.html`, `ro-crate-preview_files/`) are committed to the repo so GitHub Pages can serve them — always rebuild after changing the generator or a profile crate
- Provenance links in generated output always use `main` as the branch, not the current working branch
- Internal profile entity IDs start with `#` (e.g. `#class_Dataset`, `#prop_author_CreativeWork`); schema.org terms use full `https://schema.org/` URIs
- Do not edit generated files directly; edit the source (`ro-crate-metadata.json` or `profile-text.md`) and rebuild

## Common Patterns

**Load a profile crate:**
```js
const { ROCrate } = require('ro-crate');
const json = JSON.parse(fs.readFileSync('ro-crate-metadata.json', 'utf8'));
const crate = new ROCrate(json, { array: true, link: true });
```

**Iterate all entities:**
```js
for (const entity of crate.entities()) { ... }
```

**Validate a crate:**
```js
const { MaspValidator } = require('./lib/masp-validator');
const validator = new MaspValidator(profileCrate);
validator.parseRules();
const result = validator.validateCrate(targetCrate);
```
