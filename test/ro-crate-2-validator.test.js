const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { ROCrate } = require("ro-crate");
const { MaspValidator } = require("../lib/masp-validator");

describe("RO-Crate 2 Profile Validator Tests", function () {
  this.timeout(10000);

  const roCrate2ProfilePath = path.join(
    __dirname,
    "../profiles/ro-crate-2/profile-crate/ro-crate-metadata.json"
  );

  let roCrate2ProfileCrate;

  before(function () {
    const profileData = fs.readFileSync(roCrate2ProfilePath, "utf8");
    roCrate2ProfileCrate = new ROCrate(JSON.parse(profileData), {
      array: true,
      link: true,
    });
  });

  function makeValidTargetCrate() {
    const crate = new ROCrate({ array: true, link: true });
    crate.root.name = "RO-Crate 2 test crate";
    crate.root.description = "Validation target for RO-Crate 2 profile tests";
    crate.root.datePublished = "2026-07-22";
    crate.root.license = "https://creativecommons.org/licenses/by/4.0/";
    return crate;
  }

  async function validateCrate(crate) {
    const validator = new MaspValidator(roCrate2ProfileCrate);
    return validator.validateCrate(crate);
  }

  function addFileEntity(crate, id, extra = {}) {
    crate.addEntity({
      "@id": id,
      "@type": ["File", "MediaObject"],
      name: "Example file",
      encodingFormat: "text/plain",
      ...extra,
    });
  }

  function classFileRuleFor(results, entityId) {
    return results.rules["#class_File"]?.[entityId] || null;
  }

  it("accepts a minimal valid target crate", async function () {
    const targetCrate = makeValidTargetCrate();
    const results = await validateCrate(targetCrate);

    expect(results.error).to.deep.equal([]);
  });

  it("accepts File/MediaObject entities with protocol-based IDs", async function () {
    const targetCrate = makeValidTargetCrate();
    const validProtocolIds = [
      "http://example.org/files/a.txt",
      "https://example.org/files/b.txt",
      "s3://bucket/folder/c.wav",
      "doi://10.1234/example-asset",
    ];

    for (const id of validProtocolIds) {
      addFileEntity(targetCrate, id, { name: `File ${id}` });
    }

    const results = await validateCrate(targetCrate);
    expect(results.error).to.deep.equal([]);

    for (const id of validProtocolIds) {
      const classResult = classFileRuleFor(results, id);
      expect(classResult, `Expected class result for ${id}`).to.not.equal(null);
      const propertyErrors = classResult["property-errors"] || [];
      expect(propertyErrors, `Expected no property errors for ${id}`).to.have.length(0);
      const propertySuccess = classResult["property-success"] || [];
      expect(
        propertySuccess.some((x) =>
          x.message.includes(`Property "@id" validation succeeded for entity ${id}`)
        ),
        `Expected @id property success for ${id}`
      ).to.equal(true);
    }
  });

  it("accepts File/MediaObject entities with non-empty relative IDs not starting with # or _:", async function () {
    const targetCrate = makeValidTargetCrate();
    const validRelativeIds = [
      "data/file.txt",
      "./nested/path/file.txt",
      "assets/audio.wav",
      "file-1",
    ];

    for (const id of validRelativeIds) {
      addFileEntity(targetCrate, id, { name: `File ${id}` });
    }

    const results = await validateCrate(targetCrate);
    expect(results.error).to.deep.equal([]);

    for (const id of validRelativeIds) {
      const classResult = classFileRuleFor(results, id);
      expect(classResult, `Expected class result for ${id}`).to.not.equal(null);
      const propertyErrors = classResult["property-errors"] || [];
      expect(propertyErrors, `Expected no property errors for ${id}`).to.have.length(0);
    }
  });

  it("rejects File/MediaObject entities with IDs starting with #", async function () {
    const targetCrate = makeValidTargetCrate();
    const invalidIds = ["#file", "#local-id", "#/slash"];

    for (const id of invalidIds) {
      addFileEntity(targetCrate, id, { name: `Invalid file ${id}` });
    }

    const results = await validateCrate(targetCrate);

    for (const id of invalidIds) {
      const classResult = classFileRuleFor(results, id);
      expect(classResult, `Expected class result for ${id}`).to.not.equal(null);
      const propertyErrors = classResult["property-errors"] || [];
      expect(
        propertyErrors.some((x) =>
          x.message.includes(`Property "@id" validation failed for entity ${id}`)
        ),
        `Expected @id property error for ${id}`
      ).to.equal(true);
    }
  });

  it("rejects File/MediaObject entities with IDs starting with _:", async function () {
    const targetCrate = makeValidTargetCrate();
    const invalidIds = ["_:b0", "_:blank-node", "_:tmp123"];

    for (const id of invalidIds) {
      addFileEntity(targetCrate, id, { name: `Invalid file ${id}` });
    }

    const results = await validateCrate(targetCrate);

    for (const id of invalidIds) {
      const classResult = classFileRuleFor(results, id);
      expect(classResult, `Expected class result for ${id}`).to.not.equal(null);
      const propertyErrors = classResult["property-errors"] || [];
      expect(
        propertyErrors.some((x) =>
          x.message.includes(`Property "@id" validation failed for entity ${id}`)
        ),
        `Expected @id property error for ${id}`
      ).to.equal(true);
    }
  });

  it("validates mixed File IDs independently in the same crate", async function () {
    const targetCrate = makeValidTargetCrate();
    const validIds = ["https://example.org/good.bin", "content/file.dat"];
    const invalidIds = ["#bad-fragment", "_:bad-blank"];

    for (const id of validIds) {
      addFileEntity(targetCrate, id, { name: `Valid ${id}` });
    }
    for (const id of invalidIds) {
      addFileEntity(targetCrate, id, { name: `Invalid ${id}` });
    }

    const results = await validateCrate(targetCrate);

    for (const id of validIds) {
      const classResult = classFileRuleFor(results, id);
      expect(classResult, `Expected class result for ${id}`).to.not.equal(null);
      expect(classResult["property-errors"] || []).to.have.length(0);
    }

    for (const id of invalidIds) {
      const classResult = classFileRuleFor(results, id);
      expect(classResult, `Expected class result for ${id}`).to.not.equal(null);
      expect(
        (classResult["property-errors"] || []).some((x) =>
          x.message.includes(`Property "@id" validation failed for entity ${id}`)
        )
      ).to.equal(true);
    }
  });
});
