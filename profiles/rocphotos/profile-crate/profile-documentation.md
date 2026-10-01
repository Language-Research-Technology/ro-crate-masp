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

## Types of entities (specializations of Classes) and expected Properties


### <a id="RO-Crate_Metadata_Descriptor" title="#RO-Crate_Metadata_Descriptor"></a> Class: RO-Crate Metadata Descriptor

The entity that identifies the crate and points at its root data entity.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

#### Properties from RO-Crate Metadata Descriptor

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/CreativeWork" title="http://schema.org/CreativeWork" target="_blank" rel="noopener">CreativeWork</a> |
| <a href="#RO-Crate_Metadata_Descriptor.id" title="#RO-Crate_Metadata_Descriptor.id">@id</a> |  | Yes | Always ro-crate-metadata.json. | <a href="#propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id">RO-Crate Metadata Descriptor identifier</a> |  |
| <a href="#RO-Crate_Metadata_Descriptor.about" title="#RO-Crate_Metadata_Descriptor.about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Yes | The one root data entity of this crate. Exactly one value, which must have the shape of one of the three kinds of root. | <a href="#class_MainCollectionRoot" title="#class_MainCollectionRoot">Main collection root</a>, <a href="#class_FolderCollectionRoot" title="#class_FolderCollectionRoot">Folder collection root</a>, <a href="#class_FacesRoot" title="#class_FacesRoot">Faces crate root</a> |  |


### <a id="class_MainCollectionRoot" title="#class_MainCollectionRoot"></a> Class: Main collection root

The root of the main collection crate. Told apart from the other two roots by what its hasPart holds: the sub-collection folders, and any albums.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Main collection root

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
| <a href="#prop_mainroot_hasPart" title="#prop_mainroot_hasPart">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | Yes | Each sub-collection folder, as a Dataset reference, and each album. | <a href="#class_SubCollection" title="#class_SubCollection">Sub-collection reference</a>, <a href="#class_Album" title="#class_Album">Album</a> |  |
| <a href="#prop_mainroot_name" title="#prop_mainroot_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The name of the collection, folder or crate. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_FolderCollectionRoot" title="#class_FolderCollectionRoot"></a> Class: Folder collection root

The root of a crate for one folder of photos. Told apart from the other two roots by its hasPart holding photos.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Folder collection root

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
| <a href="#prop_folderroot_hasPart" title="#prop_folderroot_hasPart">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | Yes | Every photo in this folder. | <a href="#class_Photo" title="#class_Photo">Photo</a> |  |
| <a href="#prop_folderroot_name" title="#prop_folderroot_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The name of the collection, folder or crate. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_FacesRoot" title="#class_FacesRoot"></a> Class: Faces crate root

The root of the faces crate. Told apart from the other two roots by its hasPart holding face embeddings.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Faces crate root

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
| <a href="#prop_facesroot_hasPart" title="#prop_facesroot_hasPart">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | Yes | Every face-recognition reference. | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |  |
| <a href="#prop_facesroot_name" title="#prop_facesroot_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The name of the collection, folder or crate. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_SubCollection" title="#class_SubCollection"></a> Class: Sub-collection reference

How the main collection root lists a sub-collection folder: a Dataset with a name and no hasPart of its own (its own crate holds the photos).

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Sub-collection reference

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
| <a href="#prop_subcollection_name" title="#prop_subcollection_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The sub-collection's path, e.g. 2025/03/10. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_Photo" title="#class_Photo"></a> Class: Photo

A source photograph. Distinguished from the crate's other ImageObjects (thumbnails, album items) by carrying a title, which is always present — the file's own IPTC/XMP title, or its filename.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Photo

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/ImageObject" title="http://schema.org/ImageObject" target="_blank" rel="noopener">ImageObject</a> |
| <a href="#prop_photo_name" title="#prop_photo_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The file's own name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_photo_title" title="#prop_photo_title">title</a> | <a href="http://schema.org/title" target="_blank" rel="noopener">http://schema.org/title</a> | Yes | Always present: the IPTC/XMP title if the file has one, its filename otherwise. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_photo_about" title="#prop_photo_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | No | Everyone depicted, always via this crate's instance of them, never the shared identity directly. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a>, <a href="#MainPetClass" title="#MainPetClass">Pet</a>, <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a>, <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> |  |
| <a href="#prop_photo_dateCreated" title="#prop_photo_dateCreated">dateCreated</a> | <a href="http://schema.org/dateCreated" target="_blank" rel="noopener">http://schema.org/dateCreated</a> | No | From EXIF DateTimeOriginal. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> |  |
| <a href="#prop_photo_dateModified" title="#prop_photo_dateModified">dateModified</a> | <a href="http://schema.org/dateModified" target="_blank" rel="noopener">http://schema.org/dateModified</a> | No | The source file's modification time when last processed — what a rescan compares against to decide whether to re-read it. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> |  |
| <a href="#prop_photo_description" title="#prop_photo_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | No | The photo's own caption, if it has one. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_photo_exifData" title="#prop_photo_exifData">exifData</a> | <a href="https://w3id.org/ldac/rocphotos/terms#exifData" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#exifData</a> | No | Selected EXIF fields, each as a PropertyValue. | <a href="#class_ExifValue" title="#class_ExifValue">EXIF value</a> |  |
| <a href="#prop_photo_keywords" title="#prop_photo_keywords">keywords</a> | <a href="http://schema.org/keywords" target="_blank" rel="noopener">http://schema.org/keywords</a> | No | IPTC/XMP keywords, excluding any that duplicate a region's name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_photo_processingError" title="#prop_photo_processingError">processingError</a> | <a href="https://w3id.org/ldac/rocphotos/terms#processingError" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#processingError</a> | No | An EXIF and/or thumbnail failure. Removed once the file processes cleanly. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_photo_rating" title="#prop_photo_rating">rating</a> | <a href="https://w3id.org/ldac/rocphotos/terms#rating" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#rating</a> | No | XMP star rating, 1-5. Absent rather than 0 when unrated. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> |  |
| <a href="#prop_photo_regions" title="#prop_photo_regions">regions</a> | <a href="https://w3id.org/ldac/rocphotos/terms#regions" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#regions</a> | No | Every tagged region on this photo, of either shape. | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a>, <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |  |
| <a href="#prop_photo_thumbnail" title="#prop_photo_thumbnail">thumbnail</a> | <a href="http://schema.org/thumbnail" target="_blank" rel="noopener">http://schema.org/thumbnail</a> | No | The generated thumbnail. | <a href="#class_Thumbnail" title="#class_Thumbnail">Thumbnail</a> |  |


