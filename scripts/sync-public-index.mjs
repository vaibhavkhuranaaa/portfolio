import { mkdir, readFile, writeFile } from "node:fs/promises";

const start = "<!-- approved-projects:start -->";
const end = "<!-- approved-projects:end -->";
const catalog = JSON.parse(await readFile("public/data/approved-projects.json", "utf8"));

function cell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function xml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

const rows = catalog.projects.map((project) => {
  const evidence = project.evidence.slice(0, 3).map((item) => item.claim).join("; ");
  return `| [${cell(project.title)}](${project.source.url}) | ${cell(project.summary)} | ${cell(project.deployment.status)} | ${cell(evidence)} | \`${project.source.sourceRef}\` |`;
});
const block = [
  start,
  "",
  "Generated from the verified live catalog. Project rows are not edited by hand.",
  "",
  "| Project | Focus | Deployment | Evidence | Source |",
  "| --- | --- | --- | --- | --- |",
  ...rows,
  "",
  end,
].join("\n");
const readme = await readFile("README.md", "utf8");
const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
if (!pattern.test(readme)) throw new Error("README generated project markers are missing");
await writeFile("README.md", readme.replace(pattern, block));

const height = 170 + catalog.projects.length * 92;
const nodes = catalog.projects.map((project, index) => {
  const y = 128 + index * 92;
  return `<path d="M290 74 C 350 74, 350 ${y}, 410 ${y}" stroke="#9b4a34" stroke-width="2" fill="none"/><rect x="410" y="${y - 28}" width="370" height="56" rx="10" fill="#fffaf4" stroke="#5b463d"/><text x="430" y="${y - 3}" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#20231f">${xml(project.title)}</text><text x="430" y="${y + 16}" font-family="monospace" font-size="11" fill="#5d6159">${xml(project.source.sourceRef.slice(0, 12))} · ${xml(project.deployment.status)}</text>`;
}).join("");
const graph = `<svg xmlns="http://www.w3.org/2000/svg" width="820" height="${height}" viewBox="0 0 820 ${height}" role="img" aria-labelledby="title desc"><title id="title">Verified live portfolio project map</title><desc id="desc">The portfolio evidence hub connects to every automatically verified live project revision.</desc><rect width="820" height="${height}" fill="#f5efe6"/><text x="40" y="38" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#5d6159">VERIFIED LIVE PROJECT MAP</text><rect x="40" y="48" width="250" height="52" rx="10" fill="#20231f"/><text x="60" y="70" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#fffaf4">Portfolio evidence hub</text><text x="60" y="88" font-family="monospace" font-size="11" fill="#eadbcc">live source verification</text>${nodes}</svg>`;
await mkdir("assets", { recursive: true });
await writeFile("assets/approved-project-map.svg", `${graph}\n`);
console.log(`Updated README and static map for ${catalog.projects.length} projects.`);
