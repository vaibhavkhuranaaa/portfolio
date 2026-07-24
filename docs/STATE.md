# Portfolio state

The canonical portfolio repository owns the Next.js site and its generated GitHub README index. Only approved exact-SHA project manifests appear in either surface.

## Verify

```bash
npm test
npm run lint
npm run build
git diff --check
```

Production deployment uses `.github/workflows/release.yml` and must check out the approved `source_sha`, deploy one prebuilt Vercel artifact, and verify every approved project page and link.
