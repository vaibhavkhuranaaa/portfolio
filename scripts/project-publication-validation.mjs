const shaPattern = /^[0-9a-f]{40}$/;

export function validatePublication(entry) {
  if (!entry || typeof entry !== "object") throw new Error("Project registry entry must be an object");
  if (!/^[\w.-]+\/[\w.-]+$/.test(entry.repository ?? "")) throw new Error("Project registry repository must be owner/repository");
  if (!shaPattern.test(entry.sourceRef ?? "")) throw new Error(`${entry.repository}: sourceRef must be a 40-character commit SHA`);
  if (!entry.portfolio || !["draft", "approved"].includes(entry.portfolio.status)) throw new Error(`${entry.repository}: portfolio status must be draft or approved`);
  if (entry.portfolio.status === "approved") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.portfolio.approvedAt ?? "")) throw new Error(`${entry.repository}: approved projects require approvedAt in YYYY-MM-DD format`);
    if (typeof entry.portfolio.featured !== "boolean") throw new Error(`${entry.repository}: approved projects require featured`);
    if (!Number.isInteger(entry.portfolio.sortOrder)) throw new Error(`${entry.repository}: approved projects require integer sortOrder`);
  }
}
