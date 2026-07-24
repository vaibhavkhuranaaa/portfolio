/**
 * The portfolio repository owns publishing approval. A project can have a
 * complete manifest in its own repository without being publicly showcased.
 * Set status to "approved" only after reviewing the exact sourceRef.
 */
export const projectRegistry = [
  {
    repository: "vaibhavkhuranaaa/legal-document-intelligence-rag",
    sourceRef: "feeefeba500881f6624edf984340f618b2b41bb8",
    portfolio: { status: "approved", approvedAt: "2026-07-23", featured: false, sortOrder: 20 },
  },
  {
    repository: "vaibhavkhuranaaa/legal-discovery-intelligence-graph",
    sourceRef: "c893da65f17121cf8616f1865f946efec2cf935d",
    portfolio: { status: "approved", approvedAt: "2026-07-19", featured: true, sortOrder: 10 },
  },
  {
    repository: "vaibhavkhuranaaa/text-to-sql-guardrails",
    sourceRef: "b800774943bd32a72811420cb52a7befd11b5f2f",
    // Publication is intentionally pending a public source revision and a
    // replacement deployment that proves the committed release controls.
    portfolio: { status: "draft" },
  },
];
