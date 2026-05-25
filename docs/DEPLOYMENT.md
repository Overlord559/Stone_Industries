# Stone Industries — Deployment

**Last updated:** 2026-05-25 · **Project OS v2**  
**Also read:** [`PRODUCTION_READINESS.md`](PRODUCTION_READINESS.md)

---

## Current — GitHub Pages (production today)

| Item | Value |
|------|-------|
| **Workflow** | `.github/workflows/deploy.yml` |
| **Trigger** | Push to `main` or manual `workflow_dispatch` |
| **Live URL** | https://overlord559.github.io/Stone_Industries/ |
| **Base path** | `/Stone_Industries/` (default when `VITE_BASE_PATH` unset) |
| **Build** | `npm ci` + `npm run build` → artifact `./dist` |

GitHub Actions does **not** set `VITE_BASE_PATH` — build uses default `/Stone_Industries/`. **Do not change the default** in `vite.config.ts` unless operator approves a GitHub Pages migration.

---

## Vercel — free tier (ready to import)

**Status:** Code-compatible; operator import pending.

### One-time Vercel setup

| Step | Action |
|------|--------|
| 1 | Sign in at [vercel.com](https://vercel.com) (free Hobby) |
| 2 | **Add New Project** → Import GitHub repo `stone_industries website` |
| 3 | Framework preset: **Vite** |
| 4 | Build command: `npm run build` |
| 5 | Output directory: `dist` |
| 6 | Install command: `npm ci` (or `npm install`) |
| 7 | **Environment variable (Production + Preview):** `VITE_BASE_PATH` = `/` |
| 8 | Deploy → note preview URL (`*.vercel.app`) |

### Post-Vercel deploy checklist

- [ ] Homepage loads — assets 200 in Network tab
- [ ] Background WebP loads (preload uses `%BASE_URL%` — works for `/` and `/Stone_Industries/`)
- [ ] Mailto + `tel:+15595799376` work
- [ ] `privacy.html`, `terms.html`, `capability-brief.html` load at `{base}privacy.html`
- [ ] Mobile 375px spot check
- [ ] Update `index.html` `og:url` and `og:image` / `twitter:image` to Vercel URL **when Vercel becomes primary marketing URL**

---

## Dual-host compatibility plan

| Host | `VITE_BASE_PATH` | Asset URLs | CI / config |
|------|------------------|------------|-------------|
| **GitHub Pages** | `/Stone_Industries/` (default) | `/Stone_Industries/assets/...` | No env in workflow — keep default |
| **Vercel** | `/` | `/assets/...` | Set in Vercel project env |

**`vite.config.ts`** — no change required:

```ts
const repoBasePath = process.env.VITE_BASE_PATH ?? '/Stone_Industries/'
base: mode === 'production' ? repoBasePath : '/',
```

**`index.html`** — hero preload uses Vite `%BASE_URL%` placeholder (GitHub + Vercel safe).

**`import.meta.env.BASE_URL`** — used by `capabilityBriefPath` in `site.ts` for runtime links.

### Running both hosts

- **GitHub Pages** remains live on every push to `main` until operator chooses otherwise.
- **Vercel** can run in parallel on the same repo with `VITE_BASE_PATH=/`.
- **Canonical URL:** Pick one primary host for SEO; update `og:url` in `index.html` on cutover. Until then, `og:url` stays GitHub Pages (accurate for current production).

### Local production preview

```powershell
cd "C:\dev\stone_industries website"

# GitHub Pages parity
Copy-Item .env.example .env.local -ErrorAction SilentlyContinue
npm run build
npm run preview

# Vercel parity
$env:VITE_BASE_PATH="/"
npm run build
npm run preview
```

---

## Vite base path caution

Wrong `VITE_BASE_PATH` → blank page or 404 assets. Always smoke-test after host or env change.

| Host | `VITE_BASE_PATH` |
|------|------------------|
| GitHub Pages (this repo) | `/Stone_Industries/` |
| Vercel root | `/` |
| Custom domain at root | `/` |

---

## Free deployment plan (no paid services)

1. **GitHub Pages** — current production, $0
2. **Vercel Hobby** — preview + optional production, $0
3. **Domain** — deferred (no budget)
4. **Dedicated business phone** — deferred; `559-579-9376` on site today
5. **Google Business Profile** — operator task post-deploy

---

## Service area (SEO note)

Primary market: **Fresno & Central Valley, California** — copy in `src/data/site.ts`, Hero, Contact, meta tags, and static pricing pages.

---

## Static pricing funnel

| Page | Purpose |
|------|---------|
| `public/pricing.html` | All starting packages |
| `public/services.html` | Service index |
| `public/services/*.html` | Per-service packages + mailto |

No backend required. GitHub Pages + Vercel compatible via relative links and `%BASE_URL%` in React.

---

## Supabase / Stripe / Vercel plan

### Supabase — **DEFER**

- Operator free projects maxed
- **Option A:** Pause/delete unused Supabase project and reuse slot
- **Option B:** Wait until Friday/Monday if upgrading
- **Option C (recommended now):** No database — mailto + manual follow-up validates demand first

### Stripe — **DEFER custom integration**

- No embedded checkout on static site
- **Near-term:** Manual quote → Stripe Payment Link or invoice when operator has account
- **Later:** Checkout only if standardized packages sell repeatedly

### Vercel — **BUILD (operator)**

- Free Hobby tier; set `VITE_BASE_PATH=/`
- Keep GitHub Pages until Vercel smoke test passes
- Custom domain deferred (no budget)

---

## Post-deploy smoke test

- [ ] Homepage loads — not 404
- [ ] Background images load
- [ ] Service area visible in hero/contact
- [ ] Mailto opens with subject
- [ ] Privacy / terms / capability brief load with correct base
- [ ] 375px mobile check

See [`QA_CHECKLIST.md`](QA_CHECKLIST.md).

---

## Git safety

Agents do **not** commit, push, or stage unless operator approves. Stage **exact paths** only — never `git add .`

Pushing runtime to `main` triggers GitHub Pages deploy — confirm intent first.
