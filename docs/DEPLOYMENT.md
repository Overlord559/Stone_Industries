# Stone Industries — Deployment

**Last updated:** 2026-05-25 · **Project OS v2**  
**Also read:** [`PRODUCTION_READINESS.md`](PRODUCTION_READINESS.md)

---

## Current — GitHub Pages

| Item | Value |
|------|-------|
| **Workflow** | `.github/workflows/deploy.yml` |
| **Trigger** | Push to `main` or manual `workflow_dispatch` |
| **Live URL** | https://overlord559.github.io/Stone_Industries/ |
| **Base path** | `/Stone_Industries/` (default in `vite.config.ts`) |

Build uses `npm ci` + `npm run build`; artifact uploaded from `./dist`.

---

## Future — Vercel

**Status:** Planned — not primary yet.

| Step | Action |
|------|--------|
| 1 | Import GitHub repo in Vercel (free tier) |
| 2 | Set build command: `npm run build` |
| 3 | Set output directory: `dist` |
| 4 | Set env `VITE_BASE_PATH=/` (root deploy) **or** match subdirectory if using path |
| 5 | Update `index.html` og:url meta if domain changes |
| 6 | Run full [`QA_CHECKLIST.md`](QA_CHECKLIST.md) on preview URL |

**Do not** switch hosts without updating base path docs and running production asset path checks.

---

## Vite base path caution

```ts
// vite.config.ts
const repoBasePath = process.env.VITE_BASE_PATH ?? '/Stone_Industries/'
```

| Host | Typical `VITE_BASE_PATH` |
|------|--------------------------|
| GitHub Pages (this repo) | `/Stone_Industries/` |
| Vercel root | `/` |
| Custom domain at root | `/` |

Wrong base path → blank page or 404 assets. Always smoke-test CSS/background URLs after change.

Local override: copy `.env.example` to `.env.local`.

---

## Free deployment plan

1. **GitHub Pages** — current, $0
2. **Vercel** — free hobby tier for preview + production
3. **Domain** — deferred (no budget) — use GitHub/Vercel URLs until purchased
4. **Phone / Google Business** — deferred until budget; number already on site

---

## Post-deploy smoke test

After any deploy:

- [ ] Homepage loads — not 404
- [ ] Background images load (check Network tab)
- [ ] One mailto link opens mail client with subject
- [ ] Privacy and terms links work with correct base path
- [ ] Mobile 375px spot check
- [ ] Compare live URL to [`QA_CHECKLIST.md`](QA_CHECKLIST.md) P0 items

---

## Commit / push caution

Agents do **not** commit or push unless operator approves.

When approved, stage **exact paths** only — never `git add .`

Example (docs only):

```powershell
cd "C:\dev\stone_industries website"
git add AGENTS.md docs/PROJECT_CONTEXT.md docs/CHATGPT_CURSOR_BRIDGE.md docs/PROMPT_TEMPLATE.md docs/LEARNING_LOOP.md docs/DESIGN_MISTAKE_LEDGER.md docs/QA_CHECKLIST.md docs/DEPLOYMENT.md
git status --short
```

Runtime deploy happens on push to `main` — confirm operator intent before pushing runtime changes.