### <a id="class_Thumbnail" title="#class_Thumbnail"></a> Class: Thumbnail

A generated thumbnail, referenced by a photo's thumbnail property.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Thumbnail

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/ImageObject" title="http://schema.org/ImageObject" target="_blank" rel="noopener">ImageObject</a> |
| <a href="#prop_thumbnail_name" title="#prop_thumbnail_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | e.g. "Thumbnail of IMG_0042.jpg". | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_AlbumItem" title="#class_AlbumItem"></a> Class: Album item

One photo's place in one album — a proxy, so a caption specific to this album could later hang off it without touching the shared photo.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Album item

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/ImageObject" title="http://schema.org/ImageObject" target="_blank" rel="noopener">ImageObject</a> |
| <a href="#prop_albumitem_specializationOf" title="#prop_albumitem_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | Yes | The real photo this item stands for. No range: the photo is described in its folder crate, not here, so it cannot be checked within this crate. |  |  |


### <a id="class_Album" title="#class_Album"></a> Class: Album

A named, ordered virtual collection of photos, living in the root crate.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Album

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/ImageGallery" title="http://schema.org/ImageGallery" target="_blank" rel="noopener">ImageGallery</a> |
| <a href="#prop_album_hasPart" title="#prop_album_hasPart">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | Yes | Membership and display order at once: array order is the order. | <a href="#class_AlbumItem" title="#class_AlbumItem">Album item</a> |  |
| <a href="#prop_album_name" title="#prop_album_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The album's name, from which its id is derived. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_album_description" title="#prop_album_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | No | Optional. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="MainPersonClass" title="#MainPersonClass"></a> Class: Person

A person, identified by name across the whole collection (arcp://name,rocphoto/person/<NameSlug>). The root crate's copy is the one to describe in full; each sub-collection crate carries a minimal copy so it reads standalone.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Person

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Person" title="http://schema.org/Person" target="_blank" rel="noopener">Person</a> |
| <a href="#prop_person_name" title="#prop_person_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The main or canonical name for this person, this depends on the policy of a particular collection but may be their birth name or a nickname | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_person_birthDate" title="#prop_person_birthDate">birthDate</a> | <a href="http://schema.org/birthDate" target="_blank" rel="noopener">http://schema.org/birthDate</a> | No | Date of birth for this person, to the maximum available precision - can use data ranges if this is not known | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> |  |
| <a href="#prop_person_description" title="#prop_person_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | No | Biographical notes about this person | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="InstancePersonClass" title="#InstancePersonClass"></a> Class: Person in this crate

A person as depicted in one crate — one per person per crate, which everything in that crate points at rather than the shared identity. Lets the same person be recorded under the name they went by in this part of the collection.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Person in this crate

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Person" title="http://schema.org/Person" target="_blank" rel="noopener">Person</a> |
| <a href="#prop_personinstance_name" title="#prop_personinstance_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | How they were known here, which need not match the shared identity's name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_personinstance_specializationOf" title="#prop_personinstance_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | Yes | The shared identity this is an instance of. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> |  |


### <a id="MainPetClass" title="#MainPetClass"></a> Class: Pet

A pet, identified by name the same way a Person is, in its own id space so the two never collide.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Pet

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://w3id.org/ldac/rocphotos/terms#Pet" title="https://w3id.org/ldac/rocphotos/terms#Pet" target="_blank" rel="noopener">Pet</a> |
| <a href="#prop_pet_name" title="#prop_pet_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The name their identity is derived from. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="InstancePetClass" title="#InstancePetClass"></a> Class: Pet in this crate

A pet as depicted in one crate — see Person in this crate.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Pet in this crate

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://w3id.org/ldac/rocphotos/terms#Pet" title="https://w3id.org/ldac/rocphotos/terms#Pet" target="_blank" rel="noopener">Pet</a> |
| <a href="#prop_petinstance_name" title="#prop_petinstance_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | How they were known here. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_petinstance_specializationOf" title="#prop_petinstance_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | Yes | The shared identity this is an instance of. | <a href="#MainPetClass" title="#MainPetClass">Pet</a> |  |


### <a id="class_ImageRegion_Exif" title="#class_ImageRegion_Exif"></a> Class: Region (from the file's own tags)

A face or pet tagged in the photo file itself (MWG), rebuilt from EXIF on every rescan. Its area is MWG's own convention: a centre point plus size, as fractions of the image.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Region (from the file's own tags)

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://w3id.org/ldac/rocphotos/terms#ImageRegion" title="https://w3id.org/ldac/rocphotos/terms#ImageRegion" target="_blank" rel="noopener">ImageRegion</a> |
| <a href="#prop_region_about" title="#prop_region_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Yes | Who this region depicts, via the crate's instance of them. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a>, <a href="#MainPetClass" title="#MainPetClass">Pet</a>, <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a>, <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> |  |
| <a href="#prop_region_height" title="#prop_region_height">height</a> | <a href="http://schema.org/height" target="_blank" rel="noopener">http://schema.org/height</a> | Yes | The region's height, as a fraction of the image. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> |  |
| <a href="#prop_region_name" title="#prop_region_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The subject's name, duplicated here so a reader need not resolve about. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_region_regionType" title="#prop_region_regionType">regionType</a> | <a href="https://w3id.org/ldac/rocphotos/terms#regionType" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#regionType</a> | Yes | A literal, either "Face" or "Pet". | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_region_width" title="#prop_region_width">width</a> | <a href="http://schema.org/width" target="_blank" rel="noopener">http://schema.org/width</a> | Yes | The region's width, as a fraction of the image. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> |  |
| <a href="#prop_region_xPosition" title="#prop_region_xPosition">xPosition</a> | <a href="https://w3id.org/ldac/rocphotos/terms#xPosition" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#xPosition</a> | Yes | The region's centre X, as a fraction of the image. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> |  |
| <a href="#prop_region_yPosition" title="#prop_region_yPosition">yPosition</a> | <a href="https://w3id.org/ldac/rocphotos/terms#yPosition" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#yPosition</a> | Yes | The region's centre Y, as a fraction of the image. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> |  |
| <a href="#prop_region_nameInFile" title="#prop_region_nameInFile">nameInFile</a> |  | No | The name the photo file's own tag gives this region, recorded only where it differs from the name the crate keeps. Its absence means the two agree. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff"></a> Class: Region (confirmed here)

