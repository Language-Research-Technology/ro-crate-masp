#!/usr/bin/env node
/**
 * generate-mode-file.js
 *
 * Generates a "mini" Crate-O mode file for a profile or schema crate.
 *
 * The mode file contains the parts of a Crate-O mode file that are NOT covered
 * by MASP (the Machine Actionable Profiles and Schemas):
 *   - metadata:      name, description, version, author, license
 *   - conformsToUri: the profile URIs this mode file conforms to
 *   - rootDataset:   the expected @type(s) of the root dataset
 *   - propertyGroups: property-group information for display in the editor
 *   - lookup:        name-authority lookup configuration (Language, Org, etc.)
 *   - enabledClasses: which classes the editor should expose
 *
 * The `classes` section (grammar/schema) is intentionally omitted because it
 * is fully replaced by the MASP schema expressed in the profile crate itself.
 *
 * Usage:
 *   # Strip an existing Crate-O mode file and write the mini version:
 *   node scripts/generate-mode-file.js \
 *     --input  test_data/modes/ldac/comprehensive-ldac.json \
 *     --output profiles/ldac/profile-crate/crate-o-mode.json \
 *     --update-profile profiles/ldac/profile-crate/ro-crate-metadata.json
 *
 *   # Generate a minimal mode file from the profile crate alone:
 *   node scripts/generate-mode-file.js \
 *     --output profiles/ro-crate/profile-crate/crate-o-mode.json \
 *     --update-profile profiles/ro-crate/profile-crate/ro-crate-metadata.json
 */

"use strict";

const fs = require("fs");
const path = require("path");

// Role URI used in profile crate ResourceDescriptors to identify mode files
const MODE_ROLE_URI = "https://purl.org/ro/mode";

// ─── CLI argument parsing ─────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    input: null,
    output: null,
    updateProfile: null,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--input":
        opts.input = args[++i];
        break;
      case "--output":
        opts.output = args[++i];
        break;
      case "--update-profile":
        opts.updateProfile = args[++i];
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
        break;
      default:
        console.error(`Unknown argument: ${args[i]}`);
        printHelp();
        process.exit(1);
    }
  }
  return opts;
}

function printHelp() {
  console.log(`
Usage: node scripts/generate-mode-file.js [options]

Options:
  --input  <path>          Existing Crate-O mode file to strip (optional).
                           When provided, the script preserves all non-schema
                           sections and removes the "classes" section.
  --output <path>          Path to write the resulting mini mode file (required).
  --update-profile <path>  Path to a profile crate ro-crate-metadata.json that
                           should be updated to reference the mode file.
  -h, --help               Show this help message.

Examples:
  # Strip an existing mode file:
  node scripts/generate-mode-file.js \\
    --input  test_data/modes/ldac/comprehensive-ldac.json \\
    --output profiles/ldac/profile-crate/crate-o-mode.json \\
    --update-profile profiles/ldac/profile-crate/ro-crate-metadata.json

  # Generate a minimal mode file from profile metadata:
  node scripts/generate-mode-file.js \\
    --output profiles/ro-crate/profile-crate/crate-o-mode.json \\
    --update-profile profiles/ro-crate/profile-crate/ro-crate-metadata.json
`);
}

// ─── Mode-file generation ─────────────────────────────────────────────────────

/**
 * Build a mini mode file from an existing full Crate-O mode file by removing
 * the `classes` section (which MASP covers).
 *
 * @param {object} sourceMode  Parsed JSON of the existing mode file
 * @returns {object}  The mini mode file (no `classes` key)
 */
function stripClassesFromMode(sourceMode) {
  const mini = {};
  for (const key of Object.keys(sourceMode)) {
    if (key !== "classes") {
      mini[key] = sourceMode[key];
    }
  }
  return mini;
}

/**
 * Build a minimal mode file from a profile crate's metadata alone (used when
 * no existing Crate-O mode file is available).
 *
 * @param {object} profileCrateJson  Parsed ro-crate-metadata.json
 * @returns {object}  A minimal mode file object
 */
