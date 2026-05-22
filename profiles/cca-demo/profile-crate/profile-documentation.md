# Climate Change Adaptation RO-Crate Profile (Demo)

> **Note:** This is a demo/work-in-progress adaptation of Stian Soiland-Reyes'
> ["Scruffy" CCA profile](https://github.com/FAIR2Adapt/cca-crate-profile/pull/2)
> for use as a MASP profile. See [issue #17](https://github.com/Language-Research-Technology/ro-crate-masp/issues/17).

Fair2Adapt project uses RO-Crates for implementing and exchanging FAIR Digital
Objects (FDOs) for Climate Change Adaptation (CCA) research, and defines the CCA
RO-Crate profile to define the set of conventions, types and properties that one
can minimally require and expect to be present in that subset of RO-Crates.

The CCA RO-Crates are a specialization of RO-Crate for packaging key common data
and contextual entities used/produced during the research lifecycle in climate
change adaptation domain. This includes all the metadata properties expected to
be captured and exposed about these resources to enable FAIR discovery, access
and reuse.

Profile URI: <https://w3id.org/cc-crate-profile/0.9>

Source: <https://github.com/FAIR2Adapt/cca-crate-profile>

## Introduction

The FAIR2Adapt is a multidisciplinary project geared towards transforming data
into actionable knowledge to shape climate adaptation strategies. We adopt FAIR
Digital Objects (FDOs) by using RO-Crate and other complementary technologies
(like nanopublications, I-Adopt framework) and use tailored FDO services to
build a collaborative, user-friendly FAIR and open data sharing framework.

## Conformance

RO-Crates conforming to (or intending to conform to) the CCA profile **SHOULD**
declare this using `conformsTo` on the Root Data Entity:

```json
{
    "@id": "./",
    "@type": "Dataset",
    "conformsTo": {
        "@id": "https://w3id.org/cc-crate-profile/0.9"
    }
}
```

## CCA-Specific Terms

The profile defines a CCA extension vocabulary at
<https://w3id.org/ro/terms/cca/> with the following classes and properties:

## Types of entities (specializations of Classes) and expected Properties


### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork"></a> Class: Network

Defines the Network contextual entity in the metadata model.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FaverageDataCost">averageDataCost</a> | No | Average data costs. | [Number](https://schema.org/Number) |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FaverageNetworkCost">averageNetworkCost</a> | No | Average infrastructure costs. | [Number](https://schema.org/Number) |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FIlicoIntegrationYear">IlicoIntegrationYear</a> | No | ILICO integration year. | [Integer](https://schema.org/Integer), [Date](https://schema.org/Date) |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FnetworkManager">networkManager</a> | No | Defines a relationship for Network Manager between metadata entities. | [Person](https://schema.org/Person) |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FscientificIssues">scientificIssues</a> | No | Research questions and objectives. | [Text](https://schema.org/Text) |  |


### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign"></a> Class: Campaign

Defines the Campaign contextual entity in the metadata model.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FequipmentFailure">equipmentFailure</a> | No | Justifications (sensor failures, etc.). | [Text](https://schema.org/Text) |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FequipmentUsed">equipmentUsed</a> | No | For example: glider, mooring, mastodon, CTD, coring. | [Text](https://schema.org/Text) |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasSatellite">hasSatellite</a> | No | Defines the relationship with the Satellite contextual entity in the metadata model. | [Satellite](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FSatellite) |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FmetadataFormat">metadataFormat</a> | No | Metadata format. | [Text](https://schema.org/Text) |  |


### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FSatellite"></a> Class: Satellite

Defines the Satellite contextual entity in the metadata model.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasMission">hasMission</a> | No | Campaign with DOI, mission name (e.g., Sentinel). | [Text](https://schema.org/Text) |  |

## All Properties

### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FacquisitionFrequency"></a> Property: acquisitionFrequency

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Average acquisition frequency. | [Text](https://schema.org/Text), [Duration](https://schema.org/Duration) | [Dataset](https://schema.org/Dataset) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FacquisitionMethod"></a> Property: acquisitionMethod

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Collection/creation methods. | [Text](https://schema.org/Text) | [Dataset](https://schema.org/Dataset) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FanalysisAutomation"></a> Property: analysisAutomation

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Automatic/manual analysis. | [Text](https://schema.org/Text) | [Analyse](https://w3id.org/dpv#Analyse) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FanalysisMethod"></a> Property: analysisMethod

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Analysis methods/tools/protocols. | [Text](https://schema.org/Text), [SoftwareApplication](https://schema.org/SoftwareApplication) | [Analyse](https://w3id.org/dpv#Analyse) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FaverageDataCost"></a> Property: averageDataCost

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Average data costs. | [Number](https://schema.org/Number) | [Network](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FaverageNetworkCost"></a> Property: averageNetworkCost

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Average infrastructure costs. | [Number](https://schema.org/Number) | [Network](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FclimateConsidered"></a> Property: climateConsidered

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Current, future (period). | [Text](https://schema.org/Text) | [Model](https://w3id.org/dpv/tech#Model) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FconservationManager"></a> Property: conservationManager

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Storage/Archiving responsible. | [Person](https://schema.org/Person) | [Store](https://w3id.org/dpv#Store) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataAccessManager"></a> Property: dataAccessManager

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Data access responsible. | [Person](https://schema.org/Person) | [Access](https://w3id.org/dpv#Access) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdatabaseAvailability"></a> Property: databaseAvailability

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Database availability. | [Text](https://schema.org/Text) | [Access](https://w3id.org/dpv#Access) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataDissimiationManager"></a> Property: dataDissimiationManager

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Dissemination/Reuse responsible. | [Person](https://schema.org/Person) | [Disseminate](https://w3id.org/dpv#Disseminate) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataNature"></a> Property: dataNature

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Data nature (textual/numerical/audiovisual/modeled/discipline-specific). | [Text](https://schema.org/Text) | [Dataset](https://schema.org/Dataset) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataRecoveryDelay"></a> Property: dataRecoveryDelay

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Average data recovery delays. | [Duration](https://schema.org/Duration), [Text](https://schema.org/Text) | [Dataset](https://schema.org/Dataset) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataSelectionMethod"></a> Property: dataSelectionMethod

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Data selection method. | [Text](https://schema.org/Text) | [Store](https://w3id.org/dpv#Store) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdatasetNumber"></a> Property: datasetNumber

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Number of datasets. | [Integer](https://schema.org/Integer) | [Dataset](https://schema.org/Dataset) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2Fdmp_id"></a> Property: dmp_id

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Identifies data managers for each type of data. | [Text](https://schema.org/Text), [URL](https://schema.org/URL), [CreativeWork](https://schema.org/CreativeWork) | [Project](https://schema.org/Project) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FequipmentFailure"></a> Property: equipmentFailure

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Justifications (sensor failures, etc.). | [Text](https://schema.org/Text) | [Campaign](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FequipmentUsed"></a> Property: equipmentUsed

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| For example: glider, mooring, mastodon, CTD, coring. | [Text](https://schema.org/Text) | [Campaign](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FexpectedDeliverable"></a> Property: expectedDeliverable

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Lists planned outputs with timeline codes. | [Text](https://schema.org/Text) | [Project](https://schema.org/Project) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FfileNamingConvention"></a> Property: fileNamingConvention

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| File naming convention. | [Text](https://schema.org/Text) | [Store](https://w3id.org/dpv#Store) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FgeneralWPProgram"></a> Property: generalWPProgram

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Overview of data collection activities. | [Text](https://schema.org/Text) | [Project](https://schema.org/Project) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasCampaign"></a> Property: hasCampaign

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Defines the relationship with the Campaign contextual entity. | [Campaign](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign) | [Dataset](https://schema.org/Dataset) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasMission"></a> Property: hasMission

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Campaign with DOI, mission name (e.g., Sentinel). | [Text](https://schema.org/Text) | [Satellite](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FSatellite) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasNetwork"></a> Property: hasNetwork

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Defines a relationship with a Network contextual entity. | [Network](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork) | [Dataset](https://schema.org/Dataset) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasProductNames"></a> Property: hasProductNames

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Product names. | [Text](https://schema.org/Text) | [Analyse](https://w3id.org/dpv#Analyse) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasSatellite"></a> Property: hasSatellite

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Defines the relationship with the Satellite contextual entity in the metadata model. | [Satellite](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FSatellite) | [Campaign](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FIlicoIntegrationYear"></a> Property: IlicoIntegrationYear

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| ILICO integration year. | [Integer](https://schema.org/Integer), [Date](https://schema.org/Date) | [Network](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FintegrityMethods"></a> Property: integrityMethods

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Data integrity methods. | [Text](https://schema.org/Text) | [Disseminate](https://w3id.org/dpv#Disseminate) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FmetadataFormat"></a> Property: metadataFormat

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Metadata format. | [Text](https://schema.org/Text) | [Campaign](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FmodelFailure"></a> Property: modelFailure

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Justifications (simulation crashes, etc.). | [Text](https://schema.org/Text) | [Model](https://w3id.org/dpv/tech#Model) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FnetworkManager"></a> Property: networkManager

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Defines a relationship for Network Manager between metadata entities. | [Person](https://schema.org/Person) | [Network](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2ForganisationName"></a> Property: organisationName

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Repository and organization name. | [Text](https://schema.org/Text), [Organization](https://schema.org/Organization) | [Access](https://w3id.org/dpv#Access) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FpostAnalysisLevel"></a> Property: postAnalysisLevel

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Data levels after analysis. | [Text](https://schema.org/Text) | [Analyse](https://w3id.org/dpv#Analyse) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FpreAnalysisLevel"></a> Property: preAnalysisLevel

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Data levels before analysis. | [Text](https://schema.org/Text) | [Analyse](https://w3id.org/dpv#Analyse) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FpreProcessingLevel"></a> Property: preProcessingLevel

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Data levels before processing. | [Text](https://schema.org/Text) | [Processing](https://w3id.org/dpv#Processing) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FprocessingAutomation"></a> Property: processingAutomation

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Automatic/manual processing. | [Text](https://schema.org/Text) | [Processing](https://w3id.org/dpv#Processing) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FprocessingManager"></a> Property: processingManager

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Processing/Analysis responsible. | [Person](https://schema.org/Person) | [Processing](https://w3id.org/dpv#Processing) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FprocessingMethod"></a> Property: processingMethod

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Processing methods/tools/protocols. | [Text](https://schema.org/Text), [SoftwareApplication](https://schema.org/SoftwareApplication) | [Processing](https://w3id.org/dpv#Processing) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FqualityApproach"></a> Property: qualityApproach

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Data quality approach. | [Text](https://schema.org/Text) | [Dataset](https://schema.org/Dataset) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FrelatedPublications"></a> Property: relatedPublications

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Average number of associated publications. | [Integer](https://schema.org/Integer) | [Disseminate](https://w3id.org/dpv#Disseminate) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FrepositoryName"></a> Property: repositoryName

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Repository name. | [Text](https://schema.org/Text) | [Access](https://w3id.org/dpv#Access) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FreuseData"></a> Property: reuseData

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Reuse of existing data. | [Text](https://schema.org/Text), [Boolean](https://schema.org/Boolean) | [Analyse](https://w3id.org/dpv#Analyse) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FreusedData"></a> Property: reusedData

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Identifies external data sources. | [Dataset](https://schema.org/Dataset), [CreativeWork](https://schema.org/CreativeWork), [URL](https://schema.org/URL) | [Project](https://schema.org/Project) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FscenarioId"></a> Property: scenarioId

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Scenario/run id of the model output. | [Text](https://schema.org/Text), [Identifier](https://schema.org/Identifier) | [Product](https://schema.org/Product) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FscientificIssues"></a> Property: scientificIssues

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Research questions and objectives. | [Text](https://schema.org/Text) | [Network](#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2Fstability"></a> Property: stability

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Data stability (fixed/growing/revisable). | [Text](https://schema.org/Text) | [Dataset](https://schema.org/Dataset) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FstationsStudied"></a> Property: stationsStudied

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Number of stations studied. | [Integer](https://schema.org/Integer) | [Dataset](https://schema.org/Dataset) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FsupportType"></a> Property: supportType

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Storage/archiving support type. | [Text](https://schema.org/Text) | [Store](https://w3id.org/dpv#Store) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FsurveyAutomation"></a> Property: surveyAutomation

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Automatic/manual collection. | [Text](https://schema.org/Text) | [Dataset](https://schema.org/Dataset) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FtraceabilityMethods"></a> Property: traceabilityMethods

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Data traceability methods. | [Text](https://schema.org/Text) | [Disseminate](https://w3id.org/dpv#Disseminate) |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FvalidationApproach"></a> Property: validationApproach

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Data validation approach. | [Text](https://schema.org/Text) | [Dataset](https://schema.org/Dataset) |

