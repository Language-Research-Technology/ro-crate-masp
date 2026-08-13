const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");
const { expect } = require("chai");
const { ROCrate } = require("ro-crate");
const { MaspValidator } = require("../lib/masp-validator");

/**
 * Integration test for scripts/owl-to-masp.py.
 *
 * The converter's own logic is exercised by the Python unit tests in
 * test/owl-to-masp/test_owl_to_masp.py (run via `uv run pytest test/owl-to-masp`).
 * This test instead checks the thing that actually matters end-to-end: that the
 * JS-side MaspValidator (the real consumer of generated schema crates) accepts
 * the converter's output without modification, following the shell-out pattern
 * already used in test/mode-round-trip.test.js.
 */
describe("OWL to MASP converter (scripts/owl-to-masp.py)", function () {
  this.timeout(60000);

  const scriptPath = path.join(__dirname, "..", "scripts", "owl-to-masp.py");
  const fixturePath = path.join(__dirname, "..", "test_data", "owl", "fixture.ttl");
  let outputDir;
  let metadataPath;

  before(function () {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "owl-to-masp-test-"));
    execSync(
      `uv run "${scriptPath}" --input "${fixturePath}" --output-dir "${outputDir}" --namespace "http://example.org/ns#" --name "Fixture Schema"`,
      { stdio: "pipe" }
    );
    metadataPath = path.join(outputDir, "schema-crate", "ro-crate-metadata.json");
  });

  after(function () {
    if (outputDir) fs.removeSync(outputDir);
  });

  it("writes a schema crate that MaspValidator can load and parse without error", async function () {
    expect(fs.existsSync(metadataPath)).to.be.true;
    const crateJson = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    const crate = new ROCrate(crateJson, { array: true, link: true });

    const validator = new MaspValidator(crate);
    const results = await validator.validateCrate(crate);

    expect(results).to.have.property("error").that.is.an("array");
    expect(Object.keys(validator.rules.classes).length).to.be.at.least(2);
    expect(Object.keys(validator.rules.properties).length).to.be.at.least(2);
  });

  it("includes the fixture's Widget class and hasWidget property as parsed rules", async function () {
    const crateJson = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    const crate = new ROCrate(crateJson, { array: true, link: true });
    const validator = new MaspValidator(crate);
    await validator.validateCrate(crate);

    expect(validator.rules.classes).to.have.property("http://example.org/ns#Widget");
    expect(validator.rules.properties).to.have.property("http://example.org/ns#hasWidget");
  });

  it("copies the source OWL file into schema-crate/ alongside the metadata", function () {
    const copiedOwlPath = path.join(outputDir, "schema-crate", "fixture.ttl");
    expect(fs.existsSync(copiedOwlPath)).to.be.true;
    expect(fs.readFileSync(copiedOwlPath, "utf8")).to.equal(fs.readFileSync(fixturePath, "utf8"));
  });

  it("records a CreateAction provenance entity that MaspValidator's underlying ROCrate can resolve", function () {
    const crateJson = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    const crate = new ROCrate(crateJson, { array: true, link: true });

    const fileEntity = crate.getEntity("fixture.ttl");
    expect(fileEntity).to.exist;
    expect(fileEntity["@type"]).to.include("File");

    const createAction = crate.getEntity("#owl-to-masp-conversion");
    expect(createAction).to.exist;
    expect(createAction["@type"]).to.include("CreateAction");
    expect(createAction.object[0]["@id"]).to.equal("fixture.ttl");
    expect(createAction.result[0]["@id"]).to.equal("./");

    const root = crate.getEntity("./");
    const mentionIds = root.mentions.map((m) => m["@id"]);
    expect(mentionIds).to.include("#owl-to-masp-conversion");
  });
});
