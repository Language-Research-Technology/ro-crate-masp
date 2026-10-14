---
title: LDAC-DMLex Profile (DRAFT)
---

# LDAC-DMLex Profile (DRAFT)

> **DRAFT.** This is a draft Language Data Commons (LDAC) adaptation of [DMLex](https://docs.oasis-open.org/lexidma/dmlex/v1.0/dmlex-v1.0.html), the OASIS Data Model for Lexicography. It is a first, machine-generated version and will be refined.

## Overview

This profile describes a dictionary (in DMLex terms, a *lexicographic resource*) as an RO-Crate, using the DMLex RDF vocabulary (the `dmlex:` terms, `https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#`). The terms themselves are documented in the [DMLex schema](../../../schemas/dmlex/schema-crate/index.html) converted from DMLex's RDF vocabulary.

A crate that conforms to this profile:

- has at least one `dmlex:LexicographicResource`. The crate's root `Dataset` can be that resource itself, by also being typed `dmlex:LexicographicResource`.
- uses the `dmlex:` prefix in its `@context`, and writes properties as `dmlex:headword`, `dmlex:sense` and so on, because the validator matches property names as written.
- gives objects (entries, senses, definitions, examples, labels, …) an `@id` and a `dmlex:` type, where the DMLex RDF serialization often uses untyped blank nodes.

For an example, see [`examples/abandon`](../examples/abandon/ro-crate-metadata.json): the basic entry example (A.1.1) from the DMLex specification, as an RO-Crate.

## How this draft was made

Each DMLex class has a class rule here, and each property that DMLex allows on that class has its own property rule with DMLex's cardinality (e.g. exactly one `dmlex:headword` per `dmlex:Entry`, at most one `dmlex:title` per `dmlex:LexicographicResource`). These were generated from the 101 OWL cardinality restrictions in [`dmlex.ttl`](https://docs.oasis-open.org/lexidma/dmlex/v1.0/os/schemas/RDF/dmlex.ttl), using the DMLex schema in this repository for which properties belong to which class. The only addition so far is that a crate must contain a lexicographic resource.

Things to refine:

- `dmlex.ttl` restricts a property `dmlex:language` on `HeadwordTranslation`, `HeadwordExplanation`, `ExampleTranslation` (at most 1) and `EtymonUnit` (exactly 1), but never defines it; it presumably means `dmlex:langCode`. Those four constraints are not included.
- `dmlex.ttl` makes the four `…Tag` classes subclasses of `HasInflectedForm`, which gives them `dmlex:inflectedForm` here; this looks like a typo for `HasForHeadwords`. `dmlex:forLanguage` has no class at all. See the [DMLex schema](../../../schemas/dmlex/schema-crate/index.html) notes.
- DMLex's *controlled values* (part-of-speech tags, label tags, …) are free text here; an LDAC version might point them at shared value lists.
- Nothing yet says how a dictionary relates to the rest of an LDAC collection (e.g. as an object in an LDAC `RepositoryCollection`).

## All Rules

## Types of entities (specializations of Classes) and expected Properties


### <a id="class_CollocateMarker" title="#class_CollocateMarker"></a> Class: Collocate Marker

Term: `dmlex:CollocateMarker`

Marks up a substring other than the headword inside an example, inside an example translation or inside a definition.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Collocate Marker

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#CollocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#CollocateMarker" target="_blank" rel="noopener">CollocateMarker</a> |
| <a href="#prop_CollocateMarker_endIndex" title="#prop_CollocateMarker_endIndex">dmlex:endIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex</a> | Yes | End Index | schema:Text |  |
| <a href="#prop_CollocateMarker_startIndex" title="#prop_CollocateMarker_startIndex">dmlex:startIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex</a> | Yes | Start Index | schema:Text |  |
| <a href="#prop_CollocateMarker_label" title="#prop_CollocateMarker_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | No | Label | <a href="#class_Label" title="#class_Label">Label</a> |  |
| <a href="#prop_CollocateMarker_lemma" title="#prop_CollocateMarker_lemma">dmlex:lemma</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#lemma" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#lemma</a> | No | Lemma | schema:Text |  |


### <a id="class_Definition" title="#class_Definition"></a> Class: Definition

Term: `dmlex:Definition`

Represents one of possibly several definitions of a sense.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Definition

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Definition" target="_blank" rel="noopener">Definition</a> |
| <a href="#prop_Definition_listingOrder" title="#prop_Definition_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_Definition_text" title="#prop_Definition_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Yes | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_Definition_collocateMarker" title="#prop_Definition_collocateMarker">dmlex:collocateMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker</a> | No | Collocate Marker | <a href="#class_CollocateMarker" title="#class_CollocateMarker">Collocate Marker</a> |  |
| <a href="#prop_Definition_definitionType" title="#prop_Definition_definitionType">dmlex:definitionType</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionType" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionType</a> | No | Definition Type | <a href="#class_DefinitionTypeTag" title="#class_DefinitionTypeTag">Definition Type Tag</a> |  |
| <a href="#prop_Definition_headwordMarker" title="#prop_Definition_headwordMarker">dmlex:headwordMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker</a> | No | Headword Marker | <a href="#class_HeadwordMarker" title="#class_HeadwordMarker">Headword Marker</a> |  |


### <a id="class_DefinitionTypeTag" title="#class_DefinitionTypeTag"></a> Class: Definition Type Tag

Term: `dmlex:DefinitionTypeTag`

Represents one (of many) possible values for definitionType of definition.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Definition Type Tag

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#DefinitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#DefinitionTypeTag" target="_blank" rel="noopener">DefinitionTypeTag</a> |
| <a href="#prop_DefinitionTypeTag_tag" title="#prop_DefinitionTypeTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Yes | Tag |  |  |
| <a href="#prop_DefinitionTypeTag_description" title="#prop_DefinitionTypeTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_DefinitionTypeTag_sameAs" title="#prop_DefinitionTypeTag_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | No | Same As |  |  |


### <a id="class_Entry" title="#class_Entry"></a> Class: Entry

Term: `dmlex:Entry`

Represents a dictionary entry.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Entry

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry" target="_blank" rel="noopener">Entry</a> |
| <a href="#prop_Entry_headword" title="#prop_Entry_headword">dmlex:headword</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headword" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headword</a> | Yes | Headword | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_Entry_etymology" title="#prop_Entry_etymology">dmlex:etymology</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymology" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymology</a> | No | Etymology | <a href="#class_Etymology" title="#class_Etymology">Etymology</a> |  |
| <a href="#prop_Entry_homographNumber" title="#prop_Entry_homographNumber">dmlex:homographNumber</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#homographNumber" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#homographNumber</a> | No | Homograph Number | schema:Integer |  |
| <a href="#prop_Entry_inflectedForm" title="#prop_Entry_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> |  |
| <a href="#prop_Entry_label" title="#prop_Entry_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | No | Label | <a href="#class_Label" title="#class_Label">Label</a> |  |
| <a href="#prop_Entry_partOfSpeech" title="#prop_Entry_partOfSpeech">dmlex:partOfSpeech</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech</a> | No | Part of Speech | <a href="#class_PartOfSpeech" title="#class_PartOfSpeech">Part of Speech</a> |  |
| <a href="#prop_Entry_placeholderMarker" title="#prop_Entry_placeholderMarker">dmlex:placeholderMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker</a> | No | Placeholder Marker | <a href="#class_PlaceholderMarker" title="#class_PlaceholderMarker">Placeholder Marker</a> |  |
| <a href="#prop_Entry_pronunciation" title="#prop_Entry_pronunciation">dmlex:pronunciation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation</a> | No | Pronunciation | <a href="#class_Pronunciation" title="#class_Pronunciation">Pronunciation</a> |  |
| <a href="#prop_Entry_sense" title="#prop_Entry_sense">dmlex:sense</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sense" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sense</a> | No | Sense. A sub-property of evokes. | <a href="#class_Sense" title="#class_Sense">Sense</a> |  |


### <a id="class_Etymology" title="#class_Etymology"></a> Class: Etymology

Term: `dmlex:Etymology`

Represents a chain of historical derivations of a word.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Etymology

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymology" target="_blank" rel="noopener">Etymology</a> |
| <a href="#prop_Etymology_listingOrder" title="#prop_Etymology_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_Etymology_description" title="#prop_Etymology_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_Etymology_etymon" title="#prop_Etymology_etymon">dmlex:etymon</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymon" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymon</a> | No | Etymon | <a href="#class_Etymon" title="#class_Etymon">Etymon</a> |  |


### <a id="class_Etymon" title="#class_Etymon"></a> Class: Etymon

Term: `dmlex:Etymon`

Represents one stage (of possibly several) in the etymological history of the headword.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Etymon

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymon" target="_blank" rel="noopener">Etymon</a> |
| <a href="#prop_Etymon_etymonUnit" title="#prop_Etymon_etymonUnit">dmlex:etymonUnit</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonUnit" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonUnit</a> | Yes | Etymon Unit | <a href="#class_EtymonUnit" title="#class_EtymonUnit">Etymon Unit</a> |  |
| <a href="#prop_Etymon_listingOrder" title="#prop_Etymon_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_Etymon_note" title="#prop_Etymon_note">dmlex:note</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#note" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#note</a> | No | Note | schema:Text |  |
| <a href="#prop_Etymon_translation" title="#prop_Etymon_translation">dmlex:translation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation</a> | No | Translation | schema:Text |  |
| <a href="#prop_Etymon_type" title="#prop_Etymon_type">dmlex:type</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type</a> | No | Type | schema:Text |  |
| <a href="#prop_Etymon_when" title="#prop_Etymon_when">dmlex:when</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#when" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#when</a> | No | When | schema:Text |  |


### <a id="class_EtymonLanguage" title="#class_EtymonLanguage"></a> Class: Etymon Language

Term: `dmlex:EtymonLanguage`

Represents one of several allowed values for the language property of etymonUnit objects.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Etymon Language

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonLanguage" target="_blank" rel="noopener">EtymonLanguage</a> |
| <a href="#prop_EtymonLanguage_langCode" title="#prop_EtymonLanguage_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | Yes | Language. A sub-property of language. | schema:Text |  |
| <a href="#prop_EtymonLanguage_displayName" title="#prop_EtymonLanguage_displayName">dmlex:displayName</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#displayName" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#displayName</a> | No | Display Name | schema:Text |  |
| <a href="#prop_EtymonLanguage_sameAs" title="#prop_EtymonLanguage_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | No | Same As |  |  |


### <a id="class_EtymonType" title="#class_EtymonType"></a> Class: Etymon Type

Term: `dmlex:EtymonType`

Represents one of possible values for the type of etymon.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Etymon Type

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonType" target="_blank" rel="noopener">EtymonType</a> |
| <a href="#prop_EtymonType_type" title="#prop_EtymonType_type">dmlex:type</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type</a> | Yes | Type | schema:Text |  |
| <a href="#prop_EtymonType_description" title="#prop_EtymonType_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_EtymonType_sameAs" title="#prop_EtymonType_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | No | Same As |  |  |


### <a id="class_EtymonUnit" title="#class_EtymonUnit"></a> Class: Etymon Unit

Term: `dmlex:EtymonUnit`

Represents a form (typically a word) which is the etymological origin of the headword, or another etymologically related form.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Etymon Unit

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit" target="_blank" rel="noopener">EtymonUnit</a> |
| <a href="#prop_EtymonUnit_listingOrder" title="#prop_EtymonUnit_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_EtymonUnit_text" title="#prop_EtymonUnit_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Yes | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_EtymonUnit_langCode" title="#prop_EtymonUnit_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | No | Language. A sub-property of language. | schema:Text |  |
| <a href="#prop_EtymonUnit_partOfSpeech" title="#prop_EtymonUnit_partOfSpeech">dmlex:partOfSpeech</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech</a> | No | Part of Speech | <a href="#class_PartOfSpeech" title="#class_PartOfSpeech">Part of Speech</a> |  |
| <a href="#prop_EtymonUnit_reconstructed" title="#prop_EtymonUnit_reconstructed">dmlex:reconstructed</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#reconstructed" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#reconstructed</a> | No | Reconstructed | schema:Boolean |  |
| <a href="#prop_EtymonUnit_translation" title="#prop_EtymonUnit_translation">dmlex:translation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation</a> | No | Translation | schema:Text |  |


### <a id="class_Example" title="#class_Example"></a> Class: Example

Term: `dmlex:Example`

Represents a sentence or other text fragment which illustrates the headword being used.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Example

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example" target="_blank" rel="noopener">Example</a> |
| <a href="#prop_Example_listingOrder" title="#prop_Example_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_Example_text" title="#prop_Example_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Yes | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_Example_collocateMarker" title="#prop_Example_collocateMarker">dmlex:collocateMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker</a> | No | Collocate Marker | <a href="#class_CollocateMarker" title="#class_CollocateMarker">Collocate Marker</a> |  |
| <a href="#prop_Example_exampleTranslation" title="#prop_Example_exampleTranslation">dmlex:exampleTranslation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#exampleTranslation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#exampleTranslation</a> | No | Example Translation | <a href="#class_ExampleTranslation" title="#class_ExampleTranslation">Example Translation</a> |  |
| <a href="#prop_Example_headwordMarker" title="#prop_Example_headwordMarker">dmlex:headwordMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker</a> | No | Headword Marker | <a href="#class_HeadwordMarker" title="#class_HeadwordMarker">Headword Marker</a> |  |
| <a href="#prop_Example_label" title="#prop_Example_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | No | Label | <a href="#class_Label" title="#class_Label">Label</a> |  |
| <a href="#prop_Example_soundFile" title="#prop_Example_soundFile">dmlex:soundFile</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile</a> | No | Sound File | schema:URL |  |
| <a href="#prop_Example_sourceElaboration" title="#prop_Example_sourceElaboration">dmlex:sourceElaboration</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceElaboration" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceElaboration</a> | No | Source Elaboration | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_Example_sourceIdentity" title="#prop_Example_sourceIdentity">dmlex:sourceIdentity</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentity" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentity</a> | No | Source Identity | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="class_ExampleTranslation" title="#class_ExampleTranslation"></a> Class: Example Translation

Term: `dmlex:ExampleTranslation`

Represents the translation of an example.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Example Translation

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation" target="_blank" rel="noopener">ExampleTranslation</a> |
| <a href="#prop_ExampleTranslation_text" title="#prop_ExampleTranslation_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Yes | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_ExampleTranslation_collocateMarker" title="#prop_ExampleTranslation_collocateMarker">dmlex:collocateMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker</a> | No | Collocate Marker | <a href="#class_CollocateMarker" title="#class_CollocateMarker">Collocate Marker</a> |  |
| <a href="#prop_ExampleTranslation_headwordMarker" title="#prop_ExampleTranslation_headwordMarker">dmlex:headwordMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker</a> | No | Headword Marker | <a href="#class_HeadwordMarker" title="#class_HeadwordMarker">Headword Marker</a> |  |
| <a href="#prop_ExampleTranslation_label" title="#prop_ExampleTranslation_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | No | Label | <a href="#class_Label" title="#class_Label">Label</a> |  |
| <a href="#prop_ExampleTranslation_langCode" title="#prop_ExampleTranslation_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | No | Language. A sub-property of language. | schema:Text |  |
| <a href="#prop_ExampleTranslation_listingOrder" title="#prop_ExampleTranslation_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#prop_ExampleTranslation_soundFile" title="#prop_ExampleTranslation_soundFile">dmlex:soundFile</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile</a> | No | Sound File | schema:URL |  |


### <a id="class_HeadwordExplanation" title="#class_HeadwordExplanation"></a> Class: Headword Explanation

Term: `dmlex:HeadwordExplanation`

Represents a statement in the translation language which explains (but does not translate) the meaning of the headword.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Headword Explanation

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordExplanation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordExplanation" target="_blank" rel="noopener">HeadwordExplanation</a> |
| <a href="#prop_HeadwordExplanation_text" title="#prop_HeadwordExplanation_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Yes | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_HeadwordExplanation_langCode" title="#prop_HeadwordExplanation_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | No | Language. A sub-property of language. | schema:Text |  |


### <a id="class_HeadwordMarker" title="#class_HeadwordMarker"></a> Class: Headword Marker

Term: `dmlex:HeadwordMarker`

Marks up a substring inside an example, inside an example translation or inside a definition which corresponds to the headword (or to a translation of the headword).

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Headword Marker

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordMarker" target="_blank" rel="noopener">HeadwordMarker</a> |
| <a href="#prop_HeadwordMarker_endIndex" title="#prop_HeadwordMarker_endIndex">dmlex:endIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex</a> | Yes | End Index | schema:Text |  |
| <a href="#prop_HeadwordMarker_startIndex" title="#prop_HeadwordMarker_startIndex">dmlex:startIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex</a> | Yes | Start Index | schema:Text |  |


### <a id="class_HeadwordTranslation" title="#class_HeadwordTranslation"></a> Class: Headword Translation

Term: `dmlex:HeadwordTranslation`

Represents one of possibly multiple translations of a headword.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Headword Translation

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation" target="_blank" rel="noopener">HeadwordTranslation</a> |
| <a href="#prop_HeadwordTranslation_listingOrder" title="#prop_HeadwordTranslation_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_HeadwordTranslation_text" title="#prop_HeadwordTranslation_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Yes | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_HeadwordTranslation_inflectedForm" title="#prop_HeadwordTranslation_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> |  |
| <a href="#prop_HeadwordTranslation_label" title="#prop_HeadwordTranslation_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | No | Label | <a href="#class_Label" title="#class_Label">Label</a> |  |
| <a href="#prop_HeadwordTranslation_langCode" title="#prop_HeadwordTranslation_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | No | Language. A sub-property of language. | schema:Text |  |
| <a href="#prop_HeadwordTranslation_partOfSpeech" title="#prop_HeadwordTranslation_partOfSpeech">dmlex:partOfSpeech</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech</a> | No | Part of Speech | <a href="#class_PartOfSpeech" title="#class_PartOfSpeech">Part of Speech</a> |  |
| <a href="#prop_HeadwordTranslation_placeholderMarker" title="#prop_HeadwordTranslation_placeholderMarker">dmlex:placeholderMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker</a> | No | Placeholder Marker | <a href="#class_PlaceholderMarker" title="#class_PlaceholderMarker">Placeholder Marker</a> |  |
| <a href="#prop_HeadwordTranslation_pronunciation" title="#prop_HeadwordTranslation_pronunciation">dmlex:pronunciation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation</a> | No | Pronunciation | <a href="#class_Pronunciation" title="#class_Pronunciation">Pronunciation</a> |  |


### <a id="class_InflectedForm" title="#class_InflectedForm"></a> Class: Inflected Form

Term: `dmlex:InflectedForm`

Represents one (of possibly many) inflected forms of the headword.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Inflected Form

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm" target="_blank" rel="noopener">InflectedForm</a> |
| <a href="#prop_InflectedForm_listingOrder" title="#prop_InflectedForm_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_InflectedForm_text" title="#prop_InflectedForm_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Yes | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_InflectedForm_label" title="#prop_InflectedForm_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | No | Label | <a href="#class_Label" title="#class_Label">Label</a> |  |
| <a href="#prop_InflectedForm_pronunciation" title="#prop_InflectedForm_pronunciation">dmlex:pronunciation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation</a> | No | Pronunciation | <a href="#class_Pronunciation" title="#class_Pronunciation">Pronunciation</a> |  |
| <a href="#prop_InflectedForm_tag" title="#prop_InflectedForm_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | No | Tag |  |  |


### <a id="class_InflectedFormTag" title="#class_InflectedFormTag"></a> Class: Inflected Form Tag

Term: `dmlex:InflectedFormTag`

Represents one (of many) possible values for tag of inflectedForm.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Inflected Form Tag

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag" target="_blank" rel="noopener">InflectedFormTag</a> |
| <a href="#prop_InflectedFormTag_tag" title="#prop_InflectedFormTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Yes | Tag |  |  |
| <a href="#prop_InflectedFormTag_description" title="#prop_InflectedFormTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_InflectedFormTag_forHeadwords" title="#prop_InflectedFormTag_forHeadwords">dmlex:forHeadwords</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords</a> | No | For Headwords | schema:Boolean |  |
| <a href="#prop_InflectedFormTag_forPartOfSpeech" title="#prop_InflectedFormTag_forPartOfSpeech">dmlex:forPartOfSpeech</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech</a> | No | For Part of Speech | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_InflectedFormTag_forTranslations" title="#prop_InflectedFormTag_forTranslations">dmlex:forTranslations</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations</a> | No | For Translations | schema:Boolean |  |
| <a href="#prop_InflectedFormTag_inflectedForm" title="#prop_InflectedFormTag_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> |  |
| <a href="#prop_InflectedFormTag_sameAs" title="#prop_InflectedFormTag_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | No | Same As |  |  |


### <a id="class_Label" title="#class_Label"></a> Class: Label

Term: `dmlex:Label`

Represents a restriction on its parent such as temporal (old-fashioned, neologism), regional (dialect), register (formal, colloquial), domain (medicine, politics) or grammar (singular-only).

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Label

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label" target="_blank" rel="noopener">Label</a> |
| <a href="#prop_Label_listingOrder" title="#prop_Label_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_Label_tag" title="#prop_Label_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Yes | Tag |  |  |


### <a id="class_LabelTag" title="#class_LabelTag"></a> Class: Label Tag

Term: `dmlex:LabelTag`

Represents one (of many) possible values for tag of label.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Label Tag

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag" target="_blank" rel="noopener">LabelTag</a> |
| <a href="#prop_LabelTag_tag" title="#prop_LabelTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Yes | Tag |  |  |
| <a href="#prop_LabelTag_description" title="#prop_LabelTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_LabelTag_forCollocates" title="#prop_LabelTag_forCollocates">dmlex:forCollocates</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forCollocates" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forCollocates</a> | No | For Collocates | schema:Boolean |  |
| <a href="#prop_LabelTag_forHeadwords" title="#prop_LabelTag_forHeadwords">dmlex:forHeadwords</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords</a> | No | For Headwords | schema:Boolean |  |
| <a href="#prop_LabelTag_forPartOfSpeech" title="#prop_LabelTag_forPartOfSpeech">dmlex:forPartOfSpeech</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech</a> | No | For Part of Speech | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_LabelTag_forTranslations" title="#prop_LabelTag_forTranslations">dmlex:forTranslations</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations</a> | No | For Translations | schema:Boolean |  |
| <a href="#prop_LabelTag_inflectedForm" title="#prop_LabelTag_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> |  |
| <a href="#prop_LabelTag_sameAs" title="#prop_LabelTag_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | No | Same As |  |  |
| <a href="#prop_LabelTag_typeTag" title="#prop_LabelTag_typeTag">dmlex:typeTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#typeTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#typeTag</a> | No | Type Tag | schema:Text |  |


### <a id="class_LabelTypeTag" title="#class_LabelTypeTag"></a> Class: Label Type Tag

Term: `dmlex:LabelTypeTag`

Represents one (of many) possible values for typeTag of labelTag.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Label Type Tag

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTypeTag" target="_blank" rel="noopener">LabelTypeTag</a> |
| <a href="#prop_LabelTypeTag_description" title="#prop_LabelTypeTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Yes | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_LabelTypeTag_tag" title="#prop_LabelTypeTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Yes | Tag |  |  |


### <a id="class_LexicographicResource" title="#class_LexicographicResource"></a> Class: Lexicographic resource

Term: `dmlex:LexicographicResource`

Represents a dictionary.

At least 1 instances of this type MUST be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | N/A |

#### Properties from Lexicographic resource

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource" target="_blank" rel="noopener">LexicographicResource</a> |
| <a href="#prop_LexicographicResource_langCode" title="#prop_LexicographicResource_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | Yes | Language. A sub-property of language. | schema:Text |  |
| <a href="#prop_LexicographicResource_definitionTypeTag" title="#prop_LexicographicResource_definitionTypeTag">dmlex:definitionTypeTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionTypeTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionTypeTag</a> | No | Definition Type Tag | <a href="#class_DefinitionTypeTag" title="#class_DefinitionTypeTag">Definition Type Tag</a> |  |
| <a href="#prop_LexicographicResource_entry" title="#prop_LexicographicResource_entry">dmlex:entry</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#entry" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#entry</a> | No | Entry. A sub-property of entry. | <a href="#class_Entry" title="#class_Entry">Entry</a> |  |
| <a href="#prop_LexicographicResource_etymonLanguage" title="#prop_LexicographicResource_etymonLanguage">dmlex:etymonLanguage</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonLanguage" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonLanguage</a> | No | Etymon Language | <a href="#class_EtymonLanguage" title="#class_EtymonLanguage">Etymon Language</a> |  |
| <a href="#prop_LexicographicResource_etymonType" title="#prop_LexicographicResource_etymonType">dmlex:etymonType</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonType" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonType</a> | No | Etymon Type | <a href="#class_EtymonType" title="#class_EtymonType">Etymon Type</a> |  |
| <a href="#prop_LexicographicResource_inflectedFormTag" title="#prop_LexicographicResource_inflectedFormTag">dmlex:inflectedFormTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedFormTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedFormTag</a> | No | Inflected Form Tag | <a href="#class_InflectedFormTag" title="#class_InflectedFormTag">Inflected Form Tag</a> |  |
| <a href="#prop_LexicographicResource_labelTypeTag" title="#prop_LexicographicResource_labelTypeTag">dmlex:labelTypeTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#labelTypeTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#labelTypeTag</a> | No | Label Type Tag | <a href="#class_LabelTypeTag" title="#class_LabelTypeTag">Label Type Tag</a> |  |
| <a href="#prop_LexicographicResource_partOfSpeechTag" title="#prop_LexicographicResource_partOfSpeechTag">dmlex:partOfSpeechTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeechTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeechTag</a> | No | Part of Speech Tag | <a href="#class_PartOfSpeechTag" title="#class_PartOfSpeechTag">Part of Speech Tag</a> |  |
| <a href="#prop_LexicographicResource_relation" title="#prop_LexicographicResource_relation">dmlex:relation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relation</a> | No | Relation | <a href="#class_Relation" title="#class_Relation">Relation</a> |  |
| <a href="#prop_LexicographicResource_relationType" title="#prop_LexicographicResource_relationType">dmlex:relationType</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relationType" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relationType</a> | No | RelationType | <a href="#class_RelationType" title="#class_RelationType">Relation Type</a> |  |
| <a href="#prop_LexicographicResource_sourceIdentityTag" title="#prop_LexicographicResource_sourceIdentityTag">dmlex:sourceIdentityTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentityTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentityTag</a> | No | Source Identity Tag | <a href="#class_SourceIdentityTag" title="#class_SourceIdentityTag">Source Identity Tag</a> |  |
| <a href="#prop_LexicographicResource_title" title="#prop_LexicographicResource_title">dmlex:title</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#title" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#title</a> | No | Title | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_LexicographicResource_transcriptionSchemeTag" title="#prop_LexicographicResource_transcriptionSchemeTag">dmlex:transcriptionSchemeTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcriptionSchemeTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcriptionSchemeTag</a> | No | Transcription Scheme Tag | <a href="#class_TranscriptionSchemeTag" title="#class_TranscriptionSchemeTag">Transcription Scheme Tag</a> |  |
| <a href="#prop_LexicographicResource_translationLanguage" title="#prop_LexicographicResource_translationLanguage">dmlex:translationLanguage</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translationLanguage" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translationLanguage</a> | No | Translation Language | <a href="#class_TranslationLanguage" title="#class_TranslationLanguage">TranslationLanguage</a> |  |
| <a href="#prop_LexicographicResource_uri" title="#prop_LexicographicResource_uri">dmlex:uri</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#uri" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#uri</a> | No | URI | schema:URL |  |


### <a id="class_Member" title="#class_Member"></a> Class: Member

Term: `dmlex:Member`

Represents the fact that an object, such as an entry or a sense, is a member of a relation.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Member

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Member" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Member" target="_blank" rel="noopener">Member</a> |
| <a href="#prop_Member_listingOrder" title="#prop_Member_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_Member_ref" title="#prop_Member_ref">dmlex:ref</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ref" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ref</a> | Yes | Ref | schema:Text |  |
| <a href="#prop_Member_obverseListingOrder" title="#prop_Member_obverseListingOrder">dmlex:obverseListingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#obverseListingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#obverseListingOrder</a> | No | Obverse Listing Order | schema:Integer |  |
| <a href="#prop_Member_role" title="#prop_Member_role">dmlex:role</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role</a> | No | Role | schema:Text |  |


### <a id="class_MemberType" title="#class_MemberType"></a> Class: Member Type

Term: `dmlex:MemberType`

Represents one of possible values for the role of member, as well as various restrictions on members having this role.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Member Type

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType" target="_blank" rel="noopener">MemberType</a> |
| <a href="#prop_MemberType_type" title="#prop_MemberType_type">dmlex:type</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type</a> | Yes | Type | schema:Text |  |
| <a href="#prop_MemberType_action" title="#prop_MemberType_action">dmlex:action</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#action" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#action</a> | No | Action | schema:Text |  |
| <a href="#prop_MemberType_description" title="#prop_MemberType_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_MemberType_max" title="#prop_MemberType_max">dmlex:max</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#max" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#max</a> | No | Max | schema:Integer |  |
| <a href="#prop_MemberType_min" title="#prop_MemberType_min">dmlex:min</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#min" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#min</a> | No | Min | schema:Integer |  |
| <a href="#prop_MemberType_role" title="#prop_MemberType_role">dmlex:role</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role</a> | No | Role | schema:Text |  |
| <a href="#prop_MemberType_sameAs" title="#prop_MemberType_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | No | Same As |  |  |


### <a id="class_PartOfSpeech" title="#class_PartOfSpeech"></a> Class: Part of Speech

Term: `dmlex:PartOfSpeech`

Represents a part of speech label.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Part of Speech

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeech" target="_blank" rel="noopener">PartOfSpeech</a> |
| <a href="#prop_PartOfSpeech_listingOrder" title="#prop_PartOfSpeech_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_PartOfSpeech_tag" title="#prop_PartOfSpeech_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Yes | Tag |  |  |


### <a id="class_PartOfSpeechTag" title="#class_PartOfSpeechTag"></a> Class: Part of Speech Tag

Term: `dmlex:PartOfSpeechTag`

Represents one (of many) possible values for tag of partOfSpeech.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Part of Speech Tag

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag" target="_blank" rel="noopener">PartOfSpeechTag</a> |
| <a href="#prop_PartOfSpeechTag_tag" title="#prop_PartOfSpeechTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Yes | Tag |  |  |
| <a href="#prop_PartOfSpeechTag_description" title="#prop_PartOfSpeechTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_PartOfSpeechTag_forEtymology" title="#prop_PartOfSpeechTag_forEtymology">dmlex:forEtymology</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forEtymology" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forEtymology</a> | No | For Etymology | schema:Boolean |  |
| <a href="#prop_PartOfSpeechTag_forHeadwords" title="#prop_PartOfSpeechTag_forHeadwords">dmlex:forHeadwords</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords</a> | No | For Headwords | schema:Boolean |  |
| <a href="#prop_PartOfSpeechTag_forTranslations" title="#prop_PartOfSpeechTag_forTranslations">dmlex:forTranslations</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations</a> | No | For Translations | schema:Boolean |  |
| <a href="#prop_PartOfSpeechTag_inflectedForm" title="#prop_PartOfSpeechTag_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> |  |
| <a href="#prop_PartOfSpeechTag_sameAs" title="#prop_PartOfSpeechTag_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | No | Same As |  |  |


### <a id="class_PlaceholderMarker" title="#class_PlaceholderMarker"></a> Class: Placeholder Marker

Term: `dmlex:PlaceholderMarker`

Marks up a substring inside a headword or inside a headword translation which is not part of the expression itself but stands for things that can take its place.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Placeholder Marker

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PlaceholderMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PlaceholderMarker" target="_blank" rel="noopener">PlaceholderMarker</a> |
| <a href="#prop_PlaceholderMarker_endIndex" title="#prop_PlaceholderMarker_endIndex">dmlex:endIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex</a> | Yes | End Index | schema:Text |  |
| <a href="#prop_PlaceholderMarker_startIndex" title="#prop_PlaceholderMarker_startIndex">dmlex:startIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex</a> | Yes | Start Index | schema:Text |  |


### <a id="class_Pronunciation" title="#class_Pronunciation"></a> Class: Pronunciation

Term: `dmlex:Pronunciation`

Represents the pronunciation of its parent. Pronunciations must have either a sound file or a transcription.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Pronunciation

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation" target="_blank" rel="noopener">Pronunciation</a> |
| <a href="#prop_Pronunciation_listingOrder" title="#prop_Pronunciation_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_Pronunciation_label" title="#prop_Pronunciation_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | No | Label | <a href="#class_Label" title="#class_Label">Label</a> |  |
| <a href="#prop_Pronunciation_soundFile" title="#prop_Pronunciation_soundFile">dmlex:soundFile</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile</a> | No | Sound File | schema:URL |  |
| <a href="#prop_Pronunciation_transcription" title="#prop_Pronunciation_transcription">dmlex:transcription</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcription" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcription</a> | No | Transcription | <a href="#class_Transcription" title="#class_Transcription">Transcription</a> |  |


### <a id="class_Relation" title="#class_Relation"></a> Class: Relation

Term: `dmlex:Relation`

Represents the fact that a relation exists between two or more objects.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Relation

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Relation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Relation" target="_blank" rel="noopener">Relation</a> |
| <a href="#prop_Relation_member" title="#prop_Relation_member">dmlex:member</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#member" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#member</a> | Yes | Member | <a href="#class_Member" title="#class_Member">Member</a> |  |
| <a href="#prop_Relation_type" title="#prop_Relation_type">dmlex:type</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type</a> | Yes | Type | schema:Text |  |
| <a href="#prop_Relation_description" title="#prop_Relation_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="class_RelationType" title="#class_RelationType"></a> Class: Relation Type

Term: `dmlex:RelationType`

Represents one of possible values for the type of relation.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Relation Type

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#RelationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#RelationType" target="_blank" rel="noopener">RelationType</a> |
| <a href="#prop_RelationType_type" title="#prop_RelationType_type">dmlex:type</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type</a> | Yes | Type | schema:Text |  |
| <a href="#prop_RelationType_description" title="#prop_RelationType_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_RelationType_memberType" title="#prop_RelationType_memberType">dmlex:memberType</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#memberType" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#memberType</a> | No | Member Type | <a href="#class_MemberType" title="#class_MemberType">Member Type</a> |  |
| <a href="#prop_RelationType_sameAs" title="#prop_RelationType_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | No | Same As |  |  |
| <a href="#prop_RelationType_scope" title="#prop_RelationType_scope">dmlex:scope</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scope" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scope</a> | No | Scope | schema:Text |  |


### <a id="class_Sense" title="#class_Sense"></a> Class: Sense

Term: `dmlex:Sense`

Represents one of possibly many meanings (or meaning potentials) of the headword.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Sense

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense" target="_blank" rel="noopener">Sense</a> |
| <a href="#prop_Sense_listingOrder" title="#prop_Sense_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_Sense_definition" title="#prop_Sense_definition">dmlex:definition</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definition" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definition</a> | No | Definition | <a href="#class_Definition" title="#class_Definition">Definition</a> |  |
| <a href="#prop_Sense_example" title="#prop_Sense_example">dmlex:example</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#example" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#example</a> | No | Example | <a href="#class_Example" title="#class_Example">Example</a> |  |
| <a href="#prop_Sense_headwordExplanation" title="#prop_Sense_headwordExplanation">dmlex:headwordExplanation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordExplanation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordExplanation</a> | No | Headword Explanation | <a href="#class_HeadwordExplanation" title="#class_HeadwordExplanation">Headword Explanation</a> |  |
| <a href="#prop_Sense_headwordTranslation" title="#prop_Sense_headwordTranslation">dmlex:headwordTranslation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordTranslation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordTranslation</a> | No | Headword Translation | <a href="#class_HeadwordTranslation" title="#class_HeadwordTranslation">Headword Translation</a> |  |
| <a href="#prop_Sense_indicator" title="#prop_Sense_indicator">dmlex:indicator</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#indicator" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#indicator</a> | No | Indicator | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_Sense_label" title="#prop_Sense_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | No | Label | <a href="#class_Label" title="#class_Label">Label</a> |  |


### <a id="class_SourceIdentityTag" title="#class_SourceIdentityTag"></a> Class: Source Identity Tag

Term: `dmlex:SourceIdentityTag`

Represents one (of many) possible values for sourceIdentity of example.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Source Identity Tag

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#SourceIdentityTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#SourceIdentityTag" target="_blank" rel="noopener">SourceIdentityTag</a> |
| <a href="#prop_SourceIdentityTag_tag" title="#prop_SourceIdentityTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Yes | Tag |  |  |
| <a href="#prop_SourceIdentityTag_description" title="#prop_SourceIdentityTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_SourceIdentityTag_sameAs" title="#prop_SourceIdentityTag_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | No | Same As |  |  |


### <a id="class_Transcription" title="#class_Transcription"></a> Class: Transcription

Term: `dmlex:Transcription`

Represents the transcription of a pronunciation in some notation such as IPA.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Transcription

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Transcription" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Transcription" target="_blank" rel="noopener">Transcription</a> |
| <a href="#prop_Transcription_listingOrder" title="#prop_Transcription_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |
| <a href="#prop_Transcription_text" title="#prop_Transcription_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Yes | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_Transcription_scheme" title="#prop_Transcription_scheme">dmlex:scheme</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scheme" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scheme</a> | No | Scheme | schema:Text |  |


### <a id="class_TranscriptionSchemeTag" title="#class_TranscriptionSchemeTag"></a> Class: Transcription Scheme Tag

Term: `dmlex:TranscriptionSchemeTag`

Represents one (of many) possible values for scheme of transcription.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Transcription Scheme Tag

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranscriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranscriptionSchemeTag" target="_blank" rel="noopener">TranscriptionSchemeTag</a> |
| <a href="#prop_TranscriptionSchemeTag_tag" title="#prop_TranscriptionSchemeTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Yes | Tag |  |  |
| <a href="#prop_TranscriptionSchemeTag_description" title="#prop_TranscriptionSchemeTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#prop_TranscriptionSchemeTag_forHeadwords" title="#prop_TranscriptionSchemeTag_forHeadwords">dmlex:forHeadwords</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords</a> | No | For Headwords | schema:Boolean |  |
| <a href="#prop_TranscriptionSchemeTag_forTranslations" title="#prop_TranscriptionSchemeTag_forTranslations">dmlex:forTranslations</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations</a> | No | For Translations | schema:Boolean |  |
| <a href="#prop_TranscriptionSchemeTag_inflectedForm" title="#prop_TranscriptionSchemeTag_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> |  |


### <a id="class_TranslationLanguage" title="#class_TranslationLanguage"></a> Class: TranslationLanguage

Term: `dmlex:TranslationLanguage`

Represents one of the languages in which translations are given in this lexicographic resource.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from TranslationLanguage

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranslationLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranslationLanguage" target="_blank" rel="noopener">TranslationLanguage</a> |
| <a href="#prop_TranslationLanguage_langCode" title="#prop_TranslationLanguage_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | Yes | Language. A sub-property of language. | schema:Text |  |
| <a href="#prop_TranslationLanguage_listingOrder" title="#prop_TranslationLanguage_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Yes | Listing Order | schema:Integer |  |

## All Properties

### <a id="prop_MemberType_action" title="#prop_MemberType_action"></a> Property: Action

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MemberType_action" title="#prop_MemberType_action">dmlex:action</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#action" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#action</a> | Action | schema:Text | <a href="#class_MemberType" title="#class_MemberType">Member Type</a> |
### <a id="prop_Definition_collocateMarker" title="#prop_Definition_collocateMarker"></a> Property: Collocate Marker

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Definition_collocateMarker" title="#prop_Definition_collocateMarker">dmlex:collocateMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker</a> | Collocate Marker | <a href="#class_CollocateMarker" title="#class_CollocateMarker">Collocate Marker</a> | <a href="#class_Definition" title="#class_Definition">Definition</a> |
### <a id="prop_Example_collocateMarker" title="#prop_Example_collocateMarker"></a> Property: Collocate Marker

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Example_collocateMarker" title="#prop_Example_collocateMarker">dmlex:collocateMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker</a> | Collocate Marker | <a href="#class_CollocateMarker" title="#class_CollocateMarker">Collocate Marker</a> | <a href="#class_Example" title="#class_Example">Example</a> |
### <a id="prop_ExampleTranslation_collocateMarker" title="#prop_ExampleTranslation_collocateMarker"></a> Property: Collocate Marker

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ExampleTranslation_collocateMarker" title="#prop_ExampleTranslation_collocateMarker">dmlex:collocateMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker</a> | Collocate Marker | <a href="#class_CollocateMarker" title="#class_CollocateMarker">Collocate Marker</a> | <a href="#class_ExampleTranslation" title="#class_ExampleTranslation">Example Translation</a> |
### <a id="prop_Sense_definition" title="#prop_Sense_definition"></a> Property: Definition

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Sense_definition" title="#prop_Sense_definition">dmlex:definition</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definition" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definition</a> | Definition | <a href="#class_Definition" title="#class_Definition">Definition</a> | <a href="#class_Sense" title="#class_Sense">Sense</a> |
### <a id="prop_Definition_definitionType" title="#prop_Definition_definitionType"></a> Property: Definition Type

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Definition_definitionType" title="#prop_Definition_definitionType">dmlex:definitionType</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionType" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionType</a> | Definition Type | <a href="#class_DefinitionTypeTag" title="#class_DefinitionTypeTag">Definition Type Tag</a> | <a href="#class_Definition" title="#class_Definition">Definition</a> |
### <a id="prop_LexicographicResource_definitionTypeTag" title="#prop_LexicographicResource_definitionTypeTag"></a> Property: Definition Type Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_definitionTypeTag" title="#prop_LexicographicResource_definitionTypeTag">dmlex:definitionTypeTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionTypeTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionTypeTag</a> | Definition Type Tag | <a href="#class_DefinitionTypeTag" title="#class_DefinitionTypeTag">Definition Type Tag</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_DefinitionTypeTag_description" title="#prop_DefinitionTypeTag_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_DefinitionTypeTag_description" title="#prop_DefinitionTypeTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_DefinitionTypeTag" title="#class_DefinitionTypeTag">Definition Type Tag</a> |
### <a id="prop_Etymology_description" title="#prop_Etymology_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Etymology_description" title="#prop_Etymology_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_Etymology" title="#class_Etymology">Etymology</a> |
### <a id="prop_EtymonType_description" title="#prop_EtymonType_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonType_description" title="#prop_EtymonType_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_EtymonType" title="#class_EtymonType">Etymon Type</a> |
### <a id="prop_InflectedFormTag_description" title="#prop_InflectedFormTag_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedFormTag_description" title="#prop_InflectedFormTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_InflectedFormTag" title="#class_InflectedFormTag">Inflected Form Tag</a> |
### <a id="prop_LabelTag_description" title="#prop_LabelTag_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LabelTag_description" title="#prop_LabelTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_LabelTag" title="#class_LabelTag">Label Tag</a> |
### <a id="prop_LabelTypeTag_description" title="#prop_LabelTypeTag_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LabelTypeTag_description" title="#prop_LabelTypeTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_LabelTypeTag" title="#class_LabelTypeTag">Label Type Tag</a> |
### <a id="prop_MemberType_description" title="#prop_MemberType_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MemberType_description" title="#prop_MemberType_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_MemberType" title="#class_MemberType">Member Type</a> |
### <a id="prop_PartOfSpeechTag_description" title="#prop_PartOfSpeechTag_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_PartOfSpeechTag_description" title="#prop_PartOfSpeechTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_PartOfSpeechTag" title="#class_PartOfSpeechTag">Part of Speech Tag</a> |
### <a id="prop_Relation_description" title="#prop_Relation_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Relation_description" title="#prop_Relation_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_Relation" title="#class_Relation">Relation</a> |
### <a id="prop_RelationType_description" title="#prop_RelationType_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_RelationType_description" title="#prop_RelationType_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_RelationType" title="#class_RelationType">Relation Type</a> |
### <a id="prop_SourceIdentityTag_description" title="#prop_SourceIdentityTag_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_SourceIdentityTag_description" title="#prop_SourceIdentityTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_SourceIdentityTag" title="#class_SourceIdentityTag">Source Identity Tag</a> |
### <a id="prop_TranscriptionSchemeTag_description" title="#prop_TranscriptionSchemeTag_description"></a> Property: Description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_TranscriptionSchemeTag_description" title="#prop_TranscriptionSchemeTag_description">dmlex:description</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_TranscriptionSchemeTag" title="#class_TranscriptionSchemeTag">Transcription Scheme Tag</a> |
### <a id="prop_EtymonLanguage_displayName" title="#prop_EtymonLanguage_displayName"></a> Property: Display Name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonLanguage_displayName" title="#prop_EtymonLanguage_displayName">dmlex:displayName</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#displayName" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#displayName</a> | Display Name | schema:Text | <a href="#class_EtymonLanguage" title="#class_EtymonLanguage">Etymon Language</a> |
### <a id="prop_CollocateMarker_endIndex" title="#prop_CollocateMarker_endIndex"></a> Property: End Index

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_CollocateMarker_endIndex" title="#prop_CollocateMarker_endIndex">dmlex:endIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex</a> | End Index | schema:Text | <a href="#class_CollocateMarker" title="#class_CollocateMarker">Collocate Marker</a> |
### <a id="prop_HeadwordMarker_endIndex" title="#prop_HeadwordMarker_endIndex"></a> Property: End Index

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordMarker_endIndex" title="#prop_HeadwordMarker_endIndex">dmlex:endIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex</a> | End Index | schema:Text | <a href="#class_HeadwordMarker" title="#class_HeadwordMarker">Headword Marker</a> |
### <a id="prop_PlaceholderMarker_endIndex" title="#prop_PlaceholderMarker_endIndex"></a> Property: End Index

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_PlaceholderMarker_endIndex" title="#prop_PlaceholderMarker_endIndex">dmlex:endIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex</a> | End Index | schema:Text | <a href="#class_PlaceholderMarker" title="#class_PlaceholderMarker">Placeholder Marker</a> |
### <a id="prop_LexicographicResource_entry" title="#prop_LexicographicResource_entry"></a> Property: Entry

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_entry" title="#prop_LexicographicResource_entry">dmlex:entry</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#entry" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#entry</a> | Entry. A sub-property of entry. | <a href="#class_Entry" title="#class_Entry">Entry</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_Entry_etymology" title="#prop_Entry_etymology"></a> Property: Etymology

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Entry_etymology" title="#prop_Entry_etymology">dmlex:etymology</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymology" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymology</a> | Etymology | <a href="#class_Etymology" title="#class_Etymology">Etymology</a> | <a href="#class_Entry" title="#class_Entry">Entry</a> |
### <a id="prop_Etymology_etymon" title="#prop_Etymology_etymon"></a> Property: Etymon

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Etymology_etymon" title="#prop_Etymology_etymon">dmlex:etymon</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymon" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymon</a> | Etymon | <a href="#class_Etymon" title="#class_Etymon">Etymon</a> | <a href="#class_Etymology" title="#class_Etymology">Etymology</a> |
### <a id="prop_LexicographicResource_etymonLanguage" title="#prop_LexicographicResource_etymonLanguage"></a> Property: Etymon Language

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_etymonLanguage" title="#prop_LexicographicResource_etymonLanguage">dmlex:etymonLanguage</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonLanguage" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonLanguage</a> | Etymon Language | <a href="#class_EtymonLanguage" title="#class_EtymonLanguage">Etymon Language</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_LexicographicResource_etymonType" title="#prop_LexicographicResource_etymonType"></a> Property: Etymon Type

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_etymonType" title="#prop_LexicographicResource_etymonType">dmlex:etymonType</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonType" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonType</a> | Etymon Type | <a href="#class_EtymonType" title="#class_EtymonType">Etymon Type</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_Etymon_etymonUnit" title="#prop_Etymon_etymonUnit"></a> Property: Etymon Unit

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Etymon_etymonUnit" title="#prop_Etymon_etymonUnit">dmlex:etymonUnit</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonUnit" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonUnit</a> | Etymon Unit | <a href="#class_EtymonUnit" title="#class_EtymonUnit">Etymon Unit</a> | <a href="#class_Etymon" title="#class_Etymon">Etymon</a> |
### <a id="prop_Sense_example" title="#prop_Sense_example"></a> Property: Example

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Sense_example" title="#prop_Sense_example">dmlex:example</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#example" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#example</a> | Example | <a href="#class_Example" title="#class_Example">Example</a> | <a href="#class_Sense" title="#class_Sense">Sense</a> |
### <a id="prop_Example_exampleTranslation" title="#prop_Example_exampleTranslation"></a> Property: Example Translation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Example_exampleTranslation" title="#prop_Example_exampleTranslation">dmlex:exampleTranslation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#exampleTranslation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#exampleTranslation</a> | Example Translation | <a href="#class_ExampleTranslation" title="#class_ExampleTranslation">Example Translation</a> | <a href="#class_Example" title="#class_Example">Example</a> |
### <a id="prop_LabelTag_forCollocates" title="#prop_LabelTag_forCollocates"></a> Property: For Collocates

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LabelTag_forCollocates" title="#prop_LabelTag_forCollocates">dmlex:forCollocates</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forCollocates" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forCollocates</a> | For Collocates | schema:Boolean | <a href="#class_LabelTag" title="#class_LabelTag">Label Tag</a> |
### <a id="prop_PartOfSpeechTag_forEtymology" title="#prop_PartOfSpeechTag_forEtymology"></a> Property: For Etymology

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_PartOfSpeechTag_forEtymology" title="#prop_PartOfSpeechTag_forEtymology">dmlex:forEtymology</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forEtymology" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forEtymology</a> | For Etymology | schema:Boolean | <a href="#class_PartOfSpeechTag" title="#class_PartOfSpeechTag">Part of Speech Tag</a> |
### <a id="prop_InflectedFormTag_forHeadwords" title="#prop_InflectedFormTag_forHeadwords"></a> Property: For Headwords

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedFormTag_forHeadwords" title="#prop_InflectedFormTag_forHeadwords">dmlex:forHeadwords</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords</a> | For Headwords | schema:Boolean | <a href="#class_InflectedFormTag" title="#class_InflectedFormTag">Inflected Form Tag</a> |
### <a id="prop_LabelTag_forHeadwords" title="#prop_LabelTag_forHeadwords"></a> Property: For Headwords

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LabelTag_forHeadwords" title="#prop_LabelTag_forHeadwords">dmlex:forHeadwords</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords</a> | For Headwords | schema:Boolean | <a href="#class_LabelTag" title="#class_LabelTag">Label Tag</a> |
### <a id="prop_PartOfSpeechTag_forHeadwords" title="#prop_PartOfSpeechTag_forHeadwords"></a> Property: For Headwords

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_PartOfSpeechTag_forHeadwords" title="#prop_PartOfSpeechTag_forHeadwords">dmlex:forHeadwords</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords</a> | For Headwords | schema:Boolean | <a href="#class_PartOfSpeechTag" title="#class_PartOfSpeechTag">Part of Speech Tag</a> |
### <a id="prop_TranscriptionSchemeTag_forHeadwords" title="#prop_TranscriptionSchemeTag_forHeadwords"></a> Property: For Headwords

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_TranscriptionSchemeTag_forHeadwords" title="#prop_TranscriptionSchemeTag_forHeadwords">dmlex:forHeadwords</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords</a> | For Headwords | schema:Boolean | <a href="#class_TranscriptionSchemeTag" title="#class_TranscriptionSchemeTag">Transcription Scheme Tag</a> |
### <a id="prop_InflectedFormTag_forPartOfSpeech" title="#prop_InflectedFormTag_forPartOfSpeech"></a> Property: For Part of Speech

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedFormTag_forPartOfSpeech" title="#prop_InflectedFormTag_forPartOfSpeech">dmlex:forPartOfSpeech</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech</a> | For Part of Speech | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_InflectedFormTag" title="#class_InflectedFormTag">Inflected Form Tag</a> |
### <a id="prop_LabelTag_forPartOfSpeech" title="#prop_LabelTag_forPartOfSpeech"></a> Property: For Part of Speech

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LabelTag_forPartOfSpeech" title="#prop_LabelTag_forPartOfSpeech">dmlex:forPartOfSpeech</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech</a> | For Part of Speech | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_LabelTag" title="#class_LabelTag">Label Tag</a> |
### <a id="prop_InflectedFormTag_forTranslations" title="#prop_InflectedFormTag_forTranslations"></a> Property: For Translations

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedFormTag_forTranslations" title="#prop_InflectedFormTag_forTranslations">dmlex:forTranslations</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations</a> | For Translations | schema:Boolean | <a href="#class_InflectedFormTag" title="#class_InflectedFormTag">Inflected Form Tag</a> |
### <a id="prop_LabelTag_forTranslations" title="#prop_LabelTag_forTranslations"></a> Property: For Translations

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LabelTag_forTranslations" title="#prop_LabelTag_forTranslations">dmlex:forTranslations</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations</a> | For Translations | schema:Boolean | <a href="#class_LabelTag" title="#class_LabelTag">Label Tag</a> |
### <a id="prop_PartOfSpeechTag_forTranslations" title="#prop_PartOfSpeechTag_forTranslations"></a> Property: For Translations

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_PartOfSpeechTag_forTranslations" title="#prop_PartOfSpeechTag_forTranslations">dmlex:forTranslations</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations</a> | For Translations | schema:Boolean | <a href="#class_PartOfSpeechTag" title="#class_PartOfSpeechTag">Part of Speech Tag</a> |
### <a id="prop_TranscriptionSchemeTag_forTranslations" title="#prop_TranscriptionSchemeTag_forTranslations"></a> Property: For Translations

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_TranscriptionSchemeTag_forTranslations" title="#prop_TranscriptionSchemeTag_forTranslations">dmlex:forTranslations</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations</a> | For Translations | schema:Boolean | <a href="#class_TranscriptionSchemeTag" title="#class_TranscriptionSchemeTag">Transcription Scheme Tag</a> |
### <a id="prop_Entry_headword" title="#prop_Entry_headword"></a> Property: Headword

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Entry_headword" title="#prop_Entry_headword">dmlex:headword</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headword" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headword</a> | Headword | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_Entry" title="#class_Entry">Entry</a> |
### <a id="prop_Sense_headwordExplanation" title="#prop_Sense_headwordExplanation"></a> Property: Headword Explanation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Sense_headwordExplanation" title="#prop_Sense_headwordExplanation">dmlex:headwordExplanation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordExplanation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordExplanation</a> | Headword Explanation | <a href="#class_HeadwordExplanation" title="#class_HeadwordExplanation">Headword Explanation</a> | <a href="#class_Sense" title="#class_Sense">Sense</a> |
### <a id="prop_Definition_headwordMarker" title="#prop_Definition_headwordMarker"></a> Property: Headword Marker

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Definition_headwordMarker" title="#prop_Definition_headwordMarker">dmlex:headwordMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker</a> | Headword Marker | <a href="#class_HeadwordMarker" title="#class_HeadwordMarker">Headword Marker</a> | <a href="#class_Definition" title="#class_Definition">Definition</a> |
### <a id="prop_Example_headwordMarker" title="#prop_Example_headwordMarker"></a> Property: Headword Marker

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Example_headwordMarker" title="#prop_Example_headwordMarker">dmlex:headwordMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker</a> | Headword Marker | <a href="#class_HeadwordMarker" title="#class_HeadwordMarker">Headword Marker</a> | <a href="#class_Example" title="#class_Example">Example</a> |
### <a id="prop_ExampleTranslation_headwordMarker" title="#prop_ExampleTranslation_headwordMarker"></a> Property: Headword Marker

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ExampleTranslation_headwordMarker" title="#prop_ExampleTranslation_headwordMarker">dmlex:headwordMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker</a> | Headword Marker | <a href="#class_HeadwordMarker" title="#class_HeadwordMarker">Headword Marker</a> | <a href="#class_ExampleTranslation" title="#class_ExampleTranslation">Example Translation</a> |
### <a id="prop_Sense_headwordTranslation" title="#prop_Sense_headwordTranslation"></a> Property: Headword Translation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Sense_headwordTranslation" title="#prop_Sense_headwordTranslation">dmlex:headwordTranslation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordTranslation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordTranslation</a> | Headword Translation | <a href="#class_HeadwordTranslation" title="#class_HeadwordTranslation">Headword Translation</a> | <a href="#class_Sense" title="#class_Sense">Sense</a> |
### <a id="prop_Entry_homographNumber" title="#prop_Entry_homographNumber"></a> Property: Homograph Number

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Entry_homographNumber" title="#prop_Entry_homographNumber">dmlex:homographNumber</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#homographNumber" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#homographNumber</a> | Homograph Number | schema:Integer | <a href="#class_Entry" title="#class_Entry">Entry</a> |
### <a id="prop_Sense_indicator" title="#prop_Sense_indicator"></a> Property: Indicator

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Sense_indicator" title="#prop_Sense_indicator">dmlex:indicator</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#indicator" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#indicator</a> | Indicator | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_Sense" title="#class_Sense">Sense</a> |
### <a id="prop_Entry_inflectedForm" title="#prop_Entry_inflectedForm"></a> Property: Inflected Form

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Entry_inflectedForm" title="#prop_Entry_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> | <a href="#class_Entry" title="#class_Entry">Entry</a> |
### <a id="prop_HeadwordTranslation_inflectedForm" title="#prop_HeadwordTranslation_inflectedForm"></a> Property: Inflected Form

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordTranslation_inflectedForm" title="#prop_HeadwordTranslation_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> | <a href="#class_HeadwordTranslation" title="#class_HeadwordTranslation">Headword Translation</a> |
### <a id="prop_InflectedFormTag_inflectedForm" title="#prop_InflectedFormTag_inflectedForm"></a> Property: Inflected Form

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedFormTag_inflectedForm" title="#prop_InflectedFormTag_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> | <a href="#class_InflectedFormTag" title="#class_InflectedFormTag">Inflected Form Tag</a> |
### <a id="prop_LabelTag_inflectedForm" title="#prop_LabelTag_inflectedForm"></a> Property: Inflected Form

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LabelTag_inflectedForm" title="#prop_LabelTag_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> | <a href="#class_LabelTag" title="#class_LabelTag">Label Tag</a> |
### <a id="prop_PartOfSpeechTag_inflectedForm" title="#prop_PartOfSpeechTag_inflectedForm"></a> Property: Inflected Form

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_PartOfSpeechTag_inflectedForm" title="#prop_PartOfSpeechTag_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> | <a href="#class_PartOfSpeechTag" title="#class_PartOfSpeechTag">Part of Speech Tag</a> |
### <a id="prop_TranscriptionSchemeTag_inflectedForm" title="#prop_TranscriptionSchemeTag_inflectedForm"></a> Property: Inflected Form

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_TranscriptionSchemeTag_inflectedForm" title="#prop_TranscriptionSchemeTag_inflectedForm">dmlex:inflectedForm</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm</a> | Inflected Form. A sub-property of otherForm. | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> | <a href="#class_TranscriptionSchemeTag" title="#class_TranscriptionSchemeTag">Transcription Scheme Tag</a> |
### <a id="prop_LexicographicResource_inflectedFormTag" title="#prop_LexicographicResource_inflectedFormTag"></a> Property: Inflected Form Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_inflectedFormTag" title="#prop_LexicographicResource_inflectedFormTag">dmlex:inflectedFormTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedFormTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedFormTag</a> | Inflected Form Tag | <a href="#class_InflectedFormTag" title="#class_InflectedFormTag">Inflected Form Tag</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_CollocateMarker_label" title="#prop_CollocateMarker_label"></a> Property: Label

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_CollocateMarker_label" title="#prop_CollocateMarker_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | Label | <a href="#class_Label" title="#class_Label">Label</a> | <a href="#class_CollocateMarker" title="#class_CollocateMarker">Collocate Marker</a> |
### <a id="prop_Entry_label" title="#prop_Entry_label"></a> Property: Label

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Entry_label" title="#prop_Entry_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | Label | <a href="#class_Label" title="#class_Label">Label</a> | <a href="#class_Entry" title="#class_Entry">Entry</a> |
### <a id="prop_Example_label" title="#prop_Example_label"></a> Property: Label

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Example_label" title="#prop_Example_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | Label | <a href="#class_Label" title="#class_Label">Label</a> | <a href="#class_Example" title="#class_Example">Example</a> |
### <a id="prop_ExampleTranslation_label" title="#prop_ExampleTranslation_label"></a> Property: Label

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ExampleTranslation_label" title="#prop_ExampleTranslation_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | Label | <a href="#class_Label" title="#class_Label">Label</a> | <a href="#class_ExampleTranslation" title="#class_ExampleTranslation">Example Translation</a> |
### <a id="prop_HeadwordTranslation_label" title="#prop_HeadwordTranslation_label"></a> Property: Label

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordTranslation_label" title="#prop_HeadwordTranslation_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | Label | <a href="#class_Label" title="#class_Label">Label</a> | <a href="#class_HeadwordTranslation" title="#class_HeadwordTranslation">Headword Translation</a> |
### <a id="prop_InflectedForm_label" title="#prop_InflectedForm_label"></a> Property: Label

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedForm_label" title="#prop_InflectedForm_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | Label | <a href="#class_Label" title="#class_Label">Label</a> | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> |
### <a id="prop_Pronunciation_label" title="#prop_Pronunciation_label"></a> Property: Label

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Pronunciation_label" title="#prop_Pronunciation_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | Label | <a href="#class_Label" title="#class_Label">Label</a> | <a href="#class_Pronunciation" title="#class_Pronunciation">Pronunciation</a> |
### <a id="prop_Sense_label" title="#prop_Sense_label"></a> Property: Label

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Sense_label" title="#prop_Sense_label">dmlex:label</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label</a> | Label | <a href="#class_Label" title="#class_Label">Label</a> | <a href="#class_Sense" title="#class_Sense">Sense</a> |
### <a id="prop_LexicographicResource_labelTypeTag" title="#prop_LexicographicResource_labelTypeTag"></a> Property: Label Type Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_labelTypeTag" title="#prop_LexicographicResource_labelTypeTag">dmlex:labelTypeTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#labelTypeTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#labelTypeTag</a> | Label Type Tag | <a href="#class_LabelTypeTag" title="#class_LabelTypeTag">Label Type Tag</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_EtymonLanguage_langCode" title="#prop_EtymonLanguage_langCode"></a> Property: Language

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonLanguage_langCode" title="#prop_EtymonLanguage_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | Language. A sub-property of language. | schema:Text | <a href="#class_EtymonLanguage" title="#class_EtymonLanguage">Etymon Language</a> |
### <a id="prop_EtymonUnit_langCode" title="#prop_EtymonUnit_langCode"></a> Property: Language

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonUnit_langCode" title="#prop_EtymonUnit_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | Language. A sub-property of language. | schema:Text | <a href="#class_EtymonUnit" title="#class_EtymonUnit">Etymon Unit</a> |
### <a id="prop_ExampleTranslation_langCode" title="#prop_ExampleTranslation_langCode"></a> Property: Language

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ExampleTranslation_langCode" title="#prop_ExampleTranslation_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | Language. A sub-property of language. | schema:Text | <a href="#class_ExampleTranslation" title="#class_ExampleTranslation">Example Translation</a> |
### <a id="prop_HeadwordExplanation_langCode" title="#prop_HeadwordExplanation_langCode"></a> Property: Language

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordExplanation_langCode" title="#prop_HeadwordExplanation_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | Language. A sub-property of language. | schema:Text | <a href="#class_HeadwordExplanation" title="#class_HeadwordExplanation">Headword Explanation</a> |
### <a id="prop_HeadwordTranslation_langCode" title="#prop_HeadwordTranslation_langCode"></a> Property: Language

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordTranslation_langCode" title="#prop_HeadwordTranslation_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | Language. A sub-property of language. | schema:Text | <a href="#class_HeadwordTranslation" title="#class_HeadwordTranslation">Headword Translation</a> |
### <a id="prop_LexicographicResource_langCode" title="#prop_LexicographicResource_langCode"></a> Property: Language

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_langCode" title="#prop_LexicographicResource_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | Language. A sub-property of language. | schema:Text | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_TranslationLanguage_langCode" title="#prop_TranslationLanguage_langCode"></a> Property: Language

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_TranslationLanguage_langCode" title="#prop_TranslationLanguage_langCode">dmlex:langCode</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode</a> | Language. A sub-property of language. | schema:Text | <a href="#class_TranslationLanguage" title="#class_TranslationLanguage">TranslationLanguage</a> |
### <a id="prop_CollocateMarker_lemma" title="#prop_CollocateMarker_lemma"></a> Property: Lemma

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_CollocateMarker_lemma" title="#prop_CollocateMarker_lemma">dmlex:lemma</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#lemma" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#lemma</a> | Lemma | schema:Text | <a href="#class_CollocateMarker" title="#class_CollocateMarker">Collocate Marker</a> |
### <a id="prop_Definition_listingOrder" title="#prop_Definition_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Definition_listingOrder" title="#prop_Definition_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_Definition" title="#class_Definition">Definition</a> |
### <a id="prop_Etymology_listingOrder" title="#prop_Etymology_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Etymology_listingOrder" title="#prop_Etymology_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_Etymology" title="#class_Etymology">Etymology</a> |
### <a id="prop_Etymon_listingOrder" title="#prop_Etymon_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Etymon_listingOrder" title="#prop_Etymon_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_Etymon" title="#class_Etymon">Etymon</a> |
### <a id="prop_EtymonUnit_listingOrder" title="#prop_EtymonUnit_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonUnit_listingOrder" title="#prop_EtymonUnit_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_EtymonUnit" title="#class_EtymonUnit">Etymon Unit</a> |
### <a id="prop_Example_listingOrder" title="#prop_Example_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Example_listingOrder" title="#prop_Example_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_Example" title="#class_Example">Example</a> |
### <a id="prop_ExampleTranslation_listingOrder" title="#prop_ExampleTranslation_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ExampleTranslation_listingOrder" title="#prop_ExampleTranslation_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_ExampleTranslation" title="#class_ExampleTranslation">Example Translation</a> |
### <a id="prop_HeadwordTranslation_listingOrder" title="#prop_HeadwordTranslation_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordTranslation_listingOrder" title="#prop_HeadwordTranslation_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_HeadwordTranslation" title="#class_HeadwordTranslation">Headword Translation</a> |
### <a id="prop_InflectedForm_listingOrder" title="#prop_InflectedForm_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedForm_listingOrder" title="#prop_InflectedForm_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> |
### <a id="prop_Label_listingOrder" title="#prop_Label_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Label_listingOrder" title="#prop_Label_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_Label" title="#class_Label">Label</a> |
### <a id="prop_Member_listingOrder" title="#prop_Member_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Member_listingOrder" title="#prop_Member_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_Member" title="#class_Member">Member</a> |
### <a id="prop_PartOfSpeech_listingOrder" title="#prop_PartOfSpeech_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_PartOfSpeech_listingOrder" title="#prop_PartOfSpeech_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_PartOfSpeech" title="#class_PartOfSpeech">Part of Speech</a> |
### <a id="prop_Pronunciation_listingOrder" title="#prop_Pronunciation_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Pronunciation_listingOrder" title="#prop_Pronunciation_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_Pronunciation" title="#class_Pronunciation">Pronunciation</a> |
### <a id="prop_Sense_listingOrder" title="#prop_Sense_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Sense_listingOrder" title="#prop_Sense_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_Sense" title="#class_Sense">Sense</a> |
### <a id="prop_Transcription_listingOrder" title="#prop_Transcription_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Transcription_listingOrder" title="#prop_Transcription_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_Transcription" title="#class_Transcription">Transcription</a> |
### <a id="prop_TranslationLanguage_listingOrder" title="#prop_TranslationLanguage_listingOrder"></a> Property: Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_TranslationLanguage_listingOrder" title="#prop_TranslationLanguage_listingOrder">dmlex:listingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder</a> | Listing Order | schema:Integer | <a href="#class_TranslationLanguage" title="#class_TranslationLanguage">TranslationLanguage</a> |
### <a id="prop_MemberType_max" title="#prop_MemberType_max"></a> Property: Max

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MemberType_max" title="#prop_MemberType_max">dmlex:max</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#max" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#max</a> | Max | schema:Integer | <a href="#class_MemberType" title="#class_MemberType">Member Type</a> |
### <a id="prop_Relation_member" title="#prop_Relation_member"></a> Property: Member

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Relation_member" title="#prop_Relation_member">dmlex:member</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#member" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#member</a> | Member | <a href="#class_Member" title="#class_Member">Member</a> | <a href="#class_Relation" title="#class_Relation">Relation</a> |
### <a id="prop_RelationType_memberType" title="#prop_RelationType_memberType"></a> Property: Member Type

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_RelationType_memberType" title="#prop_RelationType_memberType">dmlex:memberType</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#memberType" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#memberType</a> | Member Type | <a href="#class_MemberType" title="#class_MemberType">Member Type</a> | <a href="#class_RelationType" title="#class_RelationType">Relation Type</a> |
### <a id="prop_MemberType_min" title="#prop_MemberType_min"></a> Property: Min

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MemberType_min" title="#prop_MemberType_min">dmlex:min</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#min" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#min</a> | Min | schema:Integer | <a href="#class_MemberType" title="#class_MemberType">Member Type</a> |
### <a id="prop_Etymon_note" title="#prop_Etymon_note"></a> Property: Note

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Etymon_note" title="#prop_Etymon_note">dmlex:note</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#note" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#note</a> | Note | schema:Text | <a href="#class_Etymon" title="#class_Etymon">Etymon</a> |
### <a id="prop_Member_obverseListingOrder" title="#prop_Member_obverseListingOrder"></a> Property: Obverse Listing Order

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Member_obverseListingOrder" title="#prop_Member_obverseListingOrder">dmlex:obverseListingOrder</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#obverseListingOrder" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#obverseListingOrder</a> | Obverse Listing Order | schema:Integer | <a href="#class_Member" title="#class_Member">Member</a> |
### <a id="prop_Entry_partOfSpeech" title="#prop_Entry_partOfSpeech"></a> Property: Part of Speech

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Entry_partOfSpeech" title="#prop_Entry_partOfSpeech">dmlex:partOfSpeech</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech</a> | Part of Speech | <a href="#class_PartOfSpeech" title="#class_PartOfSpeech">Part of Speech</a> | <a href="#class_Entry" title="#class_Entry">Entry</a> |
### <a id="prop_EtymonUnit_partOfSpeech" title="#prop_EtymonUnit_partOfSpeech"></a> Property: Part of Speech

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonUnit_partOfSpeech" title="#prop_EtymonUnit_partOfSpeech">dmlex:partOfSpeech</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech</a> | Part of Speech | <a href="#class_PartOfSpeech" title="#class_PartOfSpeech">Part of Speech</a> | <a href="#class_EtymonUnit" title="#class_EtymonUnit">Etymon Unit</a> |
### <a id="prop_HeadwordTranslation_partOfSpeech" title="#prop_HeadwordTranslation_partOfSpeech"></a> Property: Part of Speech

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordTranslation_partOfSpeech" title="#prop_HeadwordTranslation_partOfSpeech">dmlex:partOfSpeech</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech</a> | Part of Speech | <a href="#class_PartOfSpeech" title="#class_PartOfSpeech">Part of Speech</a> | <a href="#class_HeadwordTranslation" title="#class_HeadwordTranslation">Headword Translation</a> |
### <a id="prop_LexicographicResource_partOfSpeechTag" title="#prop_LexicographicResource_partOfSpeechTag"></a> Property: Part of Speech Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_partOfSpeechTag" title="#prop_LexicographicResource_partOfSpeechTag">dmlex:partOfSpeechTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeechTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeechTag</a> | Part of Speech Tag | <a href="#class_PartOfSpeechTag" title="#class_PartOfSpeechTag">Part of Speech Tag</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_Entry_placeholderMarker" title="#prop_Entry_placeholderMarker"></a> Property: Placeholder Marker

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Entry_placeholderMarker" title="#prop_Entry_placeholderMarker">dmlex:placeholderMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker</a> | Placeholder Marker | <a href="#class_PlaceholderMarker" title="#class_PlaceholderMarker">Placeholder Marker</a> | <a href="#class_Entry" title="#class_Entry">Entry</a> |
### <a id="prop_HeadwordTranslation_placeholderMarker" title="#prop_HeadwordTranslation_placeholderMarker"></a> Property: Placeholder Marker

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordTranslation_placeholderMarker" title="#prop_HeadwordTranslation_placeholderMarker">dmlex:placeholderMarker</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker</a> | Placeholder Marker | <a href="#class_PlaceholderMarker" title="#class_PlaceholderMarker">Placeholder Marker</a> | <a href="#class_HeadwordTranslation" title="#class_HeadwordTranslation">Headword Translation</a> |
### <a id="prop_Entry_pronunciation" title="#prop_Entry_pronunciation"></a> Property: Pronunciation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Entry_pronunciation" title="#prop_Entry_pronunciation">dmlex:pronunciation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation</a> | Pronunciation | <a href="#class_Pronunciation" title="#class_Pronunciation">Pronunciation</a> | <a href="#class_Entry" title="#class_Entry">Entry</a> |
### <a id="prop_HeadwordTranslation_pronunciation" title="#prop_HeadwordTranslation_pronunciation"></a> Property: Pronunciation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordTranslation_pronunciation" title="#prop_HeadwordTranslation_pronunciation">dmlex:pronunciation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation</a> | Pronunciation | <a href="#class_Pronunciation" title="#class_Pronunciation">Pronunciation</a> | <a href="#class_HeadwordTranslation" title="#class_HeadwordTranslation">Headword Translation</a> |
### <a id="prop_InflectedForm_pronunciation" title="#prop_InflectedForm_pronunciation"></a> Property: Pronunciation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedForm_pronunciation" title="#prop_InflectedForm_pronunciation">dmlex:pronunciation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation</a> | Pronunciation | <a href="#class_Pronunciation" title="#class_Pronunciation">Pronunciation</a> | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> |
### <a id="prop_EtymonUnit_reconstructed" title="#prop_EtymonUnit_reconstructed"></a> Property: Reconstructed

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonUnit_reconstructed" title="#prop_EtymonUnit_reconstructed">dmlex:reconstructed</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#reconstructed" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#reconstructed</a> | Reconstructed | schema:Boolean | <a href="#class_EtymonUnit" title="#class_EtymonUnit">Etymon Unit</a> |
### <a id="prop_Member_ref" title="#prop_Member_ref"></a> Property: Ref

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Member_ref" title="#prop_Member_ref">dmlex:ref</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ref" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ref</a> | Ref | schema:Text | <a href="#class_Member" title="#class_Member">Member</a> |
### <a id="prop_LexicographicResource_relation" title="#prop_LexicographicResource_relation"></a> Property: Relation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_relation" title="#prop_LexicographicResource_relation">dmlex:relation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relation</a> | Relation | <a href="#class_Relation" title="#class_Relation">Relation</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_LexicographicResource_relationType" title="#prop_LexicographicResource_relationType"></a> Property: RelationType

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_relationType" title="#prop_LexicographicResource_relationType">dmlex:relationType</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relationType" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relationType</a> | RelationType | <a href="#class_RelationType" title="#class_RelationType">Relation Type</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_Member_role" title="#prop_Member_role"></a> Property: Role

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Member_role" title="#prop_Member_role">dmlex:role</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role</a> | Role | schema:Text | <a href="#class_Member" title="#class_Member">Member</a> |
### <a id="prop_MemberType_role" title="#prop_MemberType_role"></a> Property: Role

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MemberType_role" title="#prop_MemberType_role">dmlex:role</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role</a> | Role | schema:Text | <a href="#class_MemberType" title="#class_MemberType">Member Type</a> |
### <a id="prop_DefinitionTypeTag_sameAs" title="#prop_DefinitionTypeTag_sameAs"></a> Property: Same As

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_DefinitionTypeTag_sameAs" title="#prop_DefinitionTypeTag_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | Same As |  | <a href="#class_DefinitionTypeTag" title="#class_DefinitionTypeTag">Definition Type Tag</a> |
### <a id="prop_EtymonLanguage_sameAs" title="#prop_EtymonLanguage_sameAs"></a> Property: Same As

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonLanguage_sameAs" title="#prop_EtymonLanguage_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | Same As |  | <a href="#class_EtymonLanguage" title="#class_EtymonLanguage">Etymon Language</a> |
### <a id="prop_EtymonType_sameAs" title="#prop_EtymonType_sameAs"></a> Property: Same As

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonType_sameAs" title="#prop_EtymonType_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | Same As |  | <a href="#class_EtymonType" title="#class_EtymonType">Etymon Type</a> |
### <a id="prop_InflectedFormTag_sameAs" title="#prop_InflectedFormTag_sameAs"></a> Property: Same As

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedFormTag_sameAs" title="#prop_InflectedFormTag_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | Same As |  | <a href="#class_InflectedFormTag" title="#class_InflectedFormTag">Inflected Form Tag</a> |
### <a id="prop_LabelTag_sameAs" title="#prop_LabelTag_sameAs"></a> Property: Same As

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LabelTag_sameAs" title="#prop_LabelTag_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | Same As |  | <a href="#class_LabelTag" title="#class_LabelTag">Label Tag</a> |
### <a id="prop_MemberType_sameAs" title="#prop_MemberType_sameAs"></a> Property: Same As

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MemberType_sameAs" title="#prop_MemberType_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | Same As |  | <a href="#class_MemberType" title="#class_MemberType">Member Type</a> |
### <a id="prop_PartOfSpeechTag_sameAs" title="#prop_PartOfSpeechTag_sameAs"></a> Property: Same As

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_PartOfSpeechTag_sameAs" title="#prop_PartOfSpeechTag_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | Same As |  | <a href="#class_PartOfSpeechTag" title="#class_PartOfSpeechTag">Part of Speech Tag</a> |
### <a id="prop_RelationType_sameAs" title="#prop_RelationType_sameAs"></a> Property: Same As

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_RelationType_sameAs" title="#prop_RelationType_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | Same As |  | <a href="#class_RelationType" title="#class_RelationType">Relation Type</a> |
### <a id="prop_SourceIdentityTag_sameAs" title="#prop_SourceIdentityTag_sameAs"></a> Property: Same As

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_SourceIdentityTag_sameAs" title="#prop_SourceIdentityTag_sameAs">dmlex:sameAs</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs</a> | Same As |  | <a href="#class_SourceIdentityTag" title="#class_SourceIdentityTag">Source Identity Tag</a> |
### <a id="prop_Transcription_scheme" title="#prop_Transcription_scheme"></a> Property: Scheme

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Transcription_scheme" title="#prop_Transcription_scheme">dmlex:scheme</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scheme" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scheme</a> | Scheme | schema:Text | <a href="#class_Transcription" title="#class_Transcription">Transcription</a> |
### <a id="prop_RelationType_scope" title="#prop_RelationType_scope"></a> Property: Scope

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_RelationType_scope" title="#prop_RelationType_scope">dmlex:scope</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scope" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scope</a> | Scope | schema:Text | <a href="#class_RelationType" title="#class_RelationType">Relation Type</a> |
### <a id="prop_Entry_sense" title="#prop_Entry_sense"></a> Property: Sense

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Entry_sense" title="#prop_Entry_sense">dmlex:sense</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sense" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sense</a> | Sense. A sub-property of evokes. | <a href="#class_Sense" title="#class_Sense">Sense</a> | <a href="#class_Entry" title="#class_Entry">Entry</a> |
### <a id="prop_Example_soundFile" title="#prop_Example_soundFile"></a> Property: Sound File

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Example_soundFile" title="#prop_Example_soundFile">dmlex:soundFile</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile</a> | Sound File | schema:URL | <a href="#class_Example" title="#class_Example">Example</a> |
### <a id="prop_ExampleTranslation_soundFile" title="#prop_ExampleTranslation_soundFile"></a> Property: Sound File

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ExampleTranslation_soundFile" title="#prop_ExampleTranslation_soundFile">dmlex:soundFile</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile</a> | Sound File | schema:URL | <a href="#class_ExampleTranslation" title="#class_ExampleTranslation">Example Translation</a> |
### <a id="prop_Pronunciation_soundFile" title="#prop_Pronunciation_soundFile"></a> Property: Sound File

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Pronunciation_soundFile" title="#prop_Pronunciation_soundFile">dmlex:soundFile</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile</a> | Sound File | schema:URL | <a href="#class_Pronunciation" title="#class_Pronunciation">Pronunciation</a> |
### <a id="prop_Example_sourceElaboration" title="#prop_Example_sourceElaboration"></a> Property: Source Elaboration

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Example_sourceElaboration" title="#prop_Example_sourceElaboration">dmlex:sourceElaboration</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceElaboration" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceElaboration</a> | Source Elaboration | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_Example" title="#class_Example">Example</a> |
### <a id="prop_Example_sourceIdentity" title="#prop_Example_sourceIdentity"></a> Property: Source Identity

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Example_sourceIdentity" title="#prop_Example_sourceIdentity">dmlex:sourceIdentity</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentity" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentity</a> | Source Identity | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_Example" title="#class_Example">Example</a> |
### <a id="prop_LexicographicResource_sourceIdentityTag" title="#prop_LexicographicResource_sourceIdentityTag"></a> Property: Source Identity Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_sourceIdentityTag" title="#prop_LexicographicResource_sourceIdentityTag">dmlex:sourceIdentityTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentityTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentityTag</a> | Source Identity Tag | <a href="#class_SourceIdentityTag" title="#class_SourceIdentityTag">Source Identity Tag</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_CollocateMarker_startIndex" title="#prop_CollocateMarker_startIndex"></a> Property: Start Index

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_CollocateMarker_startIndex" title="#prop_CollocateMarker_startIndex">dmlex:startIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex</a> | Start Index | schema:Text | <a href="#class_CollocateMarker" title="#class_CollocateMarker">Collocate Marker</a> |
### <a id="prop_HeadwordMarker_startIndex" title="#prop_HeadwordMarker_startIndex"></a> Property: Start Index

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordMarker_startIndex" title="#prop_HeadwordMarker_startIndex">dmlex:startIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex</a> | Start Index | schema:Text | <a href="#class_HeadwordMarker" title="#class_HeadwordMarker">Headword Marker</a> |
### <a id="prop_PlaceholderMarker_startIndex" title="#prop_PlaceholderMarker_startIndex"></a> Property: Start Index

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_PlaceholderMarker_startIndex" title="#prop_PlaceholderMarker_startIndex">dmlex:startIndex</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex</a> | Start Index | schema:Text | <a href="#class_PlaceholderMarker" title="#class_PlaceholderMarker">Placeholder Marker</a> |
### <a id="prop_DefinitionTypeTag_tag" title="#prop_DefinitionTypeTag_tag"></a> Property: Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_DefinitionTypeTag_tag" title="#prop_DefinitionTypeTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Tag |  | <a href="#class_DefinitionTypeTag" title="#class_DefinitionTypeTag">Definition Type Tag</a> |
### <a id="prop_InflectedForm_tag" title="#prop_InflectedForm_tag"></a> Property: Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedForm_tag" title="#prop_InflectedForm_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Tag |  | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> |
### <a id="prop_InflectedFormTag_tag" title="#prop_InflectedFormTag_tag"></a> Property: Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedFormTag_tag" title="#prop_InflectedFormTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Tag |  | <a href="#class_InflectedFormTag" title="#class_InflectedFormTag">Inflected Form Tag</a> |
### <a id="prop_Label_tag" title="#prop_Label_tag"></a> Property: Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Label_tag" title="#prop_Label_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Tag |  | <a href="#class_Label" title="#class_Label">Label</a> |
### <a id="prop_LabelTag_tag" title="#prop_LabelTag_tag"></a> Property: Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LabelTag_tag" title="#prop_LabelTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Tag |  | <a href="#class_LabelTag" title="#class_LabelTag">Label Tag</a> |
### <a id="prop_LabelTypeTag_tag" title="#prop_LabelTypeTag_tag"></a> Property: Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LabelTypeTag_tag" title="#prop_LabelTypeTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Tag |  | <a href="#class_LabelTypeTag" title="#class_LabelTypeTag">Label Type Tag</a> |
### <a id="prop_PartOfSpeech_tag" title="#prop_PartOfSpeech_tag"></a> Property: Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_PartOfSpeech_tag" title="#prop_PartOfSpeech_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Tag |  | <a href="#class_PartOfSpeech" title="#class_PartOfSpeech">Part of Speech</a> |
### <a id="prop_PartOfSpeechTag_tag" title="#prop_PartOfSpeechTag_tag"></a> Property: Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_PartOfSpeechTag_tag" title="#prop_PartOfSpeechTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Tag |  | <a href="#class_PartOfSpeechTag" title="#class_PartOfSpeechTag">Part of Speech Tag</a> |
### <a id="prop_SourceIdentityTag_tag" title="#prop_SourceIdentityTag_tag"></a> Property: Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_SourceIdentityTag_tag" title="#prop_SourceIdentityTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Tag |  | <a href="#class_SourceIdentityTag" title="#class_SourceIdentityTag">Source Identity Tag</a> |
### <a id="prop_TranscriptionSchemeTag_tag" title="#prop_TranscriptionSchemeTag_tag"></a> Property: Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_TranscriptionSchemeTag_tag" title="#prop_TranscriptionSchemeTag_tag">dmlex:tag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag</a> | Tag |  | <a href="#class_TranscriptionSchemeTag" title="#class_TranscriptionSchemeTag">Transcription Scheme Tag</a> |
### <a id="prop_Definition_text" title="#prop_Definition_text"></a> Property: Text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Definition_text" title="#prop_Definition_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_Definition" title="#class_Definition">Definition</a> |
### <a id="prop_EtymonUnit_text" title="#prop_EtymonUnit_text"></a> Property: Text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonUnit_text" title="#prop_EtymonUnit_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_EtymonUnit" title="#class_EtymonUnit">Etymon Unit</a> |
### <a id="prop_Example_text" title="#prop_Example_text"></a> Property: Text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Example_text" title="#prop_Example_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_Example" title="#class_Example">Example</a> |
### <a id="prop_ExampleTranslation_text" title="#prop_ExampleTranslation_text"></a> Property: Text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ExampleTranslation_text" title="#prop_ExampleTranslation_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_ExampleTranslation" title="#class_ExampleTranslation">Example Translation</a> |
### <a id="prop_HeadwordExplanation_text" title="#prop_HeadwordExplanation_text"></a> Property: Text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordExplanation_text" title="#prop_HeadwordExplanation_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_HeadwordExplanation" title="#class_HeadwordExplanation">Headword Explanation</a> |
### <a id="prop_HeadwordTranslation_text" title="#prop_HeadwordTranslation_text"></a> Property: Text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_HeadwordTranslation_text" title="#prop_HeadwordTranslation_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_HeadwordTranslation" title="#class_HeadwordTranslation">Headword Translation</a> |
### <a id="prop_InflectedForm_text" title="#prop_InflectedForm_text"></a> Property: Text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_InflectedForm_text" title="#prop_InflectedForm_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_InflectedForm" title="#class_InflectedForm">Inflected Form</a> |
### <a id="prop_Transcription_text" title="#prop_Transcription_text"></a> Property: Text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Transcription_text" title="#prop_Transcription_text">dmlex:text</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text</a> | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_Transcription" title="#class_Transcription">Transcription</a> |
### <a id="prop_LexicographicResource_title" title="#prop_LexicographicResource_title"></a> Property: Title

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_title" title="#prop_LexicographicResource_title">dmlex:title</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#title" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#title</a> | Title | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_Pronunciation_transcription" title="#prop_Pronunciation_transcription"></a> Property: Transcription

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Pronunciation_transcription" title="#prop_Pronunciation_transcription">dmlex:transcription</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcription" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcription</a> | Transcription | <a href="#class_Transcription" title="#class_Transcription">Transcription</a> | <a href="#class_Pronunciation" title="#class_Pronunciation">Pronunciation</a> |
### <a id="prop_LexicographicResource_transcriptionSchemeTag" title="#prop_LexicographicResource_transcriptionSchemeTag"></a> Property: Transcription Scheme Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_transcriptionSchemeTag" title="#prop_LexicographicResource_transcriptionSchemeTag">dmlex:transcriptionSchemeTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcriptionSchemeTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcriptionSchemeTag</a> | Transcription Scheme Tag | <a href="#class_TranscriptionSchemeTag" title="#class_TranscriptionSchemeTag">Transcription Scheme Tag</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_Etymon_translation" title="#prop_Etymon_translation"></a> Property: Translation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Etymon_translation" title="#prop_Etymon_translation">dmlex:translation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation</a> | Translation | schema:Text | <a href="#class_Etymon" title="#class_Etymon">Etymon</a> |
### <a id="prop_EtymonUnit_translation" title="#prop_EtymonUnit_translation"></a> Property: Translation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonUnit_translation" title="#prop_EtymonUnit_translation">dmlex:translation</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation</a> | Translation | schema:Text | <a href="#class_EtymonUnit" title="#class_EtymonUnit">Etymon Unit</a> |
### <a id="prop_LexicographicResource_translationLanguage" title="#prop_LexicographicResource_translationLanguage"></a> Property: Translation Language

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_translationLanguage" title="#prop_LexicographicResource_translationLanguage">dmlex:translationLanguage</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translationLanguage" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translationLanguage</a> | Translation Language | <a href="#class_TranslationLanguage" title="#class_TranslationLanguage">TranslationLanguage</a> | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_Etymon_type" title="#prop_Etymon_type"></a> Property: Type

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Etymon_type" title="#prop_Etymon_type">dmlex:type</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type</a> | Type | schema:Text | <a href="#class_Etymon" title="#class_Etymon">Etymon</a> |
### <a id="prop_EtymonType_type" title="#prop_EtymonType_type"></a> Property: Type

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_EtymonType_type" title="#prop_EtymonType_type">dmlex:type</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type</a> | Type | schema:Text | <a href="#class_EtymonType" title="#class_EtymonType">Etymon Type</a> |
### <a id="prop_MemberType_type" title="#prop_MemberType_type"></a> Property: Type

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MemberType_type" title="#prop_MemberType_type">dmlex:type</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type</a> | Type | schema:Text | <a href="#class_MemberType" title="#class_MemberType">Member Type</a> |
### <a id="prop_Relation_type" title="#prop_Relation_type"></a> Property: Type

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Relation_type" title="#prop_Relation_type">dmlex:type</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type</a> | Type | schema:Text | <a href="#class_Relation" title="#class_Relation">Relation</a> |
### <a id="prop_RelationType_type" title="#prop_RelationType_type"></a> Property: Type

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_RelationType_type" title="#prop_RelationType_type">dmlex:type</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type</a> | Type | schema:Text | <a href="#class_RelationType" title="#class_RelationType">Relation Type</a> |
### <a id="prop_LabelTag_typeTag" title="#prop_LabelTag_typeTag"></a> Property: Type Tag

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LabelTag_typeTag" title="#prop_LabelTag_typeTag">dmlex:typeTag</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#typeTag" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#typeTag</a> | Type Tag | schema:Text | <a href="#class_LabelTag" title="#class_LabelTag">Label Tag</a> |
### <a id="prop_LexicographicResource_uri" title="#prop_LexicographicResource_uri"></a> Property: URI

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_LexicographicResource_uri" title="#prop_LexicographicResource_uri">dmlex:uri</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#uri" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#uri</a> | URI | schema:URL | <a href="#class_LexicographicResource" title="#class_LexicographicResource">Lexicographic resource</a> |
### <a id="prop_Etymon_when" title="#prop_Etymon_when"></a> Property: When

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Etymon_when" title="#prop_Etymon_when">dmlex:when</a> | <a href="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#when" target="_blank" rel="noopener">https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#when</a> | When | schema:Text | <a href="#class_Etymon" title="#class_Etymon">Etymon</a> |
## Property Values

No PropertyValue entities are defined.


