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


### <a id="ausnc%3AAusNCObject"></a> Class: AusNCObject

An individual item in the corpus - one recording of a prompt/interview/map task.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#austalk%3Aage_from">age from</a> | No | The age from which this person has resided in the specified town. | schema:Text |  |
| <a href="#austalk%3Aage_to">age to</a> | No | The age to which this person has resided in the specified town. If still residing there, use null. | schema:Text |  |
| <a href="#austalk%3Abasename">basename</a> | No |  The base name of a media file without path, comprised of the speaker, session, component and prompt numbers. | schema:Text |  |
| <a href="#austalk%3AcameraSN0">cameraSN0</a> | No | The serial number of camera 0. | schema:Text |  |
| <a href="#austalk%3AcameraSN1">cameraSN1</a> | No | The serial number of camera 1. | schema:Text |  |
| <a href="#austalk%3Achannel">channel</a> | No | The channel name of the media file. | <a href="#austalk%3AChannelTerms">ChannelTerms</a> |  |
| <a href="#austalk%3Achecksum">checksum</a> | No | The checksum of the media file for integrity verification. | schema:Text |  |
| <a href="#austalk%3Acity">city</a> | No | The city of the recording site. | schema:Text |  |
| <a href="#austalk%3Acountry">country</a> | No | The country in which this person has residential history. | schema:Text |  |
| <a href="#austalk%3Afrequency">frequency</a> | No | The frequency of use of a language by this person, on a scale of 1-100. | schema:Text |  |
| <a href="#austalk%3Aid">id</a> | No | The numerical identifier for a session/component/item. | schema:Text |  |
| <a href="#austalk%3Ainformation_follower">information follower</a> | No | The participant whose role was information follower in the map task. | schema:Text |  |
| <a href="#austalk%3Ainformation_giver">information giver</a> | No | The participant whose role was information giver in the map task. | schema:Text |  |
| <a href="#austalk%3Ainstitution">institution</a> | No | The institution associated with the recording site. | schema:Text |  |
| <a href="#austalk%3Aless_than_a_year">less than a year</a> | No | Boolean value true if this person has resided less than a year in the specified town. | schema:Boolean |  |
| <a href="#austalk%3Amap">map</a> | No | The map being used in the map task. | schema:Text |  |
| <a href="#austalk%3Amaptaskcomment">maptaskcomment</a> | No | A comment on the map task. | schema:Text |  |
| <a href="#austalk%3Amother_pob_state">mothers birth state</a> | No | The state where the mother of this person was born. | schema:Text |  |
| <a href="#austalk%3Aprompt">prompt</a> | No | The prompt text shown when recording an item. | schema:Text |  |
| <a href="#austalk%3Arecording_site">recording site</a> | No | A URI of the recording site where the recording was made. | <a href="#austalk%3ARecordingSite">RecordingSite</a> |  |
| <a href="#austalk%3Aresearch_assistant">research assistant</a> | No | The research assistant who ran the recording session. | schema:Person |  |
| <a href="#austalk%3Ashortname">shortname</a> | No | The short name for a component. | schema:Text |  |
| <a href="#austalk%3Astate">state</a> | No | The state in which this person has residential history. | schema:Text |  |
| <a href="#austalk%3Atown">town</a> | No | The town in which this person has residential history. | schema:Text |  |
| <a href="#austalk%3Atype">type</a> | No | The type of the media file (e.g. audio or video). | schema:Text |  |
| <a href="#austalk%3Aversion">version</a> | No | The version number differentiating between sets of recordings for an item (default 1, incremented for additional recordings). | schema:Text |  |


### <a id="austalk%3ARecordedComponent"></a> Class: Recorded Component

An instance of a component for one participant.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#austalk%3Aaudiorating">audio rating</a> | No | A rating of audio quality A-D: A (A-OK), B (OK, but imperfect), C (bad, not acceptable), D (deficient or missing). | schema:Text |  |
| <a href="#austalk%3Acomment">comment</a> | No | A comment on the recording quality. | schema:Text |  |
| <a href="#austalk%3Avideorating">video rating</a> | No | A rating of video quality A-D: A (A-OK), B (OK, but imperfect), C (bad, not acceptable), D (deficient or missing). | schema:Text |  |


### <a id="austalk%3ARecordingSite"></a> Class: RecordingSite

A physical location where recordings were made.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*


## All Properties

### <a id="austalk%3Aage_from"></a> Property: age from

