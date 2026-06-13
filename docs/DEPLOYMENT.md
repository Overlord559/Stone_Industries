# Stone Industries — Deployment

**Last updated:** 2026-05-25 · **Project OS v2**  
**Also read:** [`PRODUCTION_READINESS.md`](PRODUCTION_READINESS.md)

---

## Production host — Netlify Free (recommended)

Stone Industries is a **commercial service site** (pricing, service pages, phone CTAs). **Netlify Free** is the recommended production host for commercial use at $0.

| Item | Value |
|------|-------|
| **Host** | [Netlify](https://www.netlify.com) — Free tier |
| **Live URL (canonical)** | https://stoneindustries.netlify.app/ |
| **Source** | GitHub repo `stone_industries website` |
| **Build** | `npm run build` → publish `dist/` |
| **Base path** | `/` via `VITE_BASE_PATH=/` |
| **Config** | [`netlify.toml`](../netlify.toml) at repo root |

### Why Netlify (not Vercel Hobby for production)

| Platform | Commercial production | Notes |
|----------|----------------------|-------|
| **Netlify Free** | **Yes — recommended** | Suitable for commercial static sites on free tier |
| **Vercel Hobby** | **No** | Personal/non-commercial; use **Vercel Pro** only if operator upgrades later |
| **GitHub Pages** | **Fallback / mirror** | Fine for repo preview; not the primary commercial marketing URL |

---

## One-time Netlify setup (operator)

| Step | Action |
|------|--------|
| 1 | Push repo to GitHub (if not already) |
| 2 | Sign in at [app.netlify.com](https://app.netlify.com) |
| 3 | **Add new site** → **Import an existing project** → GitHub |
| 4 | Select repo `stone_industries website` |
| 5 | Confirm build settings (from `netlify.toml` or manual): |
| | **Build command:** `npm run build` |
| | **Publish directory:** `dist` |
| | **Environment variable:** `VITE_BASE_PATH` = `/` |
| 6 | Deploy → note site URL (`*.netlify.app`) |
| 7 | Run [post-deploy smoke test](#post-deploy-smoke-test-netlify) |
| 8 | After Netlify URL is confirmed, update `index.html` `og:url` and `twitter:image` to Netlify URL (or custom domain when added) |

Netlify reads [`netlify.toml`](../netlify.toml) automatically — env var is set there; verify it appears in **Site configuration → Environment variables**.

### Optional: disable GitHub Pages auto-deploy

GitHub Pages still deploys on push to `main` via `.github/workflows/deploy.yml`. Options:

- **Keep both** — GitHub Pages as fallback mirror at `/Stone_Industries/`; Netlify as canonical production URL
- **Disable GitHub Pages** — turn off Pages in repo Settings or pause workflow when Netlify is live and smoke-tested

Do not disable GitHub Pages until Netlify smoke test passes.

---

## GitHub Pages — fallback / preview mirror

| Item | Value |
|------|-------|
| **Workflow** | `.github/workflows/deploy.yml` |
| **Trigger** | Push to `main` or manual `workflow_dispatch` |
| **URL** | https://overlord559.github.io/Stone_Industries/ |
| **Base path** | `/Stone_Industries/` (default when `VITE_BASE_PATH` unset in CI) |
| **Build** | `npm ci` + `npm run build` → artifact `./dist` |

GitHub Actions does **not** set `VITE_BASE_PATH` — build uses default `/Stone_Industries/`. **Do not change the default** in `vite.config.ts` unless operator approves removing GitHub Pages mirror.

**Role:** Source-repo preview and backup host — **not** the primary commercial production URL once Netlify is live.

---

## Vercel — Pro only (future option)

**Do not use Vercel Hobby for Stone Industries production** — commercial service site with pricing pages.

| Tier | Use |
|------|-----|
| **Hobby** | **Not for production** — personal/non-commercial per Vercel terms |
| **Pro** | Future option if operator upgrades — set `VITE_BASE_PATH=/`, same build as Netlify |

Code remains Vercel-compatible via `VITE_BASE_PATH` env var; no Vercel-specific config required today.

---

## Multi-host compatibility

| Host | `VITE_BASE_PATH` | Asset URLs | Config |
|------|------------------|------------|--------|
| **Netlify (production)** | `/` | `/assets/...` | `netlify.toml` |
| **GitHub Pages (mirror)** | `/Stone_Industries/` (default) | `/Stone_Industries/assets/...` | `.github/workflows/deploy.yml` |
| **Vercel Pro (future)** | `/` | `/assets/...` | Project env var |

**`vite.config.ts`** — no change required:

```ts
const repoBasePath = process.env.VITE_BASE_PATH ?? '/Stone_Industries/'
base: mode === 'production' ? repoBasePath : '/',
```

**`index.html`** — hero preload uses Vite `%BASE_URL%` placeholder (Netlify + GitHub Pages safe).

**`import.meta.env.BASE_URL`** — used by `site.ts` for React runtime links.

**Static HTML pages** (`public/pricing.html`, `public/services/*.html`) use **relative links** — work on Netlify root and GitHub Pages subpath without redirects.

**Redirects:** Not required for current static funnel. Do not add SPA catch-all rules that could shadow `pricing.html` or service detail pages.

### Canonical URL / social meta

- **Canonical production URL:** https://stoneindustries.netlify.app/
- **`og:url` / `og:image` / `twitter:image`** in `index.html` point to Netlify (update when custom domain is added)
- **GitHub Pages** remains mirror/preview only — do not use as canonical `og:url`

### Local production preview

```powershell
cd "C:\dev\stone_industries website"

# Netlify / root production parity
$env:VITE_BASE_PATH="/"
npm run build
npm run preview

# GitHub Pages mirror parity
Remove-Item Env:VITE_BASE_PATH -ErrorAction SilentlyContinue
npm run build
npm run preview
# Preview URL will include /Stone_Industries/ base
```

---

## Vite base path caution

Wrong `VITE_BASE_PATH` → blank page or 404 assets. Always smoke-test after host or env change.

| Host | `VITE_BASE_PATH` |
|------|------------------|
| **Netlify (production)** | `/` |
| GitHub Pages (this repo) | `/Stone_Industries/` |
| Vercel Pro / custom domain at root | `/` |

---

## Free deployment plan (no paid services)

1. **Netlify Free** — **primary commercial production**, $0
2. **GitHub Pages** — fallback mirror / repo preview, $0
3. **Vercel Pro** — deferred; Hobby not for commercial production
4. **Custom domain** — deferred (no budget)
5. **Dedicated business phone** — deferred; `559-579-9376` on site today
6. **Google Business Profile** — operator task post-Netlify deploy

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

No backend required. Netlify + GitHub Pages compatible via relative links and `%BASE_URL%` in React.

---

## Supabase / Stripe plan

### Supabase — **minimal inquiry capture (implemented)**

| Item | Value |
|------|-------|
| **Purpose** | Structured lead capture from homepage + pricing/services pages |
| **Schema** | [`docs/supabase/stone-industries-inquiries.sql`](supabase/stone-industries-inquiries.sql) |
| **Submit path** | `POST /api/inquiries` (Cloudflare Functions) → Supabase; fallback to anon insert if API unavailable |
| **Client auth** | Public **anon key only** for fallback — service role server-side only |
| **Cloudflare build env** | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |
| **Cloudflare Functions env** | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, optional `RESEND_*`, `HUBSPOT_PRIVATE_APP_TOKEN`, `STONE_NOTIFY_EMAIL` — see [`CLOUDFLARE_MIGRATION.md`](CLOUDFLARE_MIGRATION.md) |
| **Fallback** | Mailto + `tel:+15595799376` when save fails or env unset |
| **Not in scope** | Auth, customer portal, on-site checkout, AI chat |

**Operator steps:** Run SQL in Supabase → set Cloudflare build + Functions env vars → redeploy → submit test inquiry → verify row in Table Editor + operator email if Resend configured.

Lead routing detail: [`CRM_HUBSPOT_LEAD_ROUTING.md`](CRM_HUBSPOT_LEAD_ROUTING.md).

### Payments — **Bluevine near-term (no site checkout)**

- No embedded checkout on static site; **no card data** collected on the marketing site
- **Near-term:** Written quote → **Bluevine invoice or payment link** (see [`SERVICE_AGREEMENT_BASELINE.md`](SERVICE_AGREEMENT_BASELINE.md) and `public/pricing.html`)
- Deposits and balance-before-handoff rules on pricing page

### Stripe — **optional later**

- No embedded checkout on static site
- **Later:** Hosted Stripe Payment Link when operator prefers it for specific packages
- **Later:** Checkout only if standardized packages sell repeatedly
- **Future webhooks:** Verify Stripe signatures server-side only — never trust browser/client payment state
- **Secrets:** Stripe secret keys and webhook signing secrets stay in server/Netlify env — never in `VITE_*` frontend vars

---

## Post-deploy smoke test (Netlify)

Run on live Netlify URL (https://stoneindustries.netlify.app/):

- [ ] `/` — homepage loads, assets 200
- [ ] `/pricing.html`
- [ ] `/services.html`
- [ ] `/services/tech-cleanup.html`
- [ ] `/services/business-websites.html`
- [ ] `/services/wifi-printer-pos.html`
- [ ] `/services/logistics-coordination.html`
- [ ] `/services/ai-workflow-automation.html`
- [ ] `/capability-brief.html`
- [ ] `/privacy.html`
- [ ] `/terms.html`
- [ ] Background WebP loads (Network tab)
- [ ] Mailto opens with subject
- [ ] `tel:+15595799376` on hero, contact, static pages
- [ ] Mobile sticky bar visible below 768px — Call + View Pricing
- [ ] 375px and 320px — no horizontal scroll; sticky bar does not cover contact CTAs
- [ ] No console errors on homepage happy path
- [ ] Inquiry form on `/`, `/pricing.html`, `/services.html` — submit test row when Supabase configured
- [ ] Mailto/tel fallback still visible when Supabase env vars unset

See [`QA_CHECKLIST.md`](QA_CHECKLIST.md).

---

## Cloudflare Pages (production — stoneindustriesusa.com)

Primary production host and cache rules: [`CLOUDFLARE_MIGRATION.md`](CLOUDFLARE_MIGRATION.md).

**After deploy that touches inquiry, HTML, or fixed-name public JS:**

1. Cloudflare → **Caching** → **Purge Everything**
2. Test https://stoneindustriesusa.com/ on normal URL (no `?v=`)
3. Hard refresh + Incognito; confirm inquiry saves to Supabase

`public/_headers` ships with `dist/` — HTML and lead-capture JS use `no-cache`; Vite `/assets/*` stays `immutable`.

---

## Rollback

| Host | Rollback |
|------|----------|
| **Netlify** | **Deploys** → select prior successful deploy → **Publish deploy** |
| GitHub Pages | Revert commit on `main`; workflow redeploys prior artifact |

**Do not** force-push without operator approval.

---

## Git safety

Agents do **not** commit, push, or stage unless operator approves. Stage **exact paths** only — never `git add .`

Pushing runtime to `main` triggers GitHub Pages mirror deploy — confirm intent. Netlify deploys on its own hook when connected to GitHub.
