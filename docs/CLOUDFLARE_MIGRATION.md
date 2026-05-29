# Stone Industries — Cloudflare Pages Migration

**Last updated:** 2026-05-28  
**Status:** Prep complete — deploy on Friday (operator action)  
**Reason:** Netlify free credits suspended; Cloudflare Pages is the preferred $0 commercial host.

---

## Target stack

| Layer | Tool | When |
|-------|------|------|
| Static hosting | **Cloudflare Pages** | Friday deploy |
| Admin CRM API | **Cloudflare Pages Functions** | Same project |
| Domain registrar | **Cloudflare Registrar** | Friday — buy `.com` |
| Inbound email aliases | **Cloudflare Email Routing** | After domain on Cloudflare |
| Outbound email (real send) | Zoho or Google Workspace | Later — only if volume justifies |
| Scheduling | **Calendly Free** | Friday — Same-Day Tech Visit event |
| Lead DB | Supabase (unchanged) | Already live |
| Rollback host | **Netlify** | Keep site + env until Cloudflare smoke-tested |

**Doctrine:** Domain, hosting, and email are **separate layers**. No paid hosting unless revenue or uptime need justifies it.

---

## Build settings (Cloudflare Pages)

| Setting | Value |
|---------|-------|
| **Framework preset** | None (Vite) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (repo root) |
| **Functions directory** | `functions/` (auto-detected at repo root) |
| **Node version** | 20+ (Pages default or set in dashboard) |

### Build-time environment variables (public — browser)

Set in **Pages → Settings → Environment variables** for **Production** and **Preview**:

| Variable | Value | Notes |
|----------|-------|-------|
| `VITE_BASE_PATH` | `/` | Required — root deploy |
| `VITE_SUPABASE_URL` | Supabase project URL | Same as Netlify |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | Insert-only RLS path |

Optional analytics (same as Netlify if configured):

| Variable | Purpose |
|----------|---------|
| `VITE_GA_MEASUREMENT_ID` | Google Analytics |
| `VITE_CLARITY_PROJECT_ID` | Microsoft Clarity |

### Runtime environment variables (Functions only — never in browser)

| Variable | Scope | Purpose |
|----------|-------|---------|
| `SUPABASE_URL` | Functions | Supabase REST base |
| `SUPABASE_SERVICE_ROLE_KEY` | Functions | Admin read/update only |
| `STONE_ADMIN_TOKEN` | Functions | Shared secret for `/admin/leads.html` |

**Never** prefix service role or admin token with `VITE_`. **Never** commit these values.

---

## Pages Functions (Admin CRM)

| Cloudflare route | File | Method | Netlify equivalent |
|------------------|------|--------|-------------------|
| `/admin/leads` | `functions/admin/leads.js` | GET | `/.netlify/functions/admin-leads` |
| `/admin/lead-update` | `functions/admin/lead-update.js` | PATCH | `/.netlify/functions/admin-lead-update` |

Behavior matches Netlify functions:

- Requires `X-Stone-Admin-Token` header
- Service role key server-side only
- Status update only — no deletes, no bulk actions
- Same inquiry fields and status workflow (`new` → `lost`)

Admin UI (`public/admin/leads.js`) auto-detects host:

- `*.netlify.app` → Netlify function paths (rollback)
- All other hosts → Cloudflare function paths

---

## Security headers

Netlify headers live in `netlify.toml`. Cloudflare uses `public/_headers` (copied to `dist/` by Vite):

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## What stays static (unchanged)

No server functions required for:

- React homepage (`/`)
- Static funnel: `/pricing.html`, `/services.html`, `/services/*.html`
- Legal: `/privacy.html`, `/terms.html`
- Capability brief, inquiry forms (browser → Supabase anon insert)
- `public/admin/leads.html` shell + CSS (JS calls Functions API)

---

