# GitHub Setup — From Zero to Six Repos

All 6 project repos go under your **personal GitHub account**. This doc covers checking/installing the GitHub CLI, authenticating, and creating every repo with the right settings.

## 1. Check if you already have `gh` installed
```bash
gh --version
```
If you see a version number, skip to step 3. If you get "command not found," continue to step 2.

## 2. Install the GitHub CLI
```bash
# macOS
brew install gh

# Windows (PowerShell)
winget install --id GitHub.cli

# Linux (Debian/Ubuntu)
sudo apt install gh
```

## 3. Authenticate
```bash
gh auth login
```
Choose: **GitHub.com** → **HTTPS** → **Login with a web browser** (easiest — it opens your browser, you approve, done).

Verify:
```bash
gh auth status
```
You should see "Logged in to github.com as <your-username>."

## 4. Create the 6 repos
Run this once per project (change the name each time). This creates the repo on GitHub, initializes it with a README, and clones it locally in one step:
```bash
gh repo create financial-payments-fraud-pipeline --public --description "Streaming payments fraud detection on IBM TabFormer data" --add-readme --clone
gh repo create financial-aml-graph-detection --public --description "GNN-based AML detection on the Elliptic Bitcoin transaction graph" --add-readme --clone
gh repo create healthcare-sepsis-prediction --public --description "Early sepsis/ICU deterioration risk model on MIMIC-IV data" --add-readme --clone
gh repo create healthcare-phi-deidentification --public --description "Clinical text PHI de-identification microservice" --add-readme --clone
gh repo create supplychain-predictive-maintenance --public --description "Remaining-useful-life prediction on NASA C-MAPSS turbofan data" --add-readme --clone
gh repo create supplychain-disruption-agent --public --description "LangGraph agent monitoring GDELT events for supply chain disruption risk" --add-readme --clone
```
Each command drops a cloned folder in your current directory — run these from wherever you want the local project folders to live (e.g. inside `Data-Engineering/`, `AI/`, etc. per your existing structure).

> If a repo needs real credentialed data (MIMIC-IV, n2c2), consider `--private` instead of `--public` until you've confirmed you're only committing derived/processed data, never raw restricted files. See each project's `CLAUDE.md` for specifics.

## 5. Add topics (helps discoverability + signals stack at a glance)
```bash
gh repo edit financial-payments-fraud-pipeline --add-topic azure,docker,flask,streaming,fraud-detection
gh repo edit financial-aml-graph-detection --add-topic pytorch-geometric,graph-neural-networks,aml,azure
gh repo edit healthcare-sepsis-prediction --add-topic mlflow,shap,healthcare-ml,azure
gh repo edit healthcare-phi-deidentification --add-topic huggingface,ner,healthcare-nlp,azure
gh repo edit supplychain-predictive-maintenance --add-topic predictive-maintenance,time-series,azure
gh repo edit supplychain-disruption-agent --add-topic langgraph,langchain,agents,azure
```

## 6. Branch protection on `main`
Do this via the web UI (CLI branch protection needs the raw API and isn't worth the friction for a solo portfolio):
1. Go to each repo → **Settings → Branches → Add branch protection rule**
2. Branch name pattern: `main`
3. Check **Require a pull request before merging**
4. Save

This forces the branch → PR → merge habit from `GIT-WORKFLOW.md` even when you're the only reviewer — and it shows up in your commit history as a deliberate practice, which reads well to anyone checking your repos.

## 7. Add Azure credentials as repo secrets (for CI/CD later)
Once you have an Azure service principal for deployment:
```bash
gh secret set AZURE_CREDENTIALS --repo <your-username>/<repo-name> --body "$(cat azure-creds.json)"
```
Repeat per repo. Never commit credentials directly — always via `gh secret set` or the Settings → Secrets UI.

## 8. Sanity check
```bash
gh repo list <your-username> --limit 10
```
You should see all 6 repos listed.
