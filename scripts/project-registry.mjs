/**
 * The portfolio repository owns publishing approval. A project can have a
 * complete manifest in its own repository without being publicly showcased.
 * Set status to "approved" only after reviewing the exact sourceRef.
 */
export const projectRegistry = [
  {
    repository: "vaibhavkhuranaaa/legal-document-intelligence-rag",
    sourceRef: "37d75307e69ede82cdd520af483eb4a317292309",
    portfolio: { status: "approved", approvedAt: "2026-07-24", featured: false, sortOrder: 20 },
  },
  {
    repository: "vaibhavkhuranaaa/legal-discovery-intelligence-graph",
    sourceRef: "dbf05cd7413d684b74366ce9303afc88aeafbdda",
    portfolio: { status: "approved", approvedAt: "2026-07-24", featured: true, sortOrder: 10 },
  },
  {
    repository: "vaibhavkhuranaaa/text-to-sql-guardrails",
    sourceRef: "82fb2f9904aa9ec220b70598b4c9a74c7e72bcd9",
    portfolio: { status: "approved", approvedAt: "2026-07-24", featured: false, sortOrder: 30 },
  },
];