## Cloudflare Pages project setup (operator — Friday)

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select GitHub repo `stone_industries website`
4. Production branch: `main`
5. Build command: `npm run build`
6. Output directory: `dist`
7. Add build env vars: `VITE_BASE_PATH=/`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
8. Add **Functions** env vars (Production): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STONE_ADMIN_TOKEN`
9. Deploy → note `*.pages.dev` URL
10. Run [smoke test](#post-deploy-smoke-test) before switching DNS

**Do not delete Netlify** until Cloudflare smoke test passes.

---

## Custom domain (later — same Friday session if time)

1. Buy domain via **Cloudflare Registrar** (e.g. `stoneindustries.com`)
2. Pages project → **Custom domains** → add domain
3. Cloudflare DNS auto-configures for Pages
4. Update `index.html` `og:url` and social meta to new domain
5. Keep Netlify deploy published as rollback until domain verified 24–48h

---

## Email Routing (later — after domain)

Cloudflare Email Routing is **receive-only** (forwarding):

1. Domain on Cloudflare → **Email** → **Email Routing**
2. Create aliases (e.g. `hello@`, `leads@`) → forward to personal inbox
3. **Do not** promise automated outbound email until Zoho/Workspace + SPF/DKIM/DMARC

See [`EMAIL_PHASE2.md`](EMAIL_PHASE2.md).

---

## Rollback plan (Netlify preserved)

| Scenario | Action |
|----------|--------|
| Cloudflare deploy broken | Point traffic back to https://stoneindustries.netlify.app/ |
| Admin CRM broken on CF only | Use Netlify URL for `/admin/leads.html` (functions still live) |
| Need prior static build | Netlify **Deploys** → publish prior successful deploy |
| Git rollback | Revert commit on `main`; both hosts rebuild from Git |

**Repo keeps:**

- `netlify.toml` — unchanged
- `netlify/functions/admin-leads.js` — unchanged
- `netlify/functions/admin-lead-update.js` — unchanged

Cloudflare additions do not remove Netlify compatibility.

---

## Endpoint mapping reference

| Operation | Netlify | Cloudflare Pages |
|-----------|---------|------------------|
| List leads | `GET /.netlify/functions/admin-leads` | `GET /admin/leads` |
| Update status | `PATCH /.netlify/functions/admin-lead-update` | `PATCH /admin/lead-update` |
| Auth header | `X-Stone-Admin-Token` | Same |
| Admin UI | `/admin/leads.html` | Same |

---

## Post-deploy smoke test

Run on Cloudflare `*.pages.dev` URL (then custom domain when added):

- [ ] `/` — homepage, assets 200
- [ ] `/pricing.html` — package request form submits to Supabase
- [ ] `/services.html` and one service detail page
- [ ] `/privacy.html`, `/terms.html`
- [ ] Security headers present (check response headers)
- [ ] `/admin/leads.html` — token gate, list loads, status update persists in Supabase
- [ ] Mobile 375px / 320px — no horizontal scroll
- [ ] Mailto + `tel:+15595799376` still work

Compare against Netlify smoke list in [`DEPLOYMENT.md`](DEPLOYMENT.md).

---

## Friday setup checklist

| # | Task | Owner |
|---|------|-------|
| 1 | Buy `.com` via Cloudflare Registrar | Edward |
| 2 | Create Cloudflare Pages project (GitHub connect) | Edward |
| 3 | Set build env: `VITE_BASE_PATH=/`, Supabase public vars | Edward |
| 4 | Set Functions env: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STONE_ADMIN_TOKEN` | Edward |
| 5 | Deploy → smoke test on `*.pages.dev` | Edward + Cursor if needed |
| 6 | Connect custom domain to Pages | Edward |
| 7 | Enable Email Routing aliases (receive-only) | Edward |
| 8 | Create Calendly **Stone Same-Day Tech Visit** (60 min, 2h notice) | Edward |
| 9 | Test package request + Admin CRM end-to-end | Edward |
| 10 | Update canonical URL / og meta when domain live | Cursor (after approval) |
| 11 | Keep Netlify live until CF verified; then optional pause Netlify | Edward |

---

## Related

- Admin CRM: [`ADMIN_CRM.md`](ADMIN_CRM.md)
- Legacy Netlify deploy: [`DEPLOYMENT.md`](DEPLOYMENT.md)
- Booking: [`BOOKINGOPS_PHASE2.md`](BOOKINGOPS_PHASE2.md)
- Operator Brain: `c:\dev\operator-brain\projects\stone-industries.md`
