---
title: RO-Crate 1.1 Core Profile
---

This document in an experimental RO-Crate Machine Actionable Profile for RO-Crate 1.1 - for the core, mandated metadata only. 




# The RO-Crate Root Data Entity





## Types of entities (specializations of Classes) and expected Properties


### <a id="RO-Crate_Metadata_Descriptor"></a> Class: RO-Crate Metadadata Descriptor <small style="color:#aaa;font-weight:normal">#RO-Crate_Metadata_Descriptor</small>



At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | http://schema.org/CreativeWork |
| <a href="#RO-Crate_Metadata_Descriptor.id">@id</a> <small style="color:#aaa;font-weight:normal">#RO-Crate_Metadata_Descriptor.id</small> | Yes | The RO-Crate Metadata  |  | ro-crate-metadata.json |
| <a href="#RO-Crate_Metadata_Descriptor.about">about <a href="#RO-Crate_Metadata_Descriptor.about" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#RO-Crate_Metadata_Descriptor.about</small> | Yes | This property on the RO-Crate Metadata Descriptor references the Root Data Entity. | <a href="#Root_Data_Entity">Root Data Entity</a> |  |


### <a id="Root_Data_Entity"></a> Class: Root Data Entity <small style="color:#aaa;font-weight:normal">#Root_Data_Entity</small>

The Root Data Entity for an RO-Crate. This is the main entity of the RO-Crate and is the one that is referenced by the RO-Crate Metadata Descriptor.

Instances of this type SHOULD be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 0 | 1 |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | http://schema.org/Dataset |
| <a href="#prop_datePublised_Dataset">datePublished <a href="#prop_datePublised_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_datePublised_Dataset</small> | Yes | MUST be a string in ISO 8601 date format and SHOULD be specified to at least the precision of a day, MAY be a timestamp down to the millisecond. | schema:Date |  |
| <a href="#prop_description_Dataset">description <a href="#prop_description_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_description_Dataset</small> | Yes | (In addition to the name) SHOULD further elaborate on the name to provide a summary of the context in which the dataset is important. | Text |  |
| <a href="#prop_license_Dataset">license <a href="#prop_license_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_license_Dataset</small> | Yes | SHOULD link to a Contextual Entity in the RO-Crate Metadata File with a name and description. MAY have a URI (eg for Creative Commons or Open Source licenses). MAY if necessary be a textual description of how the RO-Crate may be used | <a href="#class_CreativeWorkLicense">License (Creative Work)</a>, schema:URL, schema:Text |  |
| <a href="#http%3A%2F%2Fschema.org%2Fname">name <a href="#http%3A%2F%2Fschema.org%2Fname" target="_blank" rel="noopener">ⓘ</a></a> | Yes | SHOULD identify the dataset to humans well enough to disambiguate it from other RO-Crates | Text |  |


### <a id="class_CreativeWorkLicense"></a> Class: License (Creative Work) <small style="color:#aaa;font-weight:normal">#class_CreativeWorkLicense</small>

A license included as a Creative Work - with at least a name and description

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | http://schema.org/CreativeWork |
*No properties defined for this class*


## All Properties

### <a id="RO-Crate_Metadata_Descriptor.id"></a> Property: @id <small style="color:#aaa;font-weight:normal">#RO-Crate_Metadata_Descriptor.id</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The RO-Crate Metadata  |  | <a href="#RO-Crate_Metadata_Descriptor">RO-Crate Metadadata Descriptor</a> |
### <a id="RO-Crate_Metadata_Descriptor.about"></a> Property: about <a href="http://schema.org/about" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#RO-Crate_Metadata_Descriptor.about</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| This property on the RO-Crate Metadata Descriptor references the Root Data Entity. | <a href="#Root_Data_Entity">Root Data Entity</a> | <a href="#RO-Crate_Metadata_Descriptor">RO-Crate Metadadata Descriptor</a> |
### <a id="prop_datePublised_Dataset"></a> Property: datePublished <a href="http://schema.org/datePubished" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_datePublised_Dataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| MUST be a string in ISO 8601 date format and SHOULD be specified to at least the precision of a day, MAY be a timestamp down to the millisecond. | schema:Date | <a href="#Root_Data_Entity">Root Data Entity</a> |
### <a id="prop_description_Dataset"></a> Property: description <a href="http://schema.org/description" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_description_Dataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| (In addition to the name) SHOULD further elaborate on the name to provide a summary of the context in which the dataset is important. | Text | <a href="#Root_Data_Entity">Root Data Entity</a> |
### <a id="prop_license_Dataset"></a> Property: license <a href="http://schema.org/license" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_license_Dataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| SHOULD link to a Contextual Entity in the RO-Crate Metadata File with a name and description. MAY have a URI (eg for Creative Commons or Open Source licenses). MAY if necessary be a textual description of how the RO-Crate may be used | <a href="#class_CreativeWorkLicense">License (Creative Work)</a>, schema:URL, schema:Text | <a href="#Root_Data_Entity">Root Data Entity</a> |
### <a id="http%3A%2F%2Fschema.org%2Fname"></a> Property: name <a href="http://schema.org/name" target="_blank" rel="noopener">ⓘ</a>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| SHOULD identify the dataset to humans well enough to disambiguate it from other RO-Crates | Text | <a href="#Root_Data_Entity">Root Data Entity</a> |


## Defined Term Sets




## Provenance

This document was compiled using [generate-masp-docs.js](https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/generate-masp-docs.js), based on [profiles/ro-crate/profile-text.md](https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/profiles/ro-crate/profile-text.md) using a MASP Schema defined in [profiles/ro-crate/profile-crate/ro-crate-metadata.json](https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/profiles/ro-crate/profile-crate/ro-crate-metadata.json).
