# Stone Industries — Production Readiness

**Last updated:** 2026-05-25  
**Load when:** Deploy, host change, pre-push review

---

## Production bar

| Check | Requirement |
|-------|-------------|
| Build | `npm run build` exit 0 |
| Lint | `npm run lint` exit 0 |
| Base path | Matches host — see [`DEPLOYMENT.md`](DEPLOYMENT.md) |
| Assets | WebP under `public/assets/` — not repo root |
| CTAs | HTML links work with production base |
| Legal | privacy, terms, capability-brief load |
| Console | No uncaught errors on homepage |
| Mobile | 375px + 320px QA pass |

---

## Environment variables

| Var | GitHub Pages | Vercel (planned) |
|-----|--------------|------------------|
| `VITE_BASE_PATH` | `/Stone_Industries/` | `/` |

Set in `.env.local` for local prod preview; CI uses default in `vite.config.ts`.

---

## Smoke test (post-deploy)

```text
1. Homepage 200
2. Background WebP 200 (Network tab)
3. Mailto opens with subject
4. tel: link present on mobile view
5. /privacy.html /terms.html /capability-brief.html
6. One scroll through Services + Contact
```

---

## Rollback plan

| Host | Rollback |
|------|----------|
| GitHub Pages | Revert commit on `main`; workflow redeploys prior artifact |
| Vercel | Redeploy previous production deployment in dashboard |

**Do not** force-push without operator approval.

---

## SRE rules

- Test production base path before switching hosts
- Do not push runtime to `main` without build/lint locally or CI green
- Report dirty tree before deploy-related edits

Cross-ref: [`QA_CHECKLIST.md`](QA_CHECKLIST.md), [`DEPLOYMENT.md`](DEPLOYMENT.md)
