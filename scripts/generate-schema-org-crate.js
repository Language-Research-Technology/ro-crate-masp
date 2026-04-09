#!/usr/bin/env node
/**
 * generate-schema-org-crate.js
 *
 * Fetches the full schema.org vocabulary from the official JSON-LD dump and
 * converts it into a MASP schema crate (ro-crate-metadata.json).
 *
 * Usage:
 *   node scripts/generate-schema-org-crate.js
 *   node scripts/generate-schema-org-crate.js --input /path/to/schemaorg.jsonld
 *   node scripts/generate-schema-org-crate.js --output schemas/schema-org/schema-crate/ro-crate-metadata.json
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const SCHEMA_ORG_JSONLD_URL =
  "https://schema.org/version/latest/schemaorg-current-https.jsonld";
const DEFAULT_OUTPUT = path.join(
  __dirname,
  "..",
  "schemas",
  "schema-org",
  "schema-crate",
  "ro-crate-metadata.json"
);

function parseArgs() {
  const args = process.argv.slice(2);
  let inputPath = null;
  let outputPath = DEFAULT_OUTPUT;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--input" && args[i + 1]) inputPath = args[++i];
    if (args[i] === "--output" && args[i + 1]) outputPath = args[++i];
  }
  return { inputPath, outputPath };
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchUrl(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

function normaliseArray(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

const SCHEMA_PREFIX = "schema:";
const SCHEMA_BASE = "https://schema.org/";

/** Expand a compact schema: CURIE to its full https://schema.org/ URI */
function expandId(id) {
  if (typeof id !== "string") return id;
  if (id.startsWith(SCHEMA_PREFIX)) return SCHEMA_BASE + id.slice(SCHEMA_PREFIX.length);
  return id;
}

/** Expand an @id object or string */
function expandRef(ref) {
  if (!ref) return ref;
  if (typeof ref === "object" && ref["@id"]) return { "@id": expandId(ref["@id"]) };
  return { "@id": expandId(ref) };
}

/** Convert a schema.org entity to MASP format */
function convertEntity(entity) {
  const rawId = entity["@id"];
  if (!rawId) return null;

  const types = normaliseArray(entity["@type"]);

  // We only want rdfs:Class and rdf:Property entities
  const isClass = types.includes("rdfs:Class");
  const isProperty = types.includes("rdf:Property");
  if (!isClass && !isProperty) return null;

  // Only keep schema.org native terms (compact schema: prefix).
  // External vocabulary terms (unece:, fibo:, snomed:, etc.) are referenced by
  // schema.org but are not part of the schema.org vocabulary itself.
  if (!rawId.startsWith(SCHEMA_PREFIX)) return null;

  const id = expandId(rawId);
  const out = {
    "@id": id,
    "@type": isClass ? "rdfs:Class" : "rdf:Property",
  };

  // Label
  const label = entity["rdfs:label"];
  if (label) {
    out["rdfs:label"] =
      typeof label === "object" && label["@value"] ? label["@value"] : label;
    out["name"] = out["rdfs:label"];
  }

  // Comment / description
  const comment = entity["rdfs:comment"];
  if (comment) {
    out["rdfs:comment"] =
      typeof comment === "object" && comment["@value"]
        ? comment["@value"]
        : comment;
  }

  // subClassOf (classes only) — expand compact CURIEs, store as @id reference objects
  // so that ROCrate with link:true will resolve them to linked entities
  if (isClass) {
    const subClassOf = normaliseArray(entity["rdfs:subClassOf"]);
    if (subClassOf.length > 0) {
      out["rdfs:subClassOf"] = subClassOf.map((s) => ({
        "@id": expandId(typeof s === "object" ? s["@id"] : s),
      }));
    }
  }

  // domainIncludes (properties only) — expand compact CURIEs
  if (isProperty) {
    const domain =
      normaliseArray(entity["schema:domainIncludes"]).length > 0
        ? normaliseArray(entity["schema:domainIncludes"])
        : normaliseArray(entity["http://schema.org/domainIncludes"]);
    if (domain.length > 0) {
      out["domainIncludes"] = domain.map((d) => expandRef(d));
    }

    // rangeIncludes
    const range =
      normaliseArray(entity["schema:rangeIncludes"]).length > 0
        ? normaliseArray(entity["schema:rangeIncludes"])
        : normaliseArray(entity["http://schema.org/rangeIncludes"]);
    if (range.length > 0) {
      out["rangeIncludes"] = range.map((r) => expandRef(r)
      );
    }

    // supersededBy (informational)
    const supersededBy =
      normaliseArray(entity["schema:supersededBy"]).length > 0
        ? normaliseArray(entity["schema:supersededBy"])
        : normaliseArray(entity["http://schema.org/supersededBy"]);
    if (supersededBy.length > 0) {
      out["schema:supersededBy"] = supersededBy.map((s) => expandRef(s));
    }
  }

  return out;
}

/** Convert a schema.org enumeration value entity to MASP format */
function convertEnumValue(entity) {
  const rawId = entity["@id"];
  if (!rawId) return null;
  if (!rawId.startsWith(SCHEMA_PREFIX)) return null;

  const types = normaliseArray(entity["@type"]);
  // Skip classes and properties — those are handled by convertEntity
  if (types.includes("rdfs:Class") || types.includes("rdf:Property")) return null;

  // Find the enum type: first @type value that starts with SCHEMA_PREFIX
  const enumType = types.find((t) => typeof t === "string" && t.startsWith(SCHEMA_PREFIX));
  if (!enumType) return null;

  const id = expandId(rawId);
  const out = {
    "@id": id,
    "@type": expandId(enumType),
  };

  // Label
  const label = entity["rdfs:label"];
  if (label) {
    out["rdfs:label"] =
      typeof label === "object" && label["@value"] ? label["@value"] : label;
    out["name"] = out["rdfs:label"];
  }

  // Comment / description
  const comment = entity["rdfs:comment"];
  if (comment) {
    out["rdfs:comment"] =
      typeof comment === "object" && comment["@value"]
        ? comment["@value"]
        : comment;
  }

  return out;
}

async function main() {
  const { inputPath, outputPath } = parseArgs();

  let rawJson;
  if (inputPath) {
    console.log(`Reading schema.org JSON-LD from: ${inputPath}`);
    rawJson = fs.readFileSync(inputPath, "utf8");
  } else {
    console.log(`Fetching schema.org JSON-LD from: ${SCHEMA_ORG_JSONLD_URL}`);
    rawJson = await fetchUrl(SCHEMA_ORG_JSONLD_URL);
  }

  const schemaData = JSON.parse(rawJson);
  const graph = schemaData["@graph"] || [];
  console.log(`Total entities in schema.org dump: ${graph.length}`);

  const converted = [];
  for (const entity of graph) {
    const out = convertEntity(entity);
    if (out) converted.push(out);
  }

  const classes = converted.filter((e) => e["@type"] === "rdfs:Class");
  const properties = converted.filter((e) => e["@type"] === "rdf:Property");
  console.log(`Classes: ${classes.length}, Properties: ${properties.length}`);

  // Collect enumeration values
  const enumValues = [];
  for (const entity of graph) {
    const out = convertEnumValue(entity);
    if (out) enumValues.push(out);
  }
  console.log(`Enumeration values: ${enumValues.length}`);

  // Build hasPart list for ResourceDescriptor (classes + properties only, not enum values)
  const hasPart = converted.map((e) => ({ "@id": e["@id"] }));

  // Build hasPart list for the vocabulary ResourceDescriptor (enum values)
  const enumHasPart = enumValues.map((e) => ({ "@id": e["@id"] }));

  const rootEntity = {
    "@id": "./",
    "@type": "Dataset",
    name: "Schema.org Vocabulary",
    description:
      "The full schema.org vocabulary expressed as a MASP schema crate. " +
      "Generated from the official schema.org JSON-LD dump.",
    conformsTo: { "@id": "https://w3id.org/ro/profiles/schema/1.0" },
    hasResource: [{ "@id": "#hasSpecializedSchema" }, { "@id": "#hasEnumerationValues" }],
    hasPart: [{ "@id": "schema-documentation.md" }],
  };

  const metadataDescriptor = {
    "@id": "ro-crate-metadata.json",
    "@type": "CreativeWork",
    about: { "@id": "./" },
    conformsTo: { "@id": "https://w3id.org/ro/crate/1.2" },
  };

  const resourceDescriptor = {
    "@id": "#hasSpecializedSchema",
    "@type": "ResourceDescriptor",
    name: "Schema.org Vocabulary Terms",
    hasRole: { "@id": "http://www.w3.org/ns/dx/prof/role/schema" },
    hasPart: hasPart,
  };

  const enumResourceDescriptor = {
    "@id": "#hasEnumerationValues",
    "@type": "ResourceDescriptor",
    name: "Schema.org Enumeration Values",
    hasRole: { "@id": "http://www.w3.org/ns/dx/prof/role/vocabulary" },
    hasPart: enumHasPart,
  };

  const crate = {
    "@context": "https://w3id.org/ro/crate/1.2/context",
    "@graph": [metadataDescriptor, rootEntity, resourceDescriptor, enumResourceDescriptor, ...converted, ...enumValues],
  };

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(crate, null, 2), "utf8");
  console.log(`\nMASP schema crate written to: ${outputPath}`);
  console.log(
    `Total entities in crate: ${crate["@graph"].length} (${classes.length} classes, ${properties.length} properties, ${enumValues.length} enumeration values)`
  );
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
