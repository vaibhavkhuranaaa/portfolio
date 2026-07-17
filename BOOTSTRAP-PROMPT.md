# Bootstrap Prompt — Paste Into Claude Code

Run this once per project, from inside that project's cloned repo folder (after `gh repo create ... --clone` from `portfolio/GITHUB-SETUP.md`). Replace the bracketed parts.

```
This repo is [project-name] from my AI/ML portfolio. Read the CLAUDE.md in this
directory — it defines the project context, required stack, subagent ownership
split, hard constraints, and definition of done.

Also read _templates/README-TEMPLATE.md and _templates/CLAUDE-TEMPLATE.md from
the portfolio-setup folder at [path to portfolio-setup] for the structural
conventions this project should follow.

Do this in order:
1. As the architect subagent: propose the file structure per CLAUDE.md, confirm
   it with me, then create the skeleton (empty files/folders, .gitignore,
   requirements.txt or pyproject.toml). Commit this as "chore: scaffold project
   structure" directly to main.
2. Create three feature branches: feature/pipeline, feature/api, feature/infra
3. On feature/pipeline: build out src/pipeline/ (or src/agents/) per the CLAUDE.md
   spec. Write tests. Commit with conventional commit messages (feat:, fix:, etc.)
4. On feature/api: build src/app.py per the CLAUDE.md spec, wiring in the
   pipeline's output.
5. On feature/infra: write the Dockerfile, docker-compose.yml, and infra/ configs
   for Azure deployment per CLAUDE.md.
6. For each branch, push and open a PR with `gh pr create`, then tell me so I can
   review before you merge.
7. Once all three are merged to main, fill out README.md per
   _templates/README-TEMPLATE.md using the actual results you produced — no
   placeholder numbers.
8. Tag v1.0 and push the tag.

Stop and ask me before: committing any raw data file over a few MB, adding any
credential/secret directly to a file, or merging a PR without my review.
```

## Notes
- Run this fresh in each of the 6 repo folders — don't try to have one Claude Code session manage all 6 at once, it'll lose the CLAUDE.md context switching between them.
- If a project's `CLAUDE.md` calls out credentialed data (MIMIC-IV, n2c2), complete that access process *before* running this prompt for that repo — the architect subagent should scaffold around real data access, not a placeholder.
- After the first repo, you'll notice the loop (scaffold → 3 parallel branches → PR → merge → README → tag) is identical every time — that repetition is intentional, it's what makes your commit history across all 6 repos look like a consistent, deliberate engineering practice rather than 6 one-off projects.
