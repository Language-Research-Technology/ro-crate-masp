# RO-Crate Machine Actionable Schemas and Profiles (MASP)

This profile describes the structure of an RO-Crate MASP **Profile Crate** — a crate that contains machine-readable validation rules for other RO-Crates. It is used both as documentation and as input to the MASP validator and documentation generator. This profile is self-describing: the MASP profile crate is itself a valid instance of this profile.

## Background

### Definitions

| Term | Definition |
|------|------------|
| **General Purpose Schema** | A specification of Classes and Properties intended for use across multiple profiles (e.g. Schema.org, Dublin Core, Darwin Core). These may have loose range/domain constraints, typically with inheritance (a `Person` is a subclass of `Thing`). |
| **Schema Language** | The formalisation used to express a schema. Examples include RDF Schema (RDFS), OWL, SKOS, and Schema.org's own data model. |
| **SoSS (Schema.org Style Schema)** | Schema.org's data model expressed as a set of `rdfs:Class` and `rdf:Property` definitions in JSON-LD. RO-Crate 1.2 uses this approach for adding extra vocabulary terms to crates and profiles. |
| **Profile Specific Schema** | A schema specialised for a particular domain. For example, the Language Data Commons has a general-purpose SoSS at `http://w3id.org/ldac/terms` and a stricter profile at `https://w3id.org/ldac/profile`. |
| **Class** | A named type applied to entities via the `@type` property. MASP uses `rdfs:Class` as per Schema.org's data model. |
| **Property** | An attribute of an entity. MASP uses `rdf:Property` as per Schema.org's data model. |
| **Profile** | A specialisation of a standard or specification, as defined by the [W3C Profiles Vocabulary](https://www.w3.org/TR/dx-prof/). A profile introduces constraints or extensions that make a standard suitable for a particular purpose. Profile Crates are profiles of RO-Crate. |
| **Profile Crate** | An RO-Crate whose root entity has `@type: ["Dataset", "Profile"]` and contains machine-readable schema rules alongside human-readable documentation. The structure is defined in the [RO-Crate 1.2 Profiles specification](https://www.researchobject.org/ro-crate/specification/1.2/profiles.html). |

The relationship between schemas and profiles:

```mermaid
graph TD;
    subgraph sc["Schemas: General purpose descriptions of a domain"]
    end
    subgraph profile["Profiles: Specialised subsets of a schema, typically with stricter constraints and localised term descriptions"]
    end
```

An example with real vocabularies:

```mermaid
graph TD;
    subgraph sc["Schemas: Example"]
      schemao["Schema.org"]
      ldacs["Language Data Commons Schema"]
    end
    subgraph profile["Profiles: Example"]
      ldacp["Language Data Commons Profile"]
    end
    ldacs -->|Extends| schemao
    ldacp -->|Specializes| ldacs
```

Both schemas and profiles can be expressed in RO-Crate MASP:

```mermaid
graph TD;
    subgraph sc["Schemas: Example"]
      schemao["Schema.org"]
      ldacs["Language Data Commons Schema"]
    end
    subgraph profile["Profiles: Example"]
      subgraph ldacp["Language Data Commons Profile - RO-Crate"]
          ldacpc["ro-crate-metadata.json (rules)"]
          ldacmd["profile-documentation.md"]
      end
    end
    ldacs -->|Extends| schemao
    ldacp -->|Specializes| ldacs
    subgraph v["Validators"]
      jsv["JavaScript (soss-validator.js)"]
    end
    doco["Documentation Generator"] --> ldacmd
    ldacpc -->|input| doco
    ldacpc -->|input| jsv
```

### Background: Schema.org Style Schemas

Schema.org describes its vocabulary using `rdf:Property` and `rdfs:Class` entities. RO-Crate has used this convention since its inception. For example, the Schema.org definition of `author`:

```json
{
  "@id": "schema:author",
  "@type": "rdf:Property",
  "rdfs:comment": "The author of this content.",
  "rdfs:label": "author",
  "schema:domainIncludes": [
    {"@id": "schema:CreativeWork"}
  ],
  "schema:rangeIncludes": [
    {"@id": "schema:Organization"},
    {"@id": "schema:Person"}
  ]
}
```

MASP extends this approach with a few additions — `prov:specializationOf` to link a profile-specific class or property to its base vocabulary term, and `sh:minCount`/`sh:maxCount` borrowed from SHACL to express cardinality.

## Profile Specific Schemas

A MASP profile-specific schema specializes Schema.org-style terms for a particular context. The key differences from plain Schema.org style:

- `prov:specializationOf` links the local rule to the base vocabulary term it constrains (specialises)
- `domainIncludes` (without `schema:` prefix — the validator resolves this via the RO-Crate JSON-LD context) links a property rule to its class rule
- `sh:minCount` and `sh:maxCount` express how many times a property must appear

Example class and property rules for a hypothetical scholarly profile:

```json
{
  "@id": "#class_ScholarlyArticle",
  "@type": "rdfs:Class",
  "prov:specializationOf": {"@id": "https://schema.org/ScholarlyArticle"},
  "rdfs:label": "ScholarlyArticle",
  "rdfs:comment": "A scholarly article in this profile's context.",
  "sh:minCount": 1,
  "sh:maxCount": 1
},
{
  "@id": "#prop_author_ScholarlyArticle",
  "@type": "rdf:Property",
  "prov:specializationOf": {"@id": "https://schema.org/author"},
  "rdfs:label": "author",
  "rdfs:comment": "The author(s) of this scholarly article.",
  "domainIncludes": {"@id": "#class_ScholarlyArticle"},
  "rangeIncludes": {"@id": "#class_Person"},
  "sh:minCount": 1
}
```

**Important**: use `domainIncludes` (not `schema:domainIncludes`) — the validator resolves property names through the RO-Crate JSON-LD context, where the `schema:` prefix is not defined by default.

### Linking the Metadata Descriptor

Every MASP profile must define how to find the root class rule which describes the RO-Crate [Root Data Entity](https://www.researchobject.org/ro-crate/specification/1.2/terminology.html). This is done via a special property rule whose `rdfs:label` is `"@id"` and whose `value` is `"ro-crate-metadata.json"`. The validator detects this pattern to identify which class rule is the Metadata Descriptor — and from there, follows `about` to find the Root Data Entity class:
 
```json
{
  "@id": "#class_MetadataDescriptor",
  "@type": "rdfs:Class",
  "prov:specializationOf": {"@id": "http://schema.org/CreativeWork"},
  "sh:minCount": 1,
  "sh:maxCount": 1
},
{
  "@id": "#prop_id_MetadataDescriptor",
  "@type": "rdf:Property",
  "rdfs:label": "@id",
  "value": "ro-crate-metadata.json",
  "domainIncludes": {"@id": "#class_MetadataDescriptor"},
  "sh:minCount": 1,
  "sh:maxCount": 1
},
{
  "@id": "#prop_about_MetadataDescriptor",
  "@type": "rdf:Property",
  "prov:specializationOf": {"@id": "http://schema.org/about"},
  "rdfs:label": "about",
  "domainIncludes": {"@id": "#class_MetadataDescriptor"},
  "rangeIncludes": {"@id": "#class_RootDataEntity"},
  "sh:minCount": 1,
  "sh:maxCount": 1
}
```

The validator uses the `#prop_id_MetadataDescriptor` pattern (`rdfs:label: "@id"` + `value: "ro-crate-metadata.json"`) to locate the root class rule at parse time.

### How the Validator Finds Schema Rules

The validator locates schema rules by inspecting the profile's `hasResource` array for a `ResourceDescriptor` entity with `hasRole` pointing to `http://www.w3.org/ns/dx/prof/role/schema`. The `hasPart` array of that descriptor lists all the schema entities (`rdfs:Class`, `rdf:Property`, `ItemList`, `DefinedTermSet`):

```json
{
  "@id": "#hasSpecializedSchema",
  "@type": "ResourceDescriptor",
  "hasRole": {"@id": "http://www.w3.org/ns/dx/prof/role/schema"},
  "hasPart": [
    {"@id": "#class_MetadataDescriptor"},
    {"@id": "#prop_id_MetadataDescriptor"},
    {"@id": "#prop_about_MetadataDescriptor"},
    ...
  ]
}
```

Only entities listed here are treated as validation rules. Other entities in the crate (documentation files, authors, etc.) are ignored by the validator.

## Validation Algorithm

The validator (`soss-validator.js`) works as follows:

1. **Find the schema ResourceDescriptor** — locate the `ResourceDescriptor` with `role/schema` in `hasResource` and read its `hasPart` list.

2. **Parse rules** — for each entity in `hasPart`:
   - `rdfs:Class` → `ClassRule` (type matching + cardinality)
   - `rdf:Property` → `PropertyRule` (presence, cardinality, range, fixed value)
   - `ItemList` → `ItemListRule` (enumerated allowed values)
   - `DefinedTermSet` → `TermRule` (term documentation; currently pass-through)

3. **Detect root class rule** — the property rule with `rdfs:label: "@id"` and `value: "ro-crate-metadata.json"` identifies the Metadata Descriptor class rule. This sets the starting point for validation.

4. **Validate the target crate** — for each class rule, iterate all entities in the target crate:
   - Resolve the entity's `@type` values through the target crate's JSON-LD context
   - Compare against the class rule's `prov:specializationOf` resolved types
   - If the types match, validate all property rules linked to that class via `domainIncludes`
   - Count valid instances and check against `sh:minCount`/`sh:maxCount`

5. **Property rule validation** — for each matching entity:
   - If the property has a `value` constraint, check for exact match
   - Otherwise check cardinality (`sh:minCount`, `sh:maxCount`)
   - If `rangeIncludes` is set, validate each value: primitive types (Text, Number, Boolean, Date) are checked by JS type; entity references are looked up in the crate and validated recursively against the referenced class rule; `ItemList` values are checked against the list's `itemListElement` entries

6. **Results** — the validator returns `{ error, success, rules }` where `rules` contains per-entity property success/error details keyed by rule ID and entity ID.

### Cardinality on Classes vs Properties

`sh:minCount`/`sh:maxCount` mean different things depending on where they appear:

| Location | Meaning |
|----------|---------|
| On an `rdfs:Class` entity | How many instances of this type must exist in the whole crate |
| On an `rdf:Property` entity | How many values this property must/may have on each matching entity |

### Fixed-Value Properties

A property rule with a `value` field asserts that the property must have exactly that value. This is most commonly used for the metadata descriptor's `@id`, which must always be `"ro-crate-metadata.json"`. It is also used for entities like fixed dataset directory identifiers (e.g. `"@id": "examples/"`).

### ItemList Validation

When a property's `rangeIncludes` references an `ItemList` entity, the value must match one of the `itemListElement` entries by `@id`. Item elements can include additional properties that must also match, allowing for constrained contextual entity definitions within a profile.

## Types of entities (specializations of Classes) and expected Properties


### <a id="class_MetadataDescriptor"></a> Class: RO-Crate Metadata Descriptor <small style="color:#aaa;font-weight:normal">#class_MetadataDescriptor</small>

The ro-crate-metadata.json file entity that describes the profile crate.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [CreativeWork](http://schema.org/CreativeWork) |
| <a href="#prop_id_MetadataDescriptor">@id</a> <small style="color:#aaa;font-weight:normal">#prop_id_MetadataDescriptor</small> | Yes |  | Text | ro-crate-metadata.json |
| <a href="#prop_about_MetadataDescriptor">about <a href="#prop_about_MetadataDescriptor" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_about_MetadataDescriptor</small> | Yes | MUST reference the root profile Dataset entity. | [class_ProfileDataset](#class_ProfileDataset) |  |
| <a href="#prop_conformsTo_MetadataDescriptor">conformsTo <a href="#prop_conformsTo_MetadataDescriptor" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_conformsTo_MetadataDescriptor</small> | Yes | MUST reference the RO-Crate specification the crate conforms to. | [class_CreativeWork](#class_CreativeWork) |  |

### Examples of Type
#### Examples
-  [Example-1: ro-crate-metadata.json](#ro-crate-metadata.json)



### <a id="class_ProfileDataset"></a> Class: Profile Dataset <small style="color:#aaa;font-weight:normal">#class_ProfileDataset</small>

The root entity of a MASP profile crate. Must have @type [Dataset, Profile].

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [Dataset](http://schema.org/Dataset), [Profile](http://www.w3.org/ns/dx/prof/Profile) |
| <a href="#prop_hasResource_ProfileDataset">hasResource <a href="#prop_hasResource_ProfileDataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_hasResource_ProfileDataset</small> | Yes | Links to ResourceDescriptor entities that describe the profile's resources. MUST include at least one descriptor with role/specification. | [class_ResourceDescriptor](#class_ResourceDescriptor) |  |
| <a href="#prop_isProfileOf_ProfileDataset">isProfileOf <a href="#prop_isProfileOf_ProfileDataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_isProfileOf_ProfileDataset</small> | Yes | MUST reference the base RO-Crate specification this profile extends. | [class_CreativeWork](#class_CreativeWork) |  |
| <a href="#prop_license_ProfileDataset">license <a href="#prop_license_ProfileDataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_license_ProfileDataset</small> | Yes | License for this profile. | [class_CreativeWork](#class_CreativeWork), Text |  |
| <a href="#prop_name_ProfileDataset">name <a href="#prop_name_ProfileDataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_name_ProfileDataset</small> | Yes | A human-readable name for the profile. | Text |  |
| <a href="#prop_author_ProfileDataset">author <a href="#prop_author_ProfileDataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_author_ProfileDataset</small> | No | The person or organization responsible for creating this profile. | [class_Person](#class_Person), [class_Organization](#class_Organization) |  |
| <a href="#prop_description_ProfileDataset">description <a href="#prop_description_ProfileDataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_description_ProfileDataset</small> | No | A description of the profile and its intended use. | Text |  |
| <a href="#prop_hasPart_ProfileDataset">hasPart <a href="#prop_hasPart_ProfileDataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_hasPart_ProfileDataset</small> | No | Files that are part of this profile crate. | [class_File](#class_File) |  |
| <a href="#prop_version_ProfileDataset">version <a href="#prop_version_ProfileDataset" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_version_ProfileDataset</small> | No | The version of this profile using semantic versioning (MAJOR.MINOR.PATCH). | Text |  |

### Examples of Type
#### Examples
-  [Example-1: https://language-research-technology.github.io/ro-crate-masp/profiles/ro-crate-masp/profile-crate/](#https%3A%2F%2Flanguage-research-technology.github.io%2Fro-crate-masp%2Fprofiles%2Fro-crate-masp%2Fprofile-crate%2F)



### <a id="class_ResourceDescriptor"></a> Class: ResourceDescriptor <small style="color:#aaa;font-weight:normal">#class_ResourceDescriptor</small>

Describes a resource that is part of a profile, using the W3C Profiles Vocabulary.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [ResourceDescriptor](http://www.w3.org/ns/dx/prof/ResourceDescriptor) |
| <a href="#prop_hasRole_ResourceDescriptor">hasRole <a href="#prop_hasRole_ResourceDescriptor" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_hasRole_ResourceDescriptor</small> | Yes | The role of this resource within the profile (e.g. role/specification, role/schema, role/guidance). Value is a URI from the W3C PROF vocabulary. |  |  |
| <a href="#prop_hasArtifact_ResourceDescriptor">hasArtifact <a href="#prop_hasArtifact_ResourceDescriptor" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_hasArtifact_ResourceDescriptor</small> | No | The artifact for this resource descriptor — a File, LearningResource, or other entity. Range validation intentionally omitted as artifacts can be any type. |  |  |
| <a href="#prop_hasPart_ResourceDescriptor">hasPart <a href="#prop_hasPart_ResourceDescriptor" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_hasPart_ResourceDescriptor</small> | No | For schema ResourceDescriptors: the individual schema entities (classes, properties, item lists) that make up the schema. |  |  |

### Examples of Type
#### Examples
-  [Example-1: #hasSpecializedSchema](#hasSpecializedSchema)



### <a id="class_rdfsClass"></a> Class: rdfs:Class <small style="color:#aaa;font-weight:normal">#class_rdfsClass</small>

A class definition in a MASP schema. Defines a type of entity and its cardinality constraints.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [Class](http://www.w3.org/2000/01/rdf-schema#Class) |
| <a href="#prop_specializationOf_rdfsClass">prov:specializationOf <a href="#prop_specializationOf_rdfsClass" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_specializationOf_rdfsClass</small> | No | The base schema.org (or other vocabulary) type this class specializes. Value is a URI reference; range validation is intentionally omitted as these are external vocab URIs. |  |  |
| <a href="#prop_label_rdfsClass">rdfs:label <a href="#prop_label_rdfsClass" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_label_rdfsClass</small> | No | An optional rdfs:label for the class. In practice, class entities typically use 'name' as their human-readable label. | Text |  |
| <a href="#prop_maxCount_rdfsClass">sh:maxCount <a href="#prop_maxCount_rdfsClass" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_maxCount_rdfsClass</small> | No | Maximum number of instances of this class allowed in a conforming crate. | Integer |  |
| <a href="#prop_minCount_rdfsClass">sh:minCount <a href="#prop_minCount_rdfsClass" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_minCount_rdfsClass</small> | No | Minimum number of instances of this class that MUST appear in a conforming crate. | Integer |  |

### Examples of Type
#### Examples
-  [Example-1: #class_ProfileDataset](#class_ProfileDataset)

-  [Example-1: #class_MetadataDescriptor](#class_MetadataDescriptor)



### <a id="class_rdfProperty"></a> Class: rdf:Property <small style="color:#aaa;font-weight:normal">#class_rdfProperty</small>

A property definition in a MASP schema. Defines a property, its domain class, range, and cardinality constraints.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [Property](http://www.w3.org/1999/02/22-rdf-syntax-ns#Property) |
| <a href="#prop_domainIncludes_rdfProperty">domainIncludes <a href="#prop_domainIncludes_rdfProperty" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_domainIncludes_rdfProperty</small> | Yes | The class(es) that this property applies to. | [class_rdfsClass](#class_rdfsClass) |  |
| <a href="#prop_label_rdfProperty">rdfs:label <a href="#prop_label_rdfProperty" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_label_rdfProperty</small> | Yes | A human-readable label for the property, usually matching the property name. | Text |  |
| <a href="#prop_specializationOf_rdfProperty">prov:specializationOf <a href="#prop_specializationOf_rdfProperty" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_specializationOf_rdfProperty</small> | No | The base vocabulary property this property specializes. Value is an external URI reference; range validation intentionally omitted. |  |  |
| <a href="#prop_rangeIncludes_rdfProperty">rangeIncludes <a href="#prop_rangeIncludes_rdfProperty" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_rangeIncludes_rdfProperty</small> | No | The expected value type(s) for this property. Range validation is intentionally omitted because these reference external schema types (Text, URL, Integer, etc.) that are not entities in the crate. |  |  |
| <a href="#prop_maxCount_rdfProperty">sh:maxCount <a href="#prop_maxCount_rdfProperty" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_maxCount_rdfProperty</small> | No | Maximum number of times this property MAY appear on entities of the domain class. | Integer |  |
| <a href="#prop_minCount_rdfProperty">sh:minCount <a href="#prop_minCount_rdfProperty" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_minCount_rdfProperty</small> | No | Minimum number of times this property MUST appear on entities of the domain class. | Integer |  |
| <a href="#prop_value_rdfProperty">value <a href="#prop_value_rdfProperty" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_value_rdfProperty</small> | No | A fixed value that this property MUST have on conforming entities. | Text |  |

### Examples of Type
#### Examples
-  [Example-1: #prop_name_ProfileDataset](#prop_name_ProfileDataset)

-  [Example-1: #prop_isProfileOf_ProfileDataset](#prop_isProfileOf_ProfileDataset)

-  [Example-1: #prop_id_MetadataDescriptor](#prop_id_MetadataDescriptor)



### <a id="class_ItemList"></a> Class: ItemList <small style="color:#aaa;font-weight:normal">#class_ItemList</small>

A list of allowed values for a property. When a property's rangeIncludes is an ItemList, values MUST be drawn from the list.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [ItemList](http://schema.org/ItemList) |
| <a href="#prop_itemListElement_ItemList">itemListElement <a href="#prop_itemListElement_ItemList" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_itemListElement_ItemList</small> | Yes | The items in this list. Each item is an entity whose @id is an allowed value. |  |  |


### <a id="class_DefinedTermSet"></a> Class: DefinedTermSet <small style="color:#aaa;font-weight:normal">#class_DefinedTermSet</small>

A set of defined vocabulary terms.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [DefinedTermSet](http://schema.org/DefinedTermSet) |
| <a href="#prop_name_DefinedTermSet">name <a href="#prop_name_DefinedTermSet" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_name_DefinedTermSet</small> | Yes | The name of this term set. | Text |  |


### <a id="class_DefinedTerm"></a> Class: DefinedTerm <small style="color:#aaa;font-weight:normal">#class_DefinedTerm</small>

A single vocabulary term within a DefinedTermSet.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [DefinedTerm](http://schema.org/DefinedTerm) |
| <a href="#prop_name_DefinedTerm">name <a href="#prop_name_DefinedTerm" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_name_DefinedTerm</small> | Yes | The name of this term. | Text |  |
| <a href="#prop_inDefinedTermSet_DefinedTerm">inDefinedTermSet <a href="#prop_inDefinedTermSet_DefinedTerm" target="_blank" rel="noopener">ⓘ</a></a> <small style="color:#aaa;font-weight:normal">#prop_inDefinedTermSet_DefinedTerm</small> | No | The DefinedTermSet this term belongs to. | [class_DefinedTermSet](#class_DefinedTermSet) |  |


### <a id="class_Person"></a> Class: Person <small style="color:#aaa;font-weight:normal">#class_Person</small>

A person, used as an author or contributor.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [Person](http://schema.org/Person) |
*No properties defined for this class*



### <a id="class_Organization"></a> Class: Organization <small style="color:#aaa;font-weight:normal">#class_Organization</small>

An organization, used as an author, publisher, or contributor.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [Organization](http://schema.org/Organization) |
*No properties defined for this class*



### <a id="class_File"></a> Class: File <small style="color:#aaa;font-weight:normal">#class_File</small>

A file that is part of a profile crate.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [MediaObject](http://schema.org/MediaObject) |
*No properties defined for this class*



### <a id="class_CreativeWork"></a> Class: CreativeWork <small style="color:#aaa;font-weight:normal">#class_CreativeWork</small>

A creative work, used for licenses and specification references.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [CreativeWork](http://schema.org/CreativeWork) |
*No properties defined for this class*


### Examples of Type
#### Examples
-  [Example-1: ro-crate-metadata.json](#ro-crate-metadata.json)



### <a id="class_ResourceRole"></a> Class: ResourceRole <small style="color:#aaa;font-weight:normal">#class_ResourceRole</small>

A role URI from the W3C Profiles Vocabulary (http://www.w3.org/ns/dx/prof/role/).

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  | [ResourceRole](http://www.w3.org/ns/dx/prof/ResourceRole) |
*No properties defined for this class*


## All Properties

### <a id="prop_id_MetadataDescriptor"></a> Property: @id <small style="color:#aaa;font-weight:normal">#prop_id_MetadataDescriptor</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
|  | Text | [class_MetadataDescriptor](#class_MetadataDescriptor) |
### <a id="prop_about_MetadataDescriptor"></a> Property: about <a href="http://schema.org/about" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_about_MetadataDescriptor</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| MUST reference the root profile Dataset entity. | [class_ProfileDataset](#class_ProfileDataset) | [class_MetadataDescriptor](#class_MetadataDescriptor) |
### <a id="prop_author_ProfileDataset"></a> Property: author <a href="http://schema.org/author" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_author_ProfileDataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The person or organization responsible for creating this profile. | [class_Person](#class_Person), [class_Organization](#class_Organization) | [class_ProfileDataset](#class_ProfileDataset) |
### <a id="prop_conformsTo_MetadataDescriptor"></a> Property: conformsTo <a href="http://schema.org/conformsTo" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_conformsTo_MetadataDescriptor</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| MUST reference the RO-Crate specification the crate conforms to. | [class_CreativeWork](#class_CreativeWork) | [class_MetadataDescriptor](#class_MetadataDescriptor) |
### <a id="prop_description_ProfileDataset"></a> Property: description <a href="http://schema.org/description" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_description_ProfileDataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A description of the profile and its intended use. | Text | [class_ProfileDataset](#class_ProfileDataset) |
### <a id="prop_domainIncludes_rdfProperty"></a> Property: domainIncludes <a href="http://schema.org/domainIncludes" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_domainIncludes_rdfProperty</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The class(es) that this property applies to. | [class_rdfsClass](#class_rdfsClass) | [class_rdfProperty](#class_rdfProperty) |
### <a id="prop_hasArtifact_ResourceDescriptor"></a> Property: hasArtifact <a href="http://www.w3.org/ns/dx/prof/hasArtifact" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_hasArtifact_ResourceDescriptor</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The artifact for this resource descriptor — a File, LearningResource, or other entity. Range validation intentionally omitted as artifacts can be any type. |  | [class_ResourceDescriptor](#class_ResourceDescriptor) |
### <a id="prop_hasPart_ProfileDataset"></a> Property: hasPart <a href="http://schema.org/hasPart" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_hasPart_ProfileDataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Files that are part of this profile crate. | [class_File](#class_File) | [class_ProfileDataset](#class_ProfileDataset) |
### <a id="prop_hasPart_ResourceDescriptor"></a> Property: hasPart <a href="http://schema.org/hasPart" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_hasPart_ResourceDescriptor</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| For schema ResourceDescriptors: the individual schema entities (classes, properties, item lists) that make up the schema. |  | [class_ResourceDescriptor](#class_ResourceDescriptor) |
### <a id="prop_hasResource_ProfileDataset"></a> Property: hasResource <a href="http://www.w3.org/ns/dx/prof/hasResource" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_hasResource_ProfileDataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Links to ResourceDescriptor entities that describe the profile's resources. MUST include at least one descriptor with role/specification. | [class_ResourceDescriptor](#class_ResourceDescriptor) | [class_ProfileDataset](#class_ProfileDataset) |
### <a id="prop_hasRole_ResourceDescriptor"></a> Property: hasRole <a href="http://www.w3.org/ns/dx/prof/hasRole" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_hasRole_ResourceDescriptor</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The role of this resource within the profile (e.g. role/specification, role/schema, role/guidance). Value is a URI from the W3C PROF vocabulary. |  | [class_ResourceDescriptor](#class_ResourceDescriptor) |
### <a id="prop_inDefinedTermSet_DefinedTerm"></a> Property: inDefinedTermSet <a href="http://schema.org/inDefinedTermSet" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_inDefinedTermSet_DefinedTerm</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The DefinedTermSet this term belongs to. | [class_DefinedTermSet](#class_DefinedTermSet) | [class_DefinedTerm](#class_DefinedTerm) |
### <a id="prop_isProfileOf_ProfileDataset"></a> Property: isProfileOf <a href="http://schema.org/isProfileOf" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_isProfileOf_ProfileDataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| MUST reference the base RO-Crate specification this profile extends. | [class_CreativeWork](#class_CreativeWork) | [class_ProfileDataset](#class_ProfileDataset) |
### <a id="prop_itemListElement_ItemList"></a> Property: itemListElement <a href="http://schema.org/itemListElement" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_itemListElement_ItemList</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The items in this list. Each item is an entity whose @id is an allowed value. |  | [class_ItemList](#class_ItemList) |
### <a id="prop_license_ProfileDataset"></a> Property: license <a href="http://schema.org/license" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_license_ProfileDataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| License for this profile. | [class_CreativeWork](#class_CreativeWork), Text | [class_ProfileDataset](#class_ProfileDataset) |
### <a id="prop_name_ProfileDataset"></a> Property: name <a href="http://schema.org/name" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_name_ProfileDataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A human-readable name for the profile. | Text | [class_ProfileDataset](#class_ProfileDataset) |
### <a id="prop_name_DefinedTermSet"></a> Property: name <a href="http://schema.org/name" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_name_DefinedTermSet</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The name of this term set. | Text | [class_DefinedTermSet](#class_DefinedTermSet) |
### <a id="prop_name_DefinedTerm"></a> Property: name <a href="http://schema.org/name" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_name_DefinedTerm</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The name of this term. | Text | [class_DefinedTerm](#class_DefinedTerm) |
### <a id="prop_specializationOf_rdfsClass"></a> Property: prov:specializationOf <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_specializationOf_rdfsClass</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The base schema.org (or other vocabulary) type this class specializes. Value is a URI reference; range validation is intentionally omitted as these are external vocab URIs. |  | [class_rdfsClass](#class_rdfsClass) |
### <a id="prop_specializationOf_rdfProperty"></a> Property: prov:specializationOf <a href="http://www.w3.org/ns/prov#specializationOf" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_specializationOf_rdfProperty</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The base vocabulary property this property specializes. Value is an external URI reference; range validation intentionally omitted. |  | [class_rdfProperty](#class_rdfProperty) |
### <a id="prop_rangeIncludes_rdfProperty"></a> Property: rangeIncludes <a href="http://schema.org/rangeIncludes" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_rangeIncludes_rdfProperty</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The expected value type(s) for this property. Range validation is intentionally omitted because these reference external schema types (Text, URL, Integer, etc.) that are not entities in the crate. |  | [class_rdfProperty](#class_rdfProperty) |
### <a id="prop_label_rdfsClass"></a> Property: rdfs:label <a href="http://www.w3.org/2000/01/rdf-schema#label" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_label_rdfsClass</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| An optional rdfs:label for the class. In practice, class entities typically use 'name' as their human-readable label. | Text | [class_rdfsClass](#class_rdfsClass) |
### <a id="prop_label_rdfProperty"></a> Property: rdfs:label <a href="http://www.w3.org/2000/01/rdf-schema#label" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_label_rdfProperty</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A human-readable label for the property, usually matching the property name. | Text | [class_rdfProperty](#class_rdfProperty) |
### <a id="prop_maxCount_rdfsClass"></a> Property: sh:maxCount <a href="http://www.w3.org/ns/shacl#maxCount" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_maxCount_rdfsClass</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Maximum number of instances of this class allowed in a conforming crate. | Integer | [class_rdfsClass](#class_rdfsClass) |
### <a id="prop_maxCount_rdfProperty"></a> Property: sh:maxCount <a href="http://www.w3.org/ns/shacl#maxCount" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_maxCount_rdfProperty</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Maximum number of times this property MAY appear on entities of the domain class. | Integer | [class_rdfProperty](#class_rdfProperty) |
### <a id="prop_minCount_rdfsClass"></a> Property: sh:minCount <a href="http://www.w3.org/ns/shacl#minCount" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_minCount_rdfsClass</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Minimum number of instances of this class that MUST appear in a conforming crate. | Integer | [class_rdfsClass](#class_rdfsClass) |
### <a id="prop_minCount_rdfProperty"></a> Property: sh:minCount <a href="http://www.w3.org/ns/shacl#minCount" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_minCount_rdfProperty</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Minimum number of times this property MUST appear on entities of the domain class. | Integer | [class_rdfProperty](#class_rdfProperty) |
### <a id="prop_value_rdfProperty"></a> Property: value <a href="http://schema.org/value" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_value_rdfProperty</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A fixed value that this property MUST have on conforming entities. | Text | [class_rdfProperty](#class_rdfProperty) |
### <a id="prop_version_ProfileDataset"></a> Property: version <a href="http://schema.org/version" target="_blank" rel="noopener">ⓘ</a> <small style="color:#aaa;font-weight:normal">#prop_version_ProfileDataset</small>

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The version of this profile using semantic versioning (MAJOR.MINOR.PATCH). | Text | [class_ProfileDataset](#class_ProfileDataset) |


## Item Lists



## Examples

<a id="hasExampleMASPProfile"></a>

## Example-1: Example: A minimal MASP profile crate


### <a id="MASPProfileExample"></a> Artifact: A minimal MASP profile crate

<pre>
 {
  "@id": "#MASPProfileExample",
  "@type": "LearningResource",
  "name": "A minimal MASP profile crate",
  "description": "Key entities from this profile crate, showing what a valid MASP profile crate looks like. This profile is self-describing so its own entities serve as the canonical example.",
  "hasPart": [
    {
      "@id": "ro-crate-metadata.json"
    },
    {
      "@id": "https://language-research-technology.github.io/ro-crate-masp/profiles/ro-crate-masp/profile-crate/"
    },
    {
      "@id": "#hasSpecializedSchema"
    },
    {
      "@id": "#class_ProfileDataset"
    },
    {
      "@id": "#prop_name_ProfileDataset"
    },
    {
      "@id": "#prop_isProfileOf_ProfileDataset"
    },
    {
      "@id": "#class_MetadataDescriptor"
    },
    {
      "@id": "#prop_id_MetadataDescriptor"
    }
  ]
}
</pre>


#### <a id="ro-crate-metadata.json"></a>Example-1: ro-crate-metadata.json

<pre>
 {
  "@id": "ro-crate-metadata.json",
  "@type": "CreativeWork",
  "identifier": "ro-crate-metadata.json",
  "conformsTo": {
    "@id": "https://w3id.org/ro/crate/1.2"
  },
  "about": {
    "@id": "https://language-research-technology.github.io/ro-crate-masp/profiles/ro-crate-masp/profile-crate/"
  }
}
</pre>


#### <a id="https%3A%2F%2Flanguage-research-technology.github.io%2Fro-crate-masp%2Fprofiles%2Fro-crate-masp%2Fprofile-crate%2F"></a>Example-1: https://language-research-technology.github.io/ro-crate-masp/profiles/ro-crate-masp/profile-crate/

<pre>
 {
  "@id": "https://language-research-technology.github.io/ro-crate-masp/profiles/ro-crate-masp/profile-crate/",
  "@type": [
    "Dataset",
    "Profile"
  ],
  "name": "RO-Crate MASP Profile",
  "description": "Profile for RO-Crate Machine Actionable Profiles and Schemas (MASP). Defines what a valid MASP profile crate must contain.",
  "version": "0.1.0",
  "isProfileOf": [
    {
      "@id": "https://w3id.org/ro/crate/1.2"
    }
  ],
  "author": {
    "@id": "#author"
  },
  "license": "Apache-2.0",
  "hasResource": [
    {
      "@id": "#hasSpecializedSchema"
    },
    {
      "@id": "#hasSpecification"
    },
    {
      "@id": "#hasGuidance"
    },
    {
      "@id": "#hasExampleMASPProfile"
    },
    {
      "@id": "#hasEditorMode"
    }
  ],
  "hasPart": [
    {
      "@id": "index.html"
    },
    {
      "@id": "profile-documentation.md"
    }
  ],
  "datePublished": [
    "2026-05-08"
  ],
  "conformsTo": [
    {
      "@id": "https://language-research-technology.github.io/ro-crate-masp/profiles/ro-crate-masp/profile-crate/"
    }
  ]
}
</pre>


#### <a id="hasSpecializedSchema"></a>Example-1: #hasSpecializedSchema

<pre>
 {
  "@id": "#hasSpecializedSchema",
  "@type": "ResourceDescriptor",
  "name": "Specialized Schema Terms",
  "hasRole": {
    "@id": "http://www.w3.org/ns/dx/prof/role/schema"
  },
  "hasPart": [
    {
      "@id": "#class_MetadataDescriptor"
    },
    {
      "@id": "#class_ProfileDataset"
    },
    {
      "@id": "#class_ResourceDescriptor"
    },
    {
      "@id": "#class_rdfsClass"
    },
    {
      "@id": "#class_rdfProperty"
    },
    {
      "@id": "#class_ItemList"
    },
    {
      "@id": "#class_DefinedTermSet"
    },
    {
      "@id": "#class_DefinedTerm"
    },
    {
      "@id": "#class_Person"
    },
    {
      "@id": "#class_Organization"
    },
    {
      "@id": "#class_File"
    },
    {
      "@id": "#class_CreativeWork"
    },
    {
      "@id": "#prop_id_MetadataDescriptor"
    },
    {
      "@id": "#prop_conformsTo_MetadataDescriptor"
    },
    {
      "@id": "#prop_about_MetadataDescriptor"
    },
    {
      "@id": "#prop_name_ProfileDataset"
    },
    {
      "@id": "#prop_description_ProfileDataset"
    },
    {
      "@id": "#prop_version_ProfileDataset"
    },
    {
      "@id": "#prop_isProfileOf_ProfileDataset"
    },
    {
      "@id": "#prop_author_ProfileDataset"
    },
    {
      "@id": "#prop_license_ProfileDataset"
    },
    {
      "@id": "#prop_hasResource_ProfileDataset"
    },
    {
      "@id": "#prop_hasPart_ProfileDataset"
    },
    {
      "@id": "#prop_hasRole_ResourceDescriptor"
    },
    {
      "@id": "#prop_hasArtifact_ResourceDescriptor"
    },
    {
      "@id": "#prop_hasPart_ResourceDescriptor"
    },
    {
      "@id": "#prop_label_rdfsClass"
    },
    {
      "@id": "#prop_specializationOf_rdfsClass"
    },
    {
      "@id": "#prop_minCount_rdfsClass"
    },
    {
      "@id": "#prop_maxCount_rdfsClass"
    },
    {
      "@id": "#prop_label_rdfProperty"
    },
    {
      "@id": "#prop_domainIncludes_rdfProperty"
    },
    {
      "@id": "#prop_rangeIncludes_rdfProperty"
    },
    {
      "@id": "#prop_specializationOf_rdfProperty"
    },
    {
      "@id": "#prop_minCount_rdfProperty"
    },
    {
      "@id": "#prop_maxCount_rdfProperty"
    },
    {
      "@id": "#prop_value_rdfProperty"
    },
    {
      "@id": "#prop_itemListElement_ItemList"
    },
    {
      "@id": "#prop_name_DefinedTermSet"
    },
    {
      "@id": "#prop_name_DefinedTerm"
    },
    {
      "@id": "#prop_inDefinedTermSet_DefinedTerm"
    },
    {
      "@id": "#class_ResourceRole"
    }
  ]
}
</pre>


#### <a id="class_ProfileDataset"></a>Example-1: #class_ProfileDataset

<pre>
 {
  "@id": "#class_ProfileDataset",
  "@type": "rdfs:Class",
  "name": "Profile Dataset",
  "description": "The root entity of a MASP profile crate. Must have @type [Dataset, Profile].",
  "prov:specializationOf": [
    {
      "@id": "http://schema.org/Dataset"
    },
    {
      "@id": "http://www.w3.org/ns/dx/prof/Profile"
    }
  ],
  "sh:minCount": 1,
  "sh:maxCount": 1
}
</pre>


#### <a id="prop_name_ProfileDataset"></a>Example-1: #prop_name_ProfileDataset

<pre>
 {
  "@id": "#prop_name_ProfileDataset",
  "@type": "rdf:Property",
  "name": "name",
  "rdfs:label": "name",
  "description": "A human-readable name for the profile.",
  "prov:specializationOf": {
    "@id": "http://schema.org/name"
  },
  "domainIncludes": {
    "@id": "#class_ProfileDataset"
  },
  "rangeIncludes": {
    "@id": "Text"
  },
  "sh:minCount": 1,
  "sh:maxCount": 1
}
</pre>


#### <a id="prop_isProfileOf_ProfileDataset"></a>Example-1: #prop_isProfileOf_ProfileDataset

<pre>
 {
  "@id": "#prop_isProfileOf_ProfileDataset",
  "@type": "rdf:Property",
  "name": "isProfileOf",
  "rdfs:label": "isProfileOf",
  "description": "MUST reference the base RO-Crate specification this profile extends.",
  "prov:specializationOf": {
    "@id": "http://schema.org/isProfileOf"
  },
  "domainIncludes": {
    "@id": "#class_ProfileDataset"
  },
  "rangeIncludes": {
    "@id": "#class_CreativeWork"
  },
  "sh:minCount": 1
}
</pre>


#### <a id="class_MetadataDescriptor"></a>Example-1: #class_MetadataDescriptor

<pre>
 {
  "@id": "#class_MetadataDescriptor",
  "@type": "rdfs:Class",
  "name": "RO-Crate Metadata Descriptor",
  "description": "The ro-crate-metadata.json file entity that describes the profile crate.",
  "prov:specializationOf": {
    "@id": "http://schema.org/CreativeWork"
  },
  "sh:minCount": 1,
  "sh:maxCount": 1
}
</pre>


#### <a id="prop_id_MetadataDescriptor"></a>Example-1: #prop_id_MetadataDescriptor

<pre>
 {
  "@id": "#prop_id_MetadataDescriptor",
  "@type": "rdf:Property",
  "name": "@id",
  "rdfs:label": "@id",
  "value": "ro-crate-metadata.json",
  "domainIncludes": {
    "@id": "#class_MetadataDescriptor"
  },
  "rangeIncludes": {
    "@id": "Text"
  },
  "sh:minCount": 1,
  "sh:maxCount": 1
}
</pre>