ID: austalk:age_from

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The age from which this person has resided in the specified town. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Aage_to"></a> Property: age to

ID: austalk:age_to

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The age to which this person has resided in the specified town. If still residing there, use null. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Aaudiorating"></a> Property: audio rating

ID: austalk:audiorating

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A rating of audio quality A-D: A (A-OK), B (OK, but imperfect), C (bad, not acceptable), D (deficient or missing). | schema:Text | <a href="#austalk%3ARecordedComponent">Recorded Component</a> |
### <a id="austalk%3Abasename"></a> Property: basename

ID: austalk:basename

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
|  The base name of a media file without path, comprised of the speaker, session, component and prompt numbers. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3AbirthPlace"></a> Property: birthPlace

ID: austalk:birthPlace

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The place of birth of this person (geolocated). | geo:Feature | schema:Person |
### <a id="austalk%3AcameraSN0"></a> Property: cameraSN0

ID: austalk:cameraSN0

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The serial number of camera 0. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3AcameraSN1"></a> Property: cameraSN1

ID: austalk:cameraSN1

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The serial number of camera 1. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Achannel"></a> Property: channel

ID: austalk:channel

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The channel name of the media file. | <a href="#austalk%3AChannelTerms">ChannelTerms</a> | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Achecksum"></a> Property: checksum

ID: austalk:checksum

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The checksum of the media file for integrity verification. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Acity"></a> Property: city

ID: austalk:city

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The city of the recording site. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Acomment"></a> Property: comment

ID: austalk:comment

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A comment on the recording quality. | schema:Text | <a href="#austalk%3ARecordedComponent">Recorded Component</a> |
### <a id="austalk%3Aconsent"></a> Property: consent

ID: austalk:consent

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has signed the consent form. | schema:Boolean | schema:Person |
### <a id="austalk%3Acountry"></a> Property: country

ID: austalk:country

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The country in which this person has residential history. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Apob_country"></a> Property: country of birth

ID: austalk:pob_country

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The country where this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Acultural_heritage"></a> Property: cultural heritage

ID: austalk:cultural_heritage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The cultural heritage of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aeducation_level"></a> Property: education level

ID: austalk:education_level

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The highest level of education of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_accent"></a> Property: father accent

ID: austalk:father_accent

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The accent of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_cultural_heritage"></a> Property: father cultural heritage

ID: austalk:father_cultural_heritage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The cultural heritage of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_education_level"></a> Property: father education level

ID: austalk:father_education_level

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The highest level of education of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_first_language"></a> Property: father first language

ID: austalk:father_first_language

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The first language of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_pob_country"></a> Property: father pob country

ID: austalk:father_pob_country

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The country where the father of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Afather_pob_town"></a> Property: father pob town

ID: austalk:father_pob_town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The town where the father of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Afather_professional_category"></a> Property: father professional category

ID: austalk:father_professional_category

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The professional category of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afirst_language"></a> Property: first language

ID: austalk:first_language

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The first language of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afrequency"></a> Property: frequency

ID: austalk:frequency

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The frequency of use of a language by this person, on a scale of 1-100. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Ahas_dentures"></a> Property: has dentures

ID: austalk:has_dentures

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has dentures. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_health_problems"></a> Property: has health problems

ID: austalk:has_health_problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has health problems which might affect his/her voice. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_hearing_problems"></a> Property: has hearing problems

ID: austalk:has_hearing_problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has hearing problems. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_hobbies"></a> Property: has hobbies

ID: austalk:has_hobbies

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has hobbies. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_piercings"></a> Property: has piercings

ID: austalk:has_piercings

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has facial piercings. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_reading_problems"></a> Property: has reading problems

ID: austalk:has_reading_problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has reading problems. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_speech_problems"></a> Property: has speech problems

ID: austalk:has_speech_problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has speech problems. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_vocal_training"></a> Property: has vocal training

ID: austalk:has_vocal_training

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has vocal training. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahealth_problems_details"></a> Property: health problems details

ID: austalk:health_problems_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the health problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Ahearing_problems_details"></a> Property: hearing problems details

ID: austalk:hearing_problems_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the hearing problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Ahobbies_details"></a> Property: hobbies details

ID: austalk:hobbies_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the hobbies of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aid"></a> Property: id

ID: austalk:id

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The numerical identifier for a session/component/item. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Ainformation_follower"></a> Property: information follower

