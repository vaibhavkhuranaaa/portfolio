import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFile } from "node:fs/promises";

const schema = JSON.parse(await readFile(new URL("../schemas/project-manifest-v1.json", import.meta.url), "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validator = ajv.compile(schema);

function assertPublicUrl(value, label) {
  if (value === null && label === "liveUrl") return;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) throw new Error("unsupported protocol");
  } catch {
    throw new Error(`${label} must be an absolute HTTP(S) URL`);
  }
}

export function validateManifest(manifest, repository = "manifest") {
  if (!validator(manifest)) {
    const errors = validator.errors?.map((error) => `${error.instancePath || "/"} ${error.message}`).join("; ");
    throw new Error(`${repository}: invalid project manifest: ${errors}`);
  }
  assertPublicUrl(manifest.githubUrl, "githubUrl");
  assertPublicUrl(manifest.liveUrl, "liveUrl");
  if (manifest.deployment.status === "live" && !manifest.liveUrl) throw new Error(`${repository}: live deployments require liveUrl`);
  if (manifest.deployment.status === "release-pending" && manifest.liveUrl) throw new Error(`${repository}: release-pending deployments must not include liveUrl`);
  if (!/confidential|synthetic|public|fictional|disclosure/i.test(manifest.disclaimer)) throw new Error(`${repository}: disclaimer must state the confidentiality or data-disclosure context`);
}
