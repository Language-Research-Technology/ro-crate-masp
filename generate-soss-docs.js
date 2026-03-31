#!/usr/bin/env node
/**
 * Generate documentation from a SOSS+ profile crate
 *
 * This script loads a SOSS+ profile crate and creates a data structure
 * that can be used by a template to generate documentation.
 */

const { ROCrate } = require("ro-crate");
const fs = require("fs");
const path = require("path");
const { SossValidator } = require("./lib/soss-validator");
const { execSync } = require("child_process");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt("default", { html: true });

async function main() {
// Parse command line arguments
const profilePath =
  process.argv[2] ||
  path.join(
    __dirname,
    "profiles",
    "ro-crate",
    "profile-crate",
    "ro-crate-metadata.json"
  );
const templatePath =
  process.argv[3] ||
  path.join(__dirname, "profiles", "ro-crate", "profile-text.md");
// Save the output in the same directory as the profile crate
const profileDir = path.dirname(profilePath);
const outputPath =
  process.argv[4] || path.join(profileDir, "profile-documentation.md");


function clean(str) {
  // Some text has line ends in that break the template rendering so normalize all whitespace to be jsut spaces
  return str.toString().replace(/\s+/g, " ");
}

function getAnchorId(id) {
  if (!id) return '';
  // For fragment identifiers (#foo), strip the #
  if (id.startsWith('#')) return id.slice(1);
  // For full URIs with fragments (https://...#foo), use the fragment
  const hashIdx = id.lastIndexOf('#');
  if (hashIdx !== -1) return id.slice(hashIdx + 1);
  return encodeURIComponent(id);
}

try {
  const profileData = fs.readFileSync(profilePath, "utf8");
  const profileJson = JSON.parse(profileData);
  const profileCrate = new ROCrate(profileJson, { array: true, link: true });

  const validator = new SossValidator(profileCrate);

  // Find all the rules in the profile crate -- TODO we will use this in this script rather than parsing them again
  validator.parseRules();

  // Create rules data structure for use by the t    semplate
  const rules = { 
    objects: {},
    all: "", // Will contain all classes summary
    definedTermSets: {}, // Will contain DefinedTermSet documentation
    itemLists: {}, // Will contain item lists documentation
    rootDataEntity: ""  
  };

  // Index entities by @type using native RO-Crate methods
  const entitiesByType = {};
  for (let entity of profileCrate.entities()) {
    for (let type of entity["@type"] || []) {
      if (!entitiesByType[type]) {
        entitiesByType[type] = [];
      }
      entitiesByType[type].push(entity);
    }
  }



  // Find the Root Data Entity class
  // TODO this is a bad HACK that should be fixed later
  //  -- need to look for the ro-crate-metadata.json metadata descriptor class and find root(s) from there
  const rootDataEntityClassRule = validator.rules.rootClassRule


  if (rootDataEntityClassRule) {
    console.log(`Found Root Data Entity class rule: ${rootDataEntityClassRule.id}`);
    // TODO: Change all the code in this script to use Rules like this instead of dealing with entities directly
    const rootDataEntityClass = rootDataEntityClassRule.entity;
    const rootTypes = rootDataEntityClass["prov:specializationOf"] || [];
    const rootTypesArray = Array.isArray(rootTypes) ? rootTypes : [rootTypes];
    const rootTypesIds = rootTypesArray.map((t) =>
      typeof t === "object" ? t["@id"] : t
    );


    // Add additional requirements
    const rootProps = rootDataEntityClass.propertyRules || [];
    if (rootProps.length > 0) {
      rules.rootDataEntity += `- MUST include the following properties:\n`;

      rootProps.forEach((prop) => {
        const propName = prop["name"] || prop["rdfs:label"] || prop["@id"];
        const isRequired =
          prop["sh:minCount"] && parseInt(prop["sh:minCount"]) > 0;

        if (isRequired) {
          rules.rootDataEntity += `  * ${clean(propName)}\n`;
        }
      });
    }
  }

  // Generate Examples
  let exampleSummary = "";
  const exampleLinks = {};
  const examplesOfType = {};
  let exampleCount = 0;

  // TODO refactor to link from the root data entity hasResource.  

  for (let resources of entitiesByType["ResourceDescriptor"] || []) {
    if (
      resources?.["hasRole"]?.some(
        (role) => role["@id"] === "http://www.w3.org/ns/dx/prof/role/example"
      )
    ) {

      const exampleId = resources["@id"];
      console.log(`\n\nProcessing example resource: ${exampleId}`);
      const exampleName = `Example-${++exampleCount}: ${resources["name"] || exampleId}`;
      const exampleAnchorId = getAnchorId(exampleId);
      exampleSummary += `<a id="${exampleAnchorId}"></a>\n\n`;
      exampleSummary += `## ${exampleName}\n\n`;
      exampleLinks[exampleId] = exampleAnchorId;

      for (let exampleArtifact of resources["hasArtifact"] || []) {
        console.log(`Processing example artifact: ${exampleArtifact["@id"]}`);  
        const exampleArtifactName = `Artifact: ${exampleArtifact["name"] || exampleArtifact["@id"]}`;
        const exampleArtifactAnchorId = getAnchorId(exampleArtifact["@id"]);
        exampleSummary += `\n### <a id="${exampleArtifactAnchorId}"></a> ${exampleArtifactName}\n\n`;
        exampleSummary += `<pre>\n ${JSON.stringify(
          exampleArtifact,
          null,
          2
        )}\n</pre>\n\n`;
        for (let partEntity of exampleArtifact?.hasPart || []) {
          console.log(`Processing example artifact part: ${partEntity["@id"]}`);
          const partId = partEntity["@id"];
          if (partId) {
            const partName = `Example-${exampleCount}: ${partId}`;
            const partAnchorId = getAnchorId(partId);
            exampleSummary += `\n#### <a id="${partAnchorId}"></a>${partName}\n\n`;
            exampleSummary += `<pre>\n ${JSON.stringify(
              partEntity,
              null,
              2
            )}\n</pre>\n\n`;
            for (let cRule of Object.values(validator.rules.classes)) {
              if (cRule.validateEntityTypes(partEntity)) {
                const classURI = cRule.id;
                console.log(`Found matching class for part ${partName}: ${classURI}`);

                if (!examplesOfType[classURI]) {
                  examplesOfType[classURI] = `#### Examples\n`;
                }
                examplesOfType[classURI]  += `-  [${partName}](#${partAnchorId})\n\n`;;
              }
            }
          }
        }
      }
    }
  }
  rules.examples = exampleSummary || "No examples defined.\n\n";

  console.log(examplesOfType)
  // Generate documentation for each DefinedTermSet
  let allDefinedTermSets = "## Defined Term Sets\n\n";

  (entitiesByType["DefinedTermSet"] || []).forEach((termSet) => {
    const termSetId = termSet["@id"];
    const termSetName = `Defined Term Set: ${
      termSet["name"] || termSet["rdfs:label"] || termSetId
    }`;
    const termSetAnchorId = getAnchorId(termSetId);
    const termSetDesc = termSet["description"] || termSet["rdfs:comment"] || "";

    let termSetSummary = `### <a id="${termSetAnchorId}"></a>${clean(
      termSetName
    )}\n\n`;
    termSetSummary += `ID: ${clean(termSetId)}\n\n`;
    termSetSummary += `${clean(termSetDesc)}\n\n`;
    // const inRangeOf = termSet['@reverse'].rangeIncludes;
    // for (let r of inRangeOf) {
    //   console.log(r['@id'])
    //   console.log(r['rdfs:label']);
    // }

    // Add terms table if there are terms in this set
    const terms = termSet["@reverse"]?.["inDefinedTermSet"] || [];
    if (terms.length > 0) {
      // Sort terms alphabetically by name
      terms.sort((a, b) => {
        const aName = String(a["name"] || a["rdfs:label"] || a["@id"] || "");
        const bName = String(b["name"] || b["rdfs:label"] || b["@id"] || "");
        return aName.localeCompare(bName);
      });

      termSetSummary += `| Term | Description |\n`;
      termSetSummary += `| ---- | ----------- |\n`;

      for (const t of terms) {
        const termId = t["@id"];
        const termName = t["name"] || t["rdfs:label"] || t["@id"];
        const termAnchorId = getAnchorId(termId);
        const termBaseId = `https://w3id.org/ldac/terms#${t?.name}`;
        const termLink = termBaseId.match(/^http(s)?:/i)
          ? `<a id="${termAnchorId}" href="${clean(termBaseId)}" target="_blank" rel="noopener">${clean(termName)}</a>`
          : `<a id="${termAnchorId}">${clean(termName)}</a>`;
        const termDesc = t["description"] || t["rdfs:comment"] || "";
        termSetSummary += `| ${termLink} | ${clean(termDesc)} |\n`;
      }
    } else {
      termSetSummary += `*No terms defined for this term set*\n\n`;
    }

    termSetSummary += `\n`;

    // Add DefinedTermSet to rules structure
    rules[termSetId] = termSetSummary;
    rules.definedTermSets[termSetId] = termSetSummary;
    allDefinedTermSets += termSetSummary;
  });

  // Add all defined term sets summary to rules
  rules.allDefinedTermSets = allDefinedTermSets;

  // Generate documentation for each ItemList
  let allItemLists = "## Item Lists\n\n";

  (entitiesByType["ItemList"] || []).forEach((list) => {
    const listId = list["@id"];
    const listName = `Item List: ${list["name"] || listId}`;
    const listDescription = list["description"] || "";
    const listAnchorId = getAnchorId(listId);
    let listSummary = `### <a id="${listAnchorId}"></a>${clean(
      listName
    )}\n\n`;
    listSummary += `${clean(listDescription)}\n\n`;

    // Add terms table if there are terms in this set
    const items = list.itemListElement || [];
    if (items.length > 0) {
      // Sort terms alphabetically by name
      items.sort((a, b) => {
        const aName = String(a["name"] || a["@id"] || "");
        const bName = String(b["name"] || b["@id"] || "");
        return aName.localeCompare(bName);
      });

      // For items within the list:
      items.forEach((item) => {
        const itemId = item["@id"];
        const itemAnchorId = getAnchorId(itemId);
        const itemName = item["name"] || item["@id"];
        const ItemDesc = item["description"] || "";
        listSummary += `-  [${clean(itemName)}](#${itemAnchorId})\n `;
      });

      listSummary += "<hr/>\n\n";

      items.forEach((item) => {
        const itemId = item["@id"];
        const itemAnchorId = getAnchorId(itemId);
        listSummary += `### <a id="${itemAnchorId}"></a><pre>\n ${JSON.stringify(
          item,
          null,
          2
        )}\n</pre>\n\n`;
        listSummary += `ID: ${clean(itemId)}\n\n`;
      });
    } else {
      listSummary += `*No terms defined for this term set*\n\n`;
    }

    // Add DefinedTermSet to rules structure
    rules[listId] = listSummary;
    rules.itemLists[listId] = listSummary;
    allItemLists += listSummary;
  });

  // Add all defined term sets summary to rules
  rules.allItemLists = allItemLists;

  // Generate class documentation
  let allClasses =
    "## Types of entities (specializations of Classes) and expected Properties\n\n";

  // TODO: Chage this to use validator.rules.classes
  entitiesByType["rdfs:Class"].forEach((classRule) => {
    const classId = classRule["@id"];
    const classURI = classId;
    const className = `Class: ${
      classRule["name"] || classRule["rdfs:label"] || classId
    }`;
    const classAnchorId = getAnchorId(classId);

    const classDesc =
      classRule["description"] || classRule["rdfs:comment"] || "";
    const specialized = classRule["prov:specializationOf"] || [];
    var classSummary = `\n### <a id="${classAnchorId}"></a> ${clean(className)}\n\n`;

    classSummary += `${clean(classDesc)}\n\n`;

    const min =
      classRule["sh:minCount"] !== undefined
        ? String(classRule["sh:minCount"])
        : undefined;
    const max =
      classRule["sh:maxCount"] !== undefined
        ? String(classRule["sh:maxCount"])
        : undefined;

    if (min === undefined) {
      classSummary += `Instances of this type MAY be present in the crate.\n\n`;
    } else if (min === "0") {
      classSummary += `Instances of this type SHOULD be present in the crate.\n\n`;
    } else {
      classSummary += `At least ${clean(
        min
      )} instances of this type MUST be present in the crate.\n\n`;
    }
    if (max !== undefined && max > 0) {
      classSummary += ` A maximum of ${clean(
        max
      )} instances of this type  MAY be present in the crate.\n\n`;
    }

    classSummary += `| Min Count | Max Count |\n`;
    classSummary += `| --------- | --------- |\n`;
    classSummary += `| ${min !== undefined ? min : "N/A"} | ${
      max !== undefined ? max : "N/A"
    } |\n\n`;

    classSummary += `| Property | Required | Description | Range | Value |\n`;
    classSummary += `| -------- | -------- | ----------- | ----- | ----- |\n`;

    if (specialized) {
      const specializedArray = Array.isArray(specialized)
        ? specialized
        : [specialized];
      const specializedStr = specializedArray
        .map((s) => (typeof s === "object" ? s["@id"] : s))
        .join(", ");
      classSummary += `| @type | Yes |  |  | ${clean(specializedStr)} |\n`;
    }

    // Get all properties for this class (no inheritence support ATM)
    const props = classRule["@reverse"].domainIncludes;

    if (props.length > 0) {
      // Sort properties: required first, then alphabetically
      props.sort((a, b) => {
        const aRequired = a["sh:minCount"] && parseInt(a["sh:minCount"]) > 0;
        const bRequired = b["sh:minCount"] && parseInt(b["sh:minCount"]) > 0;

        if (aRequired && !bRequired) return -1;
        if (!aRequired && bRequired) return 1;

        const aName = String(a["name"] || a["rdfs:label"] || a["@id"] || "");
        const bName = String(b["name"] || b["rdfs:label"] || b["@id"] || "");

        return aName.localeCompare(bName);
      });

      props.forEach((prop) => {
        const propName = prop["name"] || prop["rdfs:label"] || prop["@id"];
        const anchorGithubId = getAnchorId(prop["@id"]);
        // Make a link to the 'main' definition of the property
        const propBaseId = prop?.["prov:specializationOf"]?.[0]?.["@id"];
        const link =
          propBaseId && propBaseId.match(/^http(s)?:/i)
            ? ` <a href="#${anchorGithubId}" target="_blank" rel="noopener">ⓘ</a>`
            : "";
        const isRequired =
          prop["sh:minCount"] && parseInt(prop["sh:minCount"]) > 0
            ? "Yes"
            : "No";
        const propDesc = prop["description"] || prop["rdfs:comment"] || "";

        const rangesArray = prop["rangeIncludes"] || [];

        // Create links to range classes that are defined in the profile
        const rangeLinks = rangesArray
          .map((r) => {
            const rangeId = typeof r === "object" ? r["@id"] : r;
            if (!rangeId) return "Text"; // Default to Text if no range is specified
            const rangeDefiniton = profileCrate.getEntity(rangeId);
            if (rangeDefiniton) {
              const rangeName =
                rangeDefiniton["name"] ||
                rangeDefiniton["rdfs:label"] ||
                rangeId;
              return `<a href="#${getAnchorId(rangeId)}">${clean(rangeName)}</a>`;
            }
            return `${clean(rangeId)}`;
          })
          .join(", ");

        // Get fixed value if specified
        const fixedValue = prop["schema:value"] || prop["value"] || "";

        classSummary += `| <a href="#${anchorGithubId}">${clean(
          propName
        )}${clean(link)}</a> | ${clean(isRequired)} | ${clean(
          propDesc
        )} | ${clean(rangeLinks)} | ${clean(fixedValue)} |\n`;
      });
    } else {
      classSummary += `*No properties defined for this class*\n\n`;
    }

    classSummary += `\n`;

    if (examplesOfType[classURI]) {
      classSummary += `### Examples of Type\n${examplesOfType[classURI]}\n`;
    }

    // Add class to rules structure
    rules[className] = classSummary;
    allClasses += classSummary;
  });

  // Store all classes summary
  rules.all = allClasses;

  // Add a properties table
  let propsSummary = "## All Properties\n\n";

  const properties = (entitiesByType["rdf:Property"] || [])
    .slice()
    .sort((a, b) => {
      const aName = String(a["name"] || a["rdfs:label"] || a["@id"] || "");
      const bName = String(b["name"] || b["rdfs:label"] || b["@id"] || "");
      return aName.localeCompare(bName);
    });

  for (let p of properties) {
    const propName = `Property: ${p["name"] || p["rdfs:label"] || p["@id"]}`;
    const anchorGithubId = getAnchorId(p["@id"]);

    const propDesc = p["description"] || p["rdfs:comment"] || ""; // Add this line

    // Make a link to the 'main' definition of the property
    const propBaseId = p?.["prov:specializationOf"]?.[0]?.["@id"];
    const link =
      propBaseId && propBaseId.match(/^http(s)?:/i)
        ? ` <a href="${clean(propBaseId)}" target="_blank" rel="noopener">ⓘ</a>`
        : "";

    // Create range links
    const rangesArray = p["rangeIncludes"] || [];
    const rangeLinks = rangesArray
      .map((r) => {
        const rangeId = typeof r === "object" ? r["@id"] : r;
        if (!rangeId) return "Text";
        const rangeDefinition = profileCrate.getEntity(rangeId);
        if (rangeDefinition) {
          const rangeName =
            rangeDefinition["name"] || rangeDefinition["rdfs:label"] || rangeId;
          return `<a href="#${getAnchorId(rangeId)}">${clean(rangeName)}</a>`;
        }
        return `${clean(rangeId)}`;
      })
      .join(", ");

    // Update domain links:
    const propDomains = (p.domainIncludes || [])
      .map((domain) => {
        const domainId = typeof domain === "object" ? domain["@id"] : domain;
        if (!domainId) return "";
        const domainDef = profileCrate.getEntity(domainId);
        if (domainDef) {
          const domainName =
            domainDef["name"] || domainDef["rdfs:label"] || domainId;
          return `<a href="#${getAnchorId(domainId)}">${clean(domainName)}</a>`;
        }
        return clean(domainId);
      })
      .join(", ");

    propsSummary += `### <a id="${anchorGithubId}"></a> ${clean(
      propName
    )}${clean(link)}\n\n`;
    propsSummary += `ID: ${clean(p["@id"])}\n\n`;
    propsSummary += `| Description | Range | Occurs in Domain(s) |\n`;
    propsSummary += `| ----------- | ----------- | ----------- |\n`;
    propsSummary += `| ${clean(propDesc)} | ${clean(
      rangeLinks
    )} | ${propDomains} |\n`;
  }
  rules.all += propsSummary;

  // Add provenance information
  // Get the current Git branch by running git command
  let gitBranch = "main"; // Default to main
  try {
    const gitCommand = "git rev-parse --abbrev-ref HEAD";
    gitBranch = execSync(gitCommand, {
      cwd: __dirname,
      encoding: "utf8",
    }).trim();
    // Handle detached HEAD state
    if (gitBranch === "HEAD") {
      // Try to get the branch from CI environment variables
      gitBranch =
        process.env.GITHUB_REF_NAME ||
        process.env.CI_COMMIT_REF_NAME ||
        process.env.BRANCH_NAME ||
        "main";
    }
  } catch (error) {
    console.warn(`Warning: Could not determine Git branch: ${error.message}`);
  }

  let repoBaseUrl = "";
  try {
    const remoteUrl = execSync("git remote get-url origin", {
      cwd: __dirname,
      encoding: "utf8",
    }).trim();
    repoBaseUrl = remoteUrl
      .replace(/^git@github\.com:/, "https://github.com/")
      .replace(/\.git$/, "");
  } catch (error) {
    console.warn(`Warning: Could not determine git remote URL: ${error.message}`);
  }
  const repoUrl = `${repoBaseUrl}/blob/${clean(gitBranch)}`;
  const crateTreeUrl = repoBaseUrl
    ? `${repoBaseUrl}/tree/${clean(gitBranch)}/${path.relative(__dirname, profileDir)}`
    : "";
  const scriptPath = path.relative(
    __dirname,
    path.resolve(__dirname, "generate-soss-docs.js")
  );
  const templateRelPath = path.relative(__dirname, templatePath);
  const profileRelPath = path.relative(__dirname, profilePath);

  // Add examples



  rules.provenance =
    `This document was compiled using [generate-soss-docs.js](${clean(
      repoUrl
    )}/${clean(scriptPath)}), ` +
    `based on [${clean(templateRelPath)}](${clean(repoUrl)}/${clean(
      templateRelPath
    )}) ` +
    `using a SoSS+ Schema defined in [${clean(profileRelPath)}](${clean(
      repoUrl
    )}/${clean(profileRelPath)}).`;

  // Read the template file
  console.log(`Reading template from: ${clean(templatePath)}`);
  const template = fs.readFileSync(templatePath, "utf8");

  // Simple template engine - add support for including definedTermSets in the template
  const output = template.replace(/\${rules\.([^}]+)}/g, (match, key) => {
    // If the key starts with '#', look it up directly
    if (key.startsWith("#")) {
      return rules[key] || "";
    }
    // Special case for definedTermSets
    if (key === "allDefinedTermSets") {
      return rules.allDefinedTermSets || "";
    }
    // Special case for itemLists
    if (key === "allItemLists") {
      return rules.allItemLists || "";
    }

    // Otherwise, return the property from rules
    return rules[key] || "";
  });

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the markdown output
  fs.writeFileSync(outputPath, output, "utf8");
  console.log(`Documentation generated successfully: ${clean(outputPath)}`);

  // Write index.html — CommonMark HTML version with FAIR Signposting link header
  const htmlBodyRaw = md.render(output);
  // Convert markdown-it's <pre><code class="language-mermaid">...</code></pre>
  // into <pre class="mermaid">...</pre> so Mermaid JS can render them.
  const htmlBody = htmlBodyRaw.replace(
    /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
    (_, diagram) => `<pre class="mermaid">${diagram}</pre>`
  );
  const profileName = profileCrate.rootDataset?.name || "Profile Documentation";
  const htmlOutput = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profileName}</title>
  <link rel="describedby" href="ro-crate-metadata.json" type="application/ld+json">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <style>
    body { padding: 2rem; }
    table { width: 100%; margin-bottom: 1rem; }
    th, td { padding: 0.5rem; border: 1px solid #dee2e6; }
    th { background-color: #f8f9fa; }
    pre { background: #f8f9fa; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    pre.mermaid { background: none; padding: 0; }
    code { background: #f8f9fa; padding: 0.2em 0.4em; border-radius: 3px; }
  </style>
</head>
<body>
  <div class="container-fluid">
    <p>
      <a href="ro-crate-metadata.json">⬇️ Download profile metadata (JSON-LD)</a>
      ${crateTreeUrl ? `&nbsp;|&nbsp; <a href="${crateTreeUrl}">📁 View whole crate on GitHub</a>` : ""}
    </p>
    ${htmlBody}
  </div>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true });
  </script>
</body>
</html>`;
  const htmlOutputPath = path.join(outputDir, "index.html");
  fs.writeFileSync(htmlOutputPath, htmlOutput, "utf8");
  console.log(`HTML documentation generated successfully: ${clean(htmlOutputPath)}`);
} catch (error) {
  console.error(`Error generating documentation: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
}
}

main().catch((err) => {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);
  process.exit(1);
});