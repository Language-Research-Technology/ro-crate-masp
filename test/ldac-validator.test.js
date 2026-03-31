const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const { ROCrate } = require('ro-crate');
const { SossValidator } = require('../lib/soss-validator');

describe('Language Data Commons (LDAC) Validator Tests', function() {
  this.timeout(10000); // Allow enough time for file operations



  const ldacProfileCratePath = path.join(
    __dirname, 
    '../profiles/ldac/profile-crate/ro-crate-metadata.json'
  );


  let rocrateProfileCrate;
  let sampleCrate;

  // Load the crates before running tests
  before(function() {
  });
  /*

  it('should load the SoSS+ profile crate from path', function() {
    const validator = new SossValidator(rocProfileCratePath);
    const result = validator.loadProfileCrate();
    expect(result).to.be.true;
  });
  
  it('should accept a crate object in constructor', function() {
    const validator = new SossValidator(rocrateProfileCrate);
    expect(validator.profileCrate).to.equal(rocrateProfileCrate);
  });
  */
 
  

  

  it('should be able to deal with the MASP-based LDAC profile', async function() {
    // Create a validator with the ldac crate
    // Load profile crate
    const profileData = fs.readFileSync(ldacProfileCratePath, 'utf8');
    const profileJson = JSON.parse(profileData);
    const ldacProfileCrate = new ROCrate(profileJson, { array: true, link: true });
    const validator = new SossValidator(ldacProfileCrate);

    // Empty RO-Crate for testing
    const targetCrate = new ROCrate({ array: true, link: true });
    var results = await validator.validateCrate(targetCrate);
    expect(results).to.have.property('error');
    expect(results.error.length).to.equal(3);
  
    // Add required properties
    targetCrate.root['@type'] = ['Dataset', "RepositoryCollection"];
    targetCrate.root.name = 'Test Dataset';
    targetCrate.root.license = "CC By-NC 4.0";
    targetCrate.root.datePublished = '2023-07-01';
    targetCrate.root.description = 'This is an RO-Crate';
    targetCrate.root['author'] = {"@type": "Person", "name": "John Doe", "@id": "https://orcid.org/0000-0002-1825-XXXX"};
    targetCrate.root['accountablePerson'] = {"@id": "https://orcid.org/0000-0002-1825-XXXX"};
    targetCrate.root['publisher'] = {"@id": "https://ror.org/0000-0002-1825-XXXX", "name": "Test Publisher", "@type": "Organization"};
    targetCrate.root['dct:rightsHolder'] = {"@id": "https://orcid.org/0000-0002-1825-XXXX"};

    targetCrate.addEntity({
      "@id": "README.html",
      "@type": "File",
      "name": "README",
      "encodingFormat": "text/html"
    });
    
 
    results = await validator.validateCrate(targetCrate);

    expect(results.error.length).to.equal(0);

    
    
  });

/*
This is a legacy test written for PARADISEC data when we were testing RO-Crate generation with the LDAC profile

The approach is to load the example PARADISEC data provided, show how it fails validation, and then fix the errors one by one

*/


  it('should be able to deal with PARADISEC Collections', async function() {
    // Create a validator with the ldac crate

    // Load profile crate
    const profileData = fs.readFileSync(ldacProfileCratePath, 'utf8');
    const profileJson = JSON.parse(profileData);
    const ldacProfileCrate = new ROCrate(profileJson, { array: true, link: true });
    const validator = new SossValidator(ldacProfileCrate);

    // PARADISEC Collection Crate for testing
    const paraCollectionPath = path.join(
        __dirname, 
        '../test_data/ldac/validator_tests/paradisec/collection/NT1/ro-crate-metadata.json'
      );
    const paraCollectionData = fs.readFileSync(paraCollectionPath, 'utf8');
    const paraCollectionJson = JSON.parse(paraCollectionData);
    const targetCrate = new ROCrate(paraCollectionJson, { array: true, link: true });
    var results = await validator.validateCrate(targetCrate);
    expect(results).to.have.property('error');

    // Check the number of errors 
    expect(results.error.length).to.equal(3);


    results = await validator.validateCrate(targetCrate);
    // Fix the license
    targetCrate.updateEntityId(
        '_:b1',
        '#LICENSE'
      );
      const license = targetCrate.getEntity(
        '#LICENSE'
      );
      license.URL = "https://www.paradisec.org.au/deposit/access-conditions/";
      // I am not a lawyer, but IMO the name on this license is not suitable
      // The term Open should be used for CC or GPL type licenses where data can be used without having to agree via a click-through
      // Also the use of the term "Open" may imply to some people that redistribution is permitted
      license.name = 'PARADISEC Public Access Conditions'; // Or something like that
      license['@type'] = ['ldac:DataReuseLicense'];
      license['Description'] = 'Put a summary of the licence conditions here';
      license['text'] = 'Put the license conditions here ... ';


    // Fix the publisher
    targetCrate.root.publisher = {
        '@id': 'http://nla.gov.au/nla.party-593909',
      };
    // Fix the datePublished
    targetCrate.root.datePublished = targetCrate.root.dateModified;

    // Adding missing author & accountablePerson -- use collector for now
    targetCrate.root.author = targetCrate.root.collector;
    targetCrate.root.accountablePerson = targetCrate.root.collector;
    // Fix the rightsHolder
    targetCrate.root['dct:rightsHolder'] = "SOME STRING HERE _ TODO this is probably not right"
    // THIS IS NOT AN ERROR but the subjectLanguage propety should not end with an "s"
    targetCrate.root.subjectLanguage = targetCrate.root.subjectLanguages;
    targetCrate.root.inLanguage = targetCrate.root.subjectLanguages;
   
    // Add a README file entity
    targetCrate.addEntity({
      "@id": "README.html",
      "@type": "File",
      "name": "README",
      "encodingFormat": "text/html"
    });


    var results = await validator.validateCrate(targetCrate);

    expect(results.error.length).to.equal(0);

    
  });

 


  /*
SOME OLD TESTS ON PARADISEC FROM THE OLD VALIDATOR

 const crate = new ROCrate(
      JSON.parse(
        fs.readFileSync(
          'test-data/paradisec/collection/NT1/ro-crate-metadata.json'
        )
      ),
      opt
    );
    var result = LdacProfile.validate(crate);

    // No conforms to indicating that the collection conforms to this profile we're validating here
    assert(hasClause(result.errors, rules.RepositoryCollection.conformsTo)); // Fails to conform

    // so add it
    crate.root.conformsTo = [{ '@id': constants.CollectionProfileUrl }];
    result = LdacProfile.validate(crate);
    assert(!hasClause(result.errors, rules.RepositoryCollection.conformsTo)); // Conforms (no error)



    result = LdacProfile.validate(crate);











  */
});