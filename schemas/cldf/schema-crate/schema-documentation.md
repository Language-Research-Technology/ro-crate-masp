---
title: CLDF Ontology Schema Terms
---

# CLDF Ontology Schema Terms

TODO: describe the source ontology and any conversion caveats here.

## All Rules:

## Types of entities (specializations of Classes) and expected Properties


### <a id="BorrowingTable" title="http://cldf.clld.org/v1.0/terms.rdf#BorrowingTable"></a> Class: BorrowingTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#BorrowingTable)</small>

 <p xmlns="http://www.w3.org/1999/xhtml"> The Borrowing Table stores information about borrowings or loanwords by linking two rows in the Form Table as <a href="https://en.wikipedia.org/wiki/Associative_entity">associative entity</a> where additional information about the particular case of borrowing can be provided. </p> 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="CodeTable" title="http://cldf.clld.org/v1.0/terms.rdf#CodeTable"></a> Class: CodeTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#CodeTable)</small>

 The Code Table lists valid values for categorical parameters, thus enabling validity checks and providing a place for additional information about codes such as a source. 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="CognateTable" title="http://cldf.clld.org/v1.0/terms.rdf#CognateTable"></a> Class: CognateTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#CognateTable)</small>

 <p xmlns="http://www.w3.org/1999/xhtml"> The table of cognate judgements accompanying a CLDF Wordlist. If the only thing we know about cognate sets is the set of members, a Cognate Table can be used without a corresponding <a href="#CognatesetTable">Cognateset Table</a>, otherwise it will become the <a href="https://en.wikipedia.org/wiki/Associative_entity">associative table</a> between Form Table and Cognateset Table. </p> 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="CognatesetTable" title="http://cldf.clld.org/v1.0/terms.rdf#CognatesetTable"></a> Class: CognatesetTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#CognatesetTable)</small>

 A table holding additional data about cognate sets. 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="ContributionTable" title="http://cldf.clld.org/v1.0/terms.rdf#ContributionTable"></a> Class: ContributionTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#ContributionTable)</small>

 The table of contributions - i.e. citeable units - in a CLDF dataset 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="Dictionary" title="http://cldf.clld.org/v1.0/terms.rdf#Dictionary"></a> Class: Dictionary <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#Dictionary)</small>

 <p xmlns="http://www.w3.org/1999/xhtml">A dataset according to the <a href="https://github.com/cldf/cldf/tree/master/modules/Dictionary">CLDF Dictionary</a> specification</p> 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="EntryTable" title="http://cldf.clld.org/v1.0/terms.rdf#EntryTable"></a> Class: EntryTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#EntryTable)</small>

 The table of entries of a CLDF Dictionary 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="ExampleTable" title="http://cldf.clld.org/v1.0/terms.rdf#ExampleTable"></a> Class: ExampleTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#ExampleTable)</small>

 The table of text examples provided with a CLDF dataset 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="FormTable" title="http://cldf.clld.org/v1.0/terms.rdf#FormTable"></a> Class: FormTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#FormTable)</small>

 The table of forms of a CLDF Wordlist 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="FunctionalEquivalentTable" title="http://cldf.clld.org/v1.0/terms.rdf#FunctionalEquivalentTable"></a> Class: FunctionalEquivalentTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#FunctionalEquivalentTable)</small>

 A table to specify which parts of strings are functionally equivalent. This is typically used to parallel texts (i.e. expressions of the same content in different languages) However, it can be used in general to annotated that two expression from different languages are functionally equivalent (but not necessarily cognate) 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="FunctionalEquivalentsetTable" title="http://cldf.clld.org/v1.0/terms.rdf#FunctionalEquivalentsetTable"></a> Class: FunctionalEquivalentsetTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#FunctionalEquivalentsetTable)</small>

 The table to list all sets of functional equivalents from a "http://cldf.clld.org/v1.0/terms.rdf#FunctionalEquivalentTable" and adding descriptions for these sets 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="Generic" title="http://cldf.clld.org/v1.0/terms.rdf#Generic"></a> Class: Generic <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#Generic)</small>

 <p xmlns="http://www.w3.org/1999/xhtml"> A generic CLDF dataset; i.e. a set of cross-linguistic data which does not fit any of the other CLDF modules. </p> 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="LanguageTable" title="http://cldf.clld.org/v1.0/terms.rdf#LanguageTable"></a> Class: LanguageTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#LanguageTable)</small>

 The table of languages provided with a CLDF dataset 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="MediaTable" title="http://cldf.clld.org/v1.0/terms.rdf#MediaTable"></a> Class: MediaTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#MediaTable)</small>

 The table of media resources linked from objects in a CLDF dataset 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="ParallelText" title="http://cldf.clld.org/v1.0/terms.rdf#ParallelText"></a> Class: ParallelText <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#ParallelText)</small>

 <p xmlns="http://www.w3.org/1999/xhtml">A dataset according to the <a href="https://github.com/cldf/cldf/tree/master/modules/ParallelText">CLDF Parallel Text</a> specification</p> 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="ParameterNetwork" title="http://cldf.clld.org/v1.0/terms.rdf#ParameterNetwork"></a> Class: ParameterNetwork <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#ParameterNetwork)</small>

 A table listing edges of a parameter network, i.e. a graph with parameters as nodes. 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="ParameterTable" title="http://cldf.clld.org/v1.0/terms.rdf#ParameterTable"></a> Class: ParameterTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#ParameterTable)</small>

 The table of parameters available in a CLDF dataset 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="SenseTable" title="http://cldf.clld.org/v1.0/terms.rdf#SenseTable"></a> Class: SenseTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#SenseTable)</small>

 The table of senses of a CLDF Dictionary 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="StructureDataset" title="http://cldf.clld.org/v1.0/terms.rdf#StructureDataset"></a> Class: StructureDataset <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#StructureDataset)</small>

 <p xmlns="http://www.w3.org/1999/xhtml">A dataset according to the <a href="https://github.com/cldf/cldf/tree/master/modules/StructureDataset">CLDF Structure Dataset</a> specification</p> 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="TextCorpus" title="http://cldf.clld.org/v1.0/terms.rdf#TextCorpus"></a> Class: TextCorpus <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#TextCorpus)</small>

 <p xmlns="http://www.w3.org/1999/xhtml">A dataset according to the <a href="https://github.com/cldf/cldf/tree/master/modules/TextCorpus">CLDF Text Corpus</a> specification</p> 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="TreeTable" title="http://cldf.clld.org/v1.0/terms.rdf#TreeTable"></a> Class: TreeTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#TreeTable)</small>

 A table listing language trees, i.e. phylogenetic trees or classifiations of languages conveyed as tree structure with items of the LanguageTable as leaf nodes. 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="ValueTable" title="http://cldf.clld.org/v1.0/terms.rdf#ValueTable"></a> Class: ValueTable <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#ValueTable)</small>

