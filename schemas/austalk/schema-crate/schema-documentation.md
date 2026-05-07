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
| <a href="#austalk%3Achannel">channel</a> | No | The channel name of the media file. | austalk:ChannelTerms |  |
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
| <a href="#austalk%3Arecording_site">recording site</a> | No | A URI of the recording site where the recording was made. | austalk:RecordingSite |  |
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

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The age from which this person has resided in the specified town. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Aage_to"></a> Property: age to

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The age to which this person has resided in the specified town. If still residing there, use null. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Aaudiorating"></a> Property: audio rating

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A rating of audio quality A-D: A (A-OK), B (OK, but imperfect), C (bad, not acceptable), D (deficient or missing). | schema:Text | austalk:RecordedComponent |
### <a id="austalk%3Abasename"></a> Property: basename

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
|  The base name of a media file without path, comprised of the speaker, session, component and prompt numbers. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3AbirthPlace"></a> Property: birthPlace

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The place of birth of this person (geolocated). | geo:Feature | schema:Person |
### <a id="austalk%3AcameraSN0"></a> Property: cameraSN0

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The serial number of camera 0. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3AcameraSN1"></a> Property: cameraSN1

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The serial number of camera 1. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Achannel"></a> Property: channel

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The channel name of the media file. | austalk:ChannelTerms | ausnc:AusNCObject |
### <a id="austalk%3Achecksum"></a> Property: checksum

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The checksum of the media file for integrity verification. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Acity"></a> Property: city

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The city of the recording site. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Acomment"></a> Property: comment

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A comment on the recording quality. | schema:Text | austalk:RecordedComponent |
### <a id="austalk%3Aconsent"></a> Property: consent

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has signed the consent form. | schema:Boolean | schema:Person |
### <a id="austalk%3Acountry"></a> Property: country

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The country in which this person has residential history. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Apob_country"></a> Property: country of birth

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The country where this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Acultural_heritage"></a> Property: cultural heritage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The cultural heritage of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aeducation_level"></a> Property: education level

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The highest level of education of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_accent"></a> Property: father accent

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The accent of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_cultural_heritage"></a> Property: father cultural heritage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The cultural heritage of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_education_level"></a> Property: father education level

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The highest level of education of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_first_language"></a> Property: father first language

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The first language of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afather_pob_country"></a> Property: father pob country

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The country where the father of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Afather_pob_town"></a> Property: father pob town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The town where the father of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Afather_professional_category"></a> Property: father professional category

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The professional category of the father of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afirst_language"></a> Property: first language

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The first language of this person. | schema:Text | schema:Person |
### <a id="austalk%3Afrequency"></a> Property: frequency

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The frequency of use of a language by this person, on a scale of 1-100. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Ahas_dentures"></a> Property: has dentures

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has dentures. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_health_problems"></a> Property: has health problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has health problems which might affect his/her voice. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_hearing_problems"></a> Property: has hearing problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has hearing problems. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_hobbies"></a> Property: has hobbies

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has hobbies. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_piercings"></a> Property: has piercings

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has facial piercings. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_reading_problems"></a> Property: has reading problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has reading problems. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_speech_problems"></a> Property: has speech problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has speech problems. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahas_vocal_training"></a> Property: has vocal training

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has vocal training. | schema:Boolean | schema:Person |
### <a id="austalk%3Ahealth_problems_details"></a> Property: health problems details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the health problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Ahearing_problems_details"></a> Property: hearing problems details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the hearing problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Ahobbies_details"></a> Property: hobbies details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the hobbies of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aid"></a> Property: id

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The numerical identifier for a session/component/item. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Ainformation_follower"></a> Property: information follower

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The participant whose role was information follower in the map task. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Ainformation_giver"></a> Property: information giver

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The participant whose role was information giver in the map task. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Ainstitution"></a> Property: institution

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The institution associated with the recording site. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Ais_left_handed"></a> Property: is left handed

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person is left handed. | schema:Boolean | schema:Person |
### <a id="austalk%3Ais_smoker"></a> Property: is smoker

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person is a smoker. | schema:Boolean | schema:Person |
### <a id="austalk%3Ais_student"></a> Property: is student

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person is a student. | schema:Boolean | schema:Person |
### <a id="austalk%3Alanguage_usage"></a> Property: language usage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The languages used by this person and the contexts in which they are used. | schema:Text | schema:Person |
### <a id="austalk%3Aless_than_a_year"></a> Property: less than a year

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Boolean value true if this person has resided less than a year in the specified town. | schema:Boolean | ausnc:AusNCObject |
### <a id="austalk%3Amap"></a> Property: map

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The map being used in the map task. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Amaptaskcomment"></a> Property: maptaskcomment

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A comment on the map task. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Amother_accent"></a> Property: mother accent

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The accent of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_cultural_heritage"></a> Property: mother cultural heritage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The cultural heritage of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_education_level"></a> Property: mother education level

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The highest level of education of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_first_language"></a> Property: mother first language

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The first language of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_professional_category"></a> Property: mother professional category

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The professional category of the mother of this person. | schema:Text | schema:Person |
### <a id="austalk%3Amother_pob_town"></a> Property: mother's birth town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The town where the mother of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Amother_pob_country"></a> Property: mother's country of birth

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The country where the mother of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Amother_pob_state"></a> Property: mothers birth state

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The state where the mother of this person was born. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Aname"></a> Property: name

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The name of the thing. | schema:Text | owl:Class |
### <a id="austalk%3Aother_languages"></a> Property: other languages

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Other languages spoken or understood by this person. | schema:Text | schema:Person |
### <a id="austalk%3Apiercings_details"></a> Property: piercings details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the facial piercings of this person. | schema:Text | schema:Person |
### <a id="austalk%3Apob_state"></a> Property: pob state

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The state where this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Apob_town"></a> Property: pob town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The town where this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Aprofessional_category"></a> Property: professional category

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The professional category of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aprofessional_occupation"></a> Property: professional occupation

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The professional occupation of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aprofessional_qualification"></a> Property: professional qualification

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The professional qualification of this person. | schema:Text | schema:Person |
### <a id="austalk%3Aprompt"></a> Property: prompt

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The prompt text shown when recording an item. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Aprototype"></a> Property: prototype

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A link to the prototype session/component/item for this thing. |  |  |
### <a id="austalk%3Areading_problems_details"></a> Property: reading problems details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the reading problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Arecording_site"></a> Property: recording site

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A URI of the recording site where the recording was made. | austalk:RecordingSite | ausnc:AusNCObject |
### <a id="austalk%3Aresearch_assistant"></a> Property: research assistant

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The research assistant who ran the recording session. | schema:Person | ausnc:AusNCObject |
### <a id="austalk%3Aresidential_history"></a> Property: residential history

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The residential history of this person, including the person's age and duration at each location. | schema:Text | schema:Person |
### <a id="austalk%3Ases"></a> Property: ses

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The socio-economic status (SES) of this person (e.g. professional or non-professional). | schema:Text | schema:Person |
### <a id="austalk%3Asession"></a> Property: session

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The session of each component. | schema:Text | schema:Person |
### <a id="austalk%3Ashortname"></a> Property: shortname

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The short name for a component. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Asituation"></a> Property: situation

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The situations in which a language is used by this person. | schema:Text | schema:Person |
### <a id="austalk%3Aspeech_problems_details"></a> Property: speech problems details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Details of the speech problems of this person. | schema:Text | schema:Person |
### <a id="austalk%3Astate"></a> Property: state

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The state in which this person has residential history. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Afather_pob_state"></a> Property: state of birth of Father

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The state where the father of this person was born. | schema:Text | schema:Person |
### <a id="austalk%3Astudent_aspiration"></a> Property: student aspiration

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The career aspirations of this person who is a student. | schema:Text | schema:Person |
### <a id="austalk%3Astudent_course"></a> Property: student course

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The course that this person who is a student is enrolled in. | schema:Text | schema:Person |
### <a id="austalk%3Astudent_enrollment"></a> Property: student enrollment

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The enrollment status of this person who is a student (e.g. fulltime, parttime, null). | schema:Text | schema:Person |
### <a id="austalk%3Atown"></a> Property: town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The town in which this person has residential history. | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Atype"></a> Property: type

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The type of the media file (e.g. audio or video). | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Aversion"></a> Property: version

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The version number differentiating between sets of recordings for an item (default 1, incremented for additional recordings). | schema:Text | ausnc:AusNCObject |
### <a id="austalk%3Avideorating"></a> Property: video rating

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| A rating of video quality A-D: A (A-OK), B (OK, but imperfect), C (bad, not acceptable), D (deficient or missing). | schema:Text | austalk:RecordedComponent |
### <a id="austalk%3Avocal_training_details"></a> Property: vocal training details

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
| <a id="austalk%3ABoundaryDeskMic">BoundaryDeskMic</a> | Boundary / desk mic - Shure MX391/O. On table, ~ 60cm from speaker. |
| <a id="austalk%3ALeftC2Mic">LeftC2Mic</a> | Left C-2 mic - Behringer C-2 microphone. On table, ~60 cm from speaker, to record hands-free voice interaction conditions. |
| <a id="austalk%3AMainSpeakerMic">MainSpeakerMic</a> | Main speaker mic - a head-worn AudioTechnica AT892c microphone used to record the main speaker in the recordings. This is the primary audio channel for most analyses of the data. |
| <a id="austalk%3AMaptaskRAMic">MaptaskRAMic</a> | Maptask / RA mic - a head-worn AudioTechnica AT892c microphone used to record the research assistant. |
| <a id="austalk%3ARightC2Mic">RightC2Mic</a> | Right C-2 mic - Behringer C-2 microphone. On table, ~60 cm from speaker, to record hands-free voice interaction conditions. |
| <a id="austalk%3AStrobeChannel">StrobeChannel</a> | Strobe channel - contains GPIO sync signal for aligning recordings. |



