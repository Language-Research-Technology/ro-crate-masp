#!/usr/bin/env node
/**
 * validate-crate.js
 * Command-line tool to validate an RO-Crate against a profile crate using SoSS+ validation.
 * Usage:
 *   node validate-crate.js <target-crate.json> <profile-crate.json>
 */
const fs = require('fs');
const { ROCrate } = require('ro-crate');
const { SossValidator } = require('./lib/soss-validator');

function printUsageAndExit() {
  console.log('Usage: node validate-crate.js <target-crate.json> <profile-crate.json>');
  process.exit(1);
}

async function main() {

  // Support: node validate-crate.js [--json] <target-crate.json> <profile-crate.json>
  let args = process.argv.slice(2);
  let printJson = false;
  if (args[0] === '--json') {
    printJson = true;
    args = args.slice(1);
  }
  const [targetPath, profilePath] = args;
  if (!targetPath || !profilePath) printUsageAndExit();

  try {
    const targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
    const targetCrate = new ROCrate(targetData, { array: true, link: true });
    const profileCrate = new ROCrate(profileData, { array: true, link: true });
    const validator = new SossValidator(profileCrate);
    const results = await validator.validateCrate(targetCrate);
    const errors = results && results.error ? results.error : [];
    if (printJson) {
      console.log(JSON.stringify(results, null, 2));
    }
    if (errors.length > 0) {
      errors.forEach(e => {
        const level = e.level || e.severity || 'error';
        console.log(`[${level.toUpperCase()}] ${e.message}`);
      });
      process.exit(2);
    } else {
      if (!printJson) {
        console.log('Validation passed: No issues found.');
      }
      process.exit(0);
    }
  } catch (err) {
    console.error('Validation failed:', err.message);
    process.exit(1);
  }
}

main();