function buildMinimalModeFromProfile(profileCrateJson) {
  const graph = profileCrateJson["@graph"] || [];

  // Find the root Dataset / Profile entity
  let rootEntity = null;
  for (const entity of graph) {
    const id = entity["@id"] || "";
    const type = entity["@type"];
    const types = Array.isArray(type) ? type : type ? [type] : [];
    if (
      types.includes("Profile") ||
      (types.includes("Dataset") && (id === "./" || id.startsWith("http")))
    ) {
      rootEntity = entity;
      break;
    }
  }

  // Resolve author name
  let authorName = "";
  if (rootEntity) {
    const authorRef = rootEntity["author"];
    if (authorRef) {
      const authorId = Array.isArray(authorRef)
        ? authorRef[0]["@id"]
        : authorRef["@id"];
      const authorEntity = graph.find((e) => e["@id"] === authorId);
      if (authorEntity) {
        authorName = authorEntity["name"] || authorName;
      }
    }
  }

  // Collect conformsTo URIs from the metadata descriptor
  const metadataDescriptor = graph.find(
    (e) => e["@id"] === "ro-crate-metadata.json"
  );
  const conformsToUri = [];
  if (rootEntity) {
    const rootId = rootEntity["@id"];
    if (rootId && rootId !== "./") {
      conformsToUri.push(rootId);
    }
  }

  // Determine root dataset types from root entity
  const rootType = rootEntity ? rootEntity["@type"] : null;
  const rootTypes = Array.isArray(rootType)
    ? rootType
    : rootType
    ? [rootType]
    : ["Dataset"];
  // Filter out generic 'Profile' label for rootDataset type list
  const datasetTypes = rootTypes.filter(
    (t) => t !== "Profile" && t !== "Thing"
  );

  return {
    metadata: {
      name: rootEntity ? rootEntity["name"] || "" : "",
      description: rootEntity ? rootEntity["description"] || "" : "",
      version: rootEntity ? rootEntity["version"] || "0.1" : "0.1",
      author: authorName,
      license: rootEntity ? rootEntity["license"] || "" : "",
    },
    conformsToUri: conformsToUri.length > 0 ? conformsToUri : undefined,
    rootDataset: {
      type: datasetTypes.length > 0 ? datasetTypes : ["Dataset"],
    },
    propertyGroups: [],
    lookup: {},
    enabledClasses: [],
  };
}

// ─── Profile crate update ────────────────────────────────────────────────────

/**
 * Update a profile crate's ro-crate-metadata.json to reference a mode file
 * as a ResourceDescriptor with role = MODE_ROLE_URI.
 *
 * If the mode file is already referenced nothing is changed.
 *
 * @param {string} profileCratePath   Absolute/relative path to the profile crate JSON
 * @param {string} modeFilePath       Path where the mode file will be written
 */
