#!/usr/bin/env node
/* Converts a Crate-O mode file into a MASP (Machine Actionable Schema/Profile)
 * RO-Crate, suitable for use with the ro-crate-masp validator and tooling.
 *
 * This is a port of mode-to-sossplus.js from the ro-crate-schema-tools repo,
 * adapted to target MASP profiles instead of SOSSplus profiles.
 *
 * Copyright (C) 2023 University of Queensland
 * Licensed under the GNU General Public License v3 or later.
 */

"use strict";

const yargs = require("yargs");
const fs = require("fs-extra");
const { ROCrate } = require("ro-crate");
const path = require("path");

console.log("Starting mode-to-masp converter");

const argv = yargs(process.argv.slice(2))
  .scriptName("mode-to-masp")
  .option("m", {
    alias: "mode-file",
    describe: "Path to a mode file to convert",
    type: "string",
    demandOption: true
  })
  .option("o", {
    alias: "output-dir",
    describe: "Output directory for the generated RO-Crate",
    type: "string",
    default: "./output/mode-masp"
  })
  .option("p", {
    alias: "profile-crate",
    describe: "Output directory for the profile-crate (e.g., profiles/ldac/profile-crate)",
    type: "string"
  })
  .option("n", {
    alias: "namespace",
    describe: "Namespace for the generated entities",
    type: "string",
    default: "https://language-research-technology.github.io/terms#"
  })
  .help()
  .argv;

/**
 * ModeConverter class converts a Crate-O mode file to a MASP RO-Crate
 */
class ModeConverter {
  constructor(modeFilePath, outputDir, namespace) {
    console.log(`Initializing converter with:
    - Mode file: ${modeFilePath}
    - Output directory: ${outputDir}
    - Namespace: ${namespace}`);

    this.modeFilePath = modeFilePath;
    this.outputDir = outputDir;
    this.namespace = namespace;

    // Map to track properties by ID to avoid duplication
    this.propertyMap = new Map();

    // Create the RO-Crate object
    this.crate = new ROCrate();
  }

  /**
   * Load the mode file from disk
   */
  loadModeFile() {
    console.log(`Loading mode file: ${this.modeFilePath}`);
    try {
      const fileContent = fs.readFileSync(this.modeFilePath, "utf8");
      console.log("File read successfully");

      // Remove any comment lines that start with //
      const contentWithoutComments = fileContent
        .split("\n")
        .filter(line => !line.trim().startsWith("//"))
        .join("\n");
      console.log("Removed any comment lines from file");

      const modeData = JSON.parse(contentWithoutComments);
      console.log("JSON parsed successfully");

      this.modeData = modeData;

      this.createModeWithUIHints();

      console.log("Mode file loaded");
      console.log("\nMode file structure:");
      console.log(`- Metadata: ${modeData.metadata ? "Present" : "Not present"}`);
      console.log(`- Root Data Entity: ${modeData.rootDataEntity ? "Present" : "Not present"}`);
      console.log(`- Classes: ${modeData.classes ? Object.keys(modeData.classes).length : 0} defined`);
      console.log(`- Lookups: ${modeData.lookups ? Object.keys(modeData.lookups).length : 0} defined`);

      return modeData;
    } catch (error) {
      console.error(`Error loading mode file: ${error}`);
      throw error;
    }
  }

  /**
   * Create a copy of the mode file with UI hints preserved as a side file
   */
  createModeWithUIHints() {
    const modeWithHints = JSON.parse(JSON.stringify(this.modeData));

    modeWithHints["ui-hints"] = {
      textAreas: {},
      textFields: {},
      lookups: {}
    };

    if (modeWithHints.classes) {
      Object.entries(modeWithHints.classes).forEach(([className, classData]) => {
        if (classData.inputs) {
          classData.inputs.forEach(input => {
            const types = Array.isArray(input.type) ? input.type : [input.type];

            if (types.includes("TextArea")) {
              if (!modeWithHints["ui-hints"].textAreas[className]) {
                modeWithHints["ui-hints"].textAreas[className] = {};
              }
              modeWithHints["ui-hints"].textAreas[className][input.name] = true;
            }

            if (types.includes("Text")) {
              if (!modeWithHints["ui-hints"].textFields[className]) {
                modeWithHints["ui-hints"].textFields[className] = {};
              }
              modeWithHints["ui-hints"].textFields[className][input.name] = true;
            }
          });
        }
      });
    }

    if (modeWithHints.lookups) {
      modeWithHints["ui-hints"].lookups = { ...modeWithHints.lookups };
    }

    const hintsFilePath = path.join(this.outputDir, "mode-with-ui-hints.json");
    fs.ensureDirSync(path.dirname(hintsFilePath));
    fs.writeJSONSync(hintsFilePath, modeWithHints, { spaces: 2 });
    console.log(`Saved mode file with UI hints to ${hintsFilePath}`);

    this.hintsFilePath = hintsFilePath;
  }

