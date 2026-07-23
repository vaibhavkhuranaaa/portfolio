const [projectUrl, liveUrl] = process.argv.slice(2);
if (!projectUrl || !liveUrl) throw new Error("Usage: node scripts/verify-live-project.mjs <portfolio-project-url> <live-demo-url>");

for (const url of [projectUrl, liveUrl]) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`${url}: expected successful response, received ${response.status}`);
  console.log(`PASS ${url} (${response.status})`);
}

const sitemap = new URL("/sitemap.xml", projectUrl).toString();
const response = await fetch(sitemap);
if (!response.ok) throw new Error(`${sitemap}: expected successful response, received ${response.status}`);
const text = await response.text();
if (!text.includes(new URL(projectUrl).pathname)) throw new Error(`${sitemap}: project path is missing`);
console.log(`PASS ${sitemap} includes project path`);
