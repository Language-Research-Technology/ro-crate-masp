---
title: AusTalk Vocabulary Schema Terms
---

# AusTalk Vocabulary Schema Terms

The AusTalk schema is used for describing the AusTalk corpus of Australian English and is published at https://w3id.org/austalk/schema. The schema is based on archive material of the AusTalk static site and other repositories:
- [austalk-static-site](https://github.com/Alveo/austalk-static-site): The austalk.edu.au website
- [bigasc-metadata](https://github.com/ptsefton/bigasc-metadata): Code to generate metadata for the AusTalk (Big ASC) corpus
- [smallasc](https://github.com/Alveo/smallasc)
- [language-data-commons-vocabs/vocabs/austalk](https://github.com/Language-Research-Technology/language-data-commons-vocabs/tree/master/vocabs/austalk)

<br>

## All Rules:

## Types of entities (specializations of Classes) and expected Properties


### <a id="ausnc%3AAusNCObject" title="ausnc:AusNCObject"></a> Class: AusNCObject

An individual item in the corpus - one recording of a prompt/interview/map task.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#austalk%3Aage_from" title="austalk:age_from">age from</a> | No | The age from which this person has resided in the specified town. | schema:Text |  |
| <a href="#austalk%3Aage_to" title="austalk:age_to">age to</a> | No | The age to which this person has resided in the specified town. If still residing there, use null. | schema:Text |  |
| <a href="#austalk%3Abasename" title="austalk:basename">basename</a> | No |  The base name of a media file without path, comprised of the speaker, session, component and prompt numbers. | schema:Text |  |
| <a href="#austalk%3AcameraSN0" title="austalk:cameraSN0">cameraSN0</a> | No | The serial number of camera 0. | schema:Text |  |
| <a href="#austalk%3AcameraSN1" title="austalk:cameraSN1">cameraSN1</a> | No | The serial number of camera 1. | schema:Text |  |
| <a href="#austalk%3Achannel" title="austalk:channel">channel</a> | No | The channel name of the media file. | <a href="#austalk%3AChannelTerms" title="austalk:ChannelTerms">ChannelTerms</a> |  |
| <a href="#austalk%3Achecksum" title="austalk:checksum">checksum</a> | No | The checksum of the media file for integrity verification. | schema:Text |  |
| <a href="#austalk%3Acity" title="austalk:city">city</a> | No | The city of the recording site. | schema:Text |  |
| <a href="#austalk%3Acountry" title="austalk:country">country</a> | No | The country in which this person has residential history. | schema:Text |  |
| <a href="#austalk%3Afrequency" title="austalk:frequency">frequency</a> | No | The frequency of use of a language by this person, on a scale of 1-100. | schema:Text |  |
| <a href="#austalk%3Aid" title="austalk:id">id</a> | No | The numerical identifier for a session/component/item. | schema:Text |  |
| <a href="#austalk%3Ainformation_follower" title="austalk:information_follower">information follower</a> | No | The participant whose role was information follower in the map task. | schema:Text |  |
| <a href="#austalk%3Ainformation_giver" title="austalk:information_giver">information giver</a> | No | The participant whose role was information giver in the map task. | schema:Text |  |
| <a href="#austalk%3Ainstitution" title="austalk:institution">institution</a> | No | The institution associated with the recording site. | schema:Text |  |
| <a href="#austalk%3Aless_than_a_year" title="austalk:less_than_a_year">less than a year</a> | No | Boolean value true if this person has resided less than a year in the specified town. | schema:Boolean |  |
| <a href="#austalk%3Amap" title="austalk:map">map</a> | No | The map being used in the map task. | schema:Text |  |
| <a href="#austalk%3Amaptaskcomment" title="austalk:maptaskcomment">maptaskcomment</a> | No | A comment on the map task. | schema:Text |  |
| <a href="#austalk%3Amother_pob_state" title="austalk:mother_pob_state">mothers birth state</a> | No | The state where the mother of this person was born. | schema:Text |  |
| <a href="#austalk%3Aprompt" title="austalk:prompt">prompt</a> | No | The prompt text shown when recording an item. | schema:Text |  |
| <a href="#austalk%3Arecording_site" title="austalk:recording_site">recording site</a> | No | A URI of the recording site where the recording was made. | <a href="#austalk%3ARecordingSite" title="austalk:RecordingSite">RecordingSite</a> |  |
| <a href="#austalk%3Aresearch_assistant" title="austalk:research_assistant">research assistant</a> | No | The research assistant who ran the recording session. | schema:Person |  |
| <a href="#austalk%3Ashortname" title="austalk:shortname">shortname</a> | No | The short name for a component. | schema:Text |  |
| <a href="#austalk%3Astate" title="austalk:state">state</a> | No | The state in which this person has residential history. | schema:Text |  |
| <a href="#austalk%3Atown" title="austalk:town">town</a> | No | The town in which this person has residential history. | schema:Text |  |
| <a href="#austalk%3Atype" title="austalk:type">type</a> | No | The type of the media file (e.g. audio or video). | schema:Text |  |
| <a href="#austalk%3Aversion" title="austalk:version">version</a> | No | The version number differentiating between sets of recordings for an item (default 1, incremented for additional recordings). | schema:Text |  |


### <a id="austalk%3ARecordedComponent" title="austalk:RecordedComponent"></a> Class: Recorded Component

An instance of a component for one participant.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a href="#austalk%3Aaudiorating" title="austalk:audiorating">audio rating</a> | No | A rating of audio quality A-D: A (A-OK), B (OK, but imperfect), C (bad, not acceptable), D (deficient or missing). | schema:Text |  |
| <a href="#austalk%3Acomment" title="austalk:comment">comment</a> | No | A comment on the recording quality. | schema:Text |  |
| <a href="#austalk%3Avideorating" title="austalk:videorating">video rating</a> | No | A rating of video quality A-D: A (A-OK), B (OK, but imperfect), C (bad, not acceptable), D (deficient or missing). | schema:Text |  |


### <a id="austalk%3ARecordingSite" title="austalk:RecordingSite"></a> Class: RecordingSite

A physical location where recordings were made.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
*No properties defined for this class*


## All Properties

### <a id="austalk%3Aage_from" title="austalk:age_from"></a> Property: age from

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aage_from" title="austalk:age_from">age from</a> | The age from which this person has resided in the specified town. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Aage_to" title="austalk:age_to"></a> Property: age to

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aage_to" title="austalk:age_to">age to</a> | The age to which this person has resided in the specified town. If still residing there, use null. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Aaudiorating" title="austalk:audiorating"></a> Property: audio rating

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aaudiorating" title="austalk:audiorating">audio rating</a> | A rating of audio quality A-D: A (A-OK), B (OK, but imperfect), C (bad, not acceptable), D (deficient or missing). | schema:Text | <a href="#austalk%3ARecordedComponent" title="austalk:RecordedComponent">Recorded Component</a> |
### <a id="austalk%3Abasename" title="austalk:basename"></a> Property: basename

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Abasename" title="austalk:basename">basename</a> |  The base name of a media file without path, comprised of the speaker, session, component and prompt numbers. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3AbirthPlace" title="austalk:birthPlace"></a> Property: birthPlace

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3AbirthPlace" title="austalk:birthPlace">birthPlace</a> | The place of birth of this person (geolocated). | geo:Feature | schema:Person |
### <a id="austalk%3AcameraSN0" title="austalk:cameraSN0"></a> Property: cameraSN0

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3AcameraSN0" title="austalk:cameraSN0">cameraSN0</a> | The serial number of camera 0. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3AcameraSN1" title="austalk:cameraSN1"></a> Property: cameraSN1

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3AcameraSN1" title="austalk:cameraSN1">cameraSN1</a> | The serial number of camera 1. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Achannel" title="austalk:channel"></a> Property: channel

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Achannel" title="austalk:channel">channel</a> | The channel name of the media file. | <a href="#austalk%3AChannelTerms" title="austalk:ChannelTerms">ChannelTerms</a> | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Achecksum" title="austalk:checksum"></a> Property: checksum

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Achecksum" title="austalk:checksum">checksum</a> | The checksum of the media file for integrity verification. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Acity" title="austalk:city"></a> Property: city

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Acity" title="austalk:city">city</a> | The city of the recording site. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Acomment" title="austalk:comment"></a> Property: comment

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Acomment" title="austalk:comment">comment</a> | A comment on the recording quality. | schema:Text | <a href="#austalk%3ARecordedComponent" title="austalk:RecordedComponent">Recorded Component</a> |
### <a id="austalk%3Aconsent" title="austalk:consent"></a> Property: consent

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aconsent" title="austalk:consent">consent</a> | Boolean value true if this person has signed the consent form. | schema:Boolean | schema:Person |
### <a id="austalk%3Acountry" title="austalk:country"></a> Property: country

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Acountry" title="austalk:country">country</a> | The country in which this person has residential history. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Apob_country" title="austalk:pob_country"></a> Property: country of birth

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Apob_country" title="austalk:pob_country">country of birth</a> | The country where this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Acultural_heritage" title="austalk:cultural_heritage"></a> Property: cultural heritage

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Acultural_heritage" title="austalk:cultural_heritage">cultural heritage</a> | The cultural heritage of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aeducation_level" title="austalk:education_level"></a> Property: education level

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aeducation_level" title="austalk:education_level">education level</a> | The highest level of education of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_accent" title="austalk:father_accent"></a> Property: father accent

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Afather_accent" title="austalk:father_accent">father accent</a> | The accent of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_cultural_heritage" title="austalk:father_cultural_heritage"></a> Property: father cultural heritage

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Afather_cultural_heritage" title="austalk:father_cultural_heritage">father cultural heritage</a> | The cultural heritage of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_education_level" title="austalk:father_education_level"></a> Property: father education level

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Afather_education_level" title="austalk:father_education_level">father education level</a> | The highest level of education of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_first_language" title="austalk:father_first_language"></a> Property: father first language

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Afather_first_language" title="austalk:father_first_language">father first language</a> | The first language of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_pob_country" title="austalk:father_pob_country"></a> Property: father pob country

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Afather_pob_country" title="austalk:father_pob_country">father pob country</a> | The country where the father of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Afather_pob_town" title="austalk:father_pob_town"></a> Property: father pob town

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Afather_pob_town" title="austalk:father_pob_town">father pob town</a> | The town where the father of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Afather_professional_category" title="austalk:father_professional_category"></a> Property: father professional category

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Afather_professional_category" title="austalk:father_professional_category">father professional category</a> | The professional category of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afirst_language" title="austalk:first_language"></a> Property: first language

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Afirst_language" title="austalk:first_language">first language</a> | The first language of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afrequency" title="austalk:frequency"></a> Property: frequency

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Afrequency" title="austalk:frequency">frequency</a> | The frequency of use of a language by this person, on a scale of 1-100. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Ahas_dentures" title="austalk:has_dentures"></a> Property: has dentures

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ahas_dentures" title="austalk:has_dentures">has dentures</a> | Boolean value true if this person has dentures. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_health_problems" title="austalk:has_health_problems"></a> Property: has health problems

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ahas_health_problems" title="austalk:has_health_problems">has health problems</a> | Boolean value true if this person has health problems which might affect his/her voice. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_hearing_problems" title="austalk:has_hearing_problems"></a> Property: has hearing problems

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ahas_hearing_problems" title="austalk:has_hearing_problems">has hearing problems</a> | Boolean value true if this person has hearing problems. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_hobbies" title="austalk:has_hobbies"></a> Property: has hobbies

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ahas_hobbies" title="austalk:has_hobbies">has hobbies</a> | Boolean value true if this person has hobbies. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_piercings" title="austalk:has_piercings"></a> Property: has piercings

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ahas_piercings" title="austalk:has_piercings">has piercings</a> | Boolean value true if this person has facial piercings. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_reading_problems" title="austalk:has_reading_problems"></a> Property: has reading problems

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ahas_reading_problems" title="austalk:has_reading_problems">has reading problems</a> | Boolean value true if this person has reading problems. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_speech_problems" title="austalk:has_speech_problems"></a> Property: has speech problems

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ahas_speech_problems" title="austalk:has_speech_problems">has speech problems</a> | Boolean value true if this person has speech problems. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_vocal_training" title="austalk:has_vocal_training"></a> Property: has vocal training

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ahas_vocal_training" title="austalk:has_vocal_training">has vocal training</a> | Boolean value true if this person has vocal training. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahealth_problems_details" title="austalk:health_problems_details"></a> Property: health problems details

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ahealth_problems_details" title="austalk:health_problems_details">health problems details</a> | Details of the health problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Ahearing_problems_details" title="austalk:hearing_problems_details"></a> Property: hearing problems details

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ahearing_problems_details" title="austalk:hearing_problems_details">hearing problems details</a> | Details of the hearing problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Ahobbies_details" title="austalk:hobbies_details"></a> Property: hobbies details

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ahobbies_details" title="austalk:hobbies_details">hobbies details</a> | Details of the hobbies of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aid" title="austalk:id"></a> Property: id

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aid" title="austalk:id">id</a> | The numerical identifier for a session/component/item. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Ainformation_follower" title="austalk:information_follower"></a> Property: information follower

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ainformation_follower" title="austalk:information_follower">information follower</a> | The participant whose role was information follower in the map task. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Ainformation_giver" title="austalk:information_giver"></a> Property: information giver

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ainformation_giver" title="austalk:information_giver">information giver</a> | The participant whose role was information giver in the map task. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Ainstitution" title="austalk:institution"></a> Property: institution

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ainstitution" title="austalk:institution">institution</a> | The institution associated with the recording site. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Ais_left_handed" title="austalk:is_left_handed"></a> Property: is left handed

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ais_left_handed" title="austalk:is_left_handed">is left handed</a> | Boolean value true if this person is left handed. | schema:Boolean | schema:Person |
### <a id="austalk%3Ais_smoker" title="austalk:is_smoker"></a> Property: is smoker

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ais_smoker" title="austalk:is_smoker">is smoker</a> | Boolean value true if this person is a smoker. | schema:Boolean | schema:Person |
### <a id="austalk%3Ais_student" title="austalk:is_student"></a> Property: is student

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ais_student" title="austalk:is_student">is student</a> | Boolean value true if this person is a student. | schema:Boolean | schema:Person |
### <a id="austalk%3Alanguage_usage" title="austalk:language_usage"></a> Property: language usage

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Alanguage_usage" title="austalk:language_usage">language usage</a> | The languages used by this person and the contexts in which they are used. | schema:Text | schema:Person |
### <a id="austalk%3Aless_than_a_year" title="austalk:less_than_a_year"></a> Property: less than a year

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aless_than_a_year" title="austalk:less_than_a_year">less than a year</a> | Boolean value true if this person has resided less than a year in the specified town. | schema:Boolean | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Amap" title="austalk:map"></a> Property: map

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Amap" title="austalk:map">map</a> | The map being used in the map task. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Amaptaskcomment" title="austalk:maptaskcomment"></a> Property: maptaskcomment

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Amaptaskcomment" title="austalk:maptaskcomment">maptaskcomment</a> | A comment on the map task. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Amother_accent" title="austalk:mother_accent"></a> Property: mother accent

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Amother_accent" title="austalk:mother_accent">mother accent</a> | The accent of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_cultural_heritage" title="austalk:mother_cultural_heritage"></a> Property: mother cultural heritage

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Amother_cultural_heritage" title="austalk:mother_cultural_heritage">mother cultural heritage</a> | The cultural heritage of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_education_level" title="austalk:mother_education_level"></a> Property: mother education level

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Amother_education_level" title="austalk:mother_education_level">mother education level</a> | The highest level of education of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_first_language" title="austalk:mother_first_language"></a> Property: mother first language

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Amother_first_language" title="austalk:mother_first_language">mother first language</a> | The first language of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_professional_category" title="austalk:mother_professional_category"></a> Property: mother professional category

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Amother_professional_category" title="austalk:mother_professional_category">mother professional category</a> | The professional category of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_pob_town" title="austalk:mother_pob_town"></a> Property: mother's birth town

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Amother_pob_town" title="austalk:mother_pob_town">mother's birth town</a> | The town where the mother of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Amother_pob_country" title="austalk:mother_pob_country"></a> Property: mother's country of birth

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Amother_pob_country" title="austalk:mother_pob_country">mother's country of birth</a> | The country where the mother of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Amother_pob_state" title="austalk:mother_pob_state"></a> Property: mothers birth state

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Amother_pob_state" title="austalk:mother_pob_state">mothers birth state</a> | The state where the mother of this person was born. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Aname" title="austalk:name"></a> Property: name

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aname" title="austalk:name">name</a> | The name of the thing. | schema:Text | owl:Class |
### <a id="austalk%3Aother_languages" title="austalk:other_languages"></a> Property: other languages

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aother_languages" title="austalk:other_languages">other languages</a> | Other languages spoken or understood by this person. | schema:Text | schema:Person |
### <a id="austalk%3Apiercings_details" title="austalk:piercings_details"></a> Property: piercings details

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Apiercings_details" title="austalk:piercings_details">piercings details</a> | Details of the facial piercings of this person. | schema:Text | schema:Person |
### <a id="austalk%3Apob_state" title="austalk:pob_state"></a> Property: pob state

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Apob_state" title="austalk:pob_state">pob state</a> | The state where this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Apob_town" title="austalk:pob_town"></a> Property: pob town

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Apob_town" title="austalk:pob_town">pob town</a> | The town where this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Aprofessional_category" title="austalk:professional_category"></a> Property: professional category

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aprofessional_category" title="austalk:professional_category">professional category</a> | The professional category of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aprofessional_occupation" title="austalk:professional_occupation"></a> Property: professional occupation

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aprofessional_occupation" title="austalk:professional_occupation">professional occupation</a> | The professional occupation of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aprofessional_qualification" title="austalk:professional_qualification"></a> Property: professional qualification

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aprofessional_qualification" title="austalk:professional_qualification">professional qualification</a> | The professional qualification of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aprompt" title="austalk:prompt"></a> Property: prompt

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aprompt" title="austalk:prompt">prompt</a> | The prompt text shown when recording an item. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Aprototype" title="austalk:prototype"></a> Property: prototype

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aprototype" title="austalk:prototype">prototype</a> | A link to the prototype session/component/item for this thing. |  |  |
### <a id="austalk%3Areading_problems_details" title="austalk:reading_problems_details"></a> Property: reading problems details

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Areading_problems_details" title="austalk:reading_problems_details">reading problems details</a> | Details of the reading problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Arecording_site" title="austalk:recording_site"></a> Property: recording site

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Arecording_site" title="austalk:recording_site">recording site</a> | A URI of the recording site where the recording was made. | <a href="#austalk%3ARecordingSite" title="austalk:RecordingSite">RecordingSite</a> | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Aresearch_assistant" title="austalk:research_assistant"></a> Property: research assistant

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aresearch_assistant" title="austalk:research_assistant">research assistant</a> | The research assistant who ran the recording session. | schema:Person | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Aresidential_history" title="austalk:residential_history"></a> Property: residential history

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aresidential_history" title="austalk:residential_history">residential history</a> | The residential history of this person, including the person's age and duration at each location. | schema:Text | schema:Person |
### <a id="austalk%3Ases" title="austalk:ses"></a> Property: ses

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ases" title="austalk:ses">ses</a> | The socio-economic status (SES) of this person (e.g. professional or non-professional). | schema:Text | schema:Person |
### <a id="austalk%3Asession" title="austalk:session"></a> Property: session

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Asession" title="austalk:session">session</a> | The session of each component. | schema:Text | schema:Person |
### <a id="austalk%3Ashortname" title="austalk:shortname"></a> Property: shortname

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Ashortname" title="austalk:shortname">shortname</a> | The short name for a component. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Asituation" title="austalk:situation"></a> Property: situation

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Asituation" title="austalk:situation">situation</a> | The situations in which a language is used by this person. | schema:Text | schema:Person |
### <a id="austalk%3Aspeech_problems_details" title="austalk:speech_problems_details"></a> Property: speech problems details

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aspeech_problems_details" title="austalk:speech_problems_details">speech problems details</a> | Details of the speech problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Astate" title="austalk:state"></a> Property: state

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Astate" title="austalk:state">state</a> | The state in which this person has residential history. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Afather_pob_state" title="austalk:father_pob_state"></a> Property: state of birth of Father

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Afather_pob_state" title="austalk:father_pob_state">state of birth of Father</a> | The state where the father of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Astudent_aspiration" title="austalk:student_aspiration"></a> Property: student aspiration

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Astudent_aspiration" title="austalk:student_aspiration">student aspiration</a> | The career aspirations of this person who is a student. | schema:Text | schema:Person |
### <a id="austalk%3Astudent_course" title="austalk:student_course"></a> Property: student course

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Astudent_course" title="austalk:student_course">student course</a> | The course that this person who is a student is enrolled in. | schema:Text | schema:Person |
### <a id="austalk%3Astudent_enrollment" title="austalk:student_enrollment"></a> Property: student enrollment

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Astudent_enrollment" title="austalk:student_enrollment">student enrollment</a> | The enrollment status of this person who is a student (e.g. fulltime, parttime, null). | schema:Text | schema:Person |
### <a id="austalk%3Atown" title="austalk:town"></a> Property: town

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Atown" title="austalk:town">town</a> | The town in which this person has residential history. | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Atype" title="austalk:type"></a> Property: type

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Atype" title="austalk:type">type</a> | The type of the media file (e.g. audio or video). | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Aversion" title="austalk:version"></a> Property: version

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Aversion" title="austalk:version">version</a> | The version number differentiating between sets of recordings for an item (default 1, incremented for additional recordings). | schema:Text | <a href="#ausnc%3AAusNCObject" title="ausnc:AusNCObject">AusNCObject</a> |
### <a id="austalk%3Avideorating" title="austalk:videorating"></a> Property: video rating

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Avideorating" title="austalk:videorating">video rating</a> | A rating of video quality A-D: A (A-OK), B (OK, but imperfect), C (bad, not acceptable), D (deficient or missing). | schema:Text | <a href="#austalk%3ARecordedComponent" title="austalk:RecordedComponent">Recorded Component</a> |
### <a id="austalk%3Avocal_training_details" title="austalk:vocal_training_details"></a> Property: vocal training details

| Property | Description | Range | Occurs in Domain(s) |
| -------- | ----------- | ----------- | ----------- |
| <a href="#austalk%3Avocal_training_details" title="austalk:vocal_training_details">vocal training details</a> | Details of the vocal training of this person. | schema:Text | schema:Person |
## Property Values

No PropertyValue entities are defined.



<br>

## Defined Term Sets

### <a id="austalk%3AChannelTerms"></a>Defined Term Set: ChannelTerms

ID: austalk:ChannelTerms

Set of defined terms for austalk:channel.

| Term | Description |
| ---- | ----------- |
| <a id="austalk%3ABoundaryDeskMic">BoundaryDeskMic</a> | Boundary / desk mic - Shure MX391/O. On table, ~ 60cm from speaker. |
| <a id="austalk%3ALeftC2Mic">LeftC2Mic</a> | Left C-2 mic - Behringer C-2 microphone. On table, ~60 cm from speaker, to record hands-free voice interaction conditions. |
| <a id="austalk%3AMainSpeakerMic">MainSpeakerMic</a> | Main speaker mic - a head-worn AudioTechnica AT892c microphone used to record the main speaker in the recordings. This is the primary audio channel for most analyses of the data. |
| <a id="austalk%3AMaptaskRAMic">MaptaskRAMic</a> | Maptask / RA mic - a head-worn AudioTechnica AT892c microphone used to record the research assistant. |
| <a id="austalk%3ARightC2Mic">RightC2Mic</a> | Right C-2 mic - Behringer C-2 microphone. On table, ~60 cm from speaker, to record hands-free voice interaction conditions. |
| <a id="austalk%3AStrobeChannel">StrobeChannel</a> | Strobe channel - contains GPIO sync signal for aligning recordings. |



