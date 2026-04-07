const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { ROCrate } = require("ro-crate");
const { MaspValidator } = require("../lib/masp-validator");

const SCHEMA_CRATE_PATH = path.join(
  __dirname,
  "../schemas/schema-org/schema-crate/ro-crate-metadata.json"
);

const MIN_ENUM_VALUES = 500;

describe("MaspValidator – enumeration support", function () {
  this.timeout(30000);

  let validator;

  before(function () {
    const data = JSON.parse(fs.readFileSync(SCHEMA_CRATE_PATH, "utf8"));
    const crate = new ROCrate(data, { array: true, link: true });
    validator = new MaspValidator(crate);
    validator.parseRules();
  });

  describe("isEnumerationClass()", function () {
    it("schema:Enumeration itself returns true", function () {
      expect(validator.isEnumerationClass("https://schema.org/Enumeration")).to.be.true;
    });

    it("schema:DayOfWeek returns true (direct subclass of Enumeration)", function () {
      expect(validator.isEnumerationClass("https://schema.org/DayOfWeek")).to.be.true;
    });

    it("schema:MedicalSpecialty returns true (via MedicalEnumeration → Enumeration)", function () {
      expect(validator.isEnumerationClass("https://schema.org/MedicalSpecialty")).to.be.true;
    });

    it("schema:Person returns false", function () {
      expect(validator.isEnumerationClass("https://schema.org/Person")).to.be.false;
    });

    it("schema:Thing returns false", function () {
      expect(validator.isEnumerationClass("https://schema.org/Thing")).to.be.false;
    });
  });

  describe("getEnumerationValues()", function () {
    it("schema:DayOfWeek returns 8 values including Monday, Sunday, PublicHolidays", function () {
      const vals = validator.getEnumerationValues("https://schema.org/DayOfWeek");
      expect(vals).to.be.an("array");
      expect(vals.length).to.be.at.least(7);
      const ids = vals.map((v) => v["@id"]);
      expect(ids).to.include("https://schema.org/Monday");
      expect(ids).to.include("https://schema.org/Sunday");
      expect(ids).to.include("https://schema.org/PublicHolidays");
    });

    it("schema:GenderType returns 2 values (Male, Female)", function () {
      const vals = validator.getEnumerationValues("https://schema.org/GenderType");
      expect(vals).to.be.an("array");
      expect(vals.length).to.equal(2);
      const ids = vals.map((v) => v["@id"]);
      expect(ids).to.include("https://schema.org/Male");
      expect(ids).to.include("https://schema.org/Female");
    });

    it("schema:Boolean returns 2 values (True, False)", function () {
      const vals = validator.getEnumerationValues("https://schema.org/Boolean");
      expect(vals).to.be.an("array");
      expect(vals.length).to.equal(2);
      const ids = vals.map((v) => v["@id"]);
      expect(ids).to.include("https://schema.org/True");
      expect(ids).to.include("https://schema.org/False");
    });

    it("schema:Person returns empty array (not an enum class)", function () {
      const vals = validator.getEnumerationValues("https://schema.org/Person");
      expect(vals).to.be.an("array");
      expect(vals).to.be.empty;
    });
  });

  describe("rules.enumerationValues after parseRules()", function () {
    it("is populated as an object", function () {
      expect(validator.rules.enumerationValues).to.be.an("object");
    });

    it("contains entries for enumeration classes", function () {
      const keys = Object.keys(validator.rules.enumerationValues);
      expect(keys.length).to.be.greaterThan(0);
    });

    it(`total enum values across all classes is at least ${MIN_ENUM_VALUES}`, function () {
      const total = Object.values(validator.rules.enumerationValues)
        .reduce((sum, arr) => sum + arr.length, 0);
      expect(total).to.be.at.least(MIN_ENUM_VALUES);
    });

    it("DayOfWeek entries in rules.enumerationValues include Monday", function () {
      const dayOfWeekVals = validator.rules.enumerationValues["https://schema.org/DayOfWeek"];
      expect(dayOfWeekVals).to.be.an("array");
      const ids = dayOfWeekVals.map((v) => v["@id"]);
      expect(ids).to.include("https://schema.org/Monday");
    });
  });
});
