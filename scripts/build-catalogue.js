#!/usr/bin/env node
/**
 * build-catalogue.js
 *
 * Lists every profile (profiles/<id>/profile-crate) and schema
 * (schemas/<id>/schema-crate) in this repo and:
 *   - writes catalogue.json, which the GitHub Pages landing page (index.html)
 *     reads to show a filterable list;
 *   - regenerates the table in README.md between the
 *     <!-- catalogue:start --> and <!-- catalogue:end --> markers.
 *
 * Usage: node scripts/build-catalogue.js
 */
const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const PAGES_URL = "https://language-research-technology.github.io/ro-crate-masp/";
const OWL_SCRIPT = "owl-to-masp.py";

const asArray = (v) => (v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]);
const idOf = (v) => (v && typeof v === "object" ? v["@id"] : v);

// First paragraph of prose in a profile-text.md / schema-text.md, used when the
// crate's root has no description.
function firstParagraph(markdownPath) {
  if (!fs.existsSync(markdownPath)) return "";
  const body = fs.readFileSync(markdownPath, "utf8").replace(/^---[\s\S]*?---\s*/, "");
  const para = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith("#") && !p.startsWith(">") && !p.startsWith("${"));
  return para || "";
}

// Plain text, first sentence or so, for a one-line summary.
function summarise(text) {
  const plain = String(text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const sentence = plain.match(/^.{40,}?[.!?](?=\s|$)/);
  const short = sentence ? sentence[0] : plain;
  return short.length > 220 ? short.slice(0, 217).replace(/\s+\S*$/, "") + "…" : short;
}

function statusOf(name, description) {
  const text = `${name} ${description}`;
  if (/\bDRAFT\b/.test(text)) return "draft";
  if (/\bDEMO\b/.test(text)) return "demo";
  if (/\btemplate\b/i.test(name)) return "template";
  if (/\bexperimental\b/i.test(text)) return "experimental";
  return "";
}

function buildScriptFor(crateRelPath, scripts) {
  const name = Object.keys(scripts).find(
    (key) => key.startsWith("build:") && scripts[key].includes(crateRelPath)
  );
  return name || "";
}

function describeCrate(kind, id, scripts) {
  const folder = kind === "profile" ? "profiles" : "schemas";
  const crateDir = `${folder}/${id}/${kind}-crate`;
  const metadataPath = path.join(REPO, crateDir, "ro-crate-metadata.json");
  if (!fs.existsSync(metadataPath)) return null;

  const graph = JSON.parse(fs.readFileSync(metadataPath, "utf8"))["@graph"] || [];
  const byId = new Map(graph.map((e) => [e["@id"], e]));
  const descriptor = byId.get("ro-crate-metadata.json") || {};
  const root = byId.get(idOf(asArray(descriptor.about)[0])) || byId.get("./") || {};
  const types = (e) => asArray(e["@type"]);

  const name = asArray(root.name)[0] || id;
  const description =
    asArray(root.description)[0] || firstParagraph(path.join(REPO, folder, id, `${kind}-text.md`));
  const convertedFromOwl = graph.some(
    (e) => types(e).includes("CreateAction") && String(idOf(e.instrument) || "").endsWith(OWL_SCRIPT)
  );

  return {
    id,
    kind,
    name: String(name).trim(),
    summary: summarise(description),
    version: asArray(root.version)[0] || "",
    status: statusOf(name, description),
    origin: convertedFromOwl ? "owl" : "authored",
    classes: graph.filter((e) => types(e).includes("rdfs:Class")).length,
    properties: graph.filter((e) => types(e).includes("rdf:Property")).length,
    docs: fs.existsSync(path.join(REPO, crateDir, "index.html")) ? `${crateDir}/index.html` : "",
    crate: `${crateDir}/ro-crate-metadata.json`,
    build: buildScriptFor(crateDir, scripts),
  };
}

function listIds(folder) {
  return fs
    .readdirSync(path.join(REPO, folder), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function readmeTable(entries) {
  const escape = (s) => String(s).replace(/\|/g, "\\|");
  const rows = entries.map((e) => {
    const name = e.docs ? `[${escape(e.name)}](${PAGES_URL}${e.docs})` : escape(e.name);
    const kind = e.kind === "profile" ? "Profile" : "Schema";
    const notes = [e.status && e.status.toUpperCase(), e.origin === "owl" && "from OWL"].filter(Boolean).join(", ");
    const build = e.build ? `\`npm run ${e.build}\`` : "";
    return `| ${name} | ${kind} | ${notes} | ${e.classes} / ${e.properties} | ${build} | ${escape(e.summary)} |`;
  });
  return [
    "| Name | Type | Notes | Classes / properties | Build | Description |",
    "| ---- | ---- | ----- | -------------------- | ----- | ----------- |",
    ...rows,
  ].join("\n");
}

function main() {
  const scripts = JSON.parse(fs.readFileSync(path.join(REPO, "package.json"), "utf8")).scripts || {};
  const entries = [
    ...listIds("profiles").map((id) => describeCrate("profile", id, scripts)),
    ...listIds("schemas").map((id) => describeCrate("schema", id, scripts)),
  ].filter(Boolean);

  fs.writeFileSync(
    path.join(REPO, "catalogue.json"),
    JSON.stringify({ generated: "scripts/build-catalogue.js", entries }, null, 2) + "\n"
  );

  const readmePath = path.join(REPO, "README.md");
  const readme = fs.readFileSync(readmePath, "utf8");
  const pattern = /(<!-- catalogue:start -->)[\s\S]*?(<!-- catalogue:end -->)/;
  if (!pattern.test(readme)) {
    throw new Error("README.md has no <!-- catalogue:start --> / <!-- catalogue:end --> markers");
  }
  fs.writeFileSync(
    readmePath,
    readme.replace(
      pattern,
      (_, start, end) =>
        `${start}\n<!-- Generated by scripts/build-catalogue.js; do not edit by hand. -->\n\n${readmeTable(entries)}\n\n${end}`
    )
  );

  // The landing page embeds the data too, so it also works opened from disk
  // (file:// can't fetch catalogue.json).
  const indexPath = path.join(REPO, "index.html");
  const html = fs.readFileSync(indexPath, "utf8");
  const dataPattern = /(<!-- catalogue-data:start -->)[\s\S]*?(<!-- catalogue-data:end -->)/;
  if (!dataPattern.test(html)) {
    throw new Error("index.html has no <!-- catalogue-data:start --> / <!-- catalogue-data:end --> markers");
  }
  const data = JSON.stringify({ entries }).replace(/</g, "\\u003c");
  fs.writeFileSync(
    indexPath,
    html.replace(
      dataPattern,
      (_, start, end) => `${start}\n<script id="catalogue-data" type="application/json">${data}</script>\n${end}`
    )
  );

  console.log(`Catalogued ${entries.length} profiles and schemas`);
}

main();
