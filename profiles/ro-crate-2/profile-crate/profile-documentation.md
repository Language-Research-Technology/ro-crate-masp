---
title: RO-Crate 1.1 Core Profile
---

This document in an experimental RO-Crate Machine Actionable Profile for RO-Crate 1.1 - for the core, mandated metadata only. 




# The RO-Crate Root Data Entity





## Types of entities (specializations of Classes) and expected Properties


### <a id="RO-Crate_Metadata_Descriptor" title="#RO-Crate_Metadata_Descriptor"></a> Class: RO-Crate Metadadata Descriptor



At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/CreativeWork" title="http://schema.org/CreativeWork" target="_blank" rel="noopener">CreativeWork</a> |
| <a href="#RO-Crate_Metadata_Descriptor.id" title="#RO-Crate_Metadata_Descriptor.id">@id</a> |  | Yes | The RO-Crate Metadata  | <a href="#propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id">RO-Crate Metadadata Descriptor Identifier Constraint</a> |  |
| <a href="#RO-Crate_Metadata_Descriptor.about" title="#RO-Crate_Metadata_Descriptor.about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Yes | This property on the RO-Crate Metadata Descriptor references the Root Data Entity. | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |  |


### <a id="Root_Data_Entity" title="#Root_Data_Entity"></a> Class: Root Data Entity

The Root Data Entity for an RO-Crate. This is the main entity of the RO-Crate and is the one that is referenced by the RO-Crate Metadata Descriptor.

Instances of this type SHOULD be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 0 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
| <a href="#prop_datePublished_Dataset" title="#prop_datePublished_Dataset">datePublished</a> | <a href="http://schema.org/datePubished" target="_blank" rel="noopener">http://schema.org/datePubished</a> | Yes | MUST be a string in ISO 8601 date format and SHOULD be specified to at least the precision of a day, MAY be a timestamp down to the millisecond. | schema:Date |  |
| <a href="#prop_description_Dataset" title="#prop_description_Dataset">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | Yes | (In addition to the name) SHOULD further elaborate on the name to provide a summary of the context in which the dataset is important. | Text |  |
| <a href="#prop_license_Dataset" title="#prop_license_Dataset">license</a> | <a href="http://schema.org/license" target="_blank" rel="noopener">http://schema.org/license</a> | Yes | SHOULD link to a Contextual Entity in the RO-Crate Metadata File with a name and description. MAY have a URI (eg for Creative Commons or Open Source licenses). MAY if necessary be a textual description of how the RO-Crate may be used | <a href="#class_CreativeWorkLicense" title="#class_CreativeWorkLicense">License (Creative Work)</a>, schema:URL, schema:Text |  |
| <a href="#http%3A%2F%2Fschema.org%2Fname" title="http://schema.org/name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | SHOULD identify the dataset to humans well enough to disambiguate it from other RO-Crates | Text |  |


### <a id="class_CreativeWorkLicense" title="#class_CreativeWorkLicense"></a> Class: License (Creative Work)

A license included as a Creative Work - with at least a name and description

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/CreativeWork" title="http://schema.org/CreativeWork" target="_blank" rel="noopener">CreativeWork</a> |
*No properties defined for this class*



### <a id="class_File" title="#class_File"></a> Class: File

A File entity identified by an @id that must satisfy File ID constraints.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/MediaObject" title="http://schema.org/MediaObject" target="_blank" rel="noopener">MediaObject</a> |
| <a href="#property_File.id" title="#property_File.id">@id</a> |  | Yes | The File identifier MUST satisfy all regular expressions listed in #File_id_constraints. | <a href="#File_id_constraints" title="#File_id_constraints">File ID Constraints</a> |  |

## All Properties