function updateProfileCrate(profileCratePath, modeFilePath) {
  const profileDir = path.dirname(path.resolve(profileCratePath));
  const modeFileAbs = path.resolve(modeFilePath);
  const modeFileRelative = path.relative(profileDir, modeFileAbs);

  const raw = fs.readFileSync(profileCratePath, "utf8");
  const crate = JSON.parse(raw);
  const graph = crate["@graph"] || [];

  // Check if a mode file ResourceDescriptor already exists
  const alreadyReferenced = graph.some((entity) => {
    const role = entity["hasRole"];
    const roles = Array.isArray(role) ? role : role ? [role] : [];
    return roles.some((r) => r["@id"] === MODE_ROLE_URI);
  });

  if (alreadyReferenced) {
    console.log(
      `  Mode file already referenced in ${profileCratePath}, skipping.`
    );
    return;
  }

  // Find the root Dataset entity (the profile itself)
  let rootEntity = null;
  for (const entity of graph) {
    const type = entity["@type"];
    const types = Array.isArray(type) ? type : type ? [type] : [];
    const id = entity["@id"] || "";
    if (
      types.includes("Profile") ||
      (types.includes("Dataset") && (id === "./" || id.startsWith("http")))
    ) {
      rootEntity = entity;
      break;
    }
  }

  // Create the mode file entity (a File node)
  const modeFileEntity = {
    "@id": modeFileRelative,
    "@type": "File",
    name: "Crate-O Editor Mode File",
    encodingFormat: "application/json",
    description:
      "Mini Crate-O mode file for this profile (metadata, property groups, lookup and enabled classes — the schema/grammar is provided by the MASP profile crate itself).",
  };

  // Create the ResourceDescriptor
  const descriptorId = "#hasEditorMode";
  const modeDescriptor = {
    "@id": descriptorId,
    "@type": "ResourceDescriptor",
    name: "Crate-O Editor Mode",
    hasRole: { "@id": MODE_ROLE_URI },
    hasArtifact: { "@id": modeFileRelative },
  };

  // Create the role entity (if not already present)
  const roleEntityExists = graph.some((e) => e["@id"] === MODE_ROLE_URI);
  const roleEntity = {
    "@id": MODE_ROLE_URI,
    "@type": "DefinedTerm",
    name: "Editor Mode",
    description:
      "Role indicating a resource is an editor configuration mode file.",
  };

  // Add mode file entity and descriptor to graph
  graph.push(modeFileEntity);
  graph.push(modeDescriptor);
  if (!roleEntityExists) {
    graph.push(roleEntity);
  }

  // Add the descriptor to the root entity's hasResource list
  if (rootEntity) {
    const hasResource = rootEntity["hasResource"];
    if (Array.isArray(hasResource)) {
      hasResource.push({ "@id": descriptorId });
    } else if (hasResource) {
      rootEntity["hasResource"] = [hasResource, { "@id": descriptorId }];
    } else {
      rootEntity["hasResource"] = [{ "@id": descriptorId }];
    }
  }

  fs.writeFileSync(profileCratePath, JSON.stringify(crate, null, 2) + "\n");
  console.log(`  Updated profile crate: ${profileCratePath}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const opts = parseArgs();

  if (!opts.output) {
    console.error("Error: --output is required");
    printHelp();
    process.exit(1);
  }

  const outputPath = opts.output;
  const outputDir = path.dirname(path.resolve(outputPath));

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let miniMode;

  if (opts.input) {
    // Strip existing mode file
    console.log(`Reading existing mode file: ${opts.input}`);
    const sourceRaw = fs.readFileSync(opts.input, "utf8");
    const sourceMode = JSON.parse(sourceRaw);
    miniMode = stripClassesFromMode(sourceMode);
    const removed = "classes" in sourceMode;
    console.log(
      removed
        ? `  Removed "classes" section (${Object.keys(sourceMode.classes || {}).length} entries)`
        : `  No "classes" section found in source mode file`
    );
  } else if (opts.updateProfile) {
    // Generate from profile crate
    console.log(`Generating minimal mode file from: ${opts.updateProfile}`);
    const profileRaw = fs.readFileSync(opts.updateProfile, "utf8");
    const profileJson = JSON.parse(profileRaw);
    miniMode = buildMinimalModeFromProfile(profileJson);
  } else {
    console.error(
      "Error: either --input or --update-profile must be specified"
    );
    printHelp();
    process.exit(1);
  }

  // Remove undefined values (conformsToUri may be undefined for ./ rooted crates)
  if (miniMode.conformsToUri === undefined) {
    delete miniMode.conformsToUri;
  }

  // Write the mini mode file
  fs.writeFileSync(outputPath, JSON.stringify(miniMode, null, 2) + "\n");
  console.log(`Written mini mode file: ${outputPath}`);

  // Update the profile crate if requested
  if (opts.updateProfile) {
    updateProfileCrate(opts.updateProfile, outputPath);
  }
}

// ─── Exports (for programmatic use / tests) ───────────────────────────────────

module.exports = {
  MODE_ROLE_URI,
  stripClassesFromMode,
  buildMinimalModeFromProfile,
  updateProfileCrate,
};

// Run as CLI when executed directly
if (require.main === module) {
  main();
}
