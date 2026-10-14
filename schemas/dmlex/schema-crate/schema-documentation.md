---
title: DMLex Schema Terms
---

# DMLex Schema Terms

This MASP Schema was auto-generated from the RDF vocabulary of [DMLex](https://docs.oasis-open.org/lexidma/dmlex/v1.0/dmlex-v1.0.html), the OASIS Data Model for Lexicography (v1.0, OASIS Standard), using the `scripts/owl-to-masp.py` script. DMLex models dictionaries ("lexicographic resources"): entries, senses, definitions, examples, pronunciations and inflected forms, plus optional modules for crosslingual (bilingual and multilingual) resources, controlled values, linking between entries and senses, inline annotation, and etymology.

The source is [`dmlex.ttl`](https://docs.oasis-open.org/lexidma/dmlex/v1.0/os/schemas/RDF/dmlex.ttl), the vocabulary file that defines the `https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#` namespace (see the spec's [RDF serialization design principles](https://docs.oasis-open.org/lexidma/dmlex/v1.0/dmlex-v1.0.html)). It combines all six modules; OASIS also publishes them as separate files alongside it.

Conversion notes:

- DMLex links into the W3C OntoLex-Lemon model (e.g. `Entry` is a subclass of `ontolex:LexicalEntry`); those OntoLex terms are referenced by IRI but not documented here.
- Converted with `--flatten-mixins`. DMLex gives properties shared by several classes an undocumented "Has…" mixin class as their domain (e.g. `label` has domain `HasLabel`, a superclass of `Entry`, `Sense`, `Example` and others). Here those mixins are dropped and each property is put directly on the classes that use it, so `Entry` lists all of its properties itself.
- Some apparent errors in `dmlex.ttl` show through:
  - `InflectedFormTag`, `LabelTag`, `PartOfSpeechTag` and `TranscriptionSchemeTag` are declared as subclasses of `HasInflectedForm`, which gives them the `inflectedForm` property. This looks like a typo for `HasForHeadwords`.
  - Nothing is declared as a subclass of `HasForHeadwords`, so `forHeadwords` and `forTranslations` are put on the classes that restrict them (the four tag classes above). `forLanguage` has no such restriction, so it has no domain here.
  - `ItemMarker` is declared only as a subclass of `HasLemma` and is not used anywhere else, so it is not included.
- Converted with `--describe-restrictions`. DMLex expresses arity ("exactly 1 `headword`" on `Entry`, "at most 1 `title`" on `LexicographicResource`, …) as 101 OWL class restrictions. A schema can't enforce these per class, so each class's description ends with them as "Constraints: …", and the property tables show every property as not required. The draft [LDAC-DMLex profile](../../profiles/ldac-dmlex/profile-crate/index.html) carries them as real, per-class cardinality rules. The [DMLex spec](https://docs.oasis-open.org/lexidma/dmlex/v1.0/dmlex-v1.0.html) and its SHACL shapes ([`dmlex.shacl`](https://docs.oasis-open.org/lexidma/dmlex/v1.0/os/schemas/RDF/dmlex.shacl)) give the same arities.
- `dmlex.ttl` differs slightly from the separate module files: `MemberType` allows at most one `role` (exactly one in the Linking module file), and `Etymon` is not a subclass of `HasTranslation` (it is in the Etymology module file).

## All Rules:

## Types of entities (specializations of Classes) and expected Properties


### <a id="CollocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#CollocateMarker"></a> Class: Collocate Marker <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#CollocateMarker)</small>

Term: `CollocateMarker`

Marks up a substring other than the headword inside an example, inside an example translation or inside a definition. Constraints: exactly 1 endIndex; at most 1 lemma; exactly 1 startIndex.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Collocate Marker

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label">label</a> | No | Label | <a href="#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label">Label</a> |  |
| <a href="#lemma" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#lemma">lemma</a> | No | Lemma | schema:Text |  |


### <a id="Definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Definition"></a> Class: Definition <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Definition)</small>

Represents one of possibly several definitions of a sense. Constraints: at most 1 definitionType; exactly 1 listingOrder; exactly 1 text.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Definition

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#collocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker">collocateMarker</a> | No | Collocate Marker | <a href="#CollocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#CollocateMarker">Collocate Marker</a> |  |
| <a href="#definitionType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionType">definitionType</a> | No | Definition Type | <a href="#DefinitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#DefinitionTypeTag">Definition Type Tag</a> |  |
| <a href="#headwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker">headwordMarker</a> | No | Headword Marker | <a href="#HeadwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordMarker">Headword Marker</a> |  |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#text" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text">text</a> | No | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="DefinitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#DefinitionTypeTag"></a> Class: Definition Type Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#DefinitionTypeTag)</small>

Term: `DefinitionTypeTag`

Represents one (of many) possible values for definitionType of definition. Constraints: at most 1 description; exactly 1 tag.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Definition Type Tag

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#sameAs" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs">sameAs</a> | No | Same As |  |  |
| <a href="#tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag">tag</a> | No | Tag |  |  |


### <a id="Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry"></a> Class: Entry <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry)</small>

Represents a dictionary entry. Constraints: exactly 1 headword; at most 1 homographNumber.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Entry

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#etymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymology">etymology</a> | No | Etymology | <a href="#Etymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymology">Etymology</a> |  |
| <a href="#headword" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headword">headword</a> | No | Headword | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#homographNumber" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#homographNumber">homographNumber</a> | No | Homograph Number | schema:Integer |  |
| <a href="#inflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm">inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a> |  |
| <a href="#label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label">label</a> | No | Label | <a href="#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label">Label</a> |  |
| <a href="#partOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech">partOfSpeech</a> | No | Part of Speech | <a href="#PartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeech">Part of Speech</a> |  |
| <a href="#placeholderMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker">placeholderMarker</a> | No | Placeholder Marker | <a href="#PlaceholderMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PlaceholderMarker">Placeholder Marker</a> |  |
| <a href="#pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation">pronunciation</a> | No | Pronunciation | <a href="#Pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation">Pronunciation</a> |  |
| <a href="#sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sense">sense</a> | No | Sense. A sub-property of evokes. | <a href="#Sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense">Sense</a> |  |


### <a id="Etymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymology"></a> Class: Etymology <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymology)</small>

Represents a chain of historical derivations of a word. Constraints: at most 1 description; exactly 1 listingOrder.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Etymology

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymon">etymon</a> | No | Etymon | <a href="#Etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymon">Etymon</a> |  |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |


### <a id="Etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymon"></a> Class: Etymon <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymon)</small>

Represents one stage (of possibly several) in the etymological history of the headword. Constraints: at least 1 etymonUnit; exactly 1 listingOrder; at most 1 note; at most 1 translation; at most 1 type; at most 1 when.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Etymon

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#etymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonUnit">etymonUnit</a> | No | Etymon Unit | <a href="#EtymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit">Etymon Unit</a> |  |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#note" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#note">note</a> | No | Note | schema:Text |  |
| <a href="#type" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type">type</a> | No | Type | schema:Text |  |
| <a href="#when" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#when">when</a> | No | When | schema:Text |  |


### <a id="EtymonLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonLanguage"></a> Class: Etymon Language <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonLanguage)</small>

Term: `EtymonLanguage`

Represents one of several allowed values for the language property of etymonUnit objects. Constraints: at most 1 displayName; exactly 1 langCode.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Etymon Language

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#displayName" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#displayName">displayName</a> | No | Display Name | schema:Text |  |
| <a href="#langCode" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode">langCode</a> | No | Language. A sub-property of language. | schema:Text |  |
| <a href="#sameAs" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs">sameAs</a> | No | Same As |  |  |


### <a id="EtymonType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonType"></a> Class: Etymon Type <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonType)</small>

Term: `EtymonType`

Represents one of possible values for the type of etymon. Constraints: at most 1 description; exactly 1 type.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Etymon Type

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#sameAs" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs">sameAs</a> | No | Same As |  |  |
| <a href="#type" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type">type</a> | No | Type | schema:Text |  |


### <a id="EtymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit"></a> Class: Etymon Unit <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit)</small>

Term: `EtymonUnit`

Represents a form (typically a word) which is the etymological origin of the headword, or another etymologically related form. Constraints: exactly 1 language; exactly 1 listingOrder; at most 1 reconstructed; exactly 1 text; at most 1 translation.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Etymon Unit

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#langCode" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode">langCode</a> | No | Language. A sub-property of language. | schema:Text |  |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#partOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech">partOfSpeech</a> | No | Part of Speech | <a href="#PartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeech">Part of Speech</a> |  |
| <a href="#reconstructed" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#reconstructed">reconstructed</a> | No | Reconstructed | schema:Boolean |  |
| <a href="#text" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text">text</a> | No | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#translation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation">translation</a> | No | Translation | schema:Text |  |


### <a id="Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example"></a> Class: Example <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example)</small>

Represents a sentence or other text fragment which illustrates the headword being used. Constraints: exactly 1 listingOrder; at most 1 soundFile; at most 1 sourceElaboration; at most 1 sourceIdentity; exactly 1 text.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Example

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#collocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker">collocateMarker</a> | No | Collocate Marker | <a href="#CollocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#CollocateMarker">Collocate Marker</a> |  |
| <a href="#exampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#exampleTranslation">exampleTranslation</a> | No | Example Translation | <a href="#ExampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation">Example Translation</a> |  |
| <a href="#headwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker">headwordMarker</a> | No | Headword Marker | <a href="#HeadwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordMarker">Headword Marker</a> |  |
| <a href="#label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label">label</a> | No | Label | <a href="#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label">Label</a> |  |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#soundFile" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile">soundFile</a> | No | Sound File | schema:URL |  |
| <a href="#sourceElaboration" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceElaboration">sourceElaboration</a> | No | Source Elaboration | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#sourceIdentity" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentity">sourceIdentity</a> | No | Source Identity | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#text" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text">text</a> | No | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="ExampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation"></a> Class: Example Translation <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation)</small>

Term: `ExampleTranslation`

Represents the translation of an example. Constraints: at most 1 language; exactly 1 text.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Example Translation

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#collocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker">collocateMarker</a> | No | Collocate Marker | <a href="#CollocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#CollocateMarker">Collocate Marker</a> |  |
| <a href="#headwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker">headwordMarker</a> | No | Headword Marker | <a href="#HeadwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordMarker">Headword Marker</a> |  |
| <a href="#label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label">label</a> | No | Label | <a href="#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label">Label</a> |  |
| <a href="#langCode" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode">langCode</a> | No | Language. A sub-property of language. | schema:Text |  |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#soundFile" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile">soundFile</a> | No | Sound File | schema:URL |  |
| <a href="#text" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text">text</a> | No | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="HeadwordExplanation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordExplanation"></a> Class: Headword Explanation <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordExplanation)</small>

Term: `HeadwordExplanation`

Represents a statement in the translation language which explains (but does not translate) the meaning of the headword. Constraints: at most 1 language; exactly 1 text.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Headword Explanation

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#langCode" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode">langCode</a> | No | Language. A sub-property of language. | schema:Text |  |
| <a href="#text" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text">text</a> | No | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="HeadwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordMarker"></a> Class: Headword Marker <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordMarker)</small>

Term: `HeadwordMarker`

Marks up a substring inside an example, inside an example translation or inside a definition which corresponds to the headword (or to a translation of the headword). Constraints: exactly 1 endIndex; exactly 1 startIndex.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Headword Marker

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#endIndex" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex">endIndex</a> | No | End Index | schema:Text |  |
| <a href="#startIndex" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex">startIndex</a> | No | Start Index | schema:Text |  |


### <a id="HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation"></a> Class: Headword Translation <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation)</small>

Term: `HeadwordTranslation`

Represents one of possibly multiple translations of a headword. Constraints: at most 1 language; exactly 1 listingOrder; exactly 1 text.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Headword Translation

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#inflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm">inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a> |  |
| <a href="#label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label">label</a> | No | Label | <a href="#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label">Label</a> |  |
| <a href="#langCode" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode">langCode</a> | No | Language. A sub-property of language. | schema:Text |  |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#partOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech">partOfSpeech</a> | No | Part of Speech | <a href="#PartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeech">Part of Speech</a> |  |
| <a href="#placeholderMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker">placeholderMarker</a> | No | Placeholder Marker | <a href="#PlaceholderMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PlaceholderMarker">Placeholder Marker</a> |  |
| <a href="#pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation">pronunciation</a> | No | Pronunciation | <a href="#Pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation">Pronunciation</a> |  |
| <a href="#text" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text">text</a> | No | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm"></a> Class: Inflected Form <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm)</small>

Term: `InflectedForm`

Represents one (of possibly many) inflected forms of the headword. Constraints: exactly 1 listingOrder; at most 1 tag; exactly 1 text.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Inflected Form

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label">label</a> | No | Label | <a href="#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label">Label</a> |  |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation">pronunciation</a> | No | Pronunciation | <a href="#Pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation">Pronunciation</a> |  |
| <a href="#tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag">tag</a> | No | Tag |  |  |
| <a href="#text" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text">text</a> | No | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="InflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag"></a> Class: Inflected Form Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag)</small>

Term: `InflectedFormTag`

Represents one (of many) possible values for tag of inflectedForm. Constraints: at most 1 description; at most 1 forHeadwords; at most 1 forTranslations; exactly 1 tag.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Inflected Form Tag

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#forHeadwords" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords">forHeadwords</a> | No | For Headwords | schema:Boolean |  |
| <a href="#forPartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech">forPartOfSpeech</a> | No | For Part of Speech | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#forTranslations" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations">forTranslations</a> | No | For Translations | schema:Boolean |  |
| <a href="#inflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm">inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a> |  |
| <a href="#sameAs" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs">sameAs</a> | No | Same As |  |  |
| <a href="#tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag">tag</a> | No | Tag |  |  |


### <a id="Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label"></a> Class: Label <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label)</small>

Represents a restriction on its parent such as temporal (old-fashioned, neologism), regional (dialect), register (formal, colloquial), domain (medicine, politics) or grammar (singular-only). Constraints: exactly 1 listingOrder; exactly 1 tag.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Label

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag">tag</a> | No | Tag |  |  |


### <a id="LabelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag"></a> Class: Label Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag)</small>

Term: `LabelTag`

Represents one (of many) possible values for tag of label. Constraints: at most 1 description; at most 1 forCollocates; at most 1 forHeadwords; at most 1 forTranslations; exactly 1 tag; at most 1 typeTag.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Label Tag

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#forCollocates" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forCollocates">forCollocates</a> | No | For Collocates | schema:Boolean |  |
| <a href="#forHeadwords" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords">forHeadwords</a> | No | For Headwords | schema:Boolean |  |
| <a href="#forPartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech">forPartOfSpeech</a> | No | For Part of Speech | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#forTranslations" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations">forTranslations</a> | No | For Translations | schema:Boolean |  |
| <a href="#inflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm">inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a> |  |
| <a href="#sameAs" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs">sameAs</a> | No | Same As |  |  |
| <a href="#tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag">tag</a> | No | Tag |  |  |


### <a id="LabelTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTypeTag"></a> Class: Label Type Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTypeTag)</small>

Term: `LabelTypeTag`

Represents one (of many) possible values for typeTag of labelTag. Constraints: exactly 1 description; exactly 1 tag.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Label Type Tag

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag">tag</a> | No | Tag |  |  |


### <a id="LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource"></a> Class: Lexicographic resource <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource)</small>

Term: `LexicographicResource`

Represents a dictionary. Constraints: exactly 1 langCode; at most 1 title; at most 1 uri.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Lexicographic resource

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#definitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionTypeTag">definitionTypeTag</a> | No | Definition Type Tag | <a href="#DefinitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#DefinitionTypeTag">Definition Type Tag</a> |  |
| <a href="#entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#entry">entry</a> | No | Entry. A sub-property of entry. | <a href="#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry">Entry</a> |  |
| <a href="#etymonLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonLanguage">etymonLanguage</a> | No | Etymon Language | <a href="#EtymonLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonLanguage">Etymon Language</a> |  |
| <a href="#etymonType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonType">etymonType</a> | No | Etymon Type | <a href="#EtymonType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonType">Etymon Type</a> |  |
| <a href="#inflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedFormTag">inflectedFormTag</a> | No | Inflected Form Tag | <a href="#InflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag">Inflected Form Tag</a> |  |
| <a href="#labelTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#labelTypeTag">labelTypeTag</a> | No | Label Type Tag | <a href="#LabelTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTypeTag">Label Type Tag</a> |  |
| <a href="#langCode" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode">langCode</a> | No | Language. A sub-property of language. | schema:Text |  |
| <a href="#partOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeechTag">partOfSpeechTag</a> | No | Part of Speech Tag | <a href="#PartOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag">Part of Speech Tag</a> |  |
| <a href="#relation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relation">relation</a> | No | Relation | <a href="#Relation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Relation">Relation</a> |  |
| <a href="#relationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relationType">relationType</a> | No | RelationType | <a href="#RelationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#RelationType">Relation Type</a> |  |
| <a href="#sourceIdentityTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentityTag">sourceIdentityTag</a> | No | Source Identity Tag | <a href="#SourceIdentityTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#SourceIdentityTag">Source Identity Tag</a> |  |
| <a href="#title" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#title">title</a> | No | Title | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#transcriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcriptionSchemeTag">transcriptionSchemeTag</a> | No | Transcription Scheme Tag | <a href="#TranscriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranscriptionSchemeTag">Transcription Scheme Tag</a> |  |
| <a href="#translationLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translationLanguage">translationLanguage</a> | No | Translation Language | <a href="#TranslationLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranslationLanguage">TranslationLanguage</a> |  |
| <a href="#uri" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#uri">uri</a> | No | URI | schema:URL |  |


### <a id="Member" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Member"></a> Class: Member <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Member)</small>

Represents the fact that an object, such as an entry or a sense, is a member of a relation. Constraints: exactly 1 listingOrder; at most 1 obverseListingOrder; exactly 1 ref; at most 1 role.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Member

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#obverseListingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#obverseListingOrder">obverseListingOrder</a> | No | Obverse Listing Order | schema:Integer |  |
| <a href="#ref" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ref">ref</a> | No | Ref | schema:Text |  |
| <a href="#role" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role">role</a> | No | Role | schema:Text |  |


### <a id="MemberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType"></a> Class: Member Type <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType)</small>

Term: `MemberType`

Represents one of possible values for the role of member, as well as various restrictions on members having this role. Constraints: at most 1 action; at most 1 description; at most 1 max; at most 1 min; at most 1 role; exactly 1 type.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Member Type

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#action" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#action">action</a> | No | Action | schema:Text |  |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#max" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#max">max</a> | No | Max | schema:Integer |  |
| <a href="#min" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#min">min</a> | No | Min | schema:Integer |  |
| <a href="#role" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role">role</a> | No | Role | schema:Text |  |
| <a href="#sameAs" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs">sameAs</a> | No | Same As |  |  |
| <a href="#type" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type">type</a> | No | Type | schema:Text |  |


### <a id="PartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeech"></a> Class: Part of Speech <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeech)</small>

Term: `PartOfSpeech`

Represents a part of speech label. Constraints: exactly 1 listingOrder; exactly 1 tag.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Part of Speech

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag">tag</a> | No | Tag |  |  |


### <a id="PartOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag"></a> Class: Part of Speech Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag)</small>

Term: `PartOfSpeechTag`

Represents one (of many) possible values for tag of partOfSpeech. Constraints: at most 1 description; at most 1 forEtymology; at most 1 forHeadwords; at most 1 forTranslations; exactly 1 tag.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Part of Speech Tag

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#forEtymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forEtymology">forEtymology</a> | No | For Etymology | schema:Boolean |  |
| <a href="#forHeadwords" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords">forHeadwords</a> | No | For Headwords | schema:Boolean |  |
| <a href="#forTranslations" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations">forTranslations</a> | No | For Translations | schema:Boolean |  |
| <a href="#inflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm">inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a> |  |
| <a href="#sameAs" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs">sameAs</a> | No | Same As |  |  |
| <a href="#tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag">tag</a> | No | Tag |  |  |


### <a id="PlaceholderMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PlaceholderMarker"></a> Class: Placeholder Marker <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PlaceholderMarker)</small>

Term: `PlaceholderMarker`

Marks up a substring inside a headword or inside a headword translation which is not part of the expression itself but stands for things that can take its place. Constraints: exactly 1 endIndex; exactly 1 startIndex.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Placeholder Marker

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#endIndex" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex">endIndex</a> | No | End Index | schema:Text |  |
| <a href="#startIndex" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex">startIndex</a> | No | Start Index | schema:Text |  |


### <a id="Pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation"></a> Class: Pronunciation <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation)</small>

Represents the pronunciation of its parent. Pronunciations must have either a sound file or a transcription. Constraints: exactly 1 listingOrder; at most 1 soundFile.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Pronunciation

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label">label</a> | No | Label | <a href="#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label">Label</a> |  |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#soundFile" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile">soundFile</a> | No | Sound File | schema:URL |  |
| <a href="#transcription" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcription">transcription</a> | No | Transcription | <a href="#Transcription" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Transcription">Transcription</a> |  |


### <a id="Relation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Relation"></a> Class: Relation <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Relation)</small>

Represents the fact that a relation exists between two or more objects. Constraints: at most 1 description; at least 2 member; exactly 1 type.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Relation

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#member" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#member">member</a> | No | Member | <a href="#Member" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Member">Member</a> |  |
| <a href="#type" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type">type</a> | No | Type | schema:Text |  |


### <a id="RelationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#RelationType"></a> Class: Relation Type <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#RelationType)</small>

Term: `RelationType`

Represents one of possible values for the type of relation. Constraints: at most 1 description; at most 1 scope; exactly 1 type.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Relation Type

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#memberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#memberType">memberType</a> | No | Member Type | <a href="#MemberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType">Member Type</a> |  |
| <a href="#sameAs" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs">sameAs</a> | No | Same As |  |  |
| <a href="#scope" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scope">scope</a> | No | Scope | schema:Text |  |
| <a href="#type" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type">type</a> | No | Type | schema:Text |  |


### <a id="Sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense"></a> Class: Sense <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense)</small>

Represents one of possibly many meanings (or meaning potentials) of the headword. Constraints: at most 1 indicator; exactly 1 listingOrder.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Sense

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definition">definition</a> | No | Definition | <a href="#Definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Definition">Definition</a> |  |
| <a href="#example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#example">example</a> | No | Example | <a href="#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example">Example</a> |  |
| <a href="#headwordExplanation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordExplanation">headwordExplanation</a> | No | Headword Explanation | <a href="#HeadwordExplanation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordExplanation">Headword Explanation</a> |  |
| <a href="#headwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordTranslation">headwordTranslation</a> | No | Headword Translation | <a href="#HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation">Headword Translation</a> |  |
| <a href="#indicator" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#indicator">indicator</a> | No | Indicator | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label">label</a> | No | Label | <a href="#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label">Label</a> |  |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |


### <a id="SourceIdentityTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#SourceIdentityTag"></a> Class: Source Identity Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#SourceIdentityTag)</small>

Term: `SourceIdentityTag`

Represents one (of many) possible values for sourceIdentity of example. Constraints: at most 1 description; exactly 1 tag.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Source Identity Tag

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#sameAs" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs">sameAs</a> | No | Same As |  |  |
| <a href="#tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag">tag</a> | No | Tag |  |  |


### <a id="Transcription" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Transcription"></a> Class: Transcription <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Transcription)</small>

Represents the transcription of a pronunciation in some notation such as IPA. Constraints: exactly 1 listingOrder; at most 1 scheme; exactly 1 text.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Transcription

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |
| <a href="#scheme" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scheme">scheme</a> | No | Scheme | schema:Text |  |
| <a href="#text" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text">text</a> | No | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="TranscriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranscriptionSchemeTag"></a> Class: Transcription Scheme Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranscriptionSchemeTag)</small>

Term: `TranscriptionSchemeTag`

Represents one (of many) possible values for scheme of transcription. Constraints: at most 1 description; at most 1 forHeadwords; at most 1 forTranslations; exactly 1 tag.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Transcription Scheme Tag

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | No | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#forHeadwords" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords">forHeadwords</a> | No | For Headwords | schema:Boolean |  |
| <a href="#forTranslations" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations">forTranslations</a> | No | For Translations | schema:Boolean |  |
| <a href="#inflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm">inflectedForm</a> | No | Inflected Form. A sub-property of otherForm. | <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a> |  |
| <a href="#tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag">tag</a> | No | Tag |  |  |


### <a id="TranslationLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranslationLanguage"></a> Class: TranslationLanguage <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranslationLanguage)</small>

Represents one of the languages in which translations are given in this lexicographic resource. Constraints: exactly 1 langCode; exactly 1 listingOrder.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from TranslationLanguage

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#langCode" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode">langCode</a> | No | Language. A sub-property of language. | schema:Text |  |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | No | Listing Order | schema:Integer |  |

## All Properties

### <a id="action" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#action"></a> Property: Action <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#action)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#action" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#action">action</a> | Action | schema:Text | <a href="#MemberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType">Member Type</a> |
### <a id="collocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker"></a> Property: Collocate Marker <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#collocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#collocateMarker">collocateMarker</a> | Collocate Marker | <a href="#CollocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#CollocateMarker">Collocate Marker</a> | <a href="#Definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Definition">Definition</a>, <a href="#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example">Example</a>, <a href="#ExampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation">Example Translation</a> |
### <a id="definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definition"></a> Property: Definition <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definition)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definition">definition</a> | Definition | <a href="#Definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Definition">Definition</a> | <a href="#Sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense">Sense</a> |
### <a id="definitionType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionType"></a> Property: Definition Type <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#definitionType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionType">definitionType</a> | Definition Type | <a href="#DefinitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#DefinitionTypeTag">Definition Type Tag</a> | <a href="#Definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Definition">Definition</a> |
### <a id="definitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionTypeTag"></a> Property: Definition Type Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionTypeTag)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#definitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#definitionTypeTag">definitionTypeTag</a> | Definition Type Tag | <a href="#DefinitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#DefinitionTypeTag">Definition Type Tag</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description"></a> Property: Description <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#description" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#description">description</a> | Description | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#DefinitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#DefinitionTypeTag">Definition Type Tag</a>, <a href="#Etymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymology">Etymology</a>, <a href="#EtymonType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonType">Etymon Type</a>, <a href="#InflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag">Inflected Form Tag</a>, <a href="#LabelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag">Label Tag</a>, <a href="#LabelTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTypeTag">Label Type Tag</a>, <a href="#MemberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType">Member Type</a>, <a href="#PartOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag">Part of Speech Tag</a>, <a href="#Relation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Relation">Relation</a>, <a href="#RelationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#RelationType">Relation Type</a>, <a href="#SourceIdentityTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#SourceIdentityTag">Source Identity Tag</a>, <a href="#TranscriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranscriptionSchemeTag">Transcription Scheme Tag</a> |
### <a id="displayName" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#displayName"></a> Property: Display Name <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#displayName)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#displayName" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#displayName">displayName</a> | Display Name | schema:Text | <a href="#EtymonLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonLanguage">Etymon Language</a> |
### <a id="endIndex" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex"></a> Property: End Index <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#endIndex" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#endIndex">endIndex</a> | End Index | schema:Text | <a href="#HeadwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordMarker">Headword Marker</a>, <a href="#PlaceholderMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PlaceholderMarker">Placeholder Marker</a> |
### <a id="entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#entry"></a> Property: Entry <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#entry)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#entry">entry</a> | Entry. A sub-property of entry. | <a href="#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry">Entry</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="etymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymology"></a> Property: Etymology <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymology)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#etymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymology">etymology</a> | Etymology | <a href="#Etymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymology">Etymology</a> | <a href="#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry">Entry</a> |
### <a id="etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymon"></a> Property: Etymon <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymon)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymon">etymon</a> | Etymon | <a href="#Etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymon">Etymon</a> | <a href="#Etymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymology">Etymology</a> |
### <a id="etymonLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonLanguage"></a> Property: Etymon Language <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonLanguage)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#etymonLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonLanguage">etymonLanguage</a> | Etymon Language | <a href="#EtymonLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonLanguage">Etymon Language</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="etymonType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonType"></a> Property: Etymon Type <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#etymonType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonType">etymonType</a> | Etymon Type | <a href="#EtymonType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonType">Etymon Type</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="etymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonUnit"></a> Property: Etymon Unit <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonUnit)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#etymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#etymonUnit">etymonUnit</a> | Etymon Unit | <a href="#EtymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit">Etymon Unit</a> | <a href="#Etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymon">Etymon</a> |
### <a id="example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#example"></a> Property: Example <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#example)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#example">example</a> | Example | <a href="#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example">Example</a> | <a href="#Sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense">Sense</a> |
### <a id="exampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#exampleTranslation"></a> Property: Example Translation <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#exampleTranslation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#exampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#exampleTranslation">exampleTranslation</a> | Example Translation | <a href="#ExampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation">Example Translation</a> | <a href="#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example">Example</a> |
### <a id="forCollocates" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forCollocates"></a> Property: For Collocates <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forCollocates)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#forCollocates" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forCollocates">forCollocates</a> | For Collocates | schema:Boolean | <a href="#LabelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag">Label Tag</a> |
### <a id="forEtymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forEtymology"></a> Property: For Etymology <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forEtymology)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#forEtymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forEtymology">forEtymology</a> | For Etymology | schema:Boolean | <a href="#PartOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag">Part of Speech Tag</a> |
### <a id="forHeadwords" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords"></a> Property: For Headwords <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#forHeadwords" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forHeadwords">forHeadwords</a> | For Headwords | schema:Boolean | <a href="#InflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag">Inflected Form Tag</a>, <a href="#LabelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag">Label Tag</a>, <a href="#PartOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag">Part of Speech Tag</a>, <a href="#TranscriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranscriptionSchemeTag">Transcription Scheme Tag</a> |
### <a id="forLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forLanguage"></a> Property: For Language <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forLanguage)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#forLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forLanguage">forLanguage</a> | For Language | schema:Text |  |
### <a id="forPartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech"></a> Property: For Part of Speech <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#forPartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forPartOfSpeech">forPartOfSpeech</a> | For Part of Speech | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#InflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag">Inflected Form Tag</a>, <a href="#LabelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag">Label Tag</a> |
### <a id="forTranslations" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations"></a> Property: For Translations <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#forTranslations" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#forTranslations">forTranslations</a> | For Translations | schema:Boolean | <a href="#InflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag">Inflected Form Tag</a>, <a href="#LabelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag">Label Tag</a>, <a href="#PartOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag">Part of Speech Tag</a>, <a href="#TranscriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranscriptionSchemeTag">Transcription Scheme Tag</a> |
### <a id="headword" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headword"></a> Property: Headword <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headword)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#headword" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headword">headword</a> | Headword | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry">Entry</a> |
### <a id="headwordExplanation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordExplanation"></a> Property: Headword Explanation <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordExplanation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#headwordExplanation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordExplanation">headwordExplanation</a> | Headword Explanation | <a href="#HeadwordExplanation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordExplanation">Headword Explanation</a> | <a href="#Sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense">Sense</a> |
### <a id="headwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker"></a> Property: Headword Marker <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#headwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordMarker">headwordMarker</a> | Headword Marker | <a href="#HeadwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordMarker">Headword Marker</a> | <a href="#Definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Definition">Definition</a>, <a href="#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example">Example</a>, <a href="#ExampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation">Example Translation</a> |
### <a id="headwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordTranslation"></a> Property: Headword Translation <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordTranslation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#headwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#headwordTranslation">headwordTranslation</a> | Headword Translation | <a href="#HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation">Headword Translation</a> | <a href="#Sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense">Sense</a> |
### <a id="homographNumber" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#homographNumber"></a> Property: Homograph Number <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#homographNumber)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#homographNumber" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#homographNumber">homographNumber</a> | Homograph Number | schema:Integer | <a href="#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry">Entry</a> |
### <a id="indicator" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#indicator"></a> Property: Indicator <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#indicator)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#indicator" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#indicator">indicator</a> | Indicator | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense">Sense</a> |
### <a id="inflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm"></a> Property: Inflected Form <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#inflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedForm">inflectedForm</a> | Inflected Form. A sub-property of otherForm. | <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a> | <a href="#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry">Entry</a>, <a href="#HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation">Headword Translation</a>, <a href="#InflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag">Inflected Form Tag</a>, <a href="#LabelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag">Label Tag</a>, <a href="#PartOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag">Part of Speech Tag</a>, <a href="#TranscriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranscriptionSchemeTag">Transcription Scheme Tag</a> |
### <a id="inflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedFormTag"></a> Property: Inflected Form Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedFormTag)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#inflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#inflectedFormTag">inflectedFormTag</a> | Inflected Form Tag | <a href="#InflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag">Inflected Form Tag</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label"></a> Property: Label <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#label">label</a> | Label | <a href="#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label">Label</a> | <a href="#CollocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#CollocateMarker">Collocate Marker</a>, <a href="#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry">Entry</a>, <a href="#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example">Example</a>, <a href="#ExampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation">Example Translation</a>, <a href="#HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation">Headword Translation</a>, <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a>, <a href="#Pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation">Pronunciation</a>, <a href="#Sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense">Sense</a> |
### <a id="labelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#labelTag"></a> Property: Label Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#labelTag)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#labelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#labelTag">labelTag</a> | Label Tag | <a href="#LabelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag">Label Tag</a> |  |
### <a id="labelTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#labelTypeTag"></a> Property: Label Type Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#labelTypeTag)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#labelTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#labelTypeTag">labelTypeTag</a> | Label Type Tag | <a href="#LabelTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTypeTag">Label Type Tag</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="langCode" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode"></a> Property: Language <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#langCode" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#langCode">langCode</a> | Language. A sub-property of language. | schema:Text | <a href="#EtymonLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonLanguage">Etymon Language</a>, <a href="#EtymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit">Etymon Unit</a>, <a href="#ExampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation">Example Translation</a>, <a href="#HeadwordExplanation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordExplanation">Headword Explanation</a>, <a href="#HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation">Headword Translation</a>, <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a>, <a href="#TranslationLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranslationLanguage">TranslationLanguage</a> |
### <a id="lemma" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#lemma"></a> Property: Lemma <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#lemma)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#lemma" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#lemma">lemma</a> | Lemma | schema:Text | <a href="#CollocateMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#CollocateMarker">Collocate Marker</a> |
### <a id="listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder"></a> Property: Listing Order <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#listingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#listingOrder">listingOrder</a> | Listing Order | schema:Integer | <a href="#Definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Definition">Definition</a>, <a href="#Etymology" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymology">Etymology</a>, <a href="#Etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymon">Etymon</a>, <a href="#EtymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit">Etymon Unit</a>, <a href="#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example">Example</a>, <a href="#ExampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation">Example Translation</a>, <a href="#HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation">Headword Translation</a>, <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a>, <a href="#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label">Label</a>, <a href="#Member" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Member">Member</a>, <a href="#PartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeech">Part of Speech</a>, <a href="#Pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation">Pronunciation</a>, <a href="#Sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense">Sense</a>, <a href="#Transcription" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Transcription">Transcription</a>, <a href="#TranslationLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranslationLanguage">TranslationLanguage</a> |
### <a id="max" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#max"></a> Property: Max <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#max)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#max" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#max">max</a> | Max | schema:Integer | <a href="#MemberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType">Member Type</a> |
### <a id="member" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#member"></a> Property: Member <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#member)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#member" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#member">member</a> | Member | <a href="#Member" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Member">Member</a> | <a href="#Relation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Relation">Relation</a> |
### <a id="memberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#memberType"></a> Property: Member Type <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#memberType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#memberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#memberType">memberType</a> | Member Type | <a href="#MemberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType">Member Type</a> | <a href="#RelationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#RelationType">Relation Type</a> |
### <a id="min" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#min"></a> Property: Min <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#min)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#min" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#min">min</a> | Min | schema:Integer | <a href="#MemberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType">Member Type</a> |
### <a id="note" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#note"></a> Property: Note <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#note)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#note" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#note">note</a> | Note | schema:Text | <a href="#Etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymon">Etymon</a> |
### <a id="obverseListingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#obverseListingOrder"></a> Property: Obverse Listing Order <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#obverseListingOrder)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#obverseListingOrder" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#obverseListingOrder">obverseListingOrder</a> | Obverse Listing Order | schema:Integer | <a href="#Member" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Member">Member</a> |
### <a id="partOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech"></a> Property: Part of Speech <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#partOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeech">partOfSpeech</a> | Part of Speech | <a href="#PartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeech">Part of Speech</a> | <a href="#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry">Entry</a>, <a href="#EtymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit">Etymon Unit</a>, <a href="#HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation">Headword Translation</a> |
### <a id="partOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeechTag"></a> Property: Part of Speech Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeechTag)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#partOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#partOfSpeechTag">partOfSpeechTag</a> | Part of Speech Tag | <a href="#PartOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag">Part of Speech Tag</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="placeholderMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker"></a> Property: Placeholder Marker <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#placeholderMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#placeholderMarker">placeholderMarker</a> | Placeholder Marker | <a href="#PlaceholderMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PlaceholderMarker">Placeholder Marker</a> | <a href="#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry">Entry</a>, <a href="#HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation">Headword Translation</a> |
### <a id="pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation"></a> Property: Pronunciation <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#pronunciation">pronunciation</a> | Pronunciation | <a href="#Pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation">Pronunciation</a> | <a href="#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry">Entry</a>, <a href="#HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation">Headword Translation</a>, <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a> |
### <a id="reconstructed" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#reconstructed"></a> Property: Reconstructed <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#reconstructed)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#reconstructed" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#reconstructed">reconstructed</a> | Reconstructed | schema:Boolean | <a href="#EtymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit">Etymon Unit</a> |
### <a id="ref" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ref"></a> Property: Ref <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ref)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#ref" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ref">ref</a> | Ref | schema:Text | <a href="#Member" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Member">Member</a> |
### <a id="relation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relation"></a> Property: Relation <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#relation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relation">relation</a> | Relation | <a href="#Relation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Relation">Relation</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="relationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relationType"></a> Property: RelationType <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relationType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#relationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#relationType">relationType</a> | RelationType | <a href="#RelationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#RelationType">Relation Type</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="role" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role"></a> Property: Role <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#role" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#role">role</a> | Role | schema:Text | <a href="#Member" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Member">Member</a>, <a href="#MemberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType">Member Type</a> |
### <a id="sameAs" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs"></a> Property: Same As <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sameAs" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sameAs">sameAs</a> | Same As |  | <a href="#DefinitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#DefinitionTypeTag">Definition Type Tag</a>, <a href="#EtymonLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonLanguage">Etymon Language</a>, <a href="#EtymonType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonType">Etymon Type</a>, <a href="#InflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag">Inflected Form Tag</a>, <a href="#LabelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag">Label Tag</a>, <a href="#MemberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType">Member Type</a>, <a href="#PartOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag">Part of Speech Tag</a>, <a href="#RelationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#RelationType">Relation Type</a>, <a href="#SourceIdentityTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#SourceIdentityTag">Source Identity Tag</a> |
### <a id="scheme" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scheme"></a> Property: Scheme <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scheme)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#scheme" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scheme">scheme</a> | Scheme | schema:Text | <a href="#Transcription" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Transcription">Transcription</a> |
### <a id="scope" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scope"></a> Property: Scope <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scope)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#scope" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#scope">scope</a> | Scope | schema:Text | <a href="#RelationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#RelationType">Relation Type</a> |
### <a id="sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sense"></a> Property: Sense <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sense)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sense">sense</a> | Sense. A sub-property of evokes. | <a href="#Sense" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Sense">Sense</a> | <a href="#Entry" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Entry">Entry</a> |
### <a id="soundFile" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile"></a> Property: Sound File <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#soundFile" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#soundFile">soundFile</a> | Sound File | schema:URL | <a href="#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example">Example</a>, <a href="#ExampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation">Example Translation</a>, <a href="#Pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation">Pronunciation</a> |
### <a id="sourceElaboration" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceElaboration"></a> Property: Source Elaboration <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceElaboration)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sourceElaboration" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceElaboration">sourceElaboration</a> | Source Elaboration | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example">Example</a> |
### <a id="sourceIdentity" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentity"></a> Property: Source Identity <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentity)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sourceIdentity" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentity">sourceIdentity</a> | Source Identity | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example">Example</a> |
### <a id="sourceIdentityTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentityTag"></a> Property: Source Identity Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentityTag)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sourceIdentityTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#sourceIdentityTag">sourceIdentityTag</a> | Source Identity Tag | <a href="#SourceIdentityTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#SourceIdentityTag">Source Identity Tag</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="startIndex" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex"></a> Property: Start Index <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#startIndex" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#startIndex">startIndex</a> | Start Index | schema:Text | <a href="#HeadwordMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordMarker">Headword Marker</a>, <a href="#PlaceholderMarker" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PlaceholderMarker">Placeholder Marker</a> |
### <a id="tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag"></a> Property: Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#tag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#tag">tag</a> | Tag |  | <a href="#DefinitionTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#DefinitionTypeTag">Definition Type Tag</a>, <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a>, <a href="#InflectedFormTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedFormTag">Inflected Form Tag</a>, <a href="#Label" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Label">Label</a>, <a href="#LabelTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTag">Label Tag</a>, <a href="#LabelTypeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LabelTypeTag">Label Type Tag</a>, <a href="#PartOfSpeech" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeech">Part of Speech</a>, <a href="#PartOfSpeechTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#PartOfSpeechTag">Part of Speech Tag</a>, <a href="#SourceIdentityTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#SourceIdentityTag">Source Identity Tag</a>, <a href="#TranscriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranscriptionSchemeTag">Transcription Scheme Tag</a> |
### <a id="text" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text"></a> Property: Text <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#text" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#text">text</a> | Text | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Definition" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Definition">Definition</a>, <a href="#EtymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit">Etymon Unit</a>, <a href="#Example" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Example">Example</a>, <a href="#ExampleTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#ExampleTranslation">Example Translation</a>, <a href="#HeadwordExplanation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordExplanation">Headword Explanation</a>, <a href="#HeadwordTranslation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#HeadwordTranslation">Headword Translation</a>, <a href="#InflectedForm" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#InflectedForm">Inflected Form</a>, <a href="#Transcription" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Transcription">Transcription</a> |
### <a id="title" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#title"></a> Property: Title <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#title)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#title" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#title">title</a> | Title | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="transcription" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcription"></a> Property: Transcription <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcription)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#transcription" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcription">transcription</a> | Transcription | <a href="#Transcription" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Transcription">Transcription</a> | <a href="#Pronunciation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Pronunciation">Pronunciation</a> |
### <a id="transcriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcriptionSchemeTag"></a> Property: Transcription Scheme Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcriptionSchemeTag)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#transcriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#transcriptionSchemeTag">transcriptionSchemeTag</a> | Transcription Scheme Tag | <a href="#TranscriptionSchemeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranscriptionSchemeTag">Transcription Scheme Tag</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="translation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation"></a> Property: Translation <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#translation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translation">translation</a> | Translation | schema:Text | <a href="#EtymonUnit" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonUnit">Etymon Unit</a> |
### <a id="translationLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translationLanguage"></a> Property: Translation Language <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translationLanguage)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#translationLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#translationLanguage">translationLanguage</a> | Translation Language | <a href="#TranslationLanguage" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#TranslationLanguage">TranslationLanguage</a> | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="type" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type"></a> Property: Type <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#type" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#type">type</a> | Type | schema:Text | <a href="#Etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymon">Etymon</a>, <a href="#EtymonType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#EtymonType">Etymon Type</a>, <a href="#MemberType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#MemberType">Member Type</a>, <a href="#Relation" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Relation">Relation</a>, <a href="#RelationType" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#RelationType">Relation Type</a> |
### <a id="typeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#typeTag"></a> Property: Type Tag <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#typeTag)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#typeTag" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#typeTag">typeTag</a> | Type Tag | schema:Text |  |
### <a id="uri" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#uri"></a> Property: URI <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#uri)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#uri" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#uri">uri</a> | URI | schema:URL | <a href="#LexicographicResource" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#LexicographicResource">Lexicographic resource</a> |
### <a id="when" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#when"></a> Property: When <small style="color:#aaa">(https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#when)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#when" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#when">when</a> | When | schema:Text | <a href="#Etymon" title="https://docs.oasis-open.org/lexidma/dmlex/v1.0/schemas/RDF/dmlex.ttl#Etymon">Etymon</a> |
## Property Values

No PropertyValue entities are defined.


