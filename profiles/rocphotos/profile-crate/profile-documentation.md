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

## Types of entities (specializations of Classes) and expected Properties


### <a id="Root_Data_Entity" title="#Root_Data_Entity"></a> Class: Root Data Entity

The root of any rocphotos crate: the collection root, a sub-collection directory, or the faces crate. Distinguished from the sub-collection Datasets a root crate lists by having hasPart of its own.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

#### Properties from Root Data Entity

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
| <a href="#prop_root_hasPart" title="#prop_root_hasPart">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | Yes | The photos in this crate, or — in the root crate — each sub-collection Dataset and each album. |  |  |
| <a href="#prop_root_name" title="#prop_root_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | For a sub-collection, its path relative to the collection root. | Text |  |
| <a href="#prop_root_mentions" title="#prop_root_mentions">mentions</a> | <a href="http://schema.org/mentions" target="_blank" rel="noopener">http://schema.org/mentions</a> | No | Root crate only: every Person/Pet depicted anywhere in the collection. This is what makes them reachable in the graph, and where their description is meant to accumulate. Deliberately unrestricted in range: a Pet cannot be range-checked until rocphotos binds the rocphotos: prefix in its crates (see the profile text). |  |  |


### <a id="class_SubCollection" title="#class_SubCollection"></a> Class: Sub-collection reference

