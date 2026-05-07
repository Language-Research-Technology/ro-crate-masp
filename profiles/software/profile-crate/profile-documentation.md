---
title: Software Source Code
---


# Software Source Code RO-Crate Profile

* Version: 0.1
* Permalink: <https://w3id.org/ro/profiles/software/source-code/0.1>
* Authors: Language Data Commons of Australia (LDaCA) RO-Crate working group
* Copyright: University of Queensland

This profile uses terminology from the [RO-Crate 1.1 specification](https://w3id.org/ro/crate/1.1).

## Overview

This profile is based on the [RO-Crate Metadata Specification 1.1](https://www.researchobject.org/ro-crate/1.1/), and
it used to describe a collection of software source code files (as in a git repository) using terms from the 
schema.org "Dataset", "SoftwareSourceCode", and "SoftwareApplication" types.
It is intended to be 100% semantically interoperable with the Codemeta project (https://codemeta.github.io/index.html).

## Example Metadata File (ro-crate-metadata.json) 
Below is an example of a complete RO-Crate metadata for a software repository.

```json
{
  "@context": [
    "https://w3id.org/ro/crate/1.1/context",
    { "@vocab": "http://schema.org/" }
  ],
  "@graph": [
    {
      "@id": "./",
      "@type": ["Dataset", "SoftwareSourceCode", "SoftwareApplication"],
      "name": "Liskov_example",
      "description": "Liskov Substitution Principle example",
      "datePublished": "2020-10-12",
      "license": { "@id": "https://spdx.org/licenses/Apache-2.0.html" },
      "conformsTo": { "@id": "https://purl.archive.org/language-data-commons/profile#Software" },
      "creator": { "@id": "https://orcid.org/0000-0001-8937-8904" },
      "funder": { "@id": "https://ror.org/03j2gem75" },
      "softwareVersion": "0.0.1",
      "programmingLanguage": { "@id": "https://www.python.org/" },
      "codeRepository": "https://github.com/alex-ip/Liskov_example",
      "downloadUrl": "https://github.com/alex-ip/Liskov_example/archive/refs/heads/main.zip",
      "softwareHelp": { "@id": "README.md" },
      "usageInfo": "README.md",
      "mainEntity": { "@id": "Liskov_substitution_demo.ipynb" },
      "hasPart": [
        { "@id": "README.md" },
        { "@id": "environment.yml" },
        { "@id": "Liskov_substitution_demo.ipynb" }
      ],
      "softwareRequirements": { "@id": "environment.yml" },
      "availableOnDevice": { "@id": "resources.yml" }
    },
    {
      "@id": "https://orcid.org/0000-0001-8937-8904",
      "@type": "Person",
      "name": "Alex Ip"
    },
    {
      "@id": "https://ror.org/03j2gem75",
      "@type": "Organization",
      "name": "AARNet Pty Ltd"
    },
    {
      "@id": "https://www.python.org/",
      "@type": "ComputerLanguage",
      "name": "Python 3.X"
    },
    {
      "@id": "ro-crate-metadata.json",
      "@type": "CreativeWork",
      "identifier": "ro-crate-metadata.json",
      "about": { "@id": "./" }
    }
  ]
}
```


### Specifying software & hardware dependencies for an execution environment
This profile references machine-readable files in the repository to specify the software and hardware requirements for 
the repo rather than encapsulating them in the RO-Crate

#### Software dependencies

Below is a sample "environment.yml" file used by BinderHub to specify Conda Python software dependencies for a 
custom environment. It can be created using the command "conda env export". There are other language-dependent 
files which can be used to specify environments, including "runtime.txt", "install.R", or "dockerfile", 
and these files should be referenced in the "softwareRequirements" section of the RO-Crate. Further information can be 
found at https://mybinder.readthedocs.io/en/latest/using/config_files.html.

The RO-Crate metadata structure would be:

```json
{
  "@context": [
    "https://w3id.org/ro/crate/1.1/context",
    { "@vocab": "http://schema.org/" }
  ],
  "@graph": [
    {
      "@id": "./",
      "@type": "Dataset",
      "name": "Example of how to link to software requirements",
      "hasPart": { "@id": "environment.yml" }
    },
    {
      "@id": "environment.yml",
      "@type": "File",
      "description": "Software dependencies for conda Python environment"
    },
    {
      "@id": "ro-crate-metadata.json",
      "@type": "CreativeWork",
      "identifier": "ro-crate-metadata.json",
      "about": { "@id": "./" }
    }
  ]
}
```

The `environment.yml` file would contain:

```yaml
name: example-environment
channels:
  - conda-forge
dependencies:
  - python=3.9
  - numpy
  - pandas
  - jupyter
```

#### Hardware resource requirements

Below is a sample "resources.yml" file used to specify minimum hardware requirements for the repository's 
execution environment. This file can include storage, memory, CPU count, CPU architecture and GPU requirements, and 
anything unspecified is treated as "don't care".
This file will be used by ATAP portal to filter known BinderHub installations by resource levels to ensure successful execution.
The labels and values used in "resources.yaml" are derived from JupyterHub configuration YAML which specifies resources for Kubernetes pods.
The "resources.yaml" file is currently referenced in the repo’s RO-crate in the schema.org "availableOnDevice" property.

The RO-Crate metadata structure would be:

```json
{
  "@context": [
    "https://w3id.org/ro/crate/1.1/context",
    { "@vocab": "http://schema.org/" }
  ],
  "@graph": [
    {
      "@id": "./",
      "@type": ["Dataset", "SoftwareSourceCode", "SoftwareApplication"],
      "name": "Example crate with a hardware environment",
      "description": "Illustrates how to link a software application to the virtualised environment",
      "datePublished": "2023-11-28",
      "hasPart": { "@id": "resources.yml" }
    },
    {
      "@id": "resources.yml",
      "@type": "File",
      "name": "Example hardware resources specification file",
      "description": "Describes virtual machine attributes like CPUs and RAM"
    },
    {
      "@id": "ro-crate-metadata.json",
      "@type": "CreativeWork",
      "identifier": "ro-crate-metadata.json",
      "about": { "@id": "./" }
    }
  ]
}
```

The `resources.yml` file would contain:

```yaml
requests:
  memory: 1Gi
  cpu: 0.5
limits:
  memory: 2Gi
  cpu: 1.0
```

## Requirements 


### <a id="Root_Data_Entity"></a> Class: Root Data Entity <small style="color:#aaa;font-weight:normal">#Root_Data_Entity</small>

The Root Data Entity for an RO-Crate. In this profile, it is a Dataset and SoftwareSourceCode and SoftwareApplication.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [Dataset](http://schema.org/Dataset), [SoftwareSourceCode](http://schema.org/SoftwareSourceCode), [SoftwareApplication](http://schema.org/SoftwareApplication) |
| <a href="#prop_datePublished_Dataset">datePublished <a href="#prop_datePublished_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_datePublished_Dataset</small> | Yes | A date that this collection was published. | Date |  |
| <a href="#prop_description_Dataset">description <a href="#prop_description_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_description_Dataset</small> | Yes | An abstract of the collection. | Text |  |
| <a href="#prop_license_Dataset">license <a href="#prop_license_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_license_Dataset</small> | Yes | A license document that applies to this content, typically indicated by URL. | [class_CreativeWork](#class_CreativeWork), URL, Text |  |
| <a href="#prop_name_Dataset">name <a href="#prop_name_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_name_Dataset</small> | Yes | The name of this data collection. | Text |  |



## Root Data Entity Properties

### <a id="prop_datePublished_Dataset"></a> Property: datePublished <a href="http://schema.org/datePublished" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_datePublished_Dataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A date that this collection was published. | Date | [Root_Data_Entity](#Root_Data_Entity) |

### <a id="prop_description_Dataset"></a> Property: description <a href="http://schema.org/description" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_description_Dataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| An abstract of the collection. | Text | [Root_Data_Entity](#Root_Data_Entity) |

### <a id="prop_license_Dataset"></a> Property: license <a href="http://schema.org/license" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_license_Dataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A license document that applies to this content, typically indicated by URL. | [class_CreativeWork](#class_CreativeWork), URL, Text | [Root_Data_Entity](#Root_Data_Entity) |

### <a id="prop_name_Dataset"></a> Property: name <a href="http://schema.org/name" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_name_Dataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The name of this data collection. | Text | [Root_Data_Entity](#Root_Data_Entity) |



## Types of entities (specializations of Classes) and expected Properties


### <a id="RO-Crate_Metadata_Descriptor"></a> Class: RO-Crate Metadata Descriptor <small style="color:#aaa;font-weight:normal">#RO-Crate_Metadata_Descriptor</small>

An RO-Crate @graph must contain an entity of Type @CreativeWork which is known as the RO-Crate Metadata descriptor.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [CreativeWork](http://schema.org/CreativeWork) |
| <a href="#RO-Crate_Metadata_Descriptor.id">@id</a> <small style="color:#aaa;font-weight:normal">#RO-Crate_Metadata_Descriptor.id</small> | Yes | The RO-Crate Metadata file identifier | [Root_Data_Entity](#Root_Data_Entity) | ro-crate-metadata.json |
| <a href="#RO-Crate_Metadata_Descriptor.about">about <a href="#RO-Crate_Metadata_Descriptor.about" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#RO-Crate_Metadata_Descriptor.about</small> | Yes | This property on the RO-Crate Metadata Descriptor references the Root Data Entity. | [Root_Data_Entity](#Root_Data_Entity) |  |


### <a id="Root_Data_Entity"></a> Class: Root Data Entity <small style="color:#aaa;font-weight:normal">#Root_Data_Entity</small>

The Root Data Entity for an RO-Crate. In this profile, it is a Dataset and SoftwareSourceCode and SoftwareApplication.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [Dataset](http://schema.org/Dataset), [SoftwareSourceCode](http://schema.org/SoftwareSourceCode), [SoftwareApplication](http://schema.org/SoftwareApplication) |
| <a href="#prop_datePublished_Dataset">datePublished <a href="#prop_datePublished_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_datePublished_Dataset</small> | Yes | A date that this collection was published. | Date |  |
| <a href="#prop_description_Dataset">description <a href="#prop_description_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_description_Dataset</small> | Yes | An abstract of the collection. | Text |  |
| <a href="#prop_license_Dataset">license <a href="#prop_license_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_license_Dataset</small> | Yes | A license document that applies to this content, typically indicated by URL. | [class_CreativeWork](#class_CreativeWork), URL, Text |  |
| <a href="#prop_name_Dataset">name <a href="#prop_name_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_name_Dataset</small> | Yes | The name of this data collection. | Text |  |


### <a id="class_CreativeWork"></a> Class: CreativeWork <small style="color:#aaa;font-weight:normal">#class_CreativeWork</small>



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [CreativeWork](http://schema.org/CreativeWork) |
*No properties defined for this class*



### <a id="class_Dataset"></a> Class: Dataset <small style="color:#aaa;font-weight:normal">#class_Dataset</small>



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [Dataset](http://schema.org/Dataset) |
| <a href="#prop_mainEntity_Dataset">mainEntity <a href="#prop_mainEntity_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_mainEntity_Dataset</small> | Yes | Indicates the primary entry. | [class_File](#class_File) |  |
| <a href="#prop_about_Dataset">about <a href="#prop_about_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_about_Dataset</small> | No | The subject matter of the content. | [class_Dataset](#class_Dataset), [class_SoftwareApplication](#class_SoftwareApplication), [class_SoftwareSourceCode](#class_SoftwareSourceCode) |  |
| <a href="#prop_availableOnDevice_Dataset">availableOnDevice <a href="#prop_availableOnDevice_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_availableOnDevice_Dataset</small> | No | Device required to run the application. Used in cases where a specific make/model is required to run the application. | [class_File](#class_File) |  |
| <a href="#prop_citation_Dataset">citation <a href="#prop_citation_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_citation_Dataset</small> | No | A citation or reference to another creative work, such as another publication, web page, scholarly article, etc. | [class_CreativeWork](#class_CreativeWork) |  |
| <a href="#prop_codeRepository_Dataset">codeRepository <a href="#prop_codeRepository_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_codeRepository_Dataset</small> | No | Link to the repository where the un-compiled, human-readable code and related code is located (SVN, GitHub, CodePlex). | Text |  |
| <a href="#prop_creator_Dataset">creator <a href="#prop_creator_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_creator_Dataset</small> | No | The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. | [class_Person](#class_Person) |  |
| <a href="#prop_downloadUrl_Dataset">downloadUrl <a href="#prop_downloadUrl_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_downloadUrl_Dataset</small> | No | If the file can be downloaded, URL to download the binary. | Text |  |
| <a href="#prop_funder_Dataset">funder <a href="#prop_funder_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_funder_Dataset</small> | No | A person or organization that supports (sponsors) something through some kind of financial contribution. | [class_Organization](#class_Organization) |  |
| <a href="#prop_hasPart_Dataset">hasPart <a href="#prop_hasPart_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_hasPart_Dataset</small> | No | Indicates an item or CreativeWork that is part of this item, or CreativeWork (in some sense). | [class_File](#class_File) |  |
| <a href="#prop_identifier_Dataset">identifier <a href="#prop_identifier_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_identifier_Dataset</small> | No | The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.  | Text |  |
| <a href="#prop_installUrl_Dataset">installUrl <a href="#prop_installUrl_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_installUrl_Dataset</small> | No | URL at which the app may be installed, if different from the URL of the item. | Text |  |
| <a href="#prop_programmingLanguage_Dataset">programmingLanguage <a href="#prop_programmingLanguage_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_programmingLanguage_Dataset</small> | No | The computer programming language. | [class_ComputerLanguage](#class_ComputerLanguage) |  |
| <a href="#prop_publisher_Dataset">publisher <a href="#prop_publisher_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_publisher_Dataset</small> | No | The publisher of the creative work. | [class_Organization](#class_Organization) |  |
| <a href="#prop_releaseNotes_Dataset">releaseNotes <a href="#prop_releaseNotes_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_releaseNotes_Dataset</small> | No | Description of what changed in this version. | [class_File](#class_File) |  |
| <a href="#prop_runtime_Dataset">runtime <a href="#prop_runtime_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_runtime_Dataset</small> | No | Runtime platform or script interpreter dependencies (example: Java v1, Python 2.3, .NET Framework 3.0). | Text |  |
| <a href="#prop_screenshot_Dataset">screenshot <a href="#prop_screenshot_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_screenshot_Dataset</small> | No | A link to a screenshot image of the app. | [class_ImageObject](#class_ImageObject), [class_File](#class_File) |  |
| <a href="#prop_softwareHelp_Dataset">softwareHelp <a href="#prop_softwareHelp_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_softwareHelp_Dataset</small> | No | Software application help. | [class_CreativeWork](#class_CreativeWork) |  |
| <a href="#prop_softwareRequirements_Dataset">softwareRequirements <a href="#prop_softwareRequirements_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_softwareRequirements_Dataset</small> | No | Component dependency requirements for application. This includes runtime environments and shared libraries that are not included in the application distribution package, but required to run the application (examples: DirectX, Java or .NET runtime). | [class_File](#class_File) |  |
| <a href="#prop_softwareVersion_Dataset">softwareVersion <a href="#prop_softwareVersion_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_softwareVersion_Dataset</small> | No | Version of the software instance. | Text |  |
| <a href="#prop_supportingData_Dataset">supportingData <a href="#prop_supportingData_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_supportingData_Dataset</small> | No | Supporting data for a SoftwareApplication. | [class_Dataset](#class_Dataset) |  |
| <a href="#prop_usageInfo_Dataset">usageInfo <a href="#prop_usageInfo_Dataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_usageInfo_Dataset</small> | No | The schema.org [[usageInfo]] property indicates further information about a [[CreativeWork]]. This property is applicable both to works that are freely available and to those that require payment or other transactions. It can reference additional information, e.g. community expectations on preferred linking and citation conventions, as well as purchasing details. For something that can be commercially licensed, usageInfo can provide detailed, resource-specific information about licensing options. This property can be used alongside the license property which indicates license(s) applicable to some piece of content. The usageInfo property can provide information about other licensing options, e.g. acquiring commercial usage rights for an image that is also available under non-commercial creative commons licenses. | Text |  |


### <a id="class_File"></a> Class: File <small style="color:#aaa;font-weight:normal">#class_File</small>



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [File](http://schema.org/File) |
*No properties defined for this class*



### <a id="class_Person"></a> Class: Person <small style="color:#aaa;font-weight:normal">#class_Person</small>



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [Person](http://schema.org/Person) |
*No properties defined for this class*



### <a id="class_Organization"></a> Class: Organization <small style="color:#aaa;font-weight:normal">#class_Organization</small>



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [Organization](http://schema.org/Organization) |
*No properties defined for this class*



### <a id="class_ComputerLanguage"></a> Class: ComputerLanguage <small style="color:#aaa;font-weight:normal">#class_ComputerLanguage</small>



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [ComputerLanguage](http://schema.org/ComputerLanguage) |
*No properties defined for this class*



### <a id="class_SoftwareApplication"></a> Class: SoftwareApplication <small style="color:#aaa;font-weight:normal">#class_SoftwareApplication</small>



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [SoftwareApplication](http://schema.org/terms#SoftwareApplication) |
*No properties defined for this class*



### <a id="class_SoftwareSourceCode"></a> Class: SoftwareSourceCode <small style="color:#aaa;font-weight:normal">#class_SoftwareSourceCode</small>



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [SoftwareSourceCode](http://schema.org/terms#SoftwareSourceCode) |
*No properties defined for this class*





