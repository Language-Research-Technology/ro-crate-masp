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

${rules.RootDataEntity}

${rules.RootDataEntityProperties}

${rules.allClasses}