  /**
   * Initialize the RO-Crate with metadata from the mode file
   */
  initializeCrate() {
    console.log("Initializing RO-Crate structure");
    this.crate.resolveContext();

    const metadata = this.modeData.metadata || {};

    this.crate.rootDataset.name = `${metadata.name || "Converted Mode"} Schema`;
    this.crate.rootDataset.description =
      `Schema derived from ${metadata.name || "mode file"}: ${metadata.description || ""}`;

    if (metadata.author) {
      this.crate.rootDataset.author = [{ "@id": "#author" }];
      this.crate.addEntity({
        "@id": "#author",
        "@type": "Organization",
        "name": metadata.author
      });
      console.log(`Added author: ${metadata.author}`);
    }

    if (metadata.license) {
      this.crate.rootDataset.license = metadata.license;
      console.log(`Added license: ${metadata.license}`);
    }

    // Conformance reference targets MASP profile
    this.crate.rootDataset.conformsTo = [{
      "@id": "https://language-research-technology.github.io/ro-crate-masp/"
    }];
    console.log("Added conformsTo reference to MASP profile");

    // Add RO-Crate Metadata Descriptor early so it appears at top of @graph
    this.crate.addEntity({
      "@id": "ro-crate-metadata.json",
      "@type": "CreativeWork",
      "identifier": "ro-crate-metadata.json",
      "about": { "@id": "./" }
    });
    console.log("Added RO-Crate Metadata Descriptor at top level");
  }

  /**
   * Process a class from the mode file
   */
  processClass(className, classData) {
    console.log(`Processing class: ${className}`);

    const classId = classData.id || `${this.namespace}${className}`;

    const classEntity = {
      "@id": `#class_${className}`,
      "@type": "rdfs:Class",
      "rdfs:label": className,
      "name": className,
      "prov:specializationOf": { "@id": classId }
    };

    if (classData.description) {
      classEntity["rdfs:comment"] = classData.description;
    }

    if (classData.subClassOf && classData.subClassOf.length > 0) {
      classEntity["rdfs:subClassOf"] = classData.subClassOf.map(superClass => ({
        "@id": superClass
      }));
    }

    this.crate.addEntity(classEntity);
    console.log(`Added class entity: ${className} with ID ${classEntity["@id"]}`);

    if (classData.inputs && classData.inputs.length > 0) {
      console.log(`Processing ${classData.inputs.length} properties for class ${className}`);
      classData.inputs.forEach(input => {
        this.processProperty(className, input);
      });
    } else {
      console.log(`No properties defined for class ${className}`);
    }
  }

