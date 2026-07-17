# Git Workflow — Day-to-Day Reference

Use this same loop across all 6 repos. Consistency here matters more than speed — a clean, readable commit history is itself a portfolio signal.

## One-time setup (per machine, not per repo)
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Starting work on a repo (after `gh repo create ... --clone` from GITHUB-SETUP.md)
```bash
cd financial-payments-fraud-pipeline
```
Let Claude Code scaffold the structure per that repo's `CLAUDE.md` — see `BOOTSTRAP-PROMPT.md`.

## The daily loop
```bash
# 1. Always start from an up-to-date main
git checkout main
git pull origin main

# 2. Branch per feature — never commit to main directly
git checkout -b feature/streaming-ingestion

# 3. Work (via Claude Code subagents), then stage + commit
git add .
git commit -m "feat: add Kafka-style ingestion for transaction stream"

# 4. Push the branch
git push -u origin feature/streaming-ingestion

# 5. Open a PR (gh CLI, no need to leave the terminal)
gh pr create --title "Add streaming ingestion" --body "Adds Event Hubs consumer + windowed feature engineering"

# 6. Review your own diff, then merge
gh pr merge --squash --delete-branch
```

## Commit message convention (use across all 6 repos)
- `feat:` new feature
- `fix:` bug fix
- `docs:` README/docs only
- `refactor:` no behavior change
- `test:` adding/fixing tests
- `chore:` tooling, deps, CI

## Tagging milestones
Once a project hits a working end-to-end state, tag it — this shows iteration, not just a single dump:
```bash
git tag -a v1.0 -m "First working end-to-end pipeline: ingestion to deployed scoring API"
git push origin v1.0
```

## Housekeeping
```bash
git branch -d feature/streaming-ingestion   # delete merged local branch (after PR merge)
git log --oneline --graph                   # sanity-check history
git status                                   # before any commit, always check what's staged
```

## Things to never commit
- Raw credentialed/restricted data (MIMIC-IV, n2c2 files) — see each project's `CLAUDE.md`
- Azure credentials, API keys, `.env` files — these belong in `gh secret set` or `.env.example` only
- Large model checkpoints — use `.gitignore` and note where to download/regenerate them in the README instead
