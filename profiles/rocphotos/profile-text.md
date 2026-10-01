# Rocphotos RO-Crate Profile

## Overview

This profile is for representing photo collections stored on a filesystem as nested RO-Crates, so that metadata about the photos and their context can be persisted ove the long term. This is implemented in 
[rocphotos](https://github.com/ptsefton/rocphotos) but is designed to be application neutral so other applications can work with the metadata using this profile. There are three kinds of crate,
and one profile covers them: each has its own root class (below).

- **Main collection crate** (one per collection): sub-collections as `Dataset`s, albums
  (`ImageGallery`), and every `Person`/`Pet` depicted. People are described
  here. They are not linked from the root dataset; nothing needs them to be.
- **Folder collection crate** (one per photo directory): an `ImageObject` per
  photo, an `ImageRegion` per tagged face/pet, and an instance of each
  person/pet depicted.
- **Faces crate** (in the app's housekeeping directory): a `FaceEmbedding` per
  face-recognition reference, for inspection only; matching uses a SQLite index.

## Three kinds of root

Every crate's metadata descriptor must have exactly one `about`, and its value
must fit one of three root classes. All three are `Dataset`s with a `name` and
a `hasPart`; what `hasPart` holds is what tells them apart:

| Root class | `hasPart` holds |
|---|---|
| Main collection root | sub-collection references and albums |
| Folder collection root | photos |
| Faces crate root | face embeddings |

A root that mixes these fits none of them. A sub-collection reference in the
main crate has no `hasPart`, so it cannot pass as a root.

## People and pets

Identity is collection-wide, derived from the name
(`arcp://name,rocphoto/person/<NameSlug>`). Every crate that depicts someone
carries a copy of that identity, so each crate reads standalone; the copy
carries `name` and nothing else, and the main collection crate's copy is the
one that describes them. Image `about`, region `about` and a standoff
region's `oa:hasBody` all name the identity directly.

A crate may also hold an **instance** of a person — a second node,
`prov:specializationOf` the identity, that references point at instead. It
says that this part of the collection knows them by a different name: a birth
name in the 2005 crates, a chosen name in the 2025 ones. An instance is
written only where that is actually so. Writing one for every person in every
crate would mean its presence said nothing, and a copy nobody had got round
to updating would then be indistinguishable from a deliberate local name.
Crates written before this rule hold an instance per person regardless and
remain valid: a reference may name either.

Canonical and instance are both `schema:Person`, distinguished by required
properties: `name` vs `prov:specializationOf`.

Where the photo file's own tag disagrees with the name a crate records for a
region, the crate's name stands and the file's is kept beside it as
`nameInFile`, for somebody to decide between later. Renaming a person
rewrites every crate that depicts them, and it cannot rewrite the photo files
unless write-back is enabled, so re-deriving a region from EXIF would
otherwise undo the rename without saying so. The property is absent whenever
the two agree.

## Relationships between people

A person once carried a repeatable `parent` property. It has been removed: a parent is a relationship, and the relationship classes below say far more about one — when it held, which end is which — than a bare link from a person could. Keeping both would have meant two ways to state the same fact, pointing opposite ways, with nothing to say which a reader should believe.

A relationship is not a property of either person — a marriage is not something one of them *has* — so it is an entity of its own joining them, which is also what lets it carry a span of time. These specialize [Records in Contexts](https://www.ica.org/standards/RiC/ontology)' `rico:Relation`.

**The kind of relationship is the class, not a value on a shared class.** That is deliberate. A `DefinedTerm` has no way to say which end of a directed relation plays which role, so recording the kind as a term would leave the direction written as prose on a property every kind shared — true of all of them by convention, guaranteed of none, and silently wrong for the first term that broke it. A class can state its own direction, and each of these does.

**Only the kinds RiC already has a class for**, used as they stand:

| Kind | Is | Direction |
| --- | --- | --- |
| Married | `rico:SpouseRelation` | none |
| Parent and child | `rico:ChildRelation` | parent → child |

Nothing is coined here. A kind RiC does not cover — a de facto partnership, going out, a relation at a particular remove — waits until there is a way to say it in a vocabulary somebody else maintains, rather than being invented in this profile and then having to be reconciled later.

The directed one follows RiC's own orientation, which runs **down** a generation: the parent is `rico:relationHasSource` and the child is `rico:relationHasTarget`. Recording it the other way up would make the specialization a lie, since no `sameAs` can connect a relation to its inverse.

**Each kind declares its own participant properties, with its own words for them.** `rico:relationHasSource` and `rico:relationHasTarget` would be the same pair for any directed kind, so the property name cannot say what either end means; a rule declared per class can. The parent-child kind calls them Parent and Child and says plainly which is which. The display name is the rule's `name`; `rdfs:label` is the property as written into the crate, which is what MASP looks up.

The undirected kind lists its people on `rico:relationConnects`, in no significant order. (RiC's `relationSource` is something else entirely — the source of information for the assertion, a literal.) Both take an optional `rico:beginningDate` and `rico:endDate`, to whatever precision is known.

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

- The `rocphotos:` terms are coined here
- References that cross crates have no range, since the validator can only
  resolve a reference within the crate it is checking: a `FaceEmbedding`'s
  `about` (the `Person` is in the main crate) and an album item's
  `prov:specializationOf` (the photo is in its folder crate).

## Rules

${rules.all}

${rules.allItemLists}