  /**
   * Process a property from a class
   */
  processProperty(className, inputData) {
    console.log(`Processing property: ${inputData.name} for class ${className}`);

    const propertyId = inputData.id || `${this.namespace}${inputData.name}`;
    const propertyName = inputData.name;

    const propertyKey = `${propertyId}_${propertyName}_${JSON.stringify(inputData.type)}`;

    if (this.propertyMap.has(propertyKey)) {
      const existingProperty = this.propertyMap.get(propertyKey);
      console.log(`Found existing property: ${propertyName} - reusing and adding domain`);

      if (!existingProperty["domainIncludes"]) {
        existingProperty["domainIncludes"] = [];
      } else if (!Array.isArray(existingProperty["domainIncludes"])) {
        existingProperty["domainIncludes"] = [existingProperty["domainIncludes"]];
      }

      const domainClassId = `#class_${className}`;
      const alreadyInDomain = existingProperty["domainIncludes"].some(
        domain => domain["@id"] === domainClassId
      );

      if (!alreadyInDomain) {
        existingProperty["domainIncludes"].push({ "@id": domainClassId });
        this.crate.addEntity(existingProperty);
        console.log(`Updated domain for property ${propertyName} to include ${className}`);
      }

      return existingProperty;
    }

    const propertyEntity = {
      "@id": `#prop_${propertyName}_${className}`,
      "@type": "rdf:Property",
      "rdfs:label": propertyName,
      "name": propertyName,
      "prov:specializationOf": { "@id": propertyId },
      "domainIncludes": [{ "@id": `#class_${className}` }]
    };

    if (inputData.help) {
      propertyEntity["rdfs:comment"] = inputData.help;
    }

    if (inputData.values && inputData.values.length > 0) {
      console.log(`Processing ${inputData.values.length} predefined values for property: ${propertyName}`);

      const allDefinedTerms = inputData.values.every(v => v["@type"] === "DefinedTerm");

      let definedTermSetId = null;
      if (allDefinedTerms) {
        const termSets = new Set(
          inputData.values
            .filter(v => v.inDefinedTermSet && v.inDefinedTermSet["@id"])
            .map(v => v.inDefinedTermSet["@id"])
        );
        if (termSets.size === 1) {
          definedTermSetId = Array.from(termSets)[0];
          console.log(`All values belong to the same DefinedTermSet: ${definedTermSetId}`);
        }
      }

      if (allDefinedTerms && definedTermSetId) {
        const termSetEntity = {
          "@id": definedTermSetId,
          "@type": "DefinedTermSet",
          "name": definedTermSetId.split(":").pop(),
          "description": `Set of defined terms for ${propertyName}`
        };

        const termReferences = [];
        inputData.values.forEach(value => {
          const valueEntity = JSON.parse(JSON.stringify(value));
          this.crate.addEntity(valueEntity);
          console.log(`Added DefinedTerm: ${value["@id"]} for property ${propertyName}`);
          termReferences.push({ "@id": value["@id"] });
        });

        termSetEntity.hasDefinedTerm = termReferences;
        this.crate.addEntity(termSetEntity);
        console.log(`Added DefinedTermSet: ${definedTermSetId} for property ${propertyName}`);

        propertyEntity["rangeIncludes"] = { "@id": definedTermSetId };
      } else {
        const itemListId = `#itemlist_${propertyName}_${className}`;
        const itemList = {
          "@id": itemListId,
          "@type": "ItemList",
          "name": `Values for ${propertyName}`,
          "description": `Predefined values for the ${propertyName} property`,
          "itemListElement": []
        };

        inputData.values.forEach((value, index) => {
          const valueId = value["@id"] || `#value_${propertyName}_${index}_${className}`;
          const valueEntity = JSON.parse(JSON.stringify(value));
          valueEntity["@id"] = valueId;
          this.crate.addEntity(valueEntity);
          console.log(`Added value entity: ${valueId} for property ${propertyName}`);
          itemList.itemListElement.push({ "@id": valueId });
        });

        this.crate.addEntity(itemList);
        console.log(`Added ItemList: ${itemListId} for property ${propertyName}`);

        propertyEntity["itemListElement"] = { "@id": itemListId };
        propertyEntity["rangeIncludes"] = { "@id": itemListId };
      }
    } else if (inputData.type && inputData.type.length > 0) {
      const types = Array.isArray(inputData.type) ? inputData.type : [inputData.type];

      propertyEntity["rangeIncludes"] = types.map(type => {
        if (["Text", "TextArea", "URL", "Date", "DateTime", "Boolean", "Number", "Select", "SelectObject"].includes(type)) {
          const typeMap = {
            Text: "Text",
            TextArea: "Text",
            URL: "URL",
            Date: "Date",
            DateTime: "DateTime",
            Boolean: "Boolean",
            Number: "Number",
            Select: "Text",
            SelectObject: "Thing"
          };
          return { "@id": typeMap[type] || type };
        } else {
          return { "@id": `#class_${type}` };
        }
      });
    }

    if (inputData.required) {
      propertyEntity["sh:minCount"] = 1;
    }
    if (inputData.multiple === false) {
      propertyEntity["sh:maxCount"] = 1;
    }

    this.propertyMap.set(propertyKey, propertyEntity);
    this.crate.addEntity(propertyEntity);
    console.log(`Added property entity: ${propertyName} with ID ${propertyEntity["@id"]}`);

    return propertyEntity;
  }