A face confirmed in this application, recorded whether or not it is ever written into the photo file. Typed as a Web Annotation as well as an ImageRegion, which is what tells it apart from the EXIF-derived shape.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Region (confirmed here)

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://w3id.org/ldac/rocphotos/terms#ImageRegion" title="https://w3id.org/ldac/rocphotos/terms#ImageRegion" target="_blank" rel="noopener">ImageRegion</a>, <a href="http://www.w3.org/ns/oa#Annotation" title="http://www.w3.org/ns/oa#Annotation" target="_blank" rel="noopener">Annotation</a> |
| <a href="#prop_standoff_hasBody" title="#prop_standoff_hasBody">oa:hasBody</a> | <a href="http://www.w3.org/ns/oa#hasBody" target="_blank" rel="noopener">http://www.w3.org/ns/oa#hasBody</a> | Yes | A per-region proxy for the subject, so this one sighting could later carry its own properties. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a>, <a href="#MainPetClass" title="#MainPetClass">Pet</a>, <a href="#class_RegionBody" title="#class_RegionBody">Region body</a> |  |
| <a href="#prop_standoff_hasTarget" title="#prop_standoff_hasTarget">oa:hasTarget</a> | <a href="http://www.w3.org/ns/oa#hasTarget" target="_blank" rel="noopener">http://www.w3.org/ns/oa#hasTarget</a> | Yes | A W3C Media Fragment on the photo — #xywh=percent:x,y,w,h, a top-left corner and size, unlike the centre-based EXIF shape. |  |  |
| <a href="#prop_standoff_motivatedBy" title="#prop_standoff_motivatedBy">oa:motivatedBy</a> | <a href="http://www.w3.org/ns/oa#motivatedBy" target="_blank" rel="noopener">http://www.w3.org/ns/oa#motivatedBy</a> | Yes | Always oa:identifying — the annotation says who this is. The value comes from an ItemList so more motivations can be added later. As with any ItemList value, the crate must carry the oa:identifying entity itself, matching the one in this profile. | <a href="#itemlist_motivation" title="#itemlist_motivation">Annotation motivations</a> |  |
| <a href="#prop_standoff_name" title="#prop_standoff_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The subject's name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_standoff_regionType" title="#prop_standoff_regionType">regionType</a> | <a href="https://w3id.org/ldac/rocphotos/terms#regionType" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#regionType</a> | Yes | A literal, either "Face" or "Pet". | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_standoff_writtenToFile" title="#prop_standoff_writtenToFile">writtenToFile</a> | <a href="https://w3id.org/ldac/rocphotos/terms#writtenToFile" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#writtenToFile</a> | Yes | Whether this region has been written into the photo file's own XMP. Once a rescan finds the same name in the file's real EXIF regions, this region is replaced by the EXIF-derived one. | <a href="http://schema.org/Boolean" title="http://schema.org/Boolean" target="_blank" rel="noopener">Boolean</a> |  |


### <a id="class_RegionBody" title="#class_RegionBody"></a> Class: Region body

The body of a standoff region: a proxy for the subject, specializing this crate's instance of them (which in turn specializes the shared identity).

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Region body

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Person" title="http://schema.org/Person" target="_blank" rel="noopener">Person</a> |
| <a href="#prop_regionbody_specializationOf" title="#prop_regionbody_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | Yes | This crate's instance of the person depicted. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a>, <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a> |  |


### <a id="class_ExifValue" title="#class_ExifValue"></a> Class: EXIF value

