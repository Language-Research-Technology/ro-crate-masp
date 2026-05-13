const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { ROCrate } = require("ro-crate");
const { MaspValidator } = require("../lib/masp-validator");

describe("LDAC profile URI resolution", function () {
  const ldacProfileCratePath = path.join(
    __dirname,
    "../profiles/ldac/profile-crate/ro-crate-metadata.json"
  );

  function loadLdacProfileCrate() {
    const profileData = fs.readFileSync(ldacProfileCratePath, "utf8");
    const profileJson = JSON.parse(profileData);
    return new ROCrate(profileJson, { array: true, link: true });
  }

  it("resolves canonical conformsTo URI and profile entity from LDAC profile", function () {
    const validator = new MaspValidator(loadLdacProfileCrate()).setProfileBaseUrl(
      "https://language-research-technology.github.io/ro-crate-masp/profiles/ldac/profile-crate/ro-crate-metadata.json"
    );

    const conformsToUris = validator.getConformsToUris();
    const profileEntity = validator.getProfileEntity();

    expect(conformsToUris).to.be.an("array").that.is.not.empty;
    expect(conformsToUris[0]).to.equal("https://w3id.org/ldac/profile#Collection");

    expect(profileEntity).to.be.an("object");
    expect(profileEntity["@id"]).to.equal("https://w3id.org/ldac/profile#Collection");
    expect(profileEntity["@type"]).to.include("Profile");
  });

  it("keeps editor-hint alias as secondary URI while canonical remains primary", function () {
    const validator = new MaspValidator(loadLdacProfileCrate())
      .setProfileBaseUrl(
        "https://language-research-technology.github.io/ro-crate-masp/profiles/ldac/profile-crate/ro-crate-metadata.json"
      )
      .setEditorHints({
        conformsToUri: ["https://w3id.org/ldac/profile"],
      });

    const conformsToUris = validator.getConformsToUris();

    expect(conformsToUris[0]).to.equal("https://w3id.org/ldac/profile#Collection");
    expect(conformsToUris).to.include("https://w3id.org/ldac/profile");
  });
});
