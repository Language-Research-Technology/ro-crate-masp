#!/usr/bin/env node
/**
 * MASP Validator - Validates RO-Crates against MASP profiles
 *
 * This validator follows the MASP validation algorithm to check if a target crate
 * conforms to a MASP profile.
 */

const { ROCrate } = require("ro-crate");

function readJsonFileSync(filePath) {
  // Lazy-load fs so this module can also be bundled for browser use.
  const fs = require("fs");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function asArray(value) {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

function asFirstString(value, fallback = "") {
  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item === "string" && item) {
        return item;
      }
    }
    return fallback;
  }
  if (typeof value === "string") {
    return value;
  }
  return fallback;
}

function asFirstNumber(value, fallback = 0) {
  for (const item of asArray(value)) {
    const parsed = Number(item);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return fallback;
}

const CONFORMANCE_INDICATOR_ROLE_URIS = new Set([
  "https://w3id.org/ro/conformance-indicators",
]);

function isROCrateLike(value) {
  return !!(
    value &&
    typeof value === "object" &&
    typeof value.entities === "function" &&
    typeof value.getEntity === "function" &&
    typeof value.resolveContext === "function"
  );
}

// Helper function to create GitHub-compatible IDs
function createGitHubCompatibleId(id) {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Base Rule class - all validation rules inherit from this
 */
class Rule {
  constructor(entity, validator) {
    this.entity = entity;
    this.validator = validator;
    this.id = entity["@id"];
    this.name =
      asFirstString(entity["name"]) ||
      asFirstString(entity["rdfs:label"]) ||
      this.id;
    this.description =
      asFirstString(entity["description"]) ||
      asFirstString(entity["rdfs:comment"]) ||
      "";
  }

  validate(...args) {
    throw new Error("validate() must be implemented by subclass");
  }

  addResult(level, message, entityId) {
    this.validator.addResult(level, message, this.id, entityId);
  }

  log(message, level = "info") {
    this.validator.log(message, level);
  }
}

/**
 * ClassRule - validates entities against class definitions
 */
class ClassRule extends Rule {
  constructor(entity, validator) {
    super(entity, validator);
    this.minCount = entity["sh:minCount"] ? parseInt(entity["sh:minCount"]) : 0;
    this.maxCount = entity["sh:maxCount"]
      ? parseInt(entity["sh:maxCount"])
      : Number.MAX_SAFE_INTEGER;
    this.resolvedTypes = this.extractResolvedTypes();
    this.propertyRules = this.findPropertyRulesForClass();
   this.log(
      `ClassRule created for ${this.id} with types: ${this.resolvedTypes}`
    );
  }

  extractResolvedTypes() {
    const types = this.entity["prov:specializationOf"] || [
      { "@id": this.entity["@id"] },
    ];
    this.log(`Extracting resolved types for class ${this.id}:`, types);
    return types.map((type) =>
      this.validator.profileCrate.resolveTerm(type["@id"])
    );
  }
  /**
   * Check if an entity has all the required types
   * @param {Object} entity - The entity to check
   * @param {Array} requiredTypes - Array of required type strings
   * @returns {boolean} True if entity has all required types
   */
  validateEntityTypes(entity) {
    const requiredTypes = this.resolvedTypes;
    if (!entity["@type"]) {
      return false;
    }
    this.log(`requiredTypes: ${requiredTypes.join(", ")}`, "debug");

    // Get the entity types and resolve them
    const rawEntityTypes = entity["@type"];
    const entityTypes = rawEntityTypes.map((type) => {
      const resolvedType = this.validator.targetCrate.resolveTerm(type);
      this.log(`Resolving entity type ${type} to ${resolvedType}`, "debug");
      return resolvedType;
    });

    this.log(`entityTypes: ${entityTypes.join(", ")}`, "debug");
    // Check if all required types are present in the resolved entity types
    return requiredTypes.every((type) => {
      this.log(`Checking if entity has required type: ${type} - ${entityTypes.includes(type)}`, "debug");
      return entityTypes.includes(type);
    });
  }

  validate(targetCrate) {
    this.log(`Processing class rule: ${this.id}`, "info");
    if (this.resolvedTypes.length === 0) {
      this.log(
        `Class rule ${this.id} does not specify any types via prov:specializationOf`,
        "warn"
      );
      this.addResult(
        "warning",
        `Class rule ${this.id} does not specify any types via prov:specializationOf`,
        "..."
      );
      return false;
    }

    // Count how many entities in the target crate match these types
    let classMatches = 0;
    this.log(
      `Looking for entities with types: ${this.resolvedTypes.join(", ")}`,
      "debug"
    );

    for (const entity of targetCrate.entities()) {
      const entityId = entity["@id"];
      const entityTypes = asArray(entity["@type"]);

      this.log(
        `Examining entity: ${entityId} with types: ${entityTypes.join(", ")}`,
        "debug"
      );

      const entityValid = this.validator.validateEntity(entity, this);
      if (entityValid === true) {
        this.log(
          `Entity ${entityId} is valid for class rule ${this.name}`,
          "info"
        );
        classMatches++;
      } else if (entityValid === false) {
        this.log(
          `Entity ${entityId} failed validation for class rule ${this.name}`,
          "warn"
        );
      }
    }

    return this.validateCardinality(classMatches);
  }

  validateCardinality(matchCount) {
    this.log(
      `Found ${matchCount} matches for class rule ${this.name} (min: ${
        this.minCount
      }, max: ${this.maxCount || "unlimited"})`,
      "info"
    );

    if (matchCount < this.minCount) {
      this.log(
        `Expected at least ${this.minCount} instances of ${
          this.name
        } : ${this.resolvedTypes.join(", ")}, found ${matchCount}`,
        "error"
      );
      this.addResult(
        "error",
        `Expected at least ${this.minCount} instances of ${
          this.name
        } : ${this.resolvedTypes.join(", ")}, found ${matchCount}`,
        "..."
      );
      return false;
    } else if (matchCount > this.maxCount) {
      this.log(
        `Expected at most ${
          this.maxCount
        } instances of ${this.resolvedTypes.join(", ")}, found ${matchCount}`,
        "error"
      );
      this.addResult(
        "error",
        `Expected at most ${
          this.maxCount
        } instances of ${this.resolvedTypes.join(", ")}, found ${matchCount}`
      );
      return false;
    } else {
      this.log(
        `Found ${matchCount} valid instances of ${this.resolvedTypes.join(
          ", "
        )} (expected between ${this.minCount} and ${this.maxCount})`,
        "info"
      );
      this.addResult(
        "success",
        `Found ${matchCount} valid instances of ${this.resolvedTypes.join(
          ", "
        )} (expected between ${this.minCount} and ${this.maxCount})`,
        "..."
      );
      return true;
    }
  }

  findPropertyRulesForClass() {
    // Check if there are @reverse domainIncludes references
    // Returns a list of RO-Crate entities - not actually rules
    if (
      this.entity &&
      this.entity["@reverse"] &&
      this.entity["@reverse"]["domainIncludes"]
    ) {
      return this.entity["@reverse"]["domainIncludes"];
    }
    return [];
  }
}

/**
 * PropertyRule - validates property constraints
 */
class PropertyRule extends Rule {
  constructor(entity, validator) {
    super(entity, validator);
    this.lastFailureReason = null;
    this.propertyName =
      asFirstString(entity["rdfs:label"]) || asFirstString(entity["name"]);
    this.minCount = entity["sh:minCount"] ? parseInt(entity["sh:minCount"]) : 0;
    this.maxCount = entity["sh:maxCount"]
      ? parseInt(entity["sh:maxCount"])
      : Number.MAX_SAFE_INTEGER;
    this.rangeIncludes =
      entity["rangeIncludes"] ||
      entity["http://schema.org/rangeIncludes"] ||
      [];
    this.allRules = validator.rules;
  }

  validate(entity) {
    this.lastFailureReason = null;
    if (!this.propertyName) {
      this.log(`Property rule ${this.id} does not have a name`, "warn");
      this.lastFailureReason = `property rule ${this.id} does not have a name`;
      this.addResult(
        "warning",
        `Property rule ${this.id} does not have a name`,
        entity["@id"]
      );
      return false;
    }
    const entityId = entity["@id"];
    let propertyValues = entity[this.propertyName];
    // Cast propertyValues to an array if it's not already
    if (propertyValues && !Array.isArray(propertyValues)) {
      propertyValues = [propertyValues];
    }
    this.log(
      `Validating property ${this.propertyName} with values ${JSON.stringify(
        propertyValues
      )} for entity ${entityId}`,
      "debug"
    );
    return this.validatePropertyConstraints(entity, propertyValues);
  }

  


  validatePropertyConstraints(entity, propertyValues) {
    const entityId = entity["@id"];

    // Check if required property is missing
    if (!propertyValues && this.minCount > 0) {
      this.lastFailureReason = `missing required property ${this.propertyName}`;
      this.log(
        `Entity ${entityId} is missing required property ${this.propertyName}`,
        "error"
      );
      this.addResult(
        "info",
        `Entity ${entityId} is missing required property ${this.propertyName}`,
        entity["@id"]
      );
      return false;
    }

    // If property doesn't exist but is not required, it's valid
    if (!propertyValues || propertyValues.length === 0) {
      this.log(
        `Property ${this.propertyName} not present in entity ${entityId} but not required`,
        "debug"
      );
      return true;
    }

    this.log(
      `Property ${this.propertyName} has ${propertyValues.length} values in entity ${entityId}`,
      "debug"
    );

    // Check min and max count constraints
    this.log(
      `Property ${this.propertyName} constraints: min=${this.minCount}, max=${
        this.maxCount || "unlimited"
      }`,
      "debug"
    );

    if (propertyValues.length < this.minCount) {
      this.lastFailureReason = `has ${propertyValues.length} value(s), requires at least ${this.minCount}`;
      this.log(
        `Entity ${entityId} has ${propertyValues.length} values for property ${this.propertyName}, but at least ${this.minCount} are required`,
        "error"
      );
      this.addResult(
        "info",
        `Entity ${entityId} has ${propertyValues.length} values for property ${this.propertyName}, but at least ${this.minCount} are required`,
        entity["@id"]
      );
      return false;
    }

    if (propertyValues.length > this.maxCount) {
      this.lastFailureReason = `has ${propertyValues.length} value(s), allows at most ${this.maxCount}`;
      this.log(
        `Entity ${entityId} has ${propertyValues.length} values for property ${this.propertyName}, but at most ${this.maxCount} are allowed`,
        "error"
      );
      this.addResult(
        "error",
        `Entity ${entityId} has ${propertyValues.length} values for property ${this.propertyName}, but at most ${this.maxCount} are allowed`
      );
      return false;
    }

    // Check the range constraints
    if (!this.rangeIncludes || this.rangeIncludes.length === 0) {
      this.log(
        `No range constraints for property ${this.propertyName}`,
        "debug"
      );
      return true;
    }

    const rangeValues = asArray(this.rangeIncludes);
    const propertyValueRanges = [];
    const nonPropertyValueRanges = [];

    for (const range of rangeValues) {
      const rangeId =
        typeof range === "object" && range !== null ? range["@id"] : range;
      const propertyValueRule = this.validator.rules.propertyValues?.[rangeId];
      if (propertyValueRule) {
        propertyValueRanges.push(propertyValueRule);
      } else {
        nonPropertyValueRanges.push(range);
      }
    }

    for (const propertyValueRule of propertyValueRanges) {
      const matchCount = propertyValues.filter((actualValue) => {
        return this.validator.matchesPropertyValueConstraint(
          actualValue,
          propertyValueRule
        );
      }).length;

      if (matchCount < propertyValueRule.minCount) {
        this.lastFailureReason = `value constraint ${propertyValueRule.id} requires at least ${propertyValueRule.minCount} match(es), found ${matchCount}`;
        this.addResult(
          "info",
          `Property "${this.propertyName}": ${this.lastFailureReason}`,
          entity["@id"]
        );
        return false;
      }

      if (matchCount > propertyValueRule.maxCount) {
        this.lastFailureReason = `value constraint ${propertyValueRule.id} allows at most ${propertyValueRule.maxCount} match(es), found ${matchCount}`;
        this.addResult(
          "info",
          `Property "${this.propertyName}": ${this.lastFailureReason}`,
          entity["@id"]
        );
        return false;
      }
    }

    if (nonPropertyValueRanges.length === 0) {
      this.log(
        `Property ${this.propertyName} in entity ${entityId} passed PropertyValue-only constraints`,
        "debug"
      );
      return true;
    }

    // Check each value against the range constraints
    for (const value of propertyValues) {
      const satisfiesPropertyValueConstraint = propertyValueRanges.some((propertyValueRule) => {
        return this.validator.matchesPropertyValueConstraint(
          value,
          propertyValueRule
        );
      });

      if (satisfiesPropertyValueConstraint) {
        continue;
      }

      this.log(
        `Validating value ${JSON.stringify(value)} against range constraints`,
        "debug"
      );
      const failReason = this.validator.validatePropertyValue(value, nonPropertyValueRanges);
        if (failReason !== null) {
        this.lastFailureReason = failReason;
        this.log(
          `Entity ${entityId} has an invalid value for property ${
            this.propertyName
          }: ${JSON.stringify(value)}`,
          "error"
        );
        this.addResult(
          "info",
          `Property "${this.propertyName}": ${failReason}`,
          entity["@id"]
        );
        return false;
      }
    }

    this.log(
      `Property ${this.propertyName} in entity ${entityId} is valid`,
      "debug"
    );
    return true;
  }
}

/**
 * ItemListRule - validates against enumerated lists
 */
class ItemListRule extends Rule {
  constructor(entity, validator) {
    super(entity, validator);
    this.itemListElements = entity["itemListElement"] || [];
  }

  validate(value) {
    for (const item of this.itemListElements) {
      if (this.matchesItem(value, item)) {
        this.log(
          `Value ${value["@id"]} matches an @id in item list ${this.id}`,
          "debug"
        );
        return true;
      }
    }

    this.log(
      `Value ${value["@id"]} does not match any @id in item list ${this.id}`,
      "debug"
    );
    return false;
  }

  matchesItem(value, item) {
    // Compare IDs properly
    if (item["@id"] === value["@id"]) {
      // Iterate through all properties of the item except @id
      for (const prop in item) {
        if (prop === "@id") continue;

        const actualValues = value[prop];

        // If property is missing entirely when required
        if (!actualValues || actualValues.length === 0) {
          this.log(
            `Value ${value["@id"]} is missing expected property ${prop}`,
            "error"
          );
          return false;
        }

        const expectedValues = item[prop];

        // Check each expected value
        for (const expectedVal of expectedValues) {
          let found = false;

          for (const actVal of actualValues) {
            // Handle objects with @id
            if (
              typeof expectedVal === "object" &&
              expectedVal["@id"] &&
              typeof actVal === "object" &&
              actVal["@id"]
            ) {
              if (expectedVal["@id"] === actVal["@id"]) {
                found = true;
                break;
              }
            }
            // Handle string/primitive values
            else if (expectedVal === actVal) {
              found = true;
              break;
            }
          }

          if (!found) {
            const expectedDisplay =
              typeof expectedVal === "object"
                ? JSON.stringify(expectedVal)
                : expectedVal;

            this.log(
              `Value for property ${prop} does not match expected value: ${expectedDisplay}`,
              "error"
            );
            return false;
          }
        }
      }

      this.log(
        `Value ${value["@id"]} matches item list ${this.id}`,
        "debug"
      );
      return true;
    }
    return false;
  }
}

/**
 * TermRule - validates defined term sets
 */
class TermRule extends Rule {
  constructor(entity, validator) {
    super(entity, validator);
    this.termSet = entity;
  }

  validate(targetCrate) {
    // Term validation logic would go here
    // For now, just return true as terms are primarily for documentation
    return true;
  }
}

class MaspValidator {
  constructor(profileCratePathOrObject) {
    this.profileCrate = null;
    this.profileCratePath = null;
    this.profileBaseUrl = null;
    this.clearResults();
    // Keep track of entities we've already validated to avoid circular validation
    this.validatedEntities = {}; // Will hold the validated entities and the rules they have been tested against already
    this.rulesDone = new Set();

    // Configure logging level - can be set to false to disable or true for verbose
    this.verbose = false;
    this.editorHints = {};

    // Rule collections
    this.rules = {
      classes: [],
      properties: [],
      itemLists: [],
      propertyValues: [],
      termSets: [],
    };

    // Handle both path string or direct ROCrate object
    if (typeof profileCratePathOrObject === "string") {
      this.profileCratePath = profileCratePathOrObject;
    } else if (isROCrateLike(profileCratePathOrObject)) {
      this.profileCrate = profileCratePathOrObject;
      this.log("SoSS+ profile loaded from provided object");
    } else {
      throw new Error(
        "Profile must be a path to a crate file or an ROCrate object"
      );
    }
    // Default target crate to profile crate so we can validate the profile itself
    this.targetCrate = this.profileCrate;
  }

  clearResults() {
    this.results = {
      error: [],
      success: [],
      rules: {},
      ruleFlags: {},
    };
  }

  /**
   * Helper method for logging with different verbosity levels
   * @param {string} message - Message to log
   * @param {string} level - Log level (debug, info, warn, error)
   */
  log(message, level = "info") {
    if (!this.verbose) return;

    const prefix =
      level === "debug"
        ? "🔍 DEBUG:"
        : level === "info"
        ? "📋 INFO:"
        : level === "warn"
        ? "⚠️ WARNING:"
        : level === "error"
        ? "❌ ERROR:"
        : "";

    this.log(`${prefix} ${message}`);
  }

  /**
   * Load the SoSS+ profile crate from path if not already loaded
   */
  loadProfileCrate() {
    // If already loaded, return true
    if (this.profileCrate) {
      return true;
    }

    try {
      this.log(`Loading SoSS+ profile from: ${this.profileCratePath}`);
      const crateJson = readJsonFileSync(this.profileCratePath);
      this.profileCrate = new ROCrate(crateJson, { array: true, link: true });
      this.log("SoSS+ profile loaded successfully");
      return true;
    } catch (error) {
      console.error(`Error loading SoSS+ profile: ${error.message}`);
      return false;
    }
  }

  /**
   * Parse profile crate entities into Rule objects
   */
  parseRules() {
    this.rules = {
      classes: {},
      properties: {},
      itemLists: {},
      propertyValues: {},
      termSets: {},
      ruleFlags: {},
    };

    const normalizeDescriptorParts = (resourceDescriptor) => {
      let parts = resourceDescriptor?.["hasPart"] || [];

      // Some generated crates persist hasPart as a JSON string.
      if (typeof parts === "string") {
        try {
          parts = JSON.parse(parts);
        } catch (error) {
          this.log(
            `Unable to parse hasPart for descriptor ${resourceDescriptor?.["@id"]}: ${error.message}`,
            "warn"
          );
          return [];
        }
      }

      const partArray = Array.isArray(parts) ? parts : [parts];
      return partArray
        .map((part) => {
          if (typeof part === "string") {
            return this.profileCrate.getEntity(part) || { "@id": part };
          }
          const partId =
            typeof part === "object" && part !== null ? part["@id"] : null;
          if (partId && (!part["@type"] || asArray(part["@type"]).length === 0)) {
            return this.profileCrate.getEntity(partId) || part;
          }
          return part;
        })
        .filter(Boolean);
    };
    
    const schemaEntities = () => {
      for (let entity of this.profileCrate.root.hasResource || []) {
        if (entity["@type"].includes("ResourceDescriptor") && (Array.isArray(entity["hasRole"]) ? entity["hasRole"] : entity["hasRole"] ? [entity["hasRole"]] : []).some(
        (role) => role["@id"] === "http://www.w3.org/ns/dx/prof/role/schema")) {
          return normalizeDescriptorParts(entity);
        }
      }
      return []; // Add fallback return
    };
    
    // Call the function to get the schema entities
    const entities = schemaEntities();
    
    
    for (let entity of entities) {
      if (!entity || typeof entity !== "object") {
        continue;
      }
      const types = entity["@type"] || [];

      if (types.includes("rdfs:Class")) {
        const classRule = new ClassRule(entity, this);
        this.rules.classes[classRule.id] = classRule;
      } else if (types.includes("rdf:Property")) {
        const propertyRule = new PropertyRule(entity, this);
        this.rules.properties[propertyRule.id] = propertyRule;
      } else if (types.includes("ItemList")) {
        const itemListRule = new ItemListRule(entity, this);
        this.rules.itemLists[itemListRule.id] = itemListRule;
      } else if (types.includes("PropertyValue")) {
        this.rules.propertyValues[entity["@id"]] = {
          id: entity["@id"],
          entity,
          value: asArray(entity["value"]),
          minCount: asFirstNumber(entity["sh:minCount"], 0),
          maxCount: asFirstNumber(entity["sh:maxCount"], Number.MAX_SAFE_INTEGER),
        };
      } else if (types.includes("DefinedTermSet")) {
        const definedTermSetRule = new TermRule(entity, this);
        this.rules.termSets[definedTermSetRule.id] = definedTermSetRule;
      }
    }
    
    // Now link property rules to their corresponding class rules
    
    for (let classRule of Object.values(this.rules.classes)) {
      classRule.propertyRules = classRule.findPropertyRulesForClass().map(pr => {
        // Find the corresponding PropertyRule object
       return this.rules.properties[pr["@id"]] || null;
      });  
    }

    this.rules.__rootRuleId = null;
    for (const propertyRule of Object.values(this.rules.properties)) {
      if (propertyRule.propertyName !== "@id") {
        continue;
      }
      const domain = propertyRule?.entity?.["domainIncludes"];
      const domains = Array.isArray(domain) ? domain : domain ? [domain] : [];
      const hasMetadataIdConstraint = this.propertyRuleHasLiteralValueConstraint(
        propertyRule,
        "ro-crate-metadata.json"
      );
      if (!hasMetadataIdConstraint || !domains.length) {
        continue;
      }

      const rootRuleId =
        typeof domains[0] === "object" && domains[0] !== null
          ? domains[0]["@id"]
          : domains[0];
      if (rootRuleId) {
        this.rules.__rootRuleId = rootRuleId;
        break;
      }
    }
    
    this.rules.rootClassRule = this.rules.classes[this.rules.__rootRuleId] || null;

    // Mark metadata-descriptor related rules so UI can suppress noisy candidate errors.
    if (this.rules.__rootRuleId) {
      this.rules.ruleFlags[this.rules.__rootRuleId] = {
        ...(this.rules.ruleFlags[this.rules.__rootRuleId] || {}),
        metadataDescriptorRule: true,
      };

      for (const propertyRule of Object.values(this.rules.properties)) {
        const domain = propertyRule?.entity?.["domainIncludes"];
        const domains = Array.isArray(domain) ? domain : domain ? [domain] : [];
        const inRootDomain = domains.some((d) => {
          const id = typeof d === "object" && d !== null ? d["@id"] : d;
          return id === this.rules.__rootRuleId;
        });

        if (!inRootDomain) {
          continue;
        }

        const isRootIdProperty =
          propertyRule.propertyName === "@id" &&
          this.propertyRuleHasLiteralValueConstraint(
            propertyRule,
            "ro-crate-metadata.json"
          );

        const isAboutProperty = propertyRule.propertyName === "about";
        const isConformsToProperty = propertyRule.propertyName === "conformsTo";

        if (isRootIdProperty || isAboutProperty || isConformsToProperty) {
          this.rules.ruleFlags[propertyRule.id] = {
            ...(this.rules.ruleFlags[propertyRule.id] || {}),
            metadataDescriptorRule: true,
          };
        }
      }
    }

    this.results.ruleFlags = { ...this.rules.ruleFlags };

    // After existing rules parsing, find enumerationValues
    this.rules.enumerationValues = {};
    for (let entity of this.profileCrate.root.hasResource || []) {
      if (
        entity["@type"] && entity["@type"].includes("ResourceDescriptor") &&
        (Array.isArray(entity["hasRole"]) ? entity["hasRole"] : entity["hasRole"] ? [entity["hasRole"]] : []).some(r => r["@id"] === "http://www.w3.org/ns/dx/prof/role/vocabulary")
      ) {
        for (const valueEntity of normalizeDescriptorParts(entity)) {
          const types = valueEntity["@type"] || [];
          const typeArr = Array.isArray(types) ? types : [types];
          for (const t of typeArr) {
            const tid = typeof t === "object" ? t["@id"] : t;
            if (!tid) continue;
            if (!this.rules.enumerationValues[tid]) this.rules.enumerationValues[tid] = [];
            this.rules.enumerationValues[tid].push(valueEntity);
          }
        }
        break;
      }
    }

    this.log(
      `Found ${
        Object.keys(this.rules.classes).length
      } class rules in the SoSS+ profile`
    );
    this.log(
      `Found ${
        Object.keys(this.rules.properties).length
      } property rules in the SoSS+ profile`
    );
    this.log(
      `Found ${
        Object.keys(this.rules.itemLists).length
      } item list rules in the SoSS+ profile`
    );
    this.log(
      `Found ${
        Object.keys(this.rules.propertyValues).length
      } property value rules in the SoSS+ profile`
    );
    this.log(
      `Found ${
        Object.keys(this.rules.termSets).length
      } term set rules in the SoSS+ profile`
    );
  }

  valuesEquivalent(actualValue, expectedValue) {
    const actualId =
      typeof actualValue === "object" && actualValue !== null
        ? actualValue["@id"]
        : undefined;
    const expectedId =
      typeof expectedValue === "object" && expectedValue !== null
        ? expectedValue["@id"]
        : undefined;

    if (actualId && expectedId) {
      return actualId === expectedId;
    }
    if (actualId && typeof expectedValue === "string") {
      return actualId === expectedValue;
    }
    if (expectedId && typeof actualValue === "string") {
      return expectedId === actualValue;
    }
    return actualValue === expectedValue;
  }

  propertyRuleHasLiteralValueConstraint(propertyRule, literal) {
    const ranges = asArray(propertyRule?.rangeIncludes);
    return ranges.some((rangeRef) => {
      const rangeId =
        typeof rangeRef === "object" && rangeRef !== null
          ? rangeRef["@id"]
          : rangeRef;
      const propertyValueRule = this.rules.propertyValues?.[rangeId];
      if (!propertyValueRule) {
        return false;
      }

      return asArray(propertyValueRule.value).some((value) => {
        return this.valuesEquivalent(value, literal);
      });
    });
  }

  parseRegexLiteral(value) {
    if (typeof value !== "string" || value.length < 2 || value[0] !== "/") {
      return null;
    }

    const lastSlash = value.lastIndexOf("/");
    if (lastSlash <= 0) {
      return null;
    }

    const pattern = value.slice(1, lastSlash);
    const flags = value.slice(lastSlash + 1);

    try {
      return new RegExp(pattern, flags);
    } catch (_error) {
      return null;
    }
  }

  matchesPropertyValueConstraint(actualValue, propertyValueRule) {
    const expectedValues = asArray(propertyValueRule?.value);
    if (expectedValues.length === 0) {
      return false;
    }

    const actualScalar =
      typeof actualValue === "object" && actualValue !== null && actualValue["@id"]
        ? actualValue["@id"]
        : actualValue;

    const regexValues = [];
    const literalValues = [];

    for (const expectedValue of expectedValues) {
      const parsedRegex = this.parseRegexLiteral(expectedValue);
      if (parsedRegex) {
        regexValues.push(parsedRegex);
      } else {
        literalValues.push(expectedValue);
      }
    }

    // When multiple regex strings are listed in one PropertyValue, require all to match.
    if (regexValues.length > 0) {
      if (typeof actualScalar !== "string") {
        return false;
      }
      for (const regex of regexValues) {
        if (!regex.test(actualScalar)) {
          return false;
        }
      }
    }

    if (literalValues.length === 0) {
      return regexValues.length > 0;
    }

    return literalValues.some((expectedValue) => {
      return (
        this.valuesEquivalent(actualValue, expectedValue) ||
        this.valuesEquivalent(actualScalar, expectedValue)
      );
    });
  }

  matchesProfileEntity(actualEntity, templateEntity) {
    if (!actualEntity || !templateEntity) {
      return false;
    }

    if (actualEntity["@id"] !== templateEntity["@id"]) {
      return false;
    }

    for (const prop of Object.keys(templateEntity)) {
      if (prop === "@id") {
        continue;
      }

      const actualValues = asArray(actualEntity[prop]);
      if (!actualValues.length) {
        return false;
      }

      const expectedValues = asArray(templateEntity[prop]);
      for (const expectedValue of expectedValues) {
        const found = actualValues.some((actualValue) =>
          this.valuesEquivalent(actualValue, expectedValue)
        );
        if (!found) {
          return false;
        }
      }
    }

    return true;
  }

  setEditorHints(editorHints = {}) {
    this.editorHints = editorHints || {};
    return this;
  }

  ensureParsed() {
    if (!this.profileCrate && !this.loadProfileCrate()) {
      throw new Error("Failed to load profile crate");
    }
    if (!this.rules || !this.rules.classes || Object.keys(this.rules.classes).length === 0) {
      this.parseRules();
    }
  }

  getProfileMetadata() {
    const root = this.profileCrate?.root || {};
    const metadata = this.editorHints.metadata || {};
    return {
      name: metadata.name || root.name || "Unnamed profile",
      description: metadata.description || root.description || "",
      version: metadata.version || root.version || "",
      author: metadata.author || root.author || "",
      license: metadata.license || root.license || ""
    };
  }

  getEnabledClasses() {
    this.ensureParsed();
    if (Array.isArray(this.editorHints.enabledClasses) && this.editorHints.enabledClasses.length) {
      return this.editorHints.enabledClasses;
    }
    return Object.values(this.rules.classes)
      .map((rule) => this.getTypeLabelForClassRule(rule))
      .filter(Boolean)
      .sort();
  }

  getRootDatasetTypes() {
    if (Array.isArray(this.editorHints.rootDataset?.type)) {
      return this.editorHints.rootDataset.type;
    }
    this.ensureParsed();
    const rootClass = this.rules.rootClassRule;
    if (!rootClass) {
      return [];
    }
    return rootClass.resolvedTypes.map((typeId) => this.getCompactLabel(typeId));
  }

  resolveProfileEntityUri(entityId) {
    if (!entityId) {
      return null;
    }
    if (/^https?:\/\//i.test(entityId)) {
      return entityId;
    }
    if (this.profileBaseUrl) {
      try {
        return new URL(entityId, this.profileBaseUrl).toString();
      } catch (_error) {
        // Fall through to unresolved relative ID handling below.
      }
    }
    return null;
  }

  getProfileConformsToEntity() {
    this.ensureParsed();

    // Prefer Profile entities explicitly listed by the conformance-indicators descriptor.
    for (const indicatorUri of this.getConformanceIndicatorUris()) {
      const candidate = this.findEntityByIdOrResolvedId(indicatorUri);
      if (candidate && asArray(candidate["@type"]).includes("Profile")) {
        return candidate;
      }
    }

    // Prefer a Profile entity listed as a supported conformsTo value.
    for (const itemListRule of Object.values(this.rules.itemLists || {})) {
      const itemList = itemListRule?.entity || {};
      const itemListId = String(itemList["@id"] || "");
      const itemListName = String(asFirstString(itemList.name) || "");
      const looksLikeConformsToList =
        itemListId.toLowerCase().includes("conformsto") ||
        itemListName.toLowerCase().includes("conformsto");

      if (!looksLikeConformsToList) {
        continue;
      }

      for (const element of asArray(itemList.itemListElement)) {
        const elementId =
          typeof element === "string" ? element : element?.["@id"];
        if (!elementId) {
          continue;
        }
        const candidate = this.profileCrate.getEntity(elementId);
        if (candidate && asArray(candidate["@type"]).includes("Profile")) {
          return candidate;
        }
      }
    }

    // Fallback to profile crate root if it is explicitly typed as Profile.
    const root = this.profileCrate?.root;
    if (root && asArray(root["@type"]).includes("Profile")) {
      return root;
    }

    // Last resort: first Profile entity in the crate graph.
    for (const entity of this.profileCrate?.entities?.() || []) {
      if (entity && asArray(entity["@type"]).includes("Profile")) {
        return entity;
      }
    }

    return null;
  }

  getConformanceIndicatorUris() {
    this.ensureParsed();

    const uris = [];
    const descriptors = [];
    for (const entity of this.profileCrate?.entities?.() || []) {
      if (!entity) {
        continue;
      }
      const types = asArray(entity["@type"]);
      if (!types.includes("ResourceDescriptor")) {
        continue;
      }

      const roleIds = asArray(entity.hasRole)
        .map((role) => (typeof role === "string" ? role : role?.["@id"]))
        .filter(Boolean);
      if (roleIds.some((roleId) => CONFORMANCE_INDICATOR_ROLE_URIS.has(roleId))) {
        descriptors.push(entity);
      }
    }

    for (const descriptor of descriptors) {
      for (const artifactRef of asArray(descriptor.hasArtifact)) {
        const artifactId =
          typeof artifactRef === "string" ? artifactRef : artifactRef?.["@id"];
        if (!artifactId) {
          continue;
        }

        const artifactEntity = this.profileCrate.getEntity(artifactId);
        if (artifactEntity && asArray(artifactEntity["@type"]).includes("ItemList")) {
          for (const listEntry of asArray(artifactEntity.itemListElement)) {
            const entryId =
              typeof listEntry === "string" ? listEntry : listEntry?.["@id"];
            if (!entryId) {
              continue;
            }
            const resolvedEntryId = this.resolveProfileEntityUri(entryId) || entryId;
            if (!uris.includes(resolvedEntryId)) {
              uris.push(resolvedEntryId);
            }
          }
          continue;
        }

        const resolvedArtifactId = this.resolveProfileEntityUri(artifactId) || artifactId;
        if (!uris.includes(resolvedArtifactId)) {
          uris.push(resolvedArtifactId);
        }
      }
    }

    return uris;
  }

  findEntityByIdOrResolvedId(id) {
    if (!id || !this.profileCrate) {
      return null;
    }

    const direct = this.profileCrate.getEntity(id);
    if (direct) {
      return direct;
    }

    for (const entity of this.profileCrate.entities()) {
      const resolvedId = this.resolveProfileEntityUri(entity?.["@id"]);
      if (resolvedId && resolvedId === id) {
        return entity;
      }
    }

    return null;
  }

  getConformsToUris() {
    const uris = [...this.getConformanceIndicatorUris()];

    if (!uris.length) {
      const profileUri = this.getProfileUri();
      if (profileUri) {
        uris.push(profileUri);
      }
    }

    // Keep configured URIs as secondary aliases for matching/backward compatibility.
    for (const uri of asArray(this.editorHints.conformsToUri)) {
      if (typeof uri === "string" && uri && !uris.includes(uri)) {
        uris.push(uri);
      }
    }

    return uris;
  }

  /**
   * Set a base URL used to resolve relative root-entity @id values (e.g. "./" → absolute URL).
   * Call this when the profile crate was fetched from a known HTTP URL.
   * @param {string} url - The URL the profile crate was loaded from (e.g. the ro-crate-metadata.json URL)
   * @returns {this}
   */
  setProfileBaseUrl(url) {
    this.profileBaseUrl = url || null;
    return this;
  }

  /**
   * Return the absolute URI of this profile, derived from the profile crate root entity's @id.
   * Returns null if the @id is relative and no base URL has been set via setProfileBaseUrl().
   * @returns {string|null}
   */
  getProfileUri() {
    const conformanceIndicatorUris = this.getConformanceIndicatorUris();
    if (conformanceIndicatorUris.length) {
      return conformanceIndicatorUris[0];
    }

    const profileEntity = this.getProfileConformsToEntity();
    const profileEntityId = profileEntity?.["@id"];
    const resolvedProfileEntityId = this.resolveProfileEntityUri(profileEntityId);
    if (resolvedProfileEntityId) {
      return resolvedProfileEntityId;
    }

    if (this.profileCrate) {
      const rootId = this.profileCrate.root?.['@id'];
      const resolvedRootId = this.resolveProfileEntityUri(rootId);
      if (resolvedRootId) {
        return resolvedRootId;
      }
    }
    return null;
  }

  /**
   * Return a contextual entity object for the profile root entity.
   * @returns {{"@id": string, "@type": string|string[], name?: string, url?: string}|null}
   */
  getProfileEntity() {
    const profileEntity = this.getProfileConformsToEntity() || this.profileCrate?.root;
    if (!profileEntity || !profileEntity["@id"]) {
      return null;
    }

    const profileUri =
      this.resolveProfileEntityUri(profileEntity["@id"]) ||
      this.getProfileUri() ||
      profileEntity["@id"];

    return {
      "@id": profileUri,
      "@type": profileEntity["@type"] || ["Profile"],
      name: profileEntity.name,
      url: profileEntity.url,
    };
  }

  getPropertyGroups() {
    return this.editorHints.propertyGroups || [];
  }

  getLookups() {
    return this.editorHints.lookup || this.editorHints.lookups || {};
  }

  getClassDefinition(type) {
    const classRule = this.getClassRuleForType(type);
    if (!classRule) {
      return null;
    }
    return {
      id: classRule.id,
      name: this.getTypeLabelForClassRule(classRule),
      inputs: this.getDefinitionsForType(type),
      hasSubclass: this.getSubclasses(type)
    };
  }

  getDefinitionsForType(type) {
    this.ensureParsed();
    const classRule = this.getClassRuleForType(type);
    if (!classRule) {
      return [];
    }

    const { own, inherited } = this.inheritedPropertyRules(classRule.id);
    const definitions = [];
    const seen = new Set();
    for (const inheritedRules of Object.values(inherited)) {
      for (const rule of inheritedRules) {
        if (!seen.has(rule.id)) {
          definitions.push(this.toEditorDefinition(rule));
          seen.add(rule.id);
        }
      }
    }
    for (const rule of own) {
      if (!seen.has(rule.id)) {
        definitions.push(this.toEditorDefinition(rule));
        seen.add(rule.id);
      }
    }
    return definitions;
  }

  getSubclasses(type) {
    this.ensureParsed();
    const classRule = this.getClassRuleForType(type);
    if (!classRule) {
      return [];
    }
    return Object.values(this.rules.classes)
      .filter((candidate) => candidate.id !== classRule.id)
      .filter((candidate) => this.ancestorClassIds(candidate.id).includes(classRule.id))
      .map((candidate) => this.getTypeLabelForClassRule(candidate))
      .filter(Boolean)
      .sort();
  }

  getClassRuleForType(type) {
    this.ensureParsed();
    const safeType = asFirstString(type, type);
    const resolvedType = this.profileCrate.resolveTerm(safeType) || safeType;
    return Object.values(this.rules.classes).find((rule) => {
      return rule.resolvedTypes.includes(resolvedType) || this.getTypeLabelForClassRule(rule) === safeType;
    }) || null;
  }

  getTypeLabelForClassRule(classRule) {
    if (!classRule) {
      return null;
    }
    const specialized = asArray(classRule.entity["prov:specializationOf"])[0];
    const specializedId = typeof specialized === "object" && specialized !== null ? specialized["@id"] : specialized;
    return (
      asFirstString(classRule.entity.name) ||
      asFirstString(classRule.entity["rdfs:label"]) ||
      this.getCompactLabel(specializedId) ||
      classRule.id
    );
  }

  getCompactLabel(typeId) {
    if (!typeId) {
      return null;
    }
    const fromContext = this.profileCrate?.getTerm?.(typeId);
    if (fromContext) {
      return fromContext;
    }
    return String(typeId).split(/[\/#:]/).pop();
  }

  toEditorDefinition(propertyRule) {
    const entity = propertyRule.entity;
    const propertyGroups = entity.propertyGroups || entity.propertyGroup || [];
    const hasPropertyValueConstraint = asArray(propertyRule.rangeIncludes).some(
      (range) => {
        const rangeId =
          typeof range === "object" && range !== null ? range["@id"] : range;
        return !!this.rules.propertyValues[rangeId];
      }
    );
    const types = asArray(propertyRule.rangeIncludes).map((range) => {
      const rangeId = typeof range === "object" && range !== null ? range["@id"] : range;
      const rangeClassRule = this.rules.classes[rangeId];
      if (rangeClassRule) {
        return this.getTypeLabelForClassRule(rangeClassRule);
      }
      const rangeEntity = this.profileCrate.getEntity(rangeId);
      if (rangeEntity?.name || rangeEntity?.["rdfs:label"]) {
        return asFirstString(rangeEntity.name) || asFirstString(rangeEntity["rdfs:label"]);
      }
      return this.getCompactLabel(rangeId);
    }).filter(Boolean);

    return {
      id: propertyRule.id,
      name: propertyRule.propertyName,
      help: asFirstString(propertyRule.description),
      multiple: propertyRule.maxCount !== 1,
      required: propertyRule.minCount > 0,
      type: hasPropertyValueConstraint ? ["Value"] : (types.length ? types : ["Text"]),
      values: this.getEditorValuesForProperty(propertyRule),
      propertyGroups: Array.isArray(propertyGroups) ? propertyGroups : [propertyGroups]
    };
  }

  getEditorValuesForProperty(propertyRule) {
    const values = [];
    for (const range of asArray(propertyRule.rangeIncludes)) {
      const rangeId = typeof range === "object" && range !== null ? range["@id"] : range;
      if (this.rules.propertyValues[rangeId]) {
        values.push(...asArray(this.rules.propertyValues[rangeId].value));
      }
      if (this.rules.itemLists[rangeId]) {
        values.push(...asArray(this.rules.itemLists[rangeId].itemList?.itemListElement));
      }
      if (this.rules.enumerationValues?.[rangeId]) {
        values.push(...this.rules.enumerationValues[rangeId]);
      }
    }
    return values;
  }


  /**
   * Return the immediate parent class IDs for a given class ID,
   * by reading rdfs:subClassOf from the loaded profile crate.
   * @param {string} classId
   * @returns {string[]}
   */
  getParentClassIds(classId) {
    const entity = this.profileCrate.getEntity(classId);
    if (!entity) return [];
    const raw = entity["rdfs:subClassOf"];
    if (!raw) return [];
    return (Array.isArray(raw) ? raw : [raw])
      .map((s) => (typeof s === "object" && s !== null ? s["@id"] : s))
      .filter(Boolean);
  }

  /**
   * Return all ancestor paths from classId up to root classes.
   * Each path is an array of class IDs starting with the immediate parent
   * and ending at a root (a class with no rdfs:subClassOf in this crate).
   * Multiple paths arise when a class has multiple parents.
   *
   * Example: parentClasses("https://schema.org/NewsArticle")
   *   → [["https://schema.org/Article", "https://schema.org/CreativeWork", "https://schema.org/Thing"]]
   *
   * @param {string} classId
   * @param {Set} [_visited] - internal cycle guard, do not pass
   * @returns {string[][]}
   */
  parentClasses(classId, _visited = new Set()) {
    if (_visited.has(classId)) return [];
    const visited = new Set(_visited);
    visited.add(classId);

    const parents = this.getParentClassIds(classId);
    if (parents.length === 0) return [[]];

    const paths = [];
    for (const parentId of parents) {
      const subPaths = this.parentClasses(parentId, visited);
      for (const subPath of subPaths) {
        paths.push([parentId, ...subPath]);
      }
    }
    return paths;
  }

  /**
   * Return a flat, deduplicated list of all ancestor class IDs.
   * @param {string} classId
   * @returns {string[]}
   */
  ancestorClassIds(classId) {
    return [...new Set(this.parentClasses(classId).flat())];
  }

  /**
   * Returns true if classId is schema:Enumeration itself or (transitively) a subclass of it.
   * Uses the profileCrate to walk rdfs:subClassOf.
   * @param {string} classId
   * @returns {boolean}
   */
  isEnumerationClass(classId) {
    const ENUM_ID = "https://schema.org/Enumeration";
    if (classId === ENUM_ID) return true;
    return this.ancestorClassIds(classId).includes(ENUM_ID);
  }

  /**
   * Returns all entities in the profileCrate whose @type includes classId.
   * Used to find the allowed values of an enumeration class.
   * @param {string} classId
   * @returns {Object[]}
   */
  getEnumerationValues(classId) {
    const values = [];
    for (const entity of this.profileCrate.entities()) {
      const types = entity["@type"] || [];
      const typeArr = Array.isArray(types) ? types : [types];
      if (typeArr.some(t => (typeof t === "object" ? t["@id"] : t) === classId)) {
        values.push(entity);
      }
    }
    return values;
  }

  /**
   * Return property rules applicable to a class through the full inheritance hierarchy.
   * Must be called after parseRules().
   *
   * @param {string} classId
   * @returns {{ own: PropertyRule[], inherited: Object.<string, PropertyRule[]> }}
   *   own       – property rules whose domainIncludes points directly at classId
   *   inherited – map of ancestor class ID → property rules from that ancestor
   */
  inheritedPropertyRules(classId) {
    const propsForClass = (id) =>
      Object.values(this.rules.properties).filter((pr) => {
        const domain = pr.entity["domainIncludes"];
        if (!domain) return false;
        return (Array.isArray(domain) ? domain : [domain]).some((d) => {
          const did =
            typeof d === "object" && d !== null ? d["@id"] : d;
          return did === id;
        });
      });

    const own = propsForClass(classId);

    const inherited = {};
    for (const ancestorId of this.ancestorClassIds(classId)) {
      const props = propsForClass(ancestorId);
      if (props.length > 0) inherited[ancestorId] = props;
    }

    return { own, inherited };
  }

  /**
   * Validate a target crate against the SoSS+ profile
   * @param {ROCrate|string} targetCrate - The target crate object or path to validate
   */
  async validateCrate(targetCrate) {
    this.targetCrate = targetCrate;
    await this.targetCrate.resolveContext();
    try {
      let crate;
      // Handle different input types
      if (typeof targetCrate === "string") {
        // If a string is provided, treat as a file path
        this.log(`Loading target crate from path: ${targetCrate}`);
        const targetJson = readJsonFileSync(targetCrate);
        crate = new ROCrate(targetJson, { array: true, link: true });
        this.log("Target crate loaded successfully from path");
      } else if (isROCrateLike(targetCrate)) {
        // If an ROCrate object is provided, use it directly
        crate = targetCrate;
        this.log("Using provided target crate object");
      } else {
        throw new Error("Target crate must be a path or an ROCrate object");
      }

      // Ensure the profile crate is loaded
      if (!this.profileCrate && !this.loadProfileCrate()) {
        throw new Error("Failed to load profile crate");
      }

      // Reset validation state
      this.validatedEntities = {};
      this.rulesDone.clear();
      this.clearResults();

      // Parse rules from profile crate
      this.parseRules();

      // Validate the target crate against the SoSS+ profile
      this.validateTargetCrateGraph(crate);

      return this.results;
    } catch (error) {
      console.error(`Validation error: ${error.message}`);
      this.addResult(
        "error",
        `Validation failed: ${error.message}`,
        "exception"
      );
      return this.results;
    }
  }

  /**
   * Validate the target crate graph against the SoSS+ profile using Rule objects
   */
  validateTargetCrateGraph(targetCrate) {
    // Process all class rules
    for (const classRule of Object.values(this.rules.classes)) {
      classRule.validate(targetCrate);
    }
  }

  /**
   * Extract types from specializationOf property
   * @param {Object|Array|string} specializationOf - The specializationOf property value
   * @returns {Array} Array of type strings
   */
  extractTypes(specializationOf) {
    if (!specializationOf) {
      return [];
    }

    if (Array.isArray(specializationOf)) {
      return specializationOf.map((s) =>
        typeof s === "object" ? s["@id"] : s
      );
    } else if (typeof specializationOf === "object") {
      return [specializationOf["@id"]];
    } else {
      return [specializationOf];
    }
  }

  
  /**
   * Validate an entity against a class rule
   * @param {Object} entity - The entity to validate
   * @param {ClassRule} classRule - The class rule to validate against
   * @returns {boolean} True if validation passes
   */
  validateEntity(entity, classRule) {
    const entityId = entity["@id"];
    


    // Check if this entity has already been validated against this class rule
    this.log(
      `Checking if entity ${entityId} has already been validated against class rule ${classRule.id} -- ${this.validatedEntities[entityId]}`,
      "debug"
    );
    if (
      this.validatedEntities[entityId] &&
      classRule.id in this.validatedEntities[entityId]
    ) {
      this.log(
        `Entity ${entityId} has ***** ALREADY ******* been validated against class rule ${classRule.id}`,
        "debug"
      );
      return this.validatedEntities[entityId][classRule.id];
    } else {
      this.validatedEntities[entityId] = this.validatedEntities[entityId] || {};
    }

    let isValid = true;

    this.log(
      `Checking class rule: ${classRule.name} for entity ${entityId} -types ${entity["@type"].join(", ")} with required types: ${classRule.resolvedTypes.join(", ")}`,
      "debug"
    );

    if (classRule.validateEntityTypes(entity)) {
      this.log(
        `Entity ${entityId} matches required types ${classRule.resolvedTypes.join(
          ", "
        )} for rule ${classRule.name}`
      );
    } else {
      this.log(
        `Entity ${entityId} does not match required types`
      )
      return false;
    }

    // Check for properties that reference this class via rangeIncludes
    const propertyRules = classRule.findPropertyRulesForClass();
    this.log(
      `Found ${propertyRules.length} property rules for class ${classRule.name}`,
      "debug"
    );

    for (const propertyRuleEntity of propertyRules) {
      const propertyRule = new PropertyRule(propertyRuleEntity, this);
      const propName = propertyRule.name;

      this.log(
        `Validating property rule: ${propName} for entity ${entityId}`,
        "debug"
      );

      // Validate each property rule against this entity
      if (!propertyRule.validate(entity)) {
        isValid = false;
        const reason = propertyRule.lastFailureReason || "no detailed reason captured";
        const reasonSuffix = ` (${reason})`;

        classRule.addResult(
          "property-errors",
          `Property "${propName}" validation failed for entity ${entityId}${reasonSuffix}`,
          entity["@id"]
        );
      } else {
        classRule.addResult(
          "property-success",
          `Property "${propName}" validation succeeded for entity ${entityId}`,
          entity["@id"]
        );
      }
    }

    this.log(
      `Entity ${entityId} validation result: ${isValid ? "valid" : "invalid"}`,
      "info"
    );
    this.validatedEntities[entityId][classRule.id] = isValid;

    return isValid;
  }

  // Function to look through all the class rules and see if one matches this entity


  /**
   * Validate a property value against range constraints
   * @param {any} value - The property value to validate
   * @param {Array} rangeArray - Array of range constraint entities
   * @returns {null} null if validation passes, or a string describing the failure reason
   */
  validatePropertyValue(value, rangeArray) {
    // If value is an object with @id, it's a reference to another entity
    // Validate the value (from the target crate) against the range constraints
    const rangeDesc = rangeArray.map(r => r["@id"] || String(r)).join(', ');
    const valueDesc = typeof value === 'object' ? (value['@id'] || JSON.stringify(value)) : String(value);

    for (const range of rangeArray)  {
      this.log(`Checking range constraint: ${JSON.stringify(range)}`, "debug");
      // Check if range if the thing we are referencing is an object with @id
      if (typeof value === "object" && value["@id"]) {
        const referencedClassRule = this.rules.classes[range["@id"]];
        const referencedItemListRule = this.rules.itemLists[range["@id"]];

        const referencedEntity = this.targetCrate.getEntity(value["@id"]);
        if (!referencedEntity) {
          this.log(`Referenced entity ${value["@id"]} not found in target crate`, "warn");
          continue;
        }

        // Check if the range is an enumeration class — value must be one of its known instances
        if (this.isEnumerationClass(range["@id"])) {
          const enumVals = this.rules.enumerationValues[range["@id"]] || this.getEnumerationValues(range["@id"]);
          const valueId = typeof value === "object" ? value["@id"] : value;
          if (enumVals.some(v => v["@id"] === valueId)) return null;
        }
        if (referencedClassRule) {
          this.log(`Found referenced entity ${value["@id"]} in target crate`, "debug");
          this.log(`Validating referenced entity ${value["@id"]} against class rules`, "debug");
          if (this.validateEntity(referencedEntity, referencedClassRule)) { return null; }
          const entityTypeDesc = [].concat(referencedEntity["@type"] || []).join(', ');
          this.log(`Referenced entity ${value["@id"]} (types: ${entityTypeDesc}) failed validation against class rule ${referencedClassRule.id} (expected types: ${referencedClassRule.resolvedTypes.join(', ')})`, "warn");
        } else if (referencedItemListRule) {
          this.log(`Validating referenced entity ${value["@id"]} against item list using rule ${referencedItemListRule.id}`, "debug");
          if (referencedItemListRule.validate(value)) { return null; }
        } else {
          this.log(`No class rules found for referenced entity ${value["@id"]}`, "warn");
          const templateEntity = this.profileCrate.getEntity(range["@id"]);
          if (templateEntity && this.matchesProfileEntity(referencedEntity, templateEntity)) {
            this.log(
              `Referenced entity ${value["@id"]} matches profile entity template ${range["@id"]}`,
              "debug"
            );
            return null;
          }
        }
      } else {
        // Handle primitive type checks
        const rawRangeId = typeof range === "object" ? range["@id"] : range;
        const rangeId = this.targetCrate.resolveTerm(rawRangeId) || rawRangeId;
        const normalizedRangeId = String(rangeId || "").replace(/^https:/, "http:");
        const normalizedRawRangeId = String(rawRangeId || "").replace(/^https:/, "http:");
        const isSchemaType = (typeName) => {
          const expectedUrl = `http://schema.org/${typeName}`;
          return (
            normalizedRangeId === expectedUrl ||
            normalizedRawRangeId === expectedUrl ||
            normalizedRangeId === typeName ||
            normalizedRawRangeId === typeName
          );
        };
        const valueType = typeof value;
        if (isSchemaType("Text") && valueType === "string") {
          this.log(`Value ${value} is valid as http://schema.org/Text`, "debug");
          return null;
        } else if (
          isSchemaType("Integer") &&
          this.isValidInteger(value)
        ) {
          this.log(`Value ${value} is valid as http://schema.org/Integer`, "debug");
          return null;
        } else if (
          isSchemaType("Number") &&
          (valueType === "number" || !isNaN(Number(value)))
        ) {
          this.log(`Value ${value} is valid as http://schema.org/Number`, "debug");
          return null;
        } else if (
          isSchemaType("Boolean") &&
          valueType === "boolean"
        ) {
          this.log(`Value ${value} is valid as http://schema.org/Boolean`, "debug");
          return null;
        } else if (
          (isSchemaType("Date") || isSchemaType("DateTime")) &&
          this.isValidDate(value)
        ) {
          this.log(`Value ${value} is valid as http://schema.org/Date`, "debug");
          return null;
        }
      }
    }
    this.log(`Value ${JSON.stringify(value)} did not match any range constraints`, "debug");

    // Build a specific failure reason
    if (typeof value === "object" && value["@id"]) {
      const referencedEntity = this.targetCrate.getEntity(value["@id"]);
      if (!referencedEntity) {
        return `value "${valueDesc}" references an entity that does not exist in the crate`;
      }
      const entityTypeDesc = [].concat(referencedEntity["@type"] || []).join(', ');
      return `value "${valueDesc}" (types: ${entityTypeDesc || 'none'}) did not match any of the expected ranges: ${rangeDesc}`;
    }
    return `value "${valueDesc}" did not match any of the expected ranges: ${rangeDesc}`;
  }

  isValidInteger(value) {
    if (typeof value === "number") {
      return Number.isInteger(value);
    }

    if (typeof value !== "string") {
      return false;
    }

    let normalized = value.trim();
    if (!normalized) {
      return false;
    }

    if (
      (normalized.startsWith('"') && normalized.endsWith('"')) ||
      (normalized.startsWith("'") && normalized.endsWith("'"))
    ) {
      normalized = normalized.slice(1, -1).trim();
    }

    return /^[+-]?\d+$/.test(normalized);
  }

  /**
   * Check if a string is a valid date
   * @param {string} dateString - The date string to check
   * @returns {boolean} True if string is a valid date
   */
  isValidDate(dateValue) {
    let dateString = dateValue;

    // Accept numeric years (for example 2024 in JSON) as valid ISO year values.
    if (typeof dateString === "number" && Number.isFinite(dateString)) {
      dateString = String(dateString);
    }

    if (typeof dateString !== "string") {
      return false;
    }

    dateString = dateString.trim();

    // Some import paths may produce quoted scalar text (e.g. '"2024"').
    if (
      (dateString.startsWith('"') && dateString.endsWith('"')) ||
      (dateString.startsWith("'") && dateString.endsWith("'"))
    ) {
      dateString = dateString.slice(1, -1).trim();
    }

    // Check for ISO 8601 date format (flexible: year, year-month, full date, with optional time)
    // Accepts: YYYY, YYYY-MM, YYYY-MM-DD, with optional time (T HH:MM:SS.mmm[Z|±HH:MM])
    return /^\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/.test(
      dateString
    );
  }

  /**
   * Add a validation result
   * @param {string} level - 'error', 'success', 'warning', or 'info'
   * @param {string} message - The validation message
   */
  addResult(level, message, ruleId, entityId) {
    if (level === "error") {
      this.results["error"].push({
        message: message,
        rule: ruleId,
        entity: entityId,
      });
    } else if (level === "success") {
      this.results["success"].push({
        message: message,
        rule: ruleId,
      });
    } else {
      entityId = entityId || "...";
      if (!this.results.rules[ruleId]) {
        this.results.rules[ruleId] = {};
      }
      this.results.rules[ruleId][entityId] =
        this.results.rules[ruleId][entityId] || {};
      this.results.rules[ruleId][entityId][level] =
        this.results.rules[ruleId][entityId][level] || [];
      this.results.rules[ruleId][entityId][level].push({
        message: message,
      });
    }
  }
}

// Export the validator and rule classes
module.exports = {
  MaspValidator,
  SossValidator: MaspValidator, // backwards-compat alias
  Rule,
  ClassRule,
  PropertyRule,
  ItemListRule,
  TermRule
};

// If run directly from command line
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error(
      "Usage: node masp-validator.js <profile-crate-path> <target-crate-path>"
    );
    process.exit(1);
  }

  const profilePath = args[0];
  const targetPath = args[1];

  const validator = new MaspValidator(profilePath);
  if (validator.loadProfileCrate()) {
    validator
      .validateCrate(targetPath)
      .then((results) => {
        this.log("\nValidation complete.");
        if (results.error.length > 0) {
          this.log(`\nErrors (${results.error.length}):`);
          results.error.forEach((err) => this.log(`- ${err.message}`));
        }
        if (results.success.length > 0) {
          this.log(`\nSuccess (${results.success.length}):`);
          results.success.forEach((success) =>
            this.log(`- ${success.message}`)
          );
        }
      })
      .catch((error) => {
        console.error("Validation failed:", error);
        process.exit(1);
      });
  } else {
    console.error("Failed to load profile crate.");
    process.exit(1);
  }
}
