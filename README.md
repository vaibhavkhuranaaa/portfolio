# Vaibhav Khurana — AI Engineering Portfolio

Production-shaped AI systems, retrieval applications, agents, and data platforms. Every portfolio project is independently versioned, evaluated, and released only when its implementation and public demonstration can be verified.

## Approved projects

<!-- approved-projects:start -->

Generated from the approved portfolio catalog at `2026-07-24T04:20:00.000Z`. Project rows are not edited by hand.

| Project | Focus | Deployment | Evidence | Source |
| --- | --- | --- | --- | --- |
| [Legal Document Intelligence RAG](https://github.com/vaibhavkhuranaaa/legal-document-intelligence-rag) | A deployed Azure RAG research workspace for citation-grounded questions over public M&A litigation and transaction documents. | Live claim; verification profile required | The 45-question release benchmark recorded retrieval hit rate@8 1.0 and citation-provenance validity 1.0.; The current Azure App Service application root returned HTTP 200.; The deployed retrieval corpus is derived from registered public court and SEC sources, not confidential client documents. | `feeefeba500881f6624edf984340f618b2b41bb8` |
| [Legal Discovery Intelligence Graph](https://github.com/vaibhavkhuranaaa/legal-discovery-intelligence-graph) | A deployed Graph RAG investigation workspace with cited evidence, entity graphs, and reproducible evaluation. | Live claim; verification profile required | Entity-mention extraction achieved micro F1 0.887 strict on the committed synthetic corpus.; Hybrid retrieval achieved R@10 0.857 and graph expansion improved relationship hit@5 to 0.833.; Privilege and synthetic-PII rules achieved F1 1.0 on clean templated text. | `c893da65f17121cf8616f1865f946efec2cf935d` |

<!-- approved-projects:end -->

Other repositories are actively being strengthened and are intentionally not represented here as completed live products until their deployment, evaluation, and evidence are verified.

## Delivery standards

Each serious project is expected to provide a reproducible local run, tests and evaluation evidence, an architecture diagram, safe data disclosures, a deployment path, monitoring, and an honest README. The private control plane tracks project charters, release gates, model evaluations, cost limits, and agent handoffs.

Repository setup, Git policy, and canonical project templates are owned by `portfolio-os`; this repository contains only the human introduction and generated approved-project index.
