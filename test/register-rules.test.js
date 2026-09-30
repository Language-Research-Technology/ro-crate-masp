const { describe, it } = require("mocha");
const { expect } = require("chai");
const { registerUnlistedRules } = require("../lib/register-rules");

function crate(extraGraph = [], descriptorParts = [{ "@id": "#class_A" }]) {
  return {
    "@context": ["https://w3id.org/ro/crate/1.2/context"],
    "@graph": [
      { "@id": "ro-crate-metadata.json", "@type": "CreativeWork", about: { "@id": "./" } },
      { "@id": "./", "@type": "Dataset", hasResource: [{ "@id": "#guidance" }, { "@id": "#hasSpecializedSchema" }] },
      {
        "@id": "#guidance",
        "@type": "ResourceDescriptor",
        hasRole: { "@id": "http://www.w3.org/ns/dx/prof/role/guidance" },
        hasPart: [{ "@id": "#list_B" }],
      },
      {
        "@id": "#hasSpecializedSchema",
        "@type": "ResourceDescriptor",
        hasRole: { "@id": "http://www.w3.org/ns/dx/prof/role/schema" },
        hasPart: descriptorParts,
      },
      { "@id": "#class_A", "@type": "rdfs:Class" },
      { "@id": "#list_B", "@type": "ItemList" },
      ...extraGraph,
    ],
  };
}

const schemaParts = (json) =>
  json["@graph"].find((e) => e["@id"] === "#hasSpecializedSchema").hasPart.map((p) => p["@id"]);

describe("registerUnlistedRules", function () {
  it("adds unlisted rule entities to the schema descriptor, keeping existing order", function () {
    const json = crate([
      { "@id": "#prop_new", "@type": "rdf:Property" },
      { "@id": "#pv_new", "@type": "PropertyValue" },
      { "@id": "#person", "@type": "Person" },
    ]);
    const added = registerUnlistedRules(json);
    expect(added).to.deep.equal(["#prop_new", "#pv_new"]);
    expect(schemaParts(json)).to.deep.equal(["#class_A", "#prop_new", "#pv_new"]);
  });

  it("leaves rules listed by any descriptor alone and changes nothing when all are listed", function () {
    const json = crate();
    const before = JSON.stringify(json);
    expect(registerUnlistedRules(json)).to.deep.equal([]);
    expect(JSON.stringify(json)).to.equal(before);
  });

  it("handles hasPart stored as a single object or a JSON string", function () {
    const single = crate([{ "@id": "#prop_new", "@type": ["rdf:Property"] }], { "@id": "#class_A" });
    expect(registerUnlistedRules(single)).to.deep.equal(["#prop_new"]);
    expect(schemaParts(single)).to.deep.equal(["#class_A", "#prop_new"]);

    const stringy = crate([{ "@id": "#prop_new", "@type": "rdf:Property" }], '["#class_A"]');
    expect(registerUnlistedRules(stringy)).to.deep.equal(["#prop_new"]);
    expect(schemaParts(stringy)).to.deep.equal(["#class_A", "#prop_new"]);
  });

  it("does nothing when there is no schema-role descriptor", function () {
    const json = crate([{ "@id": "#prop_new", "@type": "rdf:Property" }]);
    json["@graph"].find((e) => e["@id"] === "#hasSpecializedSchema").hasRole = {
      "@id": "http://www.w3.org/ns/dx/prof/role/guidance",
    };
    expect(registerUnlistedRules(json)).to.deep.equal([]);
  });
});