### <a id="RO-Crate_Metadata_Descriptor.id" title="#RO-Crate_Metadata_Descriptor.id"></a> Property: @id

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#RO-Crate_Metadata_Descriptor.id" title="#RO-Crate_Metadata_Descriptor.id">@id</a> |  | The RO-Crate Metadata  | <a href="#propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id">RO-Crate Metadadata Descriptor Identifier Constraint</a> | <a href="#RO-Crate_Metadata_Descriptor" title="#RO-Crate_Metadata_Descriptor">RO-Crate Metadadata Descriptor</a> |
### <a id="property_File.id" title="#property_File.id"></a> Property: @id

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#property_File.id" title="#property_File.id">@id</a> |  | The File identifier MUST satisfy all regular expressions listed in #File_id_constraints. | <a href="#File_id_constraints" title="#File_id_constraints">File ID Constraints</a> | <a href="#class_File" title="#class_File">File</a> |
### <a id="RO-Crate_Metadata_Descriptor.about" title="#RO-Crate_Metadata_Descriptor.about"></a> Property: about

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#RO-Crate_Metadata_Descriptor.about" title="#RO-Crate_Metadata_Descriptor.about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | This property on the RO-Crate Metadata Descriptor references the Root Data Entity. | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> | <a href="#RO-Crate_Metadata_Descriptor" title="#RO-Crate_Metadata_Descriptor">RO-Crate Metadadata Descriptor</a> |
### <a id="prop_datePublished_Dataset" title="#prop_datePublished_Dataset"></a> Property: datePublished

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_datePublished_Dataset" title="#prop_datePublished_Dataset">datePublished</a> | <a href="http://schema.org/datePubished" target="_blank" rel="noopener">http://schema.org/datePubished</a> | MUST be a string in ISO 8601 date format and SHOULD be specified to at least the precision of a day, MAY be a timestamp down to the millisecond. | schema:Date | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |
### <a id="prop_description_Dataset" title="#prop_description_Dataset"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_description_Dataset" title="#prop_description_Dataset">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | (In addition to the name) SHOULD further elaborate on the name to provide a summary of the context in which the dataset is important. | Text | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |
### <a id="prop_license_Dataset" title="#prop_license_Dataset"></a> Property: license

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_license_Dataset" title="#prop_license_Dataset">license</a> | <a href="http://schema.org/license" target="_blank" rel="noopener">http://schema.org/license</a> | SHOULD link to a Contextual Entity in the RO-Crate Metadata File with a name and description. MAY have a URI (eg for Creative Commons or Open Source licenses). MAY if necessary be a textual description of how the RO-Crate may be used | <a href="#class_CreativeWorkLicense" title="#class_CreativeWorkLicense">License (Creative Work)</a>, schema:URL, schema:Text | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |
### <a id="http%3A%2F%2Fschema.org%2Fname" title="http://schema.org/name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#http%3A%2F%2Fschema.org%2Fname" title="http://schema.org/name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | SHOULD identify the dataset to humans well enough to disambiguate it from other RO-Crates | Text | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |
## Property Values

### <a id="File_id_constraints" title="#File_id_constraints"></a> Property Value: File ID Constraints

ID: #File_id_constraints

<table>
<thead><tr><th>Property Value</th><th>Description</th><th>Value</th><th>Min Count</th><th>Max Count</th></tr></thead>
<tbody>
<tr><td><a href="#File_id_constraints" title="#File_id_constraints">File ID Constraints</a></td><td>Regular expression constraints for File @id values. accepts either a scheme-style prefix (something://) or any non-empty string that does not start with # or _:.</td><td><div><strong>Regex Pattern</strong><pre><code>/^(?:[a-zA-Z][a-zA-Z0-9+.-]*:\/\/|(?!(?:#|_:)).+)$/</code></pre></div></td><td>1</td><td>N/A</td></tr>
</tbody></table>

### <a id="propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id"></a> Property Value: RO-Crate Metadadata Descriptor Identifier Constraint

ID: #propertyValue_RO-Crate_Metadata_Descriptor.id

<table>
<thead><tr><th>Property Value</th><th>Description</th><th>Value</th><th>Min Count</th><th>Max Count</th></tr></thead>
<tbody>
<tr><td><a href="#propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id">RO-Crate Metadadata Descriptor Identifier Constraint</a></td><td>Allowed identifier value constraint for RO-Crate Metadadata Descriptor.</td><td><div><strong>Literal String</strong><pre><code>ro-crate-metadata.json</code></pre></div></td><td>1</td><td>1</td></tr>
</tbody></table>



## Defined Term Sets




## Provenance

This document was compiled using [generate-masp-docs.js](https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/generate-masp-docs.js), based on [profiles/ro-crate-2/profile-text.md](https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/profiles/ro-crate-2/profile-text.md) using a MASP Schema defined in [profiles/ro-crate-2/profile-crate/ro-crate-metadata.json](https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/profiles/ro-crate-2/profile-crate/ro-crate-metadata.json).
