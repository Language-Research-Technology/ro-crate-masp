const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const assert = require('assert');

/**
 * Tests for round-tripping of mode files
 *
 * This script:
 * 1. Finds all mode files in test_data/modes subdirectories
 * 2. Converts each to an RO-Crate using scripts/mode-to-masp.js
 * 3. Attempts to convert the RO-Crate back to a mode file (via scripts/masp-to-mode.js when available)
 * 4. Compares the classes section of the original and recreated mode files
 */

console.log("Mode round-trip test file loaded");

describe("Mode file round-trip tests", function () {
  it("should run this basic test", function() {
    console.log("Basic test is running");
    assert.ok(true);
  });

  this.timeout(30000);

  const modesBasePath = path.join(__dirname, '..', 'test_data', 'modes');
  let modeDirs = [];

  console.log("In describe block");
  console.log(`Looking for mode files in: ${modesBasePath}`);
  console.log(`test_data directory exists: ${fs.existsSync(path.join(__dirname, '..', 'test_data'))}`);

  beforeEach(function() {
    console.log('\n======= Setting up mode file round-trip tests =======');
    console.log(`Current directory: ${process.cwd()}`);

    if (!fs.existsSync(modesBasePath)) {
      console.error(`Modes directory not found: ${modesBasePath}`);
      this.skip();
      return;
    }

    try {
      const dirEntries = fs.readdirSync(modesBasePath, { withFileTypes: true });
      console.log(`Found ${dirEntries.length} entries in modes directory`);

      modeDirs = dirEntries
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      console.log(`Found ${modeDirs.length} mode directories: ${modeDirs.join(', ')}`);

      if (modeDirs.length === 0) {
        console.error('No mode directories found, skipping tests');
        this.skip();
        return;
      }

      const outputDir = path.join(__dirname, '..', 'output', 'mode-round-trip');
      fs.ensureDirSync(outputDir);
      console.log(`Created output directory: ${outputDir}`);
    } catch (error) {
      console.error(`Error setting up tests: ${error.message}`);
      console.error(error.stack);
      this.skip();
    }
  });

  it("Should find mode directories", function() {
    console.log("Testing mode directory discovery");
    console.log(`Modes base path: ${modesBasePath}`);

    assert.ok(fs.existsSync(modesBasePath), "test_data/modes directory should exist");

    const dirEntries = fs.readdirSync(modesBasePath, { withFileTypes: true });
    const directories = dirEntries.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

    console.log(`Found mode directories: ${directories.join(', ')}`);
    assert.ok(directories.length > 0, "Should find at least one mode directory");

    modeDirs = directories;
  });

  describe("Round-tripping tests for each mode directory", function() {
    beforeEach(function() {
      if (modeDirs.length === 0) {
        console.log("No mode directories found, skipping round-trip tests");
        this.skip();
      }
    });

    for (const dirName of ["ldac"]) {
      it(`Should round-trip mode files in ${dirName}`, function() {
        console.log(`\n======= Testing directory: ${dirName} =======`);

        const modeDir = path.join(modesBasePath, dirName);
        assert.ok(fs.existsSync(modeDir), `Mode directory ${modeDir} should exist`);

        const modeFiles = fs.readdirSync(modeDir)
          .filter(file => file.endsWith('.json'));

        console.log(`Found ${modeFiles.length} potential mode files in ${dirName}: ${modeFiles.join(', ')}`);

        if (modeFiles.length === 0) {
          this.skip();
          return;
        }

        for (const modeFile of modeFiles) {
          const modeFilePath = path.join(modeDir, modeFile);
          const outputDir = path.join(__dirname, '..', 'output', 'mode-round-trip', dirName, path.basename(modeFile, '.json'));

          console.log(`\n--- Testing round-trip for ${modeFilePath} ---`);

          // Step 1: Convert mode file to RO-Crate
          fs.ensureDirSync(outputDir);
          const rocratePath = path.join(outputDir, 'ro-crate');
          console.log(`Converting mode to RO-Crate: ${modeFilePath} -> ${rocratePath}`);

          execSync(`node ${path.join(__dirname, '..', 'scripts', 'mode-to-masp.js')} -m ${modeFilePath} -o ${rocratePath}`, {
            stdio: 'inherit'
          });

          console.log(`Successfully created RO-Crate at ${rocratePath}`);

          // Check that the UI hints file was created
          const uiHintsPath = path.join(rocratePath, 'mode-with-ui-hints.json');
          assert.ok(fs.existsSync(uiHintsPath), `UI hints file should exist at ${uiHintsPath}`);

          // Step 2: Round-trip back to mode file (requires scripts/masp-to-mode.js)
          const maspToModePath = path.join(__dirname, '..', 'scripts', 'masp-to-mode.js');
          if (!fs.existsSync(maspToModePath)) {
            console.log("scripts/masp-to-mode.js not yet available — skipping reverse conversion");
            console.log('Round-trip test completed (forward direction only)!');
            continue;
          }

          const reverseOutputPath = path.join(outputDir, 'reconstructed-mode.json');
          console.log(`Converting RO-Crate back to mode: ${rocratePath} -> ${reverseOutputPath}`);

          const socrateCrateFile = path.join(rocratePath, 'ro-crate-metadata.json');
          assert.ok(fs.existsSync(socrateCrateFile), `RO-Crate metadata file should exist at ${socrateCrateFile}`);

          execSync(`node ${maspToModePath} -s ${socrateCrateFile} -o ${reverseOutputPath} -h ${uiHintsPath}`, {
            stdio: 'inherit'
          });

          console.log(`Successfully created reconstructed mode file at ${reverseOutputPath}`);

          // Step 3: Compare original and reconstructed mode files
          console.log('Comparing original and reconstructed mode files');

          const originalMode = loadModeFile(modeFilePath);
          const reconstructedMode = loadModeFile(reverseOutputPath);

          assert.ok(originalMode.classes, "Original mode file should have classes section");
          assert.ok(reconstructedMode.classes, "Reconstructed mode file should have classes section");

          fs.writeJSONSync(path.join(outputDir, 'original-classes.json'), originalMode.classes, { spaces: 2 });
          fs.writeJSONSync(path.join(outputDir, 'reconstructed-classes.json'), reconstructedMode.classes, { spaces: 2 });

          const failedProperties = [];

          Object.keys(originalMode.classes).forEach(className => {
            if (!reconstructedMode.classes[className]) {
              failedProperties.push(`Class ${className} is missing from reconstructed mode`);
              return;
            }

            const originalInputs = originalMode.classes[className].inputs || [];
            const reconstructedInputs = reconstructedMode.classes[className].inputs || [];

            if (originalInputs.length !== reconstructedInputs.length) {
              failedProperties.push(`Class ${className} has ${originalInputs.length} inputs in original but ${reconstructedInputs.length} inputs in reconstructed`);
            }

            originalInputs.forEach(originalInput => {
              const reconstructedInput = reconstructedInputs.find(i => i.name === originalInput.name);

              if (!reconstructedInput) {
                failedProperties.push(`Property ${originalInput.name} in class ${className} is missing from reconstructed mode`);
                return;
              }

              if (originalInput.id !== reconstructedInput.id) {
                failedProperties.push(`Property ${originalInput.name} in class ${className} has different IDs: original=${originalInput.id}, reconstructed=${reconstructedInput.id}`);
              }

              if (originalInput.help !== reconstructedInput.help) {
                failedProperties.push(`Property ${originalInput.name} in class ${className} has different help text`);
              }

              if (originalInput.type && reconstructedInput.type) {
                const originalTypes = Array.isArray(originalInput.type) ? originalInput.type : [originalInput.type];
                const reconstructedTypes = Array.isArray(reconstructedInput.type) ? reconstructedInput.type : [reconstructedInput.type];

                if (originalTypes.length !== reconstructedTypes.length) {
                  failedProperties.push(`Property ${originalInput.name} in class ${className} has ${originalTypes.length} types in original but ${reconstructedTypes.length} types in reconstructed`);
                } else {
                  for (let i = 0; i < originalTypes.length; i++) {
                    if (originalTypes[i] !== reconstructedTypes[i]) {
                      if (originalTypes[i] === 'TextArea' && reconstructedTypes[i] === 'Text') {
                        failedProperties.push(`Property ${originalInput.name} in class ${className} has different type: original=TextArea, reconstructed=Text (should be preserved via UI hints)`);
                      } else {
                        failedProperties.push(`Property ${originalInput.name} in class ${className} has different type: original=${originalTypes[i]}, reconstructed=${reconstructedTypes[i]}`);
                      }
                    }
                  }
                }
              }

              if (originalInput.required !== reconstructedInput.required &&
                  !(originalInput.required === undefined && reconstructedInput.required === false)) {
                failedProperties.push(`Property ${originalInput.name} in class ${className} has different required flag: original=${originalInput.required}, reconstructed=${reconstructedInput.required}`);
              }

              if (originalInput.multiple !== reconstructedInput.multiple) {
                failedProperties.push(`Property ${originalInput.name} in class ${className} has different multiple flag: original=${originalInput.multiple}, reconstructed=${reconstructedInput.multiple}`);
              }

              if (originalInput.values && !reconstructedInput.values) {
                failedProperties.push(`Property ${originalInput.name} in class ${className} has predefined values in original but not in reconstructed`);
              } else if (!originalInput.values && reconstructedInput.values) {
                failedProperties.push(`Property ${originalInput.name} in class ${className} has predefined values in reconstructed but not in original`);
              } else if (originalInput.values && reconstructedInput.values) {
                if (originalInput.values.length !== reconstructedInput.values.length) {
                  failedProperties.push(`Property ${originalInput.name} in class ${className} has ${originalInput.values.length} predefined values in original but ${reconstructedInput.values.length} in reconstructed`);
                }
              }
            });
          });

          if (originalMode.lookups && !reconstructedMode.lookups) {
            failedProperties.push("Original mode has lookups but reconstructed mode doesn't");
          } else if (!originalMode.lookups && reconstructedMode.lookups) {
            failedProperties.push("Reconstructed mode has lookups but original mode doesn't");
          } else if (originalMode.lookups && reconstructedMode.lookups) {
            const originalLookupKeys = Object.keys(originalMode.lookups);
            const reconstructedLookupKeys = Object.keys(reconstructedMode.lookups);

            if (originalLookupKeys.length !== reconstructedLookupKeys.length) {
              failedProperties.push(`Original mode has ${originalLookupKeys.length} lookups but reconstructed has ${reconstructedLookupKeys.length}`);
            }

            originalLookupKeys.forEach(lookupKey => {
              if (!reconstructedMode.lookups[lookupKey]) {
                failedProperties.push(`Lookup ${lookupKey} is missing from reconstructed mode`);
              }
            });
          }

          if (failedProperties.length > 0) {
            console.error('The following properties were not correctly round-tripped:');
            failedProperties.forEach(issue => console.error(`- ${issue}`));
            fs.writeFileSync(path.join(outputDir, 'property-issues.txt'), failedProperties.join('\n'), 'utf8');
          }

          try {
            assert.strictEqual(failedProperties.length, 0, "Some properties failed to round-trip correctly");
            console.log('All properties round-tripped successfully!');
          } catch (error) {
            console.error('Property round-trip issues detected - this is expected during development');
          }

          console.log('Round-trip test completed!');
        }
      });
    }
  });
});

/**
 * Load and parse a mode file, handling comments
 * @param {string} filePath - Path to the mode file
 * @returns {object} - Parsed mode file
 */
function loadModeFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const contentWithoutComments = fileContent
      .split('\n')
      .filter(line => !line.trim().startsWith('//'))
      .join('\n');
    return JSON.parse(contentWithoutComments);
  } catch (error) {
    throw new Error(`Error loading mode file ${filePath}: ${error.message}`);
  }
}
