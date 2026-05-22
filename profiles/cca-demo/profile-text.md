# Climate Change Adaptation RO-Crate Profile (Demo)

> **Note:** This is a demo/work-in-progress adaptation of Stian Soiland-Reyes'
> ["Scruffy" CCA profile](https://github.com/FAIR2Adapt/cca-crate-profile/pull/2)
> for use as a MASP profile. See [issue #17](https://github.com/Language-Research-Technology/ro-crate-masp/issues/17).

Fair2Adapt project uses RO-Crates for implementing and exchanging FAIR Digital
Objects (FDOs) for Climate Change Adaptation (CCA) research, and defines the CCA
RO-Crate profile to define the set of conventions, types and properties that one
can minimally require and expect to be present in that subset of RO-Crates.

The CCA RO-Crates are a specialization of RO-Crate for packaging key common data
and contextual entities used/produced during the research lifecycle in climate
change adaptation domain. This includes all the metadata properties expected to
be captured and exposed about these resources to enable FAIR discovery, access
and reuse.

Profile URI: <https://w3id.org/cc-crate-profile/0.9>

Source: <https://github.com/FAIR2Adapt/cca-crate-profile>

## Introduction

The FAIR2Adapt is a multidisciplinary project geared towards transforming data
into actionable knowledge to shape climate adaptation strategies. We adopt FAIR
Digital Objects (FDOs) by using RO-Crate and other complementary technologies
(like nanopublications, I-Adopt framework) and use tailored FDO services to
build a collaborative, user-friendly FAIR and open data sharing framework.

## Conformance

RO-Crates conforming to (or intending to conform to) the CCA profile **SHOULD**
declare this using `conformsTo` on the Root Data Entity:

```json
{
    "@id": "./",
    "@type": "Dataset",
    "conformsTo": {
        "@id": "https://w3id.org/cc-crate-profile/0.9"
    }
}
```

## CCA-Specific Terms

The profile defines a CCA extension vocabulary at
<https://w3id.org/ro/terms/cca/> with the following classes and properties:

${rules.all}