How the root crate lists a sub-collection directory: a Dataset with a trailing-slash id and no hasPart of its own (its own crate holds the photos).

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Sub-collection reference

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
| <a href="#prop_subcollection_name" title="#prop_subcollection_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The sub-collection's path, e.g. 2025/03/10. | Text |  |


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
| <a href="#prop_photo_name" title="#prop_photo_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The file's own name. | Text |  |
| <a href="#prop_photo_title" title="#prop_photo_title">title</a> | <a href="http://schema.org/title" target="_blank" rel="noopener">http://schema.org/title</a> | Yes | Always present: the IPTC/XMP title if the file has one, its filename otherwise. | Text |  |
| <a href="#prop_photo_about" title="#prop_photo_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | No | Everyone depicted, always via this crate's instance of them, never the shared identity directly. | <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a>, <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> |  |
| <a href="#prop_photo_dateCreated" title="#prop_photo_dateCreated">dateCreated</a> | <a href="http://schema.org/dateCreated" target="_blank" rel="noopener">http://schema.org/dateCreated</a> | No | From EXIF DateTimeOriginal. | Date |  |
| <a href="#prop_photo_dateModified" title="#prop_photo_dateModified">dateModified</a> | <a href="http://schema.org/dateModified" target="_blank" rel="noopener">http://schema.org/dateModified</a> | No | The source file's modification time when last processed — what a rescan compares against to decide whether to re-read it. | Date |  |
| <a href="#prop_photo_description" title="#prop_photo_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | No | The photo's own caption, if it has one. | Text |  |
| <a href="#prop_photo_exifData" title="#prop_photo_exifData">exifData</a> | <a href="https://w3id.org/ldac/rocphotos/terms#exifData" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#exifData</a> | No | Selected EXIF fields, each as a PropertyValue. | <a href="#class_ExifValue" title="#class_ExifValue">EXIF value</a> |  |
| <a href="#prop_photo_keywords" title="#prop_photo_keywords">keywords</a> | <a href="http://schema.org/keywords" target="_blank" rel="noopener">http://schema.org/keywords</a> | No | IPTC/XMP keywords, excluding any that duplicate a region's name. | Text |  |
| <a href="#prop_photo_processingError" title="#prop_photo_processingError">processingError</a> | <a href="https://w3id.org/ldac/rocphotos/terms#processingError" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#processingError</a> | No | An EXIF and/or thumbnail failure. Removed once the file processes cleanly. | Text |  |
| <a href="#prop_photo_rating" title="#prop_photo_rating">rating</a> | <a href="https://w3id.org/ldac/rocphotos/terms#rating" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#rating</a> | No | XMP star rating, 1-5. Absent rather than 0 when unrated. | Number |  |
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
| <a href="#prop_thumbnail_name" title="#prop_thumbnail_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | e.g. "Thumbnail of IMG_0042.jpg". | Text |  |


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
| <a href="#prop_albumitem_specializationOf" title="#prop_albumitem_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | Yes | The real photo this item stands for. | <a href="#class_Photo" title="#class_Photo">Photo</a> |  |


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
| <a href="#prop_album_name" title="#prop_album_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The album's name, from which its id is derived. | Text |  |
| <a href="#prop_album_description" title="#prop_album_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | No | Optional. | Text |  |


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
| <a href="#prop_person_name" title="#prop_person_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The name their identity is derived from. | Text |  |


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
| <a href="#prop_personinstance_name" title="#prop_personinstance_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | How they were known here, which need not match the shared identity's name. | Text |  |
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
| <a href="#prop_pet_name" title="#prop_pet_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The name their identity is derived from. | Text |  |


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
| <a href="#prop_petinstance_name" title="#prop_petinstance_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | How they were known here. | Text |  |
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
| <a href="#prop_region_about" title="#prop_region_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Yes | Who this region depicts, via the crate's instance of them. | <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a>, <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> |  |
| <a href="#prop_region_height" title="#prop_region_height">height</a> | <a href="http://schema.org/height" target="_blank" rel="noopener">http://schema.org/height</a> | Yes | The region's height, as a fraction of the image. | Number |  |
| <a href="#prop_region_name" title="#prop_region_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The subject's name, duplicated here so a reader need not resolve about. | Text |  |
| <a href="#prop_region_regionType" title="#prop_region_regionType">regionType</a> | <a href="https://w3id.org/ldac/rocphotos/terms#regionType" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#regionType</a> | Yes | A literal, either "Face" or "Pet". | Text |  |
| <a href="#prop_region_width" title="#prop_region_width">width</a> | <a href="http://schema.org/width" target="_blank" rel="noopener">http://schema.org/width</a> | Yes | The region's width, as a fraction of the image. | Number |  |
| <a href="#prop_region_xPosition" title="#prop_region_xPosition">xPosition</a> | <a href="https://w3id.org/ldac/rocphotos/terms#xPosition" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#xPosition</a> | Yes | The region's centre X, as a fraction of the image. | Number |  |
| <a href="#prop_region_yPosition" title="#prop_region_yPosition">yPosition</a> | <a href="https://w3id.org/ldac/rocphotos/terms#yPosition" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#yPosition</a> | Yes | The region's centre Y, as a fraction of the image. | Number |  |


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
| <a href="#prop_standoff_name" title="#prop_standoff_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The subject's name. | Text |  |
| <a href="#prop_standoff_hasBody" title="#prop_standoff_hasBody">oa:hasBody</a> | <a href="http://www.w3.org/ns/oa#hasBody" target="_blank" rel="noopener">http://www.w3.org/ns/oa#hasBody</a> | Yes | A per-region proxy for the subject, so this one sighting could later carry its own properties. | <a href="#class_RegionBody" title="#class_RegionBody">Region body</a> |  |
| <a href="#prop_standoff_hasTarget" title="#prop_standoff_hasTarget">oa:hasTarget</a> | <a href="http://www.w3.org/ns/oa#hasTarget" target="_blank" rel="noopener">http://www.w3.org/ns/oa#hasTarget</a> | Yes | A W3C Media Fragment on the photo — #xywh=percent:x,y,w,h, a top-left corner and size, unlike the centre-based EXIF shape. |  |  |
| <a href="#prop_standoff_motivatedBy" title="#prop_standoff_motivatedBy">oa:motivatedBy</a> | <a href="http://www.w3.org/ns/oa#motivatedBy" target="_blank" rel="noopener">http://www.w3.org/ns/oa#motivatedBy</a> | Yes | Always oa:identifying — the annotation says who this is. The value comes from an ItemList so more motivations can be added later. As with any ItemList value, the crate must carry the oa:identifying entity itself, matching the one in this profile. | <a href="#itemlist_motivation" title="#itemlist_motivation">Annotation motivations</a> |  |
| <a href="#prop_standoff_regionType" title="#prop_standoff_regionType">regionType</a> | <a href="https://w3id.org/ldac/rocphotos/terms#regionType" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#regionType</a> | Yes | A literal, either "Face" or "Pet". | Text |  |
| <a href="#prop_standoff_writtenToFile" title="#prop_standoff_writtenToFile">writtenToFile</a> | <a href="https://w3id.org/ldac/rocphotos/terms#writtenToFile" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#writtenToFile</a> | Yes | Whether this region has been written into the photo file's own XMP. Once a rescan finds the same name in the file's real EXIF regions, this region is replaced by the EXIF-derived one. | Boolean |  |


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
| <a href="#prop_regionbody_specializationOf" title="#prop_regionbody_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | Yes | This crate's instance of the person depicted. | <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a> |  |


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
| <a href="#prop_exif_name" title="#prop_exif_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The EXIF field name, e.g. Make. | Text |  |
| <a href="#prop_exif_value" title="#prop_exif_value">value</a> | <a href="http://schema.org/value" target="_blank" rel="noopener">http://schema.org/value</a> | Yes | Its value, as text. | Text |  |


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
| <a href="#prop_embedding_embedding" title="#prop_embedding_embedding">embedding</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embedding" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embedding</a> | Yes | The model's own vector. | Number |  |
| <a href="#prop_embedding_model" title="#prop_embedding_model">embeddingModel</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embeddingModel" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embeddingModel</a> | Yes | The model that produced it. | Text |  |
| <a href="#prop_embedding_modelVersion" title="#prop_embedding_modelVersion">embeddingModelVersion</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embeddingModelVersion" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embeddingModelVersion</a> | Yes | Its version — a bump makes every reference obsolete, which is why it is recorded per entity. | Text |  |
| <a href="#prop_embedding_name" title="#prop_embedding_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The person's name, or "Ignored stranger" for a permanently-suppressed face. | Text |  |
| <a href="#prop_embedding_sourceImage" title="#prop_embedding_sourceImage">sourceImage</a> | <a href="https://w3id.org/ldac/rocphotos/terms#sourceImage" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#sourceImage</a> | Yes | The photo it was computed from, as a collection-relative path. | Text |  |
| <a href="#prop_embedding_about" title="#prop_embedding_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | No | The person this is a reference for. Absent entirely for a stranger. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> |  |
| <a href="#prop_embedding_sourceRegion" title="#prop_embedding_sourceRegion">sourceRegion</a> | <a href="https://w3id.org/ldac/rocphotos/terms#sourceRegion" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#sourceRegion</a> | No | The region it was computed from. Absent for a stranger, which is never written back as a region. | Text |  |

