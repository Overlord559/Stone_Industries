# Stone Industries — Production Readiness

**Last updated:** 2026-05-25  
**Load when:** Deploy, host change, pre-push review

---

## Production bar

| Check | Requirement |
|-------|-------------|
| Live URL | https://stoneindustries.netlify.app/ (canonical) |
| Build | `npm run build` exit 0 |
| Lint | `npm run lint` exit 0 |
| Base path | Matches host — see [`DEPLOYMENT.md`](DEPLOYMENT.md) |
| Assets | WebP under `public/assets/` — not repo root |
| CTAs | HTML links work with production base |
| Legal | privacy, terms, capability-brief load |
| Console | No uncaught errors on homepage |
| Mobile | 375px + 320px QA pass |
| Hosting compliance | Commercial site on **Netlify Free** — not Vercel Hobby |

---

## Environment variables

| Var | Netlify (production) | GitHub Pages (mirror) | Vercel Pro (future) |
|-----|----------------------|----------------------|---------------------|
| `VITE_BASE_PATH` | `/` | `/Stone_Industries/` (CI default) | `/` |
| `VITE_SUPABASE_URL` | Supabase project URL | unset (forms fall back to mailto/tel) | optional |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key | unset | optional |

Set `VITE_BASE_PATH` in `netlify.toml`. Set Supabase vars in **Netlify UI** (never commit real keys). GitHub Actions mirror does not need Supabase unless mirror forms are enabled. Use `.env.local` for local prod preview.

---

## Smoke test (post-deploy — Netlify)

```text
1. Homepage 200 at /
2. Background WebP 200 (Network tab)
3. /pricing.html + /services.html + all 5 service detail pages 200
4. Mailto opens with subject
5. tel:+15595799376 on hero, contact, static pages
6. /privacy.html /terms.html /capability-brief.html 200
7. Mobile sticky bar at 375px and 320px
8. One scroll through Services + Contact — no console errors
9. Inquiry form submit (when Supabase env set) — success message; row in Supabase Table Editor
10. Inquiry form with env unset — submit disabled; mailto/tel fallback visible
```

Full checklist: [`DEPLOYMENT.md`](DEPLOYMENT.md) post-deploy section.

---

## Rollback plan

| Host | Rollback |
|------|----------|
| **Netlify** | Publish previous successful deploy in Netlify dashboard |
| GitHub Pages | Revert commit on `main`; workflow redeploys prior artifact |
| Vercel Pro (future) | Redeploy previous production deployment in dashboard |

**Do not** force-push without operator approval.

---

## SRE rules

- Test production base path (`VITE_BASE_PATH=/`) before Netlify cutover
- Do not push runtime to `main` without build/lint locally or CI green
- Report dirty tree before deploy-related edits
- **Vercel Hobby is not approved for commercial production**

Cross-ref: [`QA_CHECKLIST.md`](QA_CHECKLIST.md), [`DEPLOYMENT.md`](DEPLOYMENT.md)
