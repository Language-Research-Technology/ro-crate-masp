#!/usr/bin/env node
/**
 * Generate documentation from a MASP profile/schema crate
 *
 * This script loads a MASP profile/schema crate and creates a data structure
 * that can be used by a template to generate documentation.
 */

const { ROCrate } = require("ro-crate");
const fs = require("fs");
const path = require("path");
const { MaspValidator } = require("./lib/masp-validator");
const { execSync } = require("child_process");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt("default", { html: true });

async function main() {
// Parse command line arguments — strip flags before positional args
const rawArgs = process.argv.slice(2);
const multiPage = rawArgs.includes("--multi-page");
const positionalArgs = rawArgs.filter((a) => !a.startsWith("--"));

const profilePath =
  positionalArgs[0] ||
  path.join(
    __dirname,
    "profiles",
    "ro-crate",
    "profile-crate",
    "ro-crate-metadata.json"
  );
const templatePath =
  positionalArgs[1] ||
  path.join(__dirname, "profiles", "ro-crate", "profile-text.md");
// Save the output in the same directory as the profile crate
const profileDir = path.dirname(profilePath);
const outputPath =
  positionalArgs[2] || path.join(profileDir, "profile-documentation.md");


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

  const validator = new MaspValidator(profileCrate);

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

  function setRuleDirect(key, value) {
    if (key === undefined || key === null) return;
    const k = String(key).trim();
    if (!k) return;
    rules[k] = value;
  }

  // Register aliases so templates can use either IDs/fragments or friendly names
  // (for example ${rules.RepositoryCollection} and ${rules.#class_RepositoryCollection}).
  function setRuleAliases(value, aliases) {
    const candidateKeys = new Set();

    for (const alias of aliases) {
      if (alias === undefined || alias === null) continue;
      const raw = String(alias).trim();
      if (!raw) continue;
      candidateKeys.add(raw);

      if (raw.startsWith("#")) {
        candidateKeys.add(raw.slice(1));
      } else {
        candidateKeys.add(`#${raw}`);
      }

      const anchor = getAnchorId(raw);
      if (anchor) {
        candidateKeys.add(anchor);
        candidateKeys.add(`#${anchor}`);
      }

      if (raw.startsWith("Class: ")) {
        candidateKeys.add(raw.slice("Class: ".length).trim());
      }
      if (raw.startsWith("Property: ")) {
        candidateKeys.add(raw.slice("Property: ".length).trim());
      }
      if (raw.startsWith("Defined Term Set: ")) {
        candidateKeys.add(raw.slice("Defined Term Set: ".length).trim());
      }
      if (raw.startsWith("Item List: ")) {
        candidateKeys.add(raw.slice("Item List: ".length).trim());
      }
    }

    for (const key of candidateKeys) {
      if (!(key in rules)) {
        rules[key] = value;
      }
    }
  }

  function resolveRuleValue(rulesMap, key) {
    const lookupKey = String(key || "").trim();
    if (!lookupKey) return "";

    const candidates = [];
    const seen = new Set();
    const push = (k) => {
      if (!k || seen.has(k)) return;
      seen.add(k);
      candidates.push(k);
    };

    push(lookupKey);
    if (lookupKey.startsWith("#")) {
      push(lookupKey.slice(1));
    } else {
      push(`#${lookupKey}`);
    }

    const anchor = getAnchorId(lookupKey);
    if (anchor) {
      push(anchor);
      push(`#${anchor}`);
    }

    for (const candidate of candidates) {
      if (Object.prototype.hasOwnProperty.call(rulesMap, candidate)) {
        return rulesMap[candidate];
      }
    }

    return "";
  }

  function renderTemplateWithRules(templateSource, rulesMap) {
    return templateSource.replace(/\$\{rules\.([^}]+)\}/g, (match, key) =>
      resolveRuleValue(rulesMap, key)
    );
  }

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
        // Use the term's own @id as the link if it's an absolute URL, otherwise no href
        const termBaseId = termId && termId.match(/^https?:/i) ? termId : null;
        const termLink = termBaseId
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
    setRuleDirect(termSetId, termSetSummary);
    setRuleAliases(termSetSummary, [
      termSetId,
      termSet["name"],
      termSet["rdfs:label"],
      termSetName,
      termSetAnchorId,
    ]);
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
    setRuleDirect(listId, listSummary);
    setRuleAliases(listSummary, [
      listId,
      list["name"],
      list["rdfs:label"],
      listName,
      listAnchorId,
    ]);
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
    const classLabel = classRule["name"] || classRule["rdfs:label"] || classId;
    const className = `Class: ${classLabel}`;
    const classAnchorId = getAnchorId(classId);

    const classDesc =
      classRule["description"] || classRule["rdfs:comment"] || "";
    const specialized = classRule["prov:specializationOf"] || [];
    const classInternalId = classId.startsWith("#")
      ? ` <small style="color:#aaa;font-weight:normal">${clean(classId)}</small>`
      : "";
    var classSummary = `\n### <a id="${classAnchorId}"></a> ${clean(className)}${classInternalId}\n\n`;

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

        const propInternalId = prop["@id"].startsWith("#")
          ? ` <small style="color:#aaa;font-weight:normal">${clean(prop["@id"])}</small>`
          : "";
        classSummary += `| <a href="#${anchorGithubId}">${clean(
          propName
        )}${clean(link)}</a>${propInternalId} | ${clean(isRequired)} | ${clean(
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
    setRuleDirect(className, classSummary);
    setRuleAliases(classSummary, [className, classLabel, classId, classAnchorId]);
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

    const propHeadingId = p["@id"].startsWith("#")
      ? ` <small style="color:#aaa;font-weight:normal">${clean(p["@id"])}</small>`
      : "";
    let propSummary = `### <a id="${anchorGithubId}"></a> ${clean(
      propName
    )}${clean(link)}${propHeadingId}\n\n`;
    propSummary += `| Description | Range | Occurs in Domain(s) |\n`;
    propSummary += `| ----------- | ----------- | ----------- |\n`;
    propSummary += `| ${clean(propDesc)} | ${clean(
      rangeLinks
    )} | ${propDomains} |\n`;

    const propLabel = p["name"] || p["rdfs:label"] || p["@id"];
    setRuleDirect(p["@id"], propSummary);
    setRuleAliases(propSummary, [propName, propLabel, anchorGithubId]);
    propsSummary += propSummary;
  }
  rules.all += propsSummary;

  // Add provenance information
  // Always link to main in committed output so links don't break after branch merge
  const gitBranch = "main";

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
    path.resolve(__dirname, "generate-masp-docs.js")
  );
  const templateRelPath = path.relative(__dirname, templatePath);
  const profileRelPath = path.relative(__dirname, profilePath);

  // Add examples



  rules.provenance =
    `This document was compiled using [generate-masp-docs.js](${clean(
      repoUrl
    )}/${clean(scriptPath)}), ` +
    `based on [${clean(templateRelPath)}](${clean(repoUrl)}/${clean(
      templateRelPath
    )}) ` +
    `using a MASP Schema defined in [${clean(profileRelPath)}](${clean(
      repoUrl
    )}/${clean(profileRelPath)}).`;

  // Read the template file
  console.log(`Reading template from: ${clean(templatePath)}`);
  const template = fs.readFileSync(templatePath, "utf8");

  // Simple template engine - add support for including definedTermSets in the template
  const output = renderTemplateWithRules(template, rules);

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the markdown output
  fs.writeFileSync(outputPath, output, "utf8");
  console.log(`Documentation generated successfully: ${clean(outputPath)}`);

  const profileName = profileCrate.rootDataset?.name || "Profile Documentation";

  // Shared CSS + Bootstrap used by all generated HTML pages
  const sharedStyles = `
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <style>
    body { padding: 2rem; }
    table { width: 100%; margin-bottom: 1rem; }
    th, td { padding: 0.5rem; border: 1px solid #dee2e6; }
    th { background-color: #f8f9fa; }
    pre { background: #f8f9fa; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    pre.mermaid { background: none; padding: 0; }
    code { background: #f8f9fa; padding: 0.2em 0.4em; border-radius: 3px; }
  </style>`;

  if (multiPage) {
    // --multi-page: generate one HTML page per class/property into ro-crate-preview_files/
    const previewDir = path.join(outputDir, "ro-crate-preview_files");
    if (!fs.existsSync(previewDir)) {
      fs.mkdirSync(previewDir, { recursive: true });
    }

    // Build a map from entity @id → page filename (based on rdfs:label or last URI segment)
    const allSchemaEntities = [
      ...(entitiesByType["rdfs:Class"] || []),
      ...(entitiesByType["rdf:Property"] || []),
    ];

    // Helper to extract a plain string label from an entity (rdfs:label can be an object)
    function getLabel(entity) {
      const raw =
        entity["name"] ||
        entity["rdfs:label"] ||
        entity["@id"].split(/[/#]/).pop() ||
        "";
      if (typeof raw === "object" && raw !== null) {
        return raw["@value"] || raw["name"] || String(raw);
      }
      return String(raw);
    }

    const pageMap = new Map(); // @id → filename
    const usedFilenamesLower = new Set(); // case-insensitive dedup (macOS filesystem)
    for (const entity of allSchemaEntities) {
      const label = getLabel(entity);
      let filename = label.replace(/[^a-zA-Z0-9_-]/g, "_") + ".html";
      // Deduplicate case-insensitively — macOS filesystems treat Text.html and text.html
      // as the same file, causing class pages to be overwritten by property pages
      let i = 2;
      while (usedFilenamesLower.has(filename.toLowerCase())) {
        filename = label.replace(/[^a-zA-Z0-9_-]/g, "_") + `_${i}.html`;
        i++;
      }
      usedFilenamesLower.add(filename.toLowerCase());
      pageMap.set(entity["@id"], filename);
    }

    // Build reverse subclass map: parentId → [childEntity, ...]
    const subclassMap = new Map(); // parentId → Array<classEntity>
    for (const classEntity of entitiesByType["rdfs:Class"] || []) {
      const parents = Array.isArray(classEntity["rdfs:subClassOf"])
        ? classEntity["rdfs:subClassOf"]
        : classEntity["rdfs:subClassOf"]
        ? [classEntity["rdfs:subClassOf"]]
        : [];
      for (const p of parents) {
        const pid = typeof p === "object" ? p["@id"] : p;
        if (!subclassMap.has(pid)) subclassMap.set(pid, []);
        subclassMap.get(pid).push(classEntity);
      }
    }

    /** Resolve an entity @id to a relative link from inside the preview dir */
    function entityLink(id, label) {
      if (pageMap.has(id)) {
        return `<a href="./${pageMap.get(id)}">${clean(label || id)}</a>`;
      }
      // External URI — link out directly
      return `<a href="${id}" target="_blank" rel="noopener">${clean(label || id)}</a>`;
    }

    function makePageHtml(title, bodyHtml, breadcrumb) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${clean(title)} — ${clean(profileName)}</title>
  <link rel="describedby" href="../ro-crate-metadata.json" type="application/ld+json">
  ${sharedStyles}
</head>
<body>
  <div class="container-fluid">
    <p>${breadcrumb}</p>
    ${bodyHtml}
  </div>
  <script>
    document.querySelectorAll('.subclass-filter').forEach(function(input) {
      input.addEventListener('input', function() {
        var q = this.value.toLowerCase();
        var list = document.getElementById(this.dataset.target);
        list.querySelectorAll('li').forEach(function(li) {
          li.style.display = q.length > 0 && !li.dataset.name.includes(q) ? 'none' : '';
        });
      });
    });
  </script>
</body>
</html>`;
    }

    let pagesWritten = 0;

    /** Render a properties table for a group of property entities */
    function renderPropsTable(props) {
      if (!props || props.length === 0) return "";
      let t = `<table><thead><tr><th>Property</th><th>Description</th><th>Range</th></tr></thead><tbody>\n`;
      for (const prop of props) {
        const propEntity = prop.entity || prop; // accept PropertyRule or raw entity
        const propId = propEntity["@id"];
        const propLabel = getLabel(propEntity);
        const propDesc = propEntity["rdfs:comment"] || propEntity["description"] || "";
        const ranges = Array.isArray(propEntity["rangeIncludes"])
          ? propEntity["rangeIncludes"]
          : propEntity["rangeIncludes"]
          ? [propEntity["rangeIncludes"]]
          : [];
        const rangeLinks = ranges
          .map((r) => {
            const rid = typeof r === "object" ? r["@id"] : r;
            return entityLink(rid, rid.split(/[/#]/).pop() || rid);
          })
          .join(", ");
        t += `<tr><td>${entityLink(propId, propLabel)}</td><td>${clean(propDesc)}</td><td>${rangeLinks}</td></tr>\n`;
      }
      t += `</tbody></table>\n`;
      return t;
    }

    // Generate per-class pages
    for (const classEntity of entitiesByType["rdfs:Class"] || []) {
      const classId = classEntity["@id"];
      const filename = pageMap.get(classId);
      if (!filename) continue;

      const label = getLabel(classEntity);
      const desc = classEntity["rdfs:comment"] || classEntity["description"] || "";
      const subClassOf = Array.isArray(classEntity["rdfs:subClassOf"])
        ? classEntity["rdfs:subClassOf"]
        : classEntity["rdfs:subClassOf"]
        ? [classEntity["rdfs:subClassOf"]]
        : [];

      let body = `<h1>${clean(label)}</h1>\n`;
      body += `<p><code>${clean(classId)}</code></p>\n`;
      if (desc) body += `<p>${clean(desc)}</p>\n`;

      if (subClassOf.length > 0) {
        const links = subClassOf
          .map((s) => {
            const sid = typeof s === "object" ? s["@id"] : s;
            const slabel = sid.split(/[/#]/).pop() || sid;
            return entityLink(sid, slabel);
          })
          .join(", ");
        body += `<p><strong>Subclass of:</strong> ${links}</p>\n`;
      }

      // Subclasses derived from this class
      const directSubclasses = (subclassMap.get(classId) || [])
        .slice()
        .sort((a, b) => getLabel(a).localeCompare(getLabel(b)));
      if (directSubclasses.length > 0) {
        const subclassListId = `subclass-list-${clean(label).replace(/\s+/g, "-")}`;
        let subItems = "";
        for (const sub of directSubclasses) {
          const subLabel = getLabel(sub);
          const subDesc = sub["rdfs:comment"]
            ? ` — ${clean(String(sub["rdfs:comment"]).split(/[.\n]/)[0])}`
            : "";
          subItems += `<li data-name="${clean(subLabel).toLowerCase()}">${entityLink(sub["@id"], subLabel)}${subDesc}</li>\n`;
        }
        body += `<h2>Subclasses (${directSubclasses.length})</h2>\n`;
        body += `<input type="search" class="subclass-filter" placeholder="Filter subclasses…" data-target="${subclassListId}" style="margin-bottom:0.5rem;width:100%;max-width:400px;padding:0.3rem 0.5rem;border:1px solid #ced4da;border-radius:4px;">\n`;
        body += `<ul id="${subclassListId}" class="subclass-list" style="max-height:300px;overflow-y:auto;border:1px solid #dee2e6;border-radius:4px;padding:0.5rem 1rem;list-style:none;background:#fff;">\n${subItems}</ul>\n`;
      }

      // Inherited property sections using the validator's inheritance methods
      const { own, inherited } = validator.inheritedPropertyRules(classId);

      // Own properties
      body += `<h2>Properties from ${clean(label)}</h2>\n`;
      if (own.length > 0) {
        body += renderPropsTable(own);
      } else {
        body += `<p><em>No properties defined directly on this class.</em></p>\n`;
      }

      // Inherited properties — one section per ancestor, in ancestry order
      // (parentClasses returns paths root-ward; walk each unique ancestor in order)
      const ancestorPaths = validator.parentClasses(classId);
      // Flatten paths keeping first-occurrence order (breadth-first along each path)
      const seen = new Set();
      const orderedAncestors = [];
      for (const path of ancestorPaths) {
        for (const ancestorId of path) {
          if (!seen.has(ancestorId)) {
            seen.add(ancestorId);
            orderedAncestors.push(ancestorId);
          }
        }
      }

      for (const ancestorId of orderedAncestors) {
        const ancestorProps = inherited[ancestorId];
        if (!ancestorProps || ancestorProps.length === 0) continue;
        const ancestorEntity = profileCrate.getEntity(ancestorId);
        const ancestorLabel = ancestorEntity ? getLabel(ancestorEntity) : (ancestorId.split(/[/#]/).pop() || ancestorId);
        body += `<h2>Properties from ${entityLink(ancestorId, ancestorLabel)}</h2>\n`;
        body += renderPropsTable(ancestorProps);
      }

      // Show enumeration values if this is an enumeration class
      if (validator.isEnumerationClass(classId)) {
        const enumVals = validator.getEnumerationValues(classId);
        if (enumVals.length > 0) {
          body += `<h2>Enumeration Values</h2>\n`;
          body += `<table><thead><tr><th>Value</th><th>Description</th></tr></thead><tbody>\n`;
          for (const val of enumVals.sort((a, b) => getLabel(a).localeCompare(getLabel(b)))) {
            const valLabel = getLabel(val);
            const valDesc = val["rdfs:comment"] || val["description"] || "";
            body += `<tr><td><code>${clean(val["@id"])}</code> ${clean(valLabel)}</td><td>${clean(valDesc)}</td></tr>\n`;
          }
          body += `</tbody></table>\n`;
        }
      }

      const html = makePageHtml(
        label,
        body,
        `<a href="../index.html">${clean(profileName)}</a> &rsaquo; Class: ${clean(label)}`
      );
      fs.writeFileSync(path.join(previewDir, filename), html, "utf8");
      pagesWritten++;
    }

    // Generate per-property pages
    for (const propEntity of entitiesByType["rdf:Property"] || []) {
      const propId = propEntity["@id"];
      const filename = pageMap.get(propId);
      if (!filename) continue;

      const label = getLabel(propEntity);
      const desc = propEntity["rdfs:comment"] || propEntity["description"] || "";

      const domains = Array.isArray(propEntity["domainIncludes"])
        ? propEntity["domainIncludes"]
        : propEntity["domainIncludes"]
        ? [propEntity["domainIncludes"]]
        : [];
      const ranges = Array.isArray(propEntity["rangeIncludes"])
        ? propEntity["rangeIncludes"]
        : propEntity["rangeIncludes"]
        ? [propEntity["rangeIncludes"]]
        : [];

      let body = `<h1>${clean(label)}</h1>\n`;
      body += `<p><code>${clean(propId)}</code></p>\n`;
      if (desc) body += `<p>${clean(desc)}</p>\n`;

      if (domains.length > 0) {
        const links = domains
          .map((d) => {
            const did = typeof d === "object" ? d["@id"] : d;
            return entityLink(did, did.split(/[/#]/).pop() || did);
          })
          .join(", ");
        body += `<p><strong>Domain:</strong> ${links}</p>\n`;
      }
      if (ranges.length > 0) {
        const links = ranges
          .map((r) => {
            const rid = typeof r === "object" ? r["@id"] : r;
            return entityLink(rid, rid.split(/[/#]/).pop() || rid);
          })
          .join(", ");
        body += `<p><strong>Range:</strong> ${links}</p>\n`;
      }

      const html = makePageHtml(
        label,
        body,
        `<a href="../index.html">${clean(profileName)}</a> &rsaquo; Property: ${clean(label)}`
      );
      fs.writeFileSync(path.join(previewDir, filename), html, "utf8");
      pagesWritten++;
    }

    // Generate the index page
    const classes = (entitiesByType["rdfs:Class"] || []).sort((a, b) =>
      getLabel(a).localeCompare(getLabel(b))
    );
    const properties = (entitiesByType["rdf:Property"] || []).sort((a, b) =>
      getLabel(a).localeCompare(getLabel(b))
    );

    // Build class list items
    let classItems = "";
    for (const cls of classes) {
      const label = getLabel(cls);
      const filename = pageMap.get(cls["@id"]);
      const desc = cls["rdfs:comment"] ? ` — ${clean(String(cls["rdfs:comment"]).split(/[.\n]/)[0])}` : "";
      classItems += `<li><a href="./ro-crate-preview_files/${filename}">${clean(label)}</a>${desc}</li>\n`;
    }

    // Build property list items
    let propItems = "";
    for (const prop of properties) {
      const label = getLabel(prop);
      const filename = pageMap.get(prop["@id"]);
      const desc = prop["rdfs:comment"] ? ` — ${clean(String(prop["rdfs:comment"]).split(/[.\n]/)[0])}` : "";
      propItems += `<li><a href="./ro-crate-preview_files/${filename}">${clean(label)}</a>${desc}</li>\n`;
    }

    // The filterable class/property panels — substituted in place of ${rules.all}
    const entityPanelsHtml = `
<p><strong>${classes.length}</strong> classes &middot; <strong>${properties.length}</strong> properties</p>
<div class="row">
  <div class="col-md-6 col-panel">
    <h2>Classes</h2>
    <input class="entity-filter" type="search" placeholder="Filter classes…" data-target="class-list">
    <ul id="class-list" class="entity-list">
${classItems}    </ul>
  </div>
  <div class="col-md-6 col-panel">
    <h2>Properties</h2>
    <input class="entity-filter" type="search" placeholder="Filter properties…" data-target="prop-list">
    <ul id="prop-list" class="entity-list">
${propItems}    </ul>
  </div>
</div>`;

    // Render the template through the same substitution engine as for markdown output,
    // but with rules.all replaced by the interactive panels. This preserves any content
    // the template author placed between or after other ${rules.*} placeholders.
    const indexRules = Object.assign({}, rules, { all: entityPanelsHtml });
    const indexTemplate = renderTemplateWithRules(template, indexRules);
    const indexBodyHtml = md.render(indexTemplate);

    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${clean(profileName)}</title>
  <link rel="describedby" href="ro-crate-metadata.json" type="application/ld+json">
  ${sharedStyles}
  <style>
    .entity-filter { margin-bottom: 0.5rem; width: 100%; padding: 0.4rem 0.6rem; font-size: 0.95rem; border: 1px solid #ced4da; border-radius: 4px; }
    .entity-list { height: 420px; overflow-y: auto; border: 1px solid #dee2e6; border-radius: 4px; padding: 0.5rem 1rem; background: #fff; list-style: none; margin: 0; }
    .entity-list li { padding: 0.15rem 0; border-bottom: 1px solid #f0f0f0; font-size: 0.9rem; }
    .entity-list li:last-child { border-bottom: none; }
    .entity-list li.hidden { display: none; }
    .col-panel h2 { margin-top: 0; }
    .col-panel { padding: 1rem; }
  </style>
</head>
<body>
  <div class="container-fluid">
    <p><a href="ro-crate-metadata.json">⬇️ Download schema metadata (JSON-LD)</a></p>
    ${indexBodyHtml}
  </div>
  <script>
    document.querySelectorAll('.entity-filter').forEach(function(input) {
      input.addEventListener('input', function() {
        var q = this.value.toLowerCase();
        var list = document.getElementById(this.dataset.target);
        list.querySelectorAll('li').forEach(function(li) {
          li.classList.toggle('hidden', q.length > 0 && !li.textContent.toLowerCase().includes(q));
        });
      });
    });
  </script>
</body>
</html>`;
    // index.html sits at the crate root alongside ro-crate-metadata.json
    const htmlOutputPath = path.join(outputDir, "index.html");
    fs.writeFileSync(htmlOutputPath, indexHtml, "utf8");
    console.log(`HTML index generated: ${clean(htmlOutputPath)}`);
    console.log(
      `Multi-page HTML documentation generated: ${pagesWritten} entity pages in ${clean(previewDir)}`
    );
  } else {
    // Single-page HTML (default for profiles and small schemas)
    // Build filterable class/property panels that link to anchors within this page
    const spClasses = (entitiesByType["rdfs:Class"] || []).slice().sort((a, b) => {
      const aName = String(a["name"] || a["rdfs:label"] || a["@id"] || "");
      const bName = String(b["name"] || b["rdfs:label"] || b["@id"] || "");
      return aName.localeCompare(bName);
    });
    const spProps = (entitiesByType["rdf:Property"] || []).slice().sort((a, b) => {
      const aName = String(a["name"] || a["rdfs:label"] || a["@id"] || "");
      const bName = String(b["name"] || b["rdfs:label"] || b["@id"] || "");
      return aName.localeCompare(bName);
    });

    let spClassItems = "";
    for (const cls of spClasses) {
      const label = String(cls["name"] || cls["rdfs:label"] || cls["@id"] || "");
      const anchor = getAnchorId(cls["@id"]);
      const internalId = cls["@id"].startsWith("#")
        ? ` <small style="color:#aaa">${clean(cls["@id"])}</small>` : "";
      const desc = cls["rdfs:comment"] ? ` — ${clean(String(cls["rdfs:comment"]).split(/[.\n]/)[0])}` : "";
      spClassItems += `<li><a href="#${anchor}" title="${clean(cls["@id"])}">${clean(label)}</a>${desc}${internalId}</li>\n`;
    }
    let spPropItems = "";
    for (const prop of spProps) {
      const label = String(prop["name"] || prop["rdfs:label"] || prop["@id"] || "");
      const anchor = getAnchorId(prop["@id"]);
      const internalId = prop["@id"].startsWith("#")
        ? ` <small style="color:#aaa">${clean(prop["@id"])}</small>` : "";
      const desc = prop["rdfs:comment"] ? ` — ${clean(String(prop["rdfs:comment"]).split(/[.\n]/)[0])}` : "";
      spPropItems += `<li><a href="#${anchor}" title="${clean(prop["@id"])}">${clean(label)}</a>${desc}${internalId}</li>\n`;
    }

    const spPanels = spClasses.length === 0 && spProps.length === 0 ? "" : `
<p><strong>${spClasses.length}</strong> classes &middot; <strong>${spProps.length}</strong> properties</p>
<div class="row">
  <div class="col-md-6 col-panel">
    <h3>Classes</h3>
    <input class="entity-filter" type="search" placeholder="Filter classes…" data-target="class-list">
    <ul id="class-list" class="entity-list">
${spClassItems}    </ul>
  </div>
  <div class="col-md-6 col-panel">
    <h3>Properties</h3>
    <input class="entity-filter" type="search" placeholder="Filter properties…" data-target="prop-list">
    <ul id="prop-list" class="entity-list">
${spPropItems}    </ul>
  </div>
</div>

`;

    // Render through the same substitution engine with rules.all prepended by the panels
    const spRules = Object.assign({}, rules, { all: spPanels + rules.all });
    const spOutput = renderTemplateWithRules(template, spRules);

    const htmlBodyRaw = md.render(spOutput);
    // Convert markdown-it's <pre><code class="language-mermaid">...</code></pre>
    // into <pre class="mermaid">...</pre> so Mermaid JS can render them.
    const htmlBody = htmlBodyRaw.replace(
      /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
      (_, diagram) => `<pre class="mermaid">${diagram}</pre>`
    );
    const htmlOutput = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profileName}</title>
  <link rel="describedby" href="ro-crate-metadata.json" type="application/ld+json">
  ${sharedStyles}
  <style>
    .entity-filter { margin-bottom: 0.5rem; width: 100%; padding: 0.4rem 0.6rem; font-size: 0.95rem; border: 1px solid #ced4da; border-radius: 4px; }
    .entity-list { height: 420px; overflow-y: auto; border: 1px solid #dee2e6; border-radius: 4px; padding: 0.5rem 1rem; background: #fff; list-style: none; margin: 0; }
    .entity-list li { padding: 0.15rem 0; border-bottom: 1px solid #f0f0f0; font-size: 0.9rem; }
    .entity-list li:last-child { border-bottom: none; }
    .entity-list li.hidden { display: none; }
    .col-panel h3 { margin-top: 0; }
    .col-panel { padding: 1rem; }
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
  <script>
    document.querySelectorAll('.entity-filter').forEach(function(input) {
      input.addEventListener('input', function() {
        var q = this.value.toLowerCase();
        var list = document.getElementById(this.dataset.target);
        list.querySelectorAll('li').forEach(function(li) {
          li.classList.toggle('hidden', q.length > 0 && !li.textContent.toLowerCase().includes(q));
        });
      });
    });
  </script>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true });
  </script>
</body>
</html>`;
    const htmlOutputPath = path.join(outputDir, "index.html");
    fs.writeFileSync(htmlOutputPath, htmlOutput, "utf8");
    console.log(`HTML documentation generated successfully: ${clean(htmlOutputPath)}`);
  }
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