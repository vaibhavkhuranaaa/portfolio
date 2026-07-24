# Vaibhav Khurana — AI Engineering Portfolio

Production-shaped AI systems, retrieval applications, agents, and data platforms. Every portfolio project is independently versioned, evaluated, and released only when its implementation and public demonstration can be verified.

## Approved projects

<!-- approved-projects:start -->

Generated from the approved portfolio catalog at `2026-07-24T13:34:15.799Z`. Project rows are not edited by hand.

| Project | Focus | Deployment | Evidence | Source |
| --- | --- | --- | --- | --- |
| [Legal Document Intelligence RAG](https://github.com/vaibhavkhuranaaa/legal-document-intelligence-rag) | A deployed Azure RAG research workspace for citation-grounded questions over public M&A litigation and transaction documents. | Live claim; verification profile required | The 45-question release benchmark recorded retrieval hit rate@8 1.0 and citation-provenance validity 1.0.; The current Azure App Service application root returned HTTP 200.; The deployed retrieval corpus is derived from registered public court and SEC sources, not confidential client documents. | `ec1853d200aa7f43ac16d909228b31876d8a648a` |
| [Legal Discovery Intelligence Graph](https://github.com/vaibhavkhuranaaa/legal-discovery-intelligence-graph) | A deployed Graph RAG investigation workspace with cited evidence, entity graphs, and reproducible evaluation. | Live claim; verification profile required | Entity-mention extraction achieved micro F1 0.887 strict on the committed synthetic corpus.; Hybrid retrieval achieved R@10 0.857 and graph expansion improved relationship hit@5 to 0.833.; Privilege and synthetic-PII rules achieved F1 1.0 on clean templated text. | `d807df697e0e77274435b89008dd631a7cb391d3` |
| [Text-to-SQL Interface with Guardrails and Hallucination Detection](https://github.com/vaibhavkhuranaaa/text-to-sql-guardrails) | An approval-gated analyst console that turns bounded natural-language questions into policy-checked, read-only SQL over disclosed synthetic data. | temporary-demo | All 18 deterministic policy cases matched their expected trusted or refused outcomes.; Six status-only public route, fixture-boundary, and deployed-control checks passed for the anonymous temporary demo.; The active public revision reports the committed demo fixture, not the local approved snapshot. | `3850aa48e3b40e2cd697f4fd902422efa28c593b` |

<!-- approved-projects:end -->

## Approved project map

[![Approved portfolio project map](assets/approved-project-map.svg)](graphify-out/graph.html)

The static map renders on GitHub; the link opens the interactive Graphify output in this repository. It shows only the approved exact-SHA entries listed above.

Other repositories are actively being strengthened and are intentionally not represented here as completed live products until their deployment, evaluation, and evidence are verified.

## Delivery standards

Each serious project is expected to provide a reproducible local run, tests and evaluation evidence, an architecture diagram, safe data disclosures, a deployment path, monitoring, and an honest README. The private control plane tracks project charters, release gates, model evaluations, cost limits, and agent handoffs.

Repository setup, Git policy, and canonical project templates are owned by `portfolio-os`; this repository contains only the human introduction and generated approved-project index.
