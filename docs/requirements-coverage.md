# Coverage of requirements from "[The Notes] for RO-Crate Schemas and Machine Actionable Profiles"

This repository is for the development of RO-Crate Profiles and Schemas which implement the requirements set out in [The Notes] for RO-Crate Schemas and Machine Actionable Profiles.

[The Notes]: https://docs.google.com/document/d/17WRkGPIGtoQoSPlTbStBKUyHTzjrOZb620S1gdk0ei8/edit?tab=t.0#heading=h.5vdkev2g6ira
[RO-Crate Profiles Section]: https://www.researchobject.org/ro-crate/specification/1.2/profiles.html


This emerging solution meets most of the requirements set out in [The Notes] and there are potential solutions to some of the remaining points. 

> 1. MUST follow the RO-Crate design approach of implementation-neutral JSON-LD in a graph ...

This solution is based on the existing RO-Crate Profiles chapter and is 100% compatible with existing RO-Crate 1.2
  
> 2. MUST allow for communities to “RO-Crate-ise” heterogeneous existing vocabularies which may use terms specified in RDF schema languages (OWL, etc.) by providing a normalised General Purpose Schema and/or particular Profile Specific Schema which may combine terms from a variety of Schemas. (RO-Crate itself uses a core of Schema.org with terms from other schemas).

This solution allows communities to publish a Schema or profile as an RO-Crate, including any extra assets they wish such as tool specific configuration or templates, while linking back to source schemas or ontologies.


> 3. MUST allow a Profile Crate containing Profile Specific Schema to be self-contained with schema definitions, sufficient for validation purposes.

This solution follows existing advice in the [RO-Crate Profiles Section] for linking Resources e.g. 

```json
"hasResource": [
        {
          "@id": "#hasSpecializedSchema"
        },
        {
          "@id": "#hasExampleWorkflow"
        }
      ],

```


> 4. MUST be expressed in RO-Crate friendly JSON-LD (this will allow for making schemas with existing RO-Crate editors, libraries and other tools).
Remember, here we are talking about a potential RO-Crate compatible way of describing Schemas – there is nothing stopping communities using OTHER Schema Languages or validation methods and referencing them from a profile crate if this does not suit.

Done. MASP is RO-Crate based.

> 5. SHOULD build on or MAY replace (if there is a compelling reason) the existing approach to external vocabularies which is based on SoSS which implements Schema.org Data Model (That is, the solution MUST NOT require, say, an rdf:Property element as per the existing spec AND an additional constraint which is an additional entity to specify extra constraints).


The solution offered here uses the same Schema.org inspired approach to extending RO-Crate vocabulary as is already included in RO-Crate: classes are `rdfs:Class` and properties are `rdf:Property` entities, linked with `schema:domainIncludes` and `schema:rangeIncludes`, as in RO-Crate's guidance on ad hoc terms. MASP extends this with a handful of extra properties borrowed from mainstream vocabularies:

