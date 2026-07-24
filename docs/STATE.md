# Portfolio state

The canonical portfolio repository owns the Next.js site and generated GitHub README index. Only enabled projects whose anonymous live endpoint matches the current repository SHA appear.

## Verify

```bash
npm test
npm run lint
npm run build
git diff --check
```

`.github/workflows/auto-publish-project.yml` synchronizes verified live projects. Vercel deploys `main` through Git integration, and `.github/workflows/release.yml` verifies `/api/release`, project pages, and links.
