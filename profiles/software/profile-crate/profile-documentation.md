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


### <a id="Root_Data_Entity" title="#Root_Data_Entity"></a> Class: Root Data Entity

The Root Data Entity for an RO-Crate. In this profile, it is a Dataset and SoftwareSourceCode and SoftwareApplication.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a>, <a href="http://schema.org/SoftwareSourceCode" title="http://schema.org/SoftwareSourceCode" target="_blank" rel="noopener">SoftwareSourceCode</a>, <a href="http://schema.org/SoftwareApplication" title="http://schema.org/SoftwareApplication" target="_blank" rel="noopener">SoftwareApplication</a> |
| <a href="#prop_datePublished_Dataset" title="#prop_datePublished_Dataset">datePublished</a> | <a href="http://schema.org/datePublished" target="_blank" rel="noopener">http://schema.org/datePublished</a> | Yes | A date that this collection was published. | Date |  |
| <a href="#prop_description_Dataset" title="#prop_description_Dataset">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | Yes | An abstract of the collection. | Text |  |
| <a href="#prop_license_Dataset" title="#prop_license_Dataset">license</a> | <a href="http://schema.org/license" target="_blank" rel="noopener">http://schema.org/license</a> | Yes | A license document that applies to this content, typically indicated by URL. | <a href="#class_CreativeWork" title="#class_CreativeWork">CreativeWork</a>, URL, Text |  |
| <a href="#prop_name_Dataset" title="#prop_name_Dataset">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The name of this data collection. | Text |  |



## Root Data Entity Properties

### <a id="prop_datePublished_Dataset" title="#prop_datePublished_Dataset"></a> Property: datePublished

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_datePublished_Dataset" title="#prop_datePublished_Dataset">datePublished</a> | <a href="http://schema.org/datePublished" target="_blank" rel="noopener">http://schema.org/datePublished</a> | A date that this collection was published. | Date | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |

### <a id="prop_description_Dataset" title="#prop_description_Dataset"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_description_Dataset" title="#prop_description_Dataset">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | An abstract of the collection. | Text | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |

### <a id="prop_license_Dataset" title="#prop_license_Dataset"></a> Property: license

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_license_Dataset" title="#prop_license_Dataset">license</a> | <a href="http://schema.org/license" target="_blank" rel="noopener">http://schema.org/license</a> | A license document that applies to this content, typically indicated by URL. | <a href="#class_CreativeWork" title="#class_CreativeWork">CreativeWork</a>, URL, Text | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |

### <a id="prop_name_Dataset" title="#prop_name_Dataset"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_name_Dataset" title="#prop_name_Dataset">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The name of this data collection. | Text | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |



## Types of entities (specializations of Classes) and expected Properties


### <a id="RO-Crate_Metadata_Descriptor" title="#RO-Crate_Metadata_Descriptor"></a> Class: RO-Crate Metadata Descriptor

An RO-Crate @graph must contain an entity of Type @CreativeWork which is known as the RO-Crate Metadata descriptor.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/CreativeWork" title="http://schema.org/CreativeWork" target="_blank" rel="noopener">CreativeWork</a> |
| <a href="#RO-Crate_Metadata_Descriptor.id" title="#RO-Crate_Metadata_Descriptor.id">@id</a> |  | Yes | The RO-Crate Metadata file identifier | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> | ro-crate-metadata.json |
| <a href="#RO-Crate_Metadata_Descriptor.about" title="#RO-Crate_Metadata_Descriptor.about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Yes | This property on the RO-Crate Metadata Descriptor references the Root Data Entity. | <a href="#Root_Data_Entity" title="#Root_Data_Entity">Root Data Entity</a> |  |


### <a id="Root_Data_Entity" title="#Root_Data_Entity"></a> Class: Root Data Entity

The Root Data Entity for an RO-Crate. In this profile, it is a Dataset and SoftwareSourceCode and SoftwareApplication.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a>, <a href="http://schema.org/SoftwareSourceCode" title="http://schema.org/SoftwareSourceCode" target="_blank" rel="noopener">SoftwareSourceCode</a>, <a href="http://schema.org/SoftwareApplication" title="http://schema.org/SoftwareApplication" target="_blank" rel="noopener">SoftwareApplication</a> |
| <a href="#prop_datePublished_Dataset" title="#prop_datePublished_Dataset">datePublished</a> | <a href="http://schema.org/datePublished" target="_blank" rel="noopener">http://schema.org/datePublished</a> | Yes | A date that this collection was published. | Date |  |
| <a href="#prop_description_Dataset" title="#prop_description_Dataset">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | Yes | An abstract of the collection. | Text |  |
| <a href="#prop_license_Dataset" title="#prop_license_Dataset">license</a> | <a href="http://schema.org/license" target="_blank" rel="noopener">http://schema.org/license</a> | Yes | A license document that applies to this content, typically indicated by URL. | <a href="#class_CreativeWork" title="#class_CreativeWork">CreativeWork</a>, URL, Text |  |
| <a href="#prop_name_Dataset" title="#prop_name_Dataset">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The name of this data collection. | Text |  |


