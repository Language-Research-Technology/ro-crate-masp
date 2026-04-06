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

/** Strip schema: prefix from property names to match MASP convention */
function stripSchemaPrefix(key) {
  if (typeof key === "string" && key.startsWith("schema:")) {
    return key.slice("schema:".length);
  }
  return key;
}

/** Convert a schema.org entity to MASP format */
function convertEntity(entity) {
  const id = entity["@id"];
  if (!id) return null;

  const types = normaliseArray(entity["@type"]);

  // We only want rdfs:Class and rdf:Property entities
  const isClass = types.includes("rdfs:Class");
  const isProperty = types.includes("rdf:Property");
  if (!isClass && !isProperty) return null;

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

  // subClassOf (classes only)
  if (isClass) {
    const subClassOf = normaliseArray(entity["rdfs:subClassOf"]);
    if (subClassOf.length > 0) {
      out["rdfs:subClassOf"] = subClassOf.map((s) =>
        typeof s === "object" ? s["@id"] : s
      );
    }
  }

  // domainIncludes (properties only) — strip schema: prefix per MASP convention
  if (isProperty) {
    const domain =
      normaliseArray(entity["schema:domainIncludes"]).length > 0
        ? normaliseArray(entity["schema:domainIncludes"])
        : normaliseArray(entity["http://schema.org/domainIncludes"]);
    if (domain.length > 0) {
      out["domainIncludes"] = domain.map((d) =>
        typeof d === "object" ? { "@id": d["@id"] } : { "@id": d }
      );
    }

    // rangeIncludes
    const range =
      normaliseArray(entity["schema:rangeIncludes"]).length > 0
        ? normaliseArray(entity["schema:rangeIncludes"])
        : normaliseArray(entity["http://schema.org/rangeIncludes"]);
    if (range.length > 0) {
      out["rangeIncludes"] = range.map((r) =>
        typeof r === "object" ? { "@id": r["@id"] } : { "@id": r }
      );
    }

    // supersededBy (informational)
    const supersededBy =
      normaliseArray(entity["schema:supersededBy"]).length > 0
        ? normaliseArray(entity["schema:supersededBy"])
        : normaliseArray(entity["http://schema.org/supersededBy"]);
    if (supersededBy.length > 0) {
      out["schema:supersededBy"] = supersededBy.map((s) =>
        typeof s === "object" ? { "@id": s["@id"] } : { "@id": s }
      );
    }
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

  // Build hasPart list for ResourceDescriptor
  const hasPart = converted.map((e) => ({ "@id": e["@id"] }));

  const rootEntity = {
    "@id": "./",
    "@type": "Dataset",
    name: "Schema.org Vocabulary",
    description:
      "The full schema.org vocabulary expressed as a MASP schema crate. " +
      "Generated from the official schema.org JSON-LD dump.",
    conformsTo: { "@id": "https://w3id.org/ro/profiles/schema/1.0" },
    hasResource: [{ "@id": "#hasSpecializedSchema" }],
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

  const crate = {
    "@context": "https://w3id.org/ro/crate/1.2/context",
    "@graph": [metadataDescriptor, rootEntity, resourceDescriptor, ...converted],
  };

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(crate, null, 2), "utf8");
  console.log(`\nMAP schema crate written to: ${outputPath}`);
  console.log(
    `Total entities in crate: ${crate["@graph"].length} (${classes.length} classes, ${properties.length} properties)`
  );
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