Nf913c426f15b418aad1a967060d3f8d5

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="Wordlist" title="http://cldf.clld.org/v1.0/terms.rdf#Wordlist"></a> Class: Wordlist <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#Wordlist)</small>

 <p xmlns="http://www.w3.org/1999/xhtml">A dataset according to the <a href="https://github.com/cldf/cldf/tree/master/modules/Wordlist">CLDF Wordlist</a> specification</p> 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*


## All Properties

### <a id="alignment" title="http://cldf.clld.org/v1.0/terms.rdf#alignment"></a> Property: alignment <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#alignment)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#alignment" title="http://cldf.clld.org/v1.0/terms.rdf#alignment">alignment</a> |  <p xmlns="http://www.w3.org/1999/xhtml">An alignment represents <a href="http://linguistics-ontology.org/gold/2010/Segment">segments</a> which are grouped into a common <a href="#cognatesetReference">cognate set</a> as a matrix in which cognate segments are placed in the same column while gap characters are introduced in those sound sequences missing a certain counterpart.</p>  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
### <a id="analyzedWord" title="http://cldf.clld.org/v1.0/terms.rdf#analyzedWord"></a> Property: analyzedWord <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#analyzedWord)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#analyzedWord" title="http://cldf.clld.org/v1.0/terms.rdf#analyzedWord">analyzedWord</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> The morpheme-pattern analysis of a word in an example. </p>  |  |  |
### <a id="citation" title="http://cldf.clld.org/v1.0/terms.rdf#citation"></a> Property: citation <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#citation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#citation" title="http://cldf.clld.org/v1.0/terms.rdf#citation">citation</a> |  <p xmlns="http://www.w3.org/1999/xhtml">A full citation for a citeable unit of a dataset, preferably following the rules of the <a href="https://www.linguisticsociety.org/resource/unified-style-sheet">Unified Style Sheet for Linguistics Journals</a> or the best practices for <a href="https://site.uit.no/linguisticsdatacitation/">Linguistics Data Citation</a>. </p>  |  |  |
### <a id="cltsReference" title="http://cldf.clld.org/v1.0/terms.rdf#cltsReference"></a> Property: cltsReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#cltsReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#cltsReference" title="http://cldf.clld.org/v1.0/terms.rdf#cltsReference">cltsReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier of a sound described in the CLTS dataset. </p> <p xmlns="http://www.w3.org/1999/xhtml"> A sound identifier is the last path component of the sound's URL at https://clts.clld.org/parameters , e.g. <code>short_neutral_tone</code> for <code>https://clts.clld.org/parameters/short_neutral_tone</code>. </p> <p xmlns="http://www.w3.org/1999/xhtml"> References a sound in the Cross-Linguistic Transcription Systems database. Suitable to mark parameters as phonemes, and consequently values as elements of phoneme inventories. E.g. <a href="https://clts.clld.org/parameters/voiced_bilabial_nasal_consonant">voiced_bilabial_nasal_consonant</a>. </p> <p xmlns="http://www.w3.org/1999/xhtml"> To mark sounds that can not be mapped to any sound defined in the current CLTS version, the ID "NA", corresponding to the "unknown" sound https://clts.clld.org/parameters/NA should be used. </p>  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
### <a id="codeReference" title="http://cldf.clld.org/v1.0/terms.rdf#codeReference"></a> Property: codeReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#codeReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#codeReference" title="http://cldf.clld.org/v1.0/terms.rdf#codeReference">codeReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing a code (aka category) description by providing a foreign key to <code>CodeTable</code>. </p>  |  |  |
### <a id="cognatesetReference" title="http://cldf.clld.org/v1.0/terms.rdf#cognatesetReference"></a> Property: cognatesetReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#cognatesetReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#cognatesetReference" title="http://cldf.clld.org/v1.0/terms.rdf#cognatesetReference">cognatesetReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing a cognateset either </p> <ul xmlns="http://www.w3.org/1999/xhtml"> <li>by providing a foreign key to <code>CognatesetTable</code> or</li> <li>by using a known encoding scheme.</li> </ul>  |  |  |
### <a id="columnSpec" title="http://cldf.clld.org/v1.0/terms.rdf#columnSpec"></a> Property: columnSpec <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#columnSpec)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#columnSpec" title="http://cldf.clld.org/v1.0/terms.rdf#columnSpec">columnSpec</a> |  <p xmlns="http://www.w3.org/1999/xhtml">A column specification given as JSON representation of a <a href="https://www.w3.org/TR/tabular-metadata/#columns">CSVW column description</a>. This column specification may be used by CLDF consumers to read a parameter's value as typed data.</p> <p xmlns="http://www.w3.org/1999/xhtml">Note that a CSVW datatye description is not sufficient, because parsing a string value must also be informed by the column properties <code>null</code> and <code>separator</code>.</p>  |  |  |
### <a id="comment" title="http://cldf.clld.org/v1.0/terms.rdf#comment"></a> Property: comment <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#comment)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#comment" title="http://cldf.clld.org/v1.0/terms.rdf#comment">comment</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> A human-readable comment on a resource, providing additional context. </p>  |  |  |
### <a id="concepticonReference" title="http://cldf.clld.org/v1.0/terms.rdf#concepticonReference"></a> Property: concepticonReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#concepticonReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#concepticonReference" title="http://cldf.clld.org/v1.0/terms.rdf#concepticonReference">concepticonReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier of a Concepticon concept set. </p> <p xmlns="http://www.w3.org/1999/xhtml"> A concept set groups a number of concept labels which are used in different questionnaires and were judged to denote the same concept despite potential differences among the concrete concept labels (be it their spelling, or the language in which they were originally created). </p>  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
### <a id="contributionReference" title="http://cldf.clld.org/v1.0/terms.rdf#contributionReference"></a> Property: contributionReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#contributionReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#contributionReference" title="http://cldf.clld.org/v1.0/terms.rdf#contributionReference">contributionReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing a contribution by providing a foreign key to <code>ContributionTable</code>. </p>  |  |  |
### <a id="contributor" title="http://cldf.clld.org/v1.0/terms.rdf#contributor"></a> Property: contributor <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#contributor)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#contributor" title="http://cldf.clld.org/v1.0/terms.rdf#contributor">contributor</a> |  <p xmlns="http://www.w3.org/1999/xhtml">Names of contributor(s) to a citeable unit of a dataset.</p>  |  |  |
### <a id="description" title="http://cldf.clld.org/v1.0/terms.rdf#description"></a> Property: description <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#description)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#description" title="http://cldf.clld.org/v1.0/terms.rdf#description">description</a> |  <p xmlns="http://www.w3.org/1999/xhtml">A description for an entity.</p>  |  |  |
### <a id="downloadUrl" title="http://cldf.clld.org/v1.0/terms.rdf#downloadUrl"></a> Property: downloadUrl <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#downloadUrl)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#downloadUrl" title="http://cldf.clld.org/v1.0/terms.rdf#downloadUrl">downloadUrl</a> |  <p xmlns="http://www.w3.org/1999/xhtml">URL where a media resource is available directly, typically through HTTP, but other schemes such as <a href="https://en.wikipedia.org/wiki/File_URI_scheme">file:</a> (interpreted relative to the metadata location) or <a href="https://en.wikipedia.org/wiki/Data_URI_scheme">data:</a> are permissible as well. </p>  |  |  |
### <a id="edgeIsDirected" title="http://cldf.clld.org/v1.0/terms.rdf#edgeIsDirected"></a> Property: edgeIsDirected <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#edgeIsDirected)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#edgeIsDirected" title="http://cldf.clld.org/v1.0/terms.rdf#edgeIsDirected">edgeIsDirected</a> |  <p xmlns="http://www.w3.org/1999/xhtml">Flag signaling whether an edge in a graph is directed or not.</p>  |  |  |
### <a id="entryReference" title="http://cldf.clld.org/v1.0/terms.rdf#entryReference"></a> Property: entryReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#entryReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#entryReference" title="http://cldf.clld.org/v1.0/terms.rdf#entryReference">entryReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing a dictionary entry by providing a foreign key to <code>EntryTable</code>. </p>  |  |  |
### <a id="exampleReference" title="http://cldf.clld.org/v1.0/terms.rdf#exampleReference"></a> Property: exampleReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#exampleReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#exampleReference" title="http://cldf.clld.org/v1.0/terms.rdf#exampleReference">exampleReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing an example by providing a foreign key to <code>ExampleTable</code>. </p>  |  |  |
### <a id="form" title="http://cldf.clld.org/v1.0/terms.rdf#form"></a> Property: form <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#form)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#form" title="http://cldf.clld.org/v1.0/terms.rdf#form">form</a> |  <p xmlns="http://www.w3.org/1999/xhtml">A lexical unit is any collection of word forms corresponding to a certain meaning which can be found in comparative datasets.</p> <p xmlns="http://www.w3.org/1999/xhtml">Ideally, a lexical unit would just present itself as one single <a href="http://linguistics-ontology.org/gold/2010/FormUnit">form</a>. However, in practice, scholars often list speech variants and at times even non-cognate alternatives for their preferred form.</p>  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
### <a id="formReference" title="http://cldf.clld.org/v1.0/terms.rdf#formReference"></a> Property: formReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#formReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#formReference" title="http://cldf.clld.org/v1.0/terms.rdf#formReference">formReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing a form by providing a foreign key to <code>FormTable</code>. </p>  |  |  |
### <a id="functionalEquivalentsetReference" title="http://cldf.clld.org/v1.0/terms.rdf#functionalEquivalentsetReference"></a> Property: functionalEquivalentsetReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#functionalEquivalentsetReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#functionalEquivalentsetReference" title="http://cldf.clld.org/v1.0/terms.rdf#functionalEquivalentsetReference">functionalEquivalentsetReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> A functional equivalent set is a group of strings from different languages that express similar function. This is an identifier referencing a cognateset either <ul> <li>by providing a foreign key to <code>FunctionalEquivalentsetTable</code> or</li> <li>by using a known encoding scheme.</li> </ul> </p>  |  |  |
### <a id="gbifReference" title="http://cldf.clld.org/v1.0/terms.rdf#gbifReference"></a> Property: gbifReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#gbifReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#gbifReference" title="http://cldf.clld.org/v1.0/terms.rdf#gbifReference">gbifReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> A numeric identifier for a unit in GBIF's Backbone Taxonomy. </p> <p xmlns="http://www.w3.org/1999/xhtml"> References a taxonomic unit in GBIF's Backbone Taxonomy. Can be used for example in <code>ParameterTable</code> to mark a lexical concept as biological species. E.g. <a href="https://www.gbif.org/species/5219404">5219404</a>. </p>  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
### <a id="gloss" title="http://cldf.clld.org/v1.0/terms.rdf#gloss"></a> Property: gloss <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#gloss)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#gloss" title="http://cldf.clld.org/v1.0/terms.rdf#gloss">gloss</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> A gloss corresponding to the morpheme-pattern analysis of a word in an example. </p>  |  |  |
### <a id="glottocode" title="http://cldf.clld.org/v1.0/terms.rdf#glottocode"></a> Property: glottocode <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#glottocode)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#glottocode" title="http://cldf.clld.org/v1.0/terms.rdf#glottocode">glottocode</a> |  <p xmlns="http://www.w3.org/1999/xhtml">A Glottocode denoting a languoid described in <a href="http://glottolog.org">Glottolog</a>.</p>  |  |  |
### <a id="grammaticalityJudgement" title="http://cldf.clld.org/v1.0/terms.rdf#grammaticalityJudgement"></a> Property: grammaticalityJudgement <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#grammaticalityJudgement)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#grammaticalityJudgement" title="http://cldf.clld.org/v1.0/terms.rdf#grammaticalityJudgement">grammaticalityJudgement</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> A judgement about the (un)grammaticality of the example. </p> <p xmlns="http://www.w3.org/1999/xhtml"> A non-<code>null</code> value for this property flags an example as ungrammatical or unacceptable. The actual string value is the typographical symbol(s) or text which is to be used to mark the example when formatting it in text (e.g. <code>*</code>). </p> <p xmlns="http://www.w3.org/1999/xhtml"> <strong>Note:</strong> Ungrammatical examples should link (via <code>languageReference</code>) to special item(s) in <code>LanguageTable</code> with an empty <code>Glottocode</code> to prevent data aggregators from inadvertently assigning such an example to a proper language (if they fail to honour <code>grammaticalityJudgement</code>). </p>  |  |  |
### <a id="headword" title="http://cldf.clld.org/v1.0/terms.rdf#headword"></a> Property: headword <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#headword)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#headword" title="http://cldf.clld.org/v1.0/terms.rdf#headword">headword</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> The headword of a dictionary entry. </p>  |  |  |
### <a id="id" title="http://cldf.clld.org/v1.0/terms.rdf#id"></a> Property: id <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#id)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#id" title="http://cldf.clld.org/v1.0/terms.rdf#id">id</a> |  <p xmlns="http://www.w3.org/1999/xhtml">A unique identifier for a row in a table.</p> <p xmlns="http://www.w3.org/1999/xhtml"> To allow usage of identifiers as path components of URLs IDs must only contain alphanumeric characters, underscore and hyphen. </p>  |  |  |
### <a id="iso639P3code" title="http://cldf.clld.org/v1.0/terms.rdf#iso639P3code"></a> Property: iso639P3code <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#iso639P3code)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#iso639P3code" title="http://cldf.clld.org/v1.0/terms.rdf#iso639P3code">iso639P3code</a> |  An ISO 639-3 language code, i.e. a three-letter code denoting a valid ISO 639-3 language or macrolanguage.  |  |  |
### <a id="languageReference" title="http://cldf.clld.org/v1.0/terms.rdf#languageReference"></a> Property: languageReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#languageReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#languageReference" title="http://cldf.clld.org/v1.0/terms.rdf#languageReference">languageReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing a language either </p> <ul xmlns="http://www.w3.org/1999/xhtml"> <li>by providing a foreign key to <code>LanguageTable</code> or</li> <li>by using a known encoding scheme.</li> </ul>  |  |  |
### <a id="latitude" title="http://cldf.clld.org/v1.0/terms.rdf#latitude"></a> Property: latitude <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#latitude)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#latitude" title="http://cldf.clld.org/v1.0/terms.rdf#latitude">latitude</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> A latitude in the <a href="https://en.wikipedia.org/wiki/World_Geodetic_System">WGS 84</a> standard coordinate system, specified as decimal number of degrees. </p>  |  |  |
### <a id="lgrConformance" title="http://cldf.clld.org/v1.0/terms.rdf#lgrConformance"></a> Property: lgrConformance <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#lgrConformance)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#lgrConformance" title="http://cldf.clld.org/v1.0/terms.rdf#lgrConformance">lgrConformance</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> The level of conformance of the example with the Leipzig Glossing Rules. </p> <p xmlns="http://www.w3.org/1999/xhtml"> The following levels are distinguished: </p> <ol xmlns="http://www.w3.org/1999/xhtml"> <li><code>WORD_ALIGNED</code>: Analyzed text and glosses obey LGR rule 1, "word-by-word alignment".</li> <li><code>MORPHEME_ALIGNED</code>: Analyzed text and glosses obey LGR rule 2, "morpheme-by-morpheme correspondence".</li> </ol> <p xmlns="http://www.w3.org/1999/xhtml"> No information regarding LGR conformance should be signaled with an empty string, i.e. <code>null</code> value for the property. </p> <p xmlns="http://www.w3.org/1999/xhtml"> While more information is needed to assess how to interpret IGT - e.g. whether rule 4a is followed to group gloss elements for unsegmentable morpheme - the two levels considered here are essential for decisions about automated re-use. </p>  |  |  |
### <a id="longitude" title="http://cldf.clld.org/v1.0/terms.rdf#longitude"></a> Property: longitude <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#longitude)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#longitude" title="http://cldf.clld.org/v1.0/terms.rdf#longitude">longitude</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> A longitude in the <a href="https://en.wikipedia.org/wiki/World_Geodetic_System">WGS 84</a> standard coordinate system, specified as decimal number of degrees. </p>  |  |  |
### <a id="macroarea" title="http://cldf.clld.org/v1.0/terms.rdf#macroarea"></a> Property: macroarea <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#macroarea)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#macroarea" title="http://cldf.clld.org/v1.0/terms.rdf#macroarea">macroarea</a> |  <p xmlns="http://www.w3.org/1999/xhtml">The name of a macroarea as defined by <a href="http://glottolog.org">Glottolog</a>.</p>  |  |  |
### <a id="mediaReference" title="http://cldf.clld.org/v1.0/terms.rdf#mediaReference"></a> Property: mediaReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#mediaReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#mediaReference" title="http://cldf.clld.org/v1.0/terms.rdf#mediaReference">mediaReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing a media resource by providing a foreign key to <code>MediaTable</code>. </p>  |  |  |
### <a id="mediaType" title="http://cldf.clld.org/v1.0/terms.rdf#mediaType"></a> Property: mediaType <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#mediaType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#mediaType" title="http://cldf.clld.org/v1.0/terms.rdf#mediaType">mediaType</a> |  <p xmlns="http://www.w3.org/1999/xhtml">A media type (also known as a Multipurpose Internet Mail Extensions or MIME type) as defined by <a href="https://tools.ietf.org/html/rfc6838">IETF's RFC 6838</a>.</p>  |  |  |
### <a id="metaLanguageReference" title="http://cldf.clld.org/v1.0/terms.rdf#metaLanguageReference"></a> Property: metaLanguageReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#metaLanguageReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#metaLanguageReference" title="http://cldf.clld.org/v1.0/terms.rdf#metaLanguageReference">metaLanguageReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing the meta language - e.g. of the translation of an example - either </p> <ul xmlns="http://www.w3.org/1999/xhtml"> <li>by providing a foreign key to <code>LanguageTable</code> or</li> <li>by using a known encoding scheme.</li> </ul>  |  |  |
### <a id="motivationStructure" title="http://cldf.clld.org/v1.0/terms.rdf#motivationStructure"></a> Property: motivationStructure <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#motivationStructure)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#motivationStructure" title="http://cldf.clld.org/v1.0/terms.rdf#motivationStructure">motivationStructure</a> |  <p xmlns="http://www.w3.org/1999/xhtml">The motivation structure of a word form gives glosses for each of its <a href="http://linguistics-ontology.org/gold/2010/Morpheme">morphemes</a>. In this it is similar to an instance of <a href="http://linguistics-ontology.org/gold/2010/InterlinearGlossedText">interlinear glossed text</a> which describes the underlying semantic motivation for a given word form.</p> <p xmlns="http://www.w3.org/1999/xhtml">As an example, consider Chinese <i>shùpí</i> "bark (of a tree)" which is a compound consisting of <i>shù</i> "tree" and <i>pí</i> "skin", and whose motivation structure could be rendered as <tt>tree bark</tt>.</p>  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
### <a id="name" title="http://cldf.clld.org/v1.0/terms.rdf#name"></a> Property: name <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#name)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#name" title="http://cldf.clld.org/v1.0/terms.rdf#name">name</a> |  <p xmlns="http://www.w3.org/1999/xhtml">A title, name or label for an entity.</p>  |  |  |
### <a id="parameterReference" title="http://cldf.clld.org/v1.0/terms.rdf#parameterReference"></a> Property: parameterReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#parameterReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#parameterReference" title="http://cldf.clld.org/v1.0/terms.rdf#parameterReference">parameterReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing a parameter either </p> <ul xmlns="http://www.w3.org/1999/xhtml"> <li>by providing a foreign key to <code>ParameterTable</code> or</li> <li>by using a known encoding scheme.</li> </ul>  |  |  |
### <a id="parentLanguageGlottocode" title="http://cldf.clld.org/v1.0/terms.rdf#parentLanguageGlottocode"></a> Property: parentLanguageGlottocode <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#parentLanguageGlottocode)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#parentLanguageGlottocode" title="http://cldf.clld.org/v1.0/terms.rdf#parentLanguageGlottocode">parentLanguageGlottocode</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> A <a href="http://glottolog.org">Glottocode</a> denoting the language-level languoid that is a parent languoid of the languoid described by the row in <code>LanguageTable</code>. </p>  |  |  |
### <a id="partOfSpeech" title="http://cldf.clld.org/v1.0/terms.rdf#partOfSpeech"></a> Property: partOfSpeech <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#partOfSpeech)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#partOfSpeech" title="http://cldf.clld.org/v1.0/terms.rdf#partOfSpeech">partOfSpeech</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> The part-of-speech of a dictionary entry. </p>  |  |  |
### <a id="pathInZip" title="http://cldf.clld.org/v1.0/terms.rdf#pathInZip"></a> Property: pathInZip <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#pathInZip)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#pathInZip" title="http://cldf.clld.org/v1.0/terms.rdf#pathInZip">pathInZip</a> |  <p xmlns="http://www.w3.org/1999/xhtml">The name or path of a media file within the archive if it is archived within a <a href="https://en.wikipedia.org/wiki/ZIP_(file_format)">ZIP</a> file.</p>  |  |  |
### <a id="position" title="http://cldf.clld.org/v1.0/terms.rdf#position"></a> Property: position <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#position)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#position" title="http://cldf.clld.org/v1.0/terms.rdf#position">position</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> A position represents the placement of an item in a series or sequence of items. Although an integer is the recommended datatype, any datatype that supports a total ordering (where the order is transparent, such as alphabetic order for strings) is acceptable. It is also possible to have a list-valued column for this property, which can be useful for implementing multi-level orderings. In such cases, the typical order for tuples is assumed. </p>  |  |  |
### <a id="primaryText" title="http://cldf.clld.org/v1.0/terms.rdf#primaryText"></a> Property: primaryText <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#primaryText)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#primaryText" title="http://cldf.clld.org/v1.0/terms.rdf#primaryText">primaryText</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> The primary text of an example. </p>  |  |  |
### <a id="prosodicStructure" title="http://cldf.clld.org/v1.0/terms.rdf#prosodicStructure"></a> Property: prosodicStructure <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#prosodicStructure)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#prosodicStructure" title="http://cldf.clld.org/v1.0/terms.rdf#prosodicStructure">prosodicStructure</a> |  <p xmlns="http://www.w3.org/1999/xhtml">The prosodic structure of a <a href="http://linguistics-ontology.org/gold/2010/Segment">word form</a> labels similar prosodic contexts which may recur even within the same word. Prosodic structures for a given language may have an underlying template that describes which syllables are possible. In Chinese dialects, for example, one could describe the basic template of most syllables as consisting of <em>initial</em>, <em>medial</em>, <em>nucleus</em>, <em>coda</em>, and <em>tone</em>, of which the nucleus and the tone as a suprasegmental element are usually the only required elements.</p>  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
### <a id="root" title="http://cldf.clld.org/v1.0/terms.rdf#root"></a> Property: root <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#root)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#root" title="http://cldf.clld.org/v1.0/terms.rdf#root">root</a> |  <p xmlns="http://www.w3.org/1999/xhtml">The root of a <a href="#soundSequence">word form</a> is an abstract basic unit from which several <a href="#stem">stems</a> can be derived.</p>  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
### <a id="segments" title="http://cldf.clld.org/v1.0/terms.rdf#segments"></a> Property: segments <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#segments)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#segments" title="http://cldf.clld.org/v1.0/terms.rdf#segments">segments</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> A list of segments (aka a sound sequence) is understood as the strict segmental representation of a <a href="http://linguistics-ontology.org/gold/2010/FormUnit">form unit</a> of a language, which is usually given in phonetic transcription. <a href="http://linguistics-ontology.org/gold/2010/Suprasegmental">Suprasegmental elements</a>, like tone or accent, of sound sequences are usually represented in a sequential form, although they are usually co-articulated along with the segmental elements of a sound sequence. Alternatively, suprasegmental aspects could also be represented as part of the <a href="#prosodicStructure">prosodic structure</a> of a word form. </p>  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
### <a id="segmentSlice" title="http://cldf.clld.org/v1.0/terms.rdf#segmentSlice"></a> Property: segmentSlice <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#segmentSlice)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#segmentSlice" title="http://cldf.clld.org/v1.0/terms.rdf#segmentSlice">segmentSlice</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> List of segment indices or segment ranges forming the target of a partial cognacy judgement. </p>  |  |  |
### <a id="source" title="http://cldf.clld.org/v1.0/terms.rdf#source"></a> Property: source <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#source)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#source" title="http://cldf.clld.org/v1.0/terms.rdf#source">source</a> |  <p xmlns="http://www.w3.org/1999/xhtml">List of source specifications, of the form &lt;source_ID&gt;[], e.g. http://glottolog.org/resource/reference/id/318814[34], or meier2015[3-12] where meier2015 is a citation key in the accompanying BibTeX file.</p>  |  |  |
### <a id="sourceFormReference" title="http://cldf.clld.org/v1.0/terms.rdf#sourceFormReference"></a> Property: sourceFormReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#sourceFormReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sourceFormReference" title="http://cldf.clld.org/v1.0/terms.rdf#sourceFormReference">sourceFormReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing the source form of a loanword by providing a foreign key to <code>FormTable</code>. </p>  |  |  |
### <a id="sourceParameterReference" title="http://cldf.clld.org/v1.0/terms.rdf#sourceParameterReference"></a> Property: sourceParameterReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#sourceParameterReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sourceParameterReference" title="http://cldf.clld.org/v1.0/terms.rdf#sourceParameterReference">sourceParameterReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing the source parameter of a parameter network edge. </p>  |  |  |
### <a id="speakerArea" title="http://cldf.clld.org/v1.0/terms.rdf#speakerArea"></a> Property: speakerArea <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#speakerArea)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#speakerArea" title="http://cldf.clld.org/v1.0/terms.rdf#speakerArea">speakerArea</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing a media resource by providing a foreign key to <code>MediaTable</code>. </p> <p xmlns="http://www.w3.org/1999/xhtml"> This property can be used in <code>LanguageTable</code> to point to a media resource describing the speaker area of a language, i.e. the geographic area where the speakers of the language live. </p> <p xmlns="http://www.w3.org/1999/xhtml"> The linked media resource may be an image of a map, depicting the area, or some other multimedia content for human consumption. But it may also be a GeoJSON resource (i.e. a media resource with <code>mediaType</code> <code>application/geo+json</code>). In the latter case, the GeoJSON object MUST contain a feature with a geometry of type <code>Polygon</code> or <code>Multipolygon</code> and a key <code>cldf:languageReference</code> in its <code>properties</code> object with the linking language's <code>id</code> as value. </p>  |  |  |
### <a id="stem" title="http://cldf.clld.org/v1.0/terms.rdf#stem"></a> Property: stem <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#stem)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#stem" title="http://cldf.clld.org/v1.0/terms.rdf#stem">stem</a> |  <p xmlns="http://www.w3.org/1999/xhtml">A stem is a concrete <a href="#soundSequence">word form</a> in a language which has been derived as such from a given <a href="#root">root</a>.</p>  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
### <a id="targetFormReference" title="http://cldf.clld.org/v1.0/terms.rdf#targetFormReference"></a> Property: targetFormReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#targetFormReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#targetFormReference" title="http://cldf.clld.org/v1.0/terms.rdf#targetFormReference">targetFormReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing a loanword by providing a foreign key to <code>FormTable</code>. </p>  |  |  |
### <a id="targetParameterReference" title="http://cldf.clld.org/v1.0/terms.rdf#targetParameterReference"></a> Property: targetParameterReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#targetParameterReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#targetParameterReference" title="http://cldf.clld.org/v1.0/terms.rdf#targetParameterReference">targetParameterReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing the target parameter of a parameter network edge. </p>  |  |  |
### <a id="translatedText" title="http://cldf.clld.org/v1.0/terms.rdf#translatedText"></a> Property: translatedText <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#translatedText)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#translatedText" title="http://cldf.clld.org/v1.0/terms.rdf#translatedText">translatedText</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> The translated text of an example. </p>  |  |  |
### <a id="treeBranchLengthUnit" title="http://cldf.clld.org/v1.0/terms.rdf#treeBranchLengthUnit"></a> Property: treeBranchLengthUnit <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#treeBranchLengthUnit)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#treeBranchLengthUnit" title="http://cldf.clld.org/v1.0/terms.rdf#treeBranchLengthUnit">treeBranchLengthUnit</a> |  <p xmlns="http://www.w3.org/1999/xhtml">The unit used to measure evolutionary time in phylogenetic trees.</p>  |  |  |
### <a id="treeIsRooted" title="http://cldf.clld.org/v1.0/terms.rdf#treeIsRooted"></a> Property: treeIsRooted <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#treeIsRooted)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#treeIsRooted" title="http://cldf.clld.org/v1.0/terms.rdf#treeIsRooted">treeIsRooted</a> |  <p xmlns="http://www.w3.org/1999/xhtml">Flag signaling whether a tree is rooted or not.</p>  |  |  |
### <a id="treeReference" title="http://cldf.clld.org/v1.0/terms.rdf#treeReference"></a> Property: treeReference <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#treeReference)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#treeReference" title="http://cldf.clld.org/v1.0/terms.rdf#treeReference">treeReference</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> An identifier referencing a language tree by providing a foreign key <code>TreeTable</code>. </p>  |  |  |
### <a id="treeType" title="http://cldf.clld.org/v1.0/terms.rdf#treeType"></a> Property: treeType <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#treeType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#treeType" title="http://cldf.clld.org/v1.0/terms.rdf#treeType">treeType</a> |  <p xmlns="http://www.w3.org/1999/xhtml">The type of a tree (<code>summary</code> or <code>sample</code>) describes how the tree can be used. Summary (or consensus) trees can be analysed in isolation and should have type <code>summary</code>. Trees resulting from a method that creates multiple trees, and thus should be analysed as a whole (or sampled appropriately) should have type <code>sample</code>.</p>  |  |  |
### <a id="value" title="http://cldf.clld.org/v1.0/terms.rdf#value"></a> Property: value <small style="color:#aaa">(http://cldf.clld.org/v1.0/terms.rdf#value)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#value" title="http://cldf.clld.org/v1.0/terms.rdf#value">value</a> |  <p xmlns="http://www.w3.org/1999/xhtml"> The value (a.k.a. datapoint or measurement) of a language for a structural feature. </p> <p xmlns="http://www.w3.org/1999/xhtml"> For features with a limited, discrete set of valid values (a.k.a. categorical variables) it is recommended to relate items of <code>ValueTable</code> to the respective code in <code>CodeTable</code>. </p>  |  |  |
## Property Values

No PropertyValue entities are defined.


