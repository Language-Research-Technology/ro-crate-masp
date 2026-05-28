---
title: Template Schema
---

# Template Schema

The template schema is used as a basis for creating new schemas.

<br>

## Types of entities (specializations of Classes) and expected Properties


### <a id="template%3AClassExample" title="template:ClassExample"></a> Class: ClassExample

This is an example of a class and its format.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
| <a href="#template%3ApropertyExample" title="template:propertyExample">propertyExample</a> |  | No | This is an example of a property and its format. | schema:Text |  |

## All Properties

### <a id="template%3ApropertyExample" title="template:propertyExample"></a> Property: propertyExample

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#template%3ApropertyExample" title="template:propertyExample">propertyExample</a> |  | This is an example of a property and its format. | schema:Text | <a href="#template%3AClassExample" title="template:ClassExample">ClassExample</a> |



