const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { ROCrate } = require("ro-crate");
const { MaspValidator } = require("../lib/masp-validator");

describe("Workflow Profile Tests", function () {
  this.timeout(10000);

  const wfProfileCratePath = path.join(
    __dirname,
    "../profiles/workflow/profile-crate/ro-crate-metadata.json"
  );

  const sampleCratePath = path.join(
    __dirname,
    "../profiles/workflow/examples/minimal-example/ro-crate-metadata.json"
  );

  let workflowProfileCrate;

  before(function () {
    const profileData = fs.readFileSync(wfProfileCratePath, "utf8");
    workflowProfileCrate = new ROCrate(JSON.parse(profileData), {
      array: true,
      link: true,
    });
  });

  function loadTargetCrate() {
    const targetData = fs.readFileSync(sampleCratePath, "utf8");
    return new ROCrate(JSON.parse(targetData), { array: true, link: true });
  }

  function makeFreshProfileEntity() {
    return {
      "@id": "https://example.org/imaginary-profile",
      "@type": ["http://schema.org/CreativeWork"],
      name: "Imaginary Profile",
      version: "1.0.0",
    };
  }

  it("fails when conformsTo is missing", async function () {
    const validator = new MaspValidator(workflowProfileCrate);
    const targetCrate = loadTargetCrate();
    delete targetCrate.root.conformsTo;

    const results = await validator.validateCrate(targetCrate);
    const conformsToInfo =
      results.rules["#prop_conformsTo_Root_Data_Entity"]?.["./"]?.info || [];

    expect(
      conformsToInfo.some((error) =>
        error.message.includes("missing required property conformsTo")
      )
    ).to.equal(true);
  });

  it("fails when conformsTo is incomplete", async function () {
    const validator = new MaspValidator(workflowProfileCrate);
    const targetCrate = loadTargetCrate();
    targetCrate.root.conformsTo = {
      "@id": "https://example.org/profile",
      "@type": [
        "http://schema.org/CreativeWork",
        "http://schema.org/Profile",
      ],
      name: "Alt Profile",
    };

    const results = await validator.validateCrate(targetCrate);
    const profileRule = results.rules["#classProfile"]?.[
      "https://example.org/profile"
    ];

    expect(profileRule).to.not.be.undefined;
    expect(
      (profileRule["property-errors"] || []).some((error) =>
        error.message.includes("missing required property version")
      )
    ).to.equal(true);
  });

  it("accepts a fresh profile entity only after it becomes CreativeWork and Profile", async function () {
    const validator = new MaspValidator(workflowProfileCrate);
    const targetCrate = loadTargetCrate();
    const freshProfile = makeFreshProfileEntity();
    targetCrate.addEntity(freshProfile);
    targetCrate.root.conformsTo = { "@id": freshProfile["@id"] };

    let results = await validator.validateCrate(targetCrate);
    expect(results.error.some((error) => error.rule === "#classProfile")).to.equal(true);

    targetCrate.getEntity(freshProfile["@id"])["@type"].push(
      "http://schema.org/Profile"
    );
    results = await validator.validateCrate(targetCrate);

    expect(results.error.some((error) => error.rule === "#classProfile")).to.equal(false);
    expect(results.rules["#classProfile"]?.[freshProfile["@id"]]?.["property-success"]).to.deep.include({
      message: `Property "name" validation succeeded for entity ${freshProfile["@id"]}`,
    });
  });

});