ID: austalk:information_follower

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The participant whose role was information follower in the map task. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Ainformation_giver"></a> Property: information giver

ID: austalk:information_giver

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The participant whose role was information giver in the map task. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Ainstitution"></a> Property: institution

ID: austalk:institution

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The institution associated with the recording site. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Ais_left_handed"></a> Property: is left handed

ID: austalk:is_left_handed

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person is left handed. | schema:Boolean | schema:Person |
### <a id="austalk%3Ais_smoker"></a> Property: is smoker

ID: austalk:is_smoker

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person is a smoker. | schema:Boolean | schema:Person |
### <a id="austalk%3Ais_student"></a> Property: is student

ID: austalk:is_student

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person is a student. | schema:Boolean | schema:Person |
### <a id="austalk%3Alanguage_usage"></a> Property: language usage

ID: austalk:language_usage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The languages used by this person and the contexts in which they are used. | schema:Text | schema:Person |
### <a id="austalk%3Aless_than_a_year"></a> Property: less than a year

ID: austalk:less_than_a_year

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has resided less than a year in the specified town. | schema:Boolean | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Amap"></a> Property: map

ID: austalk:map

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The map being used in the map task. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Amaptaskcomment"></a> Property: maptaskcomment

ID: austalk:maptaskcomment

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A comment on the map task. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Amother_accent"></a> Property: mother accent

ID: austalk:mother_accent

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The accent of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_cultural_heritage"></a> Property: mother cultural heritage

ID: austalk:mother_cultural_heritage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The cultural heritage of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_education_level"></a> Property: mother education level

ID: austalk:mother_education_level

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The highest level of education of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_first_language"></a> Property: mother first language

ID: austalk:mother_first_language

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The first language of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_professional_category"></a> Property: mother professional category

ID: austalk:mother_professional_category

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The professional category of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_pob_town"></a> Property: mother's birth town

ID: austalk:mother_pob_town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The town where the mother of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Amother_pob_country"></a> Property: mother's country of birth

ID: austalk:mother_pob_country

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The country where the mother of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Amother_pob_state"></a> Property: mothers birth state

ID: austalk:mother_pob_state

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The state where the mother of this person was born. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Aname"></a> Property: name

ID: austalk:name

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The name of the thing. | schema:Text | owl:Class |
### <a id="austalk%3Aother_languages"></a> Property: other languages

ID: austalk:other_languages

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Other languages spoken or understood by this person. | schema:Text | schema:Person |
### <a id="austalk%3Apiercings_details"></a> Property: piercings details

ID: austalk:piercings_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the facial piercings of this person. | schema:Text | schema:Person |
### <a id="austalk%3Apob_state"></a> Property: pob state

ID: austalk:pob_state

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The state where this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Apob_town"></a> Property: pob town

ID: austalk:pob_town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The town where this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Aprofessional_category"></a> Property: professional category

ID: austalk:professional_category

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The professional category of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aprofessional_occupation"></a> Property: professional occupation

ID: austalk:professional_occupation

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The professional occupation of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aprofessional_qualification"></a> Property: professional qualification

ID: austalk:professional_qualification

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The professional qualification of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aprompt"></a> Property: prompt

ID: austalk:prompt

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The prompt text shown when recording an item. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Aprototype"></a> Property: prototype

ID: austalk:prototype

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A link to the prototype session/component/item for this thing. |  |  |
### <a id="austalk%3Areading_problems_details"></a> Property: reading problems details

ID: austalk:reading_problems_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the reading problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Arecording_site"></a> Property: recording site

ID: austalk:recording_site

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A URI of the recording site where the recording was made. | <a href="#austalk%3ARecordingSite">RecordingSite</a> | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Aresearch_assistant"></a> Property: research assistant

ID: austalk:research_assistant

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The research assistant who ran the recording session. | schema:Person | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Aresidential_history"></a> Property: residential history

ID: austalk:residential_history

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The residential history of this person, including the person's age and duration at each location. | schema:Text | schema:Person |
### <a id="austalk%3Ases"></a> Property: ses

ID: austalk:ses

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The socio-economic status (SES) of this person (e.g. professional or non-professional). | schema:Text | schema:Person |
### <a id="austalk%3Asession"></a> Property: session

ID: austalk:session

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The session of each component. | schema:Text | schema:Person |
### <a id="austalk%3Ashortname"></a> Property: shortname

ID: austalk:shortname

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The short name for a component. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Asituation"></a> Property: situation

