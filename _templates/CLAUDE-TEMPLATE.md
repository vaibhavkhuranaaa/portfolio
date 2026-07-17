# CLAUDE.md — [Project Name]

## Project Context
- **Industry:** [Financial / Healthcare / Supply Chain]
- **Role focus:** [Data Engineer / Data Scientist / AI Engineer]
- **Portfolio goal:** this project demonstrates [specific skill — e.g. "streaming data pipelines," "graph ML," "clinical NLP with privacy constraints"] for [target role] applications.

## Data
- **Dataset:** [name]
- **Source:** [where to get it, link/instructions]
- **Access constraints:** [open / requires credentialing / do not commit raw files — be explicit]

## Required Stack
[Exact tools — Python, Flask, Docker, Azure service(s), LangChain/LangGraph/Hugging Face if applicable, MLflow, etc.]

## Standard Repo Structure
```
src/
├── app.py              # Flask entrypoint
├── pipeline/            # data/ML logic
└── agents/               # LangChain/LangGraph agents, if applicable
notebooks/                # EDA only — never production logic
data/                     # small samples only, gitignore the rest
tests/
docker/
infra/                    # Azure Bicep/Terraform or pipeline configs
.github/workflows/ci.yml
```

## Subagent Ownership (avoid overlapping file writes)
1. **Architect subagent** — reads this file, produces the task breakdown and confirms file structure before any code is written. Run this first, commit the skeleton, then branch.
2. **Pipeline/model subagent** — owns `src/pipeline/` or `src/agents/`
3. **API subagent** — owns `src/app.py` and Flask routes
4. **Infra subagent** — owns `docker/` and `infra/`
5. **Docs/test subagent** — owns `tests/` and keeps `README.md` in sync

Run pipeline/API/infra subagents on separate branches (`feature/pipeline`, `feature/api`, `feature/infra`) after the skeleton is committed — merge each via PR per `GIT-WORKFLOW.md`, don't have multiple subagents write to the same branch simultaneously.

## Hard Constraints
[Project-specific — e.g. "no real PHI," "do not commit raw MIMIC-IV files, only derived/processed features," "credentials via gh secret only"]

## Definition of Done (v1)
- [ ] Data ingestion/loading working end-to-end
- [ ] Model/pipeline logic implemented and tested
- [ ] Flask API serving predictions/results
- [ ] Dockerized and runs via `docker compose up`
- [ ] Deployed to Azure (or deployment path documented if not yet deployed)
- [ ] README complete per `_templates/README-TEMPLATE.md`
- [ ] Tagged `v1.0`