### <a id="class_CreativeWork" title="#class_CreativeWork"></a> Class: CreativeWork



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/CreativeWork" title="http://schema.org/CreativeWork" target="_blank" rel="noopener">CreativeWork</a> |
*No properties defined for this class*



### <a id="class_Dataset" title="#class_Dataset"></a> Class: Dataset



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
| <a href="#prop_mainEntity_Dataset" title="#prop_mainEntity_Dataset">mainEntity</a> | <a href="http://schema.org/mainEntity" target="_blank" rel="noopener">http://schema.org/mainEntity</a> | Yes | Indicates the primary entry. | <a href="#class_File" title="#class_File">File</a> |  |
| <a href="#prop_about_Dataset" title="#prop_about_Dataset">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | No | The subject matter of the content. | <a href="#class_Dataset" title="#class_Dataset">Dataset</a>, <a href="#class_SoftwareApplication" title="#class_SoftwareApplication">SoftwareApplication</a>, <a href="#class_SoftwareSourceCode" title="#class_SoftwareSourceCode">SoftwareSourceCode</a> |  |
| <a href="#prop_availableOnDevice_Dataset" title="#prop_availableOnDevice_Dataset">availableOnDevice</a> | <a href="http://schema.org/availableOnDevice" target="_blank" rel="noopener">http://schema.org/availableOnDevice</a> | No | Device required to run the application. Used in cases where a specific make/model is required to run the application. | <a href="#class_File" title="#class_File">File</a> |  |
| <a href="#prop_citation_Dataset" title="#prop_citation_Dataset">citation</a> | <a href="http://schema.org/citation" target="_blank" rel="noopener">http://schema.org/citation</a> | No | A citation or reference to another creative work, such as another publication, web page, scholarly article, etc. | <a href="#class_CreativeWork" title="#class_CreativeWork">CreativeWork</a> |  |
| <a href="#prop_codeRepository_Dataset" title="#prop_codeRepository_Dataset">codeRepository</a> | <a href="http://schema.org/codeRepository" target="_blank" rel="noopener">http://schema.org/codeRepository</a> | No | Link to the repository where the un-compiled, human-readable code and related code is located (SVN, GitHub, CodePlex). | Text |  |
| <a href="#prop_creator_Dataset" title="#prop_creator_Dataset">creator</a> | <a href="http://schema.org/creator" target="_blank" rel="noopener">http://schema.org/creator</a> | No | The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. | <a href="#class_Person" title="#class_Person">Person</a> |  |
| <a href="#prop_downloadUrl_Dataset" title="#prop_downloadUrl_Dataset">downloadUrl</a> | <a href="http://schema.org/downloadUrl" target="_blank" rel="noopener">http://schema.org/downloadUrl</a> | No | If the file can be downloaded, URL to download the binary. | Text |  |
| <a href="#prop_funder_Dataset" title="#prop_funder_Dataset">funder</a> | <a href="http://schema.org/funder" target="_blank" rel="noopener">http://schema.org/funder</a> | No | A person or organization that supports (sponsors) something through some kind of financial contribution. | <a href="#class_Organization" title="#class_Organization">Organization</a> |  |
| <a href="#prop_hasPart_Dataset" title="#prop_hasPart_Dataset">hasPart</a> | <a href="http://schema.org/hasPart" target="_blank" rel="noopener">http://schema.org/hasPart</a> | No | Indicates an item or CreativeWork that is part of this item, or CreativeWork (in some sense). | <a href="#class_File" title="#class_File">File</a> |  |
| <a href="#prop_identifier_Dataset" title="#prop_identifier_Dataset">identifier</a> | <a href="http://schema.org/identifier" target="_blank" rel="noopener">http://schema.org/identifier</a> | No | The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.  | Text |  |
| <a href="#prop_installUrl_Dataset" title="#prop_installUrl_Dataset">installUrl</a> | <a href="http://schema.org/installUrl" target="_blank" rel="noopener">http://schema.org/installUrl</a> | No | URL at which the app may be installed, if different from the URL of the item. | Text |  |
| <a href="#prop_programmingLanguage_Dataset" title="#prop_programmingLanguage_Dataset">programmingLanguage</a> | <a href="http://schema.org/programmingLanguage" target="_blank" rel="noopener">http://schema.org/programmingLanguage</a> | No | The computer programming language. | <a href="#class_ComputerLanguage" title="#class_ComputerLanguage">ComputerLanguage</a> |  |
| <a href="#prop_publisher_Dataset" title="#prop_publisher_Dataset">publisher</a> | <a href="http://schema.org/publisher" target="_blank" rel="noopener">http://schema.org/publisher</a> | No | The publisher of the creative work. | <a href="#class_Organization" title="#class_Organization">Organization</a> |  |
| <a href="#prop_releaseNotes_Dataset" title="#prop_releaseNotes_Dataset">releaseNotes</a> | <a href="http://schema.org/releaseNotes" target="_blank" rel="noopener">http://schema.org/releaseNotes</a> | No | Description of what changed in this version. | <a href="#class_File" title="#class_File">File</a> |  |
| <a href="#prop_runtime_Dataset" title="#prop_runtime_Dataset">runtime</a> | <a href="http://schema.org/runtime" target="_blank" rel="noopener">http://schema.org/runtime</a> | No | Runtime platform or script interpreter dependencies (example: Java v1, Python 2.3, .NET Framework 3.0). | Text |  |
| <a href="#prop_screenshot_Dataset" title="#prop_screenshot_Dataset">screenshot</a> | <a href="http://schema.org/screenshot" target="_blank" rel="noopener">http://schema.org/screenshot</a> | No | A link to a screenshot image of the app. | <a href="#class_ImageObject" title="#class_ImageObject">class_ImageObject</a>, <a href="#class_File" title="#class_File">File</a> |  |
| <a href="#prop_softwareHelp_Dataset" title="#prop_softwareHelp_Dataset">softwareHelp</a> | <a href="http://schema.org/softwareHelp" target="_blank" rel="noopener">http://schema.org/softwareHelp</a> | No | Software application help. | <a href="#class_CreativeWork" title="#class_CreativeWork">CreativeWork</a> |  |
| <a href="#prop_softwareRequirements_Dataset" title="#prop_softwareRequirements_Dataset">softwareRequirements</a> | <a href="http://schema.org/softwareRequirements" target="_blank" rel="noopener">http://schema.org/softwareRequirements</a> | No | Component dependency requirements for application. This includes runtime environments and shared libraries that are not included in the application distribution package, but required to run the application (examples: DirectX, Java or .NET runtime). | <a href="#class_File" title="#class_File">File</a> |  |
| <a href="#prop_softwareVersion_Dataset" title="#prop_softwareVersion_Dataset">softwareVersion</a> | <a href="http://schema.org/softwareVersion" target="_blank" rel="noopener">http://schema.org/softwareVersion</a> | No | Version of the software instance. | Text |  |
| <a href="#prop_supportingData_Dataset" title="#prop_supportingData_Dataset">supportingData</a> | <a href="http://schema.org/supportingData" target="_blank" rel="noopener">http://schema.org/supportingData</a> | No | Supporting data for a SoftwareApplication. | <a href="#class_Dataset" title="#class_Dataset">Dataset</a> |  |
| <a href="#prop_usageInfo_Dataset" title="#prop_usageInfo_Dataset">usageInfo</a> | <a href="http://schema.org/usageInfo" target="_blank" rel="noopener">http://schema.org/usageInfo</a> | No | The schema.org [[usageInfo]] property indicates further information about a [[CreativeWork]]. This property is applicable both to works that are freely available and to those that require payment or other transactions. It can reference additional information, e.g. community expectations on preferred linking and citation conventions, as well as purchasing details. For something that can be commercially licensed, usageInfo can provide detailed, resource-specific information about licensing options. This property can be used alongside the license property which indicates license(s) applicable to some piece of content. The usageInfo property can provide information about other licensing options, e.g. acquiring commercial usage rights for an image that is also available under non-commercial creative commons licenses. | Text |  |


