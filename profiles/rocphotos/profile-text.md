---
title: rocphotos Profile
---

## Overview

Photo collections stored on a filesystem as nested RO-Crates by
[rocphotos](https://github.com/ptsefton/rocphotos). Three kinds of crate share
one root `Dataset` shape, so one profile covers them; cardinality is asserted
only where it holds for all three.

- **Root crate** (one per collection): sub-collections as `Dataset`s, albums
  (`ImageGallery`), and on `mentions` every `Person`/`Pet` depicted. People are
  described here.
- **Sub-collection crate** (one per photo directory): an `ImageObject` per
  photo, an `ImageRegion` per tagged face/pet, and an instance of each
  person/pet depicted.
- **Faces crate** (in the app's housekeeping directory): a `FaceEmbedding` per
  face-recognition reference, for inspection only; matching uses a SQLite index.

## People and pets

Identity is collection-wide, derived from the name
(`arcp://name,rocphoto/person/<NameSlug>`). Each crate holds one **instance**
per person, which `prov:specializationOf` that identity; image `about`, region
`about` and standoff body proxies point at the instance. This lets a person
appear under different names in different crates (e.g. birth name in 2005,
chosen name in 2025).

Canonical and instance are both `schema:Person`, told apart by required
properties: `name` vs `prov:specializationOf`. Same for pets and body proxies.

## Face regions

- **EXIF (MWG)**: rebuilt from the photo file on every scan. Area is a
  **centre** point plus size, as fractions.
- **Standoff**: a face confirmed in the app, typed `oa:Annotation` and
  `ImageRegion`. `oa:hasTarget` is a Media Fragment whose `xywh` is the
  **top-left** corner. `oa:motivatedBy` is always `oa:identifying` (see
  Value lists, below).

## Namespaces

`schema:` and `oa:` where a term exists; otherwise `rocphotos:`
(`https://w3id.org/ldac/rocphotos/terms#`): `Pet`, `ImageRegion`,
`FaceEmbedding`, `regionType`, `writtenToFile`, `embedding`, `rating`, etc.
Each crate's `@context` binds these, so bare terms don't fall through to
`@vocab`. `width`/`height` stay schema.org.

## Value lists

ItemList values are IRIs, and the crate must contain each value's entity,
matching the profile's copy property for property (`@type` compared as a
literal string, so write `oa:Motivation`, not the full IRI).

- `oa:motivatedBy`: "Annotation motivations" list, currently only
  `oa:identifying` (same entity as the
  [Web Annotation schema](https://language-research-technology.github.io/ro-crate-masp/schemas/oa/schema-crate/index.html)).
  A list so more motivations can be added later.
- `regionType`: a literal ("Face" or "Pet"), so declared as text, not an
  ItemList.

## Known gaps

- The `rocphotos:` terms are coined here; schema.org defines none of them.
- A `FaceEmbedding`'s `about` points at a `Person` the faces crate doesn't
  contain, so it is left unconstrained.

## Rules

${rules.all}

${rules.allItemLists}