  /**
   * Process root data entity definitions
   */
  processRootDataEntity() {
    if (!this.modeData.rootDataEntity) {
      console.log("No rootDataEntity defined in mode file");
      return;
    }

    const rootEntities = Array.isArray(this.modeData.rootDataEntity)
      ? this.modeData.rootDataEntity
      : [this.modeData.rootDataEntity];

    console.log(`Processing ${rootEntities.length} root data entities`);

    rootEntities.forEach((rootEntity, index) => {
      const rootClassName = rootEntity.type
        ? (Array.isArray(rootEntity.type) ? rootEntity.type[0] : rootEntity.type)
        : `RootDataEntity${index}`;

      console.log(`Processing root data entity of type: ${rootClassName}`);

      const rootClassEntity = {
        "@id": `#class_RootDataEntity_${rootClassName}`,
        "@type": "rdfs:Class",
        "rdfs:label": `${rootClassName}`,
        "name": `${rootClassName}`,
        "prov:specializationOf": { "@id": `${rootClassName}` },
        "rdfs:comment": rootEntity.description || `Root Data Entity of type ${rootClassName}`
      };

      this.crate.addEntity(rootClassEntity);
      console.log(`Added root data entity class: ${rootClassName}`);
    });
  }

  /**
   * Process lookup definitions
   */
  processLookups() {
    const lookups = this.modeData.lookup || {};
    console.log(`Processing ${Object.keys(lookups).length} lookup definitions`);

    for (const lookupName in lookups) {
      console.log(`Processing lookup: ${lookupName}`);
      const lookupData = lookups[lookupName];

      const lookupEntity = {
        "@id": `#class_${lookupName}`,
        "@type": "rdfs:Class",
        "rdfs:label": lookupName,
        "name": lookupName,
        "rdfs:comment": `Lookup for ${lookupName} from ${lookupData.module || "unspecified module"}`
      };

      this.crate.addEntity(lookupEntity);
      console.log(`Added lookup class: ${lookupName}`);

      if (lookupData.fields && lookupData.fields.length > 0) {
        console.log(`Processing ${lookupData.fields.length} fields for lookup: ${lookupName}`);
        lookupData.fields.forEach(field => {
          if (field !== "@id") {
            const fieldEntity = {
              "@id": `#prop_${field}_${lookupName}`,
              "@type": "rdf:Property",
              "rdfs:label": field,
              "name": field,
              "prov:specializationOf": { "@id": `${field}` },
              "domainIncludes": [{ "@id": `#class_${lookupName}` }],
              "rangeIncludes": [{ "@id": "Text" }],
              "rdfs:comment": `Field ${field} for ${lookupName} lookup`
            };
            this.crate.addEntity(fieldEntity);
            console.log(`Added field property: ${field} for lookup ${lookupName}`);
          }
        });
      }
    }
  }

