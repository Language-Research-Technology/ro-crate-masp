---
title: rocphotos Profile
---

## Overview

A profile for photograph collections kept "at rest" on a filesystem as nested
RO-Crates, as produced by [rocphotos](https://github.com/ptsefton/rocphotos).
A collection is made of three kinds of crate:

- **The root crate**, one per collection. Lists each sub-collection as a
  `Dataset`, holds any albums (`ImageGallery`), and — on its `mentions` —
  every `Person` and `Pet` depicted anywhere in the collection. This is the
  crate in which a person is *described*: their name is derived from the
  photos, but anything further known about them belongs here.
- **A sub-collection crate** per directory of photos. Holds an `ImageObject`
  per photograph, an `ImageRegion` per tagged face or pet, and an instance of
  each person/pet depicted (below).
- **The faces crate**, under the application's own housekeeping directory:
  one `FaceEmbedding` per face-recognition reference, for inspection. Matching
  itself queries a companion SQLite index, not this crate.

All three share the same root `Dataset`/descriptor shape, which is why one
profile covers them: the class rules below describe what may appear, and
cardinality is asserted only where it holds for every crate.

## People (and pets)

A person's identity is derived from their name and is collection-wide
(`arcp://name,rocphoto/person/<NameSlug>`). Inside a crate, though, nothing
points at that identity directly. Each crate carries **an instance** of the
person — one per person per crate — and the image's `about`, the region's
`about` and a standoff region's body proxy all point at the instance, which
`prov:specializationOf` the shared identity.

The indirection exists so the same person can be recorded under the name they
went by in that part of the collection: a birth name in the crates covering
2005 and a chosen name in those covering 2025, still resolving to one person.
Since a sub-collection is usually a slice of time, the crate is the natural
unit for that.

Both are `schema:Person`, so they are told apart here by what they must carry —
a canonical person by `name`, an instance by `prov:specializationOf` — rather
than by type. The same applies to the pet classes and to a region's body proxy.

## Faces: two region shapes

A face tagged in the photo file itself (MWG, as written by digiKam, Lightroom
or Photos) is rebuilt from EXIF on every scan, and its area follows MWG's own
convention — a **centre** point plus size, as fractions of the image.

A face confirmed in the application is recorded instead as a *standoff*
annotation, whether or not it is ever written into the photo file, using the
[W3C Web Annotation vocabulary](https://www.w3.org/TR/annotation-vocab/). It is
typed `oa:Annotation` as well as `ImageRegion`, which is what distinguishes the
two shapes, and its `oa:hasTarget` is a W3C Media Fragment whose `xywh` is a
**top-left** corner — the opposite convention to the EXIF-derived shape.

## Known gap: the coined terms

This profile uses `schema:` and `oa:` wherever a term exists, and a
`rocphotos:` namespace (`https://w3id.org/ldac/rocphotos/terms#`) for the rest:
`Pet`, `ImageRegion`, `FaceEmbedding`, `regionType`, `writtenToFile`,
`embedding`, `rating` and friends. schema.org defines none of these.

rocphotos binds each of them as a term definition in every crate's own
`@context`, so the bare `regionType` a crate writes resolves to
`rocphotos:regionType` rather than falling through `@vocab` to a schema.org
IRI that does not exist. `width` and `height`, which a region also uses, are
deliberately left as schema.org's own rather than redefined.

One thing a crate does not yet describe, so the rule over it is left
unconstrained here rather than failing a crate: a `FaceEmbedding`'s `about`
points at a `Person` that the faces crate does not itself contain — unlike the
photo crates, which carry a copy of every identity they reference.

## Enumerations

An enumerated value in a MASP `ItemList` is an IRI, resolved within the crate
being validated. `regionType` is a plain literal ("Face" or "Pet"), so it is
declared as text rather than given an ItemList it could never satisfy.

`oa:motivatedBy` takes its value from the "Annotation motivations" list, which
for now holds only `oa:identifying`; using a list leaves room to add other
motivations later. Like any ItemList value, a crate must carry the
`oa:identifying` entity itself, with the same `@type`, `name` and
`description` as in this profile (the same as in the
[Web Annotation schema](https://language-research-technology.github.io/ro-crate-masp/schemas/oa/schema-crate/index.html)).

## Rules

${rules.all}

## Enumerations

${rules.allItemLists}
