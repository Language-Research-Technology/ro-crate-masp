# RO-Crate Machine Actionable Schemas and Profiles (RO-Crate MASP)

A MASP is an RO-Crate that defines terms for use in making other RO-Crates. It contains either a general purpose vocabulary of classes and properties (a **schema**) or the **specialized** rules for combining them in a particular domain (a **profile**). Its rules can be kept in sync with a spreadsheet, and human-readable documentation is generated from them.

(There is actually no technical difference between a Schema and a Profile except its specificity - the same tools work with any MASP.)

![What a MASP is: a MASP RO-Crate package holds the rules (ro-crate-metadata.json), an optional spreadsheet version kept in sync with them, and a generated summary document. The doc generation script combines the rules with a text description to produce the documentation.](docs/diagrams/doc-generation.svg)

> **Updated 2026-11-25: several things that used to be here have moved.**
>
> - **JavaScript MASP validator** → [crate-works/ro-crate-masp-validator](https://github.com/crate-works/ro-crate-masp-validator), on npm as [`@crate-works/ro-crate-masp-validator`](https://www.npmjs.com/package/@crate-works/ro-crate-masp-validator). Report validator bugs and make validator changes there; this repository uses it as a dependency.
> - **Schema template** (`schemas/template`) → [masp-templates](https://github.com/Language-Research-Technology/masp-templates)
> - **JavaScript tools** (`generate-masp-docs.js`, the mode-file, schema.org and OWL converter scripts, and their tests) → [crate-works/ro-crate-masp-tools](https://github.com/crate-works/ro-crate-masp-tools), installed here as a dev dependency; the `build` script calls it.
> - **Examples** (every profile except the MASP profile, all of `schemas/`, the catalogue and landing page, and their tests) → [ro-crate-masp-examples](https://github.com/Language-Research-Technology/ro-crate-masp-examples), published at https://language-research-technology.github.io/ro-crate-masp-examples/. Their old addresses on this site still work: each HTML page redirects to its new home, and the `ro-crate-metadata.json` files stay here as frozen copies.

## About this repo

This repository is for the development of RO-Crate Machine Actionable Schemas and Profiles (MASP), which implement the requirements set out in "Notes for RO-Crate Machine Actionable Profiles and Schemas" ([The Notes]).

[The Notes]: https://docs.google.com/document/d/17WRkGPIGtoQoSPlTbStBKUyHTzjrOZb620S1gdk0ei8/edit?tab=t.0#heading=h.5vdkev2g6ira

We have some [discussion here](./docs/requirements-coverage.md) on how this solution addresses [The Notes].

This work builds on previous prototyping by PT Sefton under the banner "SoSS+". That work is on a branch of the Language Data Commons [RO-Crate-Schema-Tools repo](https://github.com/Language-Research-Technology/ro-crate-schema-tools/tree/sossplus), which has a variety of bits of code and prototype schemas and profiles in various states of repair.

## Start here

This repository contains a [draft profile for _RO-Crate Machine Actionable Schemas and Profiles_](profiles/ro-crate-masp/profile-crate/profile-documentation.md), which acts as an introduction to MASP.

Other resources:

- **Examples**: [ro-crate-masp-examples](https://github.com/Language-Research-Technology/ro-crate-masp-examples) has example profiles and schemas, with their documentation published on the [examples site](https://language-research-technology.github.io/ro-crate-masp-examples/). Things to look at there:
  - A port of the [Workflow RO-Crate Profile 1.0](https://about.workflowhub.eu/Workflow-RO-Crate/): [experimental new version](https://language-research-technology.github.io/ro-crate-masp-examples/profiles/workflow/profile-crate/index.html).
  - A profile for the small number of metadata requirements in the core RO-Crate specification: [experimental new version](https://language-research-technology.github.io/ro-crate-masp-examples/profiles/ro-crate/profile-crate/index.html).
- **Templates**: [masp-templates](https://github.com/Language-Research-Technology/masp-templates) is a starting point for writing your own profile or schema.

## Implementations

JavaScript code for working with MASP crates lives in its own repositories:

- **Validation**: [ro-crate-masp-validator](https://github.com/crate-works/ro-crate-masp-validator) checks an RO-Crate against a MASP profile or schema. It is on npm as `@crate-works/ro-crate-masp-validator` and includes a command-line tool, `masp-validate`.
- **Documentation and conversion**: [ro-crate-masp-tools](https://github.com/crate-works/ro-crate-masp-tools) generates human-readable documentation from a MASP crate, keeps its spreadsheet copy in sync, writes Crate-O mode files, and converts OWL ontologies and schema.org into MASP schemas.

### Editors

- **[Crate-O](https://github.com/crate-works/crate-o)** ([try it](https://crate-works.github.io/crate-o/)) loads MASP profile crates and builds its forms from them, using the [MASP validator](https://github.com/crate-works/ro-crate-masp-validator) to work out the classes and fields to show and to validate crates as they are edited. A profile can add an optional `crate-o-mode.json` for layout hints such as field groups. Beta.
- **[NovaCrate](https://github.com/kit-data-manager/NovaCrate)** ([try it](https://novacrate.datamanager.kit.edu/)), from KIT, has its own independent implementation. Since v1.14 it loads MASP profiles named in a crate's `conformsTo` and uses them to guide editing; MASP is its default profile mechanism ([docs](https://github.com/kit-data-manager/NovaCrate/blob/main/docs/profiles.md)). Early days: the release officially supports only the bundled Workflow profile, and checking crates against profiles is on its `dev` branch.
- **[wpsld](https://github.com/stain/wpsld)**, a desktop RO-Crate editor in Java (JavaFX) by Stian Soiland-Reyes, narrows its schema.org-based forms using MASP profiles loaded from a file or URL. See its [MASP notes](https://github.com/stain/wpsld/blob/main/MASP.md).

NovaCrate and wpsld are independent of the JavaScript linked above, which shows the profile format can be implemented from the spec alone.

### Validating RO-Crates from the command line

You can validate a target RO-Crate against a profile crate or schema using `masp-validate`, the command-line tool from [`@crate-works/ro-crate-masp-validator`](https://github.com/crate-works/ro-crate-masp-validator):

```bash
npx masp-validate [--json] <target-crate.json> <profile-crate.json>
```

The tool prints validation results to the console and exits with a nonzero code if errors are found. The [examples repository](https://github.com/Language-Research-Technology/ro-crate-masp-examples) has worked examples, such as validating its minimal workflow crate against the workflow profile.

## Architecture of the solution

The core of MASP uses RO-Crates to package Profiles (or Schemas, which can be authored in the same way but would typically be more permissive).

A MASP crate can be combined with a textual summary of the Profile to create documentation with an automatically generated summary of what should be in conformant crates (see the diagram at the top of this README).

MASPs drive editors: a researcher describes their data in an editor whose forms come from a profile, and the editor checks the crate against the same rules as they go, so problems are fixed while editing. Editors can also edit MASPs themselves: load the MASP profile into an editor to create and edit other schemas and profiles, since they are RO-Crates too.

![Editing: a researcher describes their data in the editor's forms, which save the RO-Crate; the validator inside the editor checks it and sends anything to fix back to the researcher. Below, the MASPs: a row of profiles (LDAC collection, Workflow RO-Crate, your profile, and the MASP profile, which is used to edit other MASPs) above a row of schemas (Schema.org, LDAC terms, Darwin Core, PROV-O). The LDAC collection profile drives the forms.](docs/diagrams/editing.svg)

MASPs can also be used to validate crates deposited to a repository, or any other service that takes RO-Crate as an input.

![Deposit: above, the MASPs, a row of schemas and a row of profiles. A depositor deposits an RO-Crate that conforms to the Workflow RO-Crate profile. The repository's validator checks it against that profile; crates that conform are accepted into the repository, and errors go back to the depositor in a validation report to fix and resubmit.](docs/diagrams/deposit.svg)

## Constraint modelling note

Rule constraints that assert literal values are modelled via `PropertyValue` entities referenced from a property's `rangeIncludes`.

- Do not put constraint literals directly on `rdf:Property` rules using a `value` field.
- Define a `PropertyValue` entity with a clear name and its `value` (literal, `@id` object, or regex literal string).
- Reference that `PropertyValue` from the relevant property rule through `rangeIncludes`.

This pattern is the canonical way to express fixed and pattern-based value constraints in MASP. (See [#47](https://github.com/Language-Research-Technology/ro-crate-masp/issues/47) for a proposed `sh:pattern` replacement for regex literals.)

## Running the tests

```bash
npm test                                   # run all tests
npx mocha test/mode-file.test.js           # run a single test file
```

The tests here check the MASP profile's Crate-O mode file. The validator, the tools and the examples each have their own tests in their own repositories.

## Building documentation

```bash
npm run build    # regenerates the MASP profile's documentation
```

This runs `generate-masp-docs` from [ro-crate-masp-tools](https://github.com/crate-works/ro-crate-masp-tools) with `-x`, which first syncs `ro-crate-metadata.json` and `ro-crate-metadata.xlsx` (the newer file wins). See that repository for its options and the other tools: Crate-O mode files, and converters from OWL and schema.org.

The diagrams in this README are PlantUML sources in [docs/diagrams/](docs/diagrams/), sharing a stylesheet (`masp-style.iuml`) and, for the editing and deposit diagrams, the MASP examples (`masp-examples.iuml`). After editing one, regenerate the images with [PlantUML](https://plantuml.com/), but this is not required as the [Render diagrams](.github/workflows/diagrams.yml) workflow re-renders the images and commits them if they changed.

```bash
cd docs/diagrams && plantuml -tsvg *.puml && plantuml -tpng *.puml
```

## Help wanted!

We'd welcome more implementations, particularly other approaches to validation: can MASP profiles and schemas be transformed into SHACL?