- `sh:minCount` and `sh:maxCount` from [SHACL](https://www.w3.org/TR/shacl/): how many values a property must or may have, and how many instances of a class a crate must contain.
- `prov:specializationOf` from [PROV-O](https://www.w3.org/TR/prov-o/): links a class or property rule to the term it constrains, such as `schema:Dataset` or `schema:author`, so a rule for one profile does not redefine the term itself.
- `rdfs:label` from [RDF Schema](https://www.w3.org/TR/rdf-schema/): the term as it appears in a crate (e.g. `author`), alongside a human-readable `name`.

Everything else comes from vocabularies RO-Crate already uses:

- **Schema.org:** `value` for a fixed value, `ItemList` and `itemListElement` for a set of allowed values, and `DefinedTermSet` and `inDefinedTermSet` for vocabularies.
- **The Profiles Vocabulary**, which RO-Crate uses for Profile Crates: `hasResource`, `ResourceDescriptor`, `hasRole` and `hasArtifact`, which point from the profile to its rules and documentation.

There is no separate constraint entity: each rule is a single `rdfs:Class` or `rdf:Property`.


> 6. MAY reference external parts? (this was raised in recent consultations)
>
>-  (a) External resources like SHACL using a typing/profile mechanism

This is already allowed by RO-Crate and there is a mechanism to do this - BUT if users adopt this approach then there is a high risk that there will be a very fragmented RO-Crate landscape where only certain domain clusters of crates will be able to be validated.

>-  (b) Consider inheritance of profiles or schemas, so that schemas and profiles can be modularized (with a caveat that if we choose to allow this then the complexity of validating a profile goes up considerably, and there is a risk that agents will not be able to piece together a schema or profile because of missing resources.

We are still working on this part -- ATM my thinking is that for Schema specification inheritance is essential but when developing Profiles it is probably going to be more appropriate for most implementers to choose explicitly which Classes and Properties to deal with, without trying to allow for RO-Crate metadata documents which contain entities with @types that are subclasses of things in the profile. (see 8(b)(i) below)

> 7. In a General Purpose Schema context:
> - (a) MUST allow for a community to create their own SoSS if needed (after due diligence),
>   If there are terms that are not defined elsewhere
>   Or to create a normalised vocabulary that combines terms from different schemas which may not be natively ‘RO-Crate friendly’.
> - MUST allow for inheritance (subClasses and subProperties) for compactness
>   MUST allow for inclusion of Defined Terms and other boilerplate entities that are part of the vocabulary of a domain
>   MAY not be self-contained
>   NOTE: RO-Crate can already be used for this, as the Language Data Commons Schema demonstrates: <https://w3id.org/ldac/terms>

A Schema can be authored in an RO-Crate with a human readable document and a set of Classes, Properties and boilerplate entities.


> 8. In a Profile Specific Schema context:
> - (a) MUST  allow for Classes and Properties to be specialised (typically more tightly constrained than a definition in a General Purpose Schema) for use in particular contexts. For example, the name property MAY have different descriptions and validation rules when used on a Person vs being used on a CreativeWork within a profile - and of course, profile-specific definitions are more tightly specified than in a general schema.

Done: each class can have its own rule for a property (e.g. one `name` rule with `domainIncludes` `Person` and another with `domainIncludes` `CreativeWork`), each linked to the term it specialises with `prov:specializationOf`.

>  - (b) MUST be self-contained - if a property has a range of potential type values, then the Class definitions for each type must be included.
>    - (i) MUST NOT require validators to process inheritance – this should be compiled into a set of specific expectations about which properties are allowed/required on particular types of entity. (This is based on the assumption that in a typical repository or other environment which specifies a profile - the aim is interoperability and mutual intelligibility).

This requirement may be too strict. The reference validator does process inheritance *within* a MASP crate: property rules on a class also apply to its subclasses (`rdfs:subClassOf`), so a profile does not have to repeat them. It never follows links to definitions outside the crate, so the profile stays self-contained (8(b)). Profiles can also be written flat, with no `rdfs:subClassOf` (the MASP profile itself is), in which case a validator needs no inheritance processing at all.

> - (C) MUST support machine validation of the following:
> Range / domain constraints for classes and properties by type (values could be JSON-LD entities such as defined terms (in sets), standard values (such as ways of representing programming or natural languages) or scalar types such as strings or dates, see next point).

Uses schema.org approach of domainIncludes / rangeIncludes as per existing spec 

> - (ii) Support for a range of non-entity scalar values such as dates, integers, booleans, URIs, patterns (e.g. Regex) (we could borrow a type system from JSON-Schema / XML or similar).

Done: the validator checks the scalar types `schema:Text`, `schema:URL`, `schema:Integer`, `schema:Number`, `schema:Boolean`, `schema:Date`, `schema:DateTime` and `rdfs:Literal`. 

Regular expressions are implemented using an interim solution of adding `"value": "/pattern/flags"` to a `PropertyValue` instance - see [issue #47](https://github.com/Language-Research-Technology/ro-crate-masp/issues/47) for a replacement.


>   - (iii) Special rules for one or more types of Root Data entity (e.g. the Language Data Commons profile has two possible levels of granularity for RO-Crates; the Root Data Entity may have @type [“Dataset”, “RepositoryCollection”] or [“Dataset”, “RepositoryObject”]).

Done: see the [Language Data Commons profile](https://language-research-technology.github.io/ro-crate-masp-examples/profiles/ldac/profile-crate/index.html) in the examples, which has rules for both types of Root Data Entity, and its tests in [ro-crate-masp-examples](https://github.com/Language-Research-Technology/ro-crate-masp-examples).

>    - (iv) Support for Crate-fragment profiles - e.g. a conformsTo on a CSVW table schema that might apply to part of a crate. (NOTE: this would still be self-contained in that the profile would not reference other resources)

Done: profiles can be combined via conformsTo references on any entity allowing for a profile to validate a set of things it cares about -- not all profiles using this approach need to worry about Root Data Entities - they can focus on rules relating to other things.

>   - (v) Range / domain cardinality (relates to existing support for MUST, SHOULD, COULD, etc).
>   Occurrence of entities in the graph without other constraints - e.g. “there must be exactly one image entity in a crate” but not important what property links to it.

Done: class and property rules have cardinality constraints via `sh:minCount` and `sh:maxCount`. Generated documentation translates these into MUST / SHOULD / MAY; see the [MASP profile documentation](../profiles/ro-crate-masp/profile-crate/profile-documentation.md) for an example.


>   - (vii) Support for complex chaining? e.g. the hasPart requirement that File entities are linked from the root? (NOTE, IMO This is something that (a) may need to be coded procedurally in validators rather than expressed in a declarative way and (b) could be dropped in RO-Crate 2 – if we have clear definitions for attached and Detached entities, then what is the point of the requirements that they be listed? Validators and visualisers can find them.)

Not addressed. It is not clear if this is a requirement.

> 9. MUST allow for generation of human-readable documentation for inclusion in profile crates or stand alone Schema documentation (combined with explanatory text and examples) from the schema.

Done: see the [MASP tools (JavaScript)](https://github.com/crate-works/ro-crate-masp-tools).

> 10. MUST have a demonstrated ability to drive an RO-Crate editor such as Crate-O, Nova-Crate, either directly or via transformations of Schema terms into an editor-specific configuration.

Done: see the [README](../README.md#editors) for known implementations.