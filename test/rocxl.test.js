const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { expect } = require("chai");
const { ROCrate } = require("ro-crate");
const { Workbook } = require("ro-crate-excel");

const repoRoot = path.resolve(__dirname, "..");
const generatorPath = path.join(repoRoot, "generate-masp-docs.js");
const rocxlBin = path.join(
	repoRoot,
	"node_modules",
	".bin",
	process.platform === "win32" ? "rocxl.cmd" : "rocxl"
);
const fixtureRoot = path.join(repoRoot, "test_data", "rocxl");
const tmpRoot = path.join(repoRoot, "tmp", "rocxl-test");
const templatePath = path.join(fixtureRoot, "profile-text.md");

function copyFixtureScenario(scenarioName) {
	const sourceDir = path.join(fixtureRoot, scenarioName, "profile-crate");
	const targetDir = path.join(tmpRoot, scenarioName);

	fs.rmSync(targetDir, { recursive: true, force: true });
	fs.mkdirSync(path.dirname(targetDir), { recursive: true });
	fs.cpSync(sourceDir, targetDir, { recursive: true, preserveTimestamps: true });

	return targetDir;
}

function setScenarioMtimes(jsonPath, xlsxPath, scenarioName) {
	const base = new Date(Date.now() - 5000);

	if (scenarioName === "json-newer") {
		fs.utimesSync(xlsxPath, base, new Date(base.getTime() + 1000));
		fs.utimesSync(jsonPath, base, new Date(base.getTime() + 2000));
	} else if (scenarioName === "xlsx-newer") {
		fs.utimesSync(jsonPath, base, new Date(base.getTime() + 1000));
		fs.utimesSync(xlsxPath, base, new Date(base.getTime() + 2000));
	}
}

function readJsonCrate(jsonPath) {
	const json = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
	return new ROCrate(json, { array: true, link: true });
}

async function readXlsxCrate(xlsxPath) {
	const workbook = new Workbook();
	await workbook.loadExcel(xlsxPath);
	return workbook.crate;
}

function runGenerator(profilePath, outputPath) {
	execFileSync(
		process.execPath,
		[generatorPath, profilePath, templatePath, outputPath, "-x"],
		{
			cwd: repoRoot,
			stdio: "pipe",
		}
	);
}

async function assertScenarioSync(scenarioName, expectedDirection) {
	const workDir = copyFixtureScenario(scenarioName);
	const jsonPath = path.join(workDir, "ro-crate-metadata.json");
	const xlsxPath = path.join(workDir, "ro-crate-metadata.xlsx");
	const outputPath = path.join(workDir, "profile-documentation.md");

	setScenarioMtimes(jsonPath, xlsxPath, scenarioName);

	const jsonBefore = fs.existsSync(jsonPath) ? fs.statSync(jsonPath) : null;
	const xlsxBefore = fs.existsSync(xlsxPath) ? fs.statSync(xlsxPath) : null;

	runGenerator(jsonPath, outputPath);

	expect(fs.existsSync(outputPath), "documentation output should be generated").to.equal(true);
	expect(fs.existsSync(jsonPath), "JSON metadata should exist after sync").to.equal(true);
	expect(fs.existsSync(xlsxPath), "XLSX metadata should exist after sync").to.equal(true);

	const jsonCrate = readJsonCrate(jsonPath);
	const xlsxCrate = await readXlsxCrate(xlsxPath);

	expect(jsonCrate.rootDataset.name).to.deep.equal(xlsxCrate.rootDataset.name);
	expect(jsonCrate.rootDataset["@id"]).to.equal(xlsxCrate.rootDataset["@id"]);

	const jsonAfter = fs.statSync(jsonPath);
	const xlsxAfter = fs.statSync(xlsxPath);

	if (expectedDirection === "json-to-xlsx") {
		expect(xlsxBefore, "fixture should not already contain xlsx").to.equal(null);
		expect(jsonBefore, "fixture should already contain json").to.not.equal(null);
		expect(xlsxAfter.mtimeMs).to.be.greaterThan(jsonBefore.mtimeMs);
	} else if (expectedDirection === "xlsx-to-json") {
		expect(jsonBefore, "fixture should not already contain json").to.equal(null);
		expect(xlsxBefore, "fixture should already contain xlsx").to.not.equal(null);
		expect(jsonAfter.mtimeMs).to.be.greaterThan(xlsxBefore.mtimeMs);
	} else if (expectedDirection === "json-newer-to-xlsx") {
		expect(jsonBefore).to.not.equal(null);
		expect(xlsxBefore).to.not.equal(null);
		expect(xlsxBefore.mtimeMs).to.be.lessThan(jsonBefore.mtimeMs);
		expect(xlsxAfter.mtimeMs).to.be.greaterThan(jsonBefore.mtimeMs);
	} else if (expectedDirection === "xlsx-newer-to-json") {
		expect(jsonBefore).to.not.equal(null);
		expect(xlsxBefore).to.not.equal(null);
		expect(jsonBefore.mtimeMs).to.be.lessThan(xlsxBefore.mtimeMs);
		expect(jsonAfter.mtimeMs).to.be.greaterThan(xlsxBefore.mtimeMs);
	}
}

describe("rocxl synchronisation", function () {
	before(function () {
		if (!fs.existsSync(rocxlBin)) {
			this.skip();
		}
	});

	after(function () {
		fs.rmSync(tmpRoot, { recursive: true, force: true });
	});

	it("adds XLSX when starting with JSON only", async function () {
		await assertScenarioSync("json-only", "json-to-xlsx");
	});

	it("adds JSON when starting with XLSX only", async function () {
		await assertScenarioSync("xlsx-only", "xlsx-to-json");
	});

	it("updates XLSX when JSON is newer", async function () {
		await assertScenarioSync("json-newer", "json-newer-to-xlsx");
	});

	it("updates JSON when XLSX is newer", async function () {
		await assertScenarioSync("xlsx-newer", "xlsx-newer-to-json");
	});
});