One EXIF field, with a stable id so a rescan overwrites it rather than accumulating a new node.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from EXIF value

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/PropertyValue" title="http://schema.org/PropertyValue" target="_blank" rel="noopener">PropertyValue</a> |
| <a href="#prop_exif_name" title="#prop_exif_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The EXIF field name, e.g. Make. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_exif_value" title="#prop_exif_value">value</a> | <a href="http://schema.org/value" target="_blank" rel="noopener">http://schema.org/value</a> | Yes | Its value, as text. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_FaceEmbedding" title="#class_FaceEmbedding"></a> Class: Face embedding

One reference embedding in the faces crate, for inspection — matching itself queries the companion SQLite index. Points back at the region it came from rather than holding image data.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Face embedding

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://w3id.org/ldac/rocphotos/terms#FaceEmbedding" title="https://w3id.org/ldac/rocphotos/terms#FaceEmbedding" target="_blank" rel="noopener">FaceEmbedding</a> |
| <a href="#prop_embedding_embedding" title="#prop_embedding_embedding">embedding</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embedding" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embedding</a> | Yes | The model's own vector. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> |  |
| <a href="#prop_embedding_model" title="#prop_embedding_model">embeddingModel</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embeddingModel" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embeddingModel</a> | Yes | The model that produced it. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_embedding_modelVersion" title="#prop_embedding_modelVersion">embeddingModelVersion</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embeddingModelVersion" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embeddingModelVersion</a> | Yes | Its version — a bump makes every reference obsolete, which is why it is recorded per entity. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_embedding_name" title="#prop_embedding_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The person's name, or "Ignored stranger" for a permanently-suppressed face. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_embedding_sourceImage" title="#prop_embedding_sourceImage">sourceImage</a> | <a href="https://w3id.org/ldac/rocphotos/terms#sourceImage" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#sourceImage</a> | Yes | The photo it was computed from, as a collection-relative path. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_embedding_about" title="#prop_embedding_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | No | The person this is a reference for. Absent entirely for a stranger. No range: the person is described in the main collection crate, not here, so it cannot be checked within this crate. |  |  |
| <a href="#prop_embedding_sourceRegion" title="#prop_embedding_sourceRegion">sourceRegion</a> | <a href="https://w3id.org/ldac/rocphotos/terms#sourceRegion" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#sourceRegion</a> | No | The region it was computed from. Absent for a stranger, which is never written back as a region. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="SpouseRelationshipClass" title="#SpouseRelationshipClass"></a> Class: Married

Two people who are, or were, married to each other. Not oriented: it reads the same from either side. This is RiC's own SpouseRelation, used as it stands.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Married

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://www.ica.org/standards/RiC/ontology#SpouseRelation" title="https://www.ica.org/standards/RiC/ontology#SpouseRelation" target="_blank" rel="noopener">SpouseRelation</a> |
| <a href="#prop_spouse_connects" title="#prop_spouse_connects">rico:relationConnects</a> | <a href="https://www.ica.org/standards/RiC/ontology#relationConnects" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#relationConnects</a> | Yes | The two people who are, or were, married to each other. Neither comes first: this relationship reads the same from either side. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> |  |
| <a href="#prop_spouse_beginningDate" title="#prop_spouse_beginningDate">rico:beginningDate</a> | <a href="https://www.ica.org/standards/RiC/ontology#beginningDate" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#beginningDate</a> | No | When it began, to whatever precision is known — a year on its own is fine. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> |  |
| <a href="#prop_spouse_endDate" title="#prop_spouse_endDate">rico:endDate</a> | <a href="https://www.ica.org/standards/RiC/ontology#endDate" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#endDate</a> | No | When it ended, if it has. Left out while it still holds. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> |  |


### <a id="ParentChildRelationshipClass" title="#ParentChildRelationshipClass"></a> Class: Parent and child

Oriented from the parent to the child: the parent is the source, the child is the target. This is RiC's own ChildRelation, used as it stands, including its direction — which runs down a generation rather than up.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Parent and child

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://www.ica.org/standards/RiC/ontology#ChildRelation" title="https://www.ica.org/standards/RiC/ontology#ChildRelation" target="_blank" rel="noopener">ChildRelation</a> |
| <a href="#prop_parentchild_target" title="#prop_parentchild_target">rico:relationHasTarget</a> | <a href="https://www.ica.org/standards/RiC/ontology#relationHasTarget" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#relationHasTarget</a> | Yes | The child, who is the target of the relationship. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> |  |
| <a href="#prop_parentchild_source" title="#prop_parentchild_source">rico:relationHasSource</a> | <a href="https://www.ica.org/standards/RiC/ontology#relationHasSource" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#relationHasSource</a> | Yes | The parent. RiC orients this relationship from the parent, so the parent is its source. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> |  |
| <a href="#prop_parentchild_beginningDate" title="#prop_parentchild_beginningDate">rico:beginningDate</a> | <a href="https://www.ica.org/standards/RiC/ontology#beginningDate" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#beginningDate</a> | No | When it began, to whatever precision is known — a year on its own is fine. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> |  |
| <a href="#prop_parentchild_endDate" title="#prop_parentchild_endDate">rico:endDate</a> | <a href="https://www.ica.org/standards/RiC/ontology#endDate" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#endDate</a> | No | When it ended, if it has. Left out while it still holds. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> |  |

## All Properties