  /**
   * Add RO-Crate Metadata Descriptor class and standard root data entity to the crate
   */
  addROCrateMetadataDescriptor() {
    console.log("Adding RO-Crate Metadata Descriptor class and properties");

    const metadataDescriptorClass = {
      "@id": "#RO-Crate_Metadata_Descriptor",
      "@type": "rdfs:Class",
      "name": "RO-Crate Metadata Descriptor",
      "prov:specializationOf": { "@id": "http://schema.org/CreativeWork" },
      "description": "An RO-Crate @graph must contain an entity of Type @CreativeWork which is known as the RO-Crate Metadata descriptor.",
      "sh:minCount": 1,
      "sh:maxCount": 1
    };
    this.crate.addEntity(metadataDescriptorClass);
    console.log("Added RO-Crate Metadata Descriptor class");

    const metadataDescriptorIdProperty = {
      "@id": "#RO-Crate_Metadata_Descriptor.id",
      "@type": "rdf:Property",
      "value": "ro-crate-metadata.json",
      "description": "The RO-Crate Metadata file identifier",
      "rdfs:label": "@id",
      "domainIncludes": [{ "@id": "#RO-Crate_Metadata_Descriptor" }],
      "rangeIncludes": { "@id": "#Root_Data_Entity" },
      "sh:minCount": 1,
      "sh:maxCount": 1
    };
    this.crate.addEntity(metadataDescriptorIdProperty);
    console.log("Added RO-Crate Metadata Descriptor ID property");

    const metadataDescriptorAboutProperty = {
      "@id": "#RO-Crate_Metadata_Descriptor.about",
      "@type": "rdf:Property",
      "prov:specializationOf": { "@id": "http://schema.org/about" },
      "description": "This property on the RO-Crate Metadata Descriptor references the Root Data Entity.",
      "name": "about",
      "domainIncludes": [{ "@id": "#RO-Crate_Metadata_Descriptor" }],
      "rangeIncludes": { "@id": "#Root_Data_Entity" },
      "sh:minCount": 1,
      "sh:maxCount": 1
    };
    this.crate.addEntity(metadataDescriptorAboutProperty);
    console.log("Added RO-Crate Metadata Descriptor about property");

    this.addRootDataEntityClass();
  }

  /**
   * Add Root Data Entity class based on the mode file
   */
  addRootDataEntityClass() {
    console.log("Adding Root Data Entity class from mode file");

    const rootDataEntityTypes = [];
    if (this.modeData.rootDataset && this.modeData.rootDataset.type) {
      if (Array.isArray(this.modeData.rootDataset.type)) {
        rootDataEntityTypes.push(...this.modeData.rootDataset.type);
      } else {
        rootDataEntityTypes.push(this.modeData.rootDataset.type);
      }
    } else if (this.modeData.rootDataEntity) {
      const rootEntity = this.modeData.rootDataEntity;
      const entities = Array.isArray(rootEntity) ? rootEntity : [rootEntity];
      entities.forEach(entity => {
        if (entity.type) {
          if (Array.isArray(entity.type)) {
            rootDataEntityTypes.push(...entity.type);
          } else {
            rootDataEntityTypes.push(entity.type);
          }
        }
      });
    }

    if (rootDataEntityTypes.length === 0) {
      rootDataEntityTypes.push("Dataset");
    }

    console.log(`Root Data Entity types from mode file: ${rootDataEntityTypes.join(", ")}`);

    const rootDataEntityClass = {
      "@id": "#Root_Data_Entity",
      "@type": "rdfs:Class",
      "description": `The Root Data Entity for an RO-Crate. In this profile, it is a ${rootDataEntityTypes.join(" and ")}.`,
      "name": "Root Data Entity",
      "sh:minCount": 1,
      "sh:maxCount": 1
    };

    if (rootDataEntityTypes.length > 0) {
      rootDataEntityClass["prov:specializationOf"] = rootDataEntityTypes.map(type => {
        const uri = this.crate.resolveTerm(type) || `http://schema.org/${type}`;
        return { "@id": uri };
      });
    }

    this.crate.addEntity(rootDataEntityClass);
    console.log(`Added Root Data Entity class with subclass relationships to: ${rootDataEntityTypes.join(", ")}`);

    this.addRootDataEntityProperties(rootDataEntityTypes);
  }