ID: austalk:situation

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The situations in which a language is used by this person. | schema:Text | schema:Person |
### <a id="austalk%3Aspeech_problems_details"></a> Property: speech problems details

ID: austalk:speech_problems_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the speech problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Astate"></a> Property: state

ID: austalk:state

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The state in which this person has residential history. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Afather_pob_state"></a> Property: state of birth of Father

ID: austalk:father_pob_state

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The state where the father of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Astudent_aspiration"></a> Property: student aspiration

ID: austalk:student_aspiration

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The career aspirations of this person who is a student. | schema:Text | schema:Person |
### <a id="austalk%3Astudent_course"></a> Property: student course

ID: austalk:student_course

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The course that this person who is a student is enrolled in. | schema:Text | schema:Person |
### <a id="austalk%3Astudent_enrollment"></a> Property: student enrollment

ID: austalk:student_enrollment

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The enrollment status of this person who is a student (e.g. fulltime, parttime, null). | schema:Text | schema:Person |
### <a id="austalk%3Atown"></a> Property: town

ID: austalk:town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The town in which this person has residential history. | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Atype"></a> Property: type

ID: austalk:type

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The type of the media file (e.g. audio or video). | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Aversion"></a> Property: version

ID: austalk:version

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The version number differentiating between sets of recordings for an item (default 1, incremented for additional recordings). | schema:Text | <a href="#ausnc%3AAusNCObject">AusNCObject</a> |
### <a id="austalk%3Avideorating"></a> Property: video rating

ID: austalk:videorating

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A rating of video quality A-D: A (A-OK), B (OK, but imperfect), C (bad, not acceptable), D (deficient or missing). | schema:Text | <a href="#austalk%3ARecordedComponent">Recorded Component</a> |
### <a id="austalk%3Avocal_training_details"></a> Property: vocal training details

ID: austalk:vocal_training_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the vocal training of this person. | schema:Text | schema:Person |


<br>

## Defined Term Sets

### <a id="austalk%3AChannelTerms"></a>Defined Term Set: ChannelTerms

ID: austalk:ChannelTerms

Set of defined terms for austalk:channel.

| Term | Description |
| ---- | ----------- |
### <a id="austalk%3ABoundaryDeskMic"></a>Defined Term: BoundaryDeskMic <a href="https://w3id.org/ldac/terms#BoundaryDeskMic" target="_blank" rel="noopener">ⓘ</a>
ID: austalk:BoundaryDeskMic

Boundary / desk mic - Shure MX391/O. On table, ~ 60cm from speaker.

### <a id="austalk%3ALeftC2Mic"></a>Defined Term: LeftC2Mic <a href="https://w3id.org/ldac/terms#LeftC2Mic" target="_blank" rel="noopener">ⓘ</a>
ID: austalk:LeftC2Mic

Left C-2 mic - Behringer C-2 microphone. On table, ~60 cm from speaker, to record hands-free voice interaction conditions.

### <a id="austalk%3AMainSpeakerMic"></a>Defined Term: MainSpeakerMic <a href="https://w3id.org/ldac/terms#MainSpeakerMic" target="_blank" rel="noopener">ⓘ</a>
ID: austalk:MainSpeakerMic

Main speaker mic - a head-worn AudioTechnica AT892c microphone used to record the main speaker in the recordings. This is the primary audio channel for most analyses of the data.

### <a id="austalk%3AMaptaskRAMic"></a>Defined Term: MaptaskRAMic <a href="https://w3id.org/ldac/terms#MaptaskRAMic" target="_blank" rel="noopener">ⓘ</a>
ID: austalk:MaptaskRAMic

Maptask / RA mic - a head-worn AudioTechnica AT892c microphone used to record the research assistant.

### <a id="austalk%3ARightC2Mic"></a>Defined Term: RightC2Mic <a href="https://w3id.org/ldac/terms#RightC2Mic" target="_blank" rel="noopener">ⓘ</a>
ID: austalk:RightC2Mic

Right C-2 mic - Behringer C-2 microphone. On table, ~60 cm from speaker, to record hands-free voice interaction conditions.

### <a id="austalk%3AStrobeChannel"></a>Defined Term: StrobeChannel <a href="https://w3id.org/ldac/terms#StrobeChannel" target="_blank" rel="noopener">ⓘ</a>
ID: austalk:StrobeChannel

Strobe channel - contains GPIO sync signal for aligning recordings.




