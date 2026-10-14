const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { ROCrate } = require("ro-crate");
const { MaspValidator } = require("../lib/masp-validator");

// The draft LDAC-DMLex profile carries DMLex's per-class cardinality as
// property rules; its example is the DMLex spec's basic entry (A.1.1).
describe("LDAC-DMLex Profile", function () {
  this.timeout(10000);

  const profilePath = path.join(__dirname, "../profiles/ldac-dmlex/profile-crate/ro-crate-metadata.json");
  const examplePath = path.join(__dirname, "../profiles/ldac-dmlex/examples/abandon/ro-crate-metadata.json");

  let profileCrate;

  before(function () {
    profileCrate = new ROCrate(JSON.parse(fs.readFileSync(profilePath, "utf8")), { array: true, link: true });
  });

  function loadExample(edit) {
    const json = JSON.parse(fs.readFileSync(examplePath, "utf8"));
    if (edit) {
      edit(Object.fromEntries(json["@graph"].map((e) => [e["@id"], e])));
    }
    return new ROCrate(json, { array: true, link: true });
  }

  async function validate(crate) {
    return new MaspValidator(profileCrate).validateCrate(crate);
  }

  function validInstanceCount(results, localName) {
    const message = results.success
      .map((s) => s.message)
      .find((m) => m.includes(`dmlex.ttl#${localName} (`));
    return message ? Number(message.match(/Found (\d+) valid/)[1]) : 0;
  }

  it("accepts the DMLex basic entry example", async function () {
    const results = await validate(loadExample());
    expect(results.error).to.have.lengthOf(0);
    expect(validInstanceCount(results, "LexicographicResource")).to.equal(1);
    expect(validInstanceCount(results, "Entry")).to.equal(1);
    expect(validInstanceCount(results, "Sense")).to.equal(2);
  });

  it("rejects more than one title on the lexicographic resource", async function () {
    const results = await validate(
      loadExample((byId) => {
        byId["./"]["dmlex:title"] = ["One", "Two"];
      })
    );
    expect(results.error.map((e) => e.message).join("\n")).to.match(/dmlex:title.*at most 1/);
  });

  it("rejects an entry with no headword", async function () {
    const results = await validate(
      loadExample((byId) => {
        delete byId["#abandon-verb"]["dmlex:headword"];
      })
    );
    expect(results.error).to.not.have.lengthOf(0);
    expect(validInstanceCount(results, "Entry")).to.equal(0);
  });

  it("accepts any literal for an rdfs:Literal range", async function () {
    const results = await validate(
      loadExample((byId) => {
        byId["#abandon-verb"]["dmlex:headword"] = 42;
      })
    );
    expect(results.error).to.have.lengthOf(0);
  });

  it("requires a schema:URL value to be a URL", async function () {
    const results = await validate(
      loadExample((byId) => {
        byId["./"]["dmlex:uri"] = "not a url";
      })
    );
    expect(results.error).to.not.have.lengthOf(0);
  });
});
