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


### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork" title="https://w3id.org/ro/terms/cca/Network"></a> Class: Network

Defines the Network contextual entity in the metadata model.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FaverageDataCost" title="https://w3id.org/ro/terms/cca/averageDataCost">averageDataCost</a> |  | No | Average data costs. | <a href="https://schema.org/Number" title="https://schema.org/Number" target="_blank" rel="noopener">Number</a> |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FaverageNetworkCost" title="https://w3id.org/ro/terms/cca/averageNetworkCost">averageNetworkCost</a> |  | No | Average infrastructure costs. | <a href="https://schema.org/Number" title="https://schema.org/Number" target="_blank" rel="noopener">Number</a> |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FIlicoIntegrationYear" title="https://w3id.org/ro/terms/cca/IlicoIntegrationYear">IlicoIntegrationYear</a> |  | No | ILICO integration year. | <a href="https://schema.org/Integer" title="https://schema.org/Integer" target="_blank" rel="noopener">Integer</a>, <a href="https://schema.org/Date" title="https://schema.org/Date" target="_blank" rel="noopener">Date</a> |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FnetworkManager" title="https://w3id.org/ro/terms/cca/networkManager">networkManager</a> |  | No | Defines a relationship for Network Manager between metadata entities. | <a href="https://schema.org/Person" title="https://schema.org/Person" target="_blank" rel="noopener">Person</a> |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FscientificIssues" title="https://w3id.org/ro/terms/cca/scientificIssues">scientificIssues</a> |  | No | Research questions and objectives. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign" title="https://w3id.org/ro/terms/cca/Campaign"></a> Class: Campaign

Defines the Campaign contextual entity in the metadata model.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FequipmentFailure" title="https://w3id.org/ro/terms/cca/equipmentFailure">equipmentFailure</a> |  | No | Justifications (sensor failures, etc.). | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FequipmentUsed" title="https://w3id.org/ro/terms/cca/equipmentUsed">equipmentUsed</a> |  | No | For example: glider, mooring, mastodon, CTD, coring. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasSatellite" title="https://w3id.org/ro/terms/cca/hasSatellite">hasSatellite</a> |  | No | Defines the relationship with the Satellite contextual entity in the metadata model. | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FSatellite" title="https://w3id.org/ro/terms/cca/Satellite">Satellite</a> |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FmetadataFormat" title="https://w3id.org/ro/terms/cca/metadataFormat">metadataFormat</a> |  | No | Metadata format. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FSatellite" title="https://w3id.org/ro/terms/cca/Satellite"></a> Class: Satellite

Defines the Satellite contextual entity in the metadata model.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasMission" title="https://w3id.org/ro/terms/cca/hasMission">hasMission</a> |  | No | Campaign with DOI, mission name (e.g., Sentinel). | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |

## All Properties

### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FacquisitionFrequency" title="https://w3id.org/ro/terms/cca/acquisitionFrequency"></a> Property: acquisitionFrequency

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FacquisitionFrequency" title="https://w3id.org/ro/terms/cca/acquisitionFrequency">acquisitionFrequency</a> |  | Average acquisition frequency. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a>, <a href="https://schema.org/Duration" title="https://schema.org/Duration" target="_blank" rel="noopener">Duration</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FacquisitionMethod" title="https://w3id.org/ro/terms/cca/acquisitionMethod"></a> Property: acquisitionMethod

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FacquisitionMethod" title="https://w3id.org/ro/terms/cca/acquisitionMethod">acquisitionMethod</a> |  | Collection/creation methods. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FanalysisAutomation" title="https://w3id.org/ro/terms/cca/analysisAutomation"></a> Property: analysisAutomation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FanalysisAutomation" title="https://w3id.org/ro/terms/cca/analysisAutomation">analysisAutomation</a> |  | Automatic/manual analysis. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Analyse" title="https://w3id.org/dpv#Analyse" target="_blank" rel="noopener">Analyse</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FanalysisMethod" title="https://w3id.org/ro/terms/cca/analysisMethod"></a> Property: analysisMethod

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FanalysisMethod" title="https://w3id.org/ro/terms/cca/analysisMethod">analysisMethod</a> |  | Analysis methods/tools/protocols. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a>, <a href="https://schema.org/SoftwareApplication" title="https://schema.org/SoftwareApplication" target="_blank" rel="noopener">SoftwareApplication</a> | <a href="https://w3id.org/dpv#Analyse" title="https://w3id.org/dpv#Analyse" target="_blank" rel="noopener">Analyse</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FaverageDataCost" title="https://w3id.org/ro/terms/cca/averageDataCost"></a> Property: averageDataCost

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FaverageDataCost" title="https://w3id.org/ro/terms/cca/averageDataCost">averageDataCost</a> |  | Average data costs. | <a href="https://schema.org/Number" title="https://schema.org/Number" target="_blank" rel="noopener">Number</a> | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork" title="https://w3id.org/ro/terms/cca/Network">Network</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FaverageNetworkCost" title="https://w3id.org/ro/terms/cca/averageNetworkCost"></a> Property: averageNetworkCost

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FaverageNetworkCost" title="https://w3id.org/ro/terms/cca/averageNetworkCost">averageNetworkCost</a> |  | Average infrastructure costs. | <a href="https://schema.org/Number" title="https://schema.org/Number" target="_blank" rel="noopener">Number</a> | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork" title="https://w3id.org/ro/terms/cca/Network">Network</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FclimateConsidered" title="https://w3id.org/ro/terms/cca/climateConsidered"></a> Property: climateConsidered

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FclimateConsidered" title="https://w3id.org/ro/terms/cca/climateConsidered">climateConsidered</a> |  | Current, future (period). | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv/tech#Model" title="https://w3id.org/dpv/tech#Model" target="_blank" rel="noopener">Model</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FconservationManager" title="https://w3id.org/ro/terms/cca/conservationManager"></a> Property: conservationManager

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FconservationManager" title="https://w3id.org/ro/terms/cca/conservationManager">conservationManager</a> |  | Storage/Archiving responsible. | <a href="https://schema.org/Person" title="https://schema.org/Person" target="_blank" rel="noopener">Person</a> | <a href="https://w3id.org/dpv#Store" title="https://w3id.org/dpv#Store" target="_blank" rel="noopener">Store</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataAccessManager" title="https://w3id.org/ro/terms/cca/dataAccessManager"></a> Property: dataAccessManager

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataAccessManager" title="https://w3id.org/ro/terms/cca/dataAccessManager">dataAccessManager</a> |  | Data access responsible. | <a href="https://schema.org/Person" title="https://schema.org/Person" target="_blank" rel="noopener">Person</a> | <a href="https://w3id.org/dpv#Access" title="https://w3id.org/dpv#Access" target="_blank" rel="noopener">Access</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdatabaseAvailability" title="https://w3id.org/ro/terms/cca/databaseAvailability"></a> Property: databaseAvailability

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdatabaseAvailability" title="https://w3id.org/ro/terms/cca/databaseAvailability">databaseAvailability</a> |  | Database availability. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Access" title="https://w3id.org/dpv#Access" target="_blank" rel="noopener">Access</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataDissimiationManager" title="https://w3id.org/ro/terms/cca/dataDissimiationManager"></a> Property: dataDissimiationManager

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataDissimiationManager" title="https://w3id.org/ro/terms/cca/dataDissimiationManager">dataDissimiationManager</a> |  | Dissemination/Reuse responsible. | <a href="https://schema.org/Person" title="https://schema.org/Person" target="_blank" rel="noopener">Person</a> | <a href="https://w3id.org/dpv#Disseminate" title="https://w3id.org/dpv#Disseminate" target="_blank" rel="noopener">Disseminate</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataNature" title="https://w3id.org/ro/terms/cca/dataNature"></a> Property: dataNature

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataNature" title="https://w3id.org/ro/terms/cca/dataNature">dataNature</a> |  | Data nature (textual/numerical/audiovisual/modeled/discipline-specific). | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataRecoveryDelay" title="https://w3id.org/ro/terms/cca/dataRecoveryDelay"></a> Property: dataRecoveryDelay

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataRecoveryDelay" title="https://w3id.org/ro/terms/cca/dataRecoveryDelay">dataRecoveryDelay</a> |  | Average data recovery delays. | <a href="https://schema.org/Duration" title="https://schema.org/Duration" target="_blank" rel="noopener">Duration</a>, <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataSelectionMethod" title="https://w3id.org/ro/terms/cca/dataSelectionMethod"></a> Property: dataSelectionMethod

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdataSelectionMethod" title="https://w3id.org/ro/terms/cca/dataSelectionMethod">dataSelectionMethod</a> |  | Data selection method. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Store" title="https://w3id.org/dpv#Store" target="_blank" rel="noopener">Store</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdatasetNumber" title="https://w3id.org/ro/terms/cca/datasetNumber"></a> Property: datasetNumber

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FdatasetNumber" title="https://w3id.org/ro/terms/cca/datasetNumber">datasetNumber</a> |  | Number of datasets. | <a href="https://schema.org/Integer" title="https://schema.org/Integer" target="_blank" rel="noopener">Integer</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2Fdmp_id" title="https://w3id.org/ro/terms/cca/dmp_id"></a> Property: dmp_id

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2Fdmp_id" title="https://w3id.org/ro/terms/cca/dmp_id">dmp_id</a> |  | Identifies data managers for each type of data. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a>, <a href="https://schema.org/URL" title="https://schema.org/URL" target="_blank" rel="noopener">URL</a>, <a href="https://schema.org/CreativeWork" title="https://schema.org/CreativeWork" target="_blank" rel="noopener">CreativeWork</a> | <a href="https://schema.org/Project" title="https://schema.org/Project" target="_blank" rel="noopener">Project</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FequipmentFailure" title="https://w3id.org/ro/terms/cca/equipmentFailure"></a> Property: equipmentFailure

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FequipmentFailure" title="https://w3id.org/ro/terms/cca/equipmentFailure">equipmentFailure</a> |  | Justifications (sensor failures, etc.). | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign" title="https://w3id.org/ro/terms/cca/Campaign">Campaign</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FequipmentUsed" title="https://w3id.org/ro/terms/cca/equipmentUsed"></a> Property: equipmentUsed

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FequipmentUsed" title="https://w3id.org/ro/terms/cca/equipmentUsed">equipmentUsed</a> |  | For example: glider, mooring, mastodon, CTD, coring. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign" title="https://w3id.org/ro/terms/cca/Campaign">Campaign</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FexpectedDeliverable" title="https://w3id.org/ro/terms/cca/expectedDeliverable"></a> Property: expectedDeliverable

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FexpectedDeliverable" title="https://w3id.org/ro/terms/cca/expectedDeliverable">expectedDeliverable</a> |  | Lists planned outputs with timeline codes. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://schema.org/Project" title="https://schema.org/Project" target="_blank" rel="noopener">Project</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FfileNamingConvention" title="https://w3id.org/ro/terms/cca/fileNamingConvention"></a> Property: fileNamingConvention

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FfileNamingConvention" title="https://w3id.org/ro/terms/cca/fileNamingConvention">fileNamingConvention</a> |  | File naming convention. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Store" title="https://w3id.org/dpv#Store" target="_blank" rel="noopener">Store</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FgeneralWPProgram" title="https://w3id.org/ro/terms/cca/generalWPProgram"></a> Property: generalWPProgram

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FgeneralWPProgram" title="https://w3id.org/ro/terms/cca/generalWPProgram">generalWPProgram</a> |  | Overview of data collection activities. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://schema.org/Project" title="https://schema.org/Project" target="_blank" rel="noopener">Project</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasCampaign" title="https://w3id.org/ro/terms/cca/hasCampaign"></a> Property: hasCampaign

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasCampaign" title="https://w3id.org/ro/terms/cca/hasCampaign">hasCampaign</a> |  | Defines the relationship with the Campaign contextual entity. | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign" title="https://w3id.org/ro/terms/cca/Campaign">Campaign</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasMission" title="https://w3id.org/ro/terms/cca/hasMission"></a> Property: hasMission

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasMission" title="https://w3id.org/ro/terms/cca/hasMission">hasMission</a> |  | Campaign with DOI, mission name (e.g., Sentinel). | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FSatellite" title="https://w3id.org/ro/terms/cca/Satellite">Satellite</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasNetwork" title="https://w3id.org/ro/terms/cca/hasNetwork"></a> Property: hasNetwork

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasNetwork" title="https://w3id.org/ro/terms/cca/hasNetwork">hasNetwork</a> |  | Defines a relationship with a Network contextual entity. | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork" title="https://w3id.org/ro/terms/cca/Network">Network</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasProductNames" title="https://w3id.org/ro/terms/cca/hasProductNames"></a> Property: hasProductNames

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasProductNames" title="https://w3id.org/ro/terms/cca/hasProductNames">hasProductNames</a> |  | Product names. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Analyse" title="https://w3id.org/dpv#Analyse" target="_blank" rel="noopener">Analyse</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasSatellite" title="https://w3id.org/ro/terms/cca/hasSatellite"></a> Property: hasSatellite

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FhasSatellite" title="https://w3id.org/ro/terms/cca/hasSatellite">hasSatellite</a> |  | Defines the relationship with the Satellite contextual entity in the metadata model. | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FSatellite" title="https://w3id.org/ro/terms/cca/Satellite">Satellite</a> | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign" title="https://w3id.org/ro/terms/cca/Campaign">Campaign</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FIlicoIntegrationYear" title="https://w3id.org/ro/terms/cca/IlicoIntegrationYear"></a> Property: IlicoIntegrationYear

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FIlicoIntegrationYear" title="https://w3id.org/ro/terms/cca/IlicoIntegrationYear">IlicoIntegrationYear</a> |  | ILICO integration year. | <a href="https://schema.org/Integer" title="https://schema.org/Integer" target="_blank" rel="noopener">Integer</a>, <a href="https://schema.org/Date" title="https://schema.org/Date" target="_blank" rel="noopener">Date</a> | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork" title="https://w3id.org/ro/terms/cca/Network">Network</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FintegrityMethods" title="https://w3id.org/ro/terms/cca/integrityMethods"></a> Property: integrityMethods

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FintegrityMethods" title="https://w3id.org/ro/terms/cca/integrityMethods">integrityMethods</a> |  | Data integrity methods. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Disseminate" title="https://w3id.org/dpv#Disseminate" target="_blank" rel="noopener">Disseminate</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FmetadataFormat" title="https://w3id.org/ro/terms/cca/metadataFormat"></a> Property: metadataFormat

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FmetadataFormat" title="https://w3id.org/ro/terms/cca/metadataFormat">metadataFormat</a> |  | Metadata format. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FCampaign" title="https://w3id.org/ro/terms/cca/Campaign">Campaign</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FmodelFailure" title="https://w3id.org/ro/terms/cca/modelFailure"></a> Property: modelFailure

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FmodelFailure" title="https://w3id.org/ro/terms/cca/modelFailure">modelFailure</a> |  | Justifications (simulation crashes, etc.). | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv/tech#Model" title="https://w3id.org/dpv/tech#Model" target="_blank" rel="noopener">Model</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FnetworkManager" title="https://w3id.org/ro/terms/cca/networkManager"></a> Property: networkManager

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FnetworkManager" title="https://w3id.org/ro/terms/cca/networkManager">networkManager</a> |  | Defines a relationship for Network Manager between metadata entities. | <a href="https://schema.org/Person" title="https://schema.org/Person" target="_blank" rel="noopener">Person</a> | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork" title="https://w3id.org/ro/terms/cca/Network">Network</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2ForganisationName" title="https://w3id.org/ro/terms/cca/organisationName"></a> Property: organisationName

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2ForganisationName" title="https://w3id.org/ro/terms/cca/organisationName">organisationName</a> |  | Repository and organization name. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a>, <a href="https://schema.org/Organization" title="https://schema.org/Organization" target="_blank" rel="noopener">Organization</a> | <a href="https://w3id.org/dpv#Access" title="https://w3id.org/dpv#Access" target="_blank" rel="noopener">Access</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FpostAnalysisLevel" title="https://w3id.org/ro/terms/cca/postAnalysisLevel"></a> Property: postAnalysisLevel

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FpostAnalysisLevel" title="https://w3id.org/ro/terms/cca/postAnalysisLevel">postAnalysisLevel</a> |  | Data levels after analysis. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Analyse" title="https://w3id.org/dpv#Analyse" target="_blank" rel="noopener">Analyse</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FpreAnalysisLevel" title="https://w3id.org/ro/terms/cca/preAnalysisLevel"></a> Property: preAnalysisLevel

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FpreAnalysisLevel" title="https://w3id.org/ro/terms/cca/preAnalysisLevel">preAnalysisLevel</a> |  | Data levels before analysis. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Analyse" title="https://w3id.org/dpv#Analyse" target="_blank" rel="noopener">Analyse</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FpreProcessingLevel" title="https://w3id.org/ro/terms/cca/preProcessingLevel"></a> Property: preProcessingLevel

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FpreProcessingLevel" title="https://w3id.org/ro/terms/cca/preProcessingLevel">preProcessingLevel</a> |  | Data levels before processing. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Processing" title="https://w3id.org/dpv#Processing" target="_blank" rel="noopener">Processing</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FprocessingAutomation" title="https://w3id.org/ro/terms/cca/processingAutomation"></a> Property: processingAutomation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FprocessingAutomation" title="https://w3id.org/ro/terms/cca/processingAutomation">processingAutomation</a> |  | Automatic/manual processing. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Processing" title="https://w3id.org/dpv#Processing" target="_blank" rel="noopener">Processing</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FprocessingManager" title="https://w3id.org/ro/terms/cca/processingManager"></a> Property: processingManager

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FprocessingManager" title="https://w3id.org/ro/terms/cca/processingManager">processingManager</a> |  | Processing/Analysis responsible. | <a href="https://schema.org/Person" title="https://schema.org/Person" target="_blank" rel="noopener">Person</a> | <a href="https://w3id.org/dpv#Processing" title="https://w3id.org/dpv#Processing" target="_blank" rel="noopener">Processing</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FprocessingMethod" title="https://w3id.org/ro/terms/cca/processingMethod"></a> Property: processingMethod

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FprocessingMethod" title="https://w3id.org/ro/terms/cca/processingMethod">processingMethod</a> |  | Processing methods/tools/protocols. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a>, <a href="https://schema.org/SoftwareApplication" title="https://schema.org/SoftwareApplication" target="_blank" rel="noopener">SoftwareApplication</a> | <a href="https://w3id.org/dpv#Processing" title="https://w3id.org/dpv#Processing" target="_blank" rel="noopener">Processing</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FqualityApproach" title="https://w3id.org/ro/terms/cca/qualityApproach"></a> Property: qualityApproach

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FqualityApproach" title="https://w3id.org/ro/terms/cca/qualityApproach">qualityApproach</a> |  | Data quality approach. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FrelatedPublications" title="https://w3id.org/ro/terms/cca/relatedPublications"></a> Property: relatedPublications

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FrelatedPublications" title="https://w3id.org/ro/terms/cca/relatedPublications">relatedPublications</a> |  | Average number of associated publications. | <a href="https://schema.org/Integer" title="https://schema.org/Integer" target="_blank" rel="noopener">Integer</a> | <a href="https://w3id.org/dpv#Disseminate" title="https://w3id.org/dpv#Disseminate" target="_blank" rel="noopener">Disseminate</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FrepositoryName" title="https://w3id.org/ro/terms/cca/repositoryName"></a> Property: repositoryName

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FrepositoryName" title="https://w3id.org/ro/terms/cca/repositoryName">repositoryName</a> |  | Repository name. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Access" title="https://w3id.org/dpv#Access" target="_blank" rel="noopener">Access</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FreuseData" title="https://w3id.org/ro/terms/cca/reuseData"></a> Property: reuseData

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FreuseData" title="https://w3id.org/ro/terms/cca/reuseData">reuseData</a> |  | Reuse of existing data. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a>, <a href="https://schema.org/Boolean" title="https://schema.org/Boolean" target="_blank" rel="noopener">Boolean</a> | <a href="https://w3id.org/dpv#Analyse" title="https://w3id.org/dpv#Analyse" target="_blank" rel="noopener">Analyse</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FreusedData" title="https://w3id.org/ro/terms/cca/reusedData"></a> Property: reusedData

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FreusedData" title="https://w3id.org/ro/terms/cca/reusedData">reusedData</a> |  | Identifies external data sources. | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a>, <a href="https://schema.org/CreativeWork" title="https://schema.org/CreativeWork" target="_blank" rel="noopener">CreativeWork</a>, <a href="https://schema.org/URL" title="https://schema.org/URL" target="_blank" rel="noopener">URL</a> | <a href="https://schema.org/Project" title="https://schema.org/Project" target="_blank" rel="noopener">Project</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FscenarioId" title="https://w3id.org/ro/terms/cca/scenarioId"></a> Property: scenarioId

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FscenarioId" title="https://w3id.org/ro/terms/cca/scenarioId">scenarioId</a> |  | Scenario/run id of the model output. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a>, <a href="https://schema.org/Identifier" title="https://schema.org/Identifier" target="_blank" rel="noopener">Identifier</a> | <a href="https://schema.org/Product" title="https://schema.org/Product" target="_blank" rel="noopener">Product</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FscientificIssues" title="https://w3id.org/ro/terms/cca/scientificIssues"></a> Property: scientificIssues

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FscientificIssues" title="https://w3id.org/ro/terms/cca/scientificIssues">scientificIssues</a> |  | Research questions and objectives. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FNetwork" title="https://w3id.org/ro/terms/cca/Network">Network</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2Fstability" title="https://w3id.org/ro/terms/cca/stability"></a> Property: stability

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2Fstability" title="https://w3id.org/ro/terms/cca/stability">stability</a> |  | Data stability (fixed/growing/revisable). | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FstationsStudied" title="https://w3id.org/ro/terms/cca/stationsStudied"></a> Property: stationsStudied

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FstationsStudied" title="https://w3id.org/ro/terms/cca/stationsStudied">stationsStudied</a> |  | Number of stations studied. | <a href="https://schema.org/Integer" title="https://schema.org/Integer" target="_blank" rel="noopener">Integer</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FsupportType" title="https://w3id.org/ro/terms/cca/supportType"></a> Property: supportType

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FsupportType" title="https://w3id.org/ro/terms/cca/supportType">supportType</a> |  | Storage/archiving support type. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Store" title="https://w3id.org/dpv#Store" target="_blank" rel="noopener">Store</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FsurveyAutomation" title="https://w3id.org/ro/terms/cca/surveyAutomation"></a> Property: surveyAutomation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FsurveyAutomation" title="https://w3id.org/ro/terms/cca/surveyAutomation">surveyAutomation</a> |  | Automatic/manual collection. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FtraceabilityMethods" title="https://w3id.org/ro/terms/cca/traceabilityMethods"></a> Property: traceabilityMethods

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FtraceabilityMethods" title="https://w3id.org/ro/terms/cca/traceabilityMethods">traceabilityMethods</a> |  | Data traceability methods. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://w3id.org/dpv#Disseminate" title="https://w3id.org/dpv#Disseminate" target="_blank" rel="noopener">Disseminate</a> |
### <a id="https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FvalidationApproach" title="https://w3id.org/ro/terms/cca/validationApproach"></a> Property: validationApproach

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fw3id.org%2Fro%2Fterms%2Fcca%2FvalidationApproach" title="https://w3id.org/ro/terms/cca/validationApproach">validationApproach</a> |  | Data validation approach. | <a href="https://schema.org/Text" title="https://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="https://schema.org/Dataset" title="https://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |

