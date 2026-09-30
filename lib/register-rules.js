// Housekeeping for profile/schema crates edited as spreadsheets: a rule row
// added in Excel is not a rule until the schema ResourceDescriptor lists it
// in hasPart, which is easy to forget and silently drops the rule from both
// validation and the generated docs.

const SCHEMA_ROLE = "http://www.w3.org/ns/dx/prof/role/schema";
// Entity types MaspValidator.parseRules() treats as rules.
const RULE_TYPES = ["rdfs:Class", "rdf:Property", "ItemList", "PropertyValue", "DefinedTermSet"];

const asArray = (v) => (v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]);
const idOf = (v) => (typeof v === "object" && v !== null ? v["@id"] : v);

function descriptorParts(descriptor) {
  let parts = descriptor.hasPart;
  // Some generated crates persist hasPart as a JSON string.
  if (typeof parts === "string") {
    try {
      parts = JSON.parse(parts);
    } catch (_error) {
      parts = [parts];
    }
  }
  return asArray(parts).map(idOf).filter(Boolean);
}

/**
 * Add every rule entity not listed by any ResourceDescriptor to the root's
 * schema-role ResourceDescriptor. Mutates crateJson; returns the added @ids.
 */
function registerUnlistedRules(crateJson) {
  const graph = crateJson["@graph"] || [];
  const byId = new Map(graph.map((e) => [e["@id"], e]));
  const metadata = byId.get("ro-crate-metadata.json");
  const root = metadata && byId.get(idOf(asArray(metadata.about)[0]));
  if (!root) return [];

  const schemaDescriptor = asArray(root.hasResource)
    .map((r) => byId.get(idOf(r)))
    .find(
      (e) =>
        e &&
        asArray(e["@type"]).includes("ResourceDescriptor") &&
        asArray(e.hasRole).some((role) => idOf(role) === SCHEMA_ROLE)
    );
  if (!schemaDescriptor) return [];

  const listed = new Set(
    graph
      .filter((e) => asArray(e["@type"]).includes("ResourceDescriptor"))
      .flatMap(descriptorParts)
  );
  const added = graph
    .filter((e) => asArray(e["@type"]).some((t) => RULE_TYPES.includes(t)))
    .map((e) => e["@id"])
    .filter((id) => id && !listed.has(id));

  if (added.length > 0) {
    schemaDescriptor.hasPart = [
      ...descriptorParts(schemaDescriptor),
      ...added,
    ].map((id) => ({ "@id": id }));
  }
  return added;
}

module.exports = { registerUnlistedRules };
