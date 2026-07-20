/**
 * The portfolio repository owns publishing approval. A project can have a
 * complete manifest in its own repository without being publicly showcased.
 * Set status to "approved" only after reviewing the exact sourceRef.
 */
export const projectRegistry = [
  {
    repository: "vaibhavkhuranaaa/legal-document-intelligence-rag",
    sourceRef: "60545cfc30ecd1af1c53072b381b0309a9524e50",
    portfolio: { status: "approved", approvedAt: "2026-07-19", featured: true, sortOrder: 20 },
  },
  {
    repository: "vaibhavkhuranaaa/legal-discovery-intelligence-graph",
    sourceRef: "8879c55997a475ea08b158fb689d1d7698d1fb16",
    portfolio: { status: "approved", approvedAt: "2026-07-19", featured: true, sortOrder: 10 },
  },
];
