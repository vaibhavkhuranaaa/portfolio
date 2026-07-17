# [Your Name] — AI/ML Portfolio

End-to-end data science, data engineering, and AI engineering projects across Financial, Healthcare, and Supply Chain domains. Every project ships as a Dockerized Flask service deployed to Azure, backed by real or research-grade data — not toy datasets.

## Stack
Python · Flask · Docker · Azure (Container Apps, Data Factory, AI Search) · LangChain/LangGraph · Hugging Face · MLflow · GitHub Actions CI

## Projects

| Project | Industry | Role Focus | One-liner |
|---|---|---|---|
| [financial-payments-fraud-pipeline](https://github.com/<your-username>/financial-payments-fraud-pipeline) | Financial | Data Engineer | Streaming payments fraud detection on IBM's TabFormer transaction dataset (Kafka-style ingestion, real-time scoring) |
| [financial-aml-graph-detection](https://github.com/<your-username>/financial-aml-graph-detection) | Financial | Data Scientist / AI Engineer | Graph neural network for anti-money-laundering detection on the Elliptic Bitcoin transaction graph |
| [healthcare-sepsis-prediction](https://github.com/<your-username>/healthcare-sepsis-prediction) | Healthcare | Data Scientist | Early sepsis/ICU deterioration risk model trained on real de-identified MIMIC-IV ICU data |
| [healthcare-phi-deidentification](https://github.com/<your-username>/healthcare-phi-deidentification) | Healthcare | AI Engineer | Clinical text de-identification microservice (PHI redaction NER) trained on n2c2 de-id data |
| [supplychain-predictive-maintenance](https://github.com/<your-username>/supplychain-predictive-maintenance) | Supply Chain | Data Engineer | Remaining-useful-life prediction on NASA's C-MAPSS turbofan degradation benchmark |
| [supplychain-disruption-agent](https://github.com/<your-username>/supplychain-disruption-agent) | Supply Chain | AI Engineer | LangGraph agent monitoring GDELT real-time event data for supply-chain disruption risk |

## How this portfolio is organized
Each project above is its own repository (see `GITHUB-SETUP.md` for how they were created) with a consistent structure: `src/`, `docker/`, `infra/`, `tests/`, and a `CLAUDE.md` that scopes the Claude Code subagent work for that repo. `_templates/` in this meta-repo holds the reusable `README.md` and `CLAUDE.md` skeletons used to bootstrap every project.

## Setup docs
- [`GITHUB-SETUP.md`](./GITHUB-SETUP.md) — creating and configuring all repos
- [`GIT-WORKFLOW.md`](./GIT-WORKFLOW.md) — day-to-day branch/commit/PR workflow
- [`../BOOTSTRAP-PROMPT.md`](../BOOTSTRAP-PROMPT.md) — the prompt used with Claude Code to scaffold each repo