  /**
   * Add common required properties for Root Data Entity
   */
  addRootDataEntityProperties(rootDataEntityTypes) {
    console.log("Adding common properties for Root Data Entity");

    const props = [
      {
        "@id": "#prop_name_Dataset",
        "@type": "rdf:Property",
        "rdfs:label": "name",
        "name": "name",
        "prov:specializationOf": { "@id": "http://schema.org/name" },
        "domainIncludes": { "@id": "#Root_Data_Entity" },
        "rdfs:comment": "The name of this data collection.",
        "rangeIncludes": { "@id": "Text" },
        "sh:minCount": 1
      },
      {
        "@id": "#prop_description_Dataset",
        "@type": "rdf:Property",
        "rdfs:label": "description",
        "name": "description",
        "prov:specializationOf": { "@id": "http://schema.org/description" },
        "domainIncludes": { "@id": "#Root_Data_Entity" },
        "rdfs:comment": "An abstract of the collection.",
        "rangeIncludes": { "@id": "Text" },
        "sh:minCount": 1
      },
      {
        "@id": "#prop_datePublished_Dataset",
        "@type": "rdf:Property",
        "rdfs:label": "datePublished",
        "name": "datePublished",
        "prov:specializationOf": { "@id": "http://schema.org/datePublished" },
        "domainIncludes": { "@id": "#Root_Data_Entity" },
        "rdfs:comment": "A date that this collection was published.",
        "rangeIncludes": [{ "@id": "Date" }],
        "sh:minCount": 1
      },
      {
        "@id": "#prop_license_Dataset",
        "@type": "rdf:Property",
        "rdfs:label": "license",
        "name": "license",
        "prov:specializationOf": { "@id": "http://schema.org/license" },
        "domainIncludes": { "@id": "#Root_Data_Entity" },
        "rdfs:comment": "A license document that applies to this content, typically indicated by URL.",
        "rangeIncludes": [
          { "@id": "#class_CreativeWork" },
          { "@id": "URL" },
          { "@id": "Text" }
        ],
        "sh:minCount": 1
      }
    ];

    props.forEach(prop => {
      this.crate.addEntity(prop);
      console.log(`Added ${prop.name} property for Root Data Entity`);
    });
  }

  /**
   * Convert the mode file to a MASP RO-Crate
   */
  async convert() {
    try {
      console.log("Starting conversion process");

      this.loadModeFile();
      this.initializeCrate();

      this.addROCrateMetadataDescriptor();
      console.log("Added RO-Crate Metadata Descriptor and Root Data Entity");

      const classes = this.modeData.classes;
      if (classes) {
        console.log(`Processing ${Object.keys(classes).length} classes from mode file`);
        Object.entries(classes).forEach(([className, classData]) => {
          this.processClass(className, classData);
        });
      }

      if (this.modeData.rootDataEntity) {
        console.log("Processing root data entity");
        this.processRootDataEntity();
      } else {
        console.log("No rootDataEntity defined in mode file");
      }

      if (this.modeData.lookups) {
        console.log(`Processing ${Object.keys(this.modeData.lookups).length} lookup definitions`);
        this.processLookups();
      }

      const outputPath = path.join(this.outputDir, "ro-crate-metadata.json");
      fs.ensureDirSync(this.outputDir);
      fs.writeJSONSync(outputPath, this.crate.toJSON(), { spaces: 2 });
      console.log(`RO-Crate metadata written to: ${outputPath}\n`);

      console.log("Conversion completed successfully!");

      return this.crate;
    } catch (error) {
      console.error("Error during conversion:", error);
      throw error;
    }
  }
}

// Main entry point
async function main() {
  try {
    console.log("Starting mode-to-masp conversion...");

    const modePath = argv.modeFile;
    const outputDir = argv.outputDir;
    const namespace = argv.namespace;
    const profileCrateDir = argv.profileCrate;

    console.log(`Converting mode file: ${modePath}`);
    console.log(`Output directory: ${outputDir}`);
    if (profileCrateDir) {
      console.log(`Profile-crate directory: ${profileCrateDir}`);
    }

    const converter = new ModeConverter(modePath, outputDir, namespace);
    const crate = await converter.convert();

    if (profileCrateDir) {
      console.log(`Writing profile to profile-crate directory: ${profileCrateDir}`);
      const profileCratePath = path.join(profileCrateDir, "ro-crate-metadata.json");
      fs.ensureDirSync(profileCrateDir);
      fs.writeJSONSync(profileCratePath, crate.toJSON(), { spaces: 2 });
      console.log(`Profile written to: ${profileCratePath}`);
    }

    console.log("Conversion completed successfully");
  } catch (error) {
    console.error("Conversion failed:", error.message);
    process.exit(1);
  }
}

main();
