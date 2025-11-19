# Coverage of requirements from "[The Notes] for RO-Crate Schemas and Machine Actionable Profiles"

This repository is for the development of RO-Crate Profiles and Schemas which implements the requirements set out in [The Notes] for RO-Crate Schemas and Machine Actionable Profiles.

[The Notes]: https://docs.google.com/document/d/17WRkGPIGtoQoSPlTbStBKUyHTzjrOZb620S1gdk0ei8/edit?tab=t.0#heading=h.5vdkev2g6ira 


This emerging solution meets most of the requirements set out in [The Notes] and there are potential solutions to some of the remaining points. 

> 1. MUST follow the RO-Crate design approach of implementation-neutral JSON-LD in a graph ...

This solution is based on the existing RO-Crate Profiles chapter and is 100% compatible with existing RO-Crate 1.2
  
> 2. MUST allow for communities to “RO-Crate-ise” heterogeneous existing vocabularies which may use terms specified in RDF schema languages (OWL, etc.) by providing a normalised General Purpose Schema and/or particular Profile Specific Schema which may combine terms from a variety of Schemas. (RO-Crate itself uses a core of Schema.org with terms from other schemas).

This solution allows communities to publish a Schema or profile in an RO-Crate friendly format while linking back to source schemas or ontologies.


> 3. MUST allow a Profile Crate containing Profile Specific Schema to be self-contained with schema definitions, sufficient for validation purposes.

This solution follows existing advice in the [RO-Crate Profiles Section] for linking Resources e.g. 

```
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
> 5. SHOULD build on or MAY replace (if there is a compelling reason) the existing approach to external vocabularies which is based on SoSS which implements Schema.org Data Model (That is, the solution MUST NOT require, say, an rdf:Property element as per the existing spec AND an additional constraint which is an additional entity to specify extra constraints).


The solution offered here uses the same Schema.org inspired approach to extending RO-Crate vocabulary as is already included in RO-Crate, extended with a handful of extra properties borrowed from mainstream viq


> 6. MAY reference external parts? (this was raised in recent consultations)
>
>-  (a) External resources like SHACL using a typing/profile mechanism

This is already allowed by RO-Crate and there is a mechanism to do this - BUT if users adopt this approach then there is a high risk that there will be a very fragmented RO-Crate landscape where only certain domain clusters of crates will be able to be validated.

>-  (b) Consider inheritance of profiles or schemas, so that schemas and profiles can be modularized (with a caveat that if we choose to allow this then the complexity of validating a profile goes up considerably, and there is a risk that agents will not be able to piece together a schema or profile because of missing resources.

We are still working on this part -- ATM my thinking is that for Schema specification inheritance is essential but when developing Profiles it is probably going to be more appropriate for most implementers to choose explicitly which Classes and Properties to deal with, without trying to allow for RO-Crate metadata documents which contain entities with @types that are subclasses of things in the profile. (see 7(b)) below

> 7. In a General Purpose Schema context:
> - (a) MUST allow for a community to create their own SoSS if needed (after due diligence),
If there are terms that are not defined elsewhere
Or to create a normalised vocabulary that combines terms from different schemas which may not be natively ‘RO-Crate friendly’.
> - MUST allow for inheritance (subClasses and subProperties) for compactness
MUST allow for inclusion of Defined Terms and other boilerplate entities that are part of the vocabulary of a domain
MAY not be self-contained
NOTE: RO-Crate can already be used for this, as the Language Data Commons Schema demonstrates. https://w3id.org/ldac/terms

A Schema can be authored in an RO-Crate with a human readable document and a set of Classes, Properties and boilerplate entities.


> 8. In a Profile Specific Schema context:
> - (a) MUST  allow for Classes and Properties to be specialised (typically more tightly constrained than a definition in a General Purpose Schema) for use in particular contexts. For example, the name property MAY have different descriptions and validation rules when used on a Person vs being used on a CreativeWork within a profile - and of course, profile-specific definitions are more tightly specified than in a general schema.
>  - (b) MUST be self-contained - if a property has a range of potential type values, then the Class definitions for each type must be included.
>    - (i) MUST NOT require validators to process inheritance – this should be compiled into a set of specific expectations about which properties are allowed/required on particular types of entity. (This is based on the assumption that in a typical repository or other environment which specifies a profile - the aim is interoperability and mutual intelligibility).
> - (C) MUST support machine validation of the following:
> Range / domain constraints for classes and properties by type (values could be JSON-LD entities such as defined terms (in sets), standard values (such as ways of representing programming or natural languages) or scalar types such as strings or dates, see next point).

Uses schema.org approach of domainIncludes / rangeIncludes as per existing spec 

> - (ii) Support for a range of non-entity scalar values such as dates, integers, booleans, URIs, patterns (e.g. Regex) (we could borrow a type system from JSON-Schema / XML or similar).

SUpports schema:Date 

TODO: Add regex support with a Pattern class (so that a pattern can be reused across rules and can be documented)

>   - (iii) Special rules for one or more types of Root Data entity (e.g. the Language Data Commons profile has two possible levels of granularity for RO-Crates; the Root Data Entity may have @type [“Dataset”, “RepositoryCollection”] or [“Dataset”, “RepositoryObject”]).

Done - see examples and (almost working) tests

>    - (iv) Support for Crate-fragment profiles - e.g. a conformsTo on a CSVW table schema that might apply to part of a crate. (NOTE: this would still be self-contained in that the profile would not reference other resources)

Done  - Profiles can be combined via conformsTo references on any entity allowing for a profile to validate a set of things it cares about -- not all profiles using this approach need to worry about Root Data Entities - they can focus on rules relating to other things.

>   - (v) Range / domain cardinality (relates to existing support for MUST, SHOULD, COULD, etc).
Occurrence of entities in the graph without other constraints - e.g. “there must be exactly one image entity in a crate” but not important what property links to it.

Yes: Class-rules can have ordinal constraints via min and max occurrence. This can be translated into MUST / SHOULD constraints -- see the documentation generation (TODO _ LINK)


>   - (vii) Support for complex chaining? e.g. the hasPart requirement that File entities are linked from the root? (NOTE, IMO This is something that (a) may need to be coded procedurally in validators rather than expressed in a declarative way and (b) could be dropped in RO-Crate 2 – if we have clear definitions for attached and Detached entities, then what is the point of the requirements that they be listed? Validators and visualisers can find them.)

> 9. MUST allow for generation of human-readable documentation for inclusion in profile crates or stand alone Schema documentation (combined with explanatory text and examples) from the schema.

DONE - Code is in this repo

> 10. MUST have a demonstrated ability to drive an RO-Crate editor such as Crate-O, Nova-Crate, either directly or via transformations of Schema terms into an editor-specific configuration.

TODO - update existing proof of concept -- yes we can do this but it needs updating.