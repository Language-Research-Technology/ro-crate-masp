const { expect } = require("chai");
const { ROCrate } = require("ro-crate");
const { MaspValidator } = require("../lib/masp-validator");

// A minimal profile with a deliberate cycle: the Collection's pcdm:hasMember
// ranges on the Object class and the Object's pcdm:memberOf ranges back on the
// Collection class. Validating either entity has to walk into the other.
const PROFILE = {
  "@context": ["https://w3id.org/ro/crate/1.2/context", { "@vocab": "http://schema.org/" }],
  "@graph": [
    {
      "@id": "ro-crate-metadata.json",
      "@type": "CreativeWork",
      "conformsTo": { "@id": "https://w3id.org/ro/crate/1.2" },
      "about": { "@id": "./" },
    },
    {
      "@id": "./",
      "@type": ["Dataset", "Profile"],
      "name": "Cycle test profile",
      "hasResource": [{ "@id": "#hasSchema" }],
    },
    {
      "@id": "#hasSchema",
      "@type": "ResourceDescriptor",
      "name": "Schema",
      "hasRole": { "@id": "http://www.w3.org/ns/dx/prof/role/schema" },
      "hasPart": [
        { "@id": "#Class_Collection" },
        { "@id": "#Class_Object" },
        { "@id": "#prop_hasMember" },
        { "@id": "#prop_memberOf" },
      ],
    },
    {
      "@id": "#Class_Collection",
      "@type": "rdfs:Class",
      "name": "Collection",
      "prov:specializationOf": [
        { "@id": "http://schema.org/Dataset" },
        { "@id": "http://pcdm.org/models#Collection" },
      ],
      "sh:minCount": 1,
      "sh:maxCount": 1,
    },
    {
      "@id": "#Class_Object",
      "@type": "rdfs:Class",
      "name": "Object",
      "prov:specializationOf": { "@id": "http://pcdm.org/models#Object" },
      "sh:minCount": 1,
    },
    {
      "@id": "#prop_hasMember",
      "@type": "rdf:Property",
      "name": "pcdm:hasMember",
      "rdfs:label": "pcdm:hasMember",
      "domainIncludes": { "@id": "#Class_Collection" },
      "rangeIncludes": { "@id": "#Class_Object" },
      "sh:minCount": 1,
    },
    {
      "@id": "#prop_memberOf",
      "@type": "rdf:Property",
      "name": "pcdm:memberOf",
      "rdfs:label": "pcdm:memberOf",
      "domainIncludes": { "@id": "#Class_Object" },
      "rangeIncludes": { "@id": "#Class_Collection" },
      "sh:minCount": 1,
      "sh:maxCount": 1,
    },
  ],
};

function targetCrate() {
  return {
    "@context": ["https://w3id.org/ro/crate/1.2/context", { "@vocab": "http://schema.org/" }],
    "@graph": [
      {
        "@id": "ro-crate-metadata.json",
        "@type": "CreativeWork",
        "conformsTo": { "@id": "https://w3id.org/ro/crate/1.2" },
        "about": { "@id": "./" },
      },
      {
        "@id": "./",
        "@type": ["Dataset", "RepositoryCollection"],
        "name": "A collection",
        "pcdm:hasMember": { "@id": "#object1" },
      },
      {
        "@id": "#object1",
        "@type": "RepositoryObject",
        "name": "An object",
        "pcdm:memberOf": { "@id": "./" },
      },
    ],
  };
}

async function validate(target) {
  const validator = new MaspValidator(new ROCrate(PROFILE, { array: true, link: true }));
  return validator.validateCrate(new ROCrate(target, { array: true, link: true }));
}

describe("MaspValidator – cyclic entity references", function () {
  this.timeout(10000);

  it("validates a hasMember/memberOf cycle instead of recursing forever", async function () {
    const results = await validate(targetCrate());
    expect(results.error).to.eql([]);
    expect(results.success.length).to.equal(2);
  });

  it("still reports a broken entity inside a cycle", async function () {
    const target = targetCrate();
    // Drop the back-link the Object rule requires.
    delete target["@graph"].find((e) => e["@id"] === "#object1")["pcdm:memberOf"];
    const results = await validate(target);
    expect(results.error.some((e) => /Object/.test(e.message))).to.be.true;
  });
});
