# Vaibhav Khurana — AI Engineering Portfolio

A professional portfolio for production-shaped AI systems, retrieval applications, agents, analytics, and data platforms. Public projects are admitted only from reviewed exact source revisions with accessible implementation and deployment evidence.

## Approved projects

<!-- approved-projects:start -->

Generated from the approved portfolio catalog at `2026-07-24T17:50:09.690Z`. Project rows are not edited by hand.

| Project | Focus | Deployment | Evidence | Source |
| --- | --- | --- | --- | --- |
| [Legal Document Intelligence RAG](https://github.com/vaibhavkhuranaaa/legal-document-intelligence-rag) | A deployed Azure RAG research workspace for citation-grounded questions over public M&A litigation and transaction documents. | Live claim; verification profile required | The 45-question release benchmark recorded retrieval hit rate@8 1.0 and citation-provenance validity 1.0.; The current Azure App Service application root returned HTTP 200.; The deployed retrieval corpus is derived from registered public court and SEC sources, not confidential client documents. | `bc485d84eb4b4a6ee518787a832c6693d82c0d7f` |
| [Legal Discovery Intelligence Graph](https://github.com/vaibhavkhuranaaa/legal-discovery-intelligence-graph) | A deployed Graph RAG investigation workspace with cited evidence, entity graphs, and reproducible evaluation. | Live claim; verification profile required | Entity-mention extraction achieved micro F1 0.887 strict on the committed synthetic corpus.; Hybrid retrieval achieved R@10 0.857 and graph expansion improved relationship hit@5 to 0.833.; Privilege and synthetic-PII rules achieved F1 1.0 on clean templated text. | `f623ef559d8ac224354df42516346f44866515ae` |
| [Text-to-SQL Interface with Guardrails and Hallucination Detection](https://github.com/vaibhavkhuranaaa/text-to-sql-guardrails) | An approval-gated analyst console that turns bounded natural-language questions into policy-checked, read-only SQL over disclosed synthetic data. | temporary-demo | All 18 deterministic policy cases matched their expected trusted or refused outcomes.; Six status-only public route, fixture-boundary, and deployed-control checks passed for the anonymous temporary demo.; The active public revision reports the committed demo fixture, not the local approved snapshot. | `9544536cb6355cf1ea4d34fbbc73b4fa645afdfe` |

<!-- approved-projects:end -->

## Approved project map

[![Approved portfolio project map](assets/approved-project-map.svg)](https://portfolio-reeper1.vercel.app/work)

The static map renders directly on GitHub. Open it to explore the corresponding live project pages and evidence.

## Run locally

```bash
npm install
npm run sync-projects
npm run dev
```

Open `http://localhost:3000`.

`sync-projects` fetches portfolio-approved project manifests pinned to exact commits in `scripts/project-registry.mjs`. A repository-dispatch preview may add one exact-SHA manifest to that preview build only. External manifests must exist before normal local development or deployment. For an offline preview using the checked-in validation fixtures:

```bash
PROJECT_MANIFEST_SOURCE_DIR=tests/fixtures/manifests npm run sync-projects
npm run dev
```

## Configure before publishing

- Copy `.env.example` to `.env.local` and set the public site URL and contact email. Production deployment rejects placeholder values.
- Add a real `portfolio/project.json` to a project repository, validate the appropriate v2 profile, and request an exact-SHA preview. Add a **draft** registry entry only after that review.
- Promote the registry entry from `draft` to `approved` only after reviewing the exact commit. That is the portfolio green light.
- Copy the dispatch-workflow template described in `docs/project-manifest-integration.md` into each project repository.
- Keep confidential material generalized, and label any recorded or simulated demo clearly.

## Quality checks

```bash
npm run lint
npm run build
npm test
```

The application has static project pages, `sitemap.xml`, `robots.txt`, a generated Open Graph image, and approved-only portfolio/résumé/index projection payloads. See `docs/project-release-workflow.md` for exact-SHA preview and protected production release.
