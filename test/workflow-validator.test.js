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

  function updateEntityId(crate, oldId, newId) {
    if (typeof crate.updateEntityId === "function") {
      crate.updateEntityId(oldId, newId);
      return;
    }

    const entity = crate.getEntity(oldId);
    if (!entity) {
      return;
    }
    entity["@id"] = newId;
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
        "http://www.w3.org/ns/dx/prof/Profile",
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

  it("accepts README @id matching /^readme\\.md$/i", async function () {
    const validator = new MaspValidator(workflowProfileCrate);
    const targetCrate = loadTargetCrate();
    const oldReadmeId = "README.md";
    const newReadmeId = "ReAdMe.Md";

    updateEntityId(targetCrate, oldReadmeId, newReadmeId);
    const readmeEntity = targetCrate.getEntity(newReadmeId);
    readmeEntity["@type"] = ["File", "CreativeWork", "MediaObject"];
    readmeEntity.about = { "@id": "./" };

    const results = await validator.validateCrate(targetCrate);
    const readmeRule = results.rules["#class_CreativeWork_README"]?.[newReadmeId] || {};
    const propertySuccess = readmeRule["property-success"] || [];

    expect(
      propertySuccess.some((x) =>
        x.message.includes(`Property "@id" validation succeeded for entity ${newReadmeId}`)
      )
    ).to.equal(true);
  });

  it("fails README @id that does not match /^readme\\.md$/i", async function () {
    const validator = new MaspValidator(workflowProfileCrate);
    const targetCrate = loadTargetCrate();
    const oldReadmeId = "README.md";
    const newReadmeId = "readme.txt";

    updateEntityId(targetCrate, oldReadmeId, newReadmeId);
    const readmeEntity = targetCrate.getEntity(newReadmeId);
    readmeEntity["@type"] = ["File", "CreativeWork", "MediaObject"];
    readmeEntity.about = { "@id": "./" };

    const results = await validator.validateCrate(targetCrate);
    const readmeRule = results.rules["#class_CreativeWork_README"]?.[newReadmeId] || {};
    const propertyErrors = readmeRule["property-errors"] || [];

    expect(
      propertyErrors.some((x) =>
        x.message.includes(`Property "@id" validation failed for entity ${newReadmeId}`)
      )
    ).to.equal(true);
  });

});


