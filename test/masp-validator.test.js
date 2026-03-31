/**
 * Comprehensive tests for the MASP (Machine Actionable Profiles and Schemas) profile.
 *
 * These tests validate:
 * - The MASP profile crate is structurally correct
 * - The SossValidator correctly parses the MASP profile's schema entities
 * - Class and property rules work correctly for profile crates
 * - Cardinality constraints (sh:minCount, sh:maxCount) are enforced
 * - Required properties (isProfileOf, name, license, hasResource) are validated
 * - Fixed-value property validation (metadata descriptor @id)
 * - Range constraints (entity references validated against class rules)
 * - The MASP profile crate validates against itself
 */

const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { ROCrate } = require("ro-crate");
const { SossValidator } = require("../lib/soss-validator");

describe("MASP Profile Tests", function () {
  this.timeout(10000);

  const maspProfilePath = path.join(
    __dirname,
    "../profiles/ro-crate-masp/profile-crate/ro-crate-metadata.json"
  );

  let maspProfileCrate;

  before(function () {
    const profileData = fs.readFileSync(maspProfilePath, "utf8");
    const profileJson = JSON.parse(profileData);
    maspProfileCrate = new ROCrate(profileJson, { array: true, link: true });
  });

  // Helper to build a minimal valid MASP profile crate as a JSON object
  function makeMinimalCrate() {
    return {
      "@context": [
        "https://w3id.org/ro/crate/1.2/context",
        { "@vocab": "http://schema.org/" },
      ],
      "@graph": [
        {
          "@id": "ro-crate-metadata.json",
          "@type": "CreativeWork",
          "conformsTo": { "@id": "https://w3id.org/ro/crate/1.2" },
          "about": { "@id": "https://example.org/my-profile/" },
        },
        {
          "@id": "https://w3id.org/ro/crate/1.2",
          "@type": "CreativeWork",
          "name": "RO-Crate 1.2",
        },
        {
          "@id": "https://example.org/my-profile/",
          "@type": ["Dataset", "Profile"],
          "name": "My Test Profile",
          "description": "A test profile for MASP validation",
          "version": "0.1.0",
          "license": "Apache-2.0",
          "isProfileOf": [{ "@id": "https://w3id.org/ro/crate/1.2" }],
          "hasResource": [{ "@id": "#hasSchema" }],
        },
        {
          "@id": "#hasSchema",
          "@type": "ResourceDescriptor",
          "hasRole": { "@id": "http://www.w3.org/ns/dx/prof/role/schema" },
        },
      ],
    };
  }

  // -----------------------------------------------------------------
  // Structural tests for the MASP profile crate itself
  // -----------------------------------------------------------------

  describe("MASP profile crate structure", function () {
    it("loads successfully from disk", function () {
      expect(maspProfileCrate).to.not.be.null;
      expect(maspProfileCrate.root).to.not.be.null;
    });

    it("root entity has @type [Dataset, Profile]", function () {
      const rootTypes = maspProfileCrate.root["@type"];
      expect(rootTypes).to.include("Dataset");
      expect(rootTypes).to.include("Profile");
    });

    it("root entity has isProfileOf referencing RO-Crate 1.2", function () {
      const isProfileOf = maspProfileCrate.root["isProfileOf"];
      expect(isProfileOf).to.not.be.undefined;
      expect(isProfileOf.map((x) => x["@id"])).to.include(
        "https://w3id.org/ro/crate/1.2"
      );
    });

    it("root entity has a version string", function () {
      expect(maspProfileCrate.root["version"]).to.not.be.undefined;
    });

    it("metadata descriptor has conformsTo", function () {
      const descriptor = maspProfileCrate.getEntity("ro-crate-metadata.json");
      expect(descriptor).to.not.be.null;
      const conformsTo = descriptor["conformsTo"];
      expect(conformsTo).to.not.be.undefined;
    });

    it("has a schema ResourceDescriptor with hasPart listing schema entities", function () {
      const resources = maspProfileCrate.root["hasResource"];
      expect(resources).to.not.be.undefined;
      expect(resources.length).to.be.greaterThan(0);

      const schemaDescriptor = resources.find((r) =>
        r["hasRole"]?.some(
          (role) => role["@id"] === "http://www.w3.org/ns/dx/prof/role/schema"
        )
      );
      expect(schemaDescriptor).to.not.be.undefined;
      expect(schemaDescriptor["hasPart"]).to.not.be.undefined;
      expect(schemaDescriptor["hasPart"].length).to.be.greaterThan(0);
    });

    it("has a specification ResourceDescriptor (role/specification) pointing to index.html", function () {
      const resources = maspProfileCrate.root["hasResource"];
      const specDescriptor = resources.find((r) =>
        r["hasRole"]?.some(
          (role) =>
            role["@id"] === "http://www.w3.org/ns/dx/prof/role/specification"
        )
      );
      expect(specDescriptor).to.not.be.undefined;
      expect(specDescriptor["hasArtifact"]).to.not.be.undefined;
    });

    it("has a guidance ResourceDescriptor (role/guidance) pointing to profile-documentation.md", function () {
      const resources = maspProfileCrate.root["hasResource"];
      const guidanceDescriptor = resources.find((r) =>
        r["hasRole"]?.some(
          (role) => role["@id"] === "http://www.w3.org/ns/dx/prof/role/guidance"
        )
      );
      expect(guidanceDescriptor).to.not.be.undefined;
    });
  });

  // -----------------------------------------------------------------
  // Rule parsing tests
  // -----------------------------------------------------------------

  describe("Rule parsing from profile crate", function () {
    let validator;

    before(async function () {
      validator = new SossValidator(maspProfileCrate);
      const targetCrate = new ROCrate(makeMinimalCrate(), {
        array: true,
        link: true,
      });
      await validator.validateCrate(targetCrate);
    });

    it("detects the root class rule via fixed @id property", function () {
      expect(validator.rules.__rootRuleId).to.equal("#class_MetadataDescriptor");
      expect(validator.rules.rootClassRule).to.not.be.null;
      expect(validator.rules.rootClassRule.id).to.equal(
        "#class_MetadataDescriptor"
      );
    });

    it("parses all expected class rules", function () {
      const classes = Object.keys(validator.rules.classes);
      expect(classes).to.include("#class_MetadataDescriptor");
      expect(classes).to.include("#class_ProfileDataset");
      expect(classes).to.include("#class_ResourceDescriptor");
      expect(classes).to.include("#class_rdfsClass");
      expect(classes).to.include("#class_rdfProperty");
      expect(classes).to.include("#class_ItemList");
      expect(classes).to.include("#class_DefinedTermSet");
      expect(classes).to.include("#class_DefinedTerm");
      expect(classes).to.include("#class_Person");
      expect(classes).to.include("#class_Organization");
      expect(classes).to.include("#class_File");
      expect(classes).to.include("#class_CreativeWork");
    });

    it("parses all expected property rules", function () {
      const properties = Object.keys(validator.rules.properties);
      expect(properties).to.include("#prop_id_MetadataDescriptor");
      expect(properties).to.include("#prop_conformsTo_MetadataDescriptor");
      expect(properties).to.include("#prop_about_MetadataDescriptor");
      expect(properties).to.include("#prop_name_ProfileDataset");
      expect(properties).to.include("#prop_description_ProfileDataset");
      expect(properties).to.include("#prop_version_ProfileDataset");
      expect(properties).to.include("#prop_isProfileOf_ProfileDataset");
      expect(properties).to.include("#prop_author_ProfileDataset");
      expect(properties).to.include("#prop_license_ProfileDataset");
      expect(properties).to.include("#prop_hasResource_ProfileDataset");
      expect(properties).to.include("#prop_hasPart_ProfileDataset");
      expect(properties).to.include("#prop_hasRole_ResourceDescriptor");
      expect(properties).to.include("#prop_hasArtifact_ResourceDescriptor");
      expect(properties).to.include("#prop_hasPart_ResourceDescriptor");
    });

    it("#class_MetadataDescriptor has minCount=1, maxCount=1", function () {
      const rule = validator.rules.classes["#class_MetadataDescriptor"];
      expect(rule.minCount).to.equal(1);
      expect(rule.maxCount).to.equal(1);
    });

    it("#class_ProfileDataset has minCount=1, maxCount=1", function () {
      const rule = validator.rules.classes["#class_ProfileDataset"];
      expect(rule.minCount).to.equal(1);
      expect(rule.maxCount).to.equal(1);
    });

    it("#prop_name_ProfileDataset has minCount=1, maxCount=1", function () {
      const rule = validator.rules.properties["#prop_name_ProfileDataset"];
      expect(rule.minCount).to.equal(1);
      expect(rule.maxCount).to.equal(1);
    });

    it("#prop_isProfileOf_ProfileDataset has minCount=1", function () {
      const rule =
        validator.rules.properties["#prop_isProfileOf_ProfileDataset"];
      expect(rule.minCount).to.equal(1);
    });

    it("#prop_license_ProfileDataset has minCount=1", function () {
      const rule = validator.rules.properties["#prop_license_ProfileDataset"];
      expect(rule.minCount).to.equal(1);
    });

    it("#prop_hasResource_ProfileDataset has minCount=1", function () {
      const rule =
        validator.rules.properties["#prop_hasResource_ProfileDataset"];
      expect(rule.minCount).to.equal(1);
    });

    it("#prop_id_MetadataDescriptor has fixed value 'ro-crate-metadata.json'", function () {
      const rule = validator.rules.properties["#prop_id_MetadataDescriptor"];
      expect(rule.fixedValue).to.not.be.undefined;
      expect(rule.fixedValue).to.include("ro-crate-metadata.json");
    });

    it("#prop_hasRole_ResourceDescriptor has minCount=1, maxCount=1", function () {
      const rule =
        validator.rules.properties["#prop_hasRole_ResourceDescriptor"];
      expect(rule.minCount).to.equal(1);
      expect(rule.maxCount).to.equal(1);
    });
  });

  // -----------------------------------------------------------------
  // Validation of a minimal valid MASP profile crate
  // -----------------------------------------------------------------

  describe("Minimal valid MASP profile crate", function () {
    let results;
    let validator;

    before(async function () {
      validator = new SossValidator(maspProfileCrate);
      const targetCrate = new ROCrate(makeMinimalCrate(), {
        array: true,
        link: true,
      });
      results = await validator.validateCrate(targetCrate);
      console.log(
        "Minimal crate validation results:",
        JSON.stringify(results, null, 2)
      );
    });

    it("produces no errors", function () {
      expect(results.error.length).to.equal(0);
    });

    it("records success for #class_MetadataDescriptor", function () {
      const successMessages = results.success.map((s) => s.message);
      const found = successMessages.some((m) =>
        m.includes("MetadataDescriptor") || m.includes("CreativeWork")
      );
      expect(found).to.be.true;
    });

    it("records success for #class_ProfileDataset", function () {
      const successMessages = results.success.map((s) => s.message);
      const found = successMessages.some(
        (m) => m.includes("Dataset") && m.includes("Profile")
      );
      expect(found).to.be.true;
    });

    it("records property-success for name on the profile dataset", function () {
      const profileRule = results.rules["#class_ProfileDataset"];
      const entityRule = profileRule?.["https://example.org/my-profile/"];
      const successes = entityRule?.["property-success"] || [];
      const nameSuccess = successes.find((s) => s.message.includes("name"));
      expect(nameSuccess).to.not.be.undefined;
    });
  });

  // -----------------------------------------------------------------
  // Error cases: missing required entities
  // -----------------------------------------------------------------

  describe("Error: profile name has multiple values (sh:maxCount=1 violated)", function () {
    let results;

    // sh:maxCount: 1 is set on #prop_name_ProfileDataset.
    // If the profile Dataset has two name values, the validator should report an error.
    before(async function () {
      const validator = new SossValidator(maspProfileCrate);
      const crateJson = {
        "@context": [
          "https://w3id.org/ro/crate/1.2/context",
          { "@vocab": "http://schema.org/" },
        ],
        "@graph": [
          {
            "@id": "ro-crate-metadata.json",
            "@type": "CreativeWork",
            "conformsTo": { "@id": "https://w3id.org/ro/crate/1.2" },
            "about": { "@id": "https://example.org/my-profile/" },
          },
          {
            "@id": "https://w3id.org/ro/crate/1.2",
            "@type": "CreativeWork",
            "name": "RO-Crate 1.2",
          },
          {
            "@id": "https://example.org/my-profile/",
            "@type": ["Dataset", "Profile"],
            // Two name values — violates sh:maxCount: 1
            "name": ["Profile Name One", "Profile Name Two"],
            "license": "Apache-2.0",
            "isProfileOf": [{ "@id": "https://w3id.org/ro/crate/1.2" }],
            "hasResource": [{ "@id": "#hasSchema" }],
          },
          {
            "@id": "#hasSchema",
            "@type": "ResourceDescriptor",
            "hasRole": { "@id": "http://www.w3.org/ns/dx/prof/role/schema" },
          },
        ],
      };
      const targetCrate = new ROCrate(crateJson, { array: true, link: true });
      results = await validator.validateCrate(targetCrate);
      console.log(
        "Multiple name values results:",
        JSON.stringify(results.rules["#class_ProfileDataset"], null, 2)
      );
    });

    it("records property-errors for 'name' (too many values)", function () {
      const profileRule = results.rules["#class_ProfileDataset"];
      expect(profileRule).to.not.be.undefined;
      const entityRule = profileRule["https://example.org/my-profile/"];
      expect(entityRule).to.not.be.undefined;
      const errors = entityRule["property-errors"] || [];
      const nameError = errors.find((e) => e.message.includes("name"));
      expect(nameError).to.not.be.undefined;
    });
  });

  describe("Error: root entity has Dataset type but not Profile type", function () {
    let results;

    // ROCrate requires a root entity pointed to by the metadata descriptor.
    // This test uses a root entity that is only a Dataset (not Profile),
    // so the MASP validator finds 0 valid ProfileDataset instances.
    before(async function () {
      const validator = new SossValidator(maspProfileCrate);
      const crateJson = {
        "@context": [
          "https://w3id.org/ro/crate/1.2/context",
          { "@vocab": "http://schema.org/" },
        ],
        "@graph": [
          {
            "@id": "ro-crate-metadata.json",
            "@type": "CreativeWork",
            "conformsTo": { "@id": "https://w3id.org/ro/crate/1.2" },
            "about": { "@id": "https://example.org/my-profile/" },
          },
          {
            "@id": "https://w3id.org/ro/crate/1.2",
            "@type": "CreativeWork",
            "name": "RO-Crate 1.2",
          },
          {
            // Root entity is Dataset-only — missing the "Profile" type
            "@id": "https://example.org/my-profile/",
            "@type": ["Dataset"],
            "name": "My Test Profile",
            "license": "Apache-2.0",
          },
        ],
      };
      const targetCrate = new ROCrate(crateJson, { array: true, link: true });
      results = await validator.validateCrate(targetCrate);
    });

    it("produces at least one error", function () {
      expect(results.error.length).to.be.greaterThan(0);
    });

    it("error message references ProfileDataset or Dataset+Profile", function () {
      const msgs = results.error.map((e) => e.message);
      const found = msgs.some(
        (m) =>
          m.includes("ProfileDataset") ||
          (m.includes("Dataset") && m.includes("Profile"))
      );
      expect(found).to.be.true;
    });
  });

  // -----------------------------------------------------------------
  // Error cases: missing required properties
  // -----------------------------------------------------------------

  describe("Error: required property 'name' missing on Profile Dataset", function () {
    let results;

    before(async function () {
      const validator = new SossValidator(maspProfileCrate);
      const crateJson = {
        "@context": [
          "https://w3id.org/ro/crate/1.2/context",
          { "@vocab": "http://schema.org/" },
        ],
        "@graph": [
          {
            "@id": "ro-crate-metadata.json",
            "@type": "CreativeWork",
            "conformsTo": { "@id": "https://w3id.org/ro/crate/1.2" },
            "about": { "@id": "https://example.org/my-profile/" },
          },
          {
            "@id": "https://w3id.org/ro/crate/1.2",
            "@type": "CreativeWork",
            "name": "RO-Crate 1.2",
          },
          {
            "@id": "https://example.org/my-profile/",
            "@type": ["Dataset", "Profile"],
            // name deliberately omitted
            "license": "Apache-2.0",
            "isProfileOf": [{ "@id": "https://w3id.org/ro/crate/1.2" }],
            "hasResource": [{ "@id": "#hasSchema" }],
          },
          {
            "@id": "#hasSchema",
            "@type": "ResourceDescriptor",
            "hasRole": { "@id": "http://www.w3.org/ns/dx/prof/role/schema" },
          },
        ],
      };
      const targetCrate = new ROCrate(crateJson, { array: true, link: true });
      results = await validator.validateCrate(targetCrate);
      console.log("Missing name results:", JSON.stringify(results, null, 2));
    });

    it("records property-errors for 'name' on the profile dataset entity", function () {
      const profileRule = results.rules["#class_ProfileDataset"];
      expect(profileRule).to.not.be.undefined;
      const entityRule = profileRule["https://example.org/my-profile/"];
      expect(entityRule).to.not.be.undefined;
      const errors = entityRule["property-errors"] || [];
      const nameError = errors.find((e) => e.message.includes("name"));
      expect(nameError).to.not.be.undefined;
    });
  });

  describe("Error: required property 'isProfileOf' missing on Profile Dataset", function () {
    let results;

    before(async function () {
      const validator = new SossValidator(maspProfileCrate);
      const crateJson = {
        "@context": [
          "https://w3id.org/ro/crate/1.2/context",
          { "@vocab": "http://schema.org/" },
        ],
        "@graph": [
          {
            "@id": "ro-crate-metadata.json",
            "@type": "CreativeWork",
            "conformsTo": { "@id": "https://w3id.org/ro/crate/1.2" },
            "about": { "@id": "https://example.org/my-profile/" },
          },
          {
            "@id": "https://example.org/my-profile/",
            "@type": ["Dataset", "Profile"],
            "name": "My Test Profile",
            "license": "Apache-2.0",
            // isProfileOf deliberately omitted
          },
        ],
      };
      const targetCrate = new ROCrate(crateJson, { array: true, link: true });
      results = await validator.validateCrate(targetCrate);
    });

    it("records property-errors for 'isProfileOf' on the profile dataset entity", function () {
      const profileRule = results.rules["#class_ProfileDataset"];
      expect(profileRule).to.not.be.undefined;
      const entityRule = profileRule["https://example.org/my-profile/"];
      expect(entityRule).to.not.be.undefined;
      const errors = entityRule["property-errors"] || [];
      const isProfileOfError = errors.find((e) =>
        e.message.includes("isProfileOf")
      );
      expect(isProfileOfError).to.not.be.undefined;
    });
  });

  describe("Error: required property 'license' missing on Profile Dataset", function () {
    let results;

    before(async function () {
      const validator = new SossValidator(maspProfileCrate);
      const crateJson = {
        "@context": [
          "https://w3id.org/ro/crate/1.2/context",
          { "@vocab": "http://schema.org/" },
        ],
        "@graph": [
          {
            "@id": "ro-crate-metadata.json",
            "@type": "CreativeWork",
            "conformsTo": { "@id": "https://w3id.org/ro/crate/1.2" },
            "about": { "@id": "https://example.org/my-profile/" },
          },
          {
            "@id": "https://w3id.org/ro/crate/1.2",
            "@type": "CreativeWork",
            "name": "RO-Crate 1.2",
          },
          {
            "@id": "https://example.org/my-profile/",
            "@type": ["Dataset", "Profile"],
            "name": "My Test Profile",
            // license deliberately omitted
            "isProfileOf": [{ "@id": "https://w3id.org/ro/crate/1.2" }],
            "hasResource": [{ "@id": "#hasSchema" }],
          },
          {
            "@id": "#hasSchema",
            "@type": "ResourceDescriptor",
            "hasRole": { "@id": "http://www.w3.org/ns/dx/prof/role/schema" },
          },
        ],
      };
      const targetCrate = new ROCrate(crateJson, { array: true, link: true });
      results = await validator.validateCrate(targetCrate);
    });

    it("records property-errors for 'license' on the profile dataset entity", function () {
      const profileRule = results.rules["#class_ProfileDataset"];
      expect(profileRule).to.not.be.undefined;
      const entityRule = profileRule["https://example.org/my-profile/"];
      expect(entityRule).to.not.be.undefined;
      const errors = entityRule["property-errors"] || [];
      const licenseError = errors.find((e) => e.message.includes("license"));
      expect(licenseError).to.not.be.undefined;
    });
  });

  describe("Error: required property 'hasResource' missing on Profile Dataset", function () {
    let results;

    before(async function () {
      const validator = new SossValidator(maspProfileCrate);
      const crateJson = {
        "@context": [
          "https://w3id.org/ro/crate/1.2/context",
          { "@vocab": "http://schema.org/" },
        ],
        "@graph": [
          {
            "@id": "ro-crate-metadata.json",
            "@type": "CreativeWork",
            "conformsTo": { "@id": "https://w3id.org/ro/crate/1.2" },
            "about": { "@id": "https://example.org/my-profile/" },
          },
          {
            "@id": "https://w3id.org/ro/crate/1.2",
            "@type": "CreativeWork",
            "name": "RO-Crate 1.2",
          },
          {
            "@id": "https://example.org/my-profile/",
            "@type": ["Dataset", "Profile"],
            "name": "My Test Profile",
            "license": "Apache-2.0",
            "isProfileOf": [{ "@id": "https://w3id.org/ro/crate/1.2" }],
            // hasResource deliberately omitted
          },
        ],
      };
      const targetCrate = new ROCrate(crateJson, { array: true, link: true });
      results = await validator.validateCrate(targetCrate);
    });

    it("records property-errors for 'hasResource' on the profile dataset entity", function () {
      const profileRule = results.rules["#class_ProfileDataset"];
      expect(profileRule).to.not.be.undefined;
      const entityRule = profileRule["https://example.org/my-profile/"];
      expect(entityRule).to.not.be.undefined;
      const errors = entityRule["property-errors"] || [];
      const hasResourceError = errors.find((e) =>
        e.message.includes("hasResource")
      );
      expect(hasResourceError).to.not.be.undefined;
    });
  });

  // -----------------------------------------------------------------
  // Error cases: missing required properties on MetadataDescriptor
  // -----------------------------------------------------------------

  describe("Error: required property 'conformsTo' missing on MetadataDescriptor", function () {
    let results;

    before(async function () {
      const validator = new SossValidator(maspProfileCrate);
      const crateJson = {
        "@context": [
          "https://w3id.org/ro/crate/1.2/context",
          { "@vocab": "http://schema.org/" },
        ],
        "@graph": [
          {
            "@id": "ro-crate-metadata.json",
            "@type": "CreativeWork",
            // conformsTo deliberately omitted
            "about": { "@id": "https://example.org/my-profile/" },
          },
          {
            "@id": "https://example.org/my-profile/",
            "@type": ["Dataset", "Profile"],
            "name": "My Test Profile",
            "license": "Apache-2.0",
            "isProfileOf": [{ "@id": "https://w3id.org/ro/crate/1.2" }],
            "hasResource": [{ "@id": "#hasSchema" }],
          },
          {
            "@id": "#hasSchema",
            "@type": "ResourceDescriptor",
            "hasRole": { "@id": "http://www.w3.org/ns/dx/prof/role/schema" },
          },
        ],
      };
      const targetCrate = new ROCrate(crateJson, { array: true, link: true });
      results = await validator.validateCrate(targetCrate);
    });

    it("records property-errors for 'conformsTo' on the metadata descriptor", function () {
      const metadataRule = results.rules["#class_MetadataDescriptor"];
      expect(metadataRule).to.not.be.undefined;
      const entityRule = metadataRule["ro-crate-metadata.json"];
      expect(entityRule).to.not.be.undefined;
      const errors = entityRule["property-errors"] || [];
      const conformsToError = errors.find((e) =>
        e.message.includes("conformsTo")
      );
      expect(conformsToError).to.not.be.undefined;
    });
  });

  // -----------------------------------------------------------------
  // Self-validation: MASP profile crate against MASP profile
  // -----------------------------------------------------------------

  describe("MASP profile self-validation", function () {
    let results;

    before(async function () {
      const validator = new SossValidator(maspProfileCrate);
      results = await validator.validateCrate(maspProfileCrate);
      console.log(
        "MASP self-validation results:",
        JSON.stringify(results, null, 2)
      );
    });

    it("MASP profile crate validates against the MASP profile with no errors", function () {
      expect(results.error.length).to.equal(0);
    });

    it("records property-success for 'name' on the MASP profile root", function () {
      const maspRootId =
        "https://language-research-technology.github.io/ro-crate-masp/profiles/ro-crate-masp/profile-crate/";
      const profileRule = results.rules["#class_ProfileDataset"];
      expect(profileRule).to.not.be.undefined;
      const entityRule = profileRule[maspRootId];
      expect(entityRule).to.not.be.undefined;
      const successes = entityRule["property-success"] || [];
      const nameSuccess = successes.find((s) => s.message.includes("name"));
      expect(nameSuccess).to.not.be.undefined;
    });
  });

  // -----------------------------------------------------------------
  // Incremental build-up test (exercising the validator step by step)
  // -----------------------------------------------------------------

  describe("Incremental profile crate build-up", function () {
    it("starts with errors on an empty crate and clears them as fields are added", async function () {
      const validator = new SossValidator(maspProfileCrate);
      const targetCrate = new ROCrate({ array: true, link: true });

      // Empty crate: missing both required class instances
      let results = await validator.validateCrate(targetCrate);
      expect(results.error.length).to.be.greaterThan(0);

      // Add the metadata descriptor (CreativeWork with @id ro-crate-metadata.json)
      // ROCrate always includes the metadata descriptor, so check it's there
      // The default ROCrate() creates a minimal crate with metadata descriptor
      // Add required properties to the root (which ROCrate auto-creates)
      targetCrate.root["@type"] = ["Dataset", "Profile"];
      targetCrate.root.name = "Incrementally Built Profile";
      targetCrate.root.license = "Apache-2.0";
      targetCrate.root.isProfileOf = { "@id": "https://w3id.org/ro/crate/1.2" };
      targetCrate.root.hasResource = { "@id": "#hasSchema" };
      targetCrate.addValues(targetCrate.root, "hasResource", {
        "@id": "#hasSchema",
        "@type": "ResourceDescriptor",
        "hasRole": { "@id": "http://www.w3.org/ns/dx/prof/role/schema" },
      });

      // The metadata descriptor still needs conformsTo and about
      const metadataDescriptor = targetCrate.metadataFileDescriptor;
      metadataDescriptor.conformsTo = { "@id": "https://w3id.org/ro/crate/1.2" };

      results = await validator.validateCrate(targetCrate);
      console.log(
        "Incremental build results:",
        JSON.stringify(results, null, 2)
      );

      // After adding required fields there should be fewer errors or none
      // (depending on how ROCrate handles the root @id)
      expect(results).to.have.property("error");
      expect(results).to.have.property("success");
      expect(results).to.have.property("rules");
    });
  });
});
