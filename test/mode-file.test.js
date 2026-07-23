/**
 * Tests for the Crate-O mode file generation and profile crate integration.
 *
 * These tests verify that:
 * - All profiles and schemas have a crate-o-mode.json file
 * - All mode files are valid JSON with expected structure
 * - Mode files do NOT contain a "classes" section (MASP covers that)
 * - Each profile/schema crate's ro-crate-metadata.json references the mode
 *   file via a ResourceDescriptor with role https://w3id.org/ro/mode
 * - The generate-mode-file.js script strips "classes" correctly
 * - The generate-mode-file.js script generates minimal mode files correctly
 */

"use strict";

const { describe, it } = require("mocha");
const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { ROCrate } = require("ro-crate");
const {
  MODE_ROLE_URI,
  stripClassesFromMode,
  buildMinimalModeFromProfile,
  updateProfileCrate,
} = require("../scripts/generate-mode-file");

const ROOT = path.join(__dirname, "..");

// All profile/schema crate directories with their mode file expectations
const PROFILE_ENTRIES = [
  {
    name: "LDAC Profile",
    profileCratePath: "profiles/ldac/profile-crate/ro-crate-metadata.json",
    modeFilePath: "profiles/ldac/profile-crate/crate-o-mode.json",
  },
  {
    name: "RO-Crate Profile",
    profileCratePath: "profiles/ro-crate/profile-crate/ro-crate-metadata.json",
    modeFilePath: "profiles/ro-crate/profile-crate/crate-o-mode.json",
  },
  {
    name: "RO-Crate MASP Profile",
    profileCratePath:
      "profiles/ro-crate-masp/profile-crate/ro-crate-metadata.json",
    modeFilePath: "profiles/ro-crate-masp/profile-crate/crate-o-mode.json",
  },
  {
    name: "Workflow Profile",
    profileCratePath:
      "profiles/workflow/profile-crate/ro-crate-metadata.json",
    modeFilePath: "profiles/workflow/profile-crate/crate-o-mode.json",
  },
  {
    name: "LDAC Schema",
    profileCratePath: "schemas/ldac/schema-crate/ro-crate-metadata.json",
    modeFilePath: "schemas/ldac/schema-crate/crate-o-mode.json",
  },
  {
    name: "AusTalk Schema",
    profileCratePath: "schemas/austalk/schema-crate/ro-crate-metadata.json",
    modeFilePath: "schemas/austalk/schema-crate/crate-o-mode.json",
  },
  {
    name: "Template Schema",
    profileCratePath: "schemas/template/schema-crate/ro-crate-metadata.json",
    modeFilePath: "schemas/template/schema-crate/crate-o-mode.json",
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

  // ── Script module tests ──────────────────────────────────────────────────

  describe("generate-mode-file module", function () {
    const tmpDir = path.join(ROOT, "tmp", "mode-file-test");

    before(function () {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
    });

    after(function () {
      // Clean up temp directory
      if (fs.existsSync(tmpDir)) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });

    it('should strip "classes" from an existing mode file (stripClassesFromMode)', function () {
      const sourcePath = path.join(
        ROOT,
        "test_data/modes/ldac/language-data-commons-collection.json"
      );
      const sourceMode = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

      const result = stripClassesFromMode(sourceMode);

      // Should not have classes
      expect(result).to.not.have.property("classes");

      // Every non-classes key from the source should be preserved verbatim.
      for (const key of Object.keys(sourceMode)) {
        if (key === "classes") continue;
        expect(result).to.have.property(key);
      }
    });

    it('should preserve all non-"classes" keys (stripClassesFromMode)', function () {
      const mockMode = {
        metadata: { name: "Test" },
        conformsToUri: ["http://example.com/profile"],
        rootDataset: { type: ["Dataset"] },
        propertyGroups: [{ name: "About", inputs: [] }],
        lookup: { Language: { module: "datapack" } },
        enabledClasses: ["Dataset"],
        classes: { Dataset: { inputs: [] } }, // this should be stripped
      };

      const result = stripClassesFromMode(mockMode);
      expect(result).to.not.have.property("classes");
      expect(Object.keys(result)).to.have.lengthOf(6);
    });

    it("should generate a minimal mode file from profile crate JSON (buildMinimalModeFromProfile)", function () {
      const profilePath = path.join(
        ROOT,
        "profiles/ro-crate/profile-crate/ro-crate-metadata.json"
      );
      const profileJson = JSON.parse(fs.readFileSync(profilePath, "utf8"));

      const result = buildMinimalModeFromProfile(profileJson);

      expect(result).to.not.have.property("classes");
      expect(result).to.have.property("metadata");
      expect(result.metadata.name).to.equal("RO-Crate Machine Actionable Profile");
      expect(result).to.have.property("propertyGroups").that.is.an("array");
      expect(result).to.have.property("lookup").that.is.an("object");
      expect(result).to.have.property("enabledClasses").that.is.an("array");
    });

    it("should idempotently update the profile crate (updateProfileCrate)", function () {
      // Copy a profile crate to temp dir
      const profileCratePath = path.join(tmpDir, "ro-crate-metadata.json");
      const outputModePath = path.join(tmpDir, "crate-o-mode.json");

      fs.copyFileSync(
        path.join(ROOT, "profiles/ro-crate/profile-crate/ro-crate-metadata.json"),
        profileCratePath
      );

      // Run twice - should only add mode descriptor once
      updateProfileCrate(profileCratePath, outputModePath);
      updateProfileCrate(profileCratePath, outputModePath);

      const crateData = JSON.parse(fs.readFileSync(profileCratePath, "utf8"));
      const graph = crateData["@graph"] || [];

      // Count mode descriptors - should be only 1
      const modeDescriptors = graph.filter((entity) => {
        const role = entity["hasRole"];
        const roles = Array.isArray(role) ? role : role ? [role] : [];
        return roles.some((r) => r["@id"] === MODE_ROLE_URI);
      });
      expect(modeDescriptors).to.have.length(1);
    });

    it("should add the mode file as a ResourceDescriptor in the profile crate (updateProfileCrate)", function () {
      const profileCratePath = path.join(tmpDir, "test-profile.json");
      const outputModePath = path.join(tmpDir, "test-crate-o-mode.json");

      // Start with fresh copy of a profile crate without mode file reference
      fs.copyFileSync(
        path.join(ROOT, "profiles/workflow/profile-crate/ro-crate-metadata.json"),
        profileCratePath
      );

      // Remove any existing mode descriptor to start fresh
      const crateBeforeAdd = JSON.parse(fs.readFileSync(profileCratePath, "utf8"));
      crateBeforeAdd["@graph"] = crateBeforeAdd["@graph"].filter((e) => {
        const role = e["hasRole"];
        const roles = Array.isArray(role) ? role : role ? [role] : [];
        return !roles.some((r) => r["@id"] === MODE_ROLE_URI);
      });
      fs.writeFileSync(profileCratePath, JSON.stringify(crateBeforeAdd, null, 2));

      updateProfileCrate(profileCratePath, outputModePath);

      const crateData = JSON.parse(fs.readFileSync(profileCratePath, "utf8"));
      const graph = crateData["@graph"] || [];

      // Should have a ResourceDescriptor for the mode file
      const modeDescriptor = graph.find((entity) => {
        if (entity["@type"] !== "ResourceDescriptor") return false;
        const role = entity["hasRole"];
        const roles = Array.isArray(role) ? role : role ? [role] : [];
        return roles.some((r) => r["@id"] === MODE_ROLE_URI);
      });

      expect(modeDescriptor).to.exist;
      expect(modeDescriptor["hasArtifact"]["@id"]).to.equal("test-crate-o-mode.json");
    });
  });
});