### <a id="RO-Crate_Metadata_Descriptor.id" title="#RO-Crate_Metadata_Descriptor.id"></a> Property: @id

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#RO-Crate_Metadata_Descriptor.id" title="#RO-Crate_Metadata_Descriptor.id">@id</a> | Always ro-crate-metadata.json. | <a href="#propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id">RO-Crate Metadata Descriptor identifier</a> | <a href="#RO-Crate_Metadata_Descriptor" title="#RO-Crate_Metadata_Descriptor">RO-Crate Metadata Descriptor</a> |
### <a id="RO-Crate_Metadata_Descriptor.about" title="#RO-Crate_Metadata_Descriptor.about"></a> Property: About

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#RO-Crate_Metadata_Descriptor.about" title="#RO-Crate_Metadata_Descriptor.about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | The one root data entity of this crate. Exactly one value, which must have the shape of one of the three kinds of root. | <a href="#class_MainCollectionRoot" title="#class_MainCollectionRoot">Main collection root</a>, <a href="#class_FolderCollectionRoot" title="#class_FolderCollectionRoot">Folder collection root</a>, <a href="#class_FacesRoot" title="#class_FacesRoot">Faces crate root</a> | <a href="#RO-Crate_Metadata_Descriptor" title="#RO-Crate_Metadata_Descriptor">RO-Crate Metadata Descriptor</a> |
### <a id="prop_photo_about" title="#prop_photo_about"></a> Property: About

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_about" title="#prop_photo_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Everyone depicted, always via this crate's instance of them, never the shared identity directly. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a>, <a href="#MainPetClass" title="#MainPetClass">Pet</a>, <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a>, <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_region_about" title="#prop_region_about"></a> Property: About

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_about" title="#prop_region_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Who this region depicts, via the crate's instance of them. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a>, <a href="#MainPetClass" title="#MainPetClass">Pet</a>, <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a>, <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_embedding_about" title="#prop_embedding_about"></a> Property: About

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_about" title="#prop_embedding_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | The person this is a reference for. Absent entirely for a stranger. No range: the person is described in the main collection crate, not here, so it cannot be checked within this crate. |  | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_spouse_beginningDate" title="#prop_spouse_beginningDate"></a> Property: Began

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_spouse_beginningDate" title="#prop_spouse_beginningDate">rico:beginningDate</a> | <a href="https://www.ica.org/standards/RiC/ontology#beginningDate" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#beginningDate</a> | When it began, to whatever precision is known — a year on its own is fine. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> | <a href="#SpouseRelationshipClass" title="#SpouseRelationshipClass">Married</a> |
### <a id="prop_parentchild_beginningDate" title="#prop_parentchild_beginningDate"></a> Property: Began

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_parentchild_beginningDate" title="#prop_parentchild_beginningDate">rico:beginningDate</a> | <a href="https://www.ica.org/standards/RiC/ontology#beginningDate" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#beginningDate</a> | When it began, to whatever precision is known — a year on its own is fine. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> | <a href="#ParentChildRelationshipClass" title="#ParentChildRelationshipClass">Parent and child</a> |
### <a id="prop_person_birthDate" title="#prop_person_birthDate"></a> Property: Birth date

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_person_birthDate" title="#prop_person_birthDate">birthDate</a> | <a href="http://schema.org/birthDate" target="_blank" rel="noopener">http://schema.org/birthDate</a> | Date of birth for this person, to the maximum available precision - can use data ranges if this is not known | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> |
### <a id="prop_parentchild_target" title="#prop_parentchild_target"></a> Property: Child

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_parentchild_target" title="#prop_parentchild_target">rico:relationHasTarget</a> | <a href="https://www.ica.org/standards/RiC/ontology#relationHasTarget" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#relationHasTarget</a> | The child, who is the target of the relationship. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> | <a href="#ParentChildRelationshipClass" title="#ParentChildRelationshipClass">Parent and child</a> |
### <a id="prop_photo_dateCreated" title="#prop_photo_dateCreated"></a> Property: Date created

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_dateCreated" title="#prop_photo_dateCreated">dateCreated</a> | <a href="http://schema.org/dateCreated" target="_blank" rel="noopener">http://schema.org/dateCreated</a> | From EXIF DateTimeOriginal. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_photo_dateModified" title="#prop_photo_dateModified"></a> Property: Date modified

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_dateModified" title="#prop_photo_dateModified">dateModified</a> | <a href="http://schema.org/dateModified" target="_blank" rel="noopener">http://schema.org/dateModified</a> | The source file's modification time when last processed — what a rescan compares against to decide whether to re-read it. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_photo_description" title="#prop_photo_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_description" title="#prop_photo_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | The photo's own caption, if it has one. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_album_description" title="#prop_album_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_album_description" title="#prop_album_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | Optional. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Album" title="#class_Album">Album</a> |
### <a id="prop_person_description" title="#prop_person_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_person_description" title="#prop_person_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | Biographical notes about this person | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> |
### <a id="prop_embedding_embedding" title="#prop_embedding_embedding"></a> Property: Embedding

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_embedding" title="#prop_embedding_embedding">embedding</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embedding" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embedding</a> | The model's own vector. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_embedding_model" title="#prop_embedding_model"></a> Property: Embedding model

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_model" title="#prop_embedding_model">embeddingModel</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embeddingModel" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embeddingModel</a> | The model that produced it. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_embedding_modelVersion" title="#prop_embedding_modelVersion"></a> Property: Embedding model version

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_modelVersion" title="#prop_embedding_modelVersion">embeddingModelVersion</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embeddingModelVersion" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embeddingModelVersion</a> | Its version — a bump makes every reference obsolete, which is why it is recorded per entity. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_spouse_endDate" title="#prop_spouse_endDate"></a> Property: Ended

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_spouse_endDate" title="#prop_spouse_endDate">rico:endDate</a> | <a href="https://www.ica.org/standards/RiC/ontology#endDate" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#endDate</a> | When it ended, if it has. Left out while it still holds. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> | <a href="#SpouseRelationshipClass" title="#SpouseRelationshipClass">Married</a> |
### <a id="prop_parentchild_endDate" title="#prop_parentchild_endDate"></a> Property: Ended

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_parentchild_endDate" title="#prop_parentchild_endDate">rico:endDate</a> | <a href="https://www.ica.org/standards/RiC/ontology#endDate" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#endDate</a> | When it ended, if it has. Left out while it still holds. | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> | <a href="#ParentChildRelationshipClass" title="#ParentChildRelationshipClass">Parent and child</a> |
### <a id="prop_photo_exifData" title="#prop_photo_exifData"></a> Property: EXIF data

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_exifData" title="#prop_photo_exifData">exifData</a> | <a href="https://w3id.org/ldac/rocphotos/terms#exifData" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#exifData</a> | Selected EXIF fields, each as a PropertyValue. | <a href="#class_ExifValue" title="#class_ExifValue">EXIF value</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_standoff_hasBody" title="#prop_standoff_hasBody"></a> Property: Has body

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_hasBody" title="#prop_standoff_hasBody">oa:hasBody</a> | <a href="http://www.w3.org/ns/oa#hasBody" target="_blank" rel="noopener">http://www.w3.org/ns/oa#hasBody</a> | A per-region proxy for the subject, so this one sighting could later carry its own properties. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a>, <a href="#MainPetClass" title="#MainPetClass">Pet</a>, <a href="#class_RegionBody" title="#class_RegionBody">Region body</a> | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_mainroot_hasPart" title="#prop_mainroot_hasPart"></a> Property: Has part

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_mainroot_hasPart" title="#prop_mainroot_hasPart">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | Each sub-collection folder, as a Dataset reference, and each album. | <a href="#class_SubCollection" title="#class_SubCollection">Sub-collection reference</a>, <a href="#class_Album" title="#class_Album">Album</a> | <a href="#class_MainCollectionRoot" title="#class_MainCollectionRoot">Main collection root</a> |
### <a id="prop_folderroot_hasPart" title="#prop_folderroot_hasPart"></a> Property: Has part

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_folderroot_hasPart" title="#prop_folderroot_hasPart">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | Every photo in this folder. | <a href="#class_Photo" title="#class_Photo">Photo</a> | <a href="#class_FolderCollectionRoot" title="#class_FolderCollectionRoot">Folder collection root</a> |
### <a id="prop_facesroot_hasPart" title="#prop_facesroot_hasPart"></a> Property: Has part

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_facesroot_hasPart" title="#prop_facesroot_hasPart">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | Every face-recognition reference. | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> | <a href="#class_FacesRoot" title="#class_FacesRoot">Faces crate root</a> |
### <a id="prop_album_hasPart" title="#prop_album_hasPart"></a> Property: Has part

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_album_hasPart" title="#prop_album_hasPart">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | Membership and display order at once: array order is the order. | <a href="#class_AlbumItem" title="#class_AlbumItem">Album item</a> | <a href="#class_Album" title="#class_Album">Album</a> |
### <a id="prop_standoff_hasTarget" title="#prop_standoff_hasTarget"></a> Property: Has target

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_hasTarget" title="#prop_standoff_hasTarget">oa:hasTarget</a> | <a href="http://www.w3.org/ns/oa#hasTarget" target="_blank" rel="noopener">http://www.w3.org/ns/oa#hasTarget</a> | A W3C Media Fragment on the photo — #xywh=percent:x,y,w,h, a top-left corner and size, unlike the centre-based EXIF shape. |  | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_region_height" title="#prop_region_height"></a> Property: Height

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_height" title="#prop_region_height">height</a> | <a href="http://schema.org/height" target="_blank" rel="noopener">http://schema.org/height</a> | The region's height, as a fraction of the image. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_photo_keywords" title="#prop_photo_keywords"></a> Property: Keywords

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_keywords" title="#prop_photo_keywords">keywords</a> | <a href="http://schema.org/keywords" target="_blank" rel="noopener">http://schema.org/keywords</a> | IPTC/XMP keywords, excluding any that duplicate a region's name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_standoff_motivatedBy" title="#prop_standoff_motivatedBy"></a> Property: Motivated by

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_motivatedBy" title="#prop_standoff_motivatedBy">oa:motivatedBy</a> | <a href="http://www.w3.org/ns/oa#motivatedBy" target="_blank" rel="noopener">http://www.w3.org/ns/oa#motivatedBy</a> | Always oa:identifying — the annotation says who this is. The value comes from an ItemList so more motivations can be added later. As with any ItemList value, the crate must carry the oa:identifying entity itself, matching the one in this profile. | <a href="#itemlist_motivation" title="#itemlist_motivation">Annotation motivations</a> | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_mainroot_name" title="#prop_mainroot_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_mainroot_name" title="#prop_mainroot_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The name of the collection, folder or crate. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_MainCollectionRoot" title="#class_MainCollectionRoot">Main collection root</a> |
### <a id="prop_folderroot_name" title="#prop_folderroot_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_folderroot_name" title="#prop_folderroot_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The name of the collection, folder or crate. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_FolderCollectionRoot" title="#class_FolderCollectionRoot">Folder collection root</a> |
### <a id="prop_facesroot_name" title="#prop_facesroot_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_facesroot_name" title="#prop_facesroot_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The name of the collection, folder or crate. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_FacesRoot" title="#class_FacesRoot">Faces crate root</a> |
### <a id="prop_subcollection_name" title="#prop_subcollection_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_subcollection_name" title="#prop_subcollection_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The sub-collection's path, e.g. 2025/03/10. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_SubCollection" title="#class_SubCollection">Sub-collection reference</a> |
### <a id="prop_photo_name" title="#prop_photo_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_name" title="#prop_photo_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The file's own name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_thumbnail_name" title="#prop_thumbnail_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_thumbnail_name" title="#prop_thumbnail_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | e.g. "Thumbnail of IMG_0042.jpg". | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Thumbnail" title="#class_Thumbnail">Thumbnail</a> |
### <a id="prop_album_name" title="#prop_album_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_album_name" title="#prop_album_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The album's name, from which its id is derived. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Album" title="#class_Album">Album</a> |
### <a id="prop_person_name" title="#prop_person_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_person_name" title="#prop_person_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The main or canonical name for this person, this depends on the policy of a particular collection but may be their birth name or a nickname | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> |
### <a id="prop_personinstance_name" title="#prop_personinstance_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_personinstance_name" title="#prop_personinstance_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | How they were known here, which need not match the shared identity's name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a> |
### <a id="prop_pet_name" title="#prop_pet_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_pet_name" title="#prop_pet_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The name their identity is derived from. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#MainPetClass" title="#MainPetClass">Pet</a> |
### <a id="prop_petinstance_name" title="#prop_petinstance_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_petinstance_name" title="#prop_petinstance_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | How they were known here. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> |
### <a id="prop_region_name" title="#prop_region_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_name" title="#prop_region_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The subject's name, duplicated here so a reader need not resolve about. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_standoff_name" title="#prop_standoff_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_name" title="#prop_standoff_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The subject's name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_exif_name" title="#prop_exif_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_exif_name" title="#prop_exif_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The EXIF field name, e.g. Make. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_ExifValue" title="#class_ExifValue">EXIF value</a> |
### <a id="prop_embedding_name" title="#prop_embedding_name"></a> Property: Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_name" title="#prop_embedding_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The person's name, or "Ignored stranger" for a permanently-suppressed face. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_region_nameInFile" title="#prop_region_nameInFile"></a> Property: Name in file

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_nameInFile" title="#prop_region_nameInFile">nameInFile</a> | The name the photo file's own tag gives this region, recorded only where it differs from the name the crate keeps. Its absence means the two agree. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_parentchild_source" title="#prop_parentchild_source"></a> Property: Parent

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_parentchild_source" title="#prop_parentchild_source">rico:relationHasSource</a> | <a href="https://www.ica.org/standards/RiC/ontology#relationHasSource" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#relationHasSource</a> | The parent. RiC orients this relationship from the parent, so the parent is its source. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> | <a href="#ParentChildRelationshipClass" title="#ParentChildRelationshipClass">Parent and child</a> |
### <a id="prop_photo_processingError" title="#prop_photo_processingError"></a> Property: Processing error

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_processingError" title="#prop_photo_processingError">processingError</a> | <a href="https://w3id.org/ldac/rocphotos/terms#processingError" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#processingError</a> | An EXIF and/or thumbnail failure. Removed once the file processes cleanly. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_photo_rating" title="#prop_photo_rating"></a> Property: Rating

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_rating" title="#prop_photo_rating">rating</a> | <a href="https://w3id.org/ldac/rocphotos/terms#rating" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#rating</a> | XMP star rating, 1-5. Absent rather than 0 when unrated. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_region_regionType" title="#prop_region_regionType"></a> Property: Region type

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_regionType" title="#prop_region_regionType">regionType</a> | <a href="https://w3id.org/ldac/rocphotos/terms#regionType" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#regionType</a> | A literal, either "Face" or "Pet". | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_standoff_regionType" title="#prop_standoff_regionType"></a> Property: Region type

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_regionType" title="#prop_standoff_regionType">regionType</a> | <a href="https://w3id.org/ldac/rocphotos/terms#regionType" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#regionType</a> | A literal, either "Face" or "Pet". | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_photo_regions" title="#prop_photo_regions"></a> Property: Regions

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_regions" title="#prop_photo_regions">regions</a> | <a href="https://w3id.org/ldac/rocphotos/terms#regions" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#regions</a> | Every tagged region on this photo, of either shape. | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a>, <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_embedding_sourceImage" title="#prop_embedding_sourceImage"></a> Property: Source image

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_sourceImage" title="#prop_embedding_sourceImage">sourceImage</a> | <a href="https://w3id.org/ldac/rocphotos/terms#sourceImage" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#sourceImage</a> | The photo it was computed from, as a collection-relative path. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_embedding_sourceRegion" title="#prop_embedding_sourceRegion"></a> Property: Source region

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_sourceRegion" title="#prop_embedding_sourceRegion">sourceRegion</a> | <a href="https://w3id.org/ldac/rocphotos/terms#sourceRegion" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#sourceRegion</a> | The region it was computed from. Absent for a stranger, which is never written back as a region. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_albumitem_specializationOf" title="#prop_albumitem_specializationOf"></a> Property: Specialization of

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_albumitem_specializationOf" title="#prop_albumitem_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | The real photo this item stands for. No range: the photo is described in its folder crate, not here, so it cannot be checked within this crate. |  | <a href="#class_AlbumItem" title="#class_AlbumItem">Album item</a> |
### <a id="prop_personinstance_specializationOf" title="#prop_personinstance_specializationOf"></a> Property: Specialization of

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_personinstance_specializationOf" title="#prop_personinstance_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | The shared identity this is an instance of. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> | <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a> |
### <a id="prop_petinstance_specializationOf" title="#prop_petinstance_specializationOf"></a> Property: Specialization of

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_petinstance_specializationOf" title="#prop_petinstance_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | The shared identity this is an instance of. | <a href="#MainPetClass" title="#MainPetClass">Pet</a> | <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> |
### <a id="prop_regionbody_specializationOf" title="#prop_regionbody_specializationOf"></a> Property: Specialization of

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_regionbody_specializationOf" title="#prop_regionbody_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | This crate's instance of the person depicted. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a>, <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a> | <a href="#class_RegionBody" title="#class_RegionBody">Region body</a> |
### <a id="prop_spouse_connects" title="#prop_spouse_connects"></a> Property: Spouses

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_spouse_connects" title="#prop_spouse_connects">rico:relationConnects</a> | <a href="https://www.ica.org/standards/RiC/ontology#relationConnects" target="_blank" rel="noopener">https://www.ica.org/standards/RiC/ontology#relationConnects</a> | The two people who are, or were, married to each other. Neither comes first: this relationship reads the same from either side. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> | <a href="#SpouseRelationshipClass" title="#SpouseRelationshipClass">Married</a> |
### <a id="prop_photo_thumbnail" title="#prop_photo_thumbnail"></a> Property: Thumbnail

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_thumbnail" title="#prop_photo_thumbnail">thumbnail</a> | <a href="http://schema.org/thumbnail" target="_blank" rel="noopener">http://schema.org/thumbnail</a> | The generated thumbnail. | <a href="#class_Thumbnail" title="#class_Thumbnail">Thumbnail</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_photo_title" title="#prop_photo_title"></a> Property: Title

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_title" title="#prop_photo_title">title</a> | <a href="http://schema.org/title" target="_blank" rel="noopener">http://schema.org/title</a> | Always present: the IPTC/XMP title if the file has one, its filename otherwise. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_exif_value" title="#prop_exif_value"></a> Property: Value

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_exif_value" title="#prop_exif_value">value</a> | <a href="http://schema.org/value" target="_blank" rel="noopener">http://schema.org/value</a> | Its value, as text. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_ExifValue" title="#class_ExifValue">EXIF value</a> |
### <a id="prop_region_width" title="#prop_region_width"></a> Property: Width

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_width" title="#prop_region_width">width</a> | <a href="http://schema.org/width" target="_blank" rel="noopener">http://schema.org/width</a> | The region's width, as a fraction of the image. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_standoff_writtenToFile" title="#prop_standoff_writtenToFile"></a> Property: Written to file

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_writtenToFile" title="#prop_standoff_writtenToFile">writtenToFile</a> | <a href="https://w3id.org/ldac/rocphotos/terms#writtenToFile" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#writtenToFile</a> | Whether this region has been written into the photo file's own XMP. Once a rescan finds the same name in the file's real EXIF regions, this region is replaced by the EXIF-derived one. | <a href="http://schema.org/Boolean" title="http://schema.org/Boolean" target="_blank" rel="noopener">Boolean</a> | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_region_xPosition" title="#prop_region_xPosition"></a> Property: X position

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_xPosition" title="#prop_region_xPosition">xPosition</a> | <a href="https://w3id.org/ldac/rocphotos/terms#xPosition" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#xPosition</a> | The region's centre X, as a fraction of the image. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_region_yPosition" title="#prop_region_yPosition"></a> Property: Y position

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_yPosition" title="#prop_region_yPosition">yPosition</a> | <a href="https://w3id.org/ldac/rocphotos/terms#yPosition" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#yPosition</a> | The region's centre Y, as a fraction of the image. | <a href="http://schema.org/Number" title="http://schema.org/Number" target="_blank" rel="noopener">Number</a> | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
## Property Values

