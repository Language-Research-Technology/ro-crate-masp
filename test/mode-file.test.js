/**
 * Tests for the Crate-O mode file generation and profile crate integration.
 *
 * These tests verify that:
 * - All profiles and schemas have a crate-o-mode.json file
 * - All mode files are valid JSON with expected structure
 * - Mode files do NOT contain a "classes" section (MASP covers that)
 * - Each profile/schema crate's ro-crate-metadata.json references the mode
 *   file via a ResourceDescriptor with role https://w3id.org/ro/mode
 *
 * The generate-mode-file script itself is tested in
 * crate-works/ro-crate-masp-tools.
 */

"use strict";

const { describe, it } = require("mocha");
const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { ROCrate } = require("ro-crate");
const {
  MODE_ROLE_URI,
} = require("@crate-works/ro-crate-masp-tools/scripts/generate-mode-file");

const ROOT = path.join(__dirname, "..");

// All profile/schema crate directories with their mode file expectations
const PROFILE_ENTRIES = [
  {
    name: "RO-Crate MASP Profile",
    profileCratePath:
      "profiles/ro-crate-masp/profile-crate/ro-crate-metadata.json",
    modeFilePath: "profiles/ro-crate-masp/profile-crate/crate-o-mode.json",
  },
];

describe("Crate-O Mode File Tests", function () {
  this.timeout(15000);

  // ── Per-profile tests ────────────────────────────────────────────────────

  for (const entry of PROFILE_ENTRIES) {
    describe(`${entry.name}`, function () {
      const modeFileFull = path.join(ROOT, entry.modeFilePath);
      const profileCrateFull = path.join(ROOT, entry.profileCratePath);

      let modeData;
      let crateData;

      before(function () {
        modeData = JSON.parse(fs.readFileSync(modeFileFull, "utf8"));
        crateData = JSON.parse(fs.readFileSync(profileCrateFull, "utf8"));
      });

      it("should have a crate-o-mode.json file", function () {
        expect(fs.existsSync(modeFileFull)).to.be.true;
      });

      it('should have a "metadata" section', function () {
        expect(modeData).to.have.property("metadata");
        expect(modeData.metadata).to.have.property("name");
        expect(modeData.metadata.name).to.be.a("string").and.not.be.empty;
      });

      it('should NOT have a "classes" section (MASP covers the schema)', function () {
        expect(modeData).to.not.have.property("classes");
      });

      it('should have a "propertyGroups" array', function () {
        expect(modeData).to.have.property("propertyGroups");
        expect(modeData.propertyGroups).to.be.an("array");
      });

      it('should have an "enabledClasses" array', function () {
        expect(modeData).to.have.property("enabledClasses");
        expect(modeData.enabledClasses).to.be.an("array");
      });

      it('should have a "lookup" object', function () {
        expect(modeData).to.have.property("lookup");
        expect(modeData.lookup).to.be.an("object");
      });

      it(`should be referenced in the profile crate as a ResourceDescriptor with role ${MODE_ROLE_URI}`, function () {
        const graph = crateData["@graph"] || [];

        // Find a ResourceDescriptor with hasRole = MODE_ROLE_URI
        const modeDescriptor = graph.find((entity) => {
          if (entity["@type"] !== "ResourceDescriptor") return false;
          const role = entity["hasRole"];
          const roles = Array.isArray(role) ? role : role ? [role] : [];
          return roles.some((r) => r["@id"] === MODE_ROLE_URI);
        });

        expect(
          modeDescriptor,
          `No ResourceDescriptor with hasRole=${MODE_ROLE_URI} found in ${entry.profileCratePath}`
        ).to.exist;

        // The descriptor should point to the mode file
        const artifact = modeDescriptor["hasArtifact"];
        expect(artifact, "ResourceDescriptor must have hasArtifact").to.exist;
        const artifactId = Array.isArray(artifact)
          ? artifact[0]["@id"]
          : artifact["@id"];
        expect(artifactId).to.equal("crate-o-mode.json");
      });

      it("should have the mode file entity in the profile crate @graph", function () {
        const graph = crateData["@graph"] || [];
        const modeFileEntity = graph.find(
          (e) => e["@id"] === "crate-o-mode.json"
        );
        expect(
          modeFileEntity,
          'crate-o-mode.json entity not found in @graph'
        ).to.exist;
        expect(modeFileEntity["@type"]).to.equal("File");
      });
    });
  }
});
