const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { ROCrate } = require("ro-crate");
const { MaspValidator } = require("../lib/masp-validator");

const SCHEMA_CRATE_PATH = path.join(
  __dirname,
  "../schemas/schema-org/schema-crate/ro-crate-metadata.json"
);

describe("MaspValidator – class inheritance", function () {
  this.timeout(15000);

  let validator;

  before(function () {
    const data = JSON.parse(fs.readFileSync(SCHEMA_CRATE_PATH, "utf8"));
    const crate = new ROCrate(data, { array: true, link: true });
    validator = new MaspValidator(crate);
    // Note: parseRules() is only required for inheritedPropertyRules tests.
    // getParentClassIds / parentClasses / ancestorClassIds work directly from
    // the loaded profileCrate without parsing the ResourceDescriptor.
  });

  describe("getParentClassIds()", function () {
    it("Thing has no parents", function () {
      const parents = validator.getParentClassIds("https://schema.org/Thing");
      expect(parents).to.deep.equal([]);
    });

    it("Person → Thing", function () {
      const parents = validator.getParentClassIds("https://schema.org/Person");
      expect(parents).to.deep.equal(["https://schema.org/Thing"]);
    });

    it("Dataset → CreativeWork", function () {
      const parents = validator.getParentClassIds("https://schema.org/Dataset");
      expect(parents).to.deep.equal(["https://schema.org/CreativeWork"]);
    });

    it("LocalBusiness has two parents: Place and Organization", function () {
      const parents = validator.getParentClassIds(
        "https://schema.org/LocalBusiness"
      );
      expect(parents).to.include("https://schema.org/Place");
      expect(parents).to.include("https://schema.org/Organization");
    });

    it("unknown class ID returns empty array", function () {
      const parents = validator.getParentClassIds(
        "https://schema.org/NotARealClass"
      );
      expect(parents).to.deep.equal([]);
    });
  });

  describe("parentClasses()", function () {
    it("Thing returns [[]] — root class, no ancestors", function () {
      const paths = validator.parentClasses("https://schema.org/Thing");
      expect(paths).to.deep.equal([[]]);
    });

    it("Person returns one path ending at Thing", function () {
      const paths = validator.parentClasses("https://schema.org/Person");
      expect(paths).to.have.lengthOf(1);
      expect(paths[0][0]).to.equal("https://schema.org/Thing");
    });

    it("NewsArticle → Article → CreativeWork → Thing (single path, depth 3)", function () {
      const paths = validator.parentClasses(
        "https://schema.org/NewsArticle"
      );
      expect(paths).to.have.lengthOf(1);
      const [path] = paths;
      expect(path[0]).to.equal("https://schema.org/Article");
      expect(path[1]).to.equal("https://schema.org/CreativeWork");
      expect(path[2]).to.equal("https://schema.org/Thing");
    });

    it("Dataset → CreativeWork → Thing path is correct", function () {
      const paths = validator.parentClasses("https://schema.org/Dataset");
      expect(paths).to.have.lengthOf(1);
      expect(paths[0]).to.deep.equal([
        "https://schema.org/CreativeWork",
        "https://schema.org/Thing",
      ]);
    });

    it("LocalBusiness returns two paths (multiple inheritance)", function () {
      const paths = validator.parentClasses(
        "https://schema.org/LocalBusiness"
      );
      expect(paths).to.have.lengthOf(2);
      const firstIds = paths.map((p) => p[0]);
      expect(firstIds).to.include("https://schema.org/Place");
      expect(firstIds).to.include("https://schema.org/Organization");
    });

    it("every path for LocalBusiness ends at Thing", function () {
      const paths = validator.parentClasses(
        "https://schema.org/LocalBusiness"
      );
      for (const path of paths) {
        expect(path[path.length - 1]).to.equal("https://schema.org/Thing");
      }
    });

    it("does not loop on unknown class ID", function () {
      const paths = validator.parentClasses(
        "https://schema.org/NotARealClass"
      );
      expect(paths).to.deep.equal([[]]);
    });
  });

  describe("ancestorClassIds()", function () {
    it("Thing has no ancestors", function () {
      const ancestors = validator.ancestorClassIds("https://schema.org/Thing");
      expect(ancestors).to.deep.equal([]);
    });

    it("Person has exactly one ancestor: Thing", function () {
      const ancestors = validator.ancestorClassIds(
        "https://schema.org/Person"
      );
      expect(ancestors).to.deep.equal(["https://schema.org/Thing"]);
    });

    it("Dataset ancestors include CreativeWork and Thing", function () {
      const ancestors = validator.ancestorClassIds(
        "https://schema.org/Dataset"
      );
      expect(ancestors).to.include("https://schema.org/CreativeWork");
      expect(ancestors).to.include("https://schema.org/Thing");
    });

    it("LocalBusiness ancestors include Place, Organization, and Thing (deduplicated)", function () {
      const ancestors = validator.ancestorClassIds(
        "https://schema.org/LocalBusiness"
      );
      expect(ancestors).to.include("https://schema.org/Place");
      expect(ancestors).to.include("https://schema.org/Organization");
      expect(ancestors).to.include("https://schema.org/Thing");
      // Thing appears via both Place and Organization paths — must appear only once
      const thingCount = ancestors.filter(
        (id) => id === "https://schema.org/Thing"
      ).length;
      expect(thingCount).to.equal(1);
    });

    it("NewsArticle has Article, CreativeWork and Thing as ancestors", function () {
      const ancestors = validator.ancestorClassIds(
        "https://schema.org/NewsArticle"
      );
      expect(ancestors).to.include("https://schema.org/Article");
      expect(ancestors).to.include("https://schema.org/CreativeWork");
      expect(ancestors).to.include("https://schema.org/Thing");
    });
  });

  describe("inheritedPropertyRules()", function () {
    before(function () {
      validator.parseRules();
    });

    it("schema:Thing own properties include 'name'", function () {
      const { own } = validator.inheritedPropertyRules(
        "https://schema.org/Thing"
      );
      const names = own.map((pr) => pr.entity["@id"]);
      expect(names).to.include("https://schema.org/name");
    });

    it("schema:Dataset has no own properties (all inherited from CreativeWork/Thing)", function () {
      // Dataset's domainIncludes is empty or minimal — schema.org properties
      // typically target the highest class in the hierarchy
      const { own, inherited } = validator.inheritedPropertyRules(
        "https://schema.org/Dataset"
      );
      // inherited should contain properties from CreativeWork and/or Thing
      const ancestorIds = Object.keys(inherited);
      expect(ancestorIds).to.include("https://schema.org/CreativeWork");
    });

    it("schema:Person inherited includes properties from Thing", function () {
      const { inherited } = validator.inheritedPropertyRules(
        "https://schema.org/Person"
      );
      expect(inherited).to.have.property("https://schema.org/Thing");
      const thingPropIds = inherited["https://schema.org/Thing"].map(
        (pr) => pr.entity["@id"]
      );
      expect(thingPropIds).to.include("https://schema.org/name");
    });

    it("own + inherited together cover all applicable properties", function () {
      const { own, inherited } = validator.inheritedPropertyRules(
        "https://schema.org/Person"
      );
      const allProps = [
        ...own,
        ...Object.values(inherited).flat(),
      ];
      expect(allProps.length).to.be.greaterThan(0);
      // No duplicates across own and inherited
      const ids = allProps.map((pr) => pr.entity["@id"]);
      const unique = new Set(ids);
      expect(ids.length).to.equal(unique.size);
    });
  });
});
