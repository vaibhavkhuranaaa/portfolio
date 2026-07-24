/**
 * The portfolio repository owns publishing approval. A project can have a
 * complete manifest in its own repository without being publicly showcased.
 * Set status to "approved" only after reviewing the exact sourceRef.
 */
export const projectRegistry = [
  {
    repository: "vaibhavkhuranaaa/legal-document-intelligence-rag",
    sourceRef: "ec1853d200aa7f43ac16d909228b31876d8a648a",
    portfolio: { status: "approved", approvedAt: "2026-07-23", featured: false, sortOrder: 20 },
  },
  {
    repository: "vaibhavkhuranaaa/legal-discovery-intelligence-graph",
    sourceRef: "d807df697e0e77274435b89008dd631a7cb391d3",
    portfolio: { status: "approved", approvedAt: "2026-07-19", featured: true, sortOrder: 10 },
  },
  {
    repository: "vaibhavkhuranaaa/text-to-sql-guardrails",
    sourceRef: "3850aa48e3b40e2cd697f4fd902422efa28c593b",
    portfolio: { status: "approved", approvedAt: "2026-07-23", featured: false, sortOrder: 30 },
  },
];
