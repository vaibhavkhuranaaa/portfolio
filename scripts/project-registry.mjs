/**
 * The portfolio repository owns publishing approval. A project can have a
 * complete manifest in its own repository without being publicly showcased.
 * Set status to "approved" only after reviewing the exact sourceRef.
 */
export const projectRegistry = [
  {
    repository: "vaibhavkhuranaaa/legal-document-intelligence-rag",
    sourceRef: "bc485d84eb4b4a6ee518787a832c6693d82c0d7f",
    portfolio: { status: "approved", approvedAt: "2026-07-24", featured: false, sortOrder: 20 },
  },
  {
    repository: "vaibhavkhuranaaa/legal-discovery-intelligence-graph",
    sourceRef: "f623ef559d8ac224354df42516346f44866515ae",
    portfolio: { status: "approved", approvedAt: "2026-07-24", featured: true, sortOrder: 10 },
  },
  {
    repository: "vaibhavkhuranaaa/text-to-sql-guardrails",
    sourceRef: "9544536cb6355cf1ea4d34fbbc73b4fa645afdfe",
    portfolio: { status: "approved", approvedAt: "2026-07-24", featured: false, sortOrder: 30 },
  },
];