### <a id="propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id"></a> Property Value: RO-Crate Metadata Descriptor identifier

ID: #propertyValue_RO-Crate_Metadata_Descriptor.id

<table>
<thead><tr><th>Property Value</th><th>Description</th><th>Value</th><th>Min Count</th><th>Max Count</th></tr></thead>
<tbody>
<tr><td><a href="#propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id">RO-Crate Metadata Descriptor identifier</a></td><td>The fixed @id of the RO-Crate Metadata Descriptor.</td><td><div><strong>Literal String</strong><pre><code>ro-crate-metadata.json</code></pre></div></td><td>1</td><td>1</td></tr>
</tbody></table>



## Item Lists

### <a id="itemlist_motivation"></a>Item List: Annotation motivations

Why a standoff region exists: it identifies someone.

<table>
<thead><tr><th>Name</th><th>@id</th><th>Entity</th></tr></thead>
<tbody>
<tr><td>identifying</td><td><a id="identifying" href="http://www.w3.org/ns/oa#identifying" target="_blank" rel="noopener">http://www.w3.org/ns/oa#identifying</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#identifying&quot;,
  &quot;@type&quot;: &quot;oa:Motivation&quot;,
  &quot;name&quot;: &quot;identifying&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to assign an identity to the Target or identify what is being depicted or described in the Target.&quot;
}</code></pre></td></tr>
</tbody></table>


