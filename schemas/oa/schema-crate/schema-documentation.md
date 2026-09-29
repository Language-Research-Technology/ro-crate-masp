---
title: Web Annotation Vocabulary Schema Terms
---

# Web Annotation Vocabulary Schema Terms

This MASP Schema was machine-ported from the [W3C Web Annotation Vocabulary](https://www.w3.org/TR/annotation-vocab/) (namespace `http://www.w3.org/ns/oa#`, source [oa.ttl](https://www.w3.org/ns/oa.ttl)) using the `scripts/owl-to-masp.py` script. It has not been hand-edited.

All of the vocabulary's classes and properties are included. Its named individuals, the `oa:Motivation` values (`oa:commenting`, `oa:tagging`, etc.) and the `oa:Direction` values (`oa:ltrDirection`, `oa:rtlDirection`), are ported as instances of their class and listed in an `ItemList` per class (`#itemlist_Motivation`, `#itemlist_Direction`). Properties whose range is one of those classes (`oa:motivatedBy`, `oa:hasPurpose`, `oa:textDirection`) take their values from that list. The Annotation Protocol preferences `oa:PreferContainedDescriptions` and `oa:PreferContainedIRIs` are not ported, as they are HTTP `Prefer` header values rather than crate metadata.

## All Rules:

## Types of entities (specializations of Classes) and expected Properties


### <a id="Annotation" title="http://www.w3.org/ns/oa#Annotation"></a> Class: Annotation <small style="color:#aaa">(http://www.w3.org/ns/oa#Annotation)</small>

The class for Web Annotations.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Annotation

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#bodyValue" title="http://www.w3.org/ns/oa#bodyValue">bodyValue</a> | No | The object of the predicate is a plain text string to be used as the content of the body of the Annotation. The value MUST be an xsd:string and that data type MUST NOT be expressed in the serialization. Note that language MUST NOT be associated with the value either as a language tag, as that is only available for rdf:langString .  | schema:Text |  |
| <a href="#hasBody" title="http://www.w3.org/ns/oa#hasBody">hasBody</a> | No | The object of the relationship is a resource that is a body of the Annotation. |  |  |
| <a href="#hasTarget" title="http://www.w3.org/ns/oa#hasTarget">hasTarget</a> | No | The relationship between an Annotation and its Target. |  |  |
| <a href="#motivatedBy" title="http://www.w3.org/ns/oa#motivatedBy">motivatedBy</a> | No | The relationship between an Annotation and a Motivation that describes the reason for the Annotation's creation. | <a href="#itemlist_Motivation" title="#itemlist_Motivation">Motivation values</a> |  |
| <a href="#styledBy" title="http://www.w3.org/ns/oa#styledBy">styledBy</a> | No | A reference to a Stylesheet that should be used to apply styles to the Annotation rendering. | <a href="#Style" title="http://www.w3.org/ns/oa#Style">Style</a> |  |


### <a id="Choice" title="http://www.w3.org/ns/oa#Choice"></a> Class: Choice <small style="color:#aaa">(http://www.w3.org/ns/oa#Choice)</small>

A subClass of as:OrderedCollection that conveys to a consuming application that it should select one of the resources in the as:items list to use, rather than all of them. This is typically used to provide a choice of resources to render to the user, based on further supplied properties. If the consuming application cannot determine the user's preference, then it should use the first in the list.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Choice

*No properties defined directly on this class*



### <a id="CssSelector" title="http://www.w3.org/ns/oa#CssSelector"></a> Class: CssSelector <small style="color:#aaa">(http://www.w3.org/ns/oa#CssSelector)</small>

A CssSelector describes a Segment of interest in a representation that conforms to the Document Object Model through the use of the CSS selector specification.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from CssSelector

*No properties defined directly on this class*



### <a id="CssStyle" title="http://www.w3.org/ns/oa#CssStyle"></a> Class: CssStyle <small style="color:#aaa">(http://www.w3.org/ns/oa#CssStyle)</small>

A resource which describes styles for resources participating in the Annotation using CSS.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from CssStyle

*No properties defined directly on this class*



### <a id="DataPositionSelector" title="http://www.w3.org/ns/oa#DataPositionSelector"></a> Class: DataPositionSelector <small style="color:#aaa">(http://www.w3.org/ns/oa#DataPositionSelector)</small>

DataPositionSelector describes a range of data by recording the start and end positions of the selection in the stream. Position 0 would be immediately before the first byte, position 1 would be immediately before the second byte, and so on. The start byte is thus included in the list, but the end byte is not.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from DataPositionSelector

*No properties defined directly on this class*



### <a id="Direction" title="http://www.w3.org/ns/oa#Direction"></a> Class: Direction <small style="color:#aaa">(http://www.w3.org/ns/oa#Direction)</small>

A class to encapsulate the different text directions that a textual resource might take. It is not used directly in the Annotation Model, only its three instances.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Direction

*No properties defined directly on this class*



### <a id="FragmentSelector" title="http://www.w3.org/ns/oa#FragmentSelector"></a> Class: FragmentSelector <small style="color:#aaa">(http://www.w3.org/ns/oa#FragmentSelector)</small>

The FragmentSelector class is used to record the segment of a representation using the IRI fragment specification defined by the representation's media type.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from FragmentSelector

*No properties defined directly on this class*



### <a id="HttpRequestState" title="http://www.w3.org/ns/oa#HttpRequestState"></a> Class: HttpRequestState <small style="color:#aaa">(http://www.w3.org/ns/oa#HttpRequestState)</small>

The HttpRequestState class is used to record the HTTP request headers that a client SHOULD use to request the correct representation from the resource. 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from HttpRequestState

*No properties defined directly on this class*



### <a id="Motivation" title="http://www.w3.org/ns/oa#Motivation"></a> Class: Motivation <small style="color:#aaa">(http://www.w3.org/ns/oa#Motivation)</small>

The Motivation class is used to record the user's intent or motivation for the creation of the Annotation, or the inclusion of the body or target, that it is associated with.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Motivation

*No properties defined directly on this class*



### <a id="RangeSelector" title="http://www.w3.org/ns/oa#RangeSelector"></a> Class: RangeSelector <small style="color:#aaa">(http://www.w3.org/ns/oa#RangeSelector)</small>

A Range Selector can be used to identify the beginning and the end of the selection by using other Selectors. The selection consists of everything from the beginning of the starting selector through to the beginning of the ending selector, but not including it.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from RangeSelector

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hasEndSelector" title="http://www.w3.org/ns/oa#hasEndSelector">hasEndSelector</a> | No | The relationship between a RangeSelector and the Selector that describes the end position of the range.  | <a href="#Selector" title="http://www.w3.org/ns/oa#Selector">Selector</a> |  |
| <a href="#hasStartSelector" title="http://www.w3.org/ns/oa#hasStartSelector">hasStartSelector</a> | No | The relationship between a RangeSelector and the Selector that describes the start position of the range.  | <a href="#Selector" title="http://www.w3.org/ns/oa#Selector">Selector</a> |  |


### <a id="ResourceSelection" title="http://www.w3.org/ns/oa#ResourceSelection"></a> Class: ResourceSelection <small style="color:#aaa">(http://www.w3.org/ns/oa#ResourceSelection)</small>

Instances of the ResourceSelection class identify part (described by an oa:Selector) of another resource (referenced with oa:hasSource), possibly from a particular representation of a resource (described by an oa:State). Please note that ResourceSelection is not used directly in the Web Annotation model, but is provided as a separate class for further application profiles to use, separate from oa:SpecificResource which has many Annotation specific features.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from ResourceSelection

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hasSelector" title="http://www.w3.org/ns/oa#hasSelector">hasSelector</a> | No | The object of the relationship is a Selector that describes the segment or region of interest within the source resource. Please note that the domain ( oa:ResourceSelection ) is not used directly in the Web Annotation model. | <a href="#Selector" title="http://www.w3.org/ns/oa#Selector">Selector</a> |  |
| <a href="#hasSource" title="http://www.w3.org/ns/oa#hasSource">hasSource</a> | No | The resource that the ResourceSelection, or its subclass SpecificResource, is refined from, or more specific than. Please note that the domain ( oa:ResourceSelection ) is not used directly in the Web Annotation model. |  |  |
| <a href="#hasState" title="http://www.w3.org/ns/oa#hasState">hasState</a> | No | The relationship between the ResourceSelection, or its subclass SpecificResource, and a State resource. Please note that the domain ( oa:ResourceSelection ) is not used directly in the Web Annotation model. | <a href="#State" title="http://www.w3.org/ns/oa#State">State</a> |  |


### <a id="Selector" title="http://www.w3.org/ns/oa#Selector"></a> Class: Selector <small style="color:#aaa">(http://www.w3.org/ns/oa#Selector)</small>

A resource which describes the segment of interest in a representation of a Source resource, indicated with oa:hasSelector from the Specific Resource. This class is not used directly in the Annotation model, only its subclasses.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Selector

*No properties defined directly on this class*



### <a id="SpecificResource" title="http://www.w3.org/ns/oa#SpecificResource"></a> Class: SpecificResource <small style="color:#aaa">(http://www.w3.org/ns/oa#SpecificResource)</small>

Instances of the SpecificResource class identify part of another resource (referenced with oa:hasSource), a particular representation of a resource, a resource with styling hints for renders, or any combination of these, as used within an Annotation.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from SpecificResource

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hasScope" title="http://www.w3.org/ns/oa#hasScope">hasScope</a> | No | The scope or context in which the resource is used within the Annotation. |  |  |
| <a href="#renderedVia" title="http://www.w3.org/ns/oa#renderedVia">renderedVia</a> | No | A system that was used by the application that created the Annotation to render the resource. |  |  |
| <a href="#styleClass" title="http://www.w3.org/ns/oa#styleClass">styleClass</a> | No | The name of the class used in the CSS description referenced from the Annotation that should be applied to the Specific Resource. | schema:Text |  |

#### Properties from ResourceSelection

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hasSelector" title="http://www.w3.org/ns/oa#hasSelector">hasSelector</a> | No | The object of the relationship is a Selector that describes the segment or region of interest within the source resource. Please note that the domain ( oa:ResourceSelection ) is not used directly in the Web Annotation model. | <a href="#Selector" title="http://www.w3.org/ns/oa#Selector">Selector</a> |  |
| <a href="#hasSource" title="http://www.w3.org/ns/oa#hasSource">hasSource</a> | No | The resource that the ResourceSelection, or its subclass SpecificResource, is refined from, or more specific than. Please note that the domain ( oa:ResourceSelection ) is not used directly in the Web Annotation model. |  |  |
| <a href="#hasState" title="http://www.w3.org/ns/oa#hasState">hasState</a> | No | The relationship between the ResourceSelection, or its subclass SpecificResource, and a State resource. Please note that the domain ( oa:ResourceSelection ) is not used directly in the Web Annotation model. | <a href="#State" title="http://www.w3.org/ns/oa#State">State</a> |  |


### <a id="State" title="http://www.w3.org/ns/oa#State"></a> Class: State <small style="color:#aaa">(http://www.w3.org/ns/oa#State)</small>

A State describes the intended state of a resource as applied to the particular Annotation, and thus provides the information needed to retrieve the correct representation of that resource.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from State

*No properties defined directly on this class*



### <a id="Style" title="http://www.w3.org/ns/oa#Style"></a> Class: Style <small style="color:#aaa">(http://www.w3.org/ns/oa#Style)</small>

A Style describes the intended styling of a resource as applied to the particular Annotation, and thus provides the information to ensure that rendering is consistent across implementations.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from Style

*No properties defined directly on this class*



### <a id="SvgSelector" title="http://www.w3.org/ns/oa#SvgSelector"></a> Class: SvgSelector <small style="color:#aaa">(http://www.w3.org/ns/oa#SvgSelector)</small>

An SvgSelector defines an area through the use of the Scalable Vector Graphics [SVG] standard. This allows the user to select a non-rectangular area of the content, such as a circle or polygon by describing the region using SVG. The SVG may be either embedded within the Annotation or referenced as an External Resource.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from SvgSelector

*No properties defined directly on this class*



### <a id="TextPositionSelector" title="http://www.w3.org/ns/oa#TextPositionSelector"></a> Class: TextPositionSelector <small style="color:#aaa">(http://www.w3.org/ns/oa#TextPositionSelector)</small>

The TextPositionSelector describes a range of text by recording the start and end positions of the selection in the stream. Position 0 would be immediately before the first character, position 1 would be immediately before the second character, and so on.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from TextPositionSelector

*No properties defined directly on this class*



### <a id="TextQuoteSelector" title="http://www.w3.org/ns/oa#TextQuoteSelector"></a> Class: TextQuoteSelector <small style="color:#aaa">(http://www.w3.org/ns/oa#TextQuoteSelector)</small>

The TextQuoteSelector describes a range of text by copying it, and including some of the text immediately before (a prefix) and after (a suffix) it to distinguish between multiple copies of the same sequence of characters.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from TextQuoteSelector

*No properties defined directly on this class*



### <a id="TextualBody" title="http://www.w3.org/ns/oa#TextualBody"></a> Class: TextualBody <small style="color:#aaa">(http://www.w3.org/ns/oa#TextualBody)</small>



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from TextualBody

*No properties defined directly on this class*



### <a id="TimeState" title="http://www.w3.org/ns/oa#TimeState"></a> Class: TimeState <small style="color:#aaa">(http://www.w3.org/ns/oa#TimeState)</small>

A TimeState records the time at which the resource's state is appropriate for the Annotation, typically the time that the Annotation was created and/or a link to a persistent copy of the current version.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from TimeState

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#cachedSource" title="http://www.w3.org/ns/oa#cachedSource">cachedSource</a> | No | A object of the relationship is a copy of the Source resource's representation, appropriate for the Annotation. |  |  |
| <a href="#sourceDate" title="http://www.w3.org/ns/oa#sourceDate">sourceDate</a> | No | The timestamp at which the Source resource should be interpreted as being applicable to the Annotation. | schema:DateTime |  |
| <a href="#sourceDateEnd" title="http://www.w3.org/ns/oa#sourceDateEnd">sourceDateEnd</a> | No | The end timestamp of the interval over which the Source resource should be interpreted as being applicable to the Annotation. | schema:DateTime |  |
| <a href="#sourceDateStart" title="http://www.w3.org/ns/oa#sourceDateStart">sourceDateStart</a> | No | The start timestamp of the interval over which the Source resource should be interpreted as being applicable to the Annotation. | schema:DateTime |  |


### <a id="XPathSelector" title="http://www.w3.org/ns/oa#XPathSelector"></a> Class: XPathSelector <small style="color:#aaa">(http://www.w3.org/ns/oa#XPathSelector)</small>

 An XPathSelector is used to select elements and content within a resource that supports the Document Object Model via a specified XPath value.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

#### Properties from XPathSelector

*No properties defined directly on this class*


## All Properties

### <a id="annotationService" title="http://www.w3.org/ns/oa#annotationService"></a> Property: annotationService <small style="color:#aaa">(http://www.w3.org/ns/oa#annotationService)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#annotationService" title="http://www.w3.org/ns/oa#annotationService">annotationService</a> | The object of the relationship is the end point of a service that conforms to the annotation-protocol, and it may be associated with any resource. The expectation of asserting the relationship is that the object is the preferred service for maintaining annotations about the subject resource, according to the publisher of the relationship. This relationship is intended to be used both within Linked Data descriptions and as the rel type of a Link, via HTTP Link Headers rfc5988 for binary resources and in HTML <link> elements. For more information about these, please see the Annotation Protocol specification annotation-protocol.  |  |  |
### <a id="bodyValue" title="http://www.w3.org/ns/oa#bodyValue"></a> Property: bodyValue <small style="color:#aaa">(http://www.w3.org/ns/oa#bodyValue)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#bodyValue" title="http://www.w3.org/ns/oa#bodyValue">bodyValue</a> | The object of the predicate is a plain text string to be used as the content of the body of the Annotation. The value MUST be an xsd:string and that data type MUST NOT be expressed in the serialization. Note that language MUST NOT be associated with the value either as a language tag, as that is only available for rdf:langString .  | schema:Text | <a href="#Annotation" title="http://www.w3.org/ns/oa#Annotation">Annotation</a> |
### <a id="cachedSource" title="http://www.w3.org/ns/oa#cachedSource"></a> Property: cachedSource <small style="color:#aaa">(http://www.w3.org/ns/oa#cachedSource)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#cachedSource" title="http://www.w3.org/ns/oa#cachedSource">cachedSource</a> | A object of the relationship is a copy of the Source resource's representation, appropriate for the Annotation. |  | <a href="#TimeState" title="http://www.w3.org/ns/oa#TimeState">TimeState</a> |
### <a id="canonical" title="http://www.w3.org/ns/oa#canonical"></a> Property: canonical <small style="color:#aaa">(http://www.w3.org/ns/oa#canonical)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#canonical" title="http://www.w3.org/ns/oa#canonical">canonical</a> | A object of the relationship is the canonical IRI that can always be used to deduplicate the Annotation, regardless of the current IRI used to access the representation. |  |  |
### <a id="end" title="http://www.w3.org/ns/oa#end"></a> Property: end <small style="color:#aaa">(http://www.w3.org/ns/oa#end)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#end" title="http://www.w3.org/ns/oa#end">end</a> | The end property is used to convey the 0-based index of the end position of a range of content. | schema:Integer |  |
### <a id="exact" title="http://www.w3.org/ns/oa#exact"></a> Property: exact <small style="color:#aaa">(http://www.w3.org/ns/oa#exact)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#exact" title="http://www.w3.org/ns/oa#exact">exact</a> | The object of the predicate is a copy of the text which is being selected, after normalization. | schema:Text |  |
### <a id="hasBody" title="http://www.w3.org/ns/oa#hasBody"></a> Property: hasBody <small style="color:#aaa">(http://www.w3.org/ns/oa#hasBody)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasBody" title="http://www.w3.org/ns/oa#hasBody">hasBody</a> | The object of the relationship is a resource that is a body of the Annotation. |  | <a href="#Annotation" title="http://www.w3.org/ns/oa#Annotation">Annotation</a> |
### <a id="hasEndSelector" title="http://www.w3.org/ns/oa#hasEndSelector"></a> Property: hasEndSelector <small style="color:#aaa">(http://www.w3.org/ns/oa#hasEndSelector)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasEndSelector" title="http://www.w3.org/ns/oa#hasEndSelector">hasEndSelector</a> | The relationship between a RangeSelector and the Selector that describes the end position of the range.  | <a href="#Selector" title="http://www.w3.org/ns/oa#Selector">Selector</a> | <a href="#RangeSelector" title="http://www.w3.org/ns/oa#RangeSelector">RangeSelector</a> |
### <a id="hasPurpose" title="http://www.w3.org/ns/oa#hasPurpose"></a> Property: hasPurpose <small style="color:#aaa">(http://www.w3.org/ns/oa#hasPurpose)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasPurpose" title="http://www.w3.org/ns/oa#hasPurpose">hasPurpose</a> | The purpose served by the resource in the Annotation. | <a href="#itemlist_Motivation" title="#itemlist_Motivation">Motivation values</a> |  |
### <a id="hasScope" title="http://www.w3.org/ns/oa#hasScope"></a> Property: hasScope <small style="color:#aaa">(http://www.w3.org/ns/oa#hasScope)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasScope" title="http://www.w3.org/ns/oa#hasScope">hasScope</a> | The scope or context in which the resource is used within the Annotation. |  | <a href="#SpecificResource" title="http://www.w3.org/ns/oa#SpecificResource">SpecificResource</a> |
### <a id="hasSelector" title="http://www.w3.org/ns/oa#hasSelector"></a> Property: hasSelector <small style="color:#aaa">(http://www.w3.org/ns/oa#hasSelector)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasSelector" title="http://www.w3.org/ns/oa#hasSelector">hasSelector</a> | The object of the relationship is a Selector that describes the segment or region of interest within the source resource. Please note that the domain ( oa:ResourceSelection ) is not used directly in the Web Annotation model. | <a href="#Selector" title="http://www.w3.org/ns/oa#Selector">Selector</a> | <a href="#ResourceSelection" title="http://www.w3.org/ns/oa#ResourceSelection">ResourceSelection</a> |
### <a id="hasSource" title="http://www.w3.org/ns/oa#hasSource"></a> Property: hasSource <small style="color:#aaa">(http://www.w3.org/ns/oa#hasSource)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasSource" title="http://www.w3.org/ns/oa#hasSource">hasSource</a> | The resource that the ResourceSelection, or its subclass SpecificResource, is refined from, or more specific than. Please note that the domain ( oa:ResourceSelection ) is not used directly in the Web Annotation model. |  | <a href="#ResourceSelection" title="http://www.w3.org/ns/oa#ResourceSelection">ResourceSelection</a> |
### <a id="hasStartSelector" title="http://www.w3.org/ns/oa#hasStartSelector"></a> Property: hasStartSelector <small style="color:#aaa">(http://www.w3.org/ns/oa#hasStartSelector)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasStartSelector" title="http://www.w3.org/ns/oa#hasStartSelector">hasStartSelector</a> | The relationship between a RangeSelector and the Selector that describes the start position of the range.  | <a href="#Selector" title="http://www.w3.org/ns/oa#Selector">Selector</a> | <a href="#RangeSelector" title="http://www.w3.org/ns/oa#RangeSelector">RangeSelector</a> |
### <a id="hasState" title="http://www.w3.org/ns/oa#hasState"></a> Property: hasState <small style="color:#aaa">(http://www.w3.org/ns/oa#hasState)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasState" title="http://www.w3.org/ns/oa#hasState">hasState</a> | The relationship between the ResourceSelection, or its subclass SpecificResource, and a State resource. Please note that the domain ( oa:ResourceSelection ) is not used directly in the Web Annotation model. | <a href="#State" title="http://www.w3.org/ns/oa#State">State</a> | <a href="#ResourceSelection" title="http://www.w3.org/ns/oa#ResourceSelection">ResourceSelection</a> |
### <a id="hasTarget" title="http://www.w3.org/ns/oa#hasTarget"></a> Property: hasTarget <small style="color:#aaa">(http://www.w3.org/ns/oa#hasTarget)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasTarget" title="http://www.w3.org/ns/oa#hasTarget">hasTarget</a> | The relationship between an Annotation and its Target. |  | <a href="#Annotation" title="http://www.w3.org/ns/oa#Annotation">Annotation</a> |
### <a id="motivatedBy" title="http://www.w3.org/ns/oa#motivatedBy"></a> Property: motivatedBy <small style="color:#aaa">(http://www.w3.org/ns/oa#motivatedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#motivatedBy" title="http://www.w3.org/ns/oa#motivatedBy">motivatedBy</a> | The relationship between an Annotation and a Motivation that describes the reason for the Annotation's creation. | <a href="#itemlist_Motivation" title="#itemlist_Motivation">Motivation values</a> | <a href="#Annotation" title="http://www.w3.org/ns/oa#Annotation">Annotation</a> |
### <a id="prefix" title="http://www.w3.org/ns/oa#prefix"></a> Property: prefix <small style="color:#aaa">(http://www.w3.org/ns/oa#prefix)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#prefix" title="http://www.w3.org/ns/oa#prefix">prefix</a> | The object of the property is a snippet of content that occurs immediately before the content which is being selected by the Selector. | schema:Text |  |
### <a id="processingLanguage" title="http://www.w3.org/ns/oa#processingLanguage"></a> Property: processingLanguage <small style="color:#aaa">(http://www.w3.org/ns/oa#processingLanguage)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#processingLanguage" title="http://www.w3.org/ns/oa#processingLanguage">processingLanguage</a> | The object of the property is the language that should be used for textual processing algorithms when dealing with the content of the resource, including hyphenation, line breaking, which font to use for rendering and so forth. The value must follow the recommendations of BCP47. | schema:Text |  |
### <a id="refinedBy" title="http://www.w3.org/ns/oa#refinedBy"></a> Property: refinedBy <small style="color:#aaa">(http://www.w3.org/ns/oa#refinedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#refinedBy" title="http://www.w3.org/ns/oa#refinedBy">refinedBy</a> | The relationship between a Selector and another Selector or a State and a Selector or State that should be applied to the results of the first to refine the processing of the source resource.  |  |  |
### <a id="renderedVia" title="http://www.w3.org/ns/oa#renderedVia"></a> Property: renderedVia <small style="color:#aaa">(http://www.w3.org/ns/oa#renderedVia)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#renderedVia" title="http://www.w3.org/ns/oa#renderedVia">renderedVia</a> | A system that was used by the application that created the Annotation to render the resource. |  | <a href="#SpecificResource" title="http://www.w3.org/ns/oa#SpecificResource">SpecificResource</a> |
### <a id="sourceDate" title="http://www.w3.org/ns/oa#sourceDate"></a> Property: sourceDate <small style="color:#aaa">(http://www.w3.org/ns/oa#sourceDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sourceDate" title="http://www.w3.org/ns/oa#sourceDate">sourceDate</a> | The timestamp at which the Source resource should be interpreted as being applicable to the Annotation. | schema:DateTime | <a href="#TimeState" title="http://www.w3.org/ns/oa#TimeState">TimeState</a> |
### <a id="sourceDateEnd" title="http://www.w3.org/ns/oa#sourceDateEnd"></a> Property: sourceDateEnd <small style="color:#aaa">(http://www.w3.org/ns/oa#sourceDateEnd)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sourceDateEnd" title="http://www.w3.org/ns/oa#sourceDateEnd">sourceDateEnd</a> | The end timestamp of the interval over which the Source resource should be interpreted as being applicable to the Annotation. | schema:DateTime | <a href="#TimeState" title="http://www.w3.org/ns/oa#TimeState">TimeState</a> |
### <a id="sourceDateStart" title="http://www.w3.org/ns/oa#sourceDateStart"></a> Property: sourceDateStart <small style="color:#aaa">(http://www.w3.org/ns/oa#sourceDateStart)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sourceDateStart" title="http://www.w3.org/ns/oa#sourceDateStart">sourceDateStart</a> | The start timestamp of the interval over which the Source resource should be interpreted as being applicable to the Annotation. | schema:DateTime | <a href="#TimeState" title="http://www.w3.org/ns/oa#TimeState">TimeState</a> |
### <a id="start" title="http://www.w3.org/ns/oa#start"></a> Property: start <small style="color:#aaa">(http://www.w3.org/ns/oa#start)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#start" title="http://www.w3.org/ns/oa#start">start</a> | The start position in a 0-based index at which a range of content is selected from the data in the source resource. | schema:Integer |  |
### <a id="styleClass" title="http://www.w3.org/ns/oa#styleClass"></a> Property: styleClass <small style="color:#aaa">(http://www.w3.org/ns/oa#styleClass)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#styleClass" title="http://www.w3.org/ns/oa#styleClass">styleClass</a> | The name of the class used in the CSS description referenced from the Annotation that should be applied to the Specific Resource. | schema:Text | <a href="#SpecificResource" title="http://www.w3.org/ns/oa#SpecificResource">SpecificResource</a> |
### <a id="styledBy" title="http://www.w3.org/ns/oa#styledBy"></a> Property: styledBy <small style="color:#aaa">(http://www.w3.org/ns/oa#styledBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#styledBy" title="http://www.w3.org/ns/oa#styledBy">styledBy</a> | A reference to a Stylesheet that should be used to apply styles to the Annotation rendering. | <a href="#Style" title="http://www.w3.org/ns/oa#Style">Style</a> | <a href="#Annotation" title="http://www.w3.org/ns/oa#Annotation">Annotation</a> |
### <a id="suffix" title="http://www.w3.org/ns/oa#suffix"></a> Property: suffix <small style="color:#aaa">(http://www.w3.org/ns/oa#suffix)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#suffix" title="http://www.w3.org/ns/oa#suffix">suffix</a> | The snippet of text that occurs immediately after the text which is being selected. | schema:Text |  |
### <a id="textDirection" title="http://www.w3.org/ns/oa#textDirection"></a> Property: textDirection <small style="color:#aaa">(http://www.w3.org/ns/oa#textDirection)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#textDirection" title="http://www.w3.org/ns/oa#textDirection">textDirection</a> | The direction of the text of the subject resource. There MUST only be one text direction associated with any given resource. | <a href="#itemlist_Direction" title="#itemlist_Direction">Direction values</a> |  |
### <a id="via" title="http://www.w3.org/ns/oa#via"></a> Property: via <small style="color:#aaa">(http://www.w3.org/ns/oa#via)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#via" title="http://www.w3.org/ns/oa#via">via</a> | A object of the relationship is a resource from which the source resource was retrieved by the providing system. |  |  |
## Property Values

No PropertyValue entities are defined.



## Value Lists

## Item Lists

### <a id="itemlist_Direction"></a>Item List: Direction values



<table>
<thead><tr><th>Name</th><th>@id</th><th>Entity</th></tr></thead>
<tbody>
<tr><td>ltrDirection</td><td><a id="ltrDirection" href="http://www.w3.org/ns/oa#ltrDirection" target="_blank" rel="noopener">http://www.w3.org/ns/oa#ltrDirection</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#ltrDirection&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Direction&quot;,
  &quot;name&quot;: &quot;ltrDirection&quot;,
  &quot;description&quot;: &quot;The direction of text that is read from left to right.&quot;
}</code></pre></td></tr>
<tr><td>rtlDirection</td><td><a id="rtlDirection" href="http://www.w3.org/ns/oa#rtlDirection" target="_blank" rel="noopener">http://www.w3.org/ns/oa#rtlDirection</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#rtlDirection&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Direction&quot;,
  &quot;name&quot;: &quot;rtlDirection&quot;,
  &quot;description&quot;: &quot;The direction of text that is read from right to left.&quot;
}</code></pre></td></tr>
</tbody></table>

