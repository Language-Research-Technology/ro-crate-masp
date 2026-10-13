---
title: lemon Schema Terms
---

# lemon Schema Terms

This MASP Schema was auto-generated from the [lemon](https://lemon-model.net/) (Lexicon Model for Ontologies) RDF vocabulary, [`https://lemon-model.net/lemon.rdf`](https://lemon-model.net/lemon.rdf), using the `scripts/owl-to-masp.py` script. lemon describes lexical information about ontology elements and other RDF resources: lexicons, lexical entries and their forms, senses, syntactic frames, phrase structure and morphology. It is the model that the W3C [OntoLex-Lemon](https://www.w3.org/2016/05/ontolex/) vocabulary was later based on; the terms here are in lemon's own namespace, `http://lemon-model.net/lemon#`.

Conversion notes:

- Labels and comments are in English; lemon's labels in other languages are not carried over.
- Anonymous `owl:Restriction` superclasses (e.g. cardinality constraints on `LexicalEntry` and `Lexicon`) are dropped, as for other converted ontologies.

## All Rules:

## Types of entities (specializations of Classes) and expected Properties


### <a id="Argument" title="http://lemon-model.net/lemon#Argument"></a> Class: Argument <small style="color:#aaa">(http://lemon-model.net/lemon#Argument)</small>

A slot representing a gap that must be filled in realising a lexical entry in a given projection

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Argument

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#marker" title="http://lemon-model.net/lemon#marker">marker</a> | No | Denotes the marker of a semantic argument. This should generally either be a semantic property i.e., case or another lexical entry e.g., a preposition or particle | <a href="#SynRoleMarker" title="http://lemon-model.net/lemon#SynRoleMarker">Syntactic role marker</a> |  |
| <a href="#optional" title="http://lemon-model.net/lemon#optional">optional</a> | No | Denotes that the syntactic argument is optional (may be omitted) | schema:Boolean |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="Component" title="http://lemon-model.net/lemon#Component"></a> Class: Component <small style="color:#aaa">(http://lemon-model.net/lemon#Component)</small>

A constituent element of a lexical entry. This may be a word in a multi-word lexical element or a constituent of a compound word

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Component

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#element" title="http://lemon-model.net/lemon#element">element</a> | No | Denotes the lexical entry represented by the component | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="ComponentList" title="http://lemon-model.net/lemon#ComponentList"></a> Class: ComponentList <small style="color:#aaa">(http://lemon-model.net/lemon#ComponentList)</small>

A node within a list of components. This should generally be a blank node,see rdf:List

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from ComponentList

*No properties defined directly on this class*



### <a id="Form" title="http://lemon-model.net/lemon#Form"></a> Class: Form <small style="color:#aaa">(http://lemon-model.net/lemon#Form)</small>

A given written or spoken realisation of a lexical entry

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Form

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#formVariant" title="http://lemon-model.net/lemon#formVariant">formVariant</a> | No | Form variant | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#representation" title="http://lemon-model.net/lemon#representation">representation</a> | No | A realisation of a given form | schema:Text |  |
| <a href="#writtenRep" title="http://lemon-model.net/lemon#writtenRep">writtenRep</a> | No | Gives the written representation of a given form | schema:Text |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="Frame" title="http://lemon-model.net/lemon#Frame"></a> Class: Frame <small style="color:#aaa">(http://lemon-model.net/lemon#Frame)</small>

A stereotypical example of the usage of a given lexical entry. The most common example of projections are subcategorization frames which describe the slots taken by the arguments of a verb.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Frame

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#synArg" title="http://lemon-model.net/lemon#synArg">synArg</a> | No | Indicates a slot in a syntactic frame | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="HasLanguage" title="http://lemon-model.net/lemon#HasLanguage"></a> Class: HasLanguage <small style="color:#aaa">(http://lemon-model.net/lemon#HasLanguage)</small>

Structural element for all elements that can be tagged with a language

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from HasLanguage

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#language" title="http://lemon-model.net/lemon#language">language</a> | No | The language of a given lexicon. This should be some ISO-639 string | schema:Text |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="HasPattern" title="http://lemon-model.net/lemon#HasPattern"></a> Class: HasPattern <small style="color:#aaa">(http://lemon-model.net/lemon#HasPattern)</small>

HasPattern. A kind of LemonElement.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from HasPattern

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#pattern" title="http://lemon-model.net/lemon#pattern">pattern</a> | No | Pattern | <a href="#MorphPattern" title="http://lemon-model.net/lemon#MorphPattern">Morphological pattern</a> |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="LemonElement" title="http://lemon-model.net/lemon#LemonElement"></a> Class: LemonElement <small style="color:#aaa">(http://lemon-model.net/lemon#LemonElement)</small>



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="LexicalCondition" title="http://lemon-model.net/lemon#LexicalCondition"></a> Class: Lexical Condition <small style="color:#aaa">(http://lemon-model.net/lemon#LexicalCondition)</small>

Term: `LexicalCondition`

An evaluable condition on when a sense applies.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Lexical Condition

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="LexicalContext" title="http://lemon-model.net/lemon#LexicalContext"></a> Class: Lexical Context <small style="color:#aaa">(http://lemon-model.net/lemon#LexicalContext)</small>

Term: `LexicalContext`

Indicates the pragmatic or discourse context in which a sense applies

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Lexical Context

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry"></a> Class: Lexical entry <small style="color:#aaa">(http://lemon-model.net/lemon#LexicalEntry)</small>

Term: `LexicalEntry`

An entry in the lexicon. This may be any morpheme, word, compound, phrase or clause that is included in the lexicon

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Lexical entry

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#abstractForm" title="http://lemon-model.net/lemon#abstractForm">abstractForm</a> | No | A representation of a lexical entry that should not be considered canonical. This is primarily from a linguistic view for non-realisable forms such as stems but may also include misspellings and other unusual forms | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#canonicalForm" title="http://lemon-model.net/lemon#canonicalForm">canonicalForm</a> | No | The canonical ("dictionary") form of the lexical entry. This can be used to indicate the "lemma" form of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#decomposition" title="http://lemon-model.net/lemon#decomposition">decomposition</a> | No | Denotes a component of a lexical entry | <a href="#ComponentList" title="http://lemon-model.net/lemon#ComponentList">ComponentList</a> |  |
| <a href="#lexicalForm" title="http://lemon-model.net/lemon#lexicalForm">lexicalForm</a> | No | Denotes a written representation of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#lexicalVariant" title="http://lemon-model.net/lemon#lexicalVariant">lexicalVariant</a> | No | Indicates a non-semantic relationship between two lexical entries. E.g., a term is derived from another term, such as "lexical" and "lexicalize" | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |  |
| <a href="#otherForm" title="http://lemon-model.net/lemon#otherForm">otherForm</a> | No | A non-preferred ("non-dictionary") representation of a lexical entry. This should be variant that is either a morphological variant, an abbreviation, short form or acronym | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#phraseRoot" title="http://lemon-model.net/lemon#phraseRoot">phraseRoot</a> | No | Indicates the head node of a phrase structure or dependency parse graph | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> |  |
| <a href="#sense" title="http://lemon-model.net/lemon#sense">sense</a> | No | Indicates the sense of a lexical entry | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
| <a href="#synBehavior" title="http://lemon-model.net/lemon#synBehavior">synBehavior</a> | No | Indicates a syntactic behavior of a lexical entry | <a href="#Frame" title="http://lemon-model.net/lemon#Frame">Frame</a> |  |
| <a href="#topic" title="http://lemon-model.net/lemon#topic">topic</a> | No | Indicates the topic of the overrall lexicon, this is property is sometimes called "subject field". Note that in addition to the topic of a lexicon each lexical entry may belong to a given domain, this can be modelled as equal or not equal to the topic of the associated lexicon | <a href="#LexicalTopic" title="http://lemon-model.net/lemon#LexicalTopic">Lexical Topic</a> |  |

#### Properties from HasLanguage

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#language" title="http://lemon-model.net/lemon#language">language</a> | No | The language of a given lexicon. This should be some ISO-639 string | schema:Text |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |

#### Properties from HasPattern

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#pattern" title="http://lemon-model.net/lemon#pattern">pattern</a> | No | Pattern | <a href="#MorphPattern" title="http://lemon-model.net/lemon#MorphPattern">Morphological pattern</a> |  |


### <a id="LexicalSense" title="http://lemon-model.net/lemon#LexicalSense"></a> Class: Lexical sense <small style="color:#aaa">(http://lemon-model.net/lemon#LexicalSense)</small>

Term: `LexicalSense`

Represents the intersection in meaning between the lexical entry and the ontology entity. This is used as the ontology entity and lexical entry may not be in one-to-one correspondence as such the existence of a sense between them states meerly that there are some cases when this lexical entry refer to the ontology entity and vica versa. Mapping elements can be used to further specify this relation

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Lexical sense

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#broader" title="http://lemon-model.net/lemon#broader">broader</a> | No | Denotes that one sense is broader than another. From a lexical point of view this means replacing one lexical entry with another generalizes the meaning of the phrase. From an ontological point of view this property makes not strong assertions. From a mapping point of view if the broader sense applies the narrower sense must also | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
| <a href="#condition" title="http://lemon-model.net/lemon#condition">condition</a> | No | Indicates an evaluable test, the is necessary for this sense to apply | <a href="#LexicalCondition" title="http://lemon-model.net/lemon#LexicalCondition">Lexical Condition</a> |  |
| <a href="#context" title="http://lemon-model.net/lemon#context">context</a> | No | Denotes the pragmatic or discursive context of a sense mapping or a constraint on the mapping by syntactic or semantic properites | <a href="#LexicalContext" title="http://lemon-model.net/lemon#LexicalContext">Lexical Context</a> |  |
| <a href="#definition" title="http://lemon-model.net/lemon#definition">definition</a> | No | Indicates a natural language definition. Note there is a pseudo-node to allow for further description of the definition (e.g., source, creation date etc.). The value property should be used to indicate the string value of the definition. | <a href="#SenseDefinition" title="http://lemon-model.net/lemon#SenseDefinition">Definition</a> |  |
| <a href="#equivalent" title="http://lemon-model.net/lemon#equivalent">equivalent</a> | No | Indicates that two senses are equivalent. From a lexical point of view , this indicates that the lexical entries can be substituted for each other with no change in meaning. From an ontological point of view it means that the two references are not disjoint. From a mapping point of view it means if one mapping apply the other must necessarily apply | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
| <a href="#example" title="http://lemon-model.net/lemon#example">example</a> | No | Example | <a href="#UsageExample" title="http://lemon-model.net/lemon#UsageExample">Usage Example</a> |  |
| <a href="#incompatible" title="http://lemon-model.net/lemon#incompatible">incompatible</a> | No | Says that the two senses are disjoint. From a lexical point of view, this means substituting the lexical entries must change the meaning of the phrase. From an ontological point of view, this property is implied if both references are also disjoint, but does not imply disjointness, but non-equivalence of the references. For the mapping point of view there is not instance when both mappings are valid. | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
| <a href="#isA" title="http://lemon-model.net/lemon#isA">isA</a> | No | Denotes that the single argument of a class predicate is represented in the lexicon by the given semantic argument. That is Class(?x) or ?x rdf:type Class | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> |  |
| <a href="#narrower" title="http://lemon-model.net/lemon#narrower">narrower</a> | No | Denotes that one sense is narrower than another. From a lexical point of view this means replacing one lexical entry with another specializes the meaning of the phrase. From an ontological point of view this property makes not strong assertions. From a mapping point of view if the broader sense applies the narrower sense must also | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
| <a href="#objOfProp" title="http://lemon-model.net/lemon#objOfProp">objOfProp</a> | No | Indicates the semantic argument which represents the objects (ranges) of the property referred to by this sense | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> |  |
| <a href="#propertyDomain" title="http://lemon-model.net/lemon#propertyDomain">propertyDomain</a> | No | Indicates a restrictions on the domain of the property. That is, this sense only applies if the property the sense refers to has a subject in the class referred to by this property |  |  |
| <a href="#propertyRange" title="http://lemon-model.net/lemon#propertyRange">propertyRange</a> | No | Indicates a restrictions on the range of the property. That is, this sense only applies if the property the sense refers to has a object in the class referred to by this property |  |  |
| <a href="#reference" title="http://lemon-model.net/lemon#reference">reference</a> | No | A reference to an external resource |  |  |
| <a href="#semArg" title="http://lemon-model.net/lemon#semArg">semArg</a> | No | Denotes a semantic argument slot of a semantic unit | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> |  |
| <a href="#isSenseOf" title="http://lemon-model.net/lemon#isSenseOf">isSenseOf</a> | No | Indicate that a sense is realised by the given lexical entry | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |  |
| <a href="#senseRelation" title="http://lemon-model.net/lemon#senseRelation">senseRelation</a> | No | Denotes a relationship between senses | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
| <a href="#subjOfProp" title="http://lemon-model.net/lemon#subjOfProp">subjOfProp</a> | No | Indicates the semantic argument which represents the subjects (domain) of the property referred to by this sense | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> |  |
| <a href="#subsense" title="http://lemon-model.net/lemon#subsense">subsense</a> | No | Indicates that the relation between a compound sense and its atomic subsenses | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="LexicalTopic" title="http://lemon-model.net/lemon#LexicalTopic"></a> Class: Lexical Topic <small style="color:#aaa">(http://lemon-model.net/lemon#LexicalTopic)</small>

Term: `LexicalTopic`

Indicates the topic of a lexicon or a lexical entry

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Lexical Topic

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="Lexicon" title="http://lemon-model.net/lemon#Lexicon"></a> Class: Lexicon <small style="color:#aaa">(http://lemon-model.net/lemon#Lexicon)</small>

The lexicon object. This object is specific to the given language and/or domain it describes

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Lexicon

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#entry" title="http://lemon-model.net/lemon#entry">entry</a> | No | Indicates an entry in a lexicon | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |  |
| <a href="#topic" title="http://lemon-model.net/lemon#topic">topic</a> | No | Indicates the topic of the overrall lexicon, this is property is sometimes called "subject field". Note that in addition to the topic of a lexicon each lexical entry may belong to a given domain, this can be modelled as equal or not equal to the topic of the associated lexicon | <a href="#LexicalTopic" title="http://lemon-model.net/lemon#LexicalTopic">Lexical Topic</a> |  |

#### Properties from HasLanguage

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#language" title="http://lemon-model.net/lemon#language">language</a> | No | The language of a given lexicon. This should be some ISO-639 string | schema:Text |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |

#### Properties from HasPattern

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#pattern" title="http://lemon-model.net/lemon#pattern">pattern</a> | No | Pattern | <a href="#MorphPattern" title="http://lemon-model.net/lemon#MorphPattern">Morphological pattern</a> |  |


### <a id="MorphPattern" title="http://lemon-model.net/lemon#MorphPattern"></a> Class: Morphological pattern <small style="color:#aaa">(http://lemon-model.net/lemon#MorphPattern)</small>

Term: `MorphPattern`

Morphological pattern. A kind of HasLanguage, LemonElement.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Morphological pattern

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#transform" title="http://lemon-model.net/lemon#transform">transform</a> | No | Transform | <a href="#MorphTransform" title="http://lemon-model.net/lemon#MorphTransform">Morphological Transform</a> |  |

#### Properties from HasLanguage

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#language" title="http://lemon-model.net/lemon#language">language</a> | No | The language of a given lexicon. This should be some ISO-639 string | schema:Text |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="MorphTransform" title="http://lemon-model.net/lemon#MorphTransform"></a> Class: Morphological Transform <small style="color:#aaa">(http://lemon-model.net/lemon#MorphTransform)</small>

Term: `MorphTransform`

Morphological Transform. A kind of LemonElement.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Morphological Transform

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#generates" title="http://lemon-model.net/lemon#generates">generates</a> | No | Generates | <a href="#Prototype" title="http://lemon-model.net/lemon#Prototype">Prototype</a> |  |
| <a href="#nextTransform" title="http://lemon-model.net/lemon#nextTransform">nextTransform</a> | No | Next transform | <a href="#MorphTransform" title="http://lemon-model.net/lemon#MorphTransform">Morphological Transform</a> |  |
| <a href="#rule" title="http://lemon-model.net/lemon#rule">rule</a> | No | Rule | schema:Text |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="Node" title="http://lemon-model.net/lemon#Node"></a> Class: Node <small style="color:#aaa">(http://lemon-model.net/lemon#Node)</small>

A node in a phrase structure or dependency parse graph

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Node

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#constituent" title="http://lemon-model.net/lemon#constituent">constituent</a> | No | Constituent. A sub-property of topObjectProperty. | <a href="#NodeConstituent" title="http://lemon-model.net/lemon#NodeConstituent">Constituent</a> |  |
| <a href="#edge" title="http://lemon-model.net/lemon#edge">edge</a> | No | Denotes the relation between a node in a multi-word expression structure and an edge | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> |  |
| <a href="#leaf" title="http://lemon-model.net/lemon#leaf">leaf</a> | No | Denotes the component referred to by the lex (pre-terminal) of the phrase structure | <a href="#PhraseElement" title="http://lemon-model.net/lemon#PhraseElement">Phrase element</a> |  |
| <a href="#separator" title="http://lemon-model.net/lemon#separator">separator</a> | No | Indicates the graphical element used to seperate the subnodes of this phrase structure. It is generally recommended that you use a string value with the language tag used to indicate script, (i.e., using ISO-15924 codes, such as "Latn"), as orthographic features may change with script. | schema:Text |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="NodeConstituent" title="http://lemon-model.net/lemon#NodeConstituent"></a> Class: Constituent <small style="color:#aaa">(http://lemon-model.net/lemon#NodeConstituent)</small>

Term: `NodeConstituent`

The class of constituents, that is types applied to nodes in a phrase structure graph

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Constituent

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="Part" title="http://lemon-model.net/lemon#Part"></a> Class: Part of word <small style="color:#aaa">(http://lemon-model.net/lemon#Part)</small>

Term: `Part`

An affix is a morpheme that is attached to a word stem to form a new word. Use this for lexical entries with only abstract forms

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Part of word

*No properties defined directly on this class*


#### Properties from Lexical entry

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#abstractForm" title="http://lemon-model.net/lemon#abstractForm">abstractForm</a> | No | A representation of a lexical entry that should not be considered canonical. This is primarily from a linguistic view for non-realisable forms such as stems but may also include misspellings and other unusual forms | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#canonicalForm" title="http://lemon-model.net/lemon#canonicalForm">canonicalForm</a> | No | The canonical ("dictionary") form of the lexical entry. This can be used to indicate the "lemma" form of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#decomposition" title="http://lemon-model.net/lemon#decomposition">decomposition</a> | No | Denotes a component of a lexical entry | <a href="#ComponentList" title="http://lemon-model.net/lemon#ComponentList">ComponentList</a> |  |
| <a href="#lexicalForm" title="http://lemon-model.net/lemon#lexicalForm">lexicalForm</a> | No | Denotes a written representation of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#lexicalVariant" title="http://lemon-model.net/lemon#lexicalVariant">lexicalVariant</a> | No | Indicates a non-semantic relationship between two lexical entries. E.g., a term is derived from another term, such as "lexical" and "lexicalize" | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |  |
| <a href="#otherForm" title="http://lemon-model.net/lemon#otherForm">otherForm</a> | No | A non-preferred ("non-dictionary") representation of a lexical entry. This should be variant that is either a morphological variant, an abbreviation, short form or acronym | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#phraseRoot" title="http://lemon-model.net/lemon#phraseRoot">phraseRoot</a> | No | Indicates the head node of a phrase structure or dependency parse graph | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> |  |
| <a href="#sense" title="http://lemon-model.net/lemon#sense">sense</a> | No | Indicates the sense of a lexical entry | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
| <a href="#synBehavior" title="http://lemon-model.net/lemon#synBehavior">synBehavior</a> | No | Indicates a syntactic behavior of a lexical entry | <a href="#Frame" title="http://lemon-model.net/lemon#Frame">Frame</a> |  |
| <a href="#topic" title="http://lemon-model.net/lemon#topic">topic</a> | No | Indicates the topic of the overrall lexicon, this is property is sometimes called "subject field". Note that in addition to the topic of a lexicon each lexical entry may belong to a given domain, this can be modelled as equal or not equal to the topic of the associated lexicon | <a href="#LexicalTopic" title="http://lemon-model.net/lemon#LexicalTopic">Lexical Topic</a> |  |

#### Properties from HasLanguage

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#language" title="http://lemon-model.net/lemon#language">language</a> | No | The language of a given lexicon. This should be some ISO-639 string | schema:Text |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |

#### Properties from HasPattern

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#pattern" title="http://lemon-model.net/lemon#pattern">pattern</a> | No | Pattern | <a href="#MorphPattern" title="http://lemon-model.net/lemon#MorphPattern">Morphological pattern</a> |  |


### <a id="Phrase" title="http://lemon-model.net/lemon#Phrase"></a> Class: Phrase <small style="color:#aaa">(http://lemon-model.net/lemon#Phrase)</small>

A phrase in lemon is defined in the looser sense of a sequence of words, it does not have to a fully grammatical phrase

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Phrase

*No properties defined directly on this class*


#### Properties from Lexical entry

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#abstractForm" title="http://lemon-model.net/lemon#abstractForm">abstractForm</a> | No | A representation of a lexical entry that should not be considered canonical. This is primarily from a linguistic view for non-realisable forms such as stems but may also include misspellings and other unusual forms | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#canonicalForm" title="http://lemon-model.net/lemon#canonicalForm">canonicalForm</a> | No | The canonical ("dictionary") form of the lexical entry. This can be used to indicate the "lemma" form of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#decomposition" title="http://lemon-model.net/lemon#decomposition">decomposition</a> | No | Denotes a component of a lexical entry | <a href="#ComponentList" title="http://lemon-model.net/lemon#ComponentList">ComponentList</a> |  |
| <a href="#lexicalForm" title="http://lemon-model.net/lemon#lexicalForm">lexicalForm</a> | No | Denotes a written representation of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#lexicalVariant" title="http://lemon-model.net/lemon#lexicalVariant">lexicalVariant</a> | No | Indicates a non-semantic relationship between two lexical entries. E.g., a term is derived from another term, such as "lexical" and "lexicalize" | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |  |
| <a href="#otherForm" title="http://lemon-model.net/lemon#otherForm">otherForm</a> | No | A non-preferred ("non-dictionary") representation of a lexical entry. This should be variant that is either a morphological variant, an abbreviation, short form or acronym | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#phraseRoot" title="http://lemon-model.net/lemon#phraseRoot">phraseRoot</a> | No | Indicates the head node of a phrase structure or dependency parse graph | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> |  |
| <a href="#sense" title="http://lemon-model.net/lemon#sense">sense</a> | No | Indicates the sense of a lexical entry | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
| <a href="#synBehavior" title="http://lemon-model.net/lemon#synBehavior">synBehavior</a> | No | Indicates a syntactic behavior of a lexical entry | <a href="#Frame" title="http://lemon-model.net/lemon#Frame">Frame</a> |  |
| <a href="#topic" title="http://lemon-model.net/lemon#topic">topic</a> | No | Indicates the topic of the overrall lexicon, this is property is sometimes called "subject field". Note that in addition to the topic of a lexicon each lexical entry may belong to a given domain, this can be modelled as equal or not equal to the topic of the associated lexicon | <a href="#LexicalTopic" title="http://lemon-model.net/lemon#LexicalTopic">Lexical Topic</a> |  |

#### Properties from HasLanguage

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#language" title="http://lemon-model.net/lemon#language">language</a> | No | The language of a given lexicon. This should be some ISO-639 string | schema:Text |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |

#### Properties from HasPattern

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#pattern" title="http://lemon-model.net/lemon#pattern">pattern</a> | No | Pattern | <a href="#MorphPattern" title="http://lemon-model.net/lemon#MorphPattern">Morphological pattern</a> |  |


### <a id="PhraseElement" title="http://lemon-model.net/lemon#PhraseElement"></a> Class: Phrase element <small style="color:#aaa">(http://lemon-model.net/lemon#PhraseElement)</small>

Term: `PhraseElement`

A terminal node in a phrase structure graph, i.e., a realisable, lexical element.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Phrase element

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="PropertyValue" title="http://lemon-model.net/lemon#PropertyValue"></a> Class: Property Value <small style="color:#aaa">(http://lemon-model.net/lemon#PropertyValue)</small>

Term: `PropertyValue`

A value that can be used in the range of linguistic property

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Property Value

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="Prototype" title="http://lemon-model.net/lemon#Prototype"></a> Class: Prototype <small style="color:#aaa">(http://lemon-model.net/lemon#Prototype)</small>

Prototype. A kind of LemonElement.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Prototype

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="SenseCondition" title="http://lemon-model.net/lemon#SenseCondition"></a> Class: Condition <small style="color:#aaa">(http://lemon-model.net/lemon#SenseCondition)</small>

Term: `SenseCondition`

Indicates a logical condition that is used indicate when a particular term has the given meaning

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Condition

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="SenseContext" title="http://lemon-model.net/lemon#SenseContext"></a> Class: Context <small style="color:#aaa">(http://lemon-model.net/lemon#SenseContext)</small>

Term: `SenseContext`

Indicates the context in which a term is to be used. The context refers not to the immediate syntactic context, but the document and register the document is used in

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Context

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="SenseDefinition" title="http://lemon-model.net/lemon#SenseDefinition"></a> Class: Definition <small style="color:#aaa">(http://lemon-model.net/lemon#SenseDefinition)</small>

Term: `SenseDefinition`

A definition of a sememe, that is the a text describing the exact meaning of the lexical entry when its sense is the given ontology reference

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Definition

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="SynRoleMarker" title="http://lemon-model.net/lemon#SynRoleMarker"></a> Class: Syntactic role marker <small style="color:#aaa">(http://lemon-model.net/lemon#SynRoleMarker)</small>

Term: `SynRoleMarker`

The indicator of a given syntactic argument, normally a preposition or other particle marker or a linguistic property such as case

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Syntactic role marker

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |

#### Properties from Lexical entry

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#abstractForm" title="http://lemon-model.net/lemon#abstractForm">abstractForm</a> | No | A representation of a lexical entry that should not be considered canonical. This is primarily from a linguistic view for non-realisable forms such as stems but may also include misspellings and other unusual forms | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#canonicalForm" title="http://lemon-model.net/lemon#canonicalForm">canonicalForm</a> | No | The canonical ("dictionary") form of the lexical entry. This can be used to indicate the "lemma" form of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#decomposition" title="http://lemon-model.net/lemon#decomposition">decomposition</a> | No | Denotes a component of a lexical entry | <a href="#ComponentList" title="http://lemon-model.net/lemon#ComponentList">ComponentList</a> |  |
| <a href="#lexicalForm" title="http://lemon-model.net/lemon#lexicalForm">lexicalForm</a> | No | Denotes a written representation of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#lexicalVariant" title="http://lemon-model.net/lemon#lexicalVariant">lexicalVariant</a> | No | Indicates a non-semantic relationship between two lexical entries. E.g., a term is derived from another term, such as "lexical" and "lexicalize" | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |  |
| <a href="#otherForm" title="http://lemon-model.net/lemon#otherForm">otherForm</a> | No | A non-preferred ("non-dictionary") representation of a lexical entry. This should be variant that is either a morphological variant, an abbreviation, short form or acronym | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#phraseRoot" title="http://lemon-model.net/lemon#phraseRoot">phraseRoot</a> | No | Indicates the head node of a phrase structure or dependency parse graph | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> |  |
| <a href="#sense" title="http://lemon-model.net/lemon#sense">sense</a> | No | Indicates the sense of a lexical entry | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
| <a href="#synBehavior" title="http://lemon-model.net/lemon#synBehavior">synBehavior</a> | No | Indicates a syntactic behavior of a lexical entry | <a href="#Frame" title="http://lemon-model.net/lemon#Frame">Frame</a> |  |
| <a href="#topic" title="http://lemon-model.net/lemon#topic">topic</a> | No | Indicates the topic of the overrall lexicon, this is property is sometimes called "subject field". Note that in addition to the topic of a lexicon each lexical entry may belong to a given domain, this can be modelled as equal or not equal to the topic of the associated lexicon | <a href="#LexicalTopic" title="http://lemon-model.net/lemon#LexicalTopic">Lexical Topic</a> |  |

#### Properties from HasLanguage

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#language" title="http://lemon-model.net/lemon#language">language</a> | No | The language of a given lexicon. This should be some ISO-639 string | schema:Text |  |

#### Properties from HasPattern

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#pattern" title="http://lemon-model.net/lemon#pattern">pattern</a> | No | Pattern | <a href="#MorphPattern" title="http://lemon-model.net/lemon#MorphPattern">Morphological pattern</a> |  |


### <a id="UsageExample" title="http://lemon-model.net/lemon#UsageExample"></a> Class: Usage Example <small style="color:#aaa">(http://lemon-model.net/lemon#UsageExample)</small>

Term: `UsageExample`

An example of the usage of a lexical entry when refering to the ontology entity given by the sememe's reference. This should in effect be an example of the form used in context. E.g., "this is a *usage example*"

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Usage Example

*No properties defined directly on this class*


#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |


### <a id="Word" title="http://lemon-model.net/lemon#Word"></a> Class: Word <small style="color:#aaa">(http://lemon-model.net/lemon#Word)</small>

A word is a single unit of writing or speech. In languages written in Latin, Cyrillic, Greek, Arabic scripts etc. these are assumed to be separated by white-space characters. For Chinese, Japanese, Korean this should correspond to some agreed segmentation scheme.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Word

*No properties defined directly on this class*


#### Properties from Lexical entry

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#abstractForm" title="http://lemon-model.net/lemon#abstractForm">abstractForm</a> | No | A representation of a lexical entry that should not be considered canonical. This is primarily from a linguistic view for non-realisable forms such as stems but may also include misspellings and other unusual forms | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#canonicalForm" title="http://lemon-model.net/lemon#canonicalForm">canonicalForm</a> | No | The canonical ("dictionary") form of the lexical entry. This can be used to indicate the "lemma" form of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#decomposition" title="http://lemon-model.net/lemon#decomposition">decomposition</a> | No | Denotes a component of a lexical entry | <a href="#ComponentList" title="http://lemon-model.net/lemon#ComponentList">ComponentList</a> |  |
| <a href="#lexicalForm" title="http://lemon-model.net/lemon#lexicalForm">lexicalForm</a> | No | Denotes a written representation of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#lexicalVariant" title="http://lemon-model.net/lemon#lexicalVariant">lexicalVariant</a> | No | Indicates a non-semantic relationship between two lexical entries. E.g., a term is derived from another term, such as "lexical" and "lexicalize" | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |  |
| <a href="#otherForm" title="http://lemon-model.net/lemon#otherForm">otherForm</a> | No | A non-preferred ("non-dictionary") representation of a lexical entry. This should be variant that is either a morphological variant, an abbreviation, short form or acronym | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |  |
| <a href="#phraseRoot" title="http://lemon-model.net/lemon#phraseRoot">phraseRoot</a> | No | Indicates the head node of a phrase structure or dependency parse graph | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> |  |
| <a href="#sense" title="http://lemon-model.net/lemon#sense">sense</a> | No | Indicates the sense of a lexical entry | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
| <a href="#synBehavior" title="http://lemon-model.net/lemon#synBehavior">synBehavior</a> | No | Indicates a syntactic behavior of a lexical entry | <a href="#Frame" title="http://lemon-model.net/lemon#Frame">Frame</a> |  |
| <a href="#topic" title="http://lemon-model.net/lemon#topic">topic</a> | No | Indicates the topic of the overrall lexicon, this is property is sometimes called "subject field". Note that in addition to the topic of a lexicon each lexical entry may belong to a given domain, this can be modelled as equal or not equal to the topic of the associated lexicon | <a href="#LexicalTopic" title="http://lemon-model.net/lemon#LexicalTopic">Lexical Topic</a> |  |

#### Properties from HasLanguage

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#language" title="http://lemon-model.net/lemon#language">language</a> | No | The language of a given lexicon. This should be some ISO-639 string | schema:Text |  |

#### Properties from LemonElement

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | No | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> |  |

#### Properties from HasPattern

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#pattern" title="http://lemon-model.net/lemon#pattern">pattern</a> | No | Pattern | <a href="#MorphPattern" title="http://lemon-model.net/lemon#MorphPattern">Morphological pattern</a> |  |

## All Properties

### <a id="abstractForm" title="http://lemon-model.net/lemon#abstractForm"></a> Property: Abstract form <small style="color:#aaa">(http://lemon-model.net/lemon#abstractForm)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#abstractForm" title="http://lemon-model.net/lemon#abstractForm">abstractForm</a> | A representation of a lexical entry that should not be considered canonical. This is primarily from a linguistic view for non-realisable forms such as stems but may also include misspellings and other unusual forms | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |
### <a id="altRef" title="http://lemon-model.net/lemon#altRef"></a> Property: Alternative reference of <small style="color:#aaa">(http://lemon-model.net/lemon#altRef)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#altRef" title="http://lemon-model.net/lemon#altRef">altRef</a> | The sense of a non-preferred but admissible lexicalization of a given ontology entity | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
### <a id="broader" title="http://lemon-model.net/lemon#broader"></a> Property: Broader <small style="color:#aaa">(http://lemon-model.net/lemon#broader)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#broader" title="http://lemon-model.net/lemon#broader">broader</a> | Denotes that one sense is broader than another. From a lexical point of view this means replacing one lexical entry with another generalizes the meaning of the phrase. From an ontological point of view this property makes not strong assertions. From a mapping point of view if the broader sense applies the narrower sense must also | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="canonicalForm" title="http://lemon-model.net/lemon#canonicalForm"></a> Property: Canonical form <small style="color:#aaa">(http://lemon-model.net/lemon#canonicalForm)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#canonicalForm" title="http://lemon-model.net/lemon#canonicalForm">canonicalForm</a> | The canonical ("dictionary") form of the lexical entry. This can be used to indicate the "lemma" form of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |
### <a id="condition" title="http://lemon-model.net/lemon#condition"></a> Property: Condition <small style="color:#aaa">(http://lemon-model.net/lemon#condition)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#condition" title="http://lemon-model.net/lemon#condition">condition</a> | Indicates an evaluable test, the is necessary for this sense to apply | <a href="#LexicalCondition" title="http://lemon-model.net/lemon#LexicalCondition">Lexical Condition</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="constituent" title="http://lemon-model.net/lemon#constituent"></a> Property: Constituent <small style="color:#aaa">(http://lemon-model.net/lemon#constituent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#constituent" title="http://lemon-model.net/lemon#constituent">constituent</a> | Constituent. A sub-property of topObjectProperty. | <a href="#NodeConstituent" title="http://lemon-model.net/lemon#NodeConstituent">Constituent</a> | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> |
### <a id="context" title="http://lemon-model.net/lemon#context"></a> Property: Context <small style="color:#aaa">(http://lemon-model.net/lemon#context)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#context" title="http://lemon-model.net/lemon#context">context</a> | Denotes the pragmatic or discursive context of a sense mapping or a constraint on the mapping by syntactic or semantic properites | <a href="#LexicalContext" title="http://lemon-model.net/lemon#LexicalContext">Lexical Context</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="decomposition" title="http://lemon-model.net/lemon#decomposition"></a> Property: Decomposition <small style="color:#aaa">(http://lemon-model.net/lemon#decomposition)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#decomposition" title="http://lemon-model.net/lemon#decomposition">decomposition</a> | Denotes a component of a lexical entry | <a href="#ComponentList" title="http://lemon-model.net/lemon#ComponentList">ComponentList</a> | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |
### <a id="definition" title="http://lemon-model.net/lemon#definition"></a> Property: Definition <small style="color:#aaa">(http://lemon-model.net/lemon#definition)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#definition" title="http://lemon-model.net/lemon#definition">definition</a> | Indicates a natural language definition. Note there is a pseudo-node to allow for further description of the definition (e.g., source, creation date etc.). The value property should be used to indicate the string value of the definition. | <a href="#SenseDefinition" title="http://lemon-model.net/lemon#SenseDefinition">Definition</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="edge" title="http://lemon-model.net/lemon#edge"></a> Property: Edge <small style="color:#aaa">(http://lemon-model.net/lemon#edge)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#edge" title="http://lemon-model.net/lemon#edge">edge</a> | Denotes the relation between a node in a multi-word expression structure and an edge | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> |
### <a id="element" title="http://lemon-model.net/lemon#element"></a> Property: Element <small style="color:#aaa">(http://lemon-model.net/lemon#element)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#element" title="http://lemon-model.net/lemon#element">element</a> | Denotes the lexical entry represented by the component | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> | <a href="#Component" title="http://lemon-model.net/lemon#Component">Component</a> |
### <a id="entry" title="http://lemon-model.net/lemon#entry"></a> Property: Entry <small style="color:#aaa">(http://lemon-model.net/lemon#entry)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#entry" title="http://lemon-model.net/lemon#entry">entry</a> | Indicates an entry in a lexicon | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> | <a href="#Lexicon" title="http://lemon-model.net/lemon#Lexicon">Lexicon</a> |
### <a id="equivalent" title="http://lemon-model.net/lemon#equivalent"></a> Property: Equivalent <small style="color:#aaa">(http://lemon-model.net/lemon#equivalent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#equivalent" title="http://lemon-model.net/lemon#equivalent">equivalent</a> | Indicates that two senses are equivalent. From a lexical point of view , this indicates that the lexical entries can be substituted for each other with no change in meaning. From an ontological point of view it means that the two references are not disjoint. From a mapping point of view it means if one mapping apply the other must necessarily apply | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="example" title="http://lemon-model.net/lemon#example"></a> Property: Example <small style="color:#aaa">(http://lemon-model.net/lemon#example)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#example" title="http://lemon-model.net/lemon#example">example</a> | Example | <a href="#UsageExample" title="http://lemon-model.net/lemon#UsageExample">Usage Example</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="extrinsicArg" title="http://lemon-model.net/lemon#extrinsicArg"></a> Property: Extrinsic argument <small style="color:#aaa">(http://lemon-model.net/lemon#extrinsicArg)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#extrinsicArg" title="http://lemon-model.net/lemon#extrinsicArg">extrinsicArg</a> | A raisable semantic argument is not in fact the semantic argument of the current frame-sense but instead is "raised" into a frame-sense used for an argument. For example the phrase "John seemed to be happy", is interpreted as "it seemed that X" where X is "John is happy", hence the subject of "seem" is a raisable argument. |  |  |
### <a id="formVariant" title="http://lemon-model.net/lemon#formVariant"></a> Property: Form variant <small style="color:#aaa">(http://lemon-model.net/lemon#formVariant)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#formVariant" title="http://lemon-model.net/lemon#formVariant">formVariant</a> | Form variant | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |
### <a id="generates" title="http://lemon-model.net/lemon#generates"></a> Property: Generates <small style="color:#aaa">(http://lemon-model.net/lemon#generates)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#generates" title="http://lemon-model.net/lemon#generates">generates</a> | Generates | <a href="#Prototype" title="http://lemon-model.net/lemon#Prototype">Prototype</a> | <a href="#MorphTransform" title="http://lemon-model.net/lemon#MorphTransform">Morphological Transform</a> |
### <a id="hiddenRef" title="http://lemon-model.net/lemon#hiddenRef"></a> Property: Hidden reference of <small style="color:#aaa">(http://lemon-model.net/lemon#hiddenRef)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hiddenRef" title="http://lemon-model.net/lemon#hiddenRef">hiddenRef</a> | The sense of a non-admissible lexicalization for a ontology entity. This is used to denote incorrect or deprecated language that may be useful for information extraction but not generation | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
### <a id="incompatible" title="http://lemon-model.net/lemon#incompatible"></a> Property: Incompatible <small style="color:#aaa">(http://lemon-model.net/lemon#incompatible)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#incompatible" title="http://lemon-model.net/lemon#incompatible">incompatible</a> | Says that the two senses are disjoint. From a lexical point of view, this means substituting the lexical entries must change the meaning of the phrase. From an ontological point of view, this property is implied if both references are also disjoint, but does not imply disjointness, but non-equivalence of the references. For the mapping point of view there is not instance when both mappings are valid. | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="isA" title="http://lemon-model.net/lemon#isA"></a> Property: Instance of <small style="color:#aaa">(http://lemon-model.net/lemon#isA)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isA" title="http://lemon-model.net/lemon#isA">isA</a> | Denotes that the single argument of a class predicate is represented in the lexicon by the given semantic argument. That is Class(?x) or ?x rdf:type Class | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="language" title="http://lemon-model.net/lemon#language"></a> Property: Language <small style="color:#aaa">(http://lemon-model.net/lemon#language)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#language" title="http://lemon-model.net/lemon#language">language</a> | The language of a given lexicon. This should be some ISO-639 string | schema:Text | <a href="#HasLanguage" title="http://lemon-model.net/lemon#HasLanguage">HasLanguage</a> |
### <a id="leaf" title="http://lemon-model.net/lemon#leaf"></a> Property: Leaf <small style="color:#aaa">(http://lemon-model.net/lemon#leaf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#leaf" title="http://lemon-model.net/lemon#leaf">leaf</a> | Denotes the component referred to by the lex (pre-terminal) of the phrase structure | <a href="#PhraseElement" title="http://lemon-model.net/lemon#PhraseElement">Phrase element</a> | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> |
### <a id="lexicalForm" title="http://lemon-model.net/lemon#lexicalForm"></a> Property: Lexical form <small style="color:#aaa">(http://lemon-model.net/lemon#lexicalForm)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#lexicalForm" title="http://lemon-model.net/lemon#lexicalForm">lexicalForm</a> | Denotes a written representation of a lexical entry | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |
### <a id="property" title="http://lemon-model.net/lemon#property"></a> Property: Lexical property <small style="color:#aaa">(http://lemon-model.net/lemon#property)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#property" title="http://lemon-model.net/lemon#property">property</a> | Denotes a lexical property of a lexical entry, form, component or MWE node. For the lexical entry this is assumed to be static properties e.g., part of speech and gender and for the others this is assumed to be specific properties e.g., case, number | <a href="#PropertyValue" title="http://lemon-model.net/lemon#PropertyValue">Property Value</a> | <a href="#LemonElement" title="http://lemon-model.net/lemon#LemonElement">LemonElement</a> |
### <a id="lexicalVariant" title="http://lemon-model.net/lemon#lexicalVariant"></a> Property: Lexical variant <small style="color:#aaa">(http://lemon-model.net/lemon#lexicalVariant)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#lexicalVariant" title="http://lemon-model.net/lemon#lexicalVariant">lexicalVariant</a> | Indicates a non-semantic relationship between two lexical entries. E.g., a term is derived from another term, such as "lexical" and "lexicalize" | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |
### <a id="marker" title="http://lemon-model.net/lemon#marker"></a> Property: Marker <small style="color:#aaa">(http://lemon-model.net/lemon#marker)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#marker" title="http://lemon-model.net/lemon#marker">marker</a> | Denotes the marker of a semantic argument. This should generally either be a semantic property i.e., case or another lexical entry e.g., a preposition or particle | <a href="#SynRoleMarker" title="http://lemon-model.net/lemon#SynRoleMarker">Syntactic role marker</a> | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> |
### <a id="narrower" title="http://lemon-model.net/lemon#narrower"></a> Property: Narrower <small style="color:#aaa">(http://lemon-model.net/lemon#narrower)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#narrower" title="http://lemon-model.net/lemon#narrower">narrower</a> | Denotes that one sense is narrower than another. From a lexical point of view this means replacing one lexical entry with another specializes the meaning of the phrase. From an ontological point of view this property makes not strong assertions. From a mapping point of view if the broader sense applies the narrower sense must also | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="nextTransform" title="http://lemon-model.net/lemon#nextTransform"></a> Property: Next transform <small style="color:#aaa">(http://lemon-model.net/lemon#nextTransform)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#nextTransform" title="http://lemon-model.net/lemon#nextTransform">nextTransform</a> | Next transform | <a href="#MorphTransform" title="http://lemon-model.net/lemon#MorphTransform">Morphological Transform</a> | <a href="#MorphTransform" title="http://lemon-model.net/lemon#MorphTransform">Morphological Transform</a> |
### <a id="objOfProp" title="http://lemon-model.net/lemon#objOfProp"></a> Property: Object of property <small style="color:#aaa">(http://lemon-model.net/lemon#objOfProp)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#objOfProp" title="http://lemon-model.net/lemon#objOfProp">objOfProp</a> | Indicates the semantic argument which represents the objects (ranges) of the property referred to by this sense | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="optional" title="http://lemon-model.net/lemon#optional"></a> Property: Optional <small style="color:#aaa">(http://lemon-model.net/lemon#optional)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#optional" title="http://lemon-model.net/lemon#optional">optional</a> | Denotes that the syntactic argument is optional (may be omitted) | schema:Boolean | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> |
### <a id="otherForm" title="http://lemon-model.net/lemon#otherForm"></a> Property: Other form <small style="color:#aaa">(http://lemon-model.net/lemon#otherForm)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#otherForm" title="http://lemon-model.net/lemon#otherForm">otherForm</a> | A non-preferred ("non-dictionary") representation of a lexical entry. This should be variant that is either a morphological variant, an abbreviation, short form or acronym | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |
### <a id="pattern" title="http://lemon-model.net/lemon#pattern"></a> Property: Pattern <small style="color:#aaa">(http://lemon-model.net/lemon#pattern)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#pattern" title="http://lemon-model.net/lemon#pattern">pattern</a> | Pattern | <a href="#MorphPattern" title="http://lemon-model.net/lemon#MorphPattern">Morphological pattern</a> | <a href="#HasPattern" title="http://lemon-model.net/lemon#HasPattern">HasPattern</a> |
### <a id="phraseRoot" title="http://lemon-model.net/lemon#phraseRoot"></a> Property: Phrase root <small style="color:#aaa">(http://lemon-model.net/lemon#phraseRoot)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#phraseRoot" title="http://lemon-model.net/lemon#phraseRoot">phraseRoot</a> | Indicates the head node of a phrase structure or dependency parse graph | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |
### <a id="prefRef" title="http://lemon-model.net/lemon#prefRef"></a> Property: Preferred reference of <small style="color:#aaa">(http://lemon-model.net/lemon#prefRef)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#prefRef" title="http://lemon-model.net/lemon#prefRef">prefRef</a> | The sense of the preferred lexicalization of a given ontology entity | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
### <a id="propertyDomain" title="http://lemon-model.net/lemon#propertyDomain"></a> Property: Property domain <small style="color:#aaa">(http://lemon-model.net/lemon#propertyDomain)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#propertyDomain" title="http://lemon-model.net/lemon#propertyDomain">propertyDomain</a> | Indicates a restrictions on the domain of the property. That is, this sense only applies if the property the sense refers to has a subject in the class referred to by this property |  | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="propertyRange" title="http://lemon-model.net/lemon#propertyRange"></a> Property: Property range <small style="color:#aaa">(http://lemon-model.net/lemon#propertyRange)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#propertyRange" title="http://lemon-model.net/lemon#propertyRange">propertyRange</a> | Indicates a restrictions on the range of the property. That is, this sense only applies if the property the sense refers to has a object in the class referred to by this property |  | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="reference" title="http://lemon-model.net/lemon#reference"></a> Property: Reference <small style="color:#aaa">(http://lemon-model.net/lemon#reference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#reference" title="http://lemon-model.net/lemon#reference">reference</a> | A reference to an external resource |  | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="isReferenceOf" title="http://lemon-model.net/lemon#isReferenceOf"></a> Property: Reference of <small style="color:#aaa">(http://lemon-model.net/lemon#isReferenceOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isReferenceOf" title="http://lemon-model.net/lemon#isReferenceOf">isReferenceOf</a> | Indicate that a reference has a given sense | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |  |
### <a id="representation" title="http://lemon-model.net/lemon#representation"></a> Property: Representation <small style="color:#aaa">(http://lemon-model.net/lemon#representation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#representation" title="http://lemon-model.net/lemon#representation">representation</a> | A realisation of a given form | schema:Text | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |
### <a id="rule" title="http://lemon-model.net/lemon#rule"></a> Property: Rule <small style="color:#aaa">(http://lemon-model.net/lemon#rule)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#rule" title="http://lemon-model.net/lemon#rule">rule</a> | Rule | schema:Text | <a href="#MorphTransform" title="http://lemon-model.net/lemon#MorphTransform">Morphological Transform</a> |
### <a id="semArg" title="http://lemon-model.net/lemon#semArg"></a> Property: Semantic argument <small style="color:#aaa">(http://lemon-model.net/lemon#semArg)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#semArg" title="http://lemon-model.net/lemon#semArg">semArg</a> | Denotes a semantic argument slot of a semantic unit | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="sense" title="http://lemon-model.net/lemon#sense"></a> Property: Sense <small style="color:#aaa">(http://lemon-model.net/lemon#sense)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sense" title="http://lemon-model.net/lemon#sense">sense</a> | Indicates the sense of a lexical entry | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |
### <a id="isSenseOf" title="http://lemon-model.net/lemon#isSenseOf"></a> Property: Sense of <small style="color:#aaa">(http://lemon-model.net/lemon#isSenseOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isSenseOf" title="http://lemon-model.net/lemon#isSenseOf">isSenseOf</a> | Indicate that a sense is realised by the given lexical entry | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="senseRelation" title="http://lemon-model.net/lemon#senseRelation"></a> Property: Sense relation <small style="color:#aaa">(http://lemon-model.net/lemon#senseRelation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#senseRelation" title="http://lemon-model.net/lemon#senseRelation">senseRelation</a> | Denotes a relationship between senses | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="separator" title="http://lemon-model.net/lemon#separator"></a> Property: Separator <small style="color:#aaa">(http://lemon-model.net/lemon#separator)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#separator" title="http://lemon-model.net/lemon#separator">separator</a> | Indicates the graphical element used to seperate the subnodes of this phrase structure. It is generally recommended that you use a string value with the language tag used to indicate script, (i.e., using ISO-15924 codes, such as "Latn"), as orthographic features may change with script. | schema:Text | <a href="#Node" title="http://lemon-model.net/lemon#Node">Node</a> |
### <a id="subjOfProp" title="http://lemon-model.net/lemon#subjOfProp"></a> Property: Subject of property <small style="color:#aaa">(http://lemon-model.net/lemon#subjOfProp)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#subjOfProp" title="http://lemon-model.net/lemon#subjOfProp">subjOfProp</a> | Indicates the semantic argument which represents the subjects (domain) of the property referred to by this sense | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="subsense" title="http://lemon-model.net/lemon#subsense"></a> Property: Subsense <small style="color:#aaa">(http://lemon-model.net/lemon#subsense)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#subsense" title="http://lemon-model.net/lemon#subsense">subsense</a> | Indicates that the relation between a compound sense and its atomic subsenses | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> | <a href="#LexicalSense" title="http://lemon-model.net/lemon#LexicalSense">Lexical sense</a> |
### <a id="synArg" title="http://lemon-model.net/lemon#synArg"></a> Property: Syntactic argument <small style="color:#aaa">(http://lemon-model.net/lemon#synArg)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#synArg" title="http://lemon-model.net/lemon#synArg">synArg</a> | Indicates a slot in a syntactic frame | <a href="#Argument" title="http://lemon-model.net/lemon#Argument">Argument</a> | <a href="#Frame" title="http://lemon-model.net/lemon#Frame">Frame</a> |
### <a id="synBehavior" title="http://lemon-model.net/lemon#synBehavior"></a> Property: Syntactic behavior <small style="color:#aaa">(http://lemon-model.net/lemon#synBehavior)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#synBehavior" title="http://lemon-model.net/lemon#synBehavior">synBehavior</a> | Indicates a syntactic behavior of a lexical entry | <a href="#Frame" title="http://lemon-model.net/lemon#Frame">Frame</a> | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a> |
### <a id="topic" title="http://lemon-model.net/lemon#topic"></a> Property: Topic <small style="color:#aaa">(http://lemon-model.net/lemon#topic)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#topic" title="http://lemon-model.net/lemon#topic">topic</a> | Indicates the topic of the overrall lexicon, this is property is sometimes called "subject field". Note that in addition to the topic of a lexicon each lexical entry may belong to a given domain, this can be modelled as equal or not equal to the topic of the associated lexicon | <a href="#LexicalTopic" title="http://lemon-model.net/lemon#LexicalTopic">Lexical Topic</a> | <a href="#LexicalEntry" title="http://lemon-model.net/lemon#LexicalEntry">Lexical entry</a>, <a href="#Lexicon" title="http://lemon-model.net/lemon#Lexicon">Lexicon</a> |
### <a id="transform" title="http://lemon-model.net/lemon#transform"></a> Property: Transform <small style="color:#aaa">(http://lemon-model.net/lemon#transform)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#transform" title="http://lemon-model.net/lemon#transform">transform</a> | Transform | <a href="#MorphTransform" title="http://lemon-model.net/lemon#MorphTransform">Morphological Transform</a> | <a href="#MorphPattern" title="http://lemon-model.net/lemon#MorphPattern">Morphological pattern</a> |
### <a id="tree" title="http://lemon-model.net/lemon#tree"></a> Property: Tree <small style="color:#aaa">(http://lemon-model.net/lemon#tree)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#tree" title="http://lemon-model.net/lemon#tree">tree</a> | Tree |  |  |
### <a id="value" title="http://lemon-model.net/lemon#value"></a> Property: Value <small style="color:#aaa">(http://lemon-model.net/lemon#value)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#value" title="http://lemon-model.net/lemon#value">value</a> | This indicates the value of a pseudo-data node. An example of this is definition where the value would generally be a string but it would not be possible to add further annotations, such as source or creation date. |  |  |
### <a id="writtenRep" title="http://lemon-model.net/lemon#writtenRep"></a> Property: Written representation <small style="color:#aaa">(http://lemon-model.net/lemon#writtenRep)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#writtenRep" title="http://lemon-model.net/lemon#writtenRep">writtenRep</a> | Gives the written representation of a given form | schema:Text | <a href="#Form" title="http://lemon-model.net/lemon#Form">Form</a> |
## Property Values

No PropertyValue entities are defined.


