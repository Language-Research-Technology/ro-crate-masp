---
title: Records in Context Ontology Schema Terms
---

# Records in Context Ontology Schema Terms

The [Records in Context Ontology (RiC-O)](https://www.ica.org/standards/RiC/RiC-O_1-1.html) is published by the International Council on Archives (ICA) Expert Group on Archival Description (EGAD) as part of *Records in Context*, a conceptual model for archival description. This schema is a machine-generated MASP conversion of [RiC-O 1.1](https://www.ica.org/standards/RiC/RiC-O_1-1.rdf), produced by [`scripts/owl-to-masp.py`](https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/scripts/owl-to-masp.py) — see that script's [spec](https://github.com/Language-Research-Technology/ro-crate-masp/blob/main/scripts/owl-to-masp.spec.md) for the conversion's mapping rules and known limitations, and [`schema-crate/RiC-O_1-1.rdf`](schema-crate/RiC-O_1-1.rdf) for the exact source file converted (also recorded via a `CreateAction` in `ro-crate-metadata.json`).

Conversion caveats:
- Only the ~660 classes and properties defined in RiC-O's own namespace (`https://www.ica.org/standards/RiC/ontology#`) were converted; terms it imports from other vocabularies (SKOS, Dublin Core, etc.) are not included as their own entities, though properties may still reference them.
- `owl:Restriction`-based `rdfs:subClassOf` axioms (e.g. cardinality or `someValuesFrom` restrictions) are not modelled — only named superclasses are kept, so some of RiC-O's OWL semantics are intentionally simplified for MASP's class/property rule model.
- Cardinality (`sh:minCount`/`sh:maxCount`) is left unset throughout; RiC-O does not express this in a form the converter maps automatically.
- Each class/property's `rdfs:label` is its JSON-LD term name (the IRI's local name, e.g. `isComponentOfTransitive`); the expanded, human-readable OWL label (e.g. "is component of transitive") is in `name` instead — see the spec's "Label vs. name" section.
- This is a **schema**, not a profile: it defines the available terms but doesn't itself constrain which are required in a conforming RO-Crate. A profile specialising a subset of RiC-O for a particular use (e.g. describing archival record sets in an RO-Crate) would be a separate, hand-authored crate in `profiles/`.

## All Rules:

## Types of entities (specializations of Classes) and expected Properties


### <a id="AccumulationRelation" title="https://www.ica.org/standards/RiC/ontology#AccumulationRelation"></a> Class: Accumulation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#AccumulationRelation)</small>

Connects at least one Record Resource or Instantiation to at least one Agent, when the Record Resource or Instantiation is or was accumulated by the Agent, be it intentionally (collecting it) or not (receiving it in the course of its activities). The Record Resource(s) or Instantiation(s) is the source of the Relation, and the Agent(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#accumulationRelation_role" title="https://www.ica.org/standards/RiC/ontology#accumulationRelation_role">accumulationRelation_role</a> | No | Connects an AccumulationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AccumulationRelation" title="https://www.ica.org/standards/RiC/ontology#AccumulationRelation">Accumulation Relation</a> |  |


### <a id="Activity" title="https://www.ica.org/standards/RiC/ontology#Activity"></a> Class: Activity <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Activity)</small>

The doing of something for some human purpose.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#activityIsContextOfRelation" title="https://www.ica.org/standards/RiC/ontology#activityIsContextOfRelation">activityIsContextOfRelation</a> | No | Connects an Activity to an Agent Temporal Relation (when the Activity is transferred from an Agent to another one) or a Mandate Relation (the Mandate assigns the Activity to the Agent or defines it). | <a href="#AgentTemporalRelation" title="https://www.ica.org/standards/RiC/ontology#AgentTemporalRelation">Agent Temporal Relation</a>, <a href="#MandateRelation" title="https://www.ica.org/standards/RiC/ontology#MandateRelation">Mandate Relation</a> |  |
| <a href="#documentedBy" title="https://www.ica.org/standards/RiC/ontology#documentedBy">documentedBy</a> | No | Inverse of 'documents' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#hasActivityType" title="https://www.ica.org/standards/RiC/ontology#hasActivityType">hasActivityType</a> | No | Connects an Activity to an Activity Type that categorizes it. | <a href="#ActivityType" title="https://www.ica.org/standards/RiC/ontology#ActivityType">Activity Type</a> |  |
| <a href="#isOrWasPerformedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasPerformedBy">isOrWasPerformedBy</a> | No | Connects an Activity to an Agent that performed or performs the Activity. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#isOrganicOrFunctionalProvenanceOf" title="https://www.ica.org/standards/RiC/ontology#isOrganicOrFunctionalProvenanceOf">isOrganicOrFunctionalProvenanceOf</a> | No | Inverse of 'has organic or functional provenance' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |


### <a id="ActivityDocumentationRelation" title="https://www.ica.org/standards/RiC/ontology#ActivityDocumentationRelation"></a> Class: Activity Documentation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#ActivityDocumentationRelation)</small>

Connects at least one Record Resource or Instantiation to at least one Activity, when the Record Resource or Instantiation results from the Activity. The Record Resource(s) or Instantiation(s) is the source of the Relation, and the Activity(-ies) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#activityDocumentationRelation_role" title="https://www.ica.org/standards/RiC/ontology#activityDocumentationRelation_role">activityDocumentationRelation_role</a> | No | Connects an ActivityDocumentationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#ActivityDocumentationRelation" title="https://www.ica.org/standards/RiC/ontology#ActivityDocumentationRelation">Activity Documentation Relation</a> |  |


### <a id="ActivityType" title="https://www.ica.org/standards/RiC/ontology#ActivityType"></a> Class: Activity Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#ActivityType)</small>

Categorization of an Activity.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isActivityTypeOf" title="https://www.ica.org/standards/RiC/ontology#isActivityTypeOf">isActivityTypeOf</a> | No | Connects an Activity Type to an Activity that it categorizes. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> |  |


### <a id="Agent" title="https://www.ica.org/standards/RiC/ontology#Agent"></a> Class: Agent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Agent)</small>

A Person, or Group, or an entity created by a Person or Group (Mechanism), or a Position, that acts in the world.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#agentHasOrHadLocation" title="https://www.ica.org/standards/RiC/ontology#agentHasOrHadLocation">agentHasOrHadLocation</a> | No | Inverse of 'is or was location of agent' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#authorizedBy" title="https://www.ica.org/standards/RiC/ontology#authorizedBy">authorizedBy</a> | No | Inverse of 'authorizes' object property. | <a href="#Mandate" title="https://www.ica.org/standards/RiC/ontology#Mandate">Mandate</a> |  |
| <a href="#authorizingMandate" title="https://www.ica.org/standards/RiC/ontology#authorizingMandate">authorizingMandate</a> | No | Information on a Mandate that authorizes an Agent to perform an Activity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#hadSubordinate" title="https://www.ica.org/standards/RiC/ontology#hadSubordinate">hadSubordinate</a> | No | Connects an Agent to an Agent that was hierarchically inferior in the past. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasDirectSubordinate" title="https://www.ica.org/standards/RiC/ontology#hasDirectSubordinate">hasDirectSubordinate</a> | No | Connects an Agent to an Agent that is its direct subordinate. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrHadAgentName" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAgentName">hasOrHadAgentName</a> | No | Connects an Agent and (one of) its present or past Agent Name. | <a href="#AgentName" title="https://www.ica.org/standards/RiC/ontology#AgentName">Agent Name</a> |  |
| <a href="#hasOrHadAuthorityOver" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAuthorityOver">hasOrHadAuthorityOver</a> | No | Connects an Agent to a Thing over which the Agent has or had some kind of authority. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasOrHadController" title="https://www.ica.org/standards/RiC/ontology#hasOrHadController">hasOrHadController</a> | No | Inverse of 'is or was controller of' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrHadJurisdiction" title="https://www.ica.org/standards/RiC/ontology#hasOrHadJurisdiction">hasOrHadJurisdiction</a> | No | Inverse of 'is or was jurisdiction of' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#hasOrHadLanguage" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLanguage">hasOrHadLanguage</a> | No | Connects an Agent, Record or Record Part to a Language that uses or used it. | <a href="#Language" title="https://www.ica.org/standards/RiC/ontology#Language">Language</a> |  |
| <a href="#hasOrHadLegalStatus" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLegalStatus">hasOrHadLegalStatus</a> | No | Connects an Agent or Record Resource to a Legal Status which categorized or categorizes it. | <a href="#LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus">Legal Status</a> |  |
| <a href="#hasOrHadSubordinate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubordinate">hasOrHadSubordinate</a> | No | Connects an Agent to an Agent that is hierarchically inferior. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrHadWorkRelationWith" title="https://www.ica.org/standards/RiC/ontology#hasOrHadWorkRelationWith">hasOrHadWorkRelationWith</a> | No | Connects two Agents that have or had some type of work relation in the course of their activities. This relation is symmetric. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasSubordinateTransitive" title="https://www.ica.org/standards/RiC/ontology#hasSubordinateTransitive">hasSubordinateTransitive</a> | No | Connects an Agent to an Agent that is directly or indirectly hierarchically inferior. This is a transitive relation. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasSuccessor" title="https://www.ica.org/standards/RiC/ontology#hasSuccessor">hasSuccessor</a> | No | Connects an Agent to another Agent that succeeds it chronologically. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#history" title="https://www.ica.org/standards/RiC/ontology#history">history</a> | No | Summary of the development of an entity throughout its existence. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#isAccumulatorOf" title="https://www.ica.org/standards/RiC/ontology#isAccumulatorOf">isAccumulatorOf</a> | No | Inverse of 'has accumulator' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isAddresseeOf" title="https://www.ica.org/standards/RiC/ontology#isAddresseeOf">isAddresseeOf</a> | No | Inverse of 'has addressee' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isAgentAssociatedWithAgent" title="https://www.ica.org/standards/RiC/ontology#isAgentAssociatedWithAgent">isAgentAssociatedWithAgent</a> | No | Connects two Agents. This object property is symmetric. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#isAgentAssociatedWithPlace" title="https://www.ica.org/standards/RiC/ontology#isAgentAssociatedWithPlace">isAgentAssociatedWithPlace</a> | No | Inverse of 'is place associated with agent' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#isAuthorizingAgentInMandateRelation" title="https://www.ica.org/standards/RiC/ontology#isAuthorizingAgentInMandateRelation">isAuthorizingAgentInMandateRelation</a> | No | Connects an Agent that assigns the Mandate, to a Mandate Relation. | <a href="#MandateRelation" title="https://www.ica.org/standards/RiC/ontology#MandateRelation">Mandate Relation</a> |  |
| <a href="#isCollectorOf" title="https://www.ica.org/standards/RiC/ontology#isCollectorOf">isCollectorOf</a> | No | Inverse of 'has collector' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isCreatorOf" title="https://www.ica.org/standards/RiC/ontology#isCreatorOf">isCreatorOf</a> | No | Inverse of 'has creator' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isDirectSubordinateTo" title="https://www.ica.org/standards/RiC/ontology#isDirectSubordinateTo">isDirectSubordinateTo</a> | No | Connects an Agent to an Agent that is directly hierarchically superior. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#isOrWasActiveAtDate" title="https://www.ica.org/standards/RiC/ontology#isOrWasActiveAtDate">isOrWasActiveAtDate</a> | No | Inverse of 'is or was activity date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#isOrWasControllerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasControllerOf">isOrWasControllerOf</a> | No | Connects an Agent to another Agent it controls or controlled. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#isOrWasHolderOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasHolderOf">isOrWasHolderOf</a> | No | Connects an Agent to a Record Resource or Instantiation that the Agent holds or held. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isOrWasManagerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasManagerOf">isOrWasManagerOf</a> | No | Connects an Agent to a Record Resource or Instantiation that the Agent managed or manages. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isOrWasResponsibleForEnforcing" title="https://www.ica.org/standards/RiC/ontology#isOrWasResponsibleForEnforcing">isOrWasResponsibleForEnforcing</a> | No | Inverse of 'is or was enforced by' object property. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |  |
| <a href="#isOrWasSubordinateTo" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubordinateTo">isOrWasSubordinateTo</a> | No | Inverse of 'has or had subordinate' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#isOrganicOrFunctionalProvenanceOf" title="https://www.ica.org/standards/RiC/ontology#isOrganicOrFunctionalProvenanceOf">isOrganicOrFunctionalProvenanceOf</a> | No | Inverse of 'has organic or functional provenance' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isOrganicProvenanceOf" title="https://www.ica.org/standards/RiC/ontology#isOrganicProvenanceOf">isOrganicProvenanceOf</a> | No | Inverse of 'has organic provenance' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isPublisherOf" title="https://www.ica.org/standards/RiC/ontology#isPublisherOf">isPublisherOf</a> | No | Connects an Agent to a Record Resource that it published. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isReceiverOf" title="https://www.ica.org/standards/RiC/ontology#isReceiverOf">isReceiverOf</a> | No | Inverse of 'received by' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isResponsibleForIssuing" title="https://www.ica.org/standards/RiC/ontology#isResponsibleForIssuing">isResponsibleForIssuing</a> | No | Inverse of 'issued by' object property. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |  |
| <a href="#isSenderOf" title="https://www.ica.org/standards/RiC/ontology#isSenderOf">isSenderOf</a> | No | Inverse of 'has sender' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isSubordinateToTransitive" title="https://www.ica.org/standards/RiC/ontology#isSubordinateToTransitive">isSubordinateToTransitive</a> | No | Connects an Agent to an Agent that is directly or indirectly hierarchically superior. This is a transitive relation. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#isSuccessorOf" title="https://www.ica.org/standards/RiC/ontology#isSuccessorOf">isSuccessorOf</a> | No | Inverse of 'has successor' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#performsOrPerformed" title="https://www.ica.org/standards/RiC/ontology#performsOrPerformed">performsOrPerformed</a> | No | Inverse of 'is or was performed by' object property. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> |  |
| <a href="#wasSubordinateTo" title="https://www.ica.org/standards/RiC/ontology#wasSubordinateTo">wasSubordinateTo</a> | No | Connects an Agent to an Agent that was hierarchically superior in the past. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |


### <a id="AgentControlRelation" title="https://www.ica.org/standards/RiC/ontology#AgentControlRelation"></a> Class: Agent Control Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#AgentControlRelation)</small>

Connects at least one Agent, to at least another Agent, when the first one(s) control(s) or controlled in a way the activities of the second one(s). The Relation is oriented from the controlling agent to the controlled one: the controlling Agent(s) is the source of the Relation, and the controlled Agent(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#agentControlRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentControlRelation_role">agentControlRelation_role</a> | No | Connects an AgentControlRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AgentControlRelation" title="https://www.ica.org/standards/RiC/ontology#AgentControlRelation">Agent Control Relation</a> |  |


### <a id="AgentHierarchicalRelation" title="https://www.ica.org/standards/RiC/ontology#AgentHierarchicalRelation"></a> Class: Agent Hierarchical Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#AgentHierarchicalRelation)</small>

Connects at least one Agent to at least another Agent, when the first one is or was hierarchically superior to the second one. The Relation is oriented towards the 'bottom' of the hierarchical tree: the superior Agent(s) is the source of the Relation, and the inferior Agent(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#agentHierarchicalRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentHierarchicalRelation_role">agentHierarchicalRelation_role</a> | No | Connects an AgentHierarchicalRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AgentHierarchicalRelation" title="https://www.ica.org/standards/RiC/ontology#AgentHierarchicalRelation">Agent Hierarchical Relation</a> |  |


### <a id="AgentName" title="https://www.ica.org/standards/RiC/ontology#AgentName"></a> Class: Agent Name <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#AgentName)</small>

A label, title or term designating an Agent in order to make it distinguishable from other similar entities.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasAgentNameOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAgentNameOf">isOrWasAgentNameOf</a> | No | Connects an Agent Name to an Agent it designates or designated. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |


### <a id="AgentTemporalRelation" title="https://www.ica.org/standards/RiC/ontology#AgentTemporalRelation"></a> Class: Agent Temporal Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#AgentTemporalRelation)</small>

Connects at least one Agent to at least another Agent that succeeds it chronologically for, for instance, fullfilling some functions or performing some activities. The Relation is oriented chronologically, from the predecessor to the successor: the predecessor Agent(s) is the source of the Relation, and the successor Agent(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#asConcernsActivity" title="https://www.ica.org/standards/RiC/ontology#asConcernsActivity">asConcernsActivity</a> | No | Connects an Agent Temporal Relation or Mandate Relation, to an Activity that is, either transferred from an Agent to another one, or assigned by a Mandate to an Agent. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> |  |
| <a href="#agentTemporalRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentTemporalRelation_role">agentTemporalRelation_role</a> | No | Connects an AgentTemporalRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AgentTemporalRelation" title="https://www.ica.org/standards/RiC/ontology#AgentTemporalRelation">Agent Temporal Relation</a> |  |


### <a id="AgentToAgentRelation" title="https://www.ica.org/standards/RiC/ontology#AgentToAgentRelation"></a> Class: Agent Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#AgentToAgentRelation)</small>

Connects at least two Agents. This Relation is a generic, not oriented one.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#agentToAgentRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentToAgentRelation_role">agentToAgentRelation_role</a> | No | Connects an AgentToAgentRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AgentToAgentRelation" title="https://www.ica.org/standards/RiC/ontology#AgentToAgentRelation">Agent Relation</a> |  |


### <a id="Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation"></a> Class: Appellation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Appellation)</small>

A concept of any kind that is used for designating an Entity and referring to it.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasAppellationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAppellationOf">isOrWasAppellationOf</a> | No | Connects an Appellation to a Thing that it designates or designated. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#normalizedValue" title="https://www.ica.org/standards/RiC/ontology#normalizedValue">normalizedValue</a> | No | Value representation based on a standard, preferably machine-readable. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#textualValue" title="https://www.ica.org/standards/RiC/ontology#textualValue">textualValue</a> | No | A textual expression of an Appellation or Date. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#usedFromDate" title="https://www.ica.org/standards/RiC/ontology#usedFromDate">usedFromDate</a> | No | Date at which an Appellation was first used. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#usedToDate" title="https://www.ica.org/standards/RiC/ontology#usedToDate">usedToDate</a> | No | Date until an Appellation was used. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#wasUsedFromDate" title="https://www.ica.org/standards/RiC/ontology#wasUsedFromDate">wasUsedFromDate</a> | No | Connects an Appellation to the Date from which it was used. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#wasUsedToDate" title="https://www.ica.org/standards/RiC/ontology#wasUsedToDate">wasUsedToDate</a> | No | Connects an Appellation to the Date till when it was used. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |


### <a id="AppellationRelation" title="https://www.ica.org/standards/RiC/ontology#AppellationRelation"></a> Class: Appellation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#AppellationRelation)</small>

Connects an Appellation and at least one Thing that the Appellation designates or designated. The Appellation is the source of the Relation and the Thing(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#appellationRelation_role" title="https://www.ica.org/standards/RiC/ontology#appellationRelation_role">appellationRelation_role</a> | No | Connects an AppellationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AppellationRelation" title="https://www.ica.org/standards/RiC/ontology#AppellationRelation">Appellation Relation</a> |  |


### <a id="AuthorityRelation" title="https://www.ica.org/standards/RiC/ontology#AuthorityRelation"></a> Class: Authority Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#AuthorityRelation)</small>

Connects at least one Agent and at least one Thing over which the Agent has or had some authority. The Agent(s) is the source of the relation, and the Thing(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#authorityRelation_role" title="https://www.ica.org/standards/RiC/ontology#authorityRelation_role">authorityRelation_role</a> | No | Connects an AuthorityRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AuthorityRelation" title="https://www.ica.org/standards/RiC/ontology#AuthorityRelation">Authority Relation</a> |  |


### <a id="AuthorshipRelation" title="https://www.ica.org/standards/RiC/ontology#AuthorshipRelation"></a> Class: Authorship Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#AuthorshipRelation)</small>

Connects at least one Record to at least one Person, Group or Position that is or was responsible for conceiving and formulating the information contained in the Record. The Record is the source of the Relation and the Person(s), Group(s) or Position(s) is the target. 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#authorshipRelation_role" title="https://www.ica.org/standards/RiC/ontology#authorshipRelation_role">authorshipRelation_role</a> | No | Connects an AuthorshipRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AuthorshipRelation" title="https://www.ica.org/standards/RiC/ontology#AuthorshipRelation">Authorship Relation</a> |  |


### <a id="CarrierExtent" title="https://www.ica.org/standards/RiC/ontology#CarrierExtent"></a> Class: Carrier Extent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#CarrierExtent)</small>

Number of physical units and/or physical dimensions of the carrier of an Instantiation.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="CarrierType" title="https://www.ica.org/standards/RiC/ontology#CarrierType"></a> Class: Carrier Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#CarrierType)</small>

Categorization of physical material on which information is represented.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isCarrierTypeOf" title="https://www.ica.org/standards/RiC/ontology#isCarrierTypeOf">isCarrierTypeOf</a> | No | Connects a Carrier Type to an Instantiation whose carrier it categorizes. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |


### <a id="ChildRelation" title="https://www.ica.org/standards/RiC/ontology#ChildRelation"></a> Class: Child Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#ChildRelation)</small>

Connects at least one Person to at least another Person, when the first has(ave) child(s) the second one(s). The Relation is oriented from the parent to the child: the parent is the source of the relation, and the child(ren) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#childRelation_role" title="https://www.ica.org/standards/RiC/ontology#childRelation_role">childRelation_role</a> | No | Connects a ChildRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#ChildRelation" title="https://www.ica.org/standards/RiC/ontology#ChildRelation">Child Relation</a> |  |


### <a id="Concept" title="https://www.ica.org/standards/RiC/ontology#Concept"></a> Class: Concept <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Concept)</small>

An idea, unit of thought, abstract cultural object or category

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="ContentType" title="https://www.ica.org/standards/RiC/ontology#ContentType"></a> Class: Content Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#ContentType)</small>

The fundamental form of communication in which a Record or Record Part is expressed.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isContentTypeOf" title="https://www.ica.org/standards/RiC/ontology#isContentTypeOf">isContentTypeOf</a> | No | Connects a Content Type to a Record or Record Part whose content it categorizes. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isOrWasContentTypeOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasContentTypeOfAllMembersOf">isOrWasContentTypeOfAllMembersOf</a> | No | Connects a Content Type and a Record Set whose all past or present Record or Record Part members have that Content Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasContentTypeOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasContentTypeOfSomeMembersOf">isOrWasContentTypeOfSomeMembersOf</a> | No | Connects a Content Type and a Record Set whose some past or present Record or Record Part members have that Content Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |


### <a id="Coordinates" title="https://www.ica.org/standards/RiC/ontology#Coordinates"></a> Class: Coordinates <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Coordinates)</small>

Longitudinal and latitudinal information about a Place.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#altimetricSystem" title="https://www.ica.org/standards/RiC/ontology#altimetricSystem">altimetricSystem</a> | No | Reference system used for altitude | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#altitude" title="https://www.ica.org/standards/RiC/ontology#altitude">altitude</a> | No | The height of a Place above a reference level, especially above sea level. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#geodesicSystem" title="https://www.ica.org/standards/RiC/ontology#geodesicSystem">geodesicSystem</a> | No | Reference system used for geographical coordinates. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#isOrWasCoordinatesOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCoordinatesOf">isOrWasCoordinatesOf</a> | No | Connects an instance of Coordinates to a Physical Location it locates or located on earth, according to some reference system. | <a href="#PhysicalLocation" title="https://www.ica.org/standards/RiC/ontology#PhysicalLocation">Physical Location</a> |  |
| <a href="#latitude" title="https://www.ica.org/standards/RiC/ontology#latitude">latitude</a> | No | Distance in degrees north or south of the equator. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#longitude" title="https://www.ica.org/standards/RiC/ontology#longitude">longitude</a> | No | Distance in degrees east or west of a prime meridian. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody"></a> Class: Corporate Body <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#CorporateBody)</small>

An organized group of persons that act together as an Agent, and that has a recognized legal or social status.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hasOrHadCorporateBodyType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadCorporateBodyType">hasOrHadCorporateBodyType</a> | No | Connects a Corporate Body to a Corporate Body Type which categorizes or categorized it. | <a href="#CorporateBodyType" title="https://www.ica.org/standards/RiC/ontology#CorporateBodyType">Corporate Body Type</a> |  |
| <a href="#isOrWasEmployerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasEmployerOf">isOrWasEmployerOf</a> | No | Connects a Corporate Body or a Person to a Person who is or was their employee. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#resultedFromTheMergerOf" title="https://www.ica.org/standards/RiC/ontology#resultedFromTheMergerOf">resultedFromTheMergerOf</a> | No | Inverse of 'was merged into' object property. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> |  |
| <a href="#resultedFromTheSplitOf" title="https://www.ica.org/standards/RiC/ontology#resultedFromTheSplitOf">resultedFromTheSplitOf</a> | No | Inverse of 'was split into' object property. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> |  |
| <a href="#wasMergedInto" title="https://www.ica.org/standards/RiC/ontology#wasMergedInto">wasMergedInto</a> | No | Connects a Corporate Body to another Corporate Body that is the result of a merger of the previous one with one to many other corporate bodies. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> |  |
| <a href="#wasSplitInto" title="https://www.ica.org/standards/RiC/ontology#wasSplitInto">wasSplitInto</a> | No | Connects a Corporate Body to one of the Corporate Bodies that results from the split of the previous one into two to many corporate bodies. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> |  |


### <a id="CorporateBodyType" title="https://www.ica.org/standards/RiC/ontology#CorporateBodyType"></a> Class: Corporate Body Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#CorporateBodyType)</small>

Categorization of a Corporate Body.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasCorporateBodyTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCorporateBodyTypeOf">isOrWasCorporateBodyTypeOf</a> | No | Connects a Corporate Body Type to a Corporate Body that it categorizes or categorized. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> |  |


### <a id="CorrespondenceRelation" title="https://www.ica.org/standards/RiC/ontology#CorrespondenceRelation"></a> Class: Correspondence Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#CorrespondenceRelation)</small>

Connects at least two Persons, when they correspond or corresponded to each other. This Relation is not oriented.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#correspondenceRelation_role" title="https://www.ica.org/standards/RiC/ontology#correspondenceRelation_role">correspondenceRelation_role</a> | No | Connects a CorrespondenceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#CorrespondenceRelation" title="https://www.ica.org/standards/RiC/ontology#CorrespondenceRelation">Correspondence Relation</a> |  |


### <a id="CreationRelation" title="https://www.ica.org/standards/RiC/ontology#CreationRelation"></a> Class: Creation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#CreationRelation)</small>

Connects at least one Record Resource or Instantiation to at least one Agent, when the Agent is either responsible for all or some of the content of the Record Resource, or is a contributor to the genesis or production of the Instantiation. The Record Resource or Instantiation is the source of the Relation, and the Agent(s) is the target. 

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#creationWithRole" title="https://www.ica.org/standards/RiC/ontology#creationWithRole">creationWithRole</a> | No | Connects a Creation Relation to the Role Type that the creator Agent(s) has in the creation process | <a href="#RoleType" title="https://www.ica.org/standards/RiC/ontology#RoleType">Role Type</a> |  |
| <a href="#creationRelation_role" title="https://www.ica.org/standards/RiC/ontology#creationRelation_role">creationRelation_role</a> | No | Connects a CreationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#CreationRelation" title="https://www.ica.org/standards/RiC/ontology#CreationRelation">Creation Relation</a> |  |


### <a id="Date" title="https://www.ica.org/standards/RiC/ontology#Date"></a> Class: Date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Date)</small>

Chronological information associated with an entity that contributes to its identification and contextualization.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#dateQualifier" title="https://www.ica.org/standards/RiC/ontology#dateQualifier">dateQualifier</a> | No | A human readable qualification of a Date to indicate the level of precision or certainty. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#expressedDate" title="https://www.ica.org/standards/RiC/ontology#expressedDate">expressedDate</a> | No | Natural language expression of a date. This property is a specialization of the name property. In order that the precise meaning of the date can be understood, information such as the calendar used or other specific context should be included. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#hasDateType" title="https://www.ica.org/standards/RiC/ontology#hasDateType">hasDateType</a> | No | Connects a Date to its Date Type. | <a href="#DateType" title="https://www.ica.org/standards/RiC/ontology#DateType">Date Type</a> |  |
| <a href="#hasWithin" title="https://www.ica.org/standards/RiC/ontology#hasWithin">hasWithin</a> | No | Inverse of 'is within' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#intersects" title="https://www.ica.org/standards/RiC/ontology#intersects">intersects</a> | No | Connects two Dates that overlap. This relation is symmetric. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#isAccumulationDateOf" title="https://www.ica.org/standards/RiC/ontology#isAccumulationDateOf">isAccumulationDateOf</a> | No | Connects a Date to a Record Resource or Instantiation that was or will be accumulated at this Date. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isBeginningDateOf" title="https://www.ica.org/standards/RiC/ontology#isBeginningDateOf">isBeginningDateOf</a> | No | Connects a Date to a Thing that came into existence on that Date. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isBirthDateOf" title="https://www.ica.org/standards/RiC/ontology#isBirthDateOf">isBirthDateOf</a> | No | Connects a Date to a Person that was born on that Date. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#isCreationDateOf" title="https://www.ica.org/standards/RiC/ontology#isCreationDateOf">isCreationDateOf</a> | No | Connects a Date to a Record Resource or Instantiation that was or will be created at this Date. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isDateAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isDateAssociatedWith">isDateAssociatedWith</a> | No | Connects a Date to a Thing with whose existence and lifecycle the Date is associated. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isDateAssociatedWithRelation" title="https://www.ica.org/standards/RiC/ontology#isDateAssociatedWithRelation">isDateAssociatedWithRelation</a> | No | Connects a Date to an n-ary Relation. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |  |
| <a href="#isDateOfOccurrenceOf" title="https://www.ica.org/standards/RiC/ontology#isDateOfOccurrenceOf">isDateOfOccurrenceOf</a> | No | Connects a Date to an Event that occurred at this Date. An event or activity can be recurrent, which implies that one single event can be related to several dates. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#isDeathDateOf" title="https://www.ica.org/standards/RiC/ontology#isDeathDateOf">isDeathDateOf</a> | No | Connects a Date to a Person who died on that Date. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#isDerivationDateOf" title="https://www.ica.org/standards/RiC/ontology#isDerivationDateOf">isDerivationDateOf</a> | No | Connects a Date to an Instantiation from which a new Instantiation was or will be derived at that Date. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#isDestructionDateOf" title="https://www.ica.org/standards/RiC/ontology#isDestructionDateOf">isDestructionDateOf</a> | No | Connects a Date to a Record Resource or Instantiation that was or will be destructed at that Date. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isEndDateOf" title="https://www.ica.org/standards/RiC/ontology#isEndDateOf">isEndDateOf</a> | No | Connects a Date to a Thing whose existence ended on that Date. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isFromUseDateOf" title="https://www.ica.org/standards/RiC/ontology#isFromUseDateOf">isFromUseDateOf</a> | No | Connects a Date to an Appellation, when it is the date at which the Appellation was first used. | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a> |  |
| <a href="#isLastUpdateDateOf" title="https://www.ica.org/standards/RiC/ontology#isLastUpdateDateOf">isLastUpdateDateOf</a> | No | Connects a Date and a Thing that was last modified at this Date. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isMigrationDateOf" title="https://www.ica.org/standards/RiC/ontology#isMigrationDateOf">isMigrationDateOf</a> | No | Connects a Date to an Instantiation that was or will be migrated at that Date. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#isModificationDateOf" title="https://www.ica.org/standards/RiC/ontology#isModificationDateOf">isModificationDateOf</a> | No | Connects a Date to a Thing that was modified on that Date. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isOrWasAccumulationDateOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfAllMembersOf">isOrWasAccumulationDateOfAllMembersOf</a> | No | Connects a Date to a Record Set all of whose present or past members were or will be accumulated at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasAccumulationDateOfMostMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfMostMembersOf">isOrWasAccumulationDateOfMostMembersOf</a> | No | Connects a Date to a Record Set most of whose present or past members were or will be accumulated at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasAccumulationDateOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfSomeMembersOf">isOrWasAccumulationDateOfSomeMembersOf</a> | No | Connects a Date to a Record Set some of whose present or past members were or will be accumulated at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasCreationDateOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfAllMembersOf">isOrWasCreationDateOfAllMembersOf</a> | No | Connects a Date to a Record Set all of whose present or past members were or will be created at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasCreationDateOfMostMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfMostMembersOf">isOrWasCreationDateOfMostMembersOf</a> | No | Connects a Date to a Record Set most of whose present or past members were or will be created at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasCreationDateOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfSomeMembersOf">isOrWasCreationDateOfSomeMembersOf</a> | No | Connects a Date to a Record Set some of whose present or past members were or will be created at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasActivityDateOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasActivityDateOf">isOrWasActivityDateOf</a> | No | Connects a Date to an Agent that is or was active at that Date. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#isOrganicProvenanceDateOf" title="https://www.ica.org/standards/RiC/ontology#isOrganicProvenanceDateOf">isOrganicProvenanceDateOf</a> | No | Connects a Date associated with the organic provenance of a Record Resource or Instantiation to that Record Resource or Instantiation. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isPublicationDateOf" title="https://www.ica.org/standards/RiC/ontology#isPublicationDateOf">isPublicationDateOf</a> | No | Connects a Date to a Record Resource that was or will be made public at this Date. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isToUseDateOf" title="https://www.ica.org/standards/RiC/ontology#isToUseDateOf">isToUseDateOf</a> | No | Connects a Date to an Appellation, when it is the date till which the Appellation was used. | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a> |  |
| <a href="#isWithin" title="https://www.ica.org/standards/RiC/ontology#isWithin">isWithin</a> | No | Connects a Date to a Date in which it is contained. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#normalizedDateValue" title="https://www.ica.org/standards/RiC/ontology#normalizedDateValue">normalizedDateValue</a> | No | Machine readable representation of the date based on a public technical standard. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#normalizedValue" title="https://www.ica.org/standards/RiC/ontology#normalizedValue">normalizedValue</a> | No | Value representation based on a standard, preferably machine-readable. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#textualValue" title="https://www.ica.org/standards/RiC/ontology#textualValue">textualValue</a> | No | A textual expression of an Appellation or Date. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="DateType" title="https://www.ica.org/standards/RiC/ontology#DateType"></a> Class: Date Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#DateType)</small>

Categorization of a Date.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isDateTypeOf" title="https://www.ica.org/standards/RiC/ontology#isDateTypeOf">isDateTypeOf</a> | No | Connects a Date Type to a Date that it categorizes. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |


### <a id="DemographicGroup" title="https://www.ica.org/standards/RiC/ontology#DemographicGroup"></a> Class: Demographic Group <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#DemographicGroup)</small>

Categorization of a Person or Group based on shared characteristics.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasDemographicGroupOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDemographicGroupOf">isOrWasDemographicGroupOf</a> | No | Connects a Demographic Group to a Person or Group which belongs or belonged to it. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |


### <a id="DerivationRelation" title="https://www.ica.org/standards/RiC/ontology#DerivationRelation"></a> Class: Derivation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#DerivationRelation)</small>

Connects an Instantiation to at least one Instantiation that is derived from it, whether it exists or has been lost or destroyed. The Relation is oriented chronologically, from the first Instantiation in time to the derived Instantiation: the first Instantiation is the source of the Relation, and the derived Instantiation(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#derivationRelation_role" title="https://www.ica.org/standards/RiC/ontology#derivationRelation_role">derivationRelation_role</a> | No | Connects a DerivationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#DerivationRelation" title="https://www.ica.org/standards/RiC/ontology#DerivationRelation">Derivation Relation</a> |  |


### <a id="DescendanceRelation" title="https://www.ica.org/standards/RiC/ontology#DescendanceRelation"></a> Class: Descendance Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#DescendanceRelation)</small>

Connects at least one Person to at least another Person, when the first has/have descendant the second one(s). The Relation is oriented from the ascendant to the descendant: the ascendant Person(s) is the source of the Relation, and the descendant Person(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#descendanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#descendanceRelation_role">descendanceRelation_role</a> | No | Connects a DescendanceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#DescendanceRelation" title="https://www.ica.org/standards/RiC/ontology#DescendanceRelation">Descendance Relation</a> |  |


### <a id="DocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#DocumentaryFormType"></a> Class: Documentary Form Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#DocumentaryFormType)</small>

Categorization of a Record or Record Part with respect to its extrinsic and intrinsic elements that together communicate its content, administrative and documentary context, and authority.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isDocumentaryFormTypeOf" title="https://www.ica.org/standards/RiC/ontology#isDocumentaryFormTypeOf">isDocumentaryFormTypeOf</a> | No | Connects a Documentary Form Type to a Record or Record Part that it categorizes. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isOrWasDocumentaryFormTypeOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDocumentaryFormTypeOfAllMembersOf">isOrWasDocumentaryFormTypeOfAllMembersOf</a> | No | Connects a Documentary Form Type and a Record Set whose all past or present Record or Record Part members have that Documentary Form Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasDocumentaryFormTypeOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDocumentaryFormTypeOfSomeMembersOf">isOrWasDocumentaryFormTypeOfSomeMembersOf</a> | No | Connects a Documentary Form Type and a Record Set whose some past or present Record or Record Part members have that Documentary Form Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |


### <a id="Event" title="https://www.ica.org/standards/RiC/ontology#Event"></a> Class: Event <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Event)</small>

Something that happens or occurs in time and space.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#affectsOrAffected" title="https://www.ica.org/standards/RiC/ontology#affectsOrAffected">affectsOrAffected</a> | No | Connects an Event to a Thing on which the Event has or had some significant impact. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hadSubevent" title="https://www.ica.org/standards/RiC/ontology#hadSubevent">hadSubevent</a> | No | Connects a past Event to one of a series of past Events that constituted that original, broader, past Event. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#hasDirectSubevent" title="https://www.ica.org/standards/RiC/ontology#hasDirectSubevent">hasDirectSubevent</a> | No | Connects an ongoing Event to one of a series of Events that directly constitute that broader, ongoing Event. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#hasEventType" title="https://www.ica.org/standards/RiC/ontology#hasEventType">hasEventType</a> | No | Connects an Event to an Event Type which categorizes it. | <a href="#EventType" title="https://www.ica.org/standards/RiC/ontology#EventType">Event Type</a> |  |
| <a href="#hasOrHadParticipant" title="https://www.ica.org/standards/RiC/ontology#hasOrHadParticipant">hasOrHadParticipant</a> | No | Connects an Event to a Thing that is or was actively or passively involved in it. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasOrHadSubevent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubevent">hasOrHadSubevent</a> | No | Connects an Event to one of a series of Events that constitute the original, broader, past or ongoing Event. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#hasSubeventTransitive" title="https://www.ica.org/standards/RiC/ontology#hasSubeventTransitive">hasSubeventTransitive</a> | No | Connects an ongoing Event to one of a series of Events that directly or indirectly constitute that broader, ongoing Event. This is a transitive relation. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#history" title="https://www.ica.org/standards/RiC/ontology#history">history</a> | No | Summary of the development of an entity throughout its existence. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#isDirectSubeventOf" title="https://www.ica.org/standards/RiC/ontology#isDirectSubeventOf">isDirectSubeventOf</a> | No | Connects an ongoing Event to the Event it is a direct part of. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#isEventAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isEventAssociatedWith">isEventAssociatedWith</a> | No | Connects an Event to a Thing that is associated with the existence and lifecycle of the Event. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isOrWasSubeventOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubeventOf">isOrWasSubeventOf</a> | No | Inverse of 'has or had subevent' object property. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#isSubeventOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isSubeventOfTransitive">isSubeventOfTransitive</a> | No | Connects an ongoing Event to an Event of which it is a direct or indirect part. This is a transitive relation. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#occurredAtDate" title="https://www.ica.org/standards/RiC/ontology#occurredAtDate">occurredAtDate</a> | No | Inverse of 'is date of occurrence of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#resultsOrResultedIn" title="https://www.ica.org/standards/RiC/ontology#resultsOrResultedIn">resultsOrResultedIn</a> | No | Connects an Event to a Thing that results or resulted from the Event. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#wasSubeventOf" title="https://www.ica.org/standards/RiC/ontology#wasSubeventOf">wasSubeventOf</a> | No | Connects a past Event to the broader Event of which it was a part. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |


### <a id="EventRelation" title="https://www.ica.org/standards/RiC/ontology#EventRelation"></a> Class: Event Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#EventRelation)</small>

Connects at least one Event to at least one Thing, when the first is associated with the existence and lifecycle of the second one. The Event(s) is the source of the Relation, and the Thing(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#eventRelation_role" title="https://www.ica.org/standards/RiC/ontology#eventRelation_role">eventRelation_role</a> | No | Connects an EventRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#EventRelation" title="https://www.ica.org/standards/RiC/ontology#EventRelation">Event Relation</a> |  |


### <a id="EventType" title="https://www.ica.org/standards/RiC/ontology#EventType"></a> Class: Event Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#EventType)</small>

Categorization of an Event.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isEventTypeOf" title="https://www.ica.org/standards/RiC/ontology#isEventTypeOf">isEventTypeOf</a> | No | Connects an Event Type to an Event that it categorizes. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |


### <a id="Extent" title="https://www.ica.org/standards/RiC/ontology#Extent"></a> Class: Extent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Extent)</small>

Countable characteristics of the content of an entity expressed as a quantity.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hasExtentType" title="https://www.ica.org/standards/RiC/ontology#hasExtentType">hasExtentType</a> | No | Connects an Extent to an Extent Type that categorizes what is being measured. | <a href="#ExtentType" title="https://www.ica.org/standards/RiC/ontology#ExtentType">Extent Type</a> |  |
| <a href="#hasUnitOfMeasurement" title="https://www.ica.org/standards/RiC/ontology#hasUnitOfMeasurement">hasUnitOfMeasurement</a> | No | Connects an Extent to a Unit Of Measurement | <a href="#UnitOfMeasurement" title="https://www.ica.org/standards/RiC/ontology#UnitOfMeasurement">Unit Of Measurement</a> |  |
| <a href="#isExtentOf" title="https://www.ica.org/standards/RiC/ontology#isExtentOf">isExtentOf</a> | No | Connects an Extent to a Thing | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#quantity" title="https://www.ica.org/standards/RiC/ontology#quantity">quantity</a> | No | Machine-readable quantity. | schema:Number |  |
| <a href="#textualValue" title="https://www.ica.org/standards/RiC/ontology#textualValue">textualValue</a> | No | A textual expression of an Appellation or Date. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#unitOfMeasurement" title="https://www.ica.org/standards/RiC/ontology#unitOfMeasurement">unitOfMeasurement</a> | No | A definite magnitude of a quantity, defined and adopted by convention or by law, that is used as a standard for measurement of the same kind of quantity. Can be spacial units (cm, m), weight (g, kg), time (s, h), storage (MB, TB) or more informal units used in the archival context like number of boxes, pages or words. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="ExtentType" title="https://www.ica.org/standards/RiC/ontology#ExtentType"></a> Class: Extent Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#ExtentType)</small>

Categorization of the extent that is being measured.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isExtentTypeOf" title="https://www.ica.org/standards/RiC/ontology#isExtentTypeOf">isExtentTypeOf</a> | No | Connects an Extent Type to an Extent that it categorizes. | <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> |  |


### <a id="Family" title="https://www.ica.org/standards/RiC/ontology#Family"></a> Class: Family <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Family)</small>

Two or more persons related by birth, or through marriage, adoption, civil union, or other social conventions that bind them together as a socially recognized familial group.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hasFamilyType" title="https://www.ica.org/standards/RiC/ontology#hasFamilyType">hasFamilyType</a> | No | Connects a Family to a Family Type that categorizes it. | <a href="#FamilyType" title="https://www.ica.org/standards/RiC/ontology#FamilyType">Family Type</a> |  |


### <a id="FamilyRelation" title="https://www.ica.org/standards/RiC/ontology#FamilyRelation"></a> Class: Family Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#FamilyRelation)</small>

Connects at least two Persons, when they have some family link, i.e. belong to the same family. This Relation is a generic, not oriented one.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#familyRelation_role" title="https://www.ica.org/standards/RiC/ontology#familyRelation_role">familyRelation_role</a> | No | Connects a FamilyRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#FamilyRelation" title="https://www.ica.org/standards/RiC/ontology#FamilyRelation">Family Relation</a> |  |


### <a id="FamilyType" title="https://www.ica.org/standards/RiC/ontology#FamilyType"></a> Class: Family Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#FamilyType)</small>

Categorization of a Family.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isFamilyTypeOf" title="https://www.ica.org/standards/RiC/ontology#isFamilyTypeOf">isFamilyTypeOf</a> | No | Connects a Family Type to a Family that it categorizes. | <a href="#Family" title="https://www.ica.org/standards/RiC/ontology#Family">Family</a> |  |


### <a id="FunctionalEquivalenceRelation" title="https://www.ica.org/standards/RiC/ontology#FunctionalEquivalenceRelation"></a> Class: Functional Equivalence Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#FunctionalEquivalenceRelation)</small>

Connects at least two Instantiations which may be considered as equivalent. This Relation is not oriented.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#functionalEquivalenceRelation_role" title="https://www.ica.org/standards/RiC/ontology#functionalEquivalenceRelation_role">functionalEquivalenceRelation_role</a> | No | Connects a FunctionalEquivalenceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#FunctionalEquivalenceRelation" title="https://www.ica.org/standards/RiC/ontology#FunctionalEquivalenceRelation">Functional Equivalence Relation</a> |  |


### <a id="Group" title="https://www.ica.org/standards/RiC/ontology#Group"></a> Class: Group <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Group)</small>

Two or more Agents that act together as an Agent.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hadSubdivision" title="https://www.ica.org/standards/RiC/ontology#hadSubdivision">hadSubdivision</a> | No | Connects a Group to one of its past subdivisions. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |
| <a href="#hasDirectSubdivision" title="https://www.ica.org/standards/RiC/ontology#hasDirectSubdivision">hasDirectSubdivision</a> | No | Connects a Group to one of its direct subdivisions. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |
| <a href="#hasOrHadDemographicGroup" title="https://www.ica.org/standards/RiC/ontology#hasOrHadDemographicGroup">hasOrHadDemographicGroup</a> | No | Connects a Person or a Group to a Demographic Group to which it belongs or belonged. | <a href="#DemographicGroup" title="https://www.ica.org/standards/RiC/ontology#DemographicGroup">Demographic Group</a> |  |
| <a href="#hasOrHadLeader" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLeader">hasOrHadLeader</a> | No | Inverse of 'is or was leader of' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#hasOrHadMember" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMember">hasOrHadMember</a> | No | Connects a Group to a Person that is or was a member of that Group. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#hasOrHadPosition" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPosition">hasOrHadPosition</a> | No | Inverse of 'exists or existed in' object property. | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |  |
| <a href="#hasOrHadSubdivision" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubdivision">hasOrHadSubdivision</a> | No | Connects a Group to one of its present or past subdivisions. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |
| <a href="#hasSubdivisionTransitive" title="https://www.ica.org/standards/RiC/ontology#hasSubdivisionTransitive">hasSubdivisionTransitive</a> | No | Connects a Group to another Group that is one of its direct or indirect subdivisions. This is a transitive relation. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |
| <a href="#isAuthorOf" title="https://www.ica.org/standards/RiC/ontology#isAuthorOf">isAuthorOf</a> | No | Inverse of 'has author' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a> |  |
| <a href="#isDirectSubdivisionOf" title="https://www.ica.org/standards/RiC/ontology#isDirectSubdivisionOf">isDirectSubdivisionOf</a> | No | Connects a Group to the Group it is a direct subdivision of. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |
| <a href="#isOrWasAttendedByStudent" title="https://www.ica.org/standards/RiC/ontology#isOrWasAttendedByStudent">isOrWasAttendedByStudent</a> | No | Inverse of 'studies or studied at' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#isOrWasHolderOfIntellectualPropertyRightsOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasHolderOfIntellectualPropertyRightsOf">isOrWasHolderOfIntellectualPropertyRightsOf</a> | No | Connects an Agent to a Record Resource or Instantiation on which the Agent has or had some intellectual property rights. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isOrWasOwnerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasOwnerOf">isOrWasOwnerOf</a> | No | Connects a Group, Person or Position to a Thing that this Agent owns or owned. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isOrWasSubdivisionOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubdivisionOf">isOrWasSubdivisionOf</a> | No | Inverse of 'has or had subdivision' object property. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |
| <a href="#isSubdivisionOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isSubdivisionOfTransitive">isSubdivisionOfTransitive</a> | No | Connects a Group to the Group it is a direct or indirect subdivision of. This is a transitive relation. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |
| <a href="#wasSubdivisionOf" title="https://www.ica.org/standards/RiC/ontology#wasSubdivisionOf">wasSubdivisionOf</a> | No | Connects a subdivision to the Group it was a part of in the past. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |


### <a id="GroupSubdivisionRelation" title="https://www.ica.org/standards/RiC/ontology#GroupSubdivisionRelation"></a> Class: Group Subdivision Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#GroupSubdivisionRelation)</small>

Connects a Group and at least another Group, when the first one has or had the second one(s) among its subdivisions. The Relation is oriented from the Group to its subdivision(s): the parent Group is the source and the subdivision Group(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#groupSubdivisionRelation_role" title="https://www.ica.org/standards/RiC/ontology#groupSubdivisionRelation_role">groupSubdivisionRelation_role</a> | No | Connects a GroupSubdivisionRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#GroupSubdivisionRelation" title="https://www.ica.org/standards/RiC/ontology#GroupSubdivisionRelation">Group Subdivision Relation</a> |  |


### <a id="Identifier" title="https://www.ica.org/standards/RiC/ontology#Identifier"></a> Class: Identifier <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Identifier)</small>

A word, number, letter, symbol, or any combination of these used to uniquely identify or reference an individual instance of an entity within a specific information domain.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hasIdentifierType" title="https://www.ica.org/standards/RiC/ontology#hasIdentifierType">hasIdentifierType</a> | No | Connects an Identifier and an Identifier Type that categorizes it. | <a href="#IdentifierType" title="https://www.ica.org/standards/RiC/ontology#IdentifierType">Identifier Type</a> |  |
| <a href="#isOrWasIdentifierOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasIdentifierOf">isOrWasIdentifierOf</a> | No | Connects an Identifier to a Thing that it identified or identifies. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |


### <a id="IdentifierType" title="https://www.ica.org/standards/RiC/ontology#IdentifierType"></a> Class: Identifier Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#IdentifierType)</small>

Categorization of an Identifier.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isIdentifierTypeOf" title="https://www.ica.org/standards/RiC/ontology#isIdentifierTypeOf">isIdentifierTypeOf</a> | No | Connects an Identifier Type and an Identifier that it categorizes. | <a href="#Identifier" title="https://www.ica.org/standards/RiC/ontology#Identifier">Identifier</a> |  |


### <a id="Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation"></a> Class: Instantiation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Instantiation)</small>

The inscription of information made by an Agent on a physical carrier in any persistent, recoverable form as a means of communicating information through time and space.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#accumulationDate" title="https://www.ica.org/standards/RiC/ontology#accumulationDate">accumulationDate</a> | No | A date at which a Record Resource or Instantiation was or will be accumulated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#authenticityNote" title="https://www.ica.org/standards/RiC/ontology#authenticityNote">authenticityNote</a> | No | Information on the evidence that a Record Resource or Instantiation is what it purports to be, was created or sent by the said Agent at the said time, and has not been tampered with, corrupted, or forged.  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#carrierExtent" title="https://www.ica.org/standards/RiC/ontology#carrierExtent">carrierExtent</a> | No | Number of physical units and/or physical dimensions of the carrier of an Instantiation. In order to manage an Instantiation of a record resource it is necessary to note the extent of the carrier as well as that of the Instantiation itself. Whether it is necessary to note dimensions, the number of relevant units, or both, depends on the nature of the carrier and particular business needs. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#conditionsOfAccess" title="https://www.ica.org/standards/RiC/ontology#conditionsOfAccess">conditionsOfAccess</a> | No | Terms and circumstances affecting the availability of a Record Resource or an Instantiation for consultation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#conditionsOfUse" title="https://www.ica.org/standards/RiC/ontology#conditionsOfUse">conditionsOfUse</a> | No | Terms and circumstances affecting the use of a Record Resource or an Instantiation after access has been provided. Includes conditions governing reproduction of the Record Resource under applicable copyright (intellectual property) and/or property legislation or due to conservation status. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#creationDate" title="https://www.ica.org/standards/RiC/ontology#creationDate">creationDate</a> | No | Date at which a Record Resource or Instantiation was or will be created. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#derivationDate" title="https://www.ica.org/standards/RiC/ontology#derivationDate">derivationDate</a> | No | Date at which an Instantiation was or will be derived from another Instantiation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#destructionDate" title="https://www.ica.org/standards/RiC/ontology#destructionDate">destructionDate</a> | No | Date at which a Record Resource or Instantiation was or will be destructed. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#documents" title="https://www.ica.org/standards/RiC/ontology#documents">documents</a> | No | Connects a Record Resource or an Instantiation to the Activity that generates the Record Resource or Instantiation. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> |  |
| <a href="#hadComponent" title="https://www.ica.org/standards/RiC/ontology#hadComponent">hadComponent</a> | No | Connects an Instantiation to another Instantiation that was its component in the past. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#hasAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasAccumulationDate">hasAccumulationDate</a> | No | Inverse of 'is accumulation date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasAccumulator" title="https://www.ica.org/standards/RiC/ontology#hasAccumulator">hasAccumulator</a> | No | Connects a Record Resource or an Instantiation to the Agent that accumulates it, be it intentionally (collecting) or not (receiving in the course of its activities). | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasAddressee" title="https://www.ica.org/standards/RiC/ontology#hasAddressee">hasAddressee</a> | No | Connects a Record Resource or an Instantiation to the Agent that it is addressed to. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasCarrierType" title="https://www.ica.org/standards/RiC/ontology#hasCarrierType">hasCarrierType</a> | No | Connects an Instantiation to a Carrier Type which categorizes its carrier. | <a href="#CarrierType" title="https://www.ica.org/standards/RiC/ontology#CarrierType">Carrier Type</a> |  |
| <a href="#hasCollector" title="https://www.ica.org/standards/RiC/ontology#hasCollector">hasCollector</a> | No | Connects a Record Resource or an Instantiation to the Agent that collects it intentionally, i.e., the Agent is a collector. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasComponentTransitive" title="https://www.ica.org/standards/RiC/ontology#hasComponentTransitive">hasComponentTransitive</a> | No | Connects an Instantiation to another Instantiation that is, directly or indirectly, a component of that Instantiation. This is a transitive relation. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#hasCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasCreationDate">hasCreationDate</a> | No | Inverse of 'is creation date of' object property | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasCreator" title="https://www.ica.org/standards/RiC/ontology#hasCreator">hasCreator</a> | No | Connects a Record Resource or an Instantiation to an Agent that is either responsible for all or some of the content of the Record Resource or is a contributor to the genesis or production of an Instantiation. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasDerivationDate" title="https://www.ica.org/standards/RiC/ontology#hasDerivationDate">hasDerivationDate</a> | No | Inverse of 'is derivation date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasDestructionDate" title="https://www.ica.org/standards/RiC/ontology#hasDestructionDate">hasDestructionDate</a> | No | Inverse of 'is destruction date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasDirectComponent" title="https://www.ica.org/standards/RiC/ontology#hasDirectComponent">hasDirectComponent</a> | No | Connects an Instantiation to another Instantiation that is its direct component. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#hasMigrationDate" title="https://www.ica.org/standards/RiC/ontology#hasMigrationDate">hasMigrationDate</a> | No | Inverse of 'is migration date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasOrHadComponent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadComponent">hasOrHadComponent</a> | No | Connects an Instantiation to one of its present or past component instantiations. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#hasOrHadDerivedInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadDerivedInstantiation">hasOrHadDerivedInstantiation</a> | No | Connects an instantiation to an instantiation that is derived from it, whether it exists or has been lost or destroyed. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#hasOrHadHolder" title="https://www.ica.org/standards/RiC/ontology#hasOrHadHolder">hasOrHadHolder</a> | No | Inverse of 'is or was holder of' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrHadIntellectualPropertyRightsHolder" title="https://www.ica.org/standards/RiC/ontology#hasOrHadIntellectualPropertyRightsHolder">hasOrHadIntellectualPropertyRightsHolder</a> | No | Inverse of 'is or was holder of intellectual property rights of' object property. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a>, <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |  |
| <a href="#hasOrHadManager" title="https://www.ica.org/standards/RiC/ontology#hasOrHadManager">hasOrHadManager</a> | No | Inverse of 'is or was manager of' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrHadTitle" title="https://www.ica.org/standards/RiC/ontology#hasOrHadTitle">hasOrHadTitle</a> | No | Connects a Record Resource, Instantiation or Rule to a title that is or was used for designating it. | <a href="#Title" title="https://www.ica.org/standards/RiC/ontology#Title">Title</a> |  |
| <a href="#hasOrganicOrFunctionalProvenance" title="https://www.ica.org/standards/RiC/ontology#hasOrganicOrFunctionalProvenance">hasOrganicOrFunctionalProvenance</a> | No | Connects a Record Resource or an Instantiation to an Agent that creates or accumulates it, receives it, or sends it, or to an Activity that generates it. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a>, <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrganicProvenance" title="https://www.ica.org/standards/RiC/ontology#hasOrganicProvenance">hasOrganicProvenance</a> | No | Connects a Record Resource or an Instantiation to an Agent that creates or accumulates the Record Resource, receives it, or sends it. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrganicProvenanceDate" title="https://www.ica.org/standards/RiC/ontology#hasOrganicProvenanceDate">hasOrganicProvenanceDate</a> | No | Inverse of 'is date associated with organic provenance of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasProductionTechniqueType" title="https://www.ica.org/standards/RiC/ontology#hasProductionTechniqueType">hasProductionTechniqueType</a> | No | Connects an Instantiation to a Production Technique Type that categorizes its production technique. | <a href="#ProductionTechniqueType" title="https://www.ica.org/standards/RiC/ontology#ProductionTechniqueType">Production Technique Type</a> |  |
| <a href="#hasReceiver" title="https://www.ica.org/standards/RiC/ontology#hasReceiver">hasReceiver</a> | No | Connects a Record Resource or an Instantiation to the Agent that receives it in the course of the Agent's activities. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasRepresentationType" title="https://www.ica.org/standards/RiC/ontology#hasRepresentationType">hasRepresentationType</a> | No | Connects an Instantiation to a Representation Type that categorizes its representation type. | <a href="#RepresentationType" title="https://www.ica.org/standards/RiC/ontology#RepresentationType">Representation Type</a> |  |
| <a href="#hasSender" title="https://www.ica.org/standards/RiC/ontology#hasSender">hasSender</a> | No | Connects a Record Resource or an Instantiation to the Agent that sends it | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#history" title="https://www.ica.org/standards/RiC/ontology#history">history</a> | No | Summary of the development of an entity throughout its existence. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#instantiationExtent" title="https://www.ica.org/standards/RiC/ontology#instantiationExtent">instantiationExtent</a> | No | Countable characteristics of an Instantiation expressed as a quantity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#instantiationStructure" title="https://www.ica.org/standards/RiC/ontology#instantiationStructure">instantiationStructure</a> | No | Information about the physical arrangement and composition of an Instantiation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#isComponentOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isComponentOfTransitive">isComponentOfTransitive</a> | No | Connects an Instantiation to another Instantiation of which it is, directly or indirectly, a component. This is a transitive relation. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#isDirectComponentOf" title="https://www.ica.org/standards/RiC/ontology#isDirectComponentOf">isDirectComponentOf</a> | No | Connects an Instantiation to another Instantiation of which it is a direct component. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#isFunctionallyEquivalentTo" title="https://www.ica.org/standards/RiC/ontology#isFunctionallyEquivalentTo">isFunctionallyEquivalentTo</a> | No | Connects two Instantiations which may be considered as equivalent. This relation is symmetric. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#isInstantiationAssociatedWithInstantiation" title="https://www.ica.org/standards/RiC/ontology#isInstantiationAssociatedWithInstantiation">isInstantiationAssociatedWithInstantiation</a> | No | Connects two Instantiations. This relation is symmetric. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#isOrWasAnalogueInstantiationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAnalogueInstantiationOf">isOrWasAnalogueInstantiationOf</a> | No | Inverse of 'has or had analogue instantiation' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isOrWasComponentOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasComponentOf">isOrWasComponentOf</a> | No | Inverse of 'has or had component' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#isOrWasDerivedFromInstantiation" title="https://www.ica.org/standards/RiC/ontology#isOrWasDerivedFromInstantiation">isOrWasDerivedFromInstantiation</a> | No | Inverse of 'has or had derived instantiation' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#isOrWasDigitalInstantiationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDigitalInstantiationOf">isOrWasDigitalInstantiationOf</a> | No | Inverse of 'has or had digital instantiation' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isOrWasInstantiationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasInstantiationOf">isOrWasInstantiationOf</a> | No | Inverse of 'has or had instantiation' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#migratedFrom" title="https://www.ica.org/standards/RiC/ontology#migratedFrom">migratedFrom</a> | No | Inverse of 'migrated into' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#migratedInto" title="https://www.ica.org/standards/RiC/ontology#migratedInto">migratedInto</a> | No | Connects an Instantiation to a version it has been migrated into. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#migrationDate" title="https://www.ica.org/standards/RiC/ontology#migrationDate">migrationDate</a> | No | Date at which an Instantiation was or will be migrated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#physicalCharacteristicsNote" title="https://www.ica.org/standards/RiC/ontology#physicalCharacteristicsNote">physicalCharacteristicsNote</a> | No | Information about the physical features, completeness, or conservation status of an Instantiation. Includes information about the physical nature and condition such as conservation status or the deterioration of an Instantiation (for example its carrier) affecting the ability to recover information.  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#physicalOrLogicalExtent" title="https://www.ica.org/standards/RiC/ontology#physicalOrLogicalExtent">physicalOrLogicalExtent</a> | No | Countable characteristics of the content of an entity expressed as a quantity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#productionTechnique" title="https://www.ica.org/standards/RiC/ontology#productionTechnique">productionTechnique</a> | No | The method used in the representation of information on an Instantiation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#qualityOfRepresentationNote" title="https://www.ica.org/standards/RiC/ontology#qualityOfRepresentationNote">qualityOfRepresentationNote</a> | No | Characteristics of an Instantiation that affect the ability to recover the intellectual content. Such characteristics may be related to the methods used in creating the Instantiation or introduced subsequent to the creation through accident. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#structure" title="https://www.ica.org/standards/RiC/ontology#structure">structure</a> | No | Information about the intellectual arrangement and composition of a Record Resource or the physical arrangement and composition of an Instantiation. For Record and Record Part, it encompasses information about the intellectual composition of the record, the presence of record parts and their functions. For Record Set, it encompasses information about the methodology or criteria used for arranging the Record Set members or Record members within the containing Record Set. For Instantiation, it may comprise information about the composition of the physical elements of the instantiation | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#title" title="https://www.ica.org/standards/RiC/ontology#title">title</a> | No | An identifying name of a Record Resource, Instantiation or Rule. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#wasComponentOf" title="https://www.ica.org/standards/RiC/ontology#wasComponentOf">wasComponentOf</a> | No | Connects an Instantiation to another Instantiation of which it was a component in the past. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |


### <a id="InstantiationExtent" title="https://www.ica.org/standards/RiC/ontology#InstantiationExtent"></a> Class: Instantiation Extent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#InstantiationExtent)</small>

Countable characteristics of an Instantiation expressed as a quantity.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="InstantiationToInstantiationRelation" title="https://www.ica.org/standards/RiC/ontology#InstantiationToInstantiationRelation"></a> Class: Instantiation to Instantiation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#InstantiationToInstantiationRelation)</small>

Connects at least two instantiations. This Relation is a generic, not oriented one.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#instantiationToInstantiationRelation_role" title="https://www.ica.org/standards/RiC/ontology#instantiationToInstantiationRelation_role">instantiationToInstantiationRelation_role</a> | No | Connects an InstantiationToInstantiationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#InstantiationToInstantiationRelation" title="https://www.ica.org/standards/RiC/ontology#InstantiationToInstantiationRelation">Instantiation to Instantiation Relation</a> |  |


### <a id="IntellectualPropertyRightsRelation" title="https://www.ica.org/standards/RiC/ontology#IntellectualPropertyRightsRelation"></a> Class: Intellectual Property Rights Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#IntellectualPropertyRightsRelation)</small>

Connects at least one Agent and one Record Resource or Instantiation on which the Agent has or had some intellectual property rights. The Agent(s) is the source of the Relation and the Record Resource(s) or Instantiation(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#intellectualPropertyRightsRelation_role" title="https://www.ica.org/standards/RiC/ontology#intellectualPropertyRightsRelation_role">intellectualPropertyRightsRelation_role</a> | No | Connects an IntellectualPropertyRightsRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#IntellectualPropertyRightsRelation" title="https://www.ica.org/standards/RiC/ontology#IntellectualPropertyRightsRelation">Intellectual Property Rights Relation</a> |  |


### <a id="KnowingOfRelation" title="https://www.ica.org/standards/RiC/ontology#KnowingOfRelation"></a> Class: Knowing Of Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#KnowingOfRelation)</small>

Connects at least one Person to at least another one, when the first one has some knowledge of the second one through time or space. The first Person is the source of the Relation, and the second one is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#knowingOfRelation_role" title="https://www.ica.org/standards/RiC/ontology#knowingOfRelation_role">knowingOfRelation_role</a> | No | Connects a KnowingOfRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#KnowingOfRelation" title="https://www.ica.org/standards/RiC/ontology#KnowingOfRelation">Knowing Of Relation</a> |  |


### <a id="KnowingRelation" title="https://www.ica.org/standards/RiC/ontology#KnowingRelation"></a> Class: Knowing Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#KnowingRelation)</small>

Connects at least two Persons who directly know each other during their existence. This Relation is not oriented.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#knowingRelation_role" title="https://www.ica.org/standards/RiC/ontology#knowingRelation_role">knowingRelation_role</a> | No | Connects a KnowingRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#KnowingRelation" title="https://www.ica.org/standards/RiC/ontology#KnowingRelation">Knowing Relation</a> |  |


### <a id="Language" title="https://www.ica.org/standards/RiC/ontology#Language"></a> Class: Language <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Language)</small>

A spoken or written human language represented in a Record Resource or used by an Agent.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasLanguageOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOf">isOrWasLanguageOf</a> | No | Connects a Language to an Agent, Record or Record Part that uses or used it. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a>, <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isOrWasLanguageOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOfAllMembersOf">isOrWasLanguageOfAllMembersOf</a> | No | Connects a Language and a Record Set whose all present or past Record or Record Part members use that Language. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasLanguageOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOfSomeMembersOf">isOrWasLanguageOfSomeMembersOf</a> | No | Connects a Language and a Record Set whose some present or past Record or Record Part members use that Language. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |


### <a id="LeadershipRelation" title="https://www.ica.org/standards/RiC/ontology#LeadershipRelation"></a> Class: Leadership Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#LeadershipRelation)</small>

Connects at least one Person and at least one Group, when the first one(s) lead(s) or led the second one(s). The Relation is oriented from the leading Person to the Group: the leading Person(s) is the source of the Relation, and the Group(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#leadershipRelation_role" title="https://www.ica.org/standards/RiC/ontology#leadershipRelation_role">leadershipRelation_role</a> | No | Connects a LeadershipRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#LeadershipRelation" title="https://www.ica.org/standards/RiC/ontology#LeadershipRelation">Leadership Relation</a> |  |
| <a href="#leadershipWithPosition" title="https://www.ica.org/standards/RiC/ontology#leadershipWithPosition">leadershipWithPosition</a> | No | Connects a Leadership Relation to the Position occupied by the leading Person. | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |  |


### <a id="LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus"></a> Class: Legal Status <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#LegalStatus)</small>

A status defined by law.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasLegalStatusOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOf">isOrWasLegalStatusOf</a> | No | Connects a Legal Status to an Agent or Record Resource that it categorizes. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a>, <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isOrWasLegalStatusOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOfAllMembersOf">isOrWasLegalStatusOfAllMembersOf</a> | No | Connects a Legal Status and a Record Set whose all past or present Record or Record Part members have that Legal Status. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasLegalStatusOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOfSomeMembersOf">isOrWasLegalStatusOfSomeMembersOf</a> | No | Connects a Legal Status and a Record Set whose some past or present Record or Record Part members have that Legal Status. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |


### <a id="ManagementRelation" title="https://www.ica.org/standards/RiC/ontology#ManagementRelation"></a> Class: Management Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#ManagementRelation)</small>

Connects at least one Agent and at least one Record Resource or Instantiation that the Agent manages or managed. The Agent(s) is the source of the Relation, and the Record Resource(s) or Instantiation(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#managementRelation_role" title="https://www.ica.org/standards/RiC/ontology#managementRelation_role">managementRelation_role</a> | No | Connects a ManagementRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#ManagementRelation" title="https://www.ica.org/standards/RiC/ontology#ManagementRelation">Management Relation</a> |  |


### <a id="Mandate" title="https://www.ica.org/standards/RiC/ontology#Mandate"></a> Class: Mandate <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Mandate)</small>

Delegation of responsibility or authority by an Agent to another Agent to perform an Activity.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#authorizes" title="https://www.ica.org/standards/RiC/ontology#authorizes">authorizes</a> | No | Connects a Mandate to the Agent that the Mandate gives the authority or competencies to act. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrHadMandateType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMandateType">hasOrHadMandateType</a> | No | Connects a Mandate to a Mandate Type that categorized or categorizes it. | <a href="#MandateType" title="https://www.ica.org/standards/RiC/ontology#MandateType">Mandate Type</a> |  |


### <a id="MandateRelation" title="https://www.ica.org/standards/RiC/ontology#MandateRelation"></a> Class: Mandate Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#MandateRelation)</small>

Connects at least one Mandate and at least one Agent, when the first gives or gave the second one the authority or competencies to act. May also involve one to many Activities that the Mandate(s) assign(s) or assigned to the Agent(s). The Mandate(s) is the source of the Relation and the Agent(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#asConcernsActivity" title="https://www.ica.org/standards/RiC/ontology#asConcernsActivity">asConcernsActivity</a> | No | Connects an Agent Temporal Relation or Mandate Relation, to an Activity that is, either transferred from an Agent to another one, or assigned by a Mandate to an Agent. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> |  |
| <a href="#authorizingAgent" title="https://www.ica.org/standards/RiC/ontology#authorizingAgent">authorizingAgent</a> | No | Connects a Mandate Relation to an Agent that assigns the Mandate. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#mandateRelation_role" title="https://www.ica.org/standards/RiC/ontology#mandateRelation_role">mandateRelation_role</a> | No | Connects a MandateRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#MandateRelation" title="https://www.ica.org/standards/RiC/ontology#MandateRelation">Mandate Relation</a> |  |


### <a id="MandateType" title="https://www.ica.org/standards/RiC/ontology#MandateType"></a> Class: Mandate Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#MandateType)</small>

Categorization of a Mandate.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasMandateTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMandateTypeOf">isOrWasMandateTypeOf</a> | No | Connects a Mandate Type to a Mandate that it categorized or categorizes. | <a href="#Mandate" title="https://www.ica.org/standards/RiC/ontology#Mandate">Mandate</a> |  |


### <a id="Mechanism" title="https://www.ica.org/standards/RiC/ontology#Mechanism"></a> Class: Mechanism <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Mechanism)</small>

A process or system created by a Person or Group that performs an Activity.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#technicalCharacteristics" title="https://www.ica.org/standards/RiC/ontology#technicalCharacteristics">technicalCharacteristics</a> | No | Describes any relevant physical or software feature of any device involved in the creation or management of a Record Resource. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="MembershipRelation" title="https://www.ica.org/standards/RiC/ontology#MembershipRelation"></a> Class: Membership Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#MembershipRelation)</small>

Connects a Group and at least one Person, when the first one has or had the second one(s) among its members. The Relation is oriented from the Group to its members: the Group(s) is the source of the Relation, and the Person(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#membershipRelation_role" title="https://www.ica.org/standards/RiC/ontology#membershipRelation_role">membershipRelation_role</a> | No | Connects a MembershipRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#MembershipRelation" title="https://www.ica.org/standards/RiC/ontology#MembershipRelation">Membership Relation</a> |  |
| <a href="#membershipWithPosition" title="https://www.ica.org/standards/RiC/ontology#membershipWithPosition">membershipWithPosition</a> | No | Connects a Membership Relation to the Position occupied by the member Person(s). | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |  |


### <a id="MigrationRelation" title="https://www.ica.org/standards/RiC/ontology#MigrationRelation"></a> Class: Migration Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#MigrationRelation)</small>

Connects an Instantiation and at least another Instantiation it has been migrated into. The Relation is oriented chronologically, from the first Instantiation in time (the migrated one) to the one which results from its migration: the first Instantiation in time is the source of the Relation, and the resulting Instantiation is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#migrationRelation_role" title="https://www.ica.org/standards/RiC/ontology#migrationRelation_role">migrationRelation_role</a> | No | Connects a MigrationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#MigrationRelation" title="https://www.ica.org/standards/RiC/ontology#MigrationRelation">Migration Relation</a> |  |


### <a id="Name" title="https://www.ica.org/standards/RiC/ontology#Name"></a> Class: Name <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Name)</small>

A label, title or term designating an entity in order to make it distinguishable from other similar entities.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasNameOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasNameOf">isOrWasNameOf</a> | No | Connects a Name to a Thing that it designated or designates. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |


### <a id="OccupationType" title="https://www.ica.org/standards/RiC/ontology#OccupationType"></a> Class: Occupation Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#OccupationType)</small>

Categorization of a profession, trade, or craft pursued by a Person in fulfilment of an Activity.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasOccupationTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasOccupationTypeOf">isOrWasOccupationTypeOf</a> | No | Connects an Occupation Type to a Person whose occupation is or was categorized by it. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |


### <a id="OrganicOrFunctionalProvenanceRelation" title="https://www.ica.org/standards/RiC/ontology#OrganicOrFunctionalProvenanceRelation"></a> Class: Organic or functional provenance Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#OrganicOrFunctionalProvenanceRelation)</small>

Connects at least one Record Resource or Instantiation to at least one Agent or Activity, when the Agent or Activity is the provenance of the Record Resource or Instantiation (i.e. when the Agent created, accumulated or maintained the Record Resource or Instantiation, or when the Activity resulted into them). The Record Resource(s) or Instantiation(s) is the source of the Relation, and the Agent(s) or Activity(-ies) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#organicOrFunctionalProvenanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#organicOrFunctionalProvenanceRelation_role">organicOrFunctionalProvenanceRelation_role</a> | No | Connects an OrganicOrFunctionalProvenanceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#OrganicOrFunctionalProvenanceRelation" title="https://www.ica.org/standards/RiC/ontology#OrganicOrFunctionalProvenanceRelation">Organic or functional provenance Relation</a> |  |


### <a id="OrganicProvenanceRelation" title="https://www.ica.org/standards/RiC/ontology#OrganicProvenanceRelation"></a> Class: Organic Provenance Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#OrganicProvenanceRelation)</small>

Connects at least one Record Resource or an Instantiation to at least one Agent that creates or accumulates the Record Resource, receives it, or sends it. The Record Resource(s) or Instantiation(s) is the source of the Relation, and the Agent(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#organicProvenanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#organicProvenanceRelation_role">organicProvenanceRelation_role</a> | No | Connects an OrganicProvenanceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#OrganicProvenanceRelation" title="https://www.ica.org/standards/RiC/ontology#OrganicProvenanceRelation">Organic Provenance Relation</a> |  |


### <a id="OwnershipRelation" title="https://www.ica.org/standards/RiC/ontology#OwnershipRelation"></a> Class: Ownership Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#OwnershipRelation)</small>

Connects at least one Group, Person or Position and at least a Thing that these Agent(s) own(s) or owned. The Group(s), Person(s) or Position(s) is the source of the Relation, and the Agent(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#ownershipRelation_role" title="https://www.ica.org/standards/RiC/ontology#ownershipRelation_role">ownershipRelation_role</a> | No | Connects an OwnershipRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#OwnershipRelation" title="https://www.ica.org/standards/RiC/ontology#OwnershipRelation">Ownership Relation</a> |  |


### <a id="PerformanceRelation" title="https://www.ica.org/standards/RiC/ontology#PerformanceRelation"></a> Class: Performance Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#PerformanceRelation)</small>

Connects at least one Activity to at least one Agent that performs or performed the activity. The Activity(-ies) is the source of the Relation and the Agent(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#performanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#performanceRelation_role">performanceRelation_role</a> | No | Connects a PerformanceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#PerformanceRelation" title="https://www.ica.org/standards/RiC/ontology#PerformanceRelation">Performance Relation</a> |  |


### <a id="Person" title="https://www.ica.org/standards/RiC/ontology#Person"></a> Class: Person <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Person)</small>

An individual human being.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#birthDate" title="https://www.ica.org/standards/RiC/ontology#birthDate">birthDate</a> | No | Date at which a Person was born. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#deathDate" title="https://www.ica.org/standards/RiC/ontology#deathDate">deathDate</a> | No | Date at which a Person died. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#hasAncestor" title="https://www.ica.org/standards/RiC/ontology#hasAncestor">hasAncestor</a> | No | Inverse of 'has descendant' object property. This is a transitive relation. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#hasBirthDate" title="https://www.ica.org/standards/RiC/ontology#hasBirthDate">hasBirthDate</a> | No | Inverse of 'is birth date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasBirthPlace" title="https://www.ica.org/standards/RiC/ontology#hasBirthPlace">hasBirthPlace</a> | No | Inverse of 'is birth place of' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#hasChild" title="https://www.ica.org/standards/RiC/ontology#hasChild">hasChild</a> | No | Connects a Person to one of their children. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#hasDeathDate" title="https://www.ica.org/standards/RiC/ontology#hasDeathDate">hasDeathDate</a> | No | Inverse of 'is death date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasDeathPlace" title="https://www.ica.org/standards/RiC/ontology#hasDeathPlace">hasDeathPlace</a> | No | Inverse of 'is death place of' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#hasDescendant" title="https://www.ica.org/standards/RiC/ontology#hasDescendant">hasDescendant</a> | No | Connects a Person to one of their descendants. This is a transitive relation. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#hasFamilyAssociationWith" title="https://www.ica.org/standards/RiC/ontology#hasFamilyAssociationWith">hasFamilyAssociationWith</a> | No | Connects two Persons that have some type of family link, i.e. belong to the same family. This relation is symmetric. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#hasOrHadCorrespondent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadCorrespondent">hasOrHadCorrespondent</a> | No | Connects two Persons that correspond or have corresponded with each other. This relation is symmetric. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#hasOrHadDemographicGroup" title="https://www.ica.org/standards/RiC/ontology#hasOrHadDemographicGroup">hasOrHadDemographicGroup</a> | No | Connects a Person or a Group to a Demographic Group to which it belongs or belonged. | <a href="#DemographicGroup" title="https://www.ica.org/standards/RiC/ontology#DemographicGroup">Demographic Group</a> |  |
| <a href="#hasOrHadEmployer" title="https://www.ica.org/standards/RiC/ontology#hasOrHadEmployer">hasOrHadEmployer</a> | No | Inverse of 'is or was employer of' object property. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#hasOrHadOccupationOfType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadOccupationOfType">hasOrHadOccupationOfType</a> | No | Connects a Person to an Occupation Type that categorized or categorizes his/her occupation (profession, trade or craft). | <a href="#OccupationType" title="https://www.ica.org/standards/RiC/ontology#OccupationType">Occupation Type</a> |  |
| <a href="#hasOrHadSpouse" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSpouse">hasOrHadSpouse</a> | No | Connects two Persons who are or were married. This relation is symmetric. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#hasOrHadStudent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadStudent">hasOrHadStudent</a> | No | Inverse of 'has or had teacher' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#hasOrHadTeacher" title="https://www.ica.org/standards/RiC/ontology#hasOrHadTeacher">hasOrHadTeacher</a> | No | Connects a Person to another Person who is or was their teacher. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#hasSibling" title="https://www.ica.org/standards/RiC/ontology#hasSibling">hasSibling</a> | No | Connects two Persons who are siblings. This relation is symmetric. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#isAuthorOf" title="https://www.ica.org/standards/RiC/ontology#isAuthorOf">isAuthorOf</a> | No | Inverse of 'has author' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a> |  |
| <a href="#isChildOf" title="https://www.ica.org/standards/RiC/ontology#isChildOf">isChildOf</a> | No | Inverse of 'has child' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#isOrWasEmployerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasEmployerOf">isOrWasEmployerOf</a> | No | Connects a Corporate Body or a Person to a Person who is or was their employee. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#isOrWasHolderOfIntellectualPropertyRightsOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasHolderOfIntellectualPropertyRightsOf">isOrWasHolderOfIntellectualPropertyRightsOf</a> | No | Connects an Agent to a Record Resource or Instantiation on which the Agent has or had some intellectual property rights. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isOrWasLeaderOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLeaderOf">isOrWasLeaderOf</a> | No | Connects a Person to the Group that Person leads or led in the past. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |
| <a href="#isOrWasMemberOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMemberOf">isOrWasMemberOf</a> | No | Inverse of 'has or had member' object property. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |
| <a href="#isOrWasOwnerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasOwnerOf">isOrWasOwnerOf</a> | No | Connects a Group, Person or Position to a Thing that this Agent owns or owned. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#knownBy" title="https://www.ica.org/standards/RiC/ontology#knownBy">knownBy</a> | No | Inverse of 'knows of' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#knows" title="https://www.ica.org/standards/RiC/ontology#knows">knows</a> | No | Connects two Persons that directly know each other during their existence. This relation is symmetric. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#knowsOf" title="https://www.ica.org/standards/RiC/ontology#knowsOf">knowsOf</a> | No | Connects a Person to another Person they have some knowledge of through time or space. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#occupiesOrOccupied" title="https://www.ica.org/standards/RiC/ontology#occupiesOrOccupied">occupiesOrOccupied</a> | No | Connects a Person to a Position they occupy or occupied. | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |  |
| <a href="#studiesOrStudiedAt" title="https://www.ica.org/standards/RiC/ontology#studiesOrStudiedAt">studiesOrStudiedAt</a> | No | Connects a Person to an educational institution at which they studied or study. Both 'institution' and 'at' can be interpreted broadly. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |


### <a id="PhysicalLocation" title="https://www.ica.org/standards/RiC/ontology#PhysicalLocation"></a> Class: Physical Location <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#PhysicalLocation)</small>

A delimitation of the physical territory of a Place.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hasOrHadCoordinates" title="https://www.ica.org/standards/RiC/ontology#hasOrHadCoordinates">hasOrHadCoordinates</a> | No | Connects a Physical Location to its past or present coordinates in a reference system. | <a href="#Coordinates" title="https://www.ica.org/standards/RiC/ontology#Coordinates">Coordinates</a> |  |
| <a href="#isOrWasPhysicalLocationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPhysicalLocationOf">isOrWasPhysicalLocationOf</a> | No | Connects a Physical Location to a Place, when it is or was its location. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |


### <a id="Place" title="https://www.ica.org/standards/RiC/ontology#Place"></a> Class: Place <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Place)</small>

Bounded, named geographic area or region.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#contained" title="https://www.ica.org/standards/RiC/ontology#contained">contained</a> | No | Connects a Place to a Place that it contained in the past. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#directlyContains" title="https://www.ica.org/standards/RiC/ontology#directlyContains">directlyContains</a> | No | Connects a Place to another Place that it directly contains. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#containsOrContained" title="https://www.ica.org/standards/RiC/ontology#containsOrContained">containsOrContained</a> | No | Connects a Place to a region that is or was within it. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#containsTransitive" title="https://www.ica.org/standards/RiC/ontology#containsTransitive">containsTransitive</a> | No | Connects a Place to a Place that it contains, directly or indirectly. This is a transitive relation. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#geographicalCoordinates" title="https://www.ica.org/standards/RiC/ontology#geographicalCoordinates">geographicalCoordinates</a> | No | Longitudinal and latitudinal information about a Place.  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#hasOrHadPhysicalLocation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPhysicalLocation">hasOrHadPhysicalLocation</a> | No | Connects a Place to one of its past or present Physical Location. | <a href="#PhysicalLocation" title="https://www.ica.org/standards/RiC/ontology#PhysicalLocation">Physical Location</a> |  |
| <a href="#hasOrHadPlaceName" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPlaceName">hasOrHadPlaceName</a> | No | Connects a Place to one of its past or present names. | <a href="#PlaceName" title="https://www.ica.org/standards/RiC/ontology#PlaceName">Place Name</a> |  |
| <a href="#hasOrHadPlaceType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPlaceType">hasOrHadPlaceType</a> | No | Connects a Place to a Place Type that categorized or categorizes it. | <a href="#PlaceType" title="https://www.ica.org/standards/RiC/ontology#PlaceType">Place Type</a> |  |
| <a href="#history" title="https://www.ica.org/standards/RiC/ontology#history">history</a> | No | Summary of the development of an entity throughout its existence. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#isBirthPlaceOf" title="https://www.ica.org/standards/RiC/ontology#isBirthPlaceOf">isBirthPlaceOf</a> | No | Connects a Place to a Person who was born in that Place. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#isContainedByTransitive" title="https://www.ica.org/standards/RiC/ontology#isContainedByTransitive">isContainedByTransitive</a> | No | Connects a Place to a Place that is, directly or indirectly, contained by it. This is a transitive relation. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#isDeathPlaceOf" title="https://www.ica.org/standards/RiC/ontology#isDeathPlaceOf">isDeathPlaceOf</a> | No | Connects a Place to a Person who died in that Place. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#isDirectlyContainedBy" title="https://www.ica.org/standards/RiC/ontology#isDirectlyContainedBy">isDirectlyContainedBy</a> | No | Connects a Place to a Place that directly contains it. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#isOrWasAdjacentTo" title="https://www.ica.org/standards/RiC/ontology#isOrWasAdjacentTo">isOrWasAdjacentTo</a> | No | Connects two Places that are or were geographically adjacent. This relation is symmetric. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#isOrWasContainedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasContainedBy">isOrWasContainedBy</a> | No | Inverse of 'contains or contained' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#isOrWasJurisdictionOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasJurisdictionOf">isOrWasJurisdictionOf</a> | No | Connects a Place to an Agent that has or had jurisdiction over the Place. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#isOrWasLocationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLocationOf">isOrWasLocationOf</a> | No | Connects a Place to a Thing that is or was located in the Place. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isOrWasLocationOfAgent" title="https://www.ica.org/standards/RiC/ontology#isOrWasLocationOfAgent">isOrWasLocationOfAgent</a> | No | Connects a Place to an Agent that is or was located in this Place. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#isPlaceAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isPlaceAssociatedWith">isPlaceAssociatedWith</a> | No | Connects a Place to a Thing with whose existence and lifecycle the Place is associated. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isPlaceAssociatedWithAgent" title="https://www.ica.org/standards/RiC/ontology#isPlaceAssociatedWithAgent">isPlaceAssociatedWithAgent</a> | No | Connects a Place to an Agent which is related to that Place. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#location" title="https://www.ica.org/standards/RiC/ontology#location">location</a> | No | A delimitation of the physical territory of a Place. Used to describe basic human-readable text such as an address, a cadastral reference, or less precise information found in a Record. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#overlapsOrOverlapped" title="https://www.ica.org/standards/RiC/ontology#overlapsOrOverlapped">overlapsOrOverlapped</a> | No | Connects two Places that geographically overlap or overlapped. This relation is symmetric. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#wasContainedBy" title="https://www.ica.org/standards/RiC/ontology#wasContainedBy">wasContainedBy</a> | No | Connects a Place to a Place within which it was contained. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |


### <a id="PlaceName" title="https://www.ica.org/standards/RiC/ontology#PlaceName"></a> Class: Place Name <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#PlaceName)</small>

A label, title or term designating a Place in order to make it distinguishable from other similar entities.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasPlaceNameOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPlaceNameOf">isOrWasPlaceNameOf</a> | No | Connects a Place Name to a Place that was or is designated by it. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |


### <a id="PlaceRelation" title="https://www.ica.org/standards/RiC/ontology#PlaceRelation"></a> Class: Place Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#PlaceRelation)</small>

Connects a Place and at least one Thing when the first is associated with the existence and lifecycle of the second one. The Place is the source of the Relation and the Thing(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#placeRelation_role" title="https://www.ica.org/standards/RiC/ontology#placeRelation_role">placeRelation_role</a> | No | Connects a PlaceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#PlaceRelation" title="https://www.ica.org/standards/RiC/ontology#PlaceRelation">Place Relation</a> |  |


### <a id="PlaceType" title="https://www.ica.org/standards/RiC/ontology#PlaceType"></a> Class: Place Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#PlaceType)</small>

Categorization of a Place.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasPlaceTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPlaceTypeOf">isOrWasPlaceTypeOf</a> | No | Connects a Place Type to a Place that is or was categorized by it. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |


### <a id="Position" title="https://www.ica.org/standards/RiC/ontology#Position"></a> Class: Position <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Position)</small>

The functional role of a Person within a Group.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#existsOrExistedIn" title="https://www.ica.org/standards/RiC/ontology#existsOrExistedIn">existsOrExistedIn</a> | No | Connects a Position to a Group in which that Position exists or existed, or that is defined by that Group's organizational structure. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |  |
| <a href="#isAuthorOf" title="https://www.ica.org/standards/RiC/ontology#isAuthorOf">isAuthorOf</a> | No | Inverse of 'has author' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a> |  |
| <a href="#isOrWasHolderOfIntellectualPropertyRightsOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasHolderOfIntellectualPropertyRightsOf">isOrWasHolderOfIntellectualPropertyRightsOf</a> | No | Connects an Agent to a Record Resource or Instantiation on which the Agent has or had some intellectual property rights. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isOrWasOccupiedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasOccupiedBy">isOrWasOccupiedBy</a> | No | Inverse of 'occupies or occupied' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |  |
| <a href="#isOrWasOwnerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasOwnerOf">isOrWasOwnerOf</a> | No | Connects a Group, Person or Position to a Thing that this Agent owns or owned. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#positionIsContextOfLeadershipRelation" title="https://www.ica.org/standards/RiC/ontology#positionIsContextOfLeadershipRelation">positionIsContextOfLeadershipRelation</a> | No | Connects a Position to a Leadership Relation (the leading Person occupies that Position). | <a href="#LeadershipRelation" title="https://www.ica.org/standards/RiC/ontology#LeadershipRelation">Leadership Relation</a> |  |
| <a href="#positionIsContextOfMembershipRelation" title="https://www.ica.org/standards/RiC/ontology#positionIsContextOfMembershipRelation">positionIsContextOfMembershipRelation</a> | No | Connects a Position to a Membership Relation (the member Person occupies that Position). | <a href="#MembershipRelation" title="https://www.ica.org/standards/RiC/ontology#MembershipRelation">Membership Relation</a> |  |


### <a id="PositionHoldingRelation" title="https://www.ica.org/standards/RiC/ontology#PositionHoldingRelation"></a> Class: Position Holding Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#PositionHoldingRelation)</small>

Connects at least one Person and at least one Position that the Person(s) occupies or occupied. The Person is the source of the Relation and the Position is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#positionHoldingRelation_role" title="https://www.ica.org/standards/RiC/ontology#positionHoldingRelation_role">positionHoldingRelation_role</a> | No | Connects a PositionHoldingRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#PositionHoldingRelation" title="https://www.ica.org/standards/RiC/ontology#PositionHoldingRelation">Position Holding Relation</a> |  |


### <a id="PositionToGroupRelation" title="https://www.ica.org/standards/RiC/ontology#PositionToGroupRelation"></a> Class: Position to Group Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#PositionToGroupRelation)</small>

Connects at least one Position and a Group in which the position(s) exist(s) or existed, or that is (are) defined by that group's organizational structure. The Position(s) is the source of the Relation and the Group is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#positionToGroupRelation_role" title="https://www.ica.org/standards/RiC/ontology#positionToGroupRelation_role">positionToGroupRelation_role</a> | No | Connects a PositionToGroupRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#PositionToGroupRelation" title="https://www.ica.org/standards/RiC/ontology#PositionToGroupRelation">Position to Group Relation</a> |  |


### <a id="ProductionTechniqueType" title="https://www.ica.org/standards/RiC/ontology#ProductionTechniqueType"></a> Class: Production Technique Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#ProductionTechniqueType)</small>

The method used in the representation of information on an instantiation.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isProductionTechniqueTypeOf" title="https://www.ica.org/standards/RiC/ontology#isProductionTechniqueTypeOf">isProductionTechniqueTypeOf</a> | No | Connects a Production Technique Type to an Instantiation whose production technique is categorized by it. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |


### <a id="Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy"></a> Class: Proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Proxy)</small>

A Proxy represents (stands for) a Record Resource as it exists in a specific other Record Resource.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#proxyDirectlyFollowsInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyFollowsInSequence">proxyDirectlyFollowsInSequence</a> | No | Inverse of 'directly precedes proxy in sequence' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#proxyDirectlyFollowsProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyFollowsProxyInSequence">proxyDirectlyFollowsProxyInSequence</a> | No | Inverse of 'proxy directly precedes proxy in sequence' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#proxyDirectlyIncludes" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyIncludes">proxyDirectlyIncludes</a> | No | Inverse of 'is directly included in proxy' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#proxyDirectlyIncludesProxy" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyIncludesProxy">proxyDirectlyIncludesProxy</a> | No | Inverse of 'proxy is directly included in' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#proxyDirectlyPrecedesInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyPrecedesInSequence">proxyDirectlyPrecedesInSequence</a> | No | Connects a Proxy of a Record Resource to a Record Resource which it precedes directly in some sequence (not necessarily defined or characterised chronologically). | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#proxyDirectlyPrecedesProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyPrecedesProxyInSequence">proxyDirectlyPrecedesProxyInSequence</a> | No | Connects a Proxy of a Record Resource to a Proxy of another Record Resource that it precedes directly in some sequence (not necessarily defined or characterised chronologically). | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#proxyFollowsInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyFollowsInSequence">proxyFollowsInSequence</a> | No | Inverse of 'precedes proxy in sequence' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#proxyFollowsProxyInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyFollowsProxyInSequenceTransitive">proxyFollowsProxyInSequenceTransitive</a> | No | Inverse of 'proxy recedes proxy in sequence transitive' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#proxyFor" title="https://www.ica.org/standards/RiC/ontology#proxyFor">proxyFor</a> | No | Connects a Proxy to the Record Resource it stands for in the context of a specific Record Resource. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#proxyHasConstituent" title="https://www.ica.org/standards/RiC/ontology#proxyHasConstituent">proxyHasConstituent</a> | No | Inverse of 'is constituent of proxy' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#proxyHasConstituentProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyHasConstituentProxyTransitive">proxyHasConstituentProxyTransitive</a> | No | Inverse of 'proxy is constituent of proxy transitive' object property. This is a transitive relation. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#proxyHasDirectConstituent" title="https://www.ica.org/standards/RiC/ontology#proxyHasDirectConstituent">proxyHasDirectConstituent</a> | No | Inverse of 'is direct constituent of proxy' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#proxyHasDirectConstituentProxy" title="https://www.ica.org/standards/RiC/ontology#proxyHasDirectConstituentProxy">proxyHasDirectConstituentProxy</a> | No | Inverse of 'proxy is direct constituent of' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#proxyIn" title="https://www.ica.org/standards/RiC/ontology#proxyIn">proxyIn</a> | No | Connects a Proxy to the Record Resource in which it stands for (represents) another Record Resource. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#proxyInRecord" title="https://www.ica.org/standards/RiC/ontology#proxyInRecord">proxyInRecord</a> | No | Connects a Proxy to a Record in which it stands for (represents) a Record Part or another Record. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a> |  |
| <a href="#proxyInRecordSet" title="https://www.ica.org/standards/RiC/ontology#proxyInRecordSet">proxyInRecordSet</a> | No | Connects a Proxy to a Record Set in which it stands for (represents) a Record or another Record Set. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#proxyIncludes" title="https://www.ica.org/standards/RiC/ontology#proxyIncludes">proxyIncludes</a> | No | Inverse of 'is included in proxy' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#proxyIncludesProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyIncludesProxyTransitive">proxyIncludesProxyTransitive</a> | No | Inverse of 'proxy is included in proxy transitive' object property. This is a transitive relation. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#proxyIsConstituentOf" title="https://www.ica.org/standards/RiC/ontology#proxyIsConstituentOf">proxyIsConstituentOf</a> | No | Connects a Proxy of a Record or Record Part to a Record or Record Part which it is a constituent of, directly or indirectly. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#proxyIsConstituentOfProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyIsConstituentOfProxyTransitive">proxyIsConstituentOfProxyTransitive</a> | No | Connects a Proxy of a Record or Record Part to a Proxy of another Record or Record Part which it is a constituent of, directly or indirectly. This is a transitive relation. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#proxyIsDirectConstituentOf" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectConstituentOf">proxyIsDirectConstituentOf</a> | No | Connects a Proxy of a Record or Record Part to another Record or Record Part which the first is a direct constituent of. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#proxyIsDirectConstituentOfProxy" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectConstituentOfProxy">proxyIsDirectConstituentOfProxy</a> | No | Connects a Proxy of a Record or Record Part to a Proxy of another Record or Record Part of which the first is a direct constituent. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#proxyIsDirectlyIncludedIn" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectlyIncludedIn">proxyIsDirectlyIncludedIn</a> | No | Connects a Proxy of a Record or Record Set to another Record Set which the first is directly included in. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#proxyIsDirectlyIncludedInProxy" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectlyIncludedInProxy">proxyIsDirectlyIncludedInProxy</a> | No | Connects a Proxy of a Record or Record Set to a Proxy of a Record Set which it is directly included in. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#proxyIsIncludedIn" title="https://www.ica.org/standards/RiC/ontology#proxyIsIncludedIn">proxyIsIncludedIn</a> | No | Connects a Proxy of a Record or Record Set to a Record Set which it is included in, directly or indirectly. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#proxyIsIncludedInProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyIsIncludedInProxyTransitive">proxyIsIncludedInProxyTransitive</a> | No | Connects a Proxy of a Record or Record Set to a Proxy of a Record Set which it is included in, directly or indirectly. This is a transitive relation. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#proxyPrecedesInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyPrecedesInSequence">proxyPrecedesInSequence</a> | No | Connects a Proxy of a Record Resource to a Record Resource which the first precedes directly or indirectly in some sequence (not necessarily defined or characterised chronologically). | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#proxyPrecedesProxyInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyPrecedesProxyInSequenceTransitive">proxyPrecedesProxyInSequenceTransitive</a> | No | Connects a Proxy of a Record Resource to a Proxy of another Record Resource which directly or indirectly follows the first in some sequence (not necessarily defined or characterised chronologically). This is a transitive relation. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#rankInHierarchy" title="https://www.ica.org/standards/RiC/ontology#rankInHierarchy">rankInHierarchy</a> | No | The rank of a Record Resource, or of a Proxy that stands for it, in a hierarchy. | schema:Integer |  |
| <a href="#rankInSequence" title="https://www.ica.org/standards/RiC/ontology#rankInSequence">rankInSequence</a> | No | The rank of a Record Resource, or of a Proxy that stands for it, in a sequence. | schema:Integer |  |


### <a id="Record" title="https://www.ica.org/standards/RiC/ontology#Record"></a> Class: Record <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Record)</small>

Discrete information content formed and inscribed, at least once, by any method on any carrier in any persistent, recoverable form by an Agent in the course of life or work activity.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hadConstituent" title="https://www.ica.org/standards/RiC/ontology#hadConstituent">hadConstituent</a> | No | Connects a Record or Record Part to another Record or Record Part that was its constituent in the past. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasAuthor" title="https://www.ica.org/standards/RiC/ontology#hasAuthor">hasAuthor</a> | No | Connects a Record to the Group, Person or Position that is responsible for conceiving and formulating the information contained in the Record. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a>, <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |  |
| <a href="#hasConstituentProxy" title="https://www.ica.org/standards/RiC/ontology#hasConstituentProxy">hasConstituentProxy</a> | No | Inverse of 'proxy is constituent of' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#hasConstituentTransitive" title="https://www.ica.org/standards/RiC/ontology#hasConstituentTransitive">hasConstituentTransitive</a> | No | Connects a Record or Record Part to another Record or Record Part that is its constituent, directly or indirectly. This is a transitive relation. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasContentOfType" title="https://www.ica.org/standards/RiC/ontology#hasContentOfType">hasContentOfType</a> | No | Connects a Record or a Record Part to a Content Type which categorizes its content. | <a href="#ContentType" title="https://www.ica.org/standards/RiC/ontology#ContentType">Content Type</a> |  |
| <a href="#hasContentWhichMainlyRepresents" title="https://www.ica.org/standards/RiC/ontology#hasContentWhichMainlyRepresents">hasContentWhichMainlyRepresents</a> | No | Connects a Record or a Record Part to a Thing that its content mainly represents. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasContentWhichRepresents" title="https://www.ica.org/standards/RiC/ontology#hasContentWhichRepresents">hasContentWhichRepresents</a> | No | Connects a Record or a Record Part to a Thing that its content represents. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasDirectConstituent" title="https://www.ica.org/standards/RiC/ontology#hasDirectConstituent">hasDirectConstituent</a> | No | Connects a Record or Record Part to another Record or Record Part that is its direct constituent. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasDirectConstituentProxy" title="https://www.ica.org/standards/RiC/ontology#hasDirectConstituentProxy">hasDirectConstituentProxy</a> | No | Inverse of 'proxy is direct constituent of' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#hasDocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#hasDocumentaryFormType">hasDocumentaryFormType</a> | No | Connects a Record or Record Part to its Documentary Form Type. | <a href="#DocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#DocumentaryFormType">Documentary Form Type</a> |  |
| <a href="#hasDraft" title="https://www.ica.org/standards/RiC/ontology#hasDraft">hasDraft</a> | No | Inverse of 'is draft of' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasOrHadConstituent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadConstituent">hasOrHadConstituent</a> | No | Connects a Record or Record Part to a Record or Record part that is or was a constituent of that Record or Record Part. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasOrHadLanguage" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLanguage">hasOrHadLanguage</a> | No | Connects an Agent, Record or Record Part to a Language that uses or used it. | <a href="#Language" title="https://www.ica.org/standards/RiC/ontology#Language">Language</a> |  |
| <a href="#hasOrHadLegalStatus" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLegalStatus">hasOrHadLegalStatus</a> | No | Connects an Agent or Record Resource to a Legal Status which categorized or categorizes it. | <a href="#LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus">Legal Status</a> |  |
| <a href="#hasOriginal" title="https://www.ica.org/standards/RiC/ontology#hasOriginal">hasOriginal</a> | No | Inverse of 'is original of' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasRecordState" title="https://www.ica.org/standards/RiC/ontology#hasRecordState">hasRecordState</a> | No | Connects a Record or Record Part to a Record State that categorizes its state. | <a href="#RecordState" title="https://www.ica.org/standards/RiC/ontology#RecordState">Record State</a> |  |
| <a href="#isConstituentOfProxy" title="https://www.ica.org/standards/RiC/ontology#isConstituentOfProxy">isConstituentOfProxy</a> | No | Connects a Record or Record Part to a Proxy of a Record or Record Part of which it is a constituent, directly or indirectly. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#isConstituentOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isConstituentOfTransitive">isConstituentOfTransitive</a> | No | Connects a Record or Record Part to another Record or Record Part of which it is a constituent, directly or indirectly. This is a transitive relation. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isDirectConstituentOf" title="https://www.ica.org/standards/RiC/ontology#isDirectConstituentOf">isDirectConstituentOf</a> | No | Connects a Record or Record Part to another Record or Record Part of which it is a direct constituent. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isDirectConstituentOfProxy" title="https://www.ica.org/standards/RiC/ontology#isDirectConstituentOfProxy">isDirectConstituentOfProxy</a> | No | Connects a Record or Record Part to a Proxy of a Record or Record Part which it is a direct constituent of. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#isDirectlyIncludedIn" title="https://www.ica.org/standards/RiC/ontology#isDirectlyIncludedIn">isDirectlyIncludedIn</a> | No | Connects a Record to a Record or Record Set in which it is directly included. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isDirectlyIncludedInProxy" title="https://www.ica.org/standards/RiC/ontology#isDirectlyIncludedInProxy">isDirectlyIncludedInProxy</a> | No | Connects a Record or Record Set to a Proxy of a Record Set which it is directly included in. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#isDraftOf" title="https://www.ica.org/standards/RiC/ontology#isDraftOf">isDraftOf</a> | No | Connects a draft to the final version of a Record. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isIncludedInProxy" title="https://www.ica.org/standards/RiC/ontology#isIncludedInProxy">isIncludedInProxy</a> | No | Connects a Record or Record Set to a Proxy of a Record Set which it is included in, directly or indirectly. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#isIncludedInTransitive" title="https://www.ica.org/standards/RiC/ontology#isIncludedInTransitive">isIncludedInTransitive</a> | No | Connects a Record to a Record or Record Set in which it is directly or indirectly included. This is a transitive relation. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasConstituentOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasConstituentOf">isOrWasConstituentOf</a> | No | Inverse of 'has or had constituent' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isOrWasIncludedIn" title="https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn">isOrWasIncludedIn</a> | No | Inverse of 'includes or included' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOriginalOf" title="https://www.ica.org/standards/RiC/ontology#isOriginalOf">isOriginalOf</a> | No | Connects the original version of a Record to a copy or a later version. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#sentimentOrEmotionExpressed" title="https://www.ica.org/standards/RiC/ontology#sentimentOrEmotionExpressed">sentimentOrEmotionExpressed</a> | No | Specification of, or information about, the sentiment(s) or emotion(s) expressed by the content of a Record or a Record Part. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#wasConstituentOf" title="https://www.ica.org/standards/RiC/ontology#wasConstituentOf">wasConstituentOf</a> | No | Connects a Record or Record Part to another Record or Record Part of which it was a constituent in the past. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#wasIncludedIn" title="https://www.ica.org/standards/RiC/ontology#wasIncludedIn">wasIncludedIn</a> | No | Connects a Record to a Record or Record Set in which it was included in the past. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |


### <a id="RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart"></a> Class: Record Part <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RecordPart)</small>

Component of a Record with independent information content that contributes to the intellectual completeness of the Record.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hadConstituent" title="https://www.ica.org/standards/RiC/ontology#hadConstituent">hadConstituent</a> | No | Connects a Record or Record Part to another Record or Record Part that was its constituent in the past. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasConstituentProxy" title="https://www.ica.org/standards/RiC/ontology#hasConstituentProxy">hasConstituentProxy</a> | No | Inverse of 'proxy is constituent of' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#hasConstituentTransitive" title="https://www.ica.org/standards/RiC/ontology#hasConstituentTransitive">hasConstituentTransitive</a> | No | Connects a Record or Record Part to another Record or Record Part that is its constituent, directly or indirectly. This is a transitive relation. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasContentOfType" title="https://www.ica.org/standards/RiC/ontology#hasContentOfType">hasContentOfType</a> | No | Connects a Record or a Record Part to a Content Type which categorizes its content. | <a href="#ContentType" title="https://www.ica.org/standards/RiC/ontology#ContentType">Content Type</a> |  |
| <a href="#hasContentWhichMainlyRepresents" title="https://www.ica.org/standards/RiC/ontology#hasContentWhichMainlyRepresents">hasContentWhichMainlyRepresents</a> | No | Connects a Record or a Record Part to a Thing that its content mainly represents. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasContentWhichRepresents" title="https://www.ica.org/standards/RiC/ontology#hasContentWhichRepresents">hasContentWhichRepresents</a> | No | Connects a Record or a Record Part to a Thing that its content represents. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasDirectConstituent" title="https://www.ica.org/standards/RiC/ontology#hasDirectConstituent">hasDirectConstituent</a> | No | Connects a Record or Record Part to another Record or Record Part that is its direct constituent. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasDirectConstituentProxy" title="https://www.ica.org/standards/RiC/ontology#hasDirectConstituentProxy">hasDirectConstituentProxy</a> | No | Inverse of 'proxy is direct constituent of' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#hasDocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#hasDocumentaryFormType">hasDocumentaryFormType</a> | No | Connects a Record or Record Part to its Documentary Form Type. | <a href="#DocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#DocumentaryFormType">Documentary Form Type</a> |  |
| <a href="#hasDraft" title="https://www.ica.org/standards/RiC/ontology#hasDraft">hasDraft</a> | No | Inverse of 'is draft of' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasOrHadConstituent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadConstituent">hasOrHadConstituent</a> | No | Connects a Record or Record Part to a Record or Record part that is or was a constituent of that Record or Record Part. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasOrHadLanguage" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLanguage">hasOrHadLanguage</a> | No | Connects an Agent, Record or Record Part to a Language that uses or used it. | <a href="#Language" title="https://www.ica.org/standards/RiC/ontology#Language">Language</a> |  |
| <a href="#hasOrHadLegalStatus" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLegalStatus">hasOrHadLegalStatus</a> | No | Connects an Agent or Record Resource to a Legal Status which categorized or categorizes it. | <a href="#LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus">Legal Status</a> |  |
| <a href="#hasOriginal" title="https://www.ica.org/standards/RiC/ontology#hasOriginal">hasOriginal</a> | No | Inverse of 'is original of' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#hasRecordState" title="https://www.ica.org/standards/RiC/ontology#hasRecordState">hasRecordState</a> | No | Connects a Record or Record Part to a Record State that categorizes its state. | <a href="#RecordState" title="https://www.ica.org/standards/RiC/ontology#RecordState">Record State</a> |  |
| <a href="#isConstituentOfProxy" title="https://www.ica.org/standards/RiC/ontology#isConstituentOfProxy">isConstituentOfProxy</a> | No | Connects a Record or Record Part to a Proxy of a Record or Record Part of which it is a constituent, directly or indirectly. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#isConstituentOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isConstituentOfTransitive">isConstituentOfTransitive</a> | No | Connects a Record or Record Part to another Record or Record Part of which it is a constituent, directly or indirectly. This is a transitive relation. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isDirectConstituentOf" title="https://www.ica.org/standards/RiC/ontology#isDirectConstituentOf">isDirectConstituentOf</a> | No | Connects a Record or Record Part to another Record or Record Part of which it is a direct constituent. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isDirectConstituentOfProxy" title="https://www.ica.org/standards/RiC/ontology#isDirectConstituentOfProxy">isDirectConstituentOfProxy</a> | No | Connects a Record or Record Part to a Proxy of a Record or Record Part which it is a direct constituent of. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#isDraftOf" title="https://www.ica.org/standards/RiC/ontology#isDraftOf">isDraftOf</a> | No | Connects a draft to the final version of a Record. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isOrWasConstituentOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasConstituentOf">isOrWasConstituentOf</a> | No | Inverse of 'has or had constituent' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isOriginalOf" title="https://www.ica.org/standards/RiC/ontology#isOriginalOf">isOriginalOf</a> | No | Connects the original version of a Record to a copy or a later version. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#sentimentOrEmotionExpressed" title="https://www.ica.org/standards/RiC/ontology#sentimentOrEmotionExpressed">sentimentOrEmotionExpressed</a> | No | Specification of, or information about, the sentiment(s) or emotion(s) expressed by the content of a Record or a Record Part. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#wasConstituentOf" title="https://www.ica.org/standards/RiC/ontology#wasConstituentOf">wasConstituentOf</a> | No | Connects a Record or Record Part to another Record or Record Part of which it was a constituent in the past. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |


### <a id="RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource"></a> Class: Record Resource <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RecordResource)</small>

Information produced or acquired and retained by an Agent in the course of life or work activity.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#accumulationDate" title="https://www.ica.org/standards/RiC/ontology#accumulationDate">accumulationDate</a> | No | A date at which a Record Resource or Instantiation was or will be accumulated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#authenticityNote" title="https://www.ica.org/standards/RiC/ontology#authenticityNote">authenticityNote</a> | No | Information on the evidence that a Record Resource or Instantiation is what it purports to be, was created or sent by the said Agent at the said time, and has not been tampered with, corrupted, or forged.  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#classification" title="https://www.ica.org/standards/RiC/ontology#classification">classification</a> | No | A term, number or alphanumeric string that is usually taken from an external classification vocabulary or scheme that qualifies a Record Resource. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#conditionsOfAccess" title="https://www.ica.org/standards/RiC/ontology#conditionsOfAccess">conditionsOfAccess</a> | No | Terms and circumstances affecting the availability of a Record Resource or an Instantiation for consultation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#conditionsOfUse" title="https://www.ica.org/standards/RiC/ontology#conditionsOfUse">conditionsOfUse</a> | No | Terms and circumstances affecting the use of a Record Resource or an Instantiation after access has been provided. Includes conditions governing reproduction of the Record Resource under applicable copyright (intellectual property) and/or property legislation or due to conservation status. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#creationDate" title="https://www.ica.org/standards/RiC/ontology#creationDate">creationDate</a> | No | Date at which a Record Resource or Instantiation was or will be created. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#describesOrDescribed" title="https://www.ica.org/standards/RiC/ontology#describesOrDescribed">describesOrDescribed</a> | No | Connects a Record Resource to a Thing that it describes or described. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#destructionDate" title="https://www.ica.org/standards/RiC/ontology#destructionDate">destructionDate</a> | No | Date at which a Record Resource or Instantiation was or will be destructed. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#directlyFollowsProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyFollowsProxyInSequence">directlyFollowsProxyInSequence</a> | No | Inverse of 'proxy directly precedes in sequence' object property.  | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#directlyPrecedesProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyPrecedesProxyInSequence">directlyPrecedesProxyInSequence</a> | No | Connects a Record Resource to a Proxy of a Record Resource that it precedes directly in some sequence (not necessarily defined or characterised chronologically). | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#documents" title="https://www.ica.org/standards/RiC/ontology#documents">documents</a> | No | Connects a Record Resource or an Instantiation to the Activity that generates the Record Resource or Instantiation. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> |  |
| <a href="#evidences" title="https://www.ica.org/standards/RiC/ontology#evidences">evidences</a> | No | Connects a Record Resource to a Relation, when the first is used for proving the existence of the second one, or for describing it. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |  |
| <a href="#expressesOrExpressed" title="https://www.ica.org/standards/RiC/ontology#expressesOrExpressed">expressesOrExpressed</a> | No | Inverse of 'is or was expressed by' object property. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |  |
| <a href="#followsProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#followsProxyInSequence">followsProxyInSequence</a> | No | Inverse of 'proxy precedes in sequence' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#hasAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasAccumulationDate">hasAccumulationDate</a> | No | Inverse of 'is accumulation date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasAccumulator" title="https://www.ica.org/standards/RiC/ontology#hasAccumulator">hasAccumulator</a> | No | Connects a Record Resource or an Instantiation to the Agent that accumulates it, be it intentionally (collecting) or not (receiving in the course of its activities). | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasAddressee" title="https://www.ica.org/standards/RiC/ontology#hasAddressee">hasAddressee</a> | No | Connects a Record Resource or an Instantiation to the Agent that it is addressed to. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasCollector" title="https://www.ica.org/standards/RiC/ontology#hasCollector">hasCollector</a> | No | Connects a Record Resource or an Instantiation to the Agent that collects it intentionally, i.e., the Agent is a collector. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasCopy" title="https://www.ica.org/standards/RiC/ontology#hasCopy">hasCopy</a> | No | Connects a Record Resource to a copy of that Record Resource. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#hasCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasCreationDate">hasCreationDate</a> | No | Inverse of 'is creation date of' object property | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasCreator" title="https://www.ica.org/standards/RiC/ontology#hasCreator">hasCreator</a> | No | Connects a Record Resource or an Instantiation to an Agent that is either responsible for all or some of the content of the Record Resource or is a contributor to the genesis or production of an Instantiation. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasDestructionDate" title="https://www.ica.org/standards/RiC/ontology#hasDestructionDate">hasDestructionDate</a> | No | Inverse of 'is destruction date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasGeneticLinkToRecordResource" title="https://www.ica.org/standards/RiC/ontology#hasGeneticLinkToRecordResource">hasGeneticLinkToRecordResource</a> | No | Connects two Record Resources when there is a genetic link between them. Genetic in this sense is as defined by diplomatics, i.e. the process by which a Record Resource is developed. This relation is symmetric. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#hasOrHadAnalogueInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAnalogueInstantiation">hasOrHadAnalogueInstantiation</a> | No | Connects a record resource to one of its analogue instantiations, whether it exists or has been lost or destroyed. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#hasOrHadDigitalInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadDigitalInstantiation">hasOrHadDigitalInstantiation</a> | No | Connects a record resource to one of its digital instantiations, whether it exists or has been lost or destroyed. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#hasOrHadHolder" title="https://www.ica.org/standards/RiC/ontology#hasOrHadHolder">hasOrHadHolder</a> | No | Inverse of 'is or was holder of' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrHadInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadInstantiation">hasOrHadInstantiation</a> | No | Connects a Record Resource to an Instantiation, which either may exist or may have been lost or destroyed. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |
| <a href="#hasOrHadIntellectualPropertyRightsHolder" title="https://www.ica.org/standards/RiC/ontology#hasOrHadIntellectualPropertyRightsHolder">hasOrHadIntellectualPropertyRightsHolder</a> | No | Inverse of 'is or was holder of intellectual property rights of' object property. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a>, <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |  |
| <a href="#hasOrHadMainSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMainSubject">hasOrHadMainSubject</a> | No | Connects a Record Resource to a Thing that is or was its main subject. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasOrHadManager" title="https://www.ica.org/standards/RiC/ontology#hasOrHadManager">hasOrHadManager</a> | No | Inverse of 'is or was manager of' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrHadSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubject">hasOrHadSubject</a> | No | Connects a Record Resource to a Thing that is or was its subject. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasOrHadTitle" title="https://www.ica.org/standards/RiC/ontology#hasOrHadTitle">hasOrHadTitle</a> | No | Connects a Record Resource, Instantiation or Rule to a title that is or was used for designating it. | <a href="#Title" title="https://www.ica.org/standards/RiC/ontology#Title">Title</a> |  |
| <a href="#hasOrganicOrFunctionalProvenance" title="https://www.ica.org/standards/RiC/ontology#hasOrganicOrFunctionalProvenance">hasOrganicOrFunctionalProvenance</a> | No | Connects a Record Resource or an Instantiation to an Agent that creates or accumulates it, receives it, or sends it, or to an Activity that generates it. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a>, <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrganicProvenance" title="https://www.ica.org/standards/RiC/ontology#hasOrganicProvenance">hasOrganicProvenance</a> | No | Connects a Record Resource or an Instantiation to an Agent that creates or accumulates the Record Resource, receives it, or sends it. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasOrganicProvenanceDate" title="https://www.ica.org/standards/RiC/ontology#hasOrganicProvenanceDate">hasOrganicProvenanceDate</a> | No | Inverse of 'is date associated with organic provenance of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasProxy" title="https://www.ica.org/standards/RiC/ontology#hasProxy">hasProxy</a> | No | Inverse of 'proxy for' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#hasPublicationDate" title="https://www.ica.org/standards/RiC/ontology#hasPublicationDate">hasPublicationDate</a> | No | Inverse of 'is publication date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasPublisher" title="https://www.ica.org/standards/RiC/ontology#hasPublisher">hasPublisher</a> | No | Connects a Record resource to an Agent who published it. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasReceiver" title="https://www.ica.org/standards/RiC/ontology#hasReceiver">hasReceiver</a> | No | Connects a Record Resource or an Instantiation to the Agent that receives it in the course of the Agent's activities. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#hasReply" title="https://www.ica.org/standards/RiC/ontology#hasReply">hasReply</a> | No | Connects a Record Resource to a reply, usually in the form of correspondence. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#hasSender" title="https://www.ica.org/standards/RiC/ontology#hasSender">hasSender</a> | No | Connects a Record Resource or an Instantiation to the Agent that sends it | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#history" title="https://www.ica.org/standards/RiC/ontology#history">history</a> | No | Summary of the development of an entity throughout its existence. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#integrityNote" title="https://www.ica.org/standards/RiC/ontology#integrityNote">integrityNote</a> | No | Information about the known intellectual completeness of a Record Resource. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#isCopyOf" title="https://www.ica.org/standards/RiC/ontology#isCopyOf">isCopyOf</a> | No | Inverse of 'has copy' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isRecordResourceAssociatedWithRecordResource" title="https://www.ica.org/standards/RiC/ontology#isRecordResourceAssociatedWithRecordResource">isRecordResourceAssociatedWithRecordResource</a> | No | Connects two Record Resources. This relation is symmetric. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isReplyTo" title="https://www.ica.org/standards/RiC/ontology#isReplyTo">isReplyTo</a> | No | Inverse of 'has reply' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isSourceOfInformationOfRecordResource" title="https://www.ica.org/standards/RiC/ontology#isSourceOfInformationOfRecordResource">isSourceOfInformationOfRecordResource</a> | No | Connects a Record Resource to a Record Resource, when the first is used as a source of information for producing the content of the second one. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#physicalOrLogicalExtent" title="https://www.ica.org/standards/RiC/ontology#physicalOrLogicalExtent">physicalOrLogicalExtent</a> | No | Countable characteristics of the content of an entity expressed as a quantity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#precedesProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#precedesProxyInSequence">precedesProxyInSequence</a> | No | Connects a Record Resource to a Proxy of a Record Resource that it precedes directly or indirectly in some sequence (not necessarily defined or characterised chronologically). | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#publicationDate" title="https://www.ica.org/standards/RiC/ontology#publicationDate">publicationDate</a> | No | Date of the publication, in the past or in the future, of a Record Resource. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#rankInHierarchy" title="https://www.ica.org/standards/RiC/ontology#rankInHierarchy">rankInHierarchy</a> | No | The rank of a Record Resource, or of a Proxy that stands for it, in a hierarchy. | schema:Integer |  |
| <a href="#rankInSequence" title="https://www.ica.org/standards/RiC/ontology#rankInSequence">rankInSequence</a> | No | The rank of a Record Resource, or of a Proxy that stands for it, in a sequence. | schema:Integer |  |
| <a href="#recordResourceExtent" title="https://www.ica.org/standards/RiC/ontology#recordResourceExtent">recordResourceExtent</a> | No | The quantity of information content, as human experienced, contained in a Record Resource. The method and precision of expressing the quantity of information represented in a Record Resource will vary according to the kind of Record Resource being described, processing economy constraints, etc. For record sets, quantity may be expressed as number of records, or, for analogue records in particular, by the physical storage dimensions of the members of the Record Set. For individual records or record parts, quantity may be expressed in more precise terms.  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#recordResourceHasSourceOfInformation" title="https://www.ica.org/standards/RiC/ontology#recordResourceHasSourceOfInformation">recordResourceHasSourceOfInformation</a> | No | Connects a Record Resource to a Record Resource, when the second one is used as a source of information for producing the content of the first one. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#recordResourceSourceOfInformation" title="https://www.ica.org/standards/RiC/ontology#recordResourceSourceOfInformation">recordResourceSourceOfInformation</a> | No | Information about some source on which the content of a Record Resource is based. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#recordResourceStructure" title="https://www.ica.org/standards/RiC/ontology#recordResourceStructure">recordResourceStructure</a> | No | Information about the intellectual arrangement and composition of a Record Resource. For Record and Record Part, it encompasses information about the intellectual composition of the record, the presence of record parts and their functions. For Record Set, it encompasses information about the methodology or criteria used for arranging the Record Set members or Record members within the containing Record Set | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#scopeAndContent" title="https://www.ica.org/standards/RiC/ontology#scopeAndContent">scopeAndContent</a> | No | Summary of the scope (such as time periods, geography) and content (such as subject matter, administrative processes) of a Record Resource. Provides a more complete summary of the informational content of the Record Resource highlighting the information conveyed in the Record Resource, why it was created, received, and/or maintained, and the agents connected to it. It may include description of relations with agents, activities, dates and places, or with other record resources. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#structure" title="https://www.ica.org/standards/RiC/ontology#structure">structure</a> | No | Information about the intellectual arrangement and composition of a Record Resource or the physical arrangement and composition of an Instantiation. For Record and Record Part, it encompasses information about the intellectual composition of the record, the presence of record parts and their functions. For Record Set, it encompasses information about the methodology or criteria used for arranging the Record Set members or Record members within the containing Record Set. For Instantiation, it may comprise information about the composition of the physical elements of the instantiation | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#title" title="https://www.ica.org/standards/RiC/ontology#title">title</a> | No | An identifying name of a Record Resource, Instantiation or Rule. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="RecordResourceExtent" title="https://www.ica.org/standards/RiC/ontology#RecordResourceExtent"></a> Class: Record Resource Extent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RecordResourceExtent)</small>

The quantity of information content, as human experienced, contained in a Record Resource.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*



### <a id="RecordResourceGeneticRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceGeneticRelation"></a> Class: Record Resource Genetic Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RecordResourceGeneticRelation)</small>

Connects two or more record resources when there is a genetic link between them. Genetic in this sense is as defined by diplomatics, i.e., the process by which a record resource is developed. This Relation is a generic, not oriented one.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#recordResourceGeneticRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceGeneticRelation_role">recordResourceGeneticRelation_role</a> | No | Connects a RecordResourceGeneticRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#RecordResourceGeneticRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceGeneticRelation">Record Resource Genetic Relation</a> |  |


### <a id="RecordResourceHoldingRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceHoldingRelation"></a> Class: Record Resource Holding Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RecordResourceHoldingRelation)</small>

Connects at least one Agent and one or more Record Resource or Instantiation that the Agent(s) hold(s) or held. The Agent(s) is the source of the Relation and the Record Resource(s) or Instantiation is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#recordResourceHoldingRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceHoldingRelation_role">recordResourceHoldingRelation_role</a> | No | Connects a RecordResourceHoldingRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#RecordResourceHoldingRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceHoldingRelation">Record Resource Holding Relation</a> |  |


### <a id="RecordResourceToInstantiationRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceToInstantiationRelation"></a> Class: Record Resource to Instantiation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RecordResourceToInstantiationRelation)</small>

Connects a Record Resource to one or more Instantiations that instantiate it, and which either may exist or may have been lost or destroyed. The Record Resource is the source of the Relation and the Instantiation(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#recordResourceToInstantiationRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceToInstantiationRelation_role">recordResourceToInstantiationRelation_role</a> | No | Connects a RecordResourceToInstantiationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#RecordResourceToInstantiationRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceToInstantiationRelation">Record Resource to Instantiation Relation</a> |  |


### <a id="RecordResourceToRecordResourceRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceToRecordResourceRelation"></a> Class: Record Resource to Record Resource Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RecordResourceToRecordResourceRelation)</small>

Connects at least two Record Resources. This Relation is a generic, not oriented one.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#recordResourceToRecordResourceRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceToRecordResourceRelation_role">recordResourceToRecordResourceRelation_role</a> | No | Connects a RecordResourceToRecordResourceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#RecordResourceToRecordResourceRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceToRecordResourceRelation">Record Resource to Record Resource Relation</a> |  |


### <a id="RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet"></a> Class: Record Set <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RecordSet)</small>

One or more records that are grouped together by an Agent based on the records sharing one or more attributes or relations.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#accruals" title="https://www.ica.org/standards/RiC/ontology#accruals">accruals</a> | No | Information on the anticipated accession(s) to the Record Set. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#accrualsStatus" title="https://www.ica.org/standards/RiC/ontology#accrualsStatus">accrualsStatus</a> | No | Information on the status of possible accruals | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#allMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#allMembersWithAccumulationDate">allMembersWithAccumulationDate</a> | No | Date at which all of the present or past members of a Record Set were or will be accumulated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#allMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#allMembersWithCreationDate">allMembersWithCreationDate</a> | No | Date at which all of the present or past members of a Record Set were or will be created. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#directlyIncludes" title="https://www.ica.org/standards/RiC/ontology#directlyIncludes">directlyIncludes</a> | No | Connects a Record Set to a Record or Record Set which it includes directly. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#directlyIncludesProxy" title="https://www.ica.org/standards/RiC/ontology#directlyIncludesProxy">directlyIncludesProxy</a> | No | Inverse of 'proxy is directly included in' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#hasOrHadAllMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithAccumulationDate">hasOrHadAllMembersWithAccumulationDate</a> | No | Inverse of 'is or was accumulation date of all members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasOrHadAllMembersWithContentType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithContentType">hasOrHadAllMembersWithContentType</a> | No | Connects a Record Set and a Content Type that categorizes all the Records or Record Parts that are or were included in the Record Set. | <a href="#ContentType" title="https://www.ica.org/standards/RiC/ontology#ContentType">Content Type</a> |  |
| <a href="#hasOrHadAllMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithCreationDate">hasOrHadAllMembersWithCreationDate</a> | No | Inverse of 'is or was creation date of all members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasOrHadAllMembersWithDocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithDocumentaryFormType">hasOrHadAllMembersWithDocumentaryFormType</a> | No | Connects a Record Set and a Documentary Form Type that categorizes all the Records or Record Parts that are or were included in the Record Set. | <a href="#DocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#DocumentaryFormType">Documentary Form Type</a> |  |
| <a href="#hasOrHadAllMembersWithLanguage" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithLanguage">hasOrHadAllMembersWithLanguage</a> | No | Connects a Record Set and a Language used by all the Records or Record Parts that are or were included in the Record Set. | <a href="#Language" title="https://www.ica.org/standards/RiC/ontology#Language">Language</a> |  |
| <a href="#hasOrHadAllMembersWithLegalStatus" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithLegalStatus">hasOrHadAllMembersWithLegalStatus</a> | No | Connects a Record Set and a Legal Status that categorizes all the Records or Record Parts that are or were included in the Record Set. | <a href="#LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus">Legal Status</a> |  |
| <a href="#hasOrHadAllMembersWithMainSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithMainSubject">hasOrHadAllMembersWithMainSubject</a> | No | Connects a Record Set and a Thing that is the main subject of all the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasOrHadAllMembersWithRecordState" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithRecordState">hasOrHadAllMembersWithRecordState</a> | No | Connects a Record Set and a Record State that categorizes all the Records or Record Parts that are or were included in the Record Set. | <a href="#RecordState" title="https://www.ica.org/standards/RiC/ontology#RecordState">Record State</a> |  |
| <a href="#hasOrHadAllMembersWithSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithSubject">hasOrHadAllMembersWithSubject</a> | No | Connects a Record Set and a Thing that is the subject of all the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasOrHadAllMembersWithType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithType">hasOrHadAllMembersWithType</a> | No | Connects a Record Set and a Type to which all the Records or Record Parts that are or were included in the Record Set belong. | <a href="#Type" title="https://www.ica.org/standards/RiC/ontology#Type">Type</a> |  |
| <a href="#hasOrHadMostMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMostMembersWithAccumulationDate">hasOrHadMostMembersWithAccumulationDate</a> | No | Inverse of 'is or was accumulation date of most members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasOrHadMostMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMostMembersWithCreationDate">hasOrHadMostMembersWithCreationDate</a> | No | Inverse of 'is or was creation date of most members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasOrHadSomeMembersWhoseContentMainlyRepresents" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWhoseContentMainlyRepresents">hasOrHadSomeMembersWhoseContentMainlyRepresents</a> | No | Connects a Record Set and a Thing that is the main element represented by the content of some of the members of the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasOrHadSomeMembersWhoseContentRepresents" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWhoseContentRepresents">hasOrHadSomeMembersWhoseContentRepresents</a> | No | Connects a Record Set and a Thing that is represented by the content of some of the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasOrHadSomeMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithAccumulationDate">hasOrHadSomeMembersWithAccumulationDate</a> | No | Inverse of 'is or was accumulation date of some members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasOrHadSomeMembersWithContentType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithContentType">hasOrHadSomeMembersWithContentType</a> | No | Connects a Record Set and a Content Type that categorizes some of the Records or Record Parts that are or were included in the Record Set. | <a href="#ContentType" title="https://www.ica.org/standards/RiC/ontology#ContentType">Content Type</a> |  |
| <a href="#hasOrHadSomeMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithCreationDate">hasOrHadSomeMembersWithCreationDate</a> | No | Inverse of 'is or was creation date of some members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasOrHadSomeMembersWithDocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithDocumentaryFormType">hasOrHadSomeMembersWithDocumentaryFormType</a> | No | Connects a Record Set and a Documentary Form Type that categorizes some of the Records or Record Parts that are or were included in the Record Set. | <a href="#DocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#DocumentaryFormType">Documentary Form Type</a> |  |
| <a href="#hasOrHadSomeMembersWithLanguage" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithLanguage">hasOrHadSomeMembersWithLanguage</a> | No | Connects a Record Set and a Language used by some of the Records or Record Parts that are or were included in the Record Set. | <a href="#Language" title="https://www.ica.org/standards/RiC/ontology#Language">Language</a> |  |
| <a href="#hasOrHadSomeMembersWithLegalStatus" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithLegalStatus">hasOrHadSomeMembersWithLegalStatus</a> | No | Connects a Record Set and a Legal Status that categorizes some of the Records or Record Parts that are or were included in the Record Set. | <a href="#LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus">Legal Status</a> |  |
| <a href="#hasOrHadSomeMembersWithMainSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithMainSubject">hasOrHadSomeMembersWithMainSubject</a> | No | Connects a Record Set and a Thing that is the main subject of some of the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasOrHadSomeMembersWithRecordState" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithRecordState">hasOrHadSomeMembersWithRecordState</a> | No | Connects a Record Set and a Record State that categorizes some of the Records or Record Parts that are or were included in the Record Set. | <a href="#RecordState" title="https://www.ica.org/standards/RiC/ontology#RecordState">Record State</a> |  |
| <a href="#hasOrHadSomeMembersWithSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithSubject">hasOrHadSomeMembersWithSubject</a> | No | Connects a Record Set and a Thing that is the subject of some of the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasOrHadSomeMembersWithType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithType">hasOrHadSomeMembersWithType</a> | No | Connects a Record Set and a Type to which some of the Records or Record Parts that are or were included in the Record Set belong. | <a href="#Type" title="https://www.ica.org/standards/RiC/ontology#Type">Type</a> |  |
| <a href="#hasRecordSetType" title="https://www.ica.org/standards/RiC/ontology#hasRecordSetType">hasRecordSetType</a> | No | Connects a Record Set to a Record Set Type that categorizes it. | <a href="#RecordSetType" title="https://www.ica.org/standards/RiC/ontology#RecordSetType">Record Set Type</a> |  |
| <a href="#included" title="https://www.ica.org/standards/RiC/ontology#included">included</a> | No | Connects a Record Set to a Record or Record Set which it included in the past. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#includesOrIncluded" title="https://www.ica.org/standards/RiC/ontology#includesOrIncluded">includesOrIncluded</a> | No | Connects a Record Set to a Record or Record Set it aggregates, or aggregated in the past. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#includesProxy" title="https://www.ica.org/standards/RiC/ontology#includesProxy">includesProxy</a> | No | Inverse of 'proxy is included in' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#includesTransitive" title="https://www.ica.org/standards/RiC/ontology#includesTransitive">includesTransitive</a> | No | Connects a Record Set to a Record or Record Set which it includes directly or indirectly. This is a transitive relation. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isDirectlyIncludedIn" title="https://www.ica.org/standards/RiC/ontology#isDirectlyIncludedIn">isDirectlyIncludedIn</a> | No | Connects a Record to a Record or Record Set in which it is directly included. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isDirectlyIncludedInProxy" title="https://www.ica.org/standards/RiC/ontology#isDirectlyIncludedInProxy">isDirectlyIncludedInProxy</a> | No | Connects a Record or Record Set to a Proxy of a Record Set which it is directly included in. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#isIncludedInProxy" title="https://www.ica.org/standards/RiC/ontology#isIncludedInProxy">isIncludedInProxy</a> | No | Connects a Record or Record Set to a Proxy of a Record Set which it is included in, directly or indirectly. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |  |
| <a href="#isIncludedInTransitive" title="https://www.ica.org/standards/RiC/ontology#isIncludedInTransitive">isIncludedInTransitive</a> | No | Connects a Record to a Record or Record Set in which it is directly or indirectly included. This is a transitive relation. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasIncludedIn" title="https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn">isOrWasIncludedIn</a> | No | Inverse of 'includes or included' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#mostMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#mostMembersWithAccumulationDate">mostMembersWithAccumulationDate</a> | No | Date at which most of the present or past members of a Record Set were or will be accumulated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#mostMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#mostMembersWithCreationDate">mostMembersWithCreationDate</a> | No | Date at which most of the present or past members of a Record Set were or will be created. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#someMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#someMembersWithAccumulationDate">someMembersWithAccumulationDate</a> | No | Date at which some of the present or past members of a Record Set were or will be accumulated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#someMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#someMembersWithCreationDate">someMembersWithCreationDate</a> | No | Date at which some of the present or past members of a Record Set were or will be created. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#wasIncludedIn" title="https://www.ica.org/standards/RiC/ontology#wasIncludedIn">wasIncludedIn</a> | No | Connects a Record to a Record or Record Set in which it was included in the past. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |


### <a id="RecordSetType" title="https://www.ica.org/standards/RiC/ontology#RecordSetType"></a> Class: Record Set Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RecordSetType)</small>

A broad categorization of the type of Record Set.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isRecordSetTypeOf" title="https://www.ica.org/standards/RiC/ontology#isRecordSetTypeOf">isRecordSetTypeOf</a> | No | Connects a Record Set Type to a Record Set that it categorizes. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |


### <a id="RecordState" title="https://www.ica.org/standards/RiC/ontology#RecordState"></a> Class: Record State <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RecordState)</small>

Description of the production or reproduction status of a Record or Record Part.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasRecordStateOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRecordStateOfAllMembersOf">isOrWasRecordStateOfAllMembersOf</a> | No | Connects a Record State and a Record Set whose all past or present Record or Record Part members have that Record State. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasRecordStateOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRecordStateOfSomeMembersOf">isOrWasRecordStateOfSomeMembersOf</a> | No | Connects a Record State and a Record Set whose some past or present Record or Record Part members have that Record State. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isRecordStateOf" title="https://www.ica.org/standards/RiC/ontology#isRecordStateOf">isRecordStateOf</a> | No | Connects a Record State to a Record or Record Part whose state it categorizes. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |


### <a id="Relation" title="https://www.ica.org/standards/RiC/ontology#Relation"></a> Class: Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Relation)</small>

The top level relation class. It connects at least two Things. An instance of a Relation may have some datatype and object properties: a general description (datatype property) like any Thing; a certainty (for 'certain', 'quite probable', 'uncertain','unknown'); a date (use either the date datatype property or the Date class and isAssociatedWithDate object property); a state (relationState); a location (use the Place class and isAssociatedWithPlace object property); a source of information that can be used as an evidence for it (use either source datatype property or hasSource object property). This Relation is the most generic one; it is not oriented.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#relation_role" title="https://www.ica.org/standards/RiC/ontology#relation_role">relation_role</a> | No | Connects a Relation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |  |
| <a href="#isEvidencedBy" title="https://www.ica.org/standards/RiC/ontology#isEvidencedBy">isEvidencedBy</a> | No | Connects a Relation to a Record Resource that is used for proving is existence or describing it. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#relationCertainty" title="https://www.ica.org/standards/RiC/ontology#relationCertainty">relationCertainty</a> | No | Qualifies the level of certitude of the accuracy of a Relation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#relationConnects" title="https://www.ica.org/standards/RiC/ontology#relationConnects">relationConnects</a> | No | Connects an n-ary Relation to any of the Things involved. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#relationHasContext" title="https://www.ica.org/standards/RiC/ontology#relationHasContext">relationHasContext</a> | No | Connects an n-ary Relation to a Thing that is a secondary, contextual entity during the existence of the Relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#relationHasDate" title="https://www.ica.org/standards/RiC/ontology#relationHasDate">relationHasDate</a> | No | Connects an n-ary Relation to a Date. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#relationHasSource" title="https://www.ica.org/standards/RiC/ontology#relationHasSource">relationHasSource</a> | No | Connects an n-ary Relation to a Thing that is its source. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#relationHasTarget" title="https://www.ica.org/standards/RiC/ontology#relationHasTarget">relationHasTarget</a> | No | Connects an n-ary Relation to a Thing that is its target. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#relationSource" title="https://www.ica.org/standards/RiC/ontology#relationSource">relationSource</a> | No | A source of information used for identifying and describing a Relation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#relationState" title="https://www.ica.org/standards/RiC/ontology#relationState">relationState</a> | No | Used to qualify the state of a Relation (e. g. present, past, ongoing, unknown). | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="RepresentationType" title="https://www.ica.org/standards/RiC/ontology#RepresentationType"></a> Class: Representation Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RepresentationType)</small>

Method of recording the content type of an Instantiation

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isRepresentationTypeOf" title="https://www.ica.org/standards/RiC/ontology#isRepresentationTypeOf">isRepresentationTypeOf</a> | No | Connects a Representation Type to an Instantiation that it categorizes. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |  |


### <a id="RoleType" title="https://www.ica.org/standards/RiC/ontology#RoleType"></a> Class: Role Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RoleType)</small>

The role an Agent plays in some context (usually in some creation relation). Not to be confused with a Position (position of an agent in some group). For example, a Person who is the head of some Corporate Body may play the role of annotator (of a record) in a creation relation.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#roleIsContextOfCreationRelation" title="https://www.ica.org/standards/RiC/ontology#roleIsContextOfCreationRelation">roleIsContextOfCreationRelation</a> | No | Connects a Role Type to a Creation Relation (this Role Type being the specific role played by the creating Person in the context of this Relation). | <a href="#CreationRelation" title="https://www.ica.org/standards/RiC/ontology#CreationRelation">Creation Relation</a> |  |


### <a id="Rule" title="https://www.ica.org/standards/RiC/ontology#Rule"></a> Class: Rule <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Rule)</small>

Conditions that govern the existence, responsibility, or authority of an Agent; or the performance of an Activity by an Agent; or that contribute to the distinct characteristics of things created or managed by an Agent.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hasOrHadRuleType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadRuleType">hasOrHadRuleType</a> | No | Connects a Rule to a Rule Type that categorized or categorizes it. | <a href="#RuleType" title="https://www.ica.org/standards/RiC/ontology#RuleType">Rule Type</a> |  |
| <a href="#hasOrHadTitle" title="https://www.ica.org/standards/RiC/ontology#hasOrHadTitle">hasOrHadTitle</a> | No | Connects a Record Resource, Instantiation or Rule to a title that is or was used for designating it. | <a href="#Title" title="https://www.ica.org/standards/RiC/ontology#Title">Title</a> |  |
| <a href="#history" title="https://www.ica.org/standards/RiC/ontology#history">history</a> | No | Summary of the development of an entity throughout its existence. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#isOrWasEnforcedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasEnforcedBy">isOrWasEnforcedBy</a> | No | Connects a Rule to an Agent that enforces or enforced the Rule. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#isOrWasExpressedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasExpressedBy">isOrWasExpressedBy</a> | No | Connects a Rule to a Record Resource that expresses or expressed the Rule. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isRuleAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isRuleAssociatedWith">isRuleAssociatedWith</a> | No | Connects a Rule to a Thing that is associated with the Rule. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#issuedBy" title="https://www.ica.org/standards/RiC/ontology#issuedBy">issuedBy</a> | No | Connects a Rule to the Agent that issued or published the Rule. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#regulatesOrRegulated" title="https://www.ica.org/standards/RiC/ontology#regulatesOrRegulated">regulatesOrRegulated</a> | No | Connects a Rule to a Thing that it regulates or regulated. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#title" title="https://www.ica.org/standards/RiC/ontology#title">title</a> | No | An identifying name of a Record Resource, Instantiation or Rule. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="RuleRelation" title="https://www.ica.org/standards/RiC/ontology#RuleRelation"></a> Class: Rule Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RuleRelation)</small>

Connects at least one Rule to at least one Thing when it is associated with existence and lifecycle of the Thing. The Rule(s) is the source of the Relation, and the Thing(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#ruleRelation_role" title="https://www.ica.org/standards/RiC/ontology#ruleRelation_role">ruleRelation_role</a> | No | Connects a RuleRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#RuleRelation" title="https://www.ica.org/standards/RiC/ontology#RuleRelation">Rule Relation</a> |  |


### <a id="RuleType" title="https://www.ica.org/standards/RiC/ontology#RuleType"></a> Class: Rule Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#RuleType)</small>

Categorization of a Rule.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasRuleTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRuleTypeOf">isOrWasRuleTypeOf</a> | No | Connects a Rule Type to a Rule that it categorized or categorizes. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |  |


### <a id="SequentialRelation" title="https://www.ica.org/standards/RiC/ontology#SequentialRelation"></a> Class: Sequential Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#SequentialRelation)</small>

Connects at least one Thing to at least one other Thing that follows or followed it in some sequence. The Relation is oriented from the first Thing(s) in the sequence to the following one(s): the first Thing(s) is the source, and the following Thing(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#sequentialRelation_role" title="https://www.ica.org/standards/RiC/ontology#sequentialRelation_role">sequentialRelation_role</a> | No | Connects a SequentialRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#SequentialRelation" title="https://www.ica.org/standards/RiC/ontology#SequentialRelation">Sequential Relation</a> |  |


### <a id="SiblingRelation" title="https://www.ica.org/standards/RiC/ontology#SiblingRelation"></a> Class: Sibling Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#SiblingRelation)</small>

Connects at least two Persons, when they are siblings. This Relation is not oriented.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#siblingRelation_role" title="https://www.ica.org/standards/RiC/ontology#siblingRelation_role">siblingRelation_role</a> | No | Connects a SiblingRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#SiblingRelation" title="https://www.ica.org/standards/RiC/ontology#SiblingRelation">Sibling Relation</a> |  |


### <a id="SpouseRelation" title="https://www.ica.org/standards/RiC/ontology#SpouseRelation"></a> Class: Spouse Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#SpouseRelation)</small>

Connects at least two Persons, when they are spouses. This Relation is not oriented.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#spouseRelation_role" title="https://www.ica.org/standards/RiC/ontology#spouseRelation_role">spouseRelation_role</a> | No | Connects a SpouseRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#SpouseRelation" title="https://www.ica.org/standards/RiC/ontology#SpouseRelation">Spouse Relation</a> |  |


### <a id="StudyAtRelation" title="https://www.ica.org/standards/RiC/ontology#StudyAtRelation"></a> Class: Study At Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#StudyAtRelation)</small>

Connects a Group (as an educational institution) to at least one Person who studied or study at this group. Both 'institution' and 'at' can be interpreted broadly. The Relation is oriented from the educational institution to the student(s): the former is the source of the Relation, and the latter is/are the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#studyAtRelation_role" title="https://www.ica.org/standards/RiC/ontology#studyAtRelation_role">studyAtRelation_role</a> | No | Connects a StudyAtRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#StudyAtRelation" title="https://www.ica.org/standards/RiC/ontology#StudyAtRelation">Study At Relation</a> |  |


### <a id="TeachingRelation" title="https://www.ica.org/standards/RiC/ontology#TeachingRelation"></a> Class: Teaching Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#TeachingRelation)</small>

Connects at least one Person to at least another Person who is or was their student. The Relation is oriented from the teacher(s) to the student(s): the teacher Person(s) is the source of the Relation, and the student Person(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#teachingRelation_role" title="https://www.ica.org/standards/RiC/ontology#teachingRelation_role">teachingRelation_role</a> | No | Connects a TeachingRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#TeachingRelation" title="https://www.ica.org/standards/RiC/ontology#TeachingRelation">Teaching Relation</a> |  |


### <a id="TemporalRelation" title="https://www.ica.org/standards/RiC/ontology#TemporalRelation"></a> Class: Temporal Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#TemporalRelation)</small>

Connects at least one Thing to at least one other Thing that follows it in chronological order. The Relation is oriented chronologically: the preceding Thing(s) is the source of the Relation, the following Thing(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#temporalRelation_role" title="https://www.ica.org/standards/RiC/ontology#temporalRelation_role">temporalRelation_role</a> | No | Connects a TemporalRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#TemporalRelation" title="https://www.ica.org/standards/RiC/ontology#TemporalRelation">Temporal Relation</a> |  |


### <a id="Thing" title="https://www.ica.org/standards/RiC/ontology#Thing"></a> Class: Thing <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Thing)</small>

Any idea, material thing, or event within the realm of human experience.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#beginningDate" title="https://www.ica.org/standards/RiC/ontology#beginningDate">beginningDate</a> | No | Date at which something began. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#date" title="https://www.ica.org/standards/RiC/ontology#date">date</a> | No | Chronological information associated with an entity that contributes to its identification and contextualization. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#directlyFollowsInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyFollowsInSequence">directlyFollowsInSequence</a> | No | Inverse of 'directly precedes in sequence' object property. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#directlyPrecedesInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyPrecedesInSequence">directlyPrecedesInSequence</a> | No | Connects a Thing to a Thing that it precedes directly in some sequence (not necessarily defined or characterised chronologically). | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#endDate" title="https://www.ica.org/standards/RiC/ontology#endDate">endDate</a> | No | Date at which something ended. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#followedInSequence" title="https://www.ica.org/standards/RiC/ontology#followedInSequence">followedInSequence</a> | No | Connects a Thing to a Thing that it followed in some sequence (not necessarily defined or characterised chronologically) in the past. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#followsInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#followsInSequenceTransitive">followsInSequenceTransitive</a> | No | Inverse of 'precedes in sequence transitive' object property. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#followsInTime" title="https://www.ica.org/standards/RiC/ontology#followsInTime">followsInTime</a> | No | Inverse of 'precedes in time' object property. This is a transitive relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#followsOrFollowed" title="https://www.ica.org/standards/RiC/ontology#followsOrFollowed">followsOrFollowed</a> | No | Inverse of 'precedes or preceded' object property. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#generalDescription" title="https://www.ica.org/standards/RiC/ontology#generalDescription">generalDescription</a> | No | General information about an entity. General description may be used to describe any entity. There are different appropriate uses for general description. First, while it is recommended that more specific properties be used in describing an entity, it may be desirable, for economic or other reasons, to describe two or more specific properties together. Second, general description may be used to describe one or more characteristics that are not otherwise accommodated in RiC-O. Third, it may be used to provide a succinct summary or abstract description in addition to more detailed specific description. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#hadPart" title="https://www.ica.org/standards/RiC/ontology#hadPart">hadPart</a> | No | Connects a Thing to a Thing that was a constitutive or component part of that Thing in the past. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasBeginningDate" title="https://www.ica.org/standards/RiC/ontology#hasBeginningDate">hasBeginningDate</a> | No | Inverse of 'is beginning date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasDirectPart" title="https://www.ica.org/standards/RiC/ontology#hasDirectPart">hasDirectPart</a> | No | Connects a Thing to a Thing that is a direct constitutive or component part of that Thing. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasEndDate" title="https://www.ica.org/standards/RiC/ontology#hasEndDate">hasEndDate</a> | No | Inverse of 'is end date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasExtent" title="https://www.ica.org/standards/RiC/ontology#hasExtent">hasExtent</a> | No | Connects a Record Resource or Instantiation to an Extent | <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> |  |
| <a href="#hasModificationDate" title="https://www.ica.org/standards/RiC/ontology#hasModificationDate">hasModificationDate</a> | No | Inverse of 'is modification date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#hasOrHadAppellation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAppellation">hasOrHadAppellation</a> | No | Connects a Thing to an Appellation that is or was used for designating it. | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a> |  |
| <a href="#hasOrHadIdentifier" title="https://www.ica.org/standards/RiC/ontology#hasOrHadIdentifier">hasOrHadIdentifier</a> | No | Connects a Thing to one of its past or present Identifiers. | <a href="#Identifier" title="https://www.ica.org/standards/RiC/ontology#Identifier">Identifier</a> |  |
| <a href="#hasOrHadLocation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLocation">hasOrHadLocation</a> | No | Inverse of 'is or was location of' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#hasOrHadName" title="https://www.ica.org/standards/RiC/ontology#hasOrHadName">hasOrHadName</a> | No | Connects a Thing to one of its past or present Names. | <a href="#Name" title="https://www.ica.org/standards/RiC/ontology#Name">Name</a> |  |
| <a href="#hasOrHadOwner" title="https://www.ica.org/standards/RiC/ontology#hasOrHadOwner">hasOrHadOwner</a> | No | Inverse of 'is or was owner of' object property. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a>, <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |  |
| <a href="#hasOrHadPart" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPart">hasOrHadPart</a> | No | Connects a Thing to a constitutive or component part of that Thing. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#hasOrHadType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadType">hasOrHadType</a> | No | Connects a Thing to a Type that categorizes or categorized it. | <a href="#Type" title="https://www.ica.org/standards/RiC/ontology#Type">Type</a> |  |
| <a href="#hasPartTransitive" title="https://www.ica.org/standards/RiC/ontology#hasPartTransitive">hasPartTransitive</a> | No | Connects a Thing to a Thing that is, directly or indirectly, a constitutive or component part of that Thing. This is a transitive relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#height" title="https://www.ica.org/standards/RiC/ontology#height">height</a> | No | Vertical dimension of an entity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#identifier" title="https://www.ica.org/standards/RiC/ontology#identifier">identifier</a> | No | A word, number, letter, symbol, or any combination of these used to uniquely identify or reference an individual instance of an entity within a specific information domain. Can include Global Persistent Identifiers (globally unique and persistently resolvable identifier for the entity) and/or Local Identifiers. Both the domain within which the identifier is unique, and the rules used in forming the identifier value should be provided with the identifier value. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#isAssociatedWithDate" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithDate">isAssociatedWithDate</a> | No | Inverse of 'is date associated with' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#isAssociatedWithEvent" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithEvent">isAssociatedWithEvent</a> | No | Inverse of 'is event associated with' object property. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#isAssociatedWithPlace" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithPlace">isAssociatedWithPlace</a> | No | Inverse of 'is place associated with' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |  |
| <a href="#isAssociatedWithRule" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithRule">isAssociatedWithRule</a> | No | Inverse of 'is rule associated with' object property. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |  |
| <a href="#isDirectPartOf" title="https://www.ica.org/standards/RiC/ontology#isDirectPartOf">isDirectPartOf</a> | No | Connects a Thing to a Thing of which it is direct constitutive or component part. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isEquivalentTo" title="https://www.ica.org/standards/RiC/ontology#isEquivalentTo">isEquivalentTo</a> | No | Connects two Things that are considered equivalent. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isMainThingRepresentedByContentOf" title="https://www.ica.org/standards/RiC/ontology#isMainThingRepresentedByContentOf">isMainThingRepresentedByContentOf</a> | No | Inverse of 'has content which mainly represents' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#isOrWasAffectedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasAffectedBy">isOrWasAffectedBy</a> | No | Inverse of 'affects or affected' object property. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#isOrWasDescribedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasDescribedBy">isOrWasDescribedBy</a> | No | Inverse of 'describes or described' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isOrWasMainSubjectOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOf">isOrWasMainSubjectOf</a> | No | Inverse of 'has or had main subject' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isOrWasMainSubjectOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOfAllMembersOf">isOrWasMainSubjectOfAllMembersOf</a> | No | Inverse of 'has or had all members with main subject' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasMainSubjectOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOfSomeMembersOf">isOrWasMainSubjectOfSomeMembersOf</a> | No | Inverse of 'has or had some members with main subject' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasMainThingRepresentedByContentOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainThingRepresentedByContentOfSomeMembersOf">isOrWasMainThingRepresentedByContentOfSomeMembersOf</a> | No | Inverse of 'has or had some members whose content mainly represents' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasPartOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPartOf">isOrWasPartOf</a> | No | Inverse of 'has or had part' relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isOrWasParticipantIn" title="https://www.ica.org/standards/RiC/ontology#isOrWasParticipantIn">isOrWasParticipantIn</a> | No | Inverse of 'has or had participant' object property. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#isOrWasRegulatedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasRegulatedBy">isOrWasRegulatedBy</a> | No | Inverse of 'regulates or regulated' object property. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |  |
| <a href="#isOrWasRepresentedByContentOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRepresentedByContentOfSomeMembersOf">isOrWasRepresentedByContentOfSomeMembersOf</a> | No | Inverse of 'has or had some members whose content represents' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasSubjectOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOf">isOrWasSubjectOf</a> | No | Inverse of 'has or had subject' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |  |
| <a href="#isOrWasSubjectOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOfAllMembersOf">isOrWasSubjectOfAllMembersOf</a> | No | Inverse of 'has or had all members with subject' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasSubjectOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOfSomeMembersOf">isOrWasSubjectOfSomeMembersOf</a> | No | Inverse of 'has or had some members with subject' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasUnderAuthorityOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasUnderAuthorityOf">isOrWasUnderAuthorityOf</a> | No | Inverse of 'has or had authority over' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |  |
| <a href="#isPartOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isPartOfTransitive">isPartOfTransitive</a> | No | Connects a Thing to a Thing of which it is a a constitutive or component part, directly or indirectly. This is a transitive relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isRelatedTo" title="https://www.ica.org/standards/RiC/ontology#isRelatedTo">isRelatedTo</a> | No | The most generic relation, is related to, connects any Thing to any other Thing. This relation is symmetric. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isRepresentedByContentOf" title="https://www.ica.org/standards/RiC/ontology#isRepresentedByContentOf">isRepresentedByContentOf</a> | No | Inverse of 'has content which represents' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |  |
| <a href="#lastModificationDate" title="https://www.ica.org/standards/RiC/ontology#lastModificationDate">lastModificationDate</a> | No | Date at which an entity was last updated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#length" title="https://www.ica.org/standards/RiC/ontology#length">length</a> | No | Length of an entity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#measure" title="https://www.ica.org/standards/RiC/ontology#measure">measure</a> | No | The extent, quantity, amount, or degree of an entity, as determined by measurement or calculation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#modificationDate" title="https://www.ica.org/standards/RiC/ontology#modificationDate">modificationDate</a> | No | Date of the modification of an entity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#name" title="https://www.ica.org/standards/RiC/ontology#name">name</a> | No | A label, title or term designating an entity in order to make it distinguishable from other similar entities. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#note" title="https://www.ica.org/standards/RiC/ontology#note">note</a> | No | A short textual statement, that gives a little information on a specific feature of a Thing. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#precededInSequence" title="https://www.ica.org/standards/RiC/ontology#precededInSequence">precededInSequence</a> | No | Connects a Thing to a Thing that followed it in some sequence (not necessarily defined or characterised chronologically) in the past. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#precedesInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#precedesInSequenceTransitive">precedesInSequenceTransitive</a> | No | Connects a Thing to a Thing that follows it directly or indirectly in some sequence (not necessarily defined or characterised chronologically). This is a transitive relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#precedesInTime" title="https://www.ica.org/standards/RiC/ontology#precedesInTime">precedesInTime</a> | No | Connects a Thing to a Thing that follows it in chronological order. This is a transitive relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#precedesOrPreceded" title="https://www.ica.org/standards/RiC/ontology#precedesOrPreceded">precedesOrPreceded</a> | No | Connects a Thing to a Thing that follows or followed it in some sequence. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#referenceSystem" title="https://www.ica.org/standards/RiC/ontology#referenceSystem">referenceSystem</a> | No | Framework or standard used to represent an information. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#resultsOrResultedFrom" title="https://www.ica.org/standards/RiC/ontology#resultsOrResultedFrom">resultsOrResultedFrom</a> | No | Inverse of 'results or resulted in' object property. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |  |
| <a href="#ruleFollowed" title="https://www.ica.org/standards/RiC/ontology#ruleFollowed">ruleFollowed</a> | No | The rule or conditions that govern the existence or lifecycle of a Thing. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#thingIsConnectedToRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsConnectedToRelation">thingIsConnectedToRelation</a> | No | Connects a Thing to an n-ary Relation. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |  |
| <a href="#thingIsContextOfRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsContextOfRelation">thingIsContextOfRelation</a> | No | Connects a Thing (that is a secondary, contextual entity during the existence of the Relation) to an n-ary Relation. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |  |
| <a href="#thingIsSourceOfRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsSourceOfRelation">thingIsSourceOfRelation</a> | No | Connects a Thing (that is the source of a Relation) to a Relation. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |  |
| <a href="#thingIsTargetOfRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsTargetOfRelation">thingIsTargetOfRelation</a> | No | Connects a Thing (that is the target of a Relation) to an n-ary Relation. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |  |
| <a href="#type" title="https://www.ica.org/standards/RiC/ontology#type">type</a> | No | A term used to characterize an entity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |
| <a href="#wasLastUpdatedAtDate" title="https://www.ica.org/standards/RiC/ontology#wasLastUpdatedAtDate">wasLastUpdatedAtDate</a> | No | Connects a Thing to the Date when it was last modified. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |  |
| <a href="#wasPartOf" title="https://www.ica.org/standards/RiC/ontology#wasPartOf">wasPartOf</a> | No | Connects a Thing to a Thing of which it was a constitutive or component part in the past. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#width" title="https://www.ica.org/standards/RiC/ontology#width">width</a> | No | Horizontal dimension of an entity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> |  |


### <a id="Title" title="https://www.ica.org/standards/RiC/ontology#Title"></a> Class: Title <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Title)</small>

A name that is used for a Record Resource or a Rule

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#hasTitleType" title="https://www.ica.org/standards/RiC/ontology#hasTitleType">hasTitleType</a> | No | Connects a Title and a Title Type that categorizes it. | <a href="#TitleType" title="https://www.ica.org/standards/RiC/ontology#TitleType">Title Type</a> |  |
| <a href="#isOrWasTitleOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTitleOf">isOrWasTitleOf</a> | No | Connects a Title to a Record Resource, Instantiation or Rule that it designated or designates. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a>, <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |  |


### <a id="TitleType" title="https://www.ica.org/standards/RiC/ontology#TitleType"></a> Class: Title Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#TitleType)</small>

Categorization of a Title.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isTitleTypeOf" title="https://www.ica.org/standards/RiC/ontology#isTitleTypeOf">isTitleTypeOf</a> | No | Connects a Title Type and a Title that it categorizes. | <a href="#Title" title="https://www.ica.org/standards/RiC/ontology#Title">Title</a> |  |


### <a id="Type" title="https://www.ica.org/standards/RiC/ontology#Type"></a> Class: Type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#Type)</small>

A superclass for any type of some thing. A type characterizes an entity.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isOrWasTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTypeOf">isOrWasTypeOf</a> | No | Connects a Type to a Thing that it categorizes or categorized. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |  |
| <a href="#isOrWasTypeOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTypeOfAllMembersOf">isOrWasTypeOfAllMembersOf</a> | No | Connects a Type and a Record Set whose all present or past Record or Record Part members belong to that Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |
| <a href="#isOrWasTypeOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTypeOfSomeMembersOf">isOrWasTypeOfSomeMembersOf</a> | No | Connects a Type and a Record Set whose some present or past Record or Record Part members belong to that Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |  |


### <a id="TypeRelation" title="https://www.ica.org/standards/RiC/ontology#TypeRelation"></a> Class: Type Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#TypeRelation)</small>

Connects a category (a Type) and at least one Thing that belongs to this category. The Type(s) is the source of the Relation, and the Thing(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#typeRelation_role" title="https://www.ica.org/standards/RiC/ontology#typeRelation_role">typeRelation_role</a> | No | Connects a TypeRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#TypeRelation" title="https://www.ica.org/standards/RiC/ontology#TypeRelation">Type Relation</a> |  |


### <a id="UnitOfMeasurement" title="https://www.ica.org/standards/RiC/ontology#UnitOfMeasurement"></a> Class: Unit Of Measurement <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#UnitOfMeasurement)</small>

A definite magnitude of a quantity, defined and adopted by convention or by law, that is used as a standard for measurement of the same kind of quantity. Can be spacial units (cm, m), weight (g, kg), time (s, h), storage (MB, TB) or more informal units used in the archival context like number of boxes, pages or words.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#isUnitOfMeasurementOf" title="https://www.ica.org/standards/RiC/ontology#isUnitOfMeasurementOf">isUnitOfMeasurementOf</a> | No | Inverse of 'has unit of measurement' object property. | <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> |  |


### <a id="WholePartRelation" title="https://www.ica.org/standards/RiC/ontology#WholePartRelation"></a> Class: Whole Part Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#WholePartRelation)</small>

Connects a Thing to at least one other Thing that is or was a portion or division of the whole Thing. The Relation is oriented from the Thing to its part(s): the Thing is the source of the Relation, and the part Thing(s) is the target.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#wholePartRelation_role" title="https://www.ica.org/standards/RiC/ontology#wholePartRelation_role">wholePartRelation_role</a> | No | Connects a WholePartRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#WholePartRelation" title="https://www.ica.org/standards/RiC/ontology#WholePartRelation">Whole Part Relation</a> |  |


### <a id="WorkRelation" title="https://www.ica.org/standards/RiC/ontology#WorkRelation"></a> Class: Work Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#WorkRelation)</small>

Connects at least two Agents that have or had some type of work relation in the course of their activities. This Relation is not oriented.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#workRelation_role" title="https://www.ica.org/standards/RiC/ontology#workRelation_role">workRelation_role</a> | No | Connects a WorkRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#WorkRelation" title="https://www.ica.org/standards/RiC/ontology#WorkRelation">Work Relation</a> |  |

## All Properties

### <a id="accruals" title="https://www.ica.org/standards/RiC/ontology#accruals"></a> Property: accruals <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#accruals)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#accruals" title="https://www.ica.org/standards/RiC/ontology#accruals">accruals</a> | Information on the anticipated accession(s) to the Record Set. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="accrualsStatus" title="https://www.ica.org/standards/RiC/ontology#accrualsStatus"></a> Property: accruals status <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#accrualsStatus)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#accrualsStatus" title="https://www.ica.org/standards/RiC/ontology#accrualsStatus">accrualsStatus</a> | Information on the status of possible accruals | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="accumulationDate" title="https://www.ica.org/standards/RiC/ontology#accumulationDate"></a> Property: accumulation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#accumulationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#accumulationDate" title="https://www.ica.org/standards/RiC/ontology#accumulationDate">accumulationDate</a> | A date at which a Record Resource or Instantiation was or will be accumulated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="activityIsContextOfRelation" title="https://www.ica.org/standards/RiC/ontology#activityIsContextOfRelation"></a> Property: activity is context of relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#activityIsContextOfRelation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#activityIsContextOfRelation" title="https://www.ica.org/standards/RiC/ontology#activityIsContextOfRelation">activityIsContextOfRelation</a> | Connects an Activity to an Agent Temporal Relation (when the Activity is transferred from an Agent to another one) or a Mandate Relation (the Mandate assigns the Activity to the Agent or defines it). | <a href="#AgentTemporalRelation" title="https://www.ica.org/standards/RiC/ontology#AgentTemporalRelation">Agent Temporal Relation</a>, <a href="#MandateRelation" title="https://www.ica.org/standards/RiC/ontology#MandateRelation">Mandate Relation</a> | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> |
### <a id="affectsOrAffected" title="https://www.ica.org/standards/RiC/ontology#affectsOrAffected"></a> Property: affects or affected <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#affectsOrAffected)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#affectsOrAffected" title="https://www.ica.org/standards/RiC/ontology#affectsOrAffected">affectsOrAffected</a> | Connects an Event to a Thing on which the Event has or had some significant impact. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="agentHasOrHadLocation" title="https://www.ica.org/standards/RiC/ontology#agentHasOrHadLocation"></a> Property: agent has or had location <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#agentHasOrHadLocation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#agentHasOrHadLocation" title="https://www.ica.org/standards/RiC/ontology#agentHasOrHadLocation">agentHasOrHadLocation</a> | Inverse of 'is or was location of agent' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="allMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#allMembersWithAccumulationDate"></a> Property: all members with accumulation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#allMembersWithAccumulationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#allMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#allMembersWithAccumulationDate">allMembersWithAccumulationDate</a> | Date at which all of the present or past members of a Record Set were or will be accumulated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="allMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#allMembersWithCreationDate"></a> Property: all members with creation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#allMembersWithCreationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#allMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#allMembersWithCreationDate">allMembersWithCreationDate</a> | Date at which all of the present or past members of a Record Set were or will be created. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="altimetricSystem" title="https://www.ica.org/standards/RiC/ontology#altimetricSystem"></a> Property: altimetric system <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#altimetricSystem)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#altimetricSystem" title="https://www.ica.org/standards/RiC/ontology#altimetricSystem">altimetricSystem</a> | Reference system used for altitude | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Coordinates" title="https://www.ica.org/standards/RiC/ontology#Coordinates">Coordinates</a> |
### <a id="altitude" title="https://www.ica.org/standards/RiC/ontology#altitude"></a> Property: altitude <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#altitude)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#altitude" title="https://www.ica.org/standards/RiC/ontology#altitude">altitude</a> | The height of a Place above a reference level, especially above sea level. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Coordinates" title="https://www.ica.org/standards/RiC/ontology#Coordinates">Coordinates</a> |
### <a id="asConcernsActivity" title="https://www.ica.org/standards/RiC/ontology#asConcernsActivity"></a> Property: as concerns activity <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#asConcernsActivity)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#asConcernsActivity" title="https://www.ica.org/standards/RiC/ontology#asConcernsActivity">asConcernsActivity</a> | Connects an Agent Temporal Relation or Mandate Relation, to an Activity that is, either transferred from an Agent to another one, or assigned by a Mandate to an Agent. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> | <a href="#AgentTemporalRelation" title="https://www.ica.org/standards/RiC/ontology#AgentTemporalRelation">Agent Temporal Relation</a>, <a href="#MandateRelation" title="https://www.ica.org/standards/RiC/ontology#MandateRelation">Mandate Relation</a> |
### <a id="authenticityNote" title="https://www.ica.org/standards/RiC/ontology#authenticityNote"></a> Property: authenticity note <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#authenticityNote)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#authenticityNote" title="https://www.ica.org/standards/RiC/ontology#authenticityNote">authenticityNote</a> | Information on the evidence that a Record Resource or Instantiation is what it purports to be, was created or sent by the said Agent at the said time, and has not been tampered with, corrupted, or forged.  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="authorizedBy" title="https://www.ica.org/standards/RiC/ontology#authorizedBy"></a> Property: authorized by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#authorizedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#authorizedBy" title="https://www.ica.org/standards/RiC/ontology#authorizedBy">authorizedBy</a> | Inverse of 'authorizes' object property. | <a href="#Mandate" title="https://www.ica.org/standards/RiC/ontology#Mandate">Mandate</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="authorizes" title="https://www.ica.org/standards/RiC/ontology#authorizes"></a> Property: authorizes <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#authorizes)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#authorizes" title="https://www.ica.org/standards/RiC/ontology#authorizes">authorizes</a> | Connects a Mandate to the Agent that the Mandate gives the authority or competencies to act. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Mandate" title="https://www.ica.org/standards/RiC/ontology#Mandate">Mandate</a> |
### <a id="authorizingAgent" title="https://www.ica.org/standards/RiC/ontology#authorizingAgent"></a> Property: authorizing agent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#authorizingAgent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#authorizingAgent" title="https://www.ica.org/standards/RiC/ontology#authorizingAgent">authorizingAgent</a> | Connects a Mandate Relation to an Agent that assigns the Mandate. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#MandateRelation" title="https://www.ica.org/standards/RiC/ontology#MandateRelation">Mandate Relation</a> |
### <a id="authorizingMandate" title="https://www.ica.org/standards/RiC/ontology#authorizingMandate"></a> Property: authorizing mandate <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#authorizingMandate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#authorizingMandate" title="https://www.ica.org/standards/RiC/ontology#authorizingMandate">authorizingMandate</a> | Information on a Mandate that authorizes an Agent to perform an Activity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="beginningDate" title="https://www.ica.org/standards/RiC/ontology#beginningDate"></a> Property: beginning date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#beginningDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#beginningDate" title="https://www.ica.org/standards/RiC/ontology#beginningDate">beginningDate</a> | Date at which something began. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="birthDate" title="https://www.ica.org/standards/RiC/ontology#birthDate"></a> Property: birth date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#birthDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#birthDate" title="https://www.ica.org/standards/RiC/ontology#birthDate">birthDate</a> | Date at which a Person was born. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="carrierExtent" title="https://www.ica.org/standards/RiC/ontology#carrierExtent"></a> Property: carrier extent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#carrierExtent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#carrierExtent" title="https://www.ica.org/standards/RiC/ontology#carrierExtent">carrierExtent</a> | Number of physical units and/or physical dimensions of the carrier of an Instantiation. In order to manage an Instantiation of a record resource it is necessary to note the extent of the carrier as well as that of the Instantiation itself. Whether it is necessary to note dimensions, the number of relevant units, or both, depends on the nature of the carrier and particular business needs. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="classification" title="https://www.ica.org/standards/RiC/ontology#classification"></a> Property: classification <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#classification)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#classification" title="https://www.ica.org/standards/RiC/ontology#classification">classification</a> | A term, number or alphanumeric string that is usually taken from an external classification vocabulary or scheme that qualifies a Record Resource. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="conditionsOfAccess" title="https://www.ica.org/standards/RiC/ontology#conditionsOfAccess"></a> Property: conditions of access <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#conditionsOfAccess)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#conditionsOfAccess" title="https://www.ica.org/standards/RiC/ontology#conditionsOfAccess">conditionsOfAccess</a> | Terms and circumstances affecting the availability of a Record Resource or an Instantiation for consultation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="conditionsOfUse" title="https://www.ica.org/standards/RiC/ontology#conditionsOfUse"></a> Property: conditions of use <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#conditionsOfUse)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#conditionsOfUse" title="https://www.ica.org/standards/RiC/ontology#conditionsOfUse">conditionsOfUse</a> | Terms and circumstances affecting the use of a Record Resource or an Instantiation after access has been provided. Includes conditions governing reproduction of the Record Resource under applicable copyright (intellectual property) and/or property legislation or due to conservation status. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="contained" title="https://www.ica.org/standards/RiC/ontology#contained"></a> Property: contained <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#contained)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#contained" title="https://www.ica.org/standards/RiC/ontology#contained">contained</a> | Connects a Place to a Place that it contained in the past. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="directlyContains" title="https://www.ica.org/standards/RiC/ontology#directlyContains"></a> Property: contains directly <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#directlyContains)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#directlyContains" title="https://www.ica.org/standards/RiC/ontology#directlyContains">directlyContains</a> | Connects a Place to another Place that it directly contains. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="containsOrContained" title="https://www.ica.org/standards/RiC/ontology#containsOrContained"></a> Property: contains or contained <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#containsOrContained)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#containsOrContained" title="https://www.ica.org/standards/RiC/ontology#containsOrContained">containsOrContained</a> | Connects a Place to a region that is or was within it. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="containsTransitive" title="https://www.ica.org/standards/RiC/ontology#containsTransitive"></a> Property: contains transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#containsTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#containsTransitive" title="https://www.ica.org/standards/RiC/ontology#containsTransitive">containsTransitive</a> | Connects a Place to a Place that it contains, directly or indirectly. This is a transitive relation. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="creationDate" title="https://www.ica.org/standards/RiC/ontology#creationDate"></a> Property: creation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#creationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#creationDate" title="https://www.ica.org/standards/RiC/ontology#creationDate">creationDate</a> | Date at which a Record Resource or Instantiation was or will be created. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="creationWithRole" title="https://www.ica.org/standards/RiC/ontology#creationWithRole"></a> Property: creation with role <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#creationWithRole)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#creationWithRole" title="https://www.ica.org/standards/RiC/ontology#creationWithRole">creationWithRole</a> | Connects a Creation Relation to the Role Type that the creator Agent(s) has in the creation process | <a href="#RoleType" title="https://www.ica.org/standards/RiC/ontology#RoleType">Role Type</a> | <a href="#CreationRelation" title="https://www.ica.org/standards/RiC/ontology#CreationRelation">Creation Relation</a> |
### <a id="date" title="https://www.ica.org/standards/RiC/ontology#date"></a> Property: date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#date)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#date" title="https://www.ica.org/standards/RiC/ontology#date">date</a> | Chronological information associated with an entity that contributes to its identification and contextualization. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="dateQualifier" title="https://www.ica.org/standards/RiC/ontology#dateQualifier"></a> Property: date qualifier <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#dateQualifier)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#dateQualifier" title="https://www.ica.org/standards/RiC/ontology#dateQualifier">dateQualifier</a> | A human readable qualification of a Date to indicate the level of precision or certainty. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="deathDate" title="https://www.ica.org/standards/RiC/ontology#deathDate"></a> Property: death date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#deathDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#deathDate" title="https://www.ica.org/standards/RiC/ontology#deathDate">deathDate</a> | Date at which a Person died. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="derivationDate" title="https://www.ica.org/standards/RiC/ontology#derivationDate"></a> Property: derivation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#derivationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#derivationDate" title="https://www.ica.org/standards/RiC/ontology#derivationDate">derivationDate</a> | Date at which an Instantiation was or will be derived from another Instantiation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="describesOrDescribed" title="https://www.ica.org/standards/RiC/ontology#describesOrDescribed"></a> Property: describes or described <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#describesOrDescribed)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#describesOrDescribed" title="https://www.ica.org/standards/RiC/ontology#describesOrDescribed">describesOrDescribed</a> | Connects a Record Resource to a Thing that it describes or described. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="destructionDate" title="https://www.ica.org/standards/RiC/ontology#destructionDate"></a> Property: destruction date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#destructionDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#destructionDate" title="https://www.ica.org/standards/RiC/ontology#destructionDate">destructionDate</a> | Date at which a Record Resource or Instantiation was or will be destructed. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="directlyFollowsInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyFollowsInSequence"></a> Property: directly follows in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#directlyFollowsInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#directlyFollowsInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyFollowsInSequence">directlyFollowsInSequence</a> | Inverse of 'directly precedes in sequence' object property. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="directlyFollowsProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyFollowsProxyInSequence"></a> Property: directly follows proxy in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#directlyFollowsProxyInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#directlyFollowsProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyFollowsProxyInSequence">directlyFollowsProxyInSequence</a> | Inverse of 'proxy directly precedes in sequence' object property.  | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="directlyIncludes" title="https://www.ica.org/standards/RiC/ontology#directlyIncludes"></a> Property: directly includes <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#directlyIncludes)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#directlyIncludes" title="https://www.ica.org/standards/RiC/ontology#directlyIncludes">directlyIncludes</a> | Connects a Record Set to a Record or Record Set which it includes directly. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="directlyIncludesProxy" title="https://www.ica.org/standards/RiC/ontology#directlyIncludesProxy"></a> Property: directly includes proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#directlyIncludesProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#directlyIncludesProxy" title="https://www.ica.org/standards/RiC/ontology#directlyIncludesProxy">directlyIncludesProxy</a> | Inverse of 'proxy is directly included in' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="directlyPrecedesInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyPrecedesInSequence"></a> Property: directly precedes in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#directlyPrecedesInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#directlyPrecedesInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyPrecedesInSequence">directlyPrecedesInSequence</a> | Connects a Thing to a Thing that it precedes directly in some sequence (not necessarily defined or characterised chronologically). | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="directlyPrecedesProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyPrecedesProxyInSequence"></a> Property: directly precedes proxy in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#directlyPrecedesProxyInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#directlyPrecedesProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#directlyPrecedesProxyInSequence">directlyPrecedesProxyInSequence</a> | Connects a Record Resource to a Proxy of a Record Resource that it precedes directly in some sequence (not necessarily defined or characterised chronologically). | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="documentedBy" title="https://www.ica.org/standards/RiC/ontology#documentedBy"></a> Property: documented by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#documentedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#documentedBy" title="https://www.ica.org/standards/RiC/ontology#documentedBy">documentedBy</a> | Inverse of 'documents' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> |
### <a id="documents" title="https://www.ica.org/standards/RiC/ontology#documents"></a> Property: documents <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#documents)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#documents" title="https://www.ica.org/standards/RiC/ontology#documents">documents</a> | Connects a Record Resource or an Instantiation to the Activity that generates the Record Resource or Instantiation. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="endDate" title="https://www.ica.org/standards/RiC/ontology#endDate"></a> Property: end date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#endDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#endDate" title="https://www.ica.org/standards/RiC/ontology#endDate">endDate</a> | Date at which something ended. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="evidences" title="https://www.ica.org/standards/RiC/ontology#evidences"></a> Property: evidences <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#evidences)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#evidences" title="https://www.ica.org/standards/RiC/ontology#evidences">evidences</a> | Connects a Record Resource to a Relation, when the first is used for proving the existence of the second one, or for describing it. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="existsOrExistedIn" title="https://www.ica.org/standards/RiC/ontology#existsOrExistedIn"></a> Property: exists or existed in <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#existsOrExistedIn)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#existsOrExistedIn" title="https://www.ica.org/standards/RiC/ontology#existsOrExistedIn">existsOrExistedIn</a> | Connects a Position to a Group in which that Position exists or existed, or that is defined by that Group's organizational structure. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |
### <a id="expressedDate" title="https://www.ica.org/standards/RiC/ontology#expressedDate"></a> Property: expressed date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#expressedDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#expressedDate" title="https://www.ica.org/standards/RiC/ontology#expressedDate">expressedDate</a> | Natural language expression of a date. This property is a specialization of the name property. In order that the precise meaning of the date can be understood, information such as the calendar used or other specific context should be included. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="expressesOrExpressed" title="https://www.ica.org/standards/RiC/ontology#expressesOrExpressed"></a> Property: expresses or expressed <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#expressesOrExpressed)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#expressesOrExpressed" title="https://www.ica.org/standards/RiC/ontology#expressesOrExpressed">expressesOrExpressed</a> | Inverse of 'is or was expressed by' object property. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="followedInSequence" title="https://www.ica.org/standards/RiC/ontology#followedInSequence"></a> Property: followed in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#followedInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#followedInSequence" title="https://www.ica.org/standards/RiC/ontology#followedInSequence">followedInSequence</a> | Connects a Thing to a Thing that it followed in some sequence (not necessarily defined or characterised chronologically) in the past. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="followsInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#followsInSequenceTransitive"></a> Property: follows in sequence transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#followsInSequenceTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#followsInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#followsInSequenceTransitive">followsInSequenceTransitive</a> | Inverse of 'precedes in sequence transitive' object property. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="followsInTime" title="https://www.ica.org/standards/RiC/ontology#followsInTime"></a> Property: follows in time <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#followsInTime)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#followsInTime" title="https://www.ica.org/standards/RiC/ontology#followsInTime">followsInTime</a> | Inverse of 'precedes in time' object property. This is a transitive relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="followsOrFollowed" title="https://www.ica.org/standards/RiC/ontology#followsOrFollowed"></a> Property: follows or followed <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#followsOrFollowed)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#followsOrFollowed" title="https://www.ica.org/standards/RiC/ontology#followsOrFollowed">followsOrFollowed</a> | Inverse of 'precedes or preceded' object property. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="followsProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#followsProxyInSequence"></a> Property: follows proxy in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#followsProxyInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#followsProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#followsProxyInSequence">followsProxyInSequence</a> | Inverse of 'proxy precedes in sequence' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="generalDescription" title="https://www.ica.org/standards/RiC/ontology#generalDescription"></a> Property: general description <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#generalDescription)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#generalDescription" title="https://www.ica.org/standards/RiC/ontology#generalDescription">generalDescription</a> | General information about an entity. General description may be used to describe any entity. There are different appropriate uses for general description. First, while it is recommended that more specific properties be used in describing an entity, it may be desirable, for economic or other reasons, to describe two or more specific properties together. Second, general description may be used to describe one or more characteristics that are not otherwise accommodated in RiC-O. Third, it may be used to provide a succinct summary or abstract description in addition to more detailed specific description. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="geodesicSystem" title="https://www.ica.org/standards/RiC/ontology#geodesicSystem"></a> Property: geodesic system <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#geodesicSystem)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#geodesicSystem" title="https://www.ica.org/standards/RiC/ontology#geodesicSystem">geodesicSystem</a> | Reference system used for geographical coordinates. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Coordinates" title="https://www.ica.org/standards/RiC/ontology#Coordinates">Coordinates</a> |
### <a id="geographicalCoordinates" title="https://www.ica.org/standards/RiC/ontology#geographicalCoordinates"></a> Property: geographical coordinates <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#geographicalCoordinates)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#geographicalCoordinates" title="https://www.ica.org/standards/RiC/ontology#geographicalCoordinates">geographicalCoordinates</a> | Longitudinal and latitudinal information about a Place.  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="hadComponent" title="https://www.ica.org/standards/RiC/ontology#hadComponent"></a> Property: had component <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hadComponent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hadComponent" title="https://www.ica.org/standards/RiC/ontology#hadComponent">hadComponent</a> | Connects an Instantiation to another Instantiation that was its component in the past. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="hadConstituent" title="https://www.ica.org/standards/RiC/ontology#hadConstituent"></a> Property: had constituent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hadConstituent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hadConstituent" title="https://www.ica.org/standards/RiC/ontology#hadConstituent">hadConstituent</a> | Connects a Record or Record Part to another Record or Record Part that was its constituent in the past. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hadPart" title="https://www.ica.org/standards/RiC/ontology#hadPart"></a> Property: had part <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hadPart)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hadPart" title="https://www.ica.org/standards/RiC/ontology#hadPart">hadPart</a> | Connects a Thing to a Thing that was a constitutive or component part of that Thing in the past. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hadSubdivision" title="https://www.ica.org/standards/RiC/ontology#hadSubdivision"></a> Property: had subdivision <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hadSubdivision)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hadSubdivision" title="https://www.ica.org/standards/RiC/ontology#hadSubdivision">hadSubdivision</a> | Connects a Group to one of its past subdivisions. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="hadSubevent" title="https://www.ica.org/standards/RiC/ontology#hadSubevent"></a> Property: had subevent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hadSubevent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hadSubevent" title="https://www.ica.org/standards/RiC/ontology#hadSubevent">hadSubevent</a> | Connects a past Event to one of a series of past Events that constituted that original, broader, past Event. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="hadSubordinate" title="https://www.ica.org/standards/RiC/ontology#hadSubordinate"></a> Property: had subordinate <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hadSubordinate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hadSubordinate" title="https://www.ica.org/standards/RiC/ontology#hadSubordinate">hadSubordinate</a> | Connects an Agent to an Agent that was hierarchically inferior in the past. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="hasAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasAccumulationDate"></a> Property: has accumulation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasAccumulationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasAccumulationDate">hasAccumulationDate</a> | Inverse of 'is accumulation date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasAccumulator" title="https://www.ica.org/standards/RiC/ontology#hasAccumulator"></a> Property: has accumulator <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasAccumulator)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasAccumulator" title="https://www.ica.org/standards/RiC/ontology#hasAccumulator">hasAccumulator</a> | Connects a Record Resource or an Instantiation to the Agent that accumulates it, be it intentionally (collecting) or not (receiving in the course of its activities). | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasActivityType" title="https://www.ica.org/standards/RiC/ontology#hasActivityType"></a> Property: has activity type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasActivityType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasActivityType" title="https://www.ica.org/standards/RiC/ontology#hasActivityType">hasActivityType</a> | Connects an Activity to an Activity Type that categorizes it. | <a href="#ActivityType" title="https://www.ica.org/standards/RiC/ontology#ActivityType">Activity Type</a> | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> |
### <a id="hasAddressee" title="https://www.ica.org/standards/RiC/ontology#hasAddressee"></a> Property: has addressee <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasAddressee)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasAddressee" title="https://www.ica.org/standards/RiC/ontology#hasAddressee">hasAddressee</a> | Connects a Record Resource or an Instantiation to the Agent that it is addressed to. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasAncestor" title="https://www.ica.org/standards/RiC/ontology#hasAncestor"></a> Property: has ancestor <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasAncestor)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasAncestor" title="https://www.ica.org/standards/RiC/ontology#hasAncestor">hasAncestor</a> | Inverse of 'has descendant' object property. This is a transitive relation. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasAuthor" title="https://www.ica.org/standards/RiC/ontology#hasAuthor"></a> Property: has author <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasAuthor)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasAuthor" title="https://www.ica.org/standards/RiC/ontology#hasAuthor">hasAuthor</a> | Connects a Record to the Group, Person or Position that is responsible for conceiving and formulating the information contained in the Record. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a>, <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a> |
### <a id="hasBeginningDate" title="https://www.ica.org/standards/RiC/ontology#hasBeginningDate"></a> Property: has beginning date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasBeginningDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasBeginningDate" title="https://www.ica.org/standards/RiC/ontology#hasBeginningDate">hasBeginningDate</a> | Inverse of 'is beginning date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasBirthDate" title="https://www.ica.org/standards/RiC/ontology#hasBirthDate"></a> Property: has birth date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasBirthDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasBirthDate" title="https://www.ica.org/standards/RiC/ontology#hasBirthDate">hasBirthDate</a> | Inverse of 'is birth date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasBirthPlace" title="https://www.ica.org/standards/RiC/ontology#hasBirthPlace"></a> Property: has birth place <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasBirthPlace)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasBirthPlace" title="https://www.ica.org/standards/RiC/ontology#hasBirthPlace">hasBirthPlace</a> | Inverse of 'is birth place of' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasCarrierType" title="https://www.ica.org/standards/RiC/ontology#hasCarrierType"></a> Property: has carrier type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasCarrierType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasCarrierType" title="https://www.ica.org/standards/RiC/ontology#hasCarrierType">hasCarrierType</a> | Connects an Instantiation to a Carrier Type which categorizes its carrier. | <a href="#CarrierType" title="https://www.ica.org/standards/RiC/ontology#CarrierType">Carrier Type</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="hasChild" title="https://www.ica.org/standards/RiC/ontology#hasChild"></a> Property: has child <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasChild)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasChild" title="https://www.ica.org/standards/RiC/ontology#hasChild">hasChild</a> | Connects a Person to one of their children. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasCollector" title="https://www.ica.org/standards/RiC/ontology#hasCollector"></a> Property: has collector <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasCollector)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasCollector" title="https://www.ica.org/standards/RiC/ontology#hasCollector">hasCollector</a> | Connects a Record Resource or an Instantiation to the Agent that collects it intentionally, i.e., the Agent is a collector. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasComponentTransitive" title="https://www.ica.org/standards/RiC/ontology#hasComponentTransitive"></a> Property: has component transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasComponentTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasComponentTransitive" title="https://www.ica.org/standards/RiC/ontology#hasComponentTransitive">hasComponentTransitive</a> | Connects an Instantiation to another Instantiation that is, directly or indirectly, a component of that Instantiation. This is a transitive relation. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="hasConstituentProxy" title="https://www.ica.org/standards/RiC/ontology#hasConstituentProxy"></a> Property: has constituent proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasConstituentProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasConstituentProxy" title="https://www.ica.org/standards/RiC/ontology#hasConstituentProxy">hasConstituentProxy</a> | Inverse of 'proxy is constituent of' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasConstituentTransitive" title="https://www.ica.org/standards/RiC/ontology#hasConstituentTransitive"></a> Property: has constituent transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasConstituentTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasConstituentTransitive" title="https://www.ica.org/standards/RiC/ontology#hasConstituentTransitive">hasConstituentTransitive</a> | Connects a Record or Record Part to another Record or Record Part that is its constituent, directly or indirectly. This is a transitive relation. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasContentOfType" title="https://www.ica.org/standards/RiC/ontology#hasContentOfType"></a> Property: has content of type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasContentOfType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasContentOfType" title="https://www.ica.org/standards/RiC/ontology#hasContentOfType">hasContentOfType</a> | Connects a Record or a Record Part to a Content Type which categorizes its content. | <a href="#ContentType" title="https://www.ica.org/standards/RiC/ontology#ContentType">Content Type</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasContentWhichMainlyRepresents" title="https://www.ica.org/standards/RiC/ontology#hasContentWhichMainlyRepresents"></a> Property: has content which mainly represents <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasContentWhichMainlyRepresents)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasContentWhichMainlyRepresents" title="https://www.ica.org/standards/RiC/ontology#hasContentWhichMainlyRepresents">hasContentWhichMainlyRepresents</a> | Connects a Record or a Record Part to a Thing that its content mainly represents. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasContentWhichRepresents" title="https://www.ica.org/standards/RiC/ontology#hasContentWhichRepresents"></a> Property: has content which represents <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasContentWhichRepresents)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasContentWhichRepresents" title="https://www.ica.org/standards/RiC/ontology#hasContentWhichRepresents">hasContentWhichRepresents</a> | Connects a Record or a Record Part to a Thing that its content represents. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasCopy" title="https://www.ica.org/standards/RiC/ontology#hasCopy"></a> Property: has copy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasCopy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasCopy" title="https://www.ica.org/standards/RiC/ontology#hasCopy">hasCopy</a> | Connects a Record Resource to a copy of that Record Resource. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasCreationDate"></a> Property: has creation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasCreationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasCreationDate">hasCreationDate</a> | Inverse of 'is creation date of' object property | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasCreator" title="https://www.ica.org/standards/RiC/ontology#hasCreator"></a> Property: has creator <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasCreator)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasCreator" title="https://www.ica.org/standards/RiC/ontology#hasCreator">hasCreator</a> | Connects a Record Resource or an Instantiation to an Agent that is either responsible for all or some of the content of the Record Resource or is a contributor to the genesis or production of an Instantiation. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasDateType" title="https://www.ica.org/standards/RiC/ontology#hasDateType"></a> Property: has date type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDateType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDateType" title="https://www.ica.org/standards/RiC/ontology#hasDateType">hasDateType</a> | Connects a Date to its Date Type. | <a href="#DateType" title="https://www.ica.org/standards/RiC/ontology#DateType">Date Type</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="hasDeathDate" title="https://www.ica.org/standards/RiC/ontology#hasDeathDate"></a> Property: has death date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDeathDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDeathDate" title="https://www.ica.org/standards/RiC/ontology#hasDeathDate">hasDeathDate</a> | Inverse of 'is death date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasDeathPlace" title="https://www.ica.org/standards/RiC/ontology#hasDeathPlace"></a> Property: has death place <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDeathPlace)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDeathPlace" title="https://www.ica.org/standards/RiC/ontology#hasDeathPlace">hasDeathPlace</a> | Inverse of 'is death place of' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasDerivationDate" title="https://www.ica.org/standards/RiC/ontology#hasDerivationDate"></a> Property: has derivation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDerivationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDerivationDate" title="https://www.ica.org/standards/RiC/ontology#hasDerivationDate">hasDerivationDate</a> | Inverse of 'is derivation date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="hasDescendant" title="https://www.ica.org/standards/RiC/ontology#hasDescendant"></a> Property: has descendant <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDescendant)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDescendant" title="https://www.ica.org/standards/RiC/ontology#hasDescendant">hasDescendant</a> | Connects a Person to one of their descendants. This is a transitive relation. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasDestructionDate" title="https://www.ica.org/standards/RiC/ontology#hasDestructionDate"></a> Property: has destruction date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDestructionDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDestructionDate" title="https://www.ica.org/standards/RiC/ontology#hasDestructionDate">hasDestructionDate</a> | Inverse of 'is destruction date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasDirectComponent" title="https://www.ica.org/standards/RiC/ontology#hasDirectComponent"></a> Property: has direct component <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDirectComponent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDirectComponent" title="https://www.ica.org/standards/RiC/ontology#hasDirectComponent">hasDirectComponent</a> | Connects an Instantiation to another Instantiation that is its direct component. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="hasDirectConstituent" title="https://www.ica.org/standards/RiC/ontology#hasDirectConstituent"></a> Property: has direct constituent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDirectConstituent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDirectConstituent" title="https://www.ica.org/standards/RiC/ontology#hasDirectConstituent">hasDirectConstituent</a> | Connects a Record or Record Part to another Record or Record Part that is its direct constituent. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasDirectConstituentProxy" title="https://www.ica.org/standards/RiC/ontology#hasDirectConstituentProxy"></a> Property: has direct constituent proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDirectConstituentProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDirectConstituentProxy" title="https://www.ica.org/standards/RiC/ontology#hasDirectConstituentProxy">hasDirectConstituentProxy</a> | Inverse of 'proxy is direct constituent of' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasDirectPart" title="https://www.ica.org/standards/RiC/ontology#hasDirectPart"></a> Property: has direct part <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDirectPart)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDirectPart" title="https://www.ica.org/standards/RiC/ontology#hasDirectPart">hasDirectPart</a> | Connects a Thing to a Thing that is a direct constitutive or component part of that Thing. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasDirectSubdivision" title="https://www.ica.org/standards/RiC/ontology#hasDirectSubdivision"></a> Property: has direct subdivision <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDirectSubdivision)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDirectSubdivision" title="https://www.ica.org/standards/RiC/ontology#hasDirectSubdivision">hasDirectSubdivision</a> | Connects a Group to one of its direct subdivisions. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="hasDirectSubevent" title="https://www.ica.org/standards/RiC/ontology#hasDirectSubevent"></a> Property: has direct subevent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDirectSubevent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDirectSubevent" title="https://www.ica.org/standards/RiC/ontology#hasDirectSubevent">hasDirectSubevent</a> | Connects an ongoing Event to one of a series of Events that directly constitute that broader, ongoing Event. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="hasDirectSubordinate" title="https://www.ica.org/standards/RiC/ontology#hasDirectSubordinate"></a> Property: has direct subordinate <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDirectSubordinate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDirectSubordinate" title="https://www.ica.org/standards/RiC/ontology#hasDirectSubordinate">hasDirectSubordinate</a> | Connects an Agent to an Agent that is its direct subordinate. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="hasDocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#hasDocumentaryFormType"></a> Property: has documentary form type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDocumentaryFormType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#hasDocumentaryFormType">hasDocumentaryFormType</a> | Connects a Record or Record Part to its Documentary Form Type. | <a href="#DocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#DocumentaryFormType">Documentary Form Type</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasDraft" title="https://www.ica.org/standards/RiC/ontology#hasDraft"></a> Property: has draft <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasDraft)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasDraft" title="https://www.ica.org/standards/RiC/ontology#hasDraft">hasDraft</a> | Inverse of 'is draft of' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasEndDate" title="https://www.ica.org/standards/RiC/ontology#hasEndDate"></a> Property: has end date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasEndDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasEndDate" title="https://www.ica.org/standards/RiC/ontology#hasEndDate">hasEndDate</a> | Inverse of 'is end date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasEventType" title="https://www.ica.org/standards/RiC/ontology#hasEventType"></a> Property: has event type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasEventType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasEventType" title="https://www.ica.org/standards/RiC/ontology#hasEventType">hasEventType</a> | Connects an Event to an Event Type which categorizes it. | <a href="#EventType" title="https://www.ica.org/standards/RiC/ontology#EventType">Event Type</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="hasExtent" title="https://www.ica.org/standards/RiC/ontology#hasExtent"></a> Property: has extent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasExtent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasExtent" title="https://www.ica.org/standards/RiC/ontology#hasExtent">hasExtent</a> | Connects a Record Resource or Instantiation to an Extent | <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasExtentType" title="https://www.ica.org/standards/RiC/ontology#hasExtentType"></a> Property: has extent type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasExtentType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasExtentType" title="https://www.ica.org/standards/RiC/ontology#hasExtentType">hasExtentType</a> | Connects an Extent to an Extent Type that categorizes what is being measured. | <a href="#ExtentType" title="https://www.ica.org/standards/RiC/ontology#ExtentType">Extent Type</a> | <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> |
### <a id="hasFamilyAssociationWith" title="https://www.ica.org/standards/RiC/ontology#hasFamilyAssociationWith"></a> Property: has family association with <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasFamilyAssociationWith)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasFamilyAssociationWith" title="https://www.ica.org/standards/RiC/ontology#hasFamilyAssociationWith">hasFamilyAssociationWith</a> | Connects two Persons that have some type of family link, i.e. belong to the same family. This relation is symmetric. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasFamilyType" title="https://www.ica.org/standards/RiC/ontology#hasFamilyType"></a> Property: has family type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasFamilyType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasFamilyType" title="https://www.ica.org/standards/RiC/ontology#hasFamilyType">hasFamilyType</a> | Connects a Family to a Family Type that categorizes it. | <a href="#FamilyType" title="https://www.ica.org/standards/RiC/ontology#FamilyType">Family Type</a> | <a href="#Family" title="https://www.ica.org/standards/RiC/ontology#Family">Family</a> |
### <a id="hasGeneticLinkToRecordResource" title="https://www.ica.org/standards/RiC/ontology#hasGeneticLinkToRecordResource"></a> Property: has genetic link to record resource <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasGeneticLinkToRecordResource)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasGeneticLinkToRecordResource" title="https://www.ica.org/standards/RiC/ontology#hasGeneticLinkToRecordResource">hasGeneticLinkToRecordResource</a> | Connects two Record Resources when there is a genetic link between them. Genetic in this sense is as defined by diplomatics, i.e. the process by which a Record Resource is developed. This relation is symmetric. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasIdentifierType" title="https://www.ica.org/standards/RiC/ontology#hasIdentifierType"></a> Property: has identifier type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasIdentifierType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasIdentifierType" title="https://www.ica.org/standards/RiC/ontology#hasIdentifierType">hasIdentifierType</a> | Connects an Identifier and an Identifier Type that categorizes it. | <a href="#IdentifierType" title="https://www.ica.org/standards/RiC/ontology#IdentifierType">Identifier Type</a> | <a href="#Identifier" title="https://www.ica.org/standards/RiC/ontology#Identifier">Identifier</a> |
### <a id="hasMigrationDate" title="https://www.ica.org/standards/RiC/ontology#hasMigrationDate"></a> Property: has migration date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasMigrationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasMigrationDate" title="https://www.ica.org/standards/RiC/ontology#hasMigrationDate">hasMigrationDate</a> | Inverse of 'is migration date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="hasModificationDate" title="https://www.ica.org/standards/RiC/ontology#hasModificationDate"></a> Property: has modification date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasModificationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasModificationDate" title="https://www.ica.org/standards/RiC/ontology#hasModificationDate">hasModificationDate</a> | Inverse of 'is modification date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasOrHadAgentName" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAgentName"></a> Property: has or had agent name <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAgentName)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAgentName" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAgentName">hasOrHadAgentName</a> | Connects an Agent and (one of) its present or past Agent Name. | <a href="#AgentName" title="https://www.ica.org/standards/RiC/ontology#AgentName">Agent Name</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="hasOrHadAllMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithAccumulationDate"></a> Property: has or had all members with accumulation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithAccumulationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAllMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithAccumulationDate">hasOrHadAllMembersWithAccumulationDate</a> | Inverse of 'is or was accumulation date of all members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadAllMembersWithContentType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithContentType"></a> Property: has or had all members with content type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithContentType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAllMembersWithContentType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithContentType">hasOrHadAllMembersWithContentType</a> | Connects a Record Set and a Content Type that categorizes all the Records or Record Parts that are or were included in the Record Set. | <a href="#ContentType" title="https://www.ica.org/standards/RiC/ontology#ContentType">Content Type</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadAllMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithCreationDate"></a> Property: has or had all members with creation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithCreationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAllMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithCreationDate">hasOrHadAllMembersWithCreationDate</a> | Inverse of 'is or was creation date of all members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadAllMembersWithDocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithDocumentaryFormType"></a> Property: has or had all members with documentary form type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithDocumentaryFormType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAllMembersWithDocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithDocumentaryFormType">hasOrHadAllMembersWithDocumentaryFormType</a> | Connects a Record Set and a Documentary Form Type that categorizes all the Records or Record Parts that are or were included in the Record Set. | <a href="#DocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#DocumentaryFormType">Documentary Form Type</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadAllMembersWithLanguage" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithLanguage"></a> Property: has or had all members with language <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithLanguage)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAllMembersWithLanguage" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithLanguage">hasOrHadAllMembersWithLanguage</a> | Connects a Record Set and a Language used by all the Records or Record Parts that are or were included in the Record Set. | <a href="#Language" title="https://www.ica.org/standards/RiC/ontology#Language">Language</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadAllMembersWithLegalStatus" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithLegalStatus"></a> Property: has or had all members with legal status <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithLegalStatus)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAllMembersWithLegalStatus" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithLegalStatus">hasOrHadAllMembersWithLegalStatus</a> | Connects a Record Set and a Legal Status that categorizes all the Records or Record Parts that are or were included in the Record Set. | <a href="#LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus">Legal Status</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadAllMembersWithMainSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithMainSubject"></a> Property: has or had all members with main subject <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithMainSubject)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAllMembersWithMainSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithMainSubject">hasOrHadAllMembersWithMainSubject</a> | Connects a Record Set and a Thing that is the main subject of all the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadAllMembersWithRecordState" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithRecordState"></a> Property: has or had all members with record state <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithRecordState)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAllMembersWithRecordState" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithRecordState">hasOrHadAllMembersWithRecordState</a> | Connects a Record Set and a Record State that categorizes all the Records or Record Parts that are or were included in the Record Set. | <a href="#RecordState" title="https://www.ica.org/standards/RiC/ontology#RecordState">Record State</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadAllMembersWithSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithSubject"></a> Property: has or had all members with subject <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithSubject)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAllMembersWithSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithSubject">hasOrHadAllMembersWithSubject</a> | Connects a Record Set and a Thing that is the subject of all the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadAllMembersWithType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithType"></a> Property: has or had all members with type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAllMembersWithType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAllMembersWithType">hasOrHadAllMembersWithType</a> | Connects a Record Set and a Type to which all the Records or Record Parts that are or were included in the Record Set belong. | <a href="#Type" title="https://www.ica.org/standards/RiC/ontology#Type">Type</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadAnalogueInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAnalogueInstantiation"></a> Property: has or had analogue instantiation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAnalogueInstantiation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAnalogueInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAnalogueInstantiation">hasOrHadAnalogueInstantiation</a> | Connects a record resource to one of its analogue instantiations, whether it exists or has been lost or destroyed. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasOrHadAppellation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAppellation"></a> Property: has or had appellation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAppellation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAppellation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAppellation">hasOrHadAppellation</a> | Connects a Thing to an Appellation that is or was used for designating it. | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasOrHadAuthorityOver" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAuthorityOver"></a> Property: has or had authority over <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadAuthorityOver)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadAuthorityOver" title="https://www.ica.org/standards/RiC/ontology#hasOrHadAuthorityOver">hasOrHadAuthorityOver</a> | Connects an Agent to a Thing over which the Agent has or had some kind of authority. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="hasOrHadComponent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadComponent"></a> Property: has or had component <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadComponent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadComponent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadComponent">hasOrHadComponent</a> | Connects an Instantiation to one of its present or past component instantiations. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="hasOrHadConstituent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadConstituent"></a> Property: has or had constituent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadConstituent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadConstituent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadConstituent">hasOrHadConstituent</a> | Connects a Record or Record Part to a Record or Record part that is or was a constituent of that Record or Record Part. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasOrHadController" title="https://www.ica.org/standards/RiC/ontology#hasOrHadController"></a> Property: has or had controller <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadController)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadController" title="https://www.ica.org/standards/RiC/ontology#hasOrHadController">hasOrHadController</a> | Inverse of 'is or was controller of' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="hasOrHadCoordinates" title="https://www.ica.org/standards/RiC/ontology#hasOrHadCoordinates"></a> Property: has or had coordinates <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadCoordinates)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadCoordinates" title="https://www.ica.org/standards/RiC/ontology#hasOrHadCoordinates">hasOrHadCoordinates</a> | Connects a Physical Location to its past or present coordinates in a reference system. | <a href="#Coordinates" title="https://www.ica.org/standards/RiC/ontology#Coordinates">Coordinates</a> | <a href="#PhysicalLocation" title="https://www.ica.org/standards/RiC/ontology#PhysicalLocation">Physical Location</a> |
### <a id="hasOrHadCorporateBodyType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadCorporateBodyType"></a> Property: has or had corporate body type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadCorporateBodyType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadCorporateBodyType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadCorporateBodyType">hasOrHadCorporateBodyType</a> | Connects a Corporate Body to a Corporate Body Type which categorizes or categorized it. | <a href="#CorporateBodyType" title="https://www.ica.org/standards/RiC/ontology#CorporateBodyType">Corporate Body Type</a> | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> |
### <a id="hasOrHadCorrespondent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadCorrespondent"></a> Property: has or had correspondent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadCorrespondent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadCorrespondent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadCorrespondent">hasOrHadCorrespondent</a> | Connects two Persons that correspond or have corresponded with each other. This relation is symmetric. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasOrHadDemographicGroup" title="https://www.ica.org/standards/RiC/ontology#hasOrHadDemographicGroup"></a> Property: has or had demographic group <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadDemographicGroup)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadDemographicGroup" title="https://www.ica.org/standards/RiC/ontology#hasOrHadDemographicGroup">hasOrHadDemographicGroup</a> | Connects a Person or a Group to a Demographic Group to which it belongs or belonged. | <a href="#DemographicGroup" title="https://www.ica.org/standards/RiC/ontology#DemographicGroup">Demographic Group</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasOrHadDerivedInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadDerivedInstantiation"></a> Property: has or had derived instantiation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadDerivedInstantiation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadDerivedInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadDerivedInstantiation">hasOrHadDerivedInstantiation</a> | Connects an instantiation to an instantiation that is derived from it, whether it exists or has been lost or destroyed. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="hasOrHadDigitalInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadDigitalInstantiation"></a> Property: has or had digital instantiation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadDigitalInstantiation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadDigitalInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadDigitalInstantiation">hasOrHadDigitalInstantiation</a> | Connects a record resource to one of its digital instantiations, whether it exists or has been lost or destroyed. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasOrHadEmployer" title="https://www.ica.org/standards/RiC/ontology#hasOrHadEmployer"></a> Property: has or had employer <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadEmployer)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadEmployer" title="https://www.ica.org/standards/RiC/ontology#hasOrHadEmployer">hasOrHadEmployer</a> | Inverse of 'is or was employer of' object property. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasOrHadHolder" title="https://www.ica.org/standards/RiC/ontology#hasOrHadHolder"></a> Property: has or had holder <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadHolder)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadHolder" title="https://www.ica.org/standards/RiC/ontology#hasOrHadHolder">hasOrHadHolder</a> | Inverse of 'is or was holder of' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasOrHadIdentifier" title="https://www.ica.org/standards/RiC/ontology#hasOrHadIdentifier"></a> Property: has or had identifier <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadIdentifier)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadIdentifier" title="https://www.ica.org/standards/RiC/ontology#hasOrHadIdentifier">hasOrHadIdentifier</a> | Connects a Thing to one of its past or present Identifiers. | <a href="#Identifier" title="https://www.ica.org/standards/RiC/ontology#Identifier">Identifier</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasOrHadInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadInstantiation"></a> Property: has or had instantiation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadInstantiation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadInstantiation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadInstantiation">hasOrHadInstantiation</a> | Connects a Record Resource to an Instantiation, which either may exist or may have been lost or destroyed. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasOrHadIntellectualPropertyRightsHolder" title="https://www.ica.org/standards/RiC/ontology#hasOrHadIntellectualPropertyRightsHolder"></a> Property: has or had intellectual property rights holder <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadIntellectualPropertyRightsHolder)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadIntellectualPropertyRightsHolder" title="https://www.ica.org/standards/RiC/ontology#hasOrHadIntellectualPropertyRightsHolder">hasOrHadIntellectualPropertyRightsHolder</a> | Inverse of 'is or was holder of intellectual property rights of' object property. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a>, <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasOrHadJurisdiction" title="https://www.ica.org/standards/RiC/ontology#hasOrHadJurisdiction"></a> Property: has or had jurisdiction <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadJurisdiction)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadJurisdiction" title="https://www.ica.org/standards/RiC/ontology#hasOrHadJurisdiction">hasOrHadJurisdiction</a> | Inverse of 'is or was jurisdiction of' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="hasOrHadLanguage" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLanguage"></a> Property: has or had language <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadLanguage)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadLanguage" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLanguage">hasOrHadLanguage</a> | Connects an Agent, Record or Record Part to a Language that uses or used it. | <a href="#Language" title="https://www.ica.org/standards/RiC/ontology#Language">Language</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a>, <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasOrHadLeader" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLeader"></a> Property: has or had leader <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadLeader)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadLeader" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLeader">hasOrHadLeader</a> | Inverse of 'is or was leader of' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="hasOrHadLegalStatus" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLegalStatus"></a> Property: has or had legal status <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadLegalStatus)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadLegalStatus" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLegalStatus">hasOrHadLegalStatus</a> | Connects an Agent or Record Resource to a Legal Status which categorized or categorizes it. | <a href="#LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus">Legal Status</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a>, <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasOrHadLocation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLocation"></a> Property: has or had location <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadLocation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadLocation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadLocation">hasOrHadLocation</a> | Inverse of 'is or was location of' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasOrHadMainSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMainSubject"></a> Property: has or had main subject <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadMainSubject)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadMainSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMainSubject">hasOrHadMainSubject</a> | Connects a Record Resource to a Thing that is or was its main subject. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasOrHadManager" title="https://www.ica.org/standards/RiC/ontology#hasOrHadManager"></a> Property: has or had manager <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadManager)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadManager" title="https://www.ica.org/standards/RiC/ontology#hasOrHadManager">hasOrHadManager</a> | Inverse of 'is or was manager of' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasOrHadMandateType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMandateType"></a> Property: has or had mandate type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadMandateType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadMandateType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMandateType">hasOrHadMandateType</a> | Connects a Mandate to a Mandate Type that categorized or categorizes it. | <a href="#MandateType" title="https://www.ica.org/standards/RiC/ontology#MandateType">Mandate Type</a> | <a href="#Mandate" title="https://www.ica.org/standards/RiC/ontology#Mandate">Mandate</a> |
### <a id="hasOrHadMember" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMember"></a> Property: has or had member <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadMember)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadMember" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMember">hasOrHadMember</a> | Connects a Group to a Person that is or was a member of that Group. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="hasOrHadMostMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMostMembersWithAccumulationDate"></a> Property: has or had most members with accumulation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadMostMembersWithAccumulationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadMostMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMostMembersWithAccumulationDate">hasOrHadMostMembersWithAccumulationDate</a> | Inverse of 'is or was accumulation date of most members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadMostMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMostMembersWithCreationDate"></a> Property: has or had most members with creation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadMostMembersWithCreationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadMostMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadMostMembersWithCreationDate">hasOrHadMostMembersWithCreationDate</a> | Inverse of 'is or was creation date of most members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadName" title="https://www.ica.org/standards/RiC/ontology#hasOrHadName"></a> Property: has or had name <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadName)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadName" title="https://www.ica.org/standards/RiC/ontology#hasOrHadName">hasOrHadName</a> | Connects a Thing to one of its past or present Names. | <a href="#Name" title="https://www.ica.org/standards/RiC/ontology#Name">Name</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasOrHadOccupationOfType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadOccupationOfType"></a> Property: has or had occupation of type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadOccupationOfType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadOccupationOfType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadOccupationOfType">hasOrHadOccupationOfType</a> | Connects a Person to an Occupation Type that categorized or categorizes his/her occupation (profession, trade or craft). | <a href="#OccupationType" title="https://www.ica.org/standards/RiC/ontology#OccupationType">Occupation Type</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasOrHadOwner" title="https://www.ica.org/standards/RiC/ontology#hasOrHadOwner"></a> Property: has or had owner <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadOwner)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadOwner" title="https://www.ica.org/standards/RiC/ontology#hasOrHadOwner">hasOrHadOwner</a> | Inverse of 'is or was owner of' object property. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a>, <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasOrHadPart" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPart"></a> Property: has or had part <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadPart)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadPart" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPart">hasOrHadPart</a> | Connects a Thing to a constitutive or component part of that Thing. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasOrHadParticipant" title="https://www.ica.org/standards/RiC/ontology#hasOrHadParticipant"></a> Property: has or had participant <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadParticipant)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadParticipant" title="https://www.ica.org/standards/RiC/ontology#hasOrHadParticipant">hasOrHadParticipant</a> | Connects an Event to a Thing that is or was actively or passively involved in it. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="hasOrHadPhysicalLocation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPhysicalLocation"></a> Property: has or had physical location <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadPhysicalLocation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadPhysicalLocation" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPhysicalLocation">hasOrHadPhysicalLocation</a> | Connects a Place to one of its past or present Physical Location. | <a href="#PhysicalLocation" title="https://www.ica.org/standards/RiC/ontology#PhysicalLocation">Physical Location</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="hasOrHadPlaceName" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPlaceName"></a> Property: has or had place name <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadPlaceName)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadPlaceName" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPlaceName">hasOrHadPlaceName</a> | Connects a Place to one of its past or present names. | <a href="#PlaceName" title="https://www.ica.org/standards/RiC/ontology#PlaceName">Place Name</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="hasOrHadPlaceType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPlaceType"></a> Property: has or had place type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadPlaceType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadPlaceType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPlaceType">hasOrHadPlaceType</a> | Connects a Place to a Place Type that categorized or categorizes it. | <a href="#PlaceType" title="https://www.ica.org/standards/RiC/ontology#PlaceType">Place Type</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="hasOrHadPosition" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPosition"></a> Property: has or had position <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadPosition)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadPosition" title="https://www.ica.org/standards/RiC/ontology#hasOrHadPosition">hasOrHadPosition</a> | Inverse of 'exists or existed in' object property. | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="hasOrHadRuleType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadRuleType"></a> Property: has or had rule type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadRuleType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadRuleType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadRuleType">hasOrHadRuleType</a> | Connects a Rule to a Rule Type that categorized or categorizes it. | <a href="#RuleType" title="https://www.ica.org/standards/RiC/ontology#RuleType">Rule Type</a> | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |
### <a id="hasOrHadSomeMembersWhoseContentMainlyRepresents" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWhoseContentMainlyRepresents"></a> Property: has or had some members whose content mainly represents <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWhoseContentMainlyRepresents)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWhoseContentMainlyRepresents" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWhoseContentMainlyRepresents">hasOrHadSomeMembersWhoseContentMainlyRepresents</a> | Connects a Record Set and a Thing that is the main element represented by the content of some of the members of the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSomeMembersWhoseContentRepresents" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWhoseContentRepresents"></a> Property: has or had some members whose content represents <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWhoseContentRepresents)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWhoseContentRepresents" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWhoseContentRepresents">hasOrHadSomeMembersWhoseContentRepresents</a> | Connects a Record Set and a Thing that is represented by the content of some of the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSomeMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithAccumulationDate"></a> Property: has or had some members with accumulation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithAccumulationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithAccumulationDate">hasOrHadSomeMembersWithAccumulationDate</a> | Inverse of 'is or was accumulation date of some members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSomeMembersWithContentType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithContentType"></a> Property: has or had some members with content type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithContentType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWithContentType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithContentType">hasOrHadSomeMembersWithContentType</a> | Connects a Record Set and a Content Type that categorizes some of the Records or Record Parts that are or were included in the Record Set. | <a href="#ContentType" title="https://www.ica.org/standards/RiC/ontology#ContentType">Content Type</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSomeMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithCreationDate"></a> Property: has or had some members with creation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithCreationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithCreationDate">hasOrHadSomeMembersWithCreationDate</a> | Inverse of 'is or was creation date of some members of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSomeMembersWithDocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithDocumentaryFormType"></a> Property: has or had some members with documentary form type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithDocumentaryFormType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWithDocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithDocumentaryFormType">hasOrHadSomeMembersWithDocumentaryFormType</a> | Connects a Record Set and a Documentary Form Type that categorizes some of the Records or Record Parts that are or were included in the Record Set. | <a href="#DocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#DocumentaryFormType">Documentary Form Type</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSomeMembersWithLanguage" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithLanguage"></a> Property: has or had some members with language <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithLanguage)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWithLanguage" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithLanguage">hasOrHadSomeMembersWithLanguage</a> | Connects a Record Set and a Language used by some of the Records or Record Parts that are or were included in the Record Set. | <a href="#Language" title="https://www.ica.org/standards/RiC/ontology#Language">Language</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSomeMembersWithLegalStatus" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithLegalStatus"></a> Property: has or had some members with legal status <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithLegalStatus)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWithLegalStatus" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithLegalStatus">hasOrHadSomeMembersWithLegalStatus</a> | Connects a Record Set and a Legal Status that categorizes some of the Records or Record Parts that are or were included in the Record Set. | <a href="#LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus">Legal Status</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSomeMembersWithMainSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithMainSubject"></a> Property: has or had some members with main subject <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithMainSubject)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWithMainSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithMainSubject">hasOrHadSomeMembersWithMainSubject</a> | Connects a Record Set and a Thing that is the main subject of some of the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSomeMembersWithRecordState" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithRecordState"></a> Property: has or had some members with record state <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithRecordState)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWithRecordState" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithRecordState">hasOrHadSomeMembersWithRecordState</a> | Connects a Record Set and a Record State that categorizes some of the Records or Record Parts that are or were included in the Record Set. | <a href="#RecordState" title="https://www.ica.org/standards/RiC/ontology#RecordState">Record State</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSomeMembersWithSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithSubject"></a> Property: has or had some members with subject <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithSubject)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWithSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithSubject">hasOrHadSomeMembersWithSubject</a> | Connects a Record Set and a Thing that is the subject of some of the Records or Record Parts that are or were included in the Record Set. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSomeMembersWithType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithType"></a> Property: has or had some members with type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSomeMembersWithType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSomeMembersWithType">hasOrHadSomeMembersWithType</a> | Connects a Record Set and a Type to which some of the Records or Record Parts that are or were included in the Record Set belong. | <a href="#Type" title="https://www.ica.org/standards/RiC/ontology#Type">Type</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasOrHadSpouse" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSpouse"></a> Property: has or had spouse <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSpouse)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSpouse" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSpouse">hasOrHadSpouse</a> | Connects two Persons who are or were married. This relation is symmetric. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasOrHadStudent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadStudent"></a> Property: has or had student <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadStudent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadStudent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadStudent">hasOrHadStudent</a> | Inverse of 'has or had teacher' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasOrHadSubdivision" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubdivision"></a> Property: has or had subdivision <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSubdivision)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSubdivision" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubdivision">hasOrHadSubdivision</a> | Connects a Group to one of its present or past subdivisions. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="hasOrHadSubevent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubevent"></a> Property: has or had subevent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSubevent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSubevent" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubevent">hasOrHadSubevent</a> | Connects an Event to one of a series of Events that constitute the original, broader, past or ongoing Event. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="hasOrHadSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubject"></a> Property: has or had subject <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSubject)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSubject" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubject">hasOrHadSubject</a> | Connects a Record Resource to a Thing that is or was its subject. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasOrHadSubordinate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubordinate"></a> Property: has or had subordinate <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadSubordinate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadSubordinate" title="https://www.ica.org/standards/RiC/ontology#hasOrHadSubordinate">hasOrHadSubordinate</a> | Connects an Agent to an Agent that is hierarchically inferior. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="hasOrHadTeacher" title="https://www.ica.org/standards/RiC/ontology#hasOrHadTeacher"></a> Property: has or had teacher <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadTeacher)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadTeacher" title="https://www.ica.org/standards/RiC/ontology#hasOrHadTeacher">hasOrHadTeacher</a> | Connects a Person to another Person who is or was their teacher. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasOrHadTitle" title="https://www.ica.org/standards/RiC/ontology#hasOrHadTitle"></a> Property: has or had title <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadTitle)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadTitle" title="https://www.ica.org/standards/RiC/ontology#hasOrHadTitle">hasOrHadTitle</a> | Connects a Record Resource, Instantiation or Rule to a title that is or was used for designating it. | <a href="#Title" title="https://www.ica.org/standards/RiC/ontology#Title">Title</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a>, <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |
### <a id="hasOrHadType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadType"></a> Property: has or had type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadType" title="https://www.ica.org/standards/RiC/ontology#hasOrHadType">hasOrHadType</a> | Connects a Thing to a Type that categorizes or categorized it. | <a href="#Type" title="https://www.ica.org/standards/RiC/ontology#Type">Type</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasOrHadWorkRelationWith" title="https://www.ica.org/standards/RiC/ontology#hasOrHadWorkRelationWith"></a> Property: has or had work relation with <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrHadWorkRelationWith)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrHadWorkRelationWith" title="https://www.ica.org/standards/RiC/ontology#hasOrHadWorkRelationWith">hasOrHadWorkRelationWith</a> | Connects two Agents that have or had some type of work relation in the course of their activities. This relation is symmetric. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="hasOrganicOrFunctionalProvenance" title="https://www.ica.org/standards/RiC/ontology#hasOrganicOrFunctionalProvenance"></a> Property: has organic or functional provenance <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrganicOrFunctionalProvenance)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrganicOrFunctionalProvenance" title="https://www.ica.org/standards/RiC/ontology#hasOrganicOrFunctionalProvenance">hasOrganicOrFunctionalProvenance</a> | Connects a Record Resource or an Instantiation to an Agent that creates or accumulates it, receives it, or sends it, or to an Activity that generates it. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a>, <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasOrganicProvenance" title="https://www.ica.org/standards/RiC/ontology#hasOrganicProvenance"></a> Property: has organic provenance <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrganicProvenance)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrganicProvenance" title="https://www.ica.org/standards/RiC/ontology#hasOrganicProvenance">hasOrganicProvenance</a> | Connects a Record Resource or an Instantiation to an Agent that creates or accumulates the Record Resource, receives it, or sends it. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasOrganicProvenanceDate" title="https://www.ica.org/standards/RiC/ontology#hasOrganicProvenanceDate"></a> Property: has organic provenance date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOrganicProvenanceDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOrganicProvenanceDate" title="https://www.ica.org/standards/RiC/ontology#hasOrganicProvenanceDate">hasOrganicProvenanceDate</a> | Inverse of 'is date associated with organic provenance of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasOriginal" title="https://www.ica.org/standards/RiC/ontology#hasOriginal"></a> Property: has original <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasOriginal)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasOriginal" title="https://www.ica.org/standards/RiC/ontology#hasOriginal">hasOriginal</a> | Inverse of 'is original of' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasPartTransitive" title="https://www.ica.org/standards/RiC/ontology#hasPartTransitive"></a> Property: has part transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasPartTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasPartTransitive" title="https://www.ica.org/standards/RiC/ontology#hasPartTransitive">hasPartTransitive</a> | Connects a Thing to a Thing that is, directly or indirectly, a constitutive or component part of that Thing. This is a transitive relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="hasProductionTechniqueType" title="https://www.ica.org/standards/RiC/ontology#hasProductionTechniqueType"></a> Property: has production technique type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasProductionTechniqueType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasProductionTechniqueType" title="https://www.ica.org/standards/RiC/ontology#hasProductionTechniqueType">hasProductionTechniqueType</a> | Connects an Instantiation to a Production Technique Type that categorizes its production technique. | <a href="#ProductionTechniqueType" title="https://www.ica.org/standards/RiC/ontology#ProductionTechniqueType">Production Technique Type</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="hasProxy" title="https://www.ica.org/standards/RiC/ontology#hasProxy"></a> Property: has proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasProxy" title="https://www.ica.org/standards/RiC/ontology#hasProxy">hasProxy</a> | Inverse of 'proxy for' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasPublicationDate" title="https://www.ica.org/standards/RiC/ontology#hasPublicationDate"></a> Property: has publication date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasPublicationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasPublicationDate" title="https://www.ica.org/standards/RiC/ontology#hasPublicationDate">hasPublicationDate</a> | Inverse of 'is publication date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasPublisher" title="https://www.ica.org/standards/RiC/ontology#hasPublisher"></a> Property: has publisher <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasPublisher)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasPublisher" title="https://www.ica.org/standards/RiC/ontology#hasPublisher">hasPublisher</a> | Connects a Record resource to an Agent who published it. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasReceiver" title="https://www.ica.org/standards/RiC/ontology#hasReceiver"></a> Property: has receiver <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasReceiver)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasReceiver" title="https://www.ica.org/standards/RiC/ontology#hasReceiver">hasReceiver</a> | Connects a Record Resource or an Instantiation to the Agent that receives it in the course of the Agent's activities. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasRecordSetType" title="https://www.ica.org/standards/RiC/ontology#hasRecordSetType"></a> Property: has record set type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasRecordSetType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasRecordSetType" title="https://www.ica.org/standards/RiC/ontology#hasRecordSetType">hasRecordSetType</a> | Connects a Record Set to a Record Set Type that categorizes it. | <a href="#RecordSetType" title="https://www.ica.org/standards/RiC/ontology#RecordSetType">Record Set Type</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="hasRecordState" title="https://www.ica.org/standards/RiC/ontology#hasRecordState"></a> Property: has record state <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasRecordState)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasRecordState" title="https://www.ica.org/standards/RiC/ontology#hasRecordState">hasRecordState</a> | Connects a Record or Record Part to a Record State that categorizes its state. | <a href="#RecordState" title="https://www.ica.org/standards/RiC/ontology#RecordState">Record State</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="hasReply" title="https://www.ica.org/standards/RiC/ontology#hasReply"></a> Property: has reply <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasReply)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasReply" title="https://www.ica.org/standards/RiC/ontology#hasReply">hasReply</a> | Connects a Record Resource to a reply, usually in the form of correspondence. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasRepresentationType" title="https://www.ica.org/standards/RiC/ontology#hasRepresentationType"></a> Property: has representation type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasRepresentationType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasRepresentationType" title="https://www.ica.org/standards/RiC/ontology#hasRepresentationType">hasRepresentationType</a> | Connects an Instantiation to a Representation Type that categorizes its representation type. | <a href="#RepresentationType" title="https://www.ica.org/standards/RiC/ontology#RepresentationType">Representation Type</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="hasSender" title="https://www.ica.org/standards/RiC/ontology#hasSender"></a> Property: has sender <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasSender)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasSender" title="https://www.ica.org/standards/RiC/ontology#hasSender">hasSender</a> | Connects a Record Resource or an Instantiation to the Agent that sends it | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="hasSibling" title="https://www.ica.org/standards/RiC/ontology#hasSibling"></a> Property: has sibling <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasSibling)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasSibling" title="https://www.ica.org/standards/RiC/ontology#hasSibling">hasSibling</a> | Connects two Persons who are siblings. This relation is symmetric. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="hasSubdivisionTransitive" title="https://www.ica.org/standards/RiC/ontology#hasSubdivisionTransitive"></a> Property: has subdivision transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasSubdivisionTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasSubdivisionTransitive" title="https://www.ica.org/standards/RiC/ontology#hasSubdivisionTransitive">hasSubdivisionTransitive</a> | Connects a Group to another Group that is one of its direct or indirect subdivisions. This is a transitive relation. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="hasSubeventTransitive" title="https://www.ica.org/standards/RiC/ontology#hasSubeventTransitive"></a> Property: has subevent transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasSubeventTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasSubeventTransitive" title="https://www.ica.org/standards/RiC/ontology#hasSubeventTransitive">hasSubeventTransitive</a> | Connects an ongoing Event to one of a series of Events that directly or indirectly constitute that broader, ongoing Event. This is a transitive relation. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="hasSubordinateTransitive" title="https://www.ica.org/standards/RiC/ontology#hasSubordinateTransitive"></a> Property: has subordinate transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasSubordinateTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasSubordinateTransitive" title="https://www.ica.org/standards/RiC/ontology#hasSubordinateTransitive">hasSubordinateTransitive</a> | Connects an Agent to an Agent that is directly or indirectly hierarchically inferior. This is a transitive relation. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="hasSuccessor" title="https://www.ica.org/standards/RiC/ontology#hasSuccessor"></a> Property: has successor <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasSuccessor)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasSuccessor" title="https://www.ica.org/standards/RiC/ontology#hasSuccessor">hasSuccessor</a> | Connects an Agent to another Agent that succeeds it chronologically. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="accumulationRelation_role" title="https://www.ica.org/standards/RiC/ontology#accumulationRelation_role"></a> Property: has the role of the Accumulation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#accumulationRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#accumulationRelation_role" title="https://www.ica.org/standards/RiC/ontology#accumulationRelation_role">accumulationRelation_role</a> | Connects an AccumulationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AccumulationRelation" title="https://www.ica.org/standards/RiC/ontology#AccumulationRelation">Accumulation Relation</a> | <a href="#AccumulationRelation" title="https://www.ica.org/standards/RiC/ontology#AccumulationRelation">Accumulation Relation</a> |
### <a id="activityDocumentationRelation_role" title="https://www.ica.org/standards/RiC/ontology#activityDocumentationRelation_role"></a> Property: has the role of the Activity Documentation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#activityDocumentationRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#activityDocumentationRelation_role" title="https://www.ica.org/standards/RiC/ontology#activityDocumentationRelation_role">activityDocumentationRelation_role</a> | Connects an ActivityDocumentationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#ActivityDocumentationRelation" title="https://www.ica.org/standards/RiC/ontology#ActivityDocumentationRelation">Activity Documentation Relation</a> | <a href="#ActivityDocumentationRelation" title="https://www.ica.org/standards/RiC/ontology#ActivityDocumentationRelation">Activity Documentation Relation</a> |
### <a id="agentControlRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentControlRelation_role"></a> Property: has the role of the Agent Control Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#agentControlRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#agentControlRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentControlRelation_role">agentControlRelation_role</a> | Connects an AgentControlRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AgentControlRelation" title="https://www.ica.org/standards/RiC/ontology#AgentControlRelation">Agent Control Relation</a> | <a href="#AgentControlRelation" title="https://www.ica.org/standards/RiC/ontology#AgentControlRelation">Agent Control Relation</a> |
### <a id="agentHierarchicalRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentHierarchicalRelation_role"></a> Property: has the role of the Agent Hierarchical Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#agentHierarchicalRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#agentHierarchicalRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentHierarchicalRelation_role">agentHierarchicalRelation_role</a> | Connects an AgentHierarchicalRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AgentHierarchicalRelation" title="https://www.ica.org/standards/RiC/ontology#AgentHierarchicalRelation">Agent Hierarchical Relation</a> | <a href="#AgentHierarchicalRelation" title="https://www.ica.org/standards/RiC/ontology#AgentHierarchicalRelation">Agent Hierarchical Relation</a> |
### <a id="agentToAgentRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentToAgentRelation_role"></a> Property: has the role of the Agent Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#agentToAgentRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#agentToAgentRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentToAgentRelation_role">agentToAgentRelation_role</a> | Connects an AgentToAgentRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AgentToAgentRelation" title="https://www.ica.org/standards/RiC/ontology#AgentToAgentRelation">Agent Relation</a> | <a href="#AgentToAgentRelation" title="https://www.ica.org/standards/RiC/ontology#AgentToAgentRelation">Agent Relation</a> |
### <a id="agentTemporalRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentTemporalRelation_role"></a> Property: has the role of the Agent Temporal Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#agentTemporalRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#agentTemporalRelation_role" title="https://www.ica.org/standards/RiC/ontology#agentTemporalRelation_role">agentTemporalRelation_role</a> | Connects an AgentTemporalRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AgentTemporalRelation" title="https://www.ica.org/standards/RiC/ontology#AgentTemporalRelation">Agent Temporal Relation</a> | <a href="#AgentTemporalRelation" title="https://www.ica.org/standards/RiC/ontology#AgentTemporalRelation">Agent Temporal Relation</a> |
### <a id="appellationRelation_role" title="https://www.ica.org/standards/RiC/ontology#appellationRelation_role"></a> Property: has the role of the Appellation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#appellationRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#appellationRelation_role" title="https://www.ica.org/standards/RiC/ontology#appellationRelation_role">appellationRelation_role</a> | Connects an AppellationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AppellationRelation" title="https://www.ica.org/standards/RiC/ontology#AppellationRelation">Appellation Relation</a> | <a href="#AppellationRelation" title="https://www.ica.org/standards/RiC/ontology#AppellationRelation">Appellation Relation</a> |
### <a id="authorityRelation_role" title="https://www.ica.org/standards/RiC/ontology#authorityRelation_role"></a> Property: has the role of the Authority Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#authorityRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#authorityRelation_role" title="https://www.ica.org/standards/RiC/ontology#authorityRelation_role">authorityRelation_role</a> | Connects an AuthorityRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AuthorityRelation" title="https://www.ica.org/standards/RiC/ontology#AuthorityRelation">Authority Relation</a> | <a href="#AuthorityRelation" title="https://www.ica.org/standards/RiC/ontology#AuthorityRelation">Authority Relation</a> |
### <a id="authorshipRelation_role" title="https://www.ica.org/standards/RiC/ontology#authorshipRelation_role"></a> Property: has the role of the Authorship Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#authorshipRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#authorshipRelation_role" title="https://www.ica.org/standards/RiC/ontology#authorshipRelation_role">authorshipRelation_role</a> | Connects an AuthorshipRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#AuthorshipRelation" title="https://www.ica.org/standards/RiC/ontology#AuthorshipRelation">Authorship Relation</a> | <a href="#AuthorshipRelation" title="https://www.ica.org/standards/RiC/ontology#AuthorshipRelation">Authorship Relation</a> |
### <a id="childRelation_role" title="https://www.ica.org/standards/RiC/ontology#childRelation_role"></a> Property: has the role of the Child Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#childRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#childRelation_role" title="https://www.ica.org/standards/RiC/ontology#childRelation_role">childRelation_role</a> | Connects a ChildRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#ChildRelation" title="https://www.ica.org/standards/RiC/ontology#ChildRelation">Child Relation</a> | <a href="#ChildRelation" title="https://www.ica.org/standards/RiC/ontology#ChildRelation">Child Relation</a> |
### <a id="correspondenceRelation_role" title="https://www.ica.org/standards/RiC/ontology#correspondenceRelation_role"></a> Property: has the role of the Correspondence Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#correspondenceRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#correspondenceRelation_role" title="https://www.ica.org/standards/RiC/ontology#correspondenceRelation_role">correspondenceRelation_role</a> | Connects a CorrespondenceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#CorrespondenceRelation" title="https://www.ica.org/standards/RiC/ontology#CorrespondenceRelation">Correspondence Relation</a> | <a href="#CorrespondenceRelation" title="https://www.ica.org/standards/RiC/ontology#CorrespondenceRelation">Correspondence Relation</a> |
### <a id="creationRelation_role" title="https://www.ica.org/standards/RiC/ontology#creationRelation_role"></a> Property: has the role of the Creation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#creationRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#creationRelation_role" title="https://www.ica.org/standards/RiC/ontology#creationRelation_role">creationRelation_role</a> | Connects a CreationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#CreationRelation" title="https://www.ica.org/standards/RiC/ontology#CreationRelation">Creation Relation</a> | <a href="#CreationRelation" title="https://www.ica.org/standards/RiC/ontology#CreationRelation">Creation Relation</a> |
### <a id="derivationRelation_role" title="https://www.ica.org/standards/RiC/ontology#derivationRelation_role"></a> Property: has the role of the Derivation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#derivationRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#derivationRelation_role" title="https://www.ica.org/standards/RiC/ontology#derivationRelation_role">derivationRelation_role</a> | Connects a DerivationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#DerivationRelation" title="https://www.ica.org/standards/RiC/ontology#DerivationRelation">Derivation Relation</a> | <a href="#DerivationRelation" title="https://www.ica.org/standards/RiC/ontology#DerivationRelation">Derivation Relation</a> |
### <a id="descendanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#descendanceRelation_role"></a> Property: has the role of the Descendance Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#descendanceRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#descendanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#descendanceRelation_role">descendanceRelation_role</a> | Connects a DescendanceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#DescendanceRelation" title="https://www.ica.org/standards/RiC/ontology#DescendanceRelation">Descendance Relation</a> | <a href="#DescendanceRelation" title="https://www.ica.org/standards/RiC/ontology#DescendanceRelation">Descendance Relation</a> |
### <a id="eventRelation_role" title="https://www.ica.org/standards/RiC/ontology#eventRelation_role"></a> Property: has the role of the Event Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#eventRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#eventRelation_role" title="https://www.ica.org/standards/RiC/ontology#eventRelation_role">eventRelation_role</a> | Connects an EventRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#EventRelation" title="https://www.ica.org/standards/RiC/ontology#EventRelation">Event Relation</a> | <a href="#EventRelation" title="https://www.ica.org/standards/RiC/ontology#EventRelation">Event Relation</a> |
### <a id="familyRelation_role" title="https://www.ica.org/standards/RiC/ontology#familyRelation_role"></a> Property: has the role of the Family Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#familyRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#familyRelation_role" title="https://www.ica.org/standards/RiC/ontology#familyRelation_role">familyRelation_role</a> | Connects a FamilyRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#FamilyRelation" title="https://www.ica.org/standards/RiC/ontology#FamilyRelation">Family Relation</a> | <a href="#FamilyRelation" title="https://www.ica.org/standards/RiC/ontology#FamilyRelation">Family Relation</a> |
### <a id="functionalEquivalenceRelation_role" title="https://www.ica.org/standards/RiC/ontology#functionalEquivalenceRelation_role"></a> Property: has the role of the Functional Equivalence Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#functionalEquivalenceRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#functionalEquivalenceRelation_role" title="https://www.ica.org/standards/RiC/ontology#functionalEquivalenceRelation_role">functionalEquivalenceRelation_role</a> | Connects a FunctionalEquivalenceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#FunctionalEquivalenceRelation" title="https://www.ica.org/standards/RiC/ontology#FunctionalEquivalenceRelation">Functional Equivalence Relation</a> | <a href="#FunctionalEquivalenceRelation" title="https://www.ica.org/standards/RiC/ontology#FunctionalEquivalenceRelation">Functional Equivalence Relation</a> |
### <a id="groupSubdivisionRelation_role" title="https://www.ica.org/standards/RiC/ontology#groupSubdivisionRelation_role"></a> Property: has the role of the Group Subdivision Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#groupSubdivisionRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#groupSubdivisionRelation_role" title="https://www.ica.org/standards/RiC/ontology#groupSubdivisionRelation_role">groupSubdivisionRelation_role</a> | Connects a GroupSubdivisionRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#GroupSubdivisionRelation" title="https://www.ica.org/standards/RiC/ontology#GroupSubdivisionRelation">Group Subdivision Relation</a> | <a href="#GroupSubdivisionRelation" title="https://www.ica.org/standards/RiC/ontology#GroupSubdivisionRelation">Group Subdivision Relation</a> |
### <a id="instantiationToInstantiationRelation_role" title="https://www.ica.org/standards/RiC/ontology#instantiationToInstantiationRelation_role"></a> Property: has the role of the Instantiation to Instantiation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#instantiationToInstantiationRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#instantiationToInstantiationRelation_role" title="https://www.ica.org/standards/RiC/ontology#instantiationToInstantiationRelation_role">instantiationToInstantiationRelation_role</a> | Connects an InstantiationToInstantiationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#InstantiationToInstantiationRelation" title="https://www.ica.org/standards/RiC/ontology#InstantiationToInstantiationRelation">Instantiation to Instantiation Relation</a> | <a href="#InstantiationToInstantiationRelation" title="https://www.ica.org/standards/RiC/ontology#InstantiationToInstantiationRelation">Instantiation to Instantiation Relation</a> |
### <a id="intellectualPropertyRightsRelation_role" title="https://www.ica.org/standards/RiC/ontology#intellectualPropertyRightsRelation_role"></a> Property: has the role of the Intellectual Property Rights Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#intellectualPropertyRightsRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#intellectualPropertyRightsRelation_role" title="https://www.ica.org/standards/RiC/ontology#intellectualPropertyRightsRelation_role">intellectualPropertyRightsRelation_role</a> | Connects an IntellectualPropertyRightsRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#IntellectualPropertyRightsRelation" title="https://www.ica.org/standards/RiC/ontology#IntellectualPropertyRightsRelation">Intellectual Property Rights Relation</a> | <a href="#IntellectualPropertyRightsRelation" title="https://www.ica.org/standards/RiC/ontology#IntellectualPropertyRightsRelation">Intellectual Property Rights Relation</a> |
### <a id="knowingOfRelation_role" title="https://www.ica.org/standards/RiC/ontology#knowingOfRelation_role"></a> Property: has the role of the Knowing Of Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#knowingOfRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#knowingOfRelation_role" title="https://www.ica.org/standards/RiC/ontology#knowingOfRelation_role">knowingOfRelation_role</a> | Connects a KnowingOfRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#KnowingOfRelation" title="https://www.ica.org/standards/RiC/ontology#KnowingOfRelation">Knowing Of Relation</a> | <a href="#KnowingOfRelation" title="https://www.ica.org/standards/RiC/ontology#KnowingOfRelation">Knowing Of Relation</a> |
### <a id="knowingRelation_role" title="https://www.ica.org/standards/RiC/ontology#knowingRelation_role"></a> Property: has the role of the Knowing Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#knowingRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#knowingRelation_role" title="https://www.ica.org/standards/RiC/ontology#knowingRelation_role">knowingRelation_role</a> | Connects a KnowingRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#KnowingRelation" title="https://www.ica.org/standards/RiC/ontology#KnowingRelation">Knowing Relation</a> | <a href="#KnowingRelation" title="https://www.ica.org/standards/RiC/ontology#KnowingRelation">Knowing Relation</a> |
### <a id="leadershipRelation_role" title="https://www.ica.org/standards/RiC/ontology#leadershipRelation_role"></a> Property: has the role of the Leadership Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#leadershipRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#leadershipRelation_role" title="https://www.ica.org/standards/RiC/ontology#leadershipRelation_role">leadershipRelation_role</a> | Connects a LeadershipRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#LeadershipRelation" title="https://www.ica.org/standards/RiC/ontology#LeadershipRelation">Leadership Relation</a> | <a href="#LeadershipRelation" title="https://www.ica.org/standards/RiC/ontology#LeadershipRelation">Leadership Relation</a> |
### <a id="managementRelation_role" title="https://www.ica.org/standards/RiC/ontology#managementRelation_role"></a> Property: has the role of the Management Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#managementRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#managementRelation_role" title="https://www.ica.org/standards/RiC/ontology#managementRelation_role">managementRelation_role</a> | Connects a ManagementRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#ManagementRelation" title="https://www.ica.org/standards/RiC/ontology#ManagementRelation">Management Relation</a> | <a href="#ManagementRelation" title="https://www.ica.org/standards/RiC/ontology#ManagementRelation">Management Relation</a> |
### <a id="mandateRelation_role" title="https://www.ica.org/standards/RiC/ontology#mandateRelation_role"></a> Property: has the role of the Mandate Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#mandateRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#mandateRelation_role" title="https://www.ica.org/standards/RiC/ontology#mandateRelation_role">mandateRelation_role</a> | Connects a MandateRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#MandateRelation" title="https://www.ica.org/standards/RiC/ontology#MandateRelation">Mandate Relation</a> | <a href="#MandateRelation" title="https://www.ica.org/standards/RiC/ontology#MandateRelation">Mandate Relation</a> |
### <a id="membershipRelation_role" title="https://www.ica.org/standards/RiC/ontology#membershipRelation_role"></a> Property: has the role of the Membership Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#membershipRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#membershipRelation_role" title="https://www.ica.org/standards/RiC/ontology#membershipRelation_role">membershipRelation_role</a> | Connects a MembershipRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#MembershipRelation" title="https://www.ica.org/standards/RiC/ontology#MembershipRelation">Membership Relation</a> | <a href="#MembershipRelation" title="https://www.ica.org/standards/RiC/ontology#MembershipRelation">Membership Relation</a> |
### <a id="migrationRelation_role" title="https://www.ica.org/standards/RiC/ontology#migrationRelation_role"></a> Property: has the role of the Migration Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#migrationRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#migrationRelation_role" title="https://www.ica.org/standards/RiC/ontology#migrationRelation_role">migrationRelation_role</a> | Connects a MigrationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#MigrationRelation" title="https://www.ica.org/standards/RiC/ontology#MigrationRelation">Migration Relation</a> | <a href="#MigrationRelation" title="https://www.ica.org/standards/RiC/ontology#MigrationRelation">Migration Relation</a> |
### <a id="organicOrFunctionalProvenanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#organicOrFunctionalProvenanceRelation_role"></a> Property: has the role of the Organic or functional provenance Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#organicOrFunctionalProvenanceRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#organicOrFunctionalProvenanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#organicOrFunctionalProvenanceRelation_role">organicOrFunctionalProvenanceRelation_role</a> | Connects an OrganicOrFunctionalProvenanceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#OrganicOrFunctionalProvenanceRelation" title="https://www.ica.org/standards/RiC/ontology#OrganicOrFunctionalProvenanceRelation">Organic or functional provenance Relation</a> | <a href="#OrganicOrFunctionalProvenanceRelation" title="https://www.ica.org/standards/RiC/ontology#OrganicOrFunctionalProvenanceRelation">Organic or functional provenance Relation</a> |
### <a id="organicProvenanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#organicProvenanceRelation_role"></a> Property: has the role of the Organic Provenance Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#organicProvenanceRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#organicProvenanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#organicProvenanceRelation_role">organicProvenanceRelation_role</a> | Connects an OrganicProvenanceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#OrganicProvenanceRelation" title="https://www.ica.org/standards/RiC/ontology#OrganicProvenanceRelation">Organic Provenance Relation</a> | <a href="#OrganicProvenanceRelation" title="https://www.ica.org/standards/RiC/ontology#OrganicProvenanceRelation">Organic Provenance Relation</a> |
### <a id="ownershipRelation_role" title="https://www.ica.org/standards/RiC/ontology#ownershipRelation_role"></a> Property: has the role of the Ownership Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#ownershipRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#ownershipRelation_role" title="https://www.ica.org/standards/RiC/ontology#ownershipRelation_role">ownershipRelation_role</a> | Connects an OwnershipRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#OwnershipRelation" title="https://www.ica.org/standards/RiC/ontology#OwnershipRelation">Ownership Relation</a> | <a href="#OwnershipRelation" title="https://www.ica.org/standards/RiC/ontology#OwnershipRelation">Ownership Relation</a> |
### <a id="performanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#performanceRelation_role"></a> Property: has the role of the Performance Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#performanceRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#performanceRelation_role" title="https://www.ica.org/standards/RiC/ontology#performanceRelation_role">performanceRelation_role</a> | Connects a PerformanceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#PerformanceRelation" title="https://www.ica.org/standards/RiC/ontology#PerformanceRelation">Performance Relation</a> | <a href="#PerformanceRelation" title="https://www.ica.org/standards/RiC/ontology#PerformanceRelation">Performance Relation</a> |
### <a id="placeRelation_role" title="https://www.ica.org/standards/RiC/ontology#placeRelation_role"></a> Property: has the role of the Place Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#placeRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#placeRelation_role" title="https://www.ica.org/standards/RiC/ontology#placeRelation_role">placeRelation_role</a> | Connects a PlaceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#PlaceRelation" title="https://www.ica.org/standards/RiC/ontology#PlaceRelation">Place Relation</a> | <a href="#PlaceRelation" title="https://www.ica.org/standards/RiC/ontology#PlaceRelation">Place Relation</a> |
### <a id="positionHoldingRelation_role" title="https://www.ica.org/standards/RiC/ontology#positionHoldingRelation_role"></a> Property: has the role of the Position Holding Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#positionHoldingRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#positionHoldingRelation_role" title="https://www.ica.org/standards/RiC/ontology#positionHoldingRelation_role">positionHoldingRelation_role</a> | Connects a PositionHoldingRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#PositionHoldingRelation" title="https://www.ica.org/standards/RiC/ontology#PositionHoldingRelation">Position Holding Relation</a> | <a href="#PositionHoldingRelation" title="https://www.ica.org/standards/RiC/ontology#PositionHoldingRelation">Position Holding Relation</a> |
### <a id="positionToGroupRelation_role" title="https://www.ica.org/standards/RiC/ontology#positionToGroupRelation_role"></a> Property: has the role of the Position to Group Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#positionToGroupRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#positionToGroupRelation_role" title="https://www.ica.org/standards/RiC/ontology#positionToGroupRelation_role">positionToGroupRelation_role</a> | Connects a PositionToGroupRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#PositionToGroupRelation" title="https://www.ica.org/standards/RiC/ontology#PositionToGroupRelation">Position to Group Relation</a> | <a href="#PositionToGroupRelation" title="https://www.ica.org/standards/RiC/ontology#PositionToGroupRelation">Position to Group Relation</a> |
### <a id="recordResourceGeneticRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceGeneticRelation_role"></a> Property: has the role of the Record Resource Genetic Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#recordResourceGeneticRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#recordResourceGeneticRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceGeneticRelation_role">recordResourceGeneticRelation_role</a> | Connects a RecordResourceGeneticRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#RecordResourceGeneticRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceGeneticRelation">Record Resource Genetic Relation</a> | <a href="#RecordResourceGeneticRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceGeneticRelation">Record Resource Genetic Relation</a> |
### <a id="recordResourceHoldingRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceHoldingRelation_role"></a> Property: has the role of the Record Resource Holding Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#recordResourceHoldingRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#recordResourceHoldingRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceHoldingRelation_role">recordResourceHoldingRelation_role</a> | Connects a RecordResourceHoldingRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#RecordResourceHoldingRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceHoldingRelation">Record Resource Holding Relation</a> | <a href="#RecordResourceHoldingRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceHoldingRelation">Record Resource Holding Relation</a> |
### <a id="recordResourceToInstantiationRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceToInstantiationRelation_role"></a> Property: has the role of the Record Resource to Instantiation Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#recordResourceToInstantiationRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#recordResourceToInstantiationRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceToInstantiationRelation_role">recordResourceToInstantiationRelation_role</a> | Connects a RecordResourceToInstantiationRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#RecordResourceToInstantiationRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceToInstantiationRelation">Record Resource to Instantiation Relation</a> | <a href="#RecordResourceToInstantiationRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceToInstantiationRelation">Record Resource to Instantiation Relation</a> |
### <a id="recordResourceToRecordResourceRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceToRecordResourceRelation_role"></a> Property: has the role of the Record Resource to Record Resource Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#recordResourceToRecordResourceRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#recordResourceToRecordResourceRelation_role" title="https://www.ica.org/standards/RiC/ontology#recordResourceToRecordResourceRelation_role">recordResourceToRecordResourceRelation_role</a> | Connects a RecordResourceToRecordResourceRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#RecordResourceToRecordResourceRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceToRecordResourceRelation">Record Resource to Record Resource Relation</a> | <a href="#RecordResourceToRecordResourceRelation" title="https://www.ica.org/standards/RiC/ontology#RecordResourceToRecordResourceRelation">Record Resource to Record Resource Relation</a> |
### <a id="relation_role" title="https://www.ica.org/standards/RiC/ontology#relation_role"></a> Property: has the role of the Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#relation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#relation_role" title="https://www.ica.org/standards/RiC/ontology#relation_role">relation_role</a> | Connects a Relation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |
### <a id="ruleRelation_role" title="https://www.ica.org/standards/RiC/ontology#ruleRelation_role"></a> Property: has the role of the Rule Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#ruleRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#ruleRelation_role" title="https://www.ica.org/standards/RiC/ontology#ruleRelation_role">ruleRelation_role</a> | Connects a RuleRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#RuleRelation" title="https://www.ica.org/standards/RiC/ontology#RuleRelation">Rule Relation</a> | <a href="#RuleRelation" title="https://www.ica.org/standards/RiC/ontology#RuleRelation">Rule Relation</a> |
### <a id="sequentialRelation_role" title="https://www.ica.org/standards/RiC/ontology#sequentialRelation_role"></a> Property: has the role of the Sequential Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#sequentialRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sequentialRelation_role" title="https://www.ica.org/standards/RiC/ontology#sequentialRelation_role">sequentialRelation_role</a> | Connects a SequentialRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#SequentialRelation" title="https://www.ica.org/standards/RiC/ontology#SequentialRelation">Sequential Relation</a> | <a href="#SequentialRelation" title="https://www.ica.org/standards/RiC/ontology#SequentialRelation">Sequential Relation</a> |
### <a id="siblingRelation_role" title="https://www.ica.org/standards/RiC/ontology#siblingRelation_role"></a> Property: has the role of the Sibling Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#siblingRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#siblingRelation_role" title="https://www.ica.org/standards/RiC/ontology#siblingRelation_role">siblingRelation_role</a> | Connects a SiblingRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#SiblingRelation" title="https://www.ica.org/standards/RiC/ontology#SiblingRelation">Sibling Relation</a> | <a href="#SiblingRelation" title="https://www.ica.org/standards/RiC/ontology#SiblingRelation">Sibling Relation</a> |
### <a id="spouseRelation_role" title="https://www.ica.org/standards/RiC/ontology#spouseRelation_role"></a> Property: has the role of the Spouse Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#spouseRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#spouseRelation_role" title="https://www.ica.org/standards/RiC/ontology#spouseRelation_role">spouseRelation_role</a> | Connects a SpouseRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#SpouseRelation" title="https://www.ica.org/standards/RiC/ontology#SpouseRelation">Spouse Relation</a> | <a href="#SpouseRelation" title="https://www.ica.org/standards/RiC/ontology#SpouseRelation">Spouse Relation</a> |
### <a id="studyAtRelation_role" title="https://www.ica.org/standards/RiC/ontology#studyAtRelation_role"></a> Property: has the role of the Study At Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#studyAtRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#studyAtRelation_role" title="https://www.ica.org/standards/RiC/ontology#studyAtRelation_role">studyAtRelation_role</a> | Connects a StudyAtRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#StudyAtRelation" title="https://www.ica.org/standards/RiC/ontology#StudyAtRelation">Study At Relation</a> | <a href="#StudyAtRelation" title="https://www.ica.org/standards/RiC/ontology#StudyAtRelation">Study At Relation</a> |
### <a id="teachingRelation_role" title="https://www.ica.org/standards/RiC/ontology#teachingRelation_role"></a> Property: has the role of the Teaching Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#teachingRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#teachingRelation_role" title="https://www.ica.org/standards/RiC/ontology#teachingRelation_role">teachingRelation_role</a> | Connects a TeachingRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#TeachingRelation" title="https://www.ica.org/standards/RiC/ontology#TeachingRelation">Teaching Relation</a> | <a href="#TeachingRelation" title="https://www.ica.org/standards/RiC/ontology#TeachingRelation">Teaching Relation</a> |
### <a id="temporalRelation_role" title="https://www.ica.org/standards/RiC/ontology#temporalRelation_role"></a> Property: has the role of the Temporal Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#temporalRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#temporalRelation_role" title="https://www.ica.org/standards/RiC/ontology#temporalRelation_role">temporalRelation_role</a> | Connects a TemporalRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#TemporalRelation" title="https://www.ica.org/standards/RiC/ontology#TemporalRelation">Temporal Relation</a> | <a href="#TemporalRelation" title="https://www.ica.org/standards/RiC/ontology#TemporalRelation">Temporal Relation</a> |
### <a id="typeRelation_role" title="https://www.ica.org/standards/RiC/ontology#typeRelation_role"></a> Property: has the role of the Type Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#typeRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#typeRelation_role" title="https://www.ica.org/standards/RiC/ontology#typeRelation_role">typeRelation_role</a> | Connects a TypeRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#TypeRelation" title="https://www.ica.org/standards/RiC/ontology#TypeRelation">Type Relation</a> | <a href="#TypeRelation" title="https://www.ica.org/standards/RiC/ontology#TypeRelation">Type Relation</a> |
### <a id="wholePartRelation_role" title="https://www.ica.org/standards/RiC/ontology#wholePartRelation_role"></a> Property: has the role of the Whole Part Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wholePartRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wholePartRelation_role" title="https://www.ica.org/standards/RiC/ontology#wholePartRelation_role">wholePartRelation_role</a> | Connects a WholePartRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#WholePartRelation" title="https://www.ica.org/standards/RiC/ontology#WholePartRelation">Whole Part Relation</a> | <a href="#WholePartRelation" title="https://www.ica.org/standards/RiC/ontology#WholePartRelation">Whole Part Relation</a> |
### <a id="workRelation_role" title="https://www.ica.org/standards/RiC/ontology#workRelation_role"></a> Property: has the role of the Work Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#workRelation_role)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#workRelation_role" title="https://www.ica.org/standards/RiC/ontology#workRelation_role">workRelation_role</a> | Connects a WorkRelation to itself. It is a property that can stand for an instance of the class when necessary, e.g. when you explore a knowledge graph. | <a href="#WorkRelation" title="https://www.ica.org/standards/RiC/ontology#WorkRelation">Work Relation</a> | <a href="#WorkRelation" title="https://www.ica.org/standards/RiC/ontology#WorkRelation">Work Relation</a> |
### <a id="hasTitleType" title="https://www.ica.org/standards/RiC/ontology#hasTitleType"></a> Property: has title type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasTitleType)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasTitleType" title="https://www.ica.org/standards/RiC/ontology#hasTitleType">hasTitleType</a> | Connects a Title and a Title Type that categorizes it. | <a href="#TitleType" title="https://www.ica.org/standards/RiC/ontology#TitleType">Title Type</a> | <a href="#Title" title="https://www.ica.org/standards/RiC/ontology#Title">Title</a> |
### <a id="hasUnitOfMeasurement" title="https://www.ica.org/standards/RiC/ontology#hasUnitOfMeasurement"></a> Property: has unit of measurement <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasUnitOfMeasurement)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasUnitOfMeasurement" title="https://www.ica.org/standards/RiC/ontology#hasUnitOfMeasurement">hasUnitOfMeasurement</a> | Connects an Extent to a Unit Of Measurement | <a href="#UnitOfMeasurement" title="https://www.ica.org/standards/RiC/ontology#UnitOfMeasurement">Unit Of Measurement</a> | <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> |
### <a id="hasWithin" title="https://www.ica.org/standards/RiC/ontology#hasWithin"></a> Property: has within <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#hasWithin)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#hasWithin" title="https://www.ica.org/standards/RiC/ontology#hasWithin">hasWithin</a> | Inverse of 'is within' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="height" title="https://www.ica.org/standards/RiC/ontology#height"></a> Property: height <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#height)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#height" title="https://www.ica.org/standards/RiC/ontology#height">height</a> | Vertical dimension of an entity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="history" title="https://www.ica.org/standards/RiC/ontology#history"></a> Property: history <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#history)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#history" title="https://www.ica.org/standards/RiC/ontology#history">history</a> | Summary of the development of an entity throughout its existence. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a>, <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a>, <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a>, <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |
### <a id="identifier" title="https://www.ica.org/standards/RiC/ontology#identifier"></a> Property: identifier <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#identifier)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#identifier" title="https://www.ica.org/standards/RiC/ontology#identifier">identifier</a> | A word, number, letter, symbol, or any combination of these used to uniquely identify or reference an individual instance of an entity within a specific information domain. Can include Global Persistent Identifiers (globally unique and persistently resolvable identifier for the entity) and/or Local Identifiers. Both the domain within which the identifier is unique, and the rules used in forming the identifier value should be provided with the identifier value. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="included" title="https://www.ica.org/standards/RiC/ontology#included"></a> Property: included <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#included)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#included" title="https://www.ica.org/standards/RiC/ontology#included">included</a> | Connects a Record Set to a Record or Record Set which it included in the past. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="includesOrIncluded" title="https://www.ica.org/standards/RiC/ontology#includesOrIncluded"></a> Property: includes or included <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#includesOrIncluded)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#includesOrIncluded" title="https://www.ica.org/standards/RiC/ontology#includesOrIncluded">includesOrIncluded</a> | Connects a Record Set to a Record or Record Set it aggregates, or aggregated in the past. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="includesProxy" title="https://www.ica.org/standards/RiC/ontology#includesProxy"></a> Property: includes proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#includesProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#includesProxy" title="https://www.ica.org/standards/RiC/ontology#includesProxy">includesProxy</a> | Inverse of 'proxy is included in' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="includesTransitive" title="https://www.ica.org/standards/RiC/ontology#includesTransitive"></a> Property: includes transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#includesTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#includesTransitive" title="https://www.ica.org/standards/RiC/ontology#includesTransitive">includesTransitive</a> | Connects a Record Set to a Record or Record Set which it includes directly or indirectly. This is a transitive relation. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="instantiationExtent" title="https://www.ica.org/standards/RiC/ontology#instantiationExtent"></a> Property: Instantiation extent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#instantiationExtent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#instantiationExtent" title="https://www.ica.org/standards/RiC/ontology#instantiationExtent">instantiationExtent</a> | Countable characteristics of an Instantiation expressed as a quantity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="instantiationStructure" title="https://www.ica.org/standards/RiC/ontology#instantiationStructure"></a> Property: Instantiation structure <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#instantiationStructure)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#instantiationStructure" title="https://www.ica.org/standards/RiC/ontology#instantiationStructure">instantiationStructure</a> | Information about the physical arrangement and composition of an Instantiation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="integrityNote" title="https://www.ica.org/standards/RiC/ontology#integrityNote"></a> Property: integrity note <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#integrityNote)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#integrityNote" title="https://www.ica.org/standards/RiC/ontology#integrityNote">integrityNote</a> | Information about the known intellectual completeness of a Record Resource. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="intersects" title="https://www.ica.org/standards/RiC/ontology#intersects"></a> Property: intersects <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#intersects)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#intersects" title="https://www.ica.org/standards/RiC/ontology#intersects">intersects</a> | Connects two Dates that overlap. This relation is symmetric. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isAccumulationDateOf" title="https://www.ica.org/standards/RiC/ontology#isAccumulationDateOf"></a> Property: is accumulation date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isAccumulationDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isAccumulationDateOf" title="https://www.ica.org/standards/RiC/ontology#isAccumulationDateOf">isAccumulationDateOf</a> | Connects a Date to a Record Resource or Instantiation that was or will be accumulated at this Date. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isAccumulatorOf" title="https://www.ica.org/standards/RiC/ontology#isAccumulatorOf"></a> Property: is accumulator of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isAccumulatorOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isAccumulatorOf" title="https://www.ica.org/standards/RiC/ontology#isAccumulatorOf">isAccumulatorOf</a> | Inverse of 'has accumulator' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isActivityTypeOf" title="https://www.ica.org/standards/RiC/ontology#isActivityTypeOf"></a> Property: is activity type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isActivityTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isActivityTypeOf" title="https://www.ica.org/standards/RiC/ontology#isActivityTypeOf">isActivityTypeOf</a> | Connects an Activity Type to an Activity that it categorizes. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> | <a href="#ActivityType" title="https://www.ica.org/standards/RiC/ontology#ActivityType">Activity Type</a> |
### <a id="isAddresseeOf" title="https://www.ica.org/standards/RiC/ontology#isAddresseeOf"></a> Property: is addressee of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isAddresseeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isAddresseeOf" title="https://www.ica.org/standards/RiC/ontology#isAddresseeOf">isAddresseeOf</a> | Inverse of 'has addressee' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isAgentAssociatedWithAgent" title="https://www.ica.org/standards/RiC/ontology#isAgentAssociatedWithAgent"></a> Property: is agent associated with agent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isAgentAssociatedWithAgent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isAgentAssociatedWithAgent" title="https://www.ica.org/standards/RiC/ontology#isAgentAssociatedWithAgent">isAgentAssociatedWithAgent</a> | Connects two Agents. This object property is symmetric. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isAgentAssociatedWithPlace" title="https://www.ica.org/standards/RiC/ontology#isAgentAssociatedWithPlace"></a> Property: is agent associated with place <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isAgentAssociatedWithPlace)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isAgentAssociatedWithPlace" title="https://www.ica.org/standards/RiC/ontology#isAgentAssociatedWithPlace">isAgentAssociatedWithPlace</a> | Inverse of 'is place associated with agent' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isAssociatedWithDate" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithDate"></a> Property: is associated with date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isAssociatedWithDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isAssociatedWithDate" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithDate">isAssociatedWithDate</a> | Inverse of 'is date associated with' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isAssociatedWithEvent" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithEvent"></a> Property: is associated with event <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isAssociatedWithEvent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isAssociatedWithEvent" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithEvent">isAssociatedWithEvent</a> | Inverse of 'is event associated with' object property. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isAssociatedWithPlace" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithPlace"></a> Property: is associated with place <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isAssociatedWithPlace)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isAssociatedWithPlace" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithPlace">isAssociatedWithPlace</a> | Inverse of 'is place associated with' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isAssociatedWithRule" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithRule"></a> Property: is associated with rule <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isAssociatedWithRule)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isAssociatedWithRule" title="https://www.ica.org/standards/RiC/ontology#isAssociatedWithRule">isAssociatedWithRule</a> | Inverse of 'is rule associated with' object property. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isAuthorOf" title="https://www.ica.org/standards/RiC/ontology#isAuthorOf"></a> Property: is author of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isAuthorOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isAuthorOf" title="https://www.ica.org/standards/RiC/ontology#isAuthorOf">isAuthorOf</a> | Inverse of 'has author' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a>, <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |
### <a id="isAuthorizingAgentInMandateRelation" title="https://www.ica.org/standards/RiC/ontology#isAuthorizingAgentInMandateRelation"></a> Property: is authorizing agent in mandate relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isAuthorizingAgentInMandateRelation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isAuthorizingAgentInMandateRelation" title="https://www.ica.org/standards/RiC/ontology#isAuthorizingAgentInMandateRelation">isAuthorizingAgentInMandateRelation</a> | Connects an Agent that assigns the Mandate, to a Mandate Relation. | <a href="#MandateRelation" title="https://www.ica.org/standards/RiC/ontology#MandateRelation">Mandate Relation</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isBeginningDateOf" title="https://www.ica.org/standards/RiC/ontology#isBeginningDateOf"></a> Property: is beginning date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isBeginningDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isBeginningDateOf" title="https://www.ica.org/standards/RiC/ontology#isBeginningDateOf">isBeginningDateOf</a> | Connects a Date to a Thing that came into existence on that Date. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isBirthDateOf" title="https://www.ica.org/standards/RiC/ontology#isBirthDateOf"></a> Property: is birth date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isBirthDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isBirthDateOf" title="https://www.ica.org/standards/RiC/ontology#isBirthDateOf">isBirthDateOf</a> | Connects a Date to a Person that was born on that Date. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isBirthPlaceOf" title="https://www.ica.org/standards/RiC/ontology#isBirthPlaceOf"></a> Property: is birth place of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isBirthPlaceOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isBirthPlaceOf" title="https://www.ica.org/standards/RiC/ontology#isBirthPlaceOf">isBirthPlaceOf</a> | Connects a Place to a Person who was born in that Place. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="isCarrierTypeOf" title="https://www.ica.org/standards/RiC/ontology#isCarrierTypeOf"></a> Property: is carrier type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isCarrierTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isCarrierTypeOf" title="https://www.ica.org/standards/RiC/ontology#isCarrierTypeOf">isCarrierTypeOf</a> | Connects a Carrier Type to an Instantiation whose carrier it categorizes. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#CarrierType" title="https://www.ica.org/standards/RiC/ontology#CarrierType">Carrier Type</a> |
### <a id="isChildOf" title="https://www.ica.org/standards/RiC/ontology#isChildOf"></a> Property: is child of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isChildOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isChildOf" title="https://www.ica.org/standards/RiC/ontology#isChildOf">isChildOf</a> | Inverse of 'has child' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="isCollectorOf" title="https://www.ica.org/standards/RiC/ontology#isCollectorOf"></a> Property: is collector of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isCollectorOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isCollectorOf" title="https://www.ica.org/standards/RiC/ontology#isCollectorOf">isCollectorOf</a> | Inverse of 'has collector' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isComponentOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isComponentOfTransitive"></a> Property: is component of transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isComponentOfTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isComponentOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isComponentOfTransitive">isComponentOfTransitive</a> | Connects an Instantiation to another Instantiation of which it is, directly or indirectly, a component. This is a transitive relation. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="isConstituentOfProxy" title="https://www.ica.org/standards/RiC/ontology#isConstituentOfProxy"></a> Property: is constituent of proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isConstituentOfProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isConstituentOfProxy" title="https://www.ica.org/standards/RiC/ontology#isConstituentOfProxy">isConstituentOfProxy</a> | Connects a Record or Record Part to a Proxy of a Record or Record Part of which it is a constituent, directly or indirectly. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="isConstituentOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isConstituentOfTransitive"></a> Property: is constituent of transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isConstituentOfTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isConstituentOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isConstituentOfTransitive">isConstituentOfTransitive</a> | Connects a Record or Record Part to another Record or Record Part of which it is a constituent, directly or indirectly. This is a transitive relation. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="isContainedByTransitive" title="https://www.ica.org/standards/RiC/ontology#isContainedByTransitive"></a> Property: is contained by transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isContainedByTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isContainedByTransitive" title="https://www.ica.org/standards/RiC/ontology#isContainedByTransitive">isContainedByTransitive</a> | Connects a Place to a Place that is, directly or indirectly, contained by it. This is a transitive relation. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="isContentTypeOf" title="https://www.ica.org/standards/RiC/ontology#isContentTypeOf"></a> Property: is content type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isContentTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isContentTypeOf" title="https://www.ica.org/standards/RiC/ontology#isContentTypeOf">isContentTypeOf</a> | Connects a Content Type to a Record or Record Part whose content it categorizes. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#ContentType" title="https://www.ica.org/standards/RiC/ontology#ContentType">Content Type</a> |
### <a id="isCopyOf" title="https://www.ica.org/standards/RiC/ontology#isCopyOf"></a> Property: is copy of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isCopyOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isCopyOf" title="https://www.ica.org/standards/RiC/ontology#isCopyOf">isCopyOf</a> | Inverse of 'has copy' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="isCreationDateOf" title="https://www.ica.org/standards/RiC/ontology#isCreationDateOf"></a> Property: is creation date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isCreationDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isCreationDateOf" title="https://www.ica.org/standards/RiC/ontology#isCreationDateOf">isCreationDateOf</a> | Connects a Date to a Record Resource or Instantiation that was or will be created at this Date. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isCreatorOf" title="https://www.ica.org/standards/RiC/ontology#isCreatorOf"></a> Property: is creator of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isCreatorOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isCreatorOf" title="https://www.ica.org/standards/RiC/ontology#isCreatorOf">isCreatorOf</a> | Inverse of 'has creator' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isDateAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isDateAssociatedWith"></a> Property: is date associated with <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDateAssociatedWith)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDateAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isDateAssociatedWith">isDateAssociatedWith</a> | Connects a Date to a Thing with whose existence and lifecycle the Date is associated. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isDateAssociatedWithRelation" title="https://www.ica.org/standards/RiC/ontology#isDateAssociatedWithRelation"></a> Property: is date associated with Relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDateAssociatedWithRelation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDateAssociatedWithRelation" title="https://www.ica.org/standards/RiC/ontology#isDateAssociatedWithRelation">isDateAssociatedWithRelation</a> | Connects a Date to an n-ary Relation. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isDateOfOccurrenceOf" title="https://www.ica.org/standards/RiC/ontology#isDateOfOccurrenceOf"></a> Property: is date of occurrence of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDateOfOccurrenceOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDateOfOccurrenceOf" title="https://www.ica.org/standards/RiC/ontology#isDateOfOccurrenceOf">isDateOfOccurrenceOf</a> | Connects a Date to an Event that occurred at this Date. An event or activity can be recurrent, which implies that one single event can be related to several dates. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isDateTypeOf" title="https://www.ica.org/standards/RiC/ontology#isDateTypeOf"></a> Property: is date type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDateTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDateTypeOf" title="https://www.ica.org/standards/RiC/ontology#isDateTypeOf">isDateTypeOf</a> | Connects a Date Type to a Date that it categorizes. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#DateType" title="https://www.ica.org/standards/RiC/ontology#DateType">Date Type</a> |
### <a id="isDeathDateOf" title="https://www.ica.org/standards/RiC/ontology#isDeathDateOf"></a> Property: is death date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDeathDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDeathDateOf" title="https://www.ica.org/standards/RiC/ontology#isDeathDateOf">isDeathDateOf</a> | Connects a Date to a Person who died on that Date. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isDeathPlaceOf" title="https://www.ica.org/standards/RiC/ontology#isDeathPlaceOf"></a> Property: is death place of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDeathPlaceOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDeathPlaceOf" title="https://www.ica.org/standards/RiC/ontology#isDeathPlaceOf">isDeathPlaceOf</a> | Connects a Place to a Person who died in that Place. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="isDerivationDateOf" title="https://www.ica.org/standards/RiC/ontology#isDerivationDateOf"></a> Property: is derivation date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDerivationDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDerivationDateOf" title="https://www.ica.org/standards/RiC/ontology#isDerivationDateOf">isDerivationDateOf</a> | Connects a Date to an Instantiation from which a new Instantiation was or will be derived at that Date. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isDestructionDateOf" title="https://www.ica.org/standards/RiC/ontology#isDestructionDateOf"></a> Property: is destruction date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDestructionDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDestructionDateOf" title="https://www.ica.org/standards/RiC/ontology#isDestructionDateOf">isDestructionDateOf</a> | Connects a Date to a Record Resource or Instantiation that was or will be destructed at that Date. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isDirectComponentOf" title="https://www.ica.org/standards/RiC/ontology#isDirectComponentOf"></a> Property: is direct component of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDirectComponentOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDirectComponentOf" title="https://www.ica.org/standards/RiC/ontology#isDirectComponentOf">isDirectComponentOf</a> | Connects an Instantiation to another Instantiation of which it is a direct component. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="isDirectConstituentOf" title="https://www.ica.org/standards/RiC/ontology#isDirectConstituentOf"></a> Property: is direct constituent of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDirectConstituentOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDirectConstituentOf" title="https://www.ica.org/standards/RiC/ontology#isDirectConstituentOf">isDirectConstituentOf</a> | Connects a Record or Record Part to another Record or Record Part of which it is a direct constituent. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="isDirectConstituentOfProxy" title="https://www.ica.org/standards/RiC/ontology#isDirectConstituentOfProxy"></a> Property: is direct constituent of proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDirectConstituentOfProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDirectConstituentOfProxy" title="https://www.ica.org/standards/RiC/ontology#isDirectConstituentOfProxy">isDirectConstituentOfProxy</a> | Connects a Record or Record Part to a Proxy of a Record or Record Part which it is a direct constituent of. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="isDirectPartOf" title="https://www.ica.org/standards/RiC/ontology#isDirectPartOf"></a> Property: is direct part of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDirectPartOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDirectPartOf" title="https://www.ica.org/standards/RiC/ontology#isDirectPartOf">isDirectPartOf</a> | Connects a Thing to a Thing of which it is direct constitutive or component part. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isDirectSubdivisionOf" title="https://www.ica.org/standards/RiC/ontology#isDirectSubdivisionOf"></a> Property: is direct subdivision of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDirectSubdivisionOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDirectSubdivisionOf" title="https://www.ica.org/standards/RiC/ontology#isDirectSubdivisionOf">isDirectSubdivisionOf</a> | Connects a Group to the Group it is a direct subdivision of. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="isDirectSubeventOf" title="https://www.ica.org/standards/RiC/ontology#isDirectSubeventOf"></a> Property: is direct subevent of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDirectSubeventOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDirectSubeventOf" title="https://www.ica.org/standards/RiC/ontology#isDirectSubeventOf">isDirectSubeventOf</a> | Connects an ongoing Event to the Event it is a direct part of. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="isDirectSubordinateTo" title="https://www.ica.org/standards/RiC/ontology#isDirectSubordinateTo"></a> Property: is direct subordinate to <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDirectSubordinateTo)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDirectSubordinateTo" title="https://www.ica.org/standards/RiC/ontology#isDirectSubordinateTo">isDirectSubordinateTo</a> | Connects an Agent to an Agent that is directly hierarchically superior. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isDirectlyContainedBy" title="https://www.ica.org/standards/RiC/ontology#isDirectlyContainedBy"></a> Property: is directly contained by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDirectlyContainedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDirectlyContainedBy" title="https://www.ica.org/standards/RiC/ontology#isDirectlyContainedBy">isDirectlyContainedBy</a> | Connects a Place to a Place that directly contains it. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="isDirectlyIncludedIn" title="https://www.ica.org/standards/RiC/ontology#isDirectlyIncludedIn"></a> Property: is directly included in <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDirectlyIncludedIn)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDirectlyIncludedIn" title="https://www.ica.org/standards/RiC/ontology#isDirectlyIncludedIn">isDirectlyIncludedIn</a> | Connects a Record to a Record or Record Set in which it is directly included. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="isDirectlyIncludedInProxy" title="https://www.ica.org/standards/RiC/ontology#isDirectlyIncludedInProxy"></a> Property: is directly included in proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDirectlyIncludedInProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDirectlyIncludedInProxy" title="https://www.ica.org/standards/RiC/ontology#isDirectlyIncludedInProxy">isDirectlyIncludedInProxy</a> | Connects a Record or Record Set to a Proxy of a Record Set which it is directly included in. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="isDocumentaryFormTypeOf" title="https://www.ica.org/standards/RiC/ontology#isDocumentaryFormTypeOf"></a> Property: is documentary form type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDocumentaryFormTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDocumentaryFormTypeOf" title="https://www.ica.org/standards/RiC/ontology#isDocumentaryFormTypeOf">isDocumentaryFormTypeOf</a> | Connects a Documentary Form Type to a Record or Record Part that it categorizes. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#DocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#DocumentaryFormType">Documentary Form Type</a> |
### <a id="isDraftOf" title="https://www.ica.org/standards/RiC/ontology#isDraftOf"></a> Property: is draft of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isDraftOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isDraftOf" title="https://www.ica.org/standards/RiC/ontology#isDraftOf">isDraftOf</a> | Connects a draft to the final version of a Record. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="isEndDateOf" title="https://www.ica.org/standards/RiC/ontology#isEndDateOf"></a> Property: is end date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isEndDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isEndDateOf" title="https://www.ica.org/standards/RiC/ontology#isEndDateOf">isEndDateOf</a> | Connects a Date to a Thing whose existence ended on that Date. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isEquivalentTo" title="https://www.ica.org/standards/RiC/ontology#isEquivalentTo"></a> Property: is equivalent to <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isEquivalentTo)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isEquivalentTo" title="https://www.ica.org/standards/RiC/ontology#isEquivalentTo">isEquivalentTo</a> | Connects two Things that are considered equivalent. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isEventAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isEventAssociatedWith"></a> Property: is event associated with <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isEventAssociatedWith)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isEventAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isEventAssociatedWith">isEventAssociatedWith</a> | Connects an Event to a Thing that is associated with the existence and lifecycle of the Event. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="isEventTypeOf" title="https://www.ica.org/standards/RiC/ontology#isEventTypeOf"></a> Property: is event type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isEventTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isEventTypeOf" title="https://www.ica.org/standards/RiC/ontology#isEventTypeOf">isEventTypeOf</a> | Connects an Event Type to an Event that it categorizes. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#EventType" title="https://www.ica.org/standards/RiC/ontology#EventType">Event Type</a> |
### <a id="isEvidencedBy" title="https://www.ica.org/standards/RiC/ontology#isEvidencedBy"></a> Property: is evidenced by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isEvidencedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isEvidencedBy" title="https://www.ica.org/standards/RiC/ontology#isEvidencedBy">isEvidencedBy</a> | Connects a Relation to a Record Resource that is used for proving is existence or describing it. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |
### <a id="isExtentOf" title="https://www.ica.org/standards/RiC/ontology#isExtentOf"></a> Property: is extent of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isExtentOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isExtentOf" title="https://www.ica.org/standards/RiC/ontology#isExtentOf">isExtentOf</a> | Connects an Extent to a Thing | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> |
### <a id="isExtentTypeOf" title="https://www.ica.org/standards/RiC/ontology#isExtentTypeOf"></a> Property: is extent type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isExtentTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isExtentTypeOf" title="https://www.ica.org/standards/RiC/ontology#isExtentTypeOf">isExtentTypeOf</a> | Connects an Extent Type to an Extent that it categorizes. | <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> | <a href="#ExtentType" title="https://www.ica.org/standards/RiC/ontology#ExtentType">Extent Type</a> |
### <a id="isFamilyTypeOf" title="https://www.ica.org/standards/RiC/ontology#isFamilyTypeOf"></a> Property: is family type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isFamilyTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isFamilyTypeOf" title="https://www.ica.org/standards/RiC/ontology#isFamilyTypeOf">isFamilyTypeOf</a> | Connects a Family Type to a Family that it categorizes. | <a href="#Family" title="https://www.ica.org/standards/RiC/ontology#Family">Family</a> | <a href="#FamilyType" title="https://www.ica.org/standards/RiC/ontology#FamilyType">Family Type</a> |
### <a id="isFromUseDateOf" title="https://www.ica.org/standards/RiC/ontology#isFromUseDateOf"></a> Property: is from use date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isFromUseDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isFromUseDateOf" title="https://www.ica.org/standards/RiC/ontology#isFromUseDateOf">isFromUseDateOf</a> | Connects a Date to an Appellation, when it is the date at which the Appellation was first used. | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isFunctionallyEquivalentTo" title="https://www.ica.org/standards/RiC/ontology#isFunctionallyEquivalentTo"></a> Property: is functionally equivalent to <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isFunctionallyEquivalentTo)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isFunctionallyEquivalentTo" title="https://www.ica.org/standards/RiC/ontology#isFunctionallyEquivalentTo">isFunctionallyEquivalentTo</a> | Connects two Instantiations which may be considered as equivalent. This relation is symmetric. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="isIdentifierTypeOf" title="https://www.ica.org/standards/RiC/ontology#isIdentifierTypeOf"></a> Property: is identifier type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isIdentifierTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isIdentifierTypeOf" title="https://www.ica.org/standards/RiC/ontology#isIdentifierTypeOf">isIdentifierTypeOf</a> | Connects an Identifier Type and an Identifier that it categorizes. | <a href="#Identifier" title="https://www.ica.org/standards/RiC/ontology#Identifier">Identifier</a> | <a href="#IdentifierType" title="https://www.ica.org/standards/RiC/ontology#IdentifierType">Identifier Type</a> |
### <a id="isIncludedInProxy" title="https://www.ica.org/standards/RiC/ontology#isIncludedInProxy"></a> Property: is included in proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isIncludedInProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isIncludedInProxy" title="https://www.ica.org/standards/RiC/ontology#isIncludedInProxy">isIncludedInProxy</a> | Connects a Record or Record Set to a Proxy of a Record Set which it is included in, directly or indirectly. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="isIncludedInTransitive" title="https://www.ica.org/standards/RiC/ontology#isIncludedInTransitive"></a> Property: is included in transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isIncludedInTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isIncludedInTransitive" title="https://www.ica.org/standards/RiC/ontology#isIncludedInTransitive">isIncludedInTransitive</a> | Connects a Record to a Record or Record Set in which it is directly or indirectly included. This is a transitive relation. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="isInstantiationAssociatedWithInstantiation" title="https://www.ica.org/standards/RiC/ontology#isInstantiationAssociatedWithInstantiation"></a> Property: is instantiation associated with instantiation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isInstantiationAssociatedWithInstantiation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isInstantiationAssociatedWithInstantiation" title="https://www.ica.org/standards/RiC/ontology#isInstantiationAssociatedWithInstantiation">isInstantiationAssociatedWithInstantiation</a> | Connects two Instantiations. This relation is symmetric. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="isLastUpdateDateOf" title="https://www.ica.org/standards/RiC/ontology#isLastUpdateDateOf"></a> Property: is last update date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isLastUpdateDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isLastUpdateDateOf" title="https://www.ica.org/standards/RiC/ontology#isLastUpdateDateOf">isLastUpdateDateOf</a> | Connects a Date and a Thing that was last modified at this Date. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isMainThingRepresentedByContentOf" title="https://www.ica.org/standards/RiC/ontology#isMainThingRepresentedByContentOf"></a> Property: is main thing represented by content of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isMainThingRepresentedByContentOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isMainThingRepresentedByContentOf" title="https://www.ica.org/standards/RiC/ontology#isMainThingRepresentedByContentOf">isMainThingRepresentedByContentOf</a> | Inverse of 'has content which mainly represents' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isMigrationDateOf" title="https://www.ica.org/standards/RiC/ontology#isMigrationDateOf"></a> Property: is migration date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isMigrationDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isMigrationDateOf" title="https://www.ica.org/standards/RiC/ontology#isMigrationDateOf">isMigrationDateOf</a> | Connects a Date to an Instantiation that was or will be migrated at that Date. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isModificationDateOf" title="https://www.ica.org/standards/RiC/ontology#isModificationDateOf"></a> Property: is modification date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isModificationDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isModificationDateOf" title="https://www.ica.org/standards/RiC/ontology#isModificationDateOf">isModificationDateOf</a> | Connects a Date to a Thing that was modified on that Date. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isOrWasAccumulationDateOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfAllMembersOf"></a> Property: is or was accumulation date of all members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfAllMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasAccumulationDateOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfAllMembersOf">isOrWasAccumulationDateOfAllMembersOf</a> | Connects a Date to a Record Set all of whose present or past members were or will be accumulated at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isOrWasAccumulationDateOfMostMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfMostMembersOf"></a> Property: is or was accumulation date of most members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfMostMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasAccumulationDateOfMostMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfMostMembersOf">isOrWasAccumulationDateOfMostMembersOf</a> | Connects a Date to a Record Set most of whose present or past members were or will be accumulated at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isOrWasAccumulationDateOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfSomeMembersOf"></a> Property: is or was accumulation date of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasAccumulationDateOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAccumulationDateOfSomeMembersOf">isOrWasAccumulationDateOfSomeMembersOf</a> | Connects a Date to a Record Set some of whose present or past members were or will be accumulated at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isOrWasActiveAtDate" title="https://www.ica.org/standards/RiC/ontology#isOrWasActiveAtDate"></a> Property: is or was active at date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasActiveAtDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasActiveAtDate" title="https://www.ica.org/standards/RiC/ontology#isOrWasActiveAtDate">isOrWasActiveAtDate</a> | Inverse of 'is or was activity date of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isOrWasAdjacentTo" title="https://www.ica.org/standards/RiC/ontology#isOrWasAdjacentTo"></a> Property: is or was adjacent to <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasAdjacentTo)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasAdjacentTo" title="https://www.ica.org/standards/RiC/ontology#isOrWasAdjacentTo">isOrWasAdjacentTo</a> | Connects two Places that are or were geographically adjacent. This relation is symmetric. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="isOrWasAffectedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasAffectedBy"></a> Property: is or was affected by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasAffectedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasAffectedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasAffectedBy">isOrWasAffectedBy</a> | Inverse of 'affects or affected' object property. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasAgentNameOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAgentNameOf"></a> Property: is or was agent name of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasAgentNameOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasAgentNameOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAgentNameOf">isOrWasAgentNameOf</a> | Connects an Agent Name to an Agent it designates or designated. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#AgentName" title="https://www.ica.org/standards/RiC/ontology#AgentName">Agent Name</a> |
### <a id="isOrWasAnalogueInstantiationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAnalogueInstantiationOf"></a> Property: is or was analogue instantiation of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasAnalogueInstantiationOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasAnalogueInstantiationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAnalogueInstantiationOf">isOrWasAnalogueInstantiationOf</a> | Inverse of 'has or had analogue instantiation' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="isOrWasAppellationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAppellationOf"></a> Property: is or was appellation of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasAppellationOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasAppellationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasAppellationOf">isOrWasAppellationOf</a> | Connects an Appellation to a Thing that it designates or designated. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a> |
### <a id="isOrWasAttendedByStudent" title="https://www.ica.org/standards/RiC/ontology#isOrWasAttendedByStudent"></a> Property: is or was attended by student <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasAttendedByStudent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasAttendedByStudent" title="https://www.ica.org/standards/RiC/ontology#isOrWasAttendedByStudent">isOrWasAttendedByStudent</a> | Inverse of 'studies or studied at' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="isOrWasComponentOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasComponentOf"></a> Property: is or was component of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasComponentOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasComponentOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasComponentOf">isOrWasComponentOf</a> | Inverse of 'has or had component' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="isOrWasConstituentOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasConstituentOf"></a> Property: is or was constituent of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasConstituentOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasConstituentOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasConstituentOf">isOrWasConstituentOf</a> | Inverse of 'has or had constituent' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="isOrWasContainedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasContainedBy"></a> Property: is or was contained by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasContainedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasContainedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasContainedBy">isOrWasContainedBy</a> | Inverse of 'contains or contained' object property. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="isOrWasContentTypeOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasContentTypeOfAllMembersOf"></a> Property: is or was content type of all members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasContentTypeOfAllMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasContentTypeOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasContentTypeOfAllMembersOf">isOrWasContentTypeOfAllMembersOf</a> | Connects a Content Type and a Record Set whose all past or present Record or Record Part members have that Content Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#ContentType" title="https://www.ica.org/standards/RiC/ontology#ContentType">Content Type</a> |
### <a id="isOrWasContentTypeOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasContentTypeOfSomeMembersOf"></a> Property: is or was content type of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasContentTypeOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasContentTypeOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasContentTypeOfSomeMembersOf">isOrWasContentTypeOfSomeMembersOf</a> | Connects a Content Type and a Record Set whose some past or present Record or Record Part members have that Content Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#ContentType" title="https://www.ica.org/standards/RiC/ontology#ContentType">Content Type</a> |
### <a id="isOrWasControllerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasControllerOf"></a> Property: is or was controller of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasControllerOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasControllerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasControllerOf">isOrWasControllerOf</a> | Connects an Agent to another Agent it controls or controlled. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isOrWasCoordinatesOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCoordinatesOf"></a> Property: is or was coordinates of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasCoordinatesOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasCoordinatesOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCoordinatesOf">isOrWasCoordinatesOf</a> | Connects an instance of Coordinates to a Physical Location it locates or located on earth, according to some reference system. | <a href="#PhysicalLocation" title="https://www.ica.org/standards/RiC/ontology#PhysicalLocation">Physical Location</a> | <a href="#Coordinates" title="https://www.ica.org/standards/RiC/ontology#Coordinates">Coordinates</a> |
### <a id="isOrWasCorporateBodyTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCorporateBodyTypeOf"></a> Property: is or was corporate body type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasCorporateBodyTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasCorporateBodyTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCorporateBodyTypeOf">isOrWasCorporateBodyTypeOf</a> | Connects a Corporate Body Type to a Corporate Body that it categorizes or categorized. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> | <a href="#CorporateBodyType" title="https://www.ica.org/standards/RiC/ontology#CorporateBodyType">Corporate Body Type</a> |
### <a id="isOrWasCreationDateOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfAllMembersOf"></a> Property: is or was creation date of all members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfAllMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasCreationDateOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfAllMembersOf">isOrWasCreationDateOfAllMembersOf</a> | Connects a Date to a Record Set all of whose present or past members were or will be created at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isOrWasCreationDateOfMostMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfMostMembersOf"></a> Property: is or was creation date of most members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfMostMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasCreationDateOfMostMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfMostMembersOf">isOrWasCreationDateOfMostMembersOf</a> | Connects a Date to a Record Set most of whose present or past members were or will be created at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isOrWasCreationDateOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfSomeMembersOf"></a> Property: is or was creation date of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasCreationDateOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasCreationDateOfSomeMembersOf">isOrWasCreationDateOfSomeMembersOf</a> | Connects a Date to a Record Set some of whose present or past members were or will be created at this Date. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isOrWasActivityDateOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasActivityDateOf"></a> Property: is or was date of activity of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasActivityDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasActivityDateOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasActivityDateOf">isOrWasActivityDateOf</a> | Connects a Date to an Agent that is or was active at that Date. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isOrWasDemographicGroupOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDemographicGroupOf"></a> Property: is or was demographic group of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasDemographicGroupOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasDemographicGroupOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDemographicGroupOf">isOrWasDemographicGroupOf</a> | Connects a Demographic Group to a Person or Group which belongs or belonged to it. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#DemographicGroup" title="https://www.ica.org/standards/RiC/ontology#DemographicGroup">Demographic Group</a> |
### <a id="isOrWasDerivedFromInstantiation" title="https://www.ica.org/standards/RiC/ontology#isOrWasDerivedFromInstantiation"></a> Property: is or was derived from instantiation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasDerivedFromInstantiation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasDerivedFromInstantiation" title="https://www.ica.org/standards/RiC/ontology#isOrWasDerivedFromInstantiation">isOrWasDerivedFromInstantiation</a> | Inverse of 'has or had derived instantiation' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="isOrWasDescribedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasDescribedBy"></a> Property: is or was described by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasDescribedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasDescribedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasDescribedBy">isOrWasDescribedBy</a> | Inverse of 'describes or described' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasDigitalInstantiationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDigitalInstantiationOf"></a> Property: is or was digital instantiation of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasDigitalInstantiationOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasDigitalInstantiationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDigitalInstantiationOf">isOrWasDigitalInstantiationOf</a> | Inverse of 'has or had digital instantiation' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="isOrWasDocumentaryFormTypeOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDocumentaryFormTypeOfAllMembersOf"></a> Property: is or was documentary form type of all members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasDocumentaryFormTypeOfAllMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasDocumentaryFormTypeOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDocumentaryFormTypeOfAllMembersOf">isOrWasDocumentaryFormTypeOfAllMembersOf</a> | Connects a Documentary Form Type and a Record Set whose all past or present Record or Record Part members have that Documentary Form Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#DocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#DocumentaryFormType">Documentary Form Type</a> |
### <a id="isOrWasDocumentaryFormTypeOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDocumentaryFormTypeOfSomeMembersOf"></a> Property: is or was documentary form type of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasDocumentaryFormTypeOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasDocumentaryFormTypeOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasDocumentaryFormTypeOfSomeMembersOf">isOrWasDocumentaryFormTypeOfSomeMembersOf</a> | Connects a Documentary Form Type and a Record Set whose some past or present Record or Record Part members have that Documentary Form Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#DocumentaryFormType" title="https://www.ica.org/standards/RiC/ontology#DocumentaryFormType">Documentary Form Type</a> |
### <a id="isOrWasEmployerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasEmployerOf"></a> Property: is or was employer of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasEmployerOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasEmployerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasEmployerOf">isOrWasEmployerOf</a> | Connects a Corporate Body or a Person to a Person who is or was their employee. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="isOrWasEnforcedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasEnforcedBy"></a> Property: is or was enforced by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasEnforcedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasEnforcedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasEnforcedBy">isOrWasEnforcedBy</a> | Connects a Rule to an Agent that enforces or enforced the Rule. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |
### <a id="isOrWasExpressedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasExpressedBy"></a> Property: is or was expressed by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasExpressedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasExpressedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasExpressedBy">isOrWasExpressedBy</a> | Connects a Rule to a Record Resource that expresses or expressed the Rule. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |
### <a id="isOrWasHolderOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasHolderOf"></a> Property: is or was holder of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasHolderOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasHolderOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasHolderOf">isOrWasHolderOf</a> | Connects an Agent to a Record Resource or Instantiation that the Agent holds or held. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isOrWasHolderOfIntellectualPropertyRightsOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasHolderOfIntellectualPropertyRightsOf"></a> Property: is or was holder of intellectual property rights of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasHolderOfIntellectualPropertyRightsOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasHolderOfIntellectualPropertyRightsOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasHolderOfIntellectualPropertyRightsOf">isOrWasHolderOfIntellectualPropertyRightsOf</a> | Connects an Agent to a Record Resource or Instantiation on which the Agent has or had some intellectual property rights. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a>, <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |
### <a id="isOrWasIdentifierOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasIdentifierOf"></a> Property: is or was identifier of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasIdentifierOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasIdentifierOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasIdentifierOf">isOrWasIdentifierOf</a> | Connects an Identifier to a Thing that it identified or identifies. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Identifier" title="https://www.ica.org/standards/RiC/ontology#Identifier">Identifier</a> |
### <a id="isOrWasIncludedIn" title="https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn"></a> Property: is or was included in <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasIncludedIn" title="https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn">isOrWasIncludedIn</a> | Inverse of 'includes or included' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="isOrWasInstantiationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasInstantiationOf"></a> Property: is or was instantiation of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasInstantiationOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasInstantiationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasInstantiationOf">isOrWasInstantiationOf</a> | Inverse of 'has or had instantiation' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="isOrWasJurisdictionOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasJurisdictionOf"></a> Property: is or was jurisdiction of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasJurisdictionOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasJurisdictionOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasJurisdictionOf">isOrWasJurisdictionOf</a> | Connects a Place to an Agent that has or had jurisdiction over the Place. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="isOrWasLanguageOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOf"></a> Property: is or was language of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasLanguageOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOf">isOrWasLanguageOf</a> | Connects a Language to an Agent, Record or Record Part that uses or used it. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a>, <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Language" title="https://www.ica.org/standards/RiC/ontology#Language">Language</a> |
### <a id="isOrWasLanguageOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOfAllMembersOf"></a> Property: is or was language of all members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOfAllMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasLanguageOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOfAllMembersOf">isOrWasLanguageOfAllMembersOf</a> | Connects a Language and a Record Set whose all present or past Record or Record Part members use that Language. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Language" title="https://www.ica.org/standards/RiC/ontology#Language">Language</a> |
### <a id="isOrWasLanguageOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOfSomeMembersOf"></a> Property: is or was language of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasLanguageOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLanguageOfSomeMembersOf">isOrWasLanguageOfSomeMembersOf</a> | Connects a Language and a Record Set whose some present or past Record or Record Part members use that Language. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Language" title="https://www.ica.org/standards/RiC/ontology#Language">Language</a> |
### <a id="isOrWasLeaderOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLeaderOf"></a> Property: is or was leader of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasLeaderOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasLeaderOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLeaderOf">isOrWasLeaderOf</a> | Connects a Person to the Group that Person leads or led in the past. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="isOrWasLegalStatusOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOf"></a> Property: is or was legal status of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasLegalStatusOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOf">isOrWasLegalStatusOf</a> | Connects a Legal Status to an Agent or Record Resource that it categorizes. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a>, <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus">Legal Status</a> |
### <a id="isOrWasLegalStatusOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOfAllMembersOf"></a> Property: is or was legal status of all members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOfAllMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasLegalStatusOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOfAllMembersOf">isOrWasLegalStatusOfAllMembersOf</a> | Connects a Legal Status and a Record Set whose all past or present Record or Record Part members have that Legal Status. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus">Legal Status</a> |
### <a id="isOrWasLegalStatusOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOfSomeMembersOf"></a> Property: is or was legal status of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasLegalStatusOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLegalStatusOfSomeMembersOf">isOrWasLegalStatusOfSomeMembersOf</a> | Connects a Legal Status and a Record Set whose some past or present Record or Record Part members have that Legal Status. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#LegalStatus" title="https://www.ica.org/standards/RiC/ontology#LegalStatus">Legal Status</a> |
### <a id="isOrWasLocationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLocationOf"></a> Property: is or was location of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasLocationOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasLocationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasLocationOf">isOrWasLocationOf</a> | Connects a Place to a Thing that is or was located in the Place. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="isOrWasLocationOfAgent" title="https://www.ica.org/standards/RiC/ontology#isOrWasLocationOfAgent"></a> Property: is or was location of agent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasLocationOfAgent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasLocationOfAgent" title="https://www.ica.org/standards/RiC/ontology#isOrWasLocationOfAgent">isOrWasLocationOfAgent</a> | Connects a Place to an Agent that is or was located in this Place. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="isOrWasMainSubjectOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOf"></a> Property: is or was main subject of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasMainSubjectOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOf">isOrWasMainSubjectOf</a> | Inverse of 'has or had main subject' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasMainSubjectOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOfAllMembersOf"></a> Property: is or was main subject of all members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOfAllMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasMainSubjectOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOfAllMembersOf">isOrWasMainSubjectOfAllMembersOf</a> | Inverse of 'has or had all members with main subject' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasMainSubjectOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOfSomeMembersOf"></a> Property: is or was main subject of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasMainSubjectOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainSubjectOfSomeMembersOf">isOrWasMainSubjectOfSomeMembersOf</a> | Inverse of 'has or had some members with main subject' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasMainThingRepresentedByContentOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainThingRepresentedByContentOfSomeMembersOf"></a> Property: is or was main thing represented by content of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasMainThingRepresentedByContentOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasMainThingRepresentedByContentOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMainThingRepresentedByContentOfSomeMembersOf">isOrWasMainThingRepresentedByContentOfSomeMembersOf</a> | Inverse of 'has or had some members whose content mainly represents' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasManagerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasManagerOf"></a> Property: is or was manager of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasManagerOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasManagerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasManagerOf">isOrWasManagerOf</a> | Connects an Agent to a Record Resource or Instantiation that the Agent managed or manages. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isOrWasMandateTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMandateTypeOf"></a> Property: is or was mandate type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasMandateTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasMandateTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMandateTypeOf">isOrWasMandateTypeOf</a> | Connects a Mandate Type to a Mandate that it categorized or categorizes. | <a href="#Mandate" title="https://www.ica.org/standards/RiC/ontology#Mandate">Mandate</a> | <a href="#MandateType" title="https://www.ica.org/standards/RiC/ontology#MandateType">Mandate Type</a> |
### <a id="isOrWasMemberOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMemberOf"></a> Property: is or was member of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasMemberOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasMemberOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasMemberOf">isOrWasMemberOf</a> | Inverse of 'has or had member' object property. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="isOrWasNameOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasNameOf"></a> Property: is or was name of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasNameOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasNameOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasNameOf">isOrWasNameOf</a> | Connects a Name to a Thing that it designated or designates. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Name" title="https://www.ica.org/standards/RiC/ontology#Name">Name</a> |
### <a id="isOrWasOccupationTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasOccupationTypeOf"></a> Property: is or was occupation type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasOccupationTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasOccupationTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasOccupationTypeOf">isOrWasOccupationTypeOf</a> | Connects an Occupation Type to a Person whose occupation is or was categorized by it. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#OccupationType" title="https://www.ica.org/standards/RiC/ontology#OccupationType">Occupation Type</a> |
### <a id="isOrWasOccupiedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasOccupiedBy"></a> Property: is or was occupied by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasOccupiedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasOccupiedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasOccupiedBy">isOrWasOccupiedBy</a> | Inverse of 'occupies or occupied' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |
### <a id="isOrWasOwnerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasOwnerOf"></a> Property: is or was owner of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasOwnerOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasOwnerOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasOwnerOf">isOrWasOwnerOf</a> | Connects a Group, Person or Position to a Thing that this Agent owns or owned. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a>, <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a>, <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |
### <a id="isOrWasPartOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPartOf"></a> Property: is or was part of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasPartOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasPartOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPartOf">isOrWasPartOf</a> | Inverse of 'has or had part' relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasParticipantIn" title="https://www.ica.org/standards/RiC/ontology#isOrWasParticipantIn"></a> Property: is or was participant in <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasParticipantIn)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasParticipantIn" title="https://www.ica.org/standards/RiC/ontology#isOrWasParticipantIn">isOrWasParticipantIn</a> | Inverse of 'has or had participant' object property. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasPerformedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasPerformedBy"></a> Property: is or was performed by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasPerformedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasPerformedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasPerformedBy">isOrWasPerformedBy</a> | Connects an Activity to an Agent that performed or performs the Activity. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> |
### <a id="isOrWasPhysicalLocationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPhysicalLocationOf"></a> Property: is or was physical location of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasPhysicalLocationOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasPhysicalLocationOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPhysicalLocationOf">isOrWasPhysicalLocationOf</a> | Connects a Physical Location to a Place, when it is or was its location. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#PhysicalLocation" title="https://www.ica.org/standards/RiC/ontology#PhysicalLocation">Physical Location</a> |
### <a id="isOrWasPlaceNameOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPlaceNameOf"></a> Property: is or was place name of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasPlaceNameOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasPlaceNameOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPlaceNameOf">isOrWasPlaceNameOf</a> | Connects a Place Name to a Place that was or is designated by it. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#PlaceName" title="https://www.ica.org/standards/RiC/ontology#PlaceName">Place Name</a> |
### <a id="isOrWasPlaceTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPlaceTypeOf"></a> Property: is or was place type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasPlaceTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasPlaceTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasPlaceTypeOf">isOrWasPlaceTypeOf</a> | Connects a Place Type to a Place that is or was categorized by it. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#PlaceType" title="https://www.ica.org/standards/RiC/ontology#PlaceType">Place Type</a> |
### <a id="isOrWasRecordStateOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRecordStateOfAllMembersOf"></a> Property: is or was record state of all members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasRecordStateOfAllMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasRecordStateOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRecordStateOfAllMembersOf">isOrWasRecordStateOfAllMembersOf</a> | Connects a Record State and a Record Set whose all past or present Record or Record Part members have that Record State. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#RecordState" title="https://www.ica.org/standards/RiC/ontology#RecordState">Record State</a> |
### <a id="isOrWasRecordStateOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRecordStateOfSomeMembersOf"></a> Property: is or was record state of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasRecordStateOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasRecordStateOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRecordStateOfSomeMembersOf">isOrWasRecordStateOfSomeMembersOf</a> | Connects a Record State and a Record Set whose some past or present Record or Record Part members have that Record State. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#RecordState" title="https://www.ica.org/standards/RiC/ontology#RecordState">Record State</a> |
### <a id="isOrWasRegulatedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasRegulatedBy"></a> Property: is or was regulated by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasRegulatedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasRegulatedBy" title="https://www.ica.org/standards/RiC/ontology#isOrWasRegulatedBy">isOrWasRegulatedBy</a> | Inverse of 'regulates or regulated' object property. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasRepresentedByContentOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRepresentedByContentOfSomeMembersOf"></a> Property: is or was represented by content of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasRepresentedByContentOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasRepresentedByContentOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRepresentedByContentOfSomeMembersOf">isOrWasRepresentedByContentOfSomeMembersOf</a> | Inverse of 'has or had some members whose content represents' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasResponsibleForEnforcing" title="https://www.ica.org/standards/RiC/ontology#isOrWasResponsibleForEnforcing"></a> Property: is or was responsible for enforcing <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasResponsibleForEnforcing)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasResponsibleForEnforcing" title="https://www.ica.org/standards/RiC/ontology#isOrWasResponsibleForEnforcing">isOrWasResponsibleForEnforcing</a> | Inverse of 'is or was enforced by' object property. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isOrWasRuleTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRuleTypeOf"></a> Property: is or was rule type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasRuleTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasRuleTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasRuleTypeOf">isOrWasRuleTypeOf</a> | Connects a Rule Type to a Rule that it categorized or categorizes. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> | <a href="#RuleType" title="https://www.ica.org/standards/RiC/ontology#RuleType">Rule Type</a> |
### <a id="isOrWasSubdivisionOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubdivisionOf"></a> Property: is or was subdivision of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasSubdivisionOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasSubdivisionOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubdivisionOf">isOrWasSubdivisionOf</a> | Inverse of 'has or had subdivision' object property. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="isOrWasSubeventOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubeventOf"></a> Property: is or was subevent of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasSubeventOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasSubeventOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubeventOf">isOrWasSubeventOf</a> | Inverse of 'has or had subevent' object property. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="isOrWasSubjectOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOf"></a> Property: is or was subject of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasSubjectOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOf">isOrWasSubjectOf</a> | Inverse of 'has or had subject' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasSubjectOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOfAllMembersOf"></a> Property: is or was subject of all members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOfAllMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasSubjectOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOfAllMembersOf">isOrWasSubjectOfAllMembersOf</a> | Inverse of 'has or had all members with subject' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasSubjectOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOfSomeMembersOf"></a> Property: is or was subject of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasSubjectOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubjectOfSomeMembersOf">isOrWasSubjectOfSomeMembersOf</a> | Inverse of 'has or had some members with subject' object property. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrWasSubordinateTo" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubordinateTo"></a> Property: is or was subordinate to <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasSubordinateTo)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasSubordinateTo" title="https://www.ica.org/standards/RiC/ontology#isOrWasSubordinateTo">isOrWasSubordinateTo</a> | Inverse of 'has or had subordinate' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isOrWasTitleOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTitleOf"></a> Property: is or was title of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasTitleOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasTitleOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTitleOf">isOrWasTitleOf</a> | Connects a Title to a Record Resource, Instantiation or Rule that it designated or designates. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a>, <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> | <a href="#Title" title="https://www.ica.org/standards/RiC/ontology#Title">Title</a> |
### <a id="isOrWasTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTypeOf"></a> Property: is or was type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasTypeOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTypeOf">isOrWasTypeOf</a> | Connects a Type to a Thing that it categorizes or categorized. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Type" title="https://www.ica.org/standards/RiC/ontology#Type">Type</a> |
### <a id="isOrWasTypeOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTypeOfAllMembersOf"></a> Property: is or was type of all members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasTypeOfAllMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasTypeOfAllMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTypeOfAllMembersOf">isOrWasTypeOfAllMembersOf</a> | Connects a Type and a Record Set whose all present or past Record or Record Part members belong to that Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Type" title="https://www.ica.org/standards/RiC/ontology#Type">Type</a> |
### <a id="isOrWasTypeOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTypeOfSomeMembersOf"></a> Property: is or was type of some members of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasTypeOfSomeMembersOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasTypeOfSomeMembersOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasTypeOfSomeMembersOf">isOrWasTypeOfSomeMembersOf</a> | Connects a Type and a Record Set whose some present or past Record or Record Part members belong to that Type. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Type" title="https://www.ica.org/standards/RiC/ontology#Type">Type</a> |
### <a id="isOrWasUnderAuthorityOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasUnderAuthorityOf"></a> Property: is or was under authority of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrWasUnderAuthorityOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrWasUnderAuthorityOf" title="https://www.ica.org/standards/RiC/ontology#isOrWasUnderAuthorityOf">isOrWasUnderAuthorityOf</a> | Inverse of 'has or had authority over' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isOrganicOrFunctionalProvenanceOf" title="https://www.ica.org/standards/RiC/ontology#isOrganicOrFunctionalProvenanceOf"></a> Property: is organic or functional provenance of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrganicOrFunctionalProvenanceOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrganicOrFunctionalProvenanceOf" title="https://www.ica.org/standards/RiC/ontology#isOrganicOrFunctionalProvenanceOf">isOrganicOrFunctionalProvenanceOf</a> | Inverse of 'has organic or functional provenance' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a>, <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isOrganicProvenanceDateOf" title="https://www.ica.org/standards/RiC/ontology#isOrganicProvenanceDateOf"></a> Property: is organic provenance date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrganicProvenanceDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrganicProvenanceDateOf" title="https://www.ica.org/standards/RiC/ontology#isOrganicProvenanceDateOf">isOrganicProvenanceDateOf</a> | Connects a Date associated with the organic provenance of a Record Resource or Instantiation to that Record Resource or Instantiation. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isOrganicProvenanceOf" title="https://www.ica.org/standards/RiC/ontology#isOrganicProvenanceOf"></a> Property: is organic provenance of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOrganicProvenanceOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOrganicProvenanceOf" title="https://www.ica.org/standards/RiC/ontology#isOrganicProvenanceOf">isOrganicProvenanceOf</a> | Inverse of 'has organic provenance' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isOriginalOf" title="https://www.ica.org/standards/RiC/ontology#isOriginalOf"></a> Property: is original of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isOriginalOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isOriginalOf" title="https://www.ica.org/standards/RiC/ontology#isOriginalOf">isOriginalOf</a> | Connects the original version of a Record to a copy or a later version. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="isPartOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isPartOfTransitive"></a> Property: is part of transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isPartOfTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isPartOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isPartOfTransitive">isPartOfTransitive</a> | Connects a Thing to a Thing of which it is a a constitutive or component part, directly or indirectly. This is a transitive relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isPlaceAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isPlaceAssociatedWith"></a> Property: is place associated with <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isPlaceAssociatedWith)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isPlaceAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isPlaceAssociatedWith">isPlaceAssociatedWith</a> | Connects a Place to a Thing with whose existence and lifecycle the Place is associated. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="isPlaceAssociatedWithAgent" title="https://www.ica.org/standards/RiC/ontology#isPlaceAssociatedWithAgent"></a> Property: is place associated with agent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isPlaceAssociatedWithAgent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isPlaceAssociatedWithAgent" title="https://www.ica.org/standards/RiC/ontology#isPlaceAssociatedWithAgent">isPlaceAssociatedWithAgent</a> | Connects a Place to an Agent which is related to that Place. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="isProductionTechniqueTypeOf" title="https://www.ica.org/standards/RiC/ontology#isProductionTechniqueTypeOf"></a> Property: is production technique type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isProductionTechniqueTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isProductionTechniqueTypeOf" title="https://www.ica.org/standards/RiC/ontology#isProductionTechniqueTypeOf">isProductionTechniqueTypeOf</a> | Connects a Production Technique Type to an Instantiation whose production technique is categorized by it. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#ProductionTechniqueType" title="https://www.ica.org/standards/RiC/ontology#ProductionTechniqueType">Production Technique Type</a> |
### <a id="isPublicationDateOf" title="https://www.ica.org/standards/RiC/ontology#isPublicationDateOf"></a> Property: is publication date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isPublicationDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isPublicationDateOf" title="https://www.ica.org/standards/RiC/ontology#isPublicationDateOf">isPublicationDateOf</a> | Connects a Date to a Record Resource that was or will be made public at this Date. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isPublisherOf" title="https://www.ica.org/standards/RiC/ontology#isPublisherOf"></a> Property: is publisher of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isPublisherOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isPublisherOf" title="https://www.ica.org/standards/RiC/ontology#isPublisherOf">isPublisherOf</a> | Connects an Agent to a Record Resource that it published. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isReceiverOf" title="https://www.ica.org/standards/RiC/ontology#isReceiverOf"></a> Property: is receiver of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isReceiverOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isReceiverOf" title="https://www.ica.org/standards/RiC/ontology#isReceiverOf">isReceiverOf</a> | Inverse of 'received by' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isRecordResourceAssociatedWithRecordResource" title="https://www.ica.org/standards/RiC/ontology#isRecordResourceAssociatedWithRecordResource"></a> Property: is record resource associated with record resource <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isRecordResourceAssociatedWithRecordResource)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isRecordResourceAssociatedWithRecordResource" title="https://www.ica.org/standards/RiC/ontology#isRecordResourceAssociatedWithRecordResource">isRecordResourceAssociatedWithRecordResource</a> | Connects two Record Resources. This relation is symmetric. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="isRecordSetTypeOf" title="https://www.ica.org/standards/RiC/ontology#isRecordSetTypeOf"></a> Property: is record set type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isRecordSetTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isRecordSetTypeOf" title="https://www.ica.org/standards/RiC/ontology#isRecordSetTypeOf">isRecordSetTypeOf</a> | Connects a Record Set Type to a Record Set that it categorizes. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#RecordSetType" title="https://www.ica.org/standards/RiC/ontology#RecordSetType">Record Set Type</a> |
### <a id="isRecordStateOf" title="https://www.ica.org/standards/RiC/ontology#isRecordStateOf"></a> Property: is record state of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isRecordStateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isRecordStateOf" title="https://www.ica.org/standards/RiC/ontology#isRecordStateOf">isRecordStateOf</a> | Connects a Record State to a Record or Record Part whose state it categorizes. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#RecordState" title="https://www.ica.org/standards/RiC/ontology#RecordState">Record State</a> |
### <a id="isRelatedTo" title="https://www.ica.org/standards/RiC/ontology#isRelatedTo"></a> Property: is related to <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isRelatedTo)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isRelatedTo" title="https://www.ica.org/standards/RiC/ontology#isRelatedTo">isRelatedTo</a> | The most generic relation, is related to, connects any Thing to any other Thing. This relation is symmetric. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isReplyTo" title="https://www.ica.org/standards/RiC/ontology#isReplyTo"></a> Property: is reply to <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isReplyTo)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isReplyTo" title="https://www.ica.org/standards/RiC/ontology#isReplyTo">isReplyTo</a> | Inverse of 'has reply' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="isRepresentationTypeOf" title="https://www.ica.org/standards/RiC/ontology#isRepresentationTypeOf"></a> Property: is representation type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isRepresentationTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isRepresentationTypeOf" title="https://www.ica.org/standards/RiC/ontology#isRepresentationTypeOf">isRepresentationTypeOf</a> | Connects a Representation Type to an Instantiation that it categorizes. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#RepresentationType" title="https://www.ica.org/standards/RiC/ontology#RepresentationType">Representation Type</a> |
### <a id="isRepresentedByContentOf" title="https://www.ica.org/standards/RiC/ontology#isRepresentedByContentOf"></a> Property: is represented by content of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isRepresentedByContentOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isRepresentedByContentOf" title="https://www.ica.org/standards/RiC/ontology#isRepresentedByContentOf">isRepresentedByContentOf</a> | Inverse of 'has content which represents' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="isResponsibleForIssuing" title="https://www.ica.org/standards/RiC/ontology#isResponsibleForIssuing"></a> Property: is responsible for issuing <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isResponsibleForIssuing)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isResponsibleForIssuing" title="https://www.ica.org/standards/RiC/ontology#isResponsibleForIssuing">isResponsibleForIssuing</a> | Inverse of 'issued by' object property. | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isRuleAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isRuleAssociatedWith"></a> Property: is rule associated with <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isRuleAssociatedWith)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isRuleAssociatedWith" title="https://www.ica.org/standards/RiC/ontology#isRuleAssociatedWith">isRuleAssociatedWith</a> | Connects a Rule to a Thing that is associated with the Rule. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |
### <a id="isSenderOf" title="https://www.ica.org/standards/RiC/ontology#isSenderOf"></a> Property: is sender of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isSenderOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isSenderOf" title="https://www.ica.org/standards/RiC/ontology#isSenderOf">isSenderOf</a> | Inverse of 'has sender' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isSourceOfInformationOfRecordResource" title="https://www.ica.org/standards/RiC/ontology#isSourceOfInformationOfRecordResource"></a> Property: is source of information of Record Resource <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isSourceOfInformationOfRecordResource)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isSourceOfInformationOfRecordResource" title="https://www.ica.org/standards/RiC/ontology#isSourceOfInformationOfRecordResource">isSourceOfInformationOfRecordResource</a> | Connects a Record Resource to a Record Resource, when the first is used as a source of information for producing the content of the second one. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="isSubdivisionOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isSubdivisionOfTransitive"></a> Property: is subdivision of transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isSubdivisionOfTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isSubdivisionOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isSubdivisionOfTransitive">isSubdivisionOfTransitive</a> | Connects a Group to the Group it is a direct or indirect subdivision of. This is a transitive relation. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="isSubeventOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isSubeventOfTransitive"></a> Property: is subevent of transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isSubeventOfTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isSubeventOfTransitive" title="https://www.ica.org/standards/RiC/ontology#isSubeventOfTransitive">isSubeventOfTransitive</a> | Connects an ongoing Event to an Event of which it is a direct or indirect part. This is a transitive relation. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="isSubordinateToTransitive" title="https://www.ica.org/standards/RiC/ontology#isSubordinateToTransitive"></a> Property: is subordinate to transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isSubordinateToTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isSubordinateToTransitive" title="https://www.ica.org/standards/RiC/ontology#isSubordinateToTransitive">isSubordinateToTransitive</a> | Connects an Agent to an Agent that is directly or indirectly hierarchically superior. This is a transitive relation. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isSuccessorOf" title="https://www.ica.org/standards/RiC/ontology#isSuccessorOf"></a> Property: is successor of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isSuccessorOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isSuccessorOf" title="https://www.ica.org/standards/RiC/ontology#isSuccessorOf">isSuccessorOf</a> | Inverse of 'has successor' object property. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="isTitleTypeOf" title="https://www.ica.org/standards/RiC/ontology#isTitleTypeOf"></a> Property: is title type of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isTitleTypeOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isTitleTypeOf" title="https://www.ica.org/standards/RiC/ontology#isTitleTypeOf">isTitleTypeOf</a> | Connects a Title Type and a Title that it categorizes. | <a href="#Title" title="https://www.ica.org/standards/RiC/ontology#Title">Title</a> | <a href="#TitleType" title="https://www.ica.org/standards/RiC/ontology#TitleType">Title Type</a> |
### <a id="isToUseDateOf" title="https://www.ica.org/standards/RiC/ontology#isToUseDateOf"></a> Property: is to use date of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isToUseDateOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isToUseDateOf" title="https://www.ica.org/standards/RiC/ontology#isToUseDateOf">isToUseDateOf</a> | Connects a Date to an Appellation, when it is the date till which the Appellation was used. | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="isUnitOfMeasurementOf" title="https://www.ica.org/standards/RiC/ontology#isUnitOfMeasurementOf"></a> Property: is unit of measurement of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isUnitOfMeasurementOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isUnitOfMeasurementOf" title="https://www.ica.org/standards/RiC/ontology#isUnitOfMeasurementOf">isUnitOfMeasurementOf</a> | Inverse of 'has unit of measurement' object property. | <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> | <a href="#UnitOfMeasurement" title="https://www.ica.org/standards/RiC/ontology#UnitOfMeasurement">Unit Of Measurement</a> |
### <a id="isWithin" title="https://www.ica.org/standards/RiC/ontology#isWithin"></a> Property: is within <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#isWithin)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#isWithin" title="https://www.ica.org/standards/RiC/ontology#isWithin">isWithin</a> | Connects a Date to a Date in which it is contained. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="issuedBy" title="https://www.ica.org/standards/RiC/ontology#issuedBy"></a> Property: issued by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#issuedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#issuedBy" title="https://www.ica.org/standards/RiC/ontology#issuedBy">issuedBy</a> | Connects a Rule to the Agent that issued or published the Rule. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |
### <a id="knownBy" title="https://www.ica.org/standards/RiC/ontology#knownBy"></a> Property: known by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#knownBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#knownBy" title="https://www.ica.org/standards/RiC/ontology#knownBy">knownBy</a> | Inverse of 'knows of' object property. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="knows" title="https://www.ica.org/standards/RiC/ontology#knows"></a> Property: knows <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#knows)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#knows" title="https://www.ica.org/standards/RiC/ontology#knows">knows</a> | Connects two Persons that directly know each other during their existence. This relation is symmetric. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="knowsOf" title="https://www.ica.org/standards/RiC/ontology#knowsOf"></a> Property: knows of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#knowsOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#knowsOf" title="https://www.ica.org/standards/RiC/ontology#knowsOf">knowsOf</a> | Connects a Person to another Person they have some knowledge of through time or space. | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="lastModificationDate" title="https://www.ica.org/standards/RiC/ontology#lastModificationDate"></a> Property: last modification date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#lastModificationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#lastModificationDate" title="https://www.ica.org/standards/RiC/ontology#lastModificationDate">lastModificationDate</a> | Date at which an entity was last updated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="latitude" title="https://www.ica.org/standards/RiC/ontology#latitude"></a> Property: latitude <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#latitude)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#latitude" title="https://www.ica.org/standards/RiC/ontology#latitude">latitude</a> | Distance in degrees north or south of the equator. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Coordinates" title="https://www.ica.org/standards/RiC/ontology#Coordinates">Coordinates</a> |
### <a id="leadershipWithPosition" title="https://www.ica.org/standards/RiC/ontology#leadershipWithPosition"></a> Property: leadership with position <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#leadershipWithPosition)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#leadershipWithPosition" title="https://www.ica.org/standards/RiC/ontology#leadershipWithPosition">leadershipWithPosition</a> | Connects a Leadership Relation to the Position occupied by the leading Person. | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> | <a href="#LeadershipRelation" title="https://www.ica.org/standards/RiC/ontology#LeadershipRelation">Leadership Relation</a> |
### <a id="length" title="https://www.ica.org/standards/RiC/ontology#length"></a> Property: length <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#length)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#length" title="https://www.ica.org/standards/RiC/ontology#length">length</a> | Length of an entity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="location" title="https://www.ica.org/standards/RiC/ontology#location"></a> Property: location <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#location)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#location" title="https://www.ica.org/standards/RiC/ontology#location">location</a> | A delimitation of the physical territory of a Place. Used to describe basic human-readable text such as an address, a cadastral reference, or less precise information found in a Record. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="longitude" title="https://www.ica.org/standards/RiC/ontology#longitude"></a> Property: longitude <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#longitude)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#longitude" title="https://www.ica.org/standards/RiC/ontology#longitude">longitude</a> | Distance in degrees east or west of a prime meridian. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Coordinates" title="https://www.ica.org/standards/RiC/ontology#Coordinates">Coordinates</a> |
### <a id="measure" title="https://www.ica.org/standards/RiC/ontology#measure"></a> Property: measure <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#measure)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#measure" title="https://www.ica.org/standards/RiC/ontology#measure">measure</a> | The extent, quantity, amount, or degree of an entity, as determined by measurement or calculation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="membershipWithPosition" title="https://www.ica.org/standards/RiC/ontology#membershipWithPosition"></a> Property: membership with position <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#membershipWithPosition)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#membershipWithPosition" title="https://www.ica.org/standards/RiC/ontology#membershipWithPosition">membershipWithPosition</a> | Connects a Membership Relation to the Position occupied by the member Person(s). | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> | <a href="#MembershipRelation" title="https://www.ica.org/standards/RiC/ontology#MembershipRelation">Membership Relation</a> |
### <a id="migratedFrom" title="https://www.ica.org/standards/RiC/ontology#migratedFrom"></a> Property: migrated from <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#migratedFrom)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#migratedFrom" title="https://www.ica.org/standards/RiC/ontology#migratedFrom">migratedFrom</a> | Inverse of 'migrated into' object property. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="migratedInto" title="https://www.ica.org/standards/RiC/ontology#migratedInto"></a> Property: migrated into <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#migratedInto)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#migratedInto" title="https://www.ica.org/standards/RiC/ontology#migratedInto">migratedInto</a> | Connects an Instantiation to a version it has been migrated into. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="migrationDate" title="https://www.ica.org/standards/RiC/ontology#migrationDate"></a> Property: migration date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#migrationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#migrationDate" title="https://www.ica.org/standards/RiC/ontology#migrationDate">migrationDate</a> | Date at which an Instantiation was or will be migrated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="modificationDate" title="https://www.ica.org/standards/RiC/ontology#modificationDate"></a> Property: modification date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#modificationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#modificationDate" title="https://www.ica.org/standards/RiC/ontology#modificationDate">modificationDate</a> | Date of the modification of an entity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="mostMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#mostMembersWithAccumulationDate"></a> Property: most members with accumulation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#mostMembersWithAccumulationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#mostMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#mostMembersWithAccumulationDate">mostMembersWithAccumulationDate</a> | Date at which most of the present or past members of a Record Set were or will be accumulated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="mostMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#mostMembersWithCreationDate"></a> Property: most members with creation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#mostMembersWithCreationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#mostMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#mostMembersWithCreationDate">mostMembersWithCreationDate</a> | Date at which most of the present or past members of a Record Set were or will be created. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="name" title="https://www.ica.org/standards/RiC/ontology#name"></a> Property: name <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#name)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#name" title="https://www.ica.org/standards/RiC/ontology#name">name</a> | A label, title or term designating an entity in order to make it distinguishable from other similar entities. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="normalizedDateValue" title="https://www.ica.org/standards/RiC/ontology#normalizedDateValue"></a> Property: normalized date value <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#normalizedDateValue)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#normalizedDateValue" title="https://www.ica.org/standards/RiC/ontology#normalizedDateValue">normalizedDateValue</a> | Machine readable representation of the date based on a public technical standard. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="normalizedValue" title="https://www.ica.org/standards/RiC/ontology#normalizedValue"></a> Property: normalized value <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#normalizedValue)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#normalizedValue" title="https://www.ica.org/standards/RiC/ontology#normalizedValue">normalizedValue</a> | Value representation based on a standard, preferably machine-readable. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a>, <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> |
### <a id="note" title="https://www.ica.org/standards/RiC/ontology#note"></a> Property: note <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#note)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#note" title="https://www.ica.org/standards/RiC/ontology#note">note</a> | A short textual statement, that gives a little information on a specific feature of a Thing. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="occupiesOrOccupied" title="https://www.ica.org/standards/RiC/ontology#occupiesOrOccupied"></a> Property: occupies or occupied <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#occupiesOrOccupied)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#occupiesOrOccupied" title="https://www.ica.org/standards/RiC/ontology#occupiesOrOccupied">occupiesOrOccupied</a> | Connects a Person to a Position they occupy or occupied. | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="occurredAtDate" title="https://www.ica.org/standards/RiC/ontology#occurredAtDate"></a> Property: occurred at date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#occurredAtDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#occurredAtDate" title="https://www.ica.org/standards/RiC/ontology#occurredAtDate">occurredAtDate</a> | Inverse of 'is date of occurrence of' object property. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="overlapsOrOverlapped" title="https://www.ica.org/standards/RiC/ontology#overlapsOrOverlapped"></a> Property: overlaps or overlapped <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#overlapsOrOverlapped)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#overlapsOrOverlapped" title="https://www.ica.org/standards/RiC/ontology#overlapsOrOverlapped">overlapsOrOverlapped</a> | Connects two Places that geographically overlap or overlapped. This relation is symmetric. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="performsOrPerformed" title="https://www.ica.org/standards/RiC/ontology#performsOrPerformed"></a> Property: performs or performed <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#performsOrPerformed)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#performsOrPerformed" title="https://www.ica.org/standards/RiC/ontology#performsOrPerformed">performsOrPerformed</a> | Inverse of 'is or was performed by' object property. | <a href="#Activity" title="https://www.ica.org/standards/RiC/ontology#Activity">Activity</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="physicalCharacteristicsNote" title="https://www.ica.org/standards/RiC/ontology#physicalCharacteristicsNote"></a> Property: physical characteristics note <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#physicalCharacteristicsNote)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#physicalCharacteristicsNote" title="https://www.ica.org/standards/RiC/ontology#physicalCharacteristicsNote">physicalCharacteristicsNote</a> | Information about the physical features, completeness, or conservation status of an Instantiation. Includes information about the physical nature and condition such as conservation status or the deterioration of an Instantiation (for example its carrier) affecting the ability to recover information.  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="physicalOrLogicalExtent" title="https://www.ica.org/standards/RiC/ontology#physicalOrLogicalExtent"></a> Property: physical or logical extent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#physicalOrLogicalExtent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#physicalOrLogicalExtent" title="https://www.ica.org/standards/RiC/ontology#physicalOrLogicalExtent">physicalOrLogicalExtent</a> | Countable characteristics of the content of an entity expressed as a quantity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="positionIsContextOfLeadershipRelation" title="https://www.ica.org/standards/RiC/ontology#positionIsContextOfLeadershipRelation"></a> Property: position is context of leadership relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#positionIsContextOfLeadershipRelation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#positionIsContextOfLeadershipRelation" title="https://www.ica.org/standards/RiC/ontology#positionIsContextOfLeadershipRelation">positionIsContextOfLeadershipRelation</a> | Connects a Position to a Leadership Relation (the leading Person occupies that Position). | <a href="#LeadershipRelation" title="https://www.ica.org/standards/RiC/ontology#LeadershipRelation">Leadership Relation</a> | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |
### <a id="positionIsContextOfMembershipRelation" title="https://www.ica.org/standards/RiC/ontology#positionIsContextOfMembershipRelation"></a> Property: position is context of membership relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#positionIsContextOfMembershipRelation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#positionIsContextOfMembershipRelation" title="https://www.ica.org/standards/RiC/ontology#positionIsContextOfMembershipRelation">positionIsContextOfMembershipRelation</a> | Connects a Position to a Membership Relation (the member Person occupies that Position). | <a href="#MembershipRelation" title="https://www.ica.org/standards/RiC/ontology#MembershipRelation">Membership Relation</a> | <a href="#Position" title="https://www.ica.org/standards/RiC/ontology#Position">Position</a> |
### <a id="precededInSequence" title="https://www.ica.org/standards/RiC/ontology#precededInSequence"></a> Property: preceded in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#precededInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#precededInSequence" title="https://www.ica.org/standards/RiC/ontology#precededInSequence">precededInSequence</a> | Connects a Thing to a Thing that followed it in some sequence (not necessarily defined or characterised chronologically) in the past. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="precedesInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#precedesInSequenceTransitive"></a> Property: precedes in sequence transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#precedesInSequenceTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#precedesInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#precedesInSequenceTransitive">precedesInSequenceTransitive</a> | Connects a Thing to a Thing that follows it directly or indirectly in some sequence (not necessarily defined or characterised chronologically). This is a transitive relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="precedesInTime" title="https://www.ica.org/standards/RiC/ontology#precedesInTime"></a> Property: precedes in time <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#precedesInTime)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#precedesInTime" title="https://www.ica.org/standards/RiC/ontology#precedesInTime">precedesInTime</a> | Connects a Thing to a Thing that follows it in chronological order. This is a transitive relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="precedesOrPreceded" title="https://www.ica.org/standards/RiC/ontology#precedesOrPreceded"></a> Property: precedes or preceded <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#precedesOrPreceded)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#precedesOrPreceded" title="https://www.ica.org/standards/RiC/ontology#precedesOrPreceded">precedesOrPreceded</a> | Connects a Thing to a Thing that follows or followed it in some sequence. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="precedesProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#precedesProxyInSequence"></a> Property: precedes proxy in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#precedesProxyInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#precedesProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#precedesProxyInSequence">precedesProxyInSequence</a> | Connects a Record Resource to a Proxy of a Record Resource that it precedes directly or indirectly in some sequence (not necessarily defined or characterised chronologically). | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="productionTechnique" title="https://www.ica.org/standards/RiC/ontology#productionTechnique"></a> Property: production technique <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#productionTechnique)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#productionTechnique" title="https://www.ica.org/standards/RiC/ontology#productionTechnique">productionTechnique</a> | The method used in the representation of information on an Instantiation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="proxyDirectlyFollowsInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyFollowsInSequence"></a> Property: proxy directly follows in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyDirectlyFollowsInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyDirectlyFollowsInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyFollowsInSequence">proxyDirectlyFollowsInSequence</a> | Inverse of 'directly precedes proxy in sequence' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyDirectlyFollowsProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyFollowsProxyInSequence"></a> Property: proxy directly follows proxy in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyDirectlyFollowsProxyInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyDirectlyFollowsProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyFollowsProxyInSequence">proxyDirectlyFollowsProxyInSequence</a> | Inverse of 'proxy directly precedes proxy in sequence' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyDirectlyIncludes" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyIncludes"></a> Property: proxy directly includes <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyDirectlyIncludes)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyDirectlyIncludes" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyIncludes">proxyDirectlyIncludes</a> | Inverse of 'is directly included in proxy' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyDirectlyIncludesProxy" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyIncludesProxy"></a> Property: proxy directly includes proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyDirectlyIncludesProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyDirectlyIncludesProxy" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyIncludesProxy">proxyDirectlyIncludesProxy</a> | Inverse of 'proxy is directly included in' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyDirectlyPrecedesInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyPrecedesInSequence"></a> Property: proxy directly precedes in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyDirectlyPrecedesInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyDirectlyPrecedesInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyPrecedesInSequence">proxyDirectlyPrecedesInSequence</a> | Connects a Proxy of a Record Resource to a Record Resource which it precedes directly in some sequence (not necessarily defined or characterised chronologically). | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyDirectlyPrecedesProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyPrecedesProxyInSequence"></a> Property: proxy directly precedes proxy in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyDirectlyPrecedesProxyInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyDirectlyPrecedesProxyInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyDirectlyPrecedesProxyInSequence">proxyDirectlyPrecedesProxyInSequence</a> | Connects a Proxy of a Record Resource to a Proxy of another Record Resource that it precedes directly in some sequence (not necessarily defined or characterised chronologically). | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyFollowsInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyFollowsInSequence"></a> Property: proxy follows in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyFollowsInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyFollowsInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyFollowsInSequence">proxyFollowsInSequence</a> | Inverse of 'precedes proxy in sequence' object property. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyFollowsProxyInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyFollowsProxyInSequenceTransitive"></a> Property: proxy follows proxy in sequence transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyFollowsProxyInSequenceTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyFollowsProxyInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyFollowsProxyInSequenceTransitive">proxyFollowsProxyInSequenceTransitive</a> | Inverse of 'proxy recedes proxy in sequence transitive' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyFor" title="https://www.ica.org/standards/RiC/ontology#proxyFor"></a> Property: proxy for <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyFor)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyFor" title="https://www.ica.org/standards/RiC/ontology#proxyFor">proxyFor</a> | Connects a Proxy to the Record Resource it stands for in the context of a specific Record Resource. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyHasConstituent" title="https://www.ica.org/standards/RiC/ontology#proxyHasConstituent"></a> Property: proxy has constituent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyHasConstituent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyHasConstituent" title="https://www.ica.org/standards/RiC/ontology#proxyHasConstituent">proxyHasConstituent</a> | Inverse of 'is constituent of proxy' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyHasConstituentProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyHasConstituentProxyTransitive"></a> Property: proxy has constituent proxy transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyHasConstituentProxyTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyHasConstituentProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyHasConstituentProxyTransitive">proxyHasConstituentProxyTransitive</a> | Inverse of 'proxy is constituent of proxy transitive' object property. This is a transitive relation. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyHasDirectConstituent" title="https://www.ica.org/standards/RiC/ontology#proxyHasDirectConstituent"></a> Property: proxy has direct constituent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyHasDirectConstituent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyHasDirectConstituent" title="https://www.ica.org/standards/RiC/ontology#proxyHasDirectConstituent">proxyHasDirectConstituent</a> | Inverse of 'is direct constituent of proxy' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyHasDirectConstituentProxy" title="https://www.ica.org/standards/RiC/ontology#proxyHasDirectConstituentProxy"></a> Property: proxy has direct constituent proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyHasDirectConstituentProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyHasDirectConstituentProxy" title="https://www.ica.org/standards/RiC/ontology#proxyHasDirectConstituentProxy">proxyHasDirectConstituentProxy</a> | Inverse of 'proxy is direct constituent of' object property. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyIn" title="https://www.ica.org/standards/RiC/ontology#proxyIn"></a> Property: proxy in <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyIn)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyIn" title="https://www.ica.org/standards/RiC/ontology#proxyIn">proxyIn</a> | Connects a Proxy to the Record Resource in which it stands for (represents) another Record Resource. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyInRecord" title="https://www.ica.org/standards/RiC/ontology#proxyInRecord"></a> Property: proxy in record <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyInRecord)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyInRecord" title="https://www.ica.org/standards/RiC/ontology#proxyInRecord">proxyInRecord</a> | Connects a Proxy to a Record in which it stands for (represents) a Record Part or another Record. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyInRecordSet" title="https://www.ica.org/standards/RiC/ontology#proxyInRecordSet"></a> Property: proxy in record set <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyInRecordSet)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyInRecordSet" title="https://www.ica.org/standards/RiC/ontology#proxyInRecordSet">proxyInRecordSet</a> | Connects a Proxy to a Record Set in which it stands for (represents) a Record or another Record Set. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyIncludes" title="https://www.ica.org/standards/RiC/ontology#proxyIncludes"></a> Property: proxy includes <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyIncludes)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyIncludes" title="https://www.ica.org/standards/RiC/ontology#proxyIncludes">proxyIncludes</a> | Inverse of 'is included in proxy' object property. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyIncludesProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyIncludesProxyTransitive"></a> Property: proxy includes proxy transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyIncludesProxyTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyIncludesProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyIncludesProxyTransitive">proxyIncludesProxyTransitive</a> | Inverse of 'proxy is included in proxy transitive' object property. This is a transitive relation. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyIsConstituentOf" title="https://www.ica.org/standards/RiC/ontology#proxyIsConstituentOf"></a> Property: proxy is constituent of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyIsConstituentOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyIsConstituentOf" title="https://www.ica.org/standards/RiC/ontology#proxyIsConstituentOf">proxyIsConstituentOf</a> | Connects a Proxy of a Record or Record Part to a Record or Record Part which it is a constituent of, directly or indirectly. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyIsConstituentOfProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyIsConstituentOfProxyTransitive"></a> Property: proxy is constituent of proxy transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyIsConstituentOfProxyTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyIsConstituentOfProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyIsConstituentOfProxyTransitive">proxyIsConstituentOfProxyTransitive</a> | Connects a Proxy of a Record or Record Part to a Proxy of another Record or Record Part which it is a constituent of, directly or indirectly. This is a transitive relation. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyIsDirectConstituentOf" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectConstituentOf"></a> Property: proxy is direct constituent of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyIsDirectConstituentOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyIsDirectConstituentOf" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectConstituentOf">proxyIsDirectConstituentOf</a> | Connects a Proxy of a Record or Record Part to another Record or Record Part which the first is a direct constituent of. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyIsDirectConstituentOfProxy" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectConstituentOfProxy"></a> Property: proxy is direct constituent of proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyIsDirectConstituentOfProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyIsDirectConstituentOfProxy" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectConstituentOfProxy">proxyIsDirectConstituentOfProxy</a> | Connects a Proxy of a Record or Record Part to a Proxy of another Record or Record Part of which the first is a direct constituent. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyIsDirectlyIncludedIn" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectlyIncludedIn"></a> Property: proxy is directly included in <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyIsDirectlyIncludedIn)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyIsDirectlyIncludedIn" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectlyIncludedIn">proxyIsDirectlyIncludedIn</a> | Connects a Proxy of a Record or Record Set to another Record Set which the first is directly included in. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyIsDirectlyIncludedInProxy" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectlyIncludedInProxy"></a> Property: proxy is directly included in proxy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyIsDirectlyIncludedInProxy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyIsDirectlyIncludedInProxy" title="https://www.ica.org/standards/RiC/ontology#proxyIsDirectlyIncludedInProxy">proxyIsDirectlyIncludedInProxy</a> | Connects a Proxy of a Record or Record Set to a Proxy of a Record Set which it is directly included in. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyIsIncludedIn" title="https://www.ica.org/standards/RiC/ontology#proxyIsIncludedIn"></a> Property: proxy is included in <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyIsIncludedIn)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyIsIncludedIn" title="https://www.ica.org/standards/RiC/ontology#proxyIsIncludedIn">proxyIsIncludedIn</a> | Connects a Proxy of a Record or Record Set to a Record Set which it is included in, directly or indirectly. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyIsIncludedInProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyIsIncludedInProxyTransitive"></a> Property: proxy is included in proxy transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyIsIncludedInProxyTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyIsIncludedInProxyTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyIsIncludedInProxyTransitive">proxyIsIncludedInProxyTransitive</a> | Connects a Proxy of a Record or Record Set to a Proxy of a Record Set which it is included in, directly or indirectly. This is a transitive relation. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyPrecedesInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyPrecedesInSequence"></a> Property: proxy precedes in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyPrecedesInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyPrecedesInSequence" title="https://www.ica.org/standards/RiC/ontology#proxyPrecedesInSequence">proxyPrecedesInSequence</a> | Connects a Proxy of a Record Resource to a Record Resource which the first precedes directly or indirectly in some sequence (not necessarily defined or characterised chronologically). | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="proxyPrecedesProxyInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyPrecedesProxyInSequenceTransitive"></a> Property: proxy precedes proxy in sequence transitive <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#proxyPrecedesProxyInSequenceTransitive)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#proxyPrecedesProxyInSequenceTransitive" title="https://www.ica.org/standards/RiC/ontology#proxyPrecedesProxyInSequenceTransitive">proxyPrecedesProxyInSequenceTransitive</a> | Connects a Proxy of a Record Resource to a Proxy of another Record Resource which directly or indirectly follows the first in some sequence (not necessarily defined or characterised chronologically). This is a transitive relation. | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> | <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="publicationDate" title="https://www.ica.org/standards/RiC/ontology#publicationDate"></a> Property: publication date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#publicationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#publicationDate" title="https://www.ica.org/standards/RiC/ontology#publicationDate">publicationDate</a> | Date of the publication, in the past or in the future, of a Record Resource. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="qualityOfRepresentationNote" title="https://www.ica.org/standards/RiC/ontology#qualityOfRepresentationNote"></a> Property: quality of representation note <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#qualityOfRepresentationNote)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#qualityOfRepresentationNote" title="https://www.ica.org/standards/RiC/ontology#qualityOfRepresentationNote">qualityOfRepresentationNote</a> | Characteristics of an Instantiation that affect the ability to recover the intellectual content. Such characteristics may be related to the methods used in creating the Instantiation or introduced subsequent to the creation through accident. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="quantity" title="https://www.ica.org/standards/RiC/ontology#quantity"></a> Property: quantity <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#quantity)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#quantity" title="https://www.ica.org/standards/RiC/ontology#quantity">quantity</a> | Machine-readable quantity. | schema:Number | <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> |
### <a id="rankInHierarchy" title="https://www.ica.org/standards/RiC/ontology#rankInHierarchy"></a> Property: rank in hierarchy <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#rankInHierarchy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#rankInHierarchy" title="https://www.ica.org/standards/RiC/ontology#rankInHierarchy">rankInHierarchy</a> | The rank of a Record Resource, or of a Proxy that stands for it, in a hierarchy. | schema:Integer | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a>, <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="rankInSequence" title="https://www.ica.org/standards/RiC/ontology#rankInSequence"></a> Property: rank in sequence <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#rankInSequence)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#rankInSequence" title="https://www.ica.org/standards/RiC/ontology#rankInSequence">rankInSequence</a> | The rank of a Record Resource, or of a Proxy that stands for it, in a sequence. | schema:Integer | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a>, <a href="#Proxy" title="https://www.ica.org/standards/RiC/ontology#Proxy">Proxy</a> |
### <a id="recordResourceExtent" title="https://www.ica.org/standards/RiC/ontology#recordResourceExtent"></a> Property: Record Resource Extent <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#recordResourceExtent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#recordResourceExtent" title="https://www.ica.org/standards/RiC/ontology#recordResourceExtent">recordResourceExtent</a> | The quantity of information content, as human experienced, contained in a Record Resource. The method and precision of expressing the quantity of information represented in a Record Resource will vary according to the kind of Record Resource being described, processing economy constraints, etc. For record sets, quantity may be expressed as number of records, or, for analogue records in particular, by the physical storage dimensions of the members of the Record Set. For individual records or record parts, quantity may be expressed in more precise terms.  | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="recordResourceHasSourceOfInformation" title="https://www.ica.org/standards/RiC/ontology#recordResourceHasSourceOfInformation"></a> Property: Record Resource has source of information <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#recordResourceHasSourceOfInformation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#recordResourceHasSourceOfInformation" title="https://www.ica.org/standards/RiC/ontology#recordResourceHasSourceOfInformation">recordResourceHasSourceOfInformation</a> | Connects a Record Resource to a Record Resource, when the second one is used as a source of information for producing the content of the first one. | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="recordResourceSourceOfInformation" title="https://www.ica.org/standards/RiC/ontology#recordResourceSourceOfInformation"></a> Property: Record Resource source of information <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#recordResourceSourceOfInformation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#recordResourceSourceOfInformation" title="https://www.ica.org/standards/RiC/ontology#recordResourceSourceOfInformation">recordResourceSourceOfInformation</a> | Information about some source on which the content of a Record Resource is based. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="recordResourceStructure" title="https://www.ica.org/standards/RiC/ontology#recordResourceStructure"></a> Property: Record Resource structure <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#recordResourceStructure)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#recordResourceStructure" title="https://www.ica.org/standards/RiC/ontology#recordResourceStructure">recordResourceStructure</a> | Information about the intellectual arrangement and composition of a Record Resource. For Record and Record Part, it encompasses information about the intellectual composition of the record, the presence of record parts and their functions. For Record Set, it encompasses information about the methodology or criteria used for arranging the Record Set members or Record members within the containing Record Set | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="referenceSystem" title="https://www.ica.org/standards/RiC/ontology#referenceSystem"></a> Property: reference system <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#referenceSystem)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#referenceSystem" title="https://www.ica.org/standards/RiC/ontology#referenceSystem">referenceSystem</a> | Framework or standard used to represent an information. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="regulatesOrRegulated" title="https://www.ica.org/standards/RiC/ontology#regulatesOrRegulated"></a> Property: regulates or regulated <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#regulatesOrRegulated)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#regulatesOrRegulated" title="https://www.ica.org/standards/RiC/ontology#regulatesOrRegulated">regulatesOrRegulated</a> | Connects a Rule to a Thing that it regulates or regulated. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |
### <a id="relationCertainty" title="https://www.ica.org/standards/RiC/ontology#relationCertainty"></a> Property: relation certainty <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#relationCertainty)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#relationCertainty" title="https://www.ica.org/standards/RiC/ontology#relationCertainty">relationCertainty</a> | Qualifies the level of certitude of the accuracy of a Relation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |
### <a id="relationConnects" title="https://www.ica.org/standards/RiC/ontology#relationConnects"></a> Property: relation connects <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#relationConnects)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#relationConnects" title="https://www.ica.org/standards/RiC/ontology#relationConnects">relationConnects</a> | Connects an n-ary Relation to any of the Things involved. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |
### <a id="relationHasContext" title="https://www.ica.org/standards/RiC/ontology#relationHasContext"></a> Property: relation has context <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#relationHasContext)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#relationHasContext" title="https://www.ica.org/standards/RiC/ontology#relationHasContext">relationHasContext</a> | Connects an n-ary Relation to a Thing that is a secondary, contextual entity during the existence of the Relation. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |
### <a id="relationHasDate" title="https://www.ica.org/standards/RiC/ontology#relationHasDate"></a> Property: relation has date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#relationHasDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#relationHasDate" title="https://www.ica.org/standards/RiC/ontology#relationHasDate">relationHasDate</a> | Connects an n-ary Relation to a Date. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |
### <a id="relationHasSource" title="https://www.ica.org/standards/RiC/ontology#relationHasSource"></a> Property: relation has source <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#relationHasSource)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#relationHasSource" title="https://www.ica.org/standards/RiC/ontology#relationHasSource">relationHasSource</a> | Connects an n-ary Relation to a Thing that is its source. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |
### <a id="relationHasTarget" title="https://www.ica.org/standards/RiC/ontology#relationHasTarget"></a> Property: relation has target <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#relationHasTarget)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#relationHasTarget" title="https://www.ica.org/standards/RiC/ontology#relationHasTarget">relationHasTarget</a> | Connects an n-ary Relation to a Thing that is its target. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |
### <a id="relationSource" title="https://www.ica.org/standards/RiC/ontology#relationSource"></a> Property: relation source <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#relationSource)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#relationSource" title="https://www.ica.org/standards/RiC/ontology#relationSource">relationSource</a> | A source of information used for identifying and describing a Relation. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |
### <a id="relationState" title="https://www.ica.org/standards/RiC/ontology#relationState"></a> Property: relation state <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#relationState)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#relationState" title="https://www.ica.org/standards/RiC/ontology#relationState">relationState</a> | Used to qualify the state of a Relation (e. g. present, past, ongoing, unknown). | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> |
### <a id="resultedFromTheMergerOf" title="https://www.ica.org/standards/RiC/ontology#resultedFromTheMergerOf"></a> Property: resulted from the merger of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#resultedFromTheMergerOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#resultedFromTheMergerOf" title="https://www.ica.org/standards/RiC/ontology#resultedFromTheMergerOf">resultedFromTheMergerOf</a> | Inverse of 'was merged into' object property. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> |
### <a id="resultedFromTheSplitOf" title="https://www.ica.org/standards/RiC/ontology#resultedFromTheSplitOf"></a> Property: resulted from the split of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#resultedFromTheSplitOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#resultedFromTheSplitOf" title="https://www.ica.org/standards/RiC/ontology#resultedFromTheSplitOf">resultedFromTheSplitOf</a> | Inverse of 'was split into' object property. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> |
### <a id="resultsOrResultedFrom" title="https://www.ica.org/standards/RiC/ontology#resultsOrResultedFrom"></a> Property: results or resulted from <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#resultsOrResultedFrom)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#resultsOrResultedFrom" title="https://www.ica.org/standards/RiC/ontology#resultsOrResultedFrom">resultsOrResultedFrom</a> | Inverse of 'results or resulted in' object property. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="resultsOrResultedIn" title="https://www.ica.org/standards/RiC/ontology#resultsOrResultedIn"></a> Property: results or resulted in <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#resultsOrResultedIn)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#resultsOrResultedIn" title="https://www.ica.org/standards/RiC/ontology#resultsOrResultedIn">resultsOrResultedIn</a> | Connects an Event to a Thing that results or resulted from the Event. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="roleIsContextOfCreationRelation" title="https://www.ica.org/standards/RiC/ontology#roleIsContextOfCreationRelation"></a> Property: role is context of creation relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#roleIsContextOfCreationRelation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#roleIsContextOfCreationRelation" title="https://www.ica.org/standards/RiC/ontology#roleIsContextOfCreationRelation">roleIsContextOfCreationRelation</a> | Connects a Role Type to a Creation Relation (this Role Type being the specific role played by the creating Person in the context of this Relation). | <a href="#CreationRelation" title="https://www.ica.org/standards/RiC/ontology#CreationRelation">Creation Relation</a> | <a href="#RoleType" title="https://www.ica.org/standards/RiC/ontology#RoleType">Role Type</a> |
### <a id="ruleFollowed" title="https://www.ica.org/standards/RiC/ontology#ruleFollowed"></a> Property: rule followed <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#ruleFollowed)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#ruleFollowed" title="https://www.ica.org/standards/RiC/ontology#ruleFollowed">ruleFollowed</a> | The rule or conditions that govern the existence or lifecycle of a Thing. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="scopeAndContent" title="https://www.ica.org/standards/RiC/ontology#scopeAndContent"></a> Property: scope and content <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#scopeAndContent)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#scopeAndContent" title="https://www.ica.org/standards/RiC/ontology#scopeAndContent">scopeAndContent</a> | Summary of the scope (such as time periods, geography) and content (such as subject matter, administrative processes) of a Record Resource. Provides a more complete summary of the informational content of the Record Resource highlighting the information conveyed in the Record Resource, why it was created, received, and/or maintained, and the agents connected to it. It may include description of relations with agents, activities, dates and places, or with other record resources. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="sentimentOrEmotionExpressed" title="https://www.ica.org/standards/RiC/ontology#sentimentOrEmotionExpressed"></a> Property: sentiment or emotion expressed <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#sentimentOrEmotionExpressed)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#sentimentOrEmotionExpressed" title="https://www.ica.org/standards/RiC/ontology#sentimentOrEmotionExpressed">sentimentOrEmotionExpressed</a> | Specification of, or information about, the sentiment(s) or emotion(s) expressed by the content of a Record or a Record Part. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="someMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#someMembersWithAccumulationDate"></a> Property: some members with accumulation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#someMembersWithAccumulationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#someMembersWithAccumulationDate" title="https://www.ica.org/standards/RiC/ontology#someMembersWithAccumulationDate">someMembersWithAccumulationDate</a> | Date at which some of the present or past members of a Record Set were or will be accumulated. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="someMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#someMembersWithCreationDate"></a> Property: some members with creation date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#someMembersWithCreationDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#someMembersWithCreationDate" title="https://www.ica.org/standards/RiC/ontology#someMembersWithCreationDate">someMembersWithCreationDate</a> | Date at which some of the present or past members of a Record Set were or will be created. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="structure" title="https://www.ica.org/standards/RiC/ontology#structure"></a> Property: structure <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#structure)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#structure" title="https://www.ica.org/standards/RiC/ontology#structure">structure</a> | Information about the intellectual arrangement and composition of a Record Resource or the physical arrangement and composition of an Instantiation. For Record and Record Part, it encompasses information about the intellectual composition of the record, the presence of record parts and their functions. For Record Set, it encompasses information about the methodology or criteria used for arranging the Record Set members or Record members within the containing Record Set. For Instantiation, it may comprise information about the composition of the physical elements of the instantiation | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a> |
### <a id="studiesOrStudiedAt" title="https://www.ica.org/standards/RiC/ontology#studiesOrStudiedAt"></a> Property: studies or studied at <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#studiesOrStudiedAt)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#studiesOrStudiedAt" title="https://www.ica.org/standards/RiC/ontology#studiesOrStudiedAt">studiesOrStudiedAt</a> | Connects a Person to an educational institution at which they studied or study. Both 'institution' and 'at' can be interpreted broadly. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Person" title="https://www.ica.org/standards/RiC/ontology#Person">Person</a> |
### <a id="technicalCharacteristics" title="https://www.ica.org/standards/RiC/ontology#technicalCharacteristics"></a> Property: technical characteristics <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#technicalCharacteristics)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#technicalCharacteristics" title="https://www.ica.org/standards/RiC/ontology#technicalCharacteristics">technicalCharacteristics</a> | Describes any relevant physical or software feature of any device involved in the creation or management of a Record Resource. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Mechanism" title="https://www.ica.org/standards/RiC/ontology#Mechanism">Mechanism</a> |
### <a id="textualValue" title="https://www.ica.org/standards/RiC/ontology#textualValue"></a> Property: textual value <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#textualValue)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#textualValue" title="https://www.ica.org/standards/RiC/ontology#textualValue">textualValue</a> | A textual expression of an Appellation or Date. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a>, <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a>, <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> |
### <a id="thingIsConnectedToRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsConnectedToRelation"></a> Property: thing is connected to relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#thingIsConnectedToRelation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#thingIsConnectedToRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsConnectedToRelation">thingIsConnectedToRelation</a> | Connects a Thing to an n-ary Relation. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="thingIsContextOfRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsContextOfRelation"></a> Property: thing is context of relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#thingIsContextOfRelation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#thingIsContextOfRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsContextOfRelation">thingIsContextOfRelation</a> | Connects a Thing (that is a secondary, contextual entity during the existence of the Relation) to an n-ary Relation. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="thingIsSourceOfRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsSourceOfRelation"></a> Property: thing is source of relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#thingIsSourceOfRelation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#thingIsSourceOfRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsSourceOfRelation">thingIsSourceOfRelation</a> | Connects a Thing (that is the source of a Relation) to a Relation. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="thingIsTargetOfRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsTargetOfRelation"></a> Property: thing is target of relation <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#thingIsTargetOfRelation)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#thingIsTargetOfRelation" title="https://www.ica.org/standards/RiC/ontology#thingIsTargetOfRelation">thingIsTargetOfRelation</a> | Connects a Thing (that is the target of a Relation) to an n-ary Relation. | <a href="#Relation" title="https://www.ica.org/standards/RiC/ontology#Relation">Relation</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="title" title="https://www.ica.org/standards/RiC/ontology#title"></a> Property: title <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#title)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#title" title="https://www.ica.org/standards/RiC/ontology#title">title</a> | An identifying name of a Record Resource, Instantiation or Rule. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a>, <a href="#RecordResource" title="https://www.ica.org/standards/RiC/ontology#RecordResource">Record Resource</a>, <a href="#Rule" title="https://www.ica.org/standards/RiC/ontology#Rule">Rule</a> |
### <a id="type" title="https://www.ica.org/standards/RiC/ontology#type"></a> Property: type <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#type)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#type" title="https://www.ica.org/standards/RiC/ontology#type">type</a> | A term used to characterize an entity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="unitOfMeasurement" title="https://www.ica.org/standards/RiC/ontology#unitOfMeasurement"></a> Property: unit of measurement <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#unitOfMeasurement)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#unitOfMeasurement" title="https://www.ica.org/standards/RiC/ontology#unitOfMeasurement">unitOfMeasurement</a> | A definite magnitude of a quantity, defined and adopted by convention or by law, that is used as a standard for measurement of the same kind of quantity. Can be spacial units (cm, m), weight (g, kg), time (s, h), storage (MB, TB) or more informal units used in the archival context like number of boxes, pages or words. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Extent" title="https://www.ica.org/standards/RiC/ontology#Extent">Extent</a> |
### <a id="usedFromDate" title="https://www.ica.org/standards/RiC/ontology#usedFromDate"></a> Property: used from date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#usedFromDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#usedFromDate" title="https://www.ica.org/standards/RiC/ontology#usedFromDate">usedFromDate</a> | Date at which an Appellation was first used. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a> |
### <a id="usedToDate" title="https://www.ica.org/standards/RiC/ontology#usedToDate"></a> Property: used to date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#usedToDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#usedToDate" title="https://www.ica.org/standards/RiC/ontology#usedToDate">usedToDate</a> | Date until an Appellation was used. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a> |
### <a id="wasComponentOf" title="https://www.ica.org/standards/RiC/ontology#wasComponentOf"></a> Property: was component of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasComponentOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasComponentOf" title="https://www.ica.org/standards/RiC/ontology#wasComponentOf">wasComponentOf</a> | Connects an Instantiation to another Instantiation of which it was a component in the past. | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> | <a href="#Instantiation" title="https://www.ica.org/standards/RiC/ontology#Instantiation">Instantiation</a> |
### <a id="wasConstituentOf" title="https://www.ica.org/standards/RiC/ontology#wasConstituentOf"></a> Property: was constituent of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasConstituentOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasConstituentOf" title="https://www.ica.org/standards/RiC/ontology#wasConstituentOf">wasConstituentOf</a> | Connects a Record or Record Part to another Record or Record Part of which it was a constituent in the past. | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordPart" title="https://www.ica.org/standards/RiC/ontology#RecordPart">Record Part</a> |
### <a id="wasContainedBy" title="https://www.ica.org/standards/RiC/ontology#wasContainedBy"></a> Property: was contained by <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasContainedBy)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasContainedBy" title="https://www.ica.org/standards/RiC/ontology#wasContainedBy">wasContainedBy</a> | Connects a Place to a Place within which it was contained. | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> | <a href="#Place" title="https://www.ica.org/standards/RiC/ontology#Place">Place</a> |
### <a id="wasIncludedIn" title="https://www.ica.org/standards/RiC/ontology#wasIncludedIn"></a> Property: was included in <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasIncludedIn)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasIncludedIn" title="https://www.ica.org/standards/RiC/ontology#wasIncludedIn">wasIncludedIn</a> | Connects a Record to a Record or Record Set in which it was included in the past. | <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> | <a href="#Record" title="https://www.ica.org/standards/RiC/ontology#Record">Record</a>, <a href="#RecordSet" title="https://www.ica.org/standards/RiC/ontology#RecordSet">Record Set</a> |
### <a id="wasLastUpdatedAtDate" title="https://www.ica.org/standards/RiC/ontology#wasLastUpdatedAtDate"></a> Property: was last updated at date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasLastUpdatedAtDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasLastUpdatedAtDate" title="https://www.ica.org/standards/RiC/ontology#wasLastUpdatedAtDate">wasLastUpdatedAtDate</a> | Connects a Thing to the Date when it was last modified. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="wasMergedInto" title="https://www.ica.org/standards/RiC/ontology#wasMergedInto"></a> Property: was merged into <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasMergedInto)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasMergedInto" title="https://www.ica.org/standards/RiC/ontology#wasMergedInto">wasMergedInto</a> | Connects a Corporate Body to another Corporate Body that is the result of a merger of the previous one with one to many other corporate bodies. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> |
### <a id="wasPartOf" title="https://www.ica.org/standards/RiC/ontology#wasPartOf"></a> Property: was part of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasPartOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasPartOf" title="https://www.ica.org/standards/RiC/ontology#wasPartOf">wasPartOf</a> | Connects a Thing to a Thing of which it was a constitutive or component part in the past. | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
### <a id="wasSplitInto" title="https://www.ica.org/standards/RiC/ontology#wasSplitInto"></a> Property: was split into <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasSplitInto)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasSplitInto" title="https://www.ica.org/standards/RiC/ontology#wasSplitInto">wasSplitInto</a> | Connects a Corporate Body to one of the Corporate Bodies that results from the split of the previous one into two to many corporate bodies. | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> | <a href="#CorporateBody" title="https://www.ica.org/standards/RiC/ontology#CorporateBody">Corporate Body</a> |
### <a id="wasSubdivisionOf" title="https://www.ica.org/standards/RiC/ontology#wasSubdivisionOf"></a> Property: was subdivision of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasSubdivisionOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasSubdivisionOf" title="https://www.ica.org/standards/RiC/ontology#wasSubdivisionOf">wasSubdivisionOf</a> | Connects a subdivision to the Group it was a part of in the past. | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> | <a href="#Group" title="https://www.ica.org/standards/RiC/ontology#Group">Group</a> |
### <a id="wasSubeventOf" title="https://www.ica.org/standards/RiC/ontology#wasSubeventOf"></a> Property: was subevent of <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasSubeventOf)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasSubeventOf" title="https://www.ica.org/standards/RiC/ontology#wasSubeventOf">wasSubeventOf</a> | Connects a past Event to the broader Event of which it was a part. | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> | <a href="#Event" title="https://www.ica.org/standards/RiC/ontology#Event">Event</a> |
### <a id="wasSubordinateTo" title="https://www.ica.org/standards/RiC/ontology#wasSubordinateTo"></a> Property: was subordinate to <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasSubordinateTo)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasSubordinateTo" title="https://www.ica.org/standards/RiC/ontology#wasSubordinateTo">wasSubordinateTo</a> | Connects an Agent to an Agent that was hierarchically superior in the past. | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> | <a href="#Agent" title="https://www.ica.org/standards/RiC/ontology#Agent">Agent</a> |
### <a id="wasUsedFromDate" title="https://www.ica.org/standards/RiC/ontology#wasUsedFromDate"></a> Property: was used from date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasUsedFromDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasUsedFromDate" title="https://www.ica.org/standards/RiC/ontology#wasUsedFromDate">wasUsedFromDate</a> | Connects an Appellation to the Date from which it was used. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a> |
### <a id="wasUsedToDate" title="https://www.ica.org/standards/RiC/ontology#wasUsedToDate"></a> Property: was used to date <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#wasUsedToDate)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#wasUsedToDate" title="https://www.ica.org/standards/RiC/ontology#wasUsedToDate">wasUsedToDate</a> | Connects an Appellation to the Date till when it was used. | <a href="#Date" title="https://www.ica.org/standards/RiC/ontology#Date">Date</a> | <a href="#Appellation" title="https://www.ica.org/standards/RiC/ontology#Appellation">Appellation</a> |
### <a id="width" title="https://www.ica.org/standards/RiC/ontology#width"></a> Property: width <small style="color:#aaa">(https://www.ica.org/standards/RiC/ontology#width)</small>

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#width" title="https://www.ica.org/standards/RiC/ontology#width">width</a> | Horizontal dimension of an entity. | <a href="http://www.w3.org/2000/01/rdf-schema#Literal" title="http://www.w3.org/2000/01/rdf-schema#Literal" target="_blank" rel="noopener">Literal</a> | <a href="#Thing" title="https://www.ica.org/standards/RiC/ontology#Thing">Thing</a> |
## Property Values

No PropertyValue entities are defined.