## All Properties

### <a id="prop_photo_about" title="#prop_photo_about"></a> Property: about

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_about" title="#prop_photo_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Everyone depicted, always via this crate's instance of them, never the shared identity directly. | <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a>, <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_region_about" title="#prop_region_about"></a> Property: about

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_about" title="#prop_region_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Who this region depicts, via the crate's instance of them. | <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a>, <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_embedding_about" title="#prop_embedding_about"></a> Property: about

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_about" title="#prop_embedding_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | The person this is a reference for. Absent entirely for a stranger. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_photo_dateCreated" title="#prop_photo_dateCreated"></a> Property: dateCreated

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_dateCreated" title="#prop_photo_dateCreated">dateCreated</a> | <a href="http://schema.org/dateCreated" target="_blank" rel="noopener">http://schema.org/dateCreated</a> | From EXIF DateTimeOriginal. | Date | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_photo_dateModified" title="#prop_photo_dateModified"></a> Property: dateModified

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_dateModified" title="#prop_photo_dateModified">dateModified</a> | <a href="http://schema.org/dateModified" target="_blank" rel="noopener">http://schema.org/dateModified</a> | The source file's modification time when last processed — what a rescan compares against to decide whether to re-read it. | Date | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_photo_description" title="#prop_photo_description"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_description" title="#prop_photo_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | The photo's own caption, if it has one. | Text | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_album_description" title="#prop_album_description"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_album_description" title="#prop_album_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | Optional. | Text | <a href="#class_Album" title="#class_Album">Album</a> |
### <a id="prop_embedding_embedding" title="#prop_embedding_embedding"></a> Property: embedding

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_embedding" title="#prop_embedding_embedding">embedding</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embedding" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embedding</a> | The model's own vector. | Number | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_embedding_model" title="#prop_embedding_model"></a> Property: embeddingModel

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_model" title="#prop_embedding_model">embeddingModel</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embeddingModel" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embeddingModel</a> | The model that produced it. | Text | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_embedding_modelVersion" title="#prop_embedding_modelVersion"></a> Property: embeddingModelVersion

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_modelVersion" title="#prop_embedding_modelVersion">embeddingModelVersion</a> | <a href="https://w3id.org/ldac/rocphotos/terms#embeddingModelVersion" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#embeddingModelVersion</a> | Its version — a bump makes every reference obsolete, which is why it is recorded per entity. | Text | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_photo_exifData" title="#prop_photo_exifData"></a> Property: exifData

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_exifData" title="#prop_photo_exifData">exifData</a> | <a href="https://w3id.org/ldac/rocphotos/terms#exifData" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#exifData</a> | Selected EXIF fields, each as a PropertyValue. | <a href="#class_ExifValue" title="#class_ExifValue">EXIF value</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_root_hasPart" title="#prop_root_hasPart"></a> Property: hasPart

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_root_hasPart" title="#prop_root_hasPart">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | The photos in this crate, or — in the root crate — each sub-collection Dataset and each album. |  | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |
### <a id="prop_album_hasPart" title="#prop_album_hasPart"></a> Property: hasPart

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_album_hasPart" title="#prop_album_hasPart">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | Membership and display order at once: array order is the order. | <a href="#class_AlbumItem" title="#class_AlbumItem">Album item</a> | <a href="#class_Album" title="#class_Album">Album</a> |
### <a id="prop_region_height" title="#prop_region_height"></a> Property: height

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_height" title="#prop_region_height">height</a> | <a href="http://schema.org/height" target="_blank" rel="noopener">http://schema.org/height</a> | The region's height, as a fraction of the image. | Number | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_photo_keywords" title="#prop_photo_keywords"></a> Property: keywords

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_keywords" title="#prop_photo_keywords">keywords</a> | <a href="http://schema.org/keywords" target="_blank" rel="noopener">http://schema.org/keywords</a> | IPTC/XMP keywords, excluding any that duplicate a region's name. | Text | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_root_mentions" title="#prop_root_mentions"></a> Property: mentions

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_root_mentions" title="#prop_root_mentions">mentions</a> | <a href="http://schema.org/mentions" target="_blank" rel="noopener">http://schema.org/mentions</a> | Root crate only: every Person/Pet depicted anywhere in the collection. This is what makes them reachable in the graph, and where their description is meant to accumulate. Deliberately unrestricted in range: a Pet cannot be range-checked until rocphotos binds the rocphotos: prefix in its crates (see the profile text). |  | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |
### <a id="prop_root_name" title="#prop_root_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_root_name" title="#prop_root_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | For a sub-collection, its path relative to the collection root. | Text | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |
### <a id="prop_subcollection_name" title="#prop_subcollection_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_subcollection_name" title="#prop_subcollection_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The sub-collection's path, e.g. 2025/03/10. | Text | <a href="#class_SubCollection" title="#class_SubCollection">Sub-collection reference</a> |
### <a id="prop_photo_name" title="#prop_photo_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_name" title="#prop_photo_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The file's own name. | Text | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_thumbnail_name" title="#prop_thumbnail_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_thumbnail_name" title="#prop_thumbnail_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | e.g. "Thumbnail of IMG_0042.jpg". | Text | <a href="#class_Thumbnail" title="#class_Thumbnail">Thumbnail</a> |
### <a id="prop_album_name" title="#prop_album_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_album_name" title="#prop_album_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The album's name, from which its id is derived. | Text | <a href="#class_Album" title="#class_Album">Album</a> |
### <a id="prop_person_name" title="#prop_person_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_person_name" title="#prop_person_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The name their identity is derived from. | Text | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> |
### <a id="prop_personinstance_name" title="#prop_personinstance_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_personinstance_name" title="#prop_personinstance_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | How they were known here, which need not match the shared identity's name. | Text | <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a> |
### <a id="prop_pet_name" title="#prop_pet_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_pet_name" title="#prop_pet_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The name their identity is derived from. | Text | <a href="#MainPetClass" title="#MainPetClass">Pet</a> |
### <a id="prop_petinstance_name" title="#prop_petinstance_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_petinstance_name" title="#prop_petinstance_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | How they were known here. | Text | <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> |
### <a id="prop_region_name" title="#prop_region_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_name" title="#prop_region_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The subject's name, duplicated here so a reader need not resolve about. | Text | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_standoff_name" title="#prop_standoff_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_name" title="#prop_standoff_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The subject's name. | Text | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_exif_name" title="#prop_exif_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_exif_name" title="#prop_exif_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The EXIF field name, e.g. Make. | Text | <a href="#class_ExifValue" title="#class_ExifValue">EXIF value</a> |
### <a id="prop_embedding_name" title="#prop_embedding_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_name" title="#prop_embedding_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The person's name, or "Ignored stranger" for a permanently-suppressed face. | Text | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_standoff_hasBody" title="#prop_standoff_hasBody"></a> Property: oa:hasBody

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_hasBody" title="#prop_standoff_hasBody">oa:hasBody</a> | <a href="http://www.w3.org/ns/oa#hasBody" target="_blank" rel="noopener">http://www.w3.org/ns/oa#hasBody</a> | A per-region proxy for the subject, so this one sighting could later carry its own properties. | <a href="#class_RegionBody" title="#class_RegionBody">Region body</a> | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_standoff_hasTarget" title="#prop_standoff_hasTarget"></a> Property: oa:hasTarget

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_hasTarget" title="#prop_standoff_hasTarget">oa:hasTarget</a> | <a href="http://www.w3.org/ns/oa#hasTarget" target="_blank" rel="noopener">http://www.w3.org/ns/oa#hasTarget</a> | A W3C Media Fragment on the photo — #xywh=percent:x,y,w,h, a top-left corner and size, unlike the centre-based EXIF shape. |  | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_standoff_motivatedBy" title="#prop_standoff_motivatedBy"></a> Property: oa:motivatedBy

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_motivatedBy" title="#prop_standoff_motivatedBy">oa:motivatedBy</a> | <a href="http://www.w3.org/ns/oa#motivatedBy" target="_blank" rel="noopener">http://www.w3.org/ns/oa#motivatedBy</a> | Always oa:identifying — the annotation says who this is. The value comes from an ItemList so more motivations can be added later. As with any ItemList value, the crate must carry the oa:identifying entity itself, matching the one in this profile. | <a href="#itemlist_motivation" title="#itemlist_motivation">Annotation motivations</a> | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_photo_processingError" title="#prop_photo_processingError"></a> Property: processingError

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_processingError" title="#prop_photo_processingError">processingError</a> | <a href="https://w3id.org/ldac/rocphotos/terms#processingError" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#processingError</a> | An EXIF and/or thumbnail failure. Removed once the file processes cleanly. | Text | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_albumitem_specializationOf" title="#prop_albumitem_specializationOf"></a> Property: prov:specializationOf

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_albumitem_specializationOf" title="#prop_albumitem_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | The real photo this item stands for. | <a href="#class_Photo" title="#class_Photo">Photo</a> | <a href="#class_AlbumItem" title="#class_AlbumItem">Album item</a> |
### <a id="prop_personinstance_specializationOf" title="#prop_personinstance_specializationOf"></a> Property: prov:specializationOf

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_personinstance_specializationOf" title="#prop_personinstance_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | The shared identity this is an instance of. | <a href="#MainPersonClass" title="#MainPersonClass">Person</a> | <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a> |
### <a id="prop_petinstance_specializationOf" title="#prop_petinstance_specializationOf"></a> Property: prov:specializationOf

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_petinstance_specializationOf" title="#prop_petinstance_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | The shared identity this is an instance of. | <a href="#MainPetClass" title="#MainPetClass">Pet</a> | <a href="#InstancePetClass" title="#InstancePetClass">Pet in this crate</a> |
### <a id="prop_regionbody_specializationOf" title="#prop_regionbody_specializationOf"></a> Property: prov:specializationOf

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_regionbody_specializationOf" title="#prop_regionbody_specializationOf">prov:specializationOf</a> | <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">http://www.w3.org/ns/prov#specializationOf</a> | This crate's instance of the person depicted. | <a href="#InstancePersonClass" title="#InstancePersonClass">Person in this crate</a> | <a href="#class_RegionBody" title="#class_RegionBody">Region body</a> |
### <a id="prop_photo_rating" title="#prop_photo_rating"></a> Property: rating

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_rating" title="#prop_photo_rating">rating</a> | <a href="https://w3id.org/ldac/rocphotos/terms#rating" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#rating</a> | XMP star rating, 1-5. Absent rather than 0 when unrated. | Number | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_photo_regions" title="#prop_photo_regions"></a> Property: regions

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_regions" title="#prop_photo_regions">regions</a> | <a href="https://w3id.org/ldac/rocphotos/terms#regions" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#regions</a> | Every tagged region on this photo, of either shape. | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a>, <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_region_regionType" title="#prop_region_regionType"></a> Property: regionType

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_regionType" title="#prop_region_regionType">regionType</a> | <a href="https://w3id.org/ldac/rocphotos/terms#regionType" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#regionType</a> | A literal, either "Face" or "Pet". | Text | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_standoff_regionType" title="#prop_standoff_regionType"></a> Property: regionType

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_regionType" title="#prop_standoff_regionType">regionType</a> | <a href="https://w3id.org/ldac/rocphotos/terms#regionType" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#regionType</a> | A literal, either "Face" or "Pet". | Text | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_embedding_sourceImage" title="#prop_embedding_sourceImage"></a> Property: sourceImage

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_sourceImage" title="#prop_embedding_sourceImage">sourceImage</a> | <a href="https://w3id.org/ldac/rocphotos/terms#sourceImage" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#sourceImage</a> | The photo it was computed from, as a collection-relative path. | Text | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_embedding_sourceRegion" title="#prop_embedding_sourceRegion"></a> Property: sourceRegion

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_embedding_sourceRegion" title="#prop_embedding_sourceRegion">sourceRegion</a> | <a href="https://w3id.org/ldac/rocphotos/terms#sourceRegion" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#sourceRegion</a> | The region it was computed from. Absent for a stranger, which is never written back as a region. | Text | <a href="#class_FaceEmbedding" title="#class_FaceEmbedding">Face embedding</a> |
### <a id="prop_photo_thumbnail" title="#prop_photo_thumbnail"></a> Property: thumbnail

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_thumbnail" title="#prop_photo_thumbnail">thumbnail</a> | <a href="http://schema.org/thumbnail" target="_blank" rel="noopener">http://schema.org/thumbnail</a> | The generated thumbnail. | <a href="#class_Thumbnail" title="#class_Thumbnail">Thumbnail</a> | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_photo_title" title="#prop_photo_title"></a> Property: title

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_photo_title" title="#prop_photo_title">title</a> | <a href="http://schema.org/title" target="_blank" rel="noopener">http://schema.org/title</a> | Always present: the IPTC/XMP title if the file has one, its filename otherwise. | Text | <a href="#class_Photo" title="#class_Photo">Photo</a> |
### <a id="prop_exif_value" title="#prop_exif_value"></a> Property: value

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_exif_value" title="#prop_exif_value">value</a> | <a href="http://schema.org/value" target="_blank" rel="noopener">http://schema.org/value</a> | Its value, as text. | Text | <a href="#class_ExifValue" title="#class_ExifValue">EXIF value</a> |
### <a id="prop_region_width" title="#prop_region_width"></a> Property: width

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_width" title="#prop_region_width">width</a> | <a href="http://schema.org/width" target="_blank" rel="noopener">http://schema.org/width</a> | The region's width, as a fraction of the image. | Number | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_standoff_writtenToFile" title="#prop_standoff_writtenToFile"></a> Property: writtenToFile

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_standoff_writtenToFile" title="#prop_standoff_writtenToFile">writtenToFile</a> | <a href="https://w3id.org/ldac/rocphotos/terms#writtenToFile" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#writtenToFile</a> | Whether this region has been written into the photo file's own XMP. Once a rescan finds the same name in the file's real EXIF regions, this region is replaced by the EXIF-derived one. | Boolean | <a href="#class_ImageRegion_Standoff" title="#class_ImageRegion_Standoff">Region (confirmed here)</a> |
### <a id="prop_region_xPosition" title="#prop_region_xPosition"></a> Property: xPosition

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_xPosition" title="#prop_region_xPosition">xPosition</a> | <a href="https://w3id.org/ldac/rocphotos/terms#xPosition" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#xPosition</a> | The region's centre X, as a fraction of the image. | Number | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
### <a id="prop_region_yPosition" title="#prop_region_yPosition"></a> Property: yPosition

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_region_yPosition" title="#prop_region_yPosition">yPosition</a> | <a href="https://w3id.org/ldac/rocphotos/terms#yPosition" target="_blank" rel="noopener">https://w3id.org/ldac/rocphotos/terms#yPosition</a> | The region's centre Y, as a fraction of the image. | Number | <a href="#class_ImageRegion_Exif" title="#class_ImageRegion_Exif">Region (from the file's own tags)</a> |
## Property Values

No PropertyValue entities are defined.



## Enumerations

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