### <a id="class_File" title="#class_File"></a> Class: File



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/File" title="http://schema.org/File" target="_blank" rel="noopener">File</a> |
*No properties defined for this class*



### <a id="class_Person" title="#class_Person"></a> Class: Person



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Person" title="http://schema.org/Person" target="_blank" rel="noopener">Person</a> |
*No properties defined for this class*



### <a id="class_Organization" title="#class_Organization"></a> Class: Organization



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Organization" title="http://schema.org/Organization" target="_blank" rel="noopener">Organization</a> |
*No properties defined for this class*



### <a id="class_ComputerLanguage" title="#class_ComputerLanguage"></a> Class: ComputerLanguage



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/ComputerLanguage" title="http://schema.org/ComputerLanguage" target="_blank" rel="noopener">ComputerLanguage</a> |
*No properties defined for this class*



### <a id="class_SoftwareApplication" title="#class_SoftwareApplication"></a> Class: SoftwareApplication



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/terms#SoftwareApplication" title="http://schema.org/terms#SoftwareApplication" target="_blank" rel="noopener">SoftwareApplication</a> |
*No properties defined for this class*



### <a id="class_SoftwareSourceCode" title="#class_SoftwareSourceCode"></a> Class: SoftwareSourceCode



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/terms#SoftwareSourceCode" title="http://schema.org/terms#SoftwareSourceCode" target="_blank" rel="noopener">SoftwareSourceCode</a> |
*No properties defined for this class*





