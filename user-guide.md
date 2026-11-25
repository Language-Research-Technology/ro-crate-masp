# User Guide for Schema Creation

This is a user guide for creating new schemas with RO-Crate MASP.

## Start from the template

Schema and profile templates are in the [masp-templates](https://github.com/Language-Research-Technology/masp-templates) repository, which also has a fuller [schema user guide](https://github.com/Language-Research-Technology/masp-templates/blob/main/schema-user-guide.md). Fork or copy it to start a new schema.

## Update ro-crate-metadata.json

TODO

### @context

The RO-Crate Context requires `"https://w3id.org/ro/crate/1.2/context"`. The `@vocab` section indicates that the terms without prefixes used throughout the schema (`name`, `description`, `domainIncludes`, etc.) are from Schema.org (e.g. http://schema.org/name).

```
"@context": [
  "https://w3id.org/ro/crate/1.2/context",
  {
    "@vocab": "http://schema.org/"
  }
],
```

### @graph

The graph array contains the rest of the entities in the schema that are added as `{}` objects.

Root Data Entity:
```
"@graph": [
  {
    "@id": "./",
    "@type": "Dataset",
    "name": "Template RO-Crate Schema",
    "description": "This is a template for an RO-Crate schema.",
    "author": {
      "@id": "#author"
    },
    "license": "GPL-3.0",
    "conformsTo": {
      "@id": "https://w3id.org/template/example"
    },
    "hasResource": [
      {
        "@id": "#hasSpecializedSchema"
      }
    ],
    "hasPart": {
      "@id": "schema-documentation.md"
    }
  },
```

TODO
```
{
  "@id": "#author",
  "@type": "Organization",
  "name": "University of Queensland"
},
```
TODO
```
{
  "@id": "#hasSpecializedSchema",
  "@type": "ResourceDescriptor",
  "name": "Specialized Schema Terms",
  "hasRole": {
    "@id": "http://www.w3.org/ns/dx/prof/role/schema"
  },
  "hasPart": [
    {
      "@id": "template:ClassExample"
    },
    {
      "@id": "template:propertyExample"
    }
  ]
},
```
TODO
An example of the class and property formats are included. The `template` prefixes should be updated to your schema descriptor.
```
{
  "@id": "template:ClassExample",
  "@type": "rdfs:Class",
  "rdfs:label": "ClassExample",
  "rdfs:comment": "This is an example of a class and its format."
},
{
  "@id": "template:propertyExample",
  "@type": "rdf:Property",
  "rdfs:label": "propertyExample",
  "rdfs:comment": "This is an example of a property and its format.",
  "domainIncludes": {
    "@id": "template:ClassExample"
  },
  "rangeIncludes": {
    "@id": "schema:Text"
  }
}
```

## Update schema-text.md

The `schema-text.md` file allows you to provide more context and description of the schema, as well as defining the sections that will be populated in the output `schema-documentation.md` file. At a minimum, it should include a brief description of the schema, the material it is based on, and `${rules.all}`.

Complete list of the rules available to populate the document:
 - `${rules.all}`: Generate documentation for each Class and their expected Properties. This option will also create an _All Properties_ section with a summary of each property in the schema.
 - `${rules.allDefinedTermSets}`: Generate documentation for each entity with the type [DefinedTermSet](https://schema.org/DefinedTermSet).
 - `${rules.allItemLists}`: Generate documentation for each entity with the type [ItemList](https://schema.org/ItemList).

## Generate documentation

Generate `schema-documentation.md` from your crate and `schema-text.md` with `generate-masp-docs` from [ro-crate-masp-tools](https://github.com/crate-works/ro-crate-masp-tools):
```
npx generate-masp-docs -x <schema-crate>/ro-crate-metadata.json <schema-text.md> <schema-crate>/schema-documentation.md
```