### <a id="itemlist_Motivation"></a>Item List: Motivation values



<table>
<thead><tr><th>Name</th><th>@id</th><th>Entity</th></tr></thead>
<tbody>
<tr><td>assessing</td><td><a id="assessing" href="http://www.w3.org/ns/oa#assessing" target="_blank" rel="noopener">http://www.w3.org/ns/oa#assessing</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#assessing&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;assessing&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to provide an assessment about the Target resource.&quot;
}</code></pre></td></tr>
<tr><td>bookmarking</td><td><a id="bookmarking" href="http://www.w3.org/ns/oa#bookmarking" target="_blank" rel="noopener">http://www.w3.org/ns/oa#bookmarking</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#bookmarking&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;bookmarking&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to create a bookmark to the Target or part thereof.&quot;
}</code></pre></td></tr>
<tr><td>classifying</td><td><a id="classifying" href="http://www.w3.org/ns/oa#classifying" target="_blank" rel="noopener">http://www.w3.org/ns/oa#classifying</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#classifying&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;classifying&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to that classify the Target as something.&quot;
}</code></pre></td></tr>
<tr><td>commenting</td><td><a id="commenting" href="http://www.w3.org/ns/oa#commenting" target="_blank" rel="noopener">http://www.w3.org/ns/oa#commenting</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#commenting&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;commenting&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to comment about the Target.&quot;
}</code></pre></td></tr>
<tr><td>describing</td><td><a id="describing" href="http://www.w3.org/ns/oa#describing" target="_blank" rel="noopener">http://www.w3.org/ns/oa#describing</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#describing&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;describing&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to describe the Target, as opposed to a comment about them.&quot;
}</code></pre></td></tr>
<tr><td>editing</td><td><a id="editing" href="http://www.w3.org/ns/oa#editing" target="_blank" rel="noopener">http://www.w3.org/ns/oa#editing</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#editing&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;editing&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to request a change or edit to the Target resource.&quot;
}</code></pre></td></tr>
<tr><td>highlighting</td><td><a id="highlighting" href="http://www.w3.org/ns/oa#highlighting" target="_blank" rel="noopener">http://www.w3.org/ns/oa#highlighting</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#highlighting&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;highlighting&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to highlight the Target resource or segment of it.&quot;
}</code></pre></td></tr>
<tr><td>identifying</td><td><a id="identifying" href="http://www.w3.org/ns/oa#identifying" target="_blank" rel="noopener">http://www.w3.org/ns/oa#identifying</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#identifying&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;identifying&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to assign an identity to the Target or identify what is being depicted or described in the Target.&quot;
}</code></pre></td></tr>
<tr><td>linking</td><td><a id="linking" href="http://www.w3.org/ns/oa#linking" target="_blank" rel="noopener">http://www.w3.org/ns/oa#linking</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#linking&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;linking&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to link to a resource related to the Target.&quot;
}</code></pre></td></tr>
<tr><td>moderating</td><td><a id="moderating" href="http://www.w3.org/ns/oa#moderating" target="_blank" rel="noopener">http://www.w3.org/ns/oa#moderating</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#moderating&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;moderating&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to assign some value or quality to the Target.&quot;
}</code></pre></td></tr>
<tr><td>questioning</td><td><a id="questioning" href="http://www.w3.org/ns/oa#questioning" target="_blank" rel="noopener">http://www.w3.org/ns/oa#questioning</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#questioning&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;questioning&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to ask a question about the Target.&quot;
}</code></pre></td></tr>
<tr><td>replying</td><td><a id="replying" href="http://www.w3.org/ns/oa#replying" target="_blank" rel="noopener">http://www.w3.org/ns/oa#replying</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#replying&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;replying&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to reply to a previous statement, either an Annotation or another resource.&quot;
}</code></pre></td></tr>
<tr><td>tagging</td><td><a id="tagging" href="http://www.w3.org/ns/oa#tagging" target="_blank" rel="noopener">http://www.w3.org/ns/oa#tagging</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;http://www.w3.org/ns/oa#tagging&quot;,
  &quot;@type&quot;: &quot;http://www.w3.org/ns/oa#Motivation&quot;,
  &quot;name&quot;: &quot;tagging&quot;,
  &quot;description&quot;: &quot;The motivation for when the user intends to associate a tag with the Target.&quot;
}</code></pre></td></tr>
</tbody></table>


