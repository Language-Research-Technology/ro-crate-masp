const { expect } = require("chai");
const path = require("path");
const { ROCrate } = require("ro-crate");

const SCHEMA_CRATE_PATH = path.join(
  __dirname,
  "../schemas/schema-org/schema-crate/ro-crate-metadata.json"
);

// Known counts from the schema.org dump at generation time.
// Update these if the schema.org crate is regenerated from a newer release.
const MIN_CLASSES = 900;
const MIN_PROPERTIES = 1500;

describe("Schema.org schema crate", function () {
  let data;
  let graph;
  let classes;
  let properties;

  before(function () {
    data = require(SCHEMA_CRATE_PATH);
    graph = data["@graph"];
    classes = graph.filter(
      (e) =>
        (Array.isArray(e["@type"]) ? e["@type"] : [e["@type"]]).includes(
          "rdfs:Class"
        )
    );
    properties = graph.filter(
      (e) =>
        (Array.isArray(e["@type"]) ? e["@type"] : [e["@type"]]).includes(
          "rdf:Property"
        )
    );
  });

  describe("Crate structure", function () {
    it("should be valid JSON with @context and @graph", function () {
      expect(data).to.have.property("@context");
      expect(data).to.have.property("@graph").that.is.an("array");
    });

    it("should have a metadata descriptor", function () {
      const descriptor = graph.find(
        (e) => e["@id"] === "ro-crate-metadata.json"
      );
      expect(descriptor).to.exist;
      expect(descriptor["@type"]).to.equal("CreativeWork");
      expect(descriptor).to.have.property("about");
    });

    it("should have a root Dataset entity", function () {
      const root = graph.find((e) => e["@id"] === "./");
      expect(root).to.exist;
      const types = Array.isArray(root["@type"])
        ? root["@type"]
        : [root["@type"]];
      expect(types).to.include("Dataset");
    });

    it("root entity should have conformsTo and hasResource", function () {
      const root = graph.find((e) => e["@id"] === "./");
      expect(root).to.have.property("conformsTo");
      expect(root).to.have.property("hasResource");
    });

    it("should have a #hasSpecializedSchema ResourceDescriptor with role/schema", function () {
      const rd = graph.find((e) => e["@id"] === "#hasSpecializedSchema");
      expect(rd).to.exist;
      expect(rd["@type"]).to.equal("ResourceDescriptor");
      const role =
        typeof rd["hasRole"] === "object"
          ? rd["hasRole"]["@id"]
          : rd["hasRole"];
      expect(role).to.equal("http://www.w3.org/ns/dx/prof/role/schema");
    });

    it("ResourceDescriptor hasPart count should match classes + properties in graph", function () {
      const rd = graph.find((e) => e["@id"] === "#hasSpecializedSchema");
      const hasPart = Array.isArray(rd["hasPart"])
        ? rd["hasPart"]
        : [rd["hasPart"]];
      expect(hasPart).to.have.lengthOf(classes.length + properties.length);
    });
  });

  describe("Entity counts", function () {
    it(`should have at least ${MIN_CLASSES} rdfs:Class entities`, function () {
      expect(classes.length).to.be.at.least(MIN_CLASSES);
    });

    it(`should have at least ${MIN_PROPERTIES} rdf:Property entities`, function () {
      expect(properties.length).to.be.at.least(MIN_PROPERTIES);
    });

    it("every entity in hasPart should exist in the graph", function () {
      const rd = graph.find((e) => e["@id"] === "#hasSpecializedSchema");
      const hasPart = Array.isArray(rd["hasPart"])
        ? rd["hasPart"]
        : [rd["hasPart"]];
      const graphIds = new Set(graph.map((e) => e["@id"]));
      const missing = hasPart
        .map((p) => (typeof p === "object" ? p["@id"] : p))
        .filter((id) => !graphIds.has(id));
      expect(missing).to.be.empty;
    });
  });

  describe("Known classes", function () {
    const knownClasses = [
      "https://schema.org/Thing",
      "https://schema.org/Person",
      "https://schema.org/Organization",
      "https://schema.org/Dataset",
      "https://schema.org/CreativeWork",
      "https://schema.org/Event",
      "https://schema.org/Place",
    ];

    for (const id of knownClasses) {
      it(`should contain ${id.replace("https://schema.org/", "")}`, function () {
        const entity = graph.find((e) => e["@id"] === id);
        expect(entity, `missing entity ${id}`).to.exist;
        expect(entity["@type"]).to.equal("rdfs:Class");
        expect(entity).to.have.property("rdfs:label");
        expect(entity).to.have.property("rdfs:comment");
      });
    }

    it("schema:Person should have rdfs:subClassOf schema:Thing", function () {
      const person = graph.find(
        (e) => e["@id"] === "https://schema.org/Person"
      );
      const subClassOf = Array.isArray(person["rdfs:subClassOf"])
        ? person["rdfs:subClassOf"]
        : [person["rdfs:subClassOf"]];
      const ids = subClassOf.map((s) =>
        typeof s === "object" ? s["@id"] : s
      );
      expect(ids).to.include("https://schema.org/Thing");
    });
  });

  describe("Known properties", function () {
    const knownProperties = [
      "https://schema.org/name",
      "https://schema.org/author",
      "https://schema.org/license",
      "https://schema.org/datePublished",
      "https://schema.org/description",
      "https://schema.org/identifier",
      "https://schema.org/hasPart",
    ];

    for (const id of knownProperties) {
      it(`should contain ${id.replace("https://schema.org/", "")}`, function () {
        const entity = graph.find((e) => e["@id"] === id);
        expect(entity, `missing entity ${id}`).to.exist;
        expect(entity["@type"]).to.equal("rdf:Property");
        expect(entity).to.have.property("rdfs:label");
      });
    }

    it("schema:author should have domainIncludes and rangeIncludes", function () {
      const author = graph.find(
        (e) => e["@id"] === "https://schema.org/author"
      );
      expect(author).to.have.property("domainIncludes");
      expect(author).to.have.property("rangeIncludes");
      const domain = Array.isArray(author["domainIncludes"])
        ? author["domainIncludes"]
        : [author["domainIncludes"]];
      const domainIds = domain.map((d) =>
        typeof d === "object" ? d["@id"] : d
      );
      expect(domainIds).to.include("https://schema.org/CreativeWork");
    });

    it("schema:name should include schema:Thing in its domain", function () {
      const name = graph.find((e) => e["@id"] === "https://schema.org/name");
      const domain = Array.isArray(name["domainIncludes"])
        ? name["domainIncludes"]
        : [name["domainIncludes"]];
      const domainIds = domain.map((d) =>
        typeof d === "object" ? d["@id"] : d
      );
      expect(domainIds).to.include("https://schema.org/Thing");
    });
  });

  describe("Data quality", function () {
    it("all rdfs:Class entities should have an rdfs:label", function () {
      const missing = classes.filter((e) => !e["rdfs:label"]);
      expect(missing, `${missing.length} classes missing rdfs:label`).to.be
        .empty;
    });

    it("all rdf:Property entities should have an rdfs:label", function () {
      const missing = properties.filter((e) => !e["rdfs:label"]);
      expect(missing, `${missing.length} properties missing rdfs:label`).to.be
        .empty;
    });

    it("all rdf:Property entities should have domainIncludes", function () {
      const missing = properties.filter(
        (e) => !e["domainIncludes"] || (Array.isArray(e["domainIncludes"]) && e["domainIncludes"].length === 0)
      );
      // Allow a small number of properties without domain (schema.org has some)
      expect(missing.length).to.be.at.most(20);
    });

    it("no entity should have @id starting with http: (all should use https:)", function () {
      const httpEntities = graph.filter(
        (e) => typeof e["@id"] === "string" && e["@id"].startsWith("http://schema.org/")
      );
      expect(httpEntities).to.be.empty;
    });
  });
});
