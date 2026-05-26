# Stone Industries — QA Checklist

**Last updated:** 2026-05-25 · **Project OS v2**  
**Routing:** [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md) → deployment/technical rows  
**Evals:** [`EVALS.md`](EVALS.md)  
Run before commit or deploy when runtime files changed.

---

## Build / lint

From repo root:

```powershell
npm run build
npm run lint
```

| Check | Pass criteria |
|-------|---------------|
| TypeScript build | Exit 0 |
| ESLint | Exit 0 |
| Dist output | `dist/` contains `index.html` and assets |

Optional preview: `npm run preview` — open printed local URL.

---

## Desktop QA (≥1024px)

- [ ] Hero: headline, subcopy, primary CTA readable
- [ ] Primary CTA contrast on light buttons (dark text visible)
- [ ] Services section: all 5 services visible with inquiry links
- [ ] Vision section: future items labeled **not sold today**
- [ ] Contact: mailto opens with subject; phone link uses `tel:+15595799376`
- [ ] Navbar anchor links scroll to sections
- [ ] Footer links: privacy, terms, capability brief

---

## 375px QA (iPhone standard)

- [ ] No horizontal scroll
- [ ] Hero text readable without zoom
- [ ] CTAs tappable (min ~44px touch target)
- [ ] Phone number visible without excessive scrolling
- [ ] Sticky/fixed elements do not cover submit or primary CTA

---

## 320px QA (narrow fallback)

- [ ] Layout does not break
- [ ] Long service titles wrap cleanly
- [ ] Mailto/tel still reachable

---

## Background image checks

- [ ] Main DALRM hero visible — sign/art not fully crushed by scrim
- [ ] Lower coastal-tech image visible — not uniform black
- [ ] Mobile: no broken `background-attachment: fixed` jank
- [ ] Reduced motion: site usable with motion minimized

---

## Orb interaction checks

- [ ] Orbs do not cover hero signage or primary CTAs
- [ ] WebGL hidden or minimal below `lg` if configured
- [ ] Console: no uncaught WebGL errors breaking page

---

## Mailto / tel checks

- [ ] Each service inquiry link includes correct subject (see `site.ts`)
- [ ] Contact section mailto works
- [ ] `tel:+15595799376` dialable on mobile test device or emulator

---

## Legal / capability checks

- [ ] `/privacy.html` loads — inquiry form data collection accurately described (with base path in production)
- [ ] `/terms.html` loads
- [ ] `/capability-brief.html` loads — positioned as subcontracting, not primary local CTA
- [ ] No fake testimonials or contract logos

---

## Console check

- [ ] No uncaught errors on homepage happy path
- [ ] Note acceptable warnings (chunk size, dev-only)

---

## Asset path check

- [ ] Backgrounds served from `/assets/` on **Netlify production** (`VITE_BASE_PATH=/`)
- [ ] GitHub Pages mirror (if enabled): `/Stone_Industries/assets/`
- [ ] No references to repo-root draft images
- [ ] `og-image.svg` and favicon load

---

## Inquiry form check (Supabase)

- [ ] Homepage Contact section form loads without console errors
- [ ] `/pricing.html` and `/services.html` inquiry sections render
- [ ] Client validation: name + message required; email **or** phone required
- [ ] Honeypot field hidden; filled honeypot rejects submit
- [ ] With Supabase env configured: test submit creates row in `public.inquiries`
- [ ] With env unset: submit disabled on React form; static form shows mailto/tel fallback note
- [ ] Submit failure shows error + mailto/tel still available
- [ ] No service role key in repo, build output, or client bundle

---

## Netlify post-deploy smoke (production)

Run on live Netlify URL after deploy — https://stoneindustries.netlify.app/ — see [`DEPLOYMENT.md`](DEPLOYMENT.md):

- [ ] `/`, `/pricing.html`, `/services.html` — 200
- [ ] All five `/services/*.html` detail pages — 200
- [ ] `/capability-brief.html`, `/privacy.html`, `/terms.html` — 200
- [ ] Hero primary CTA → `/pricing.html`
- [ ] `tel:+15595799376` on hero, contact, static pages
- [ ] Mobile sticky bar (Call + View Pricing) at 375px and 320px
- [ ] No horizontal scroll; sticky bar does not cover contact CTAs

---

## Productized pricing check

- [ ] `public/pricing.html` package overview shows website tiers from $399 / $799 / $1,199+
- [ ] All five `public/services/*.html` show 3 fixed packages + add-on list with $ labels
- [ ] `src/data/pricingCatalog.ts` matches static page prices (grep spot-check)
- [ ] React Services section shows updated `startingAtLabel` from catalog
- [ ] CTAs: Request This Package / Compare Packages — no “instant checkout” or embedded pay

---

## Package estimator check (`pricing.html`)

- [ ] `#package-estimator` renders after selecting service + package
- [ ] Add-ons hidden until package selected; only current service add-ons shown
- [ ] Estimator has **no** standalone “What is secure lead capture?” block above add-ons
- [ ] Add-on rows are compact with collapsed **Details** — grouped one-time / hourly / monthly
- [ ] **Post-launch QA** does not appear in public catalog, Premium included list, or service pages
- [ ] Tech Cleanup states **Windows only** — no phones/Linux; macOS case-by-case
- [ ] Paid ads copy = setup/guidance only — no campaign management or guaranteed ROI
- [ ] AI copy includes AI-agent-style workflows + human approval — no employee replacement
- [ ] Premium Website included add-ons show **What this includes** details without double-charging
- [ ] Service pages with `data-si-service-addons` render catalog-driven add-on accordions (5 service pages)
- [ ] Business websites page clarifies secure lead capture vs Tier 1/Tier 2 cybersecurity
- [ ] SEO copy distinguishes basic SEO/meta vs deeper SEO/ads/campaigns — no guaranteed rankings
- [ ] AI copy mentions AI models, APIs, n8n-style automation — no employee replacement
- [ ] Business: page-count defaults to 5; 8 pages → +$375 (3 × $125); 10+ shows final-quote note
- [ ] Premium Website: page-count defaults to 7; 9 pages → +$250 (2 × $125); included add-ons not summed again
- [ ] No separate “Extra page” checkbox — page count tied to selected website package only
- [ ] Premium Website: lead capture + cyber tiers + Stripe + copy + QA listed included, not summed; monthly care still optional
- [ ] Business Website does NOT include secure lead capture in package price (optional add-on) unless operator changed scope
- [ ] Breakdown shows package line, one-time add-ons, hourly/monthly notes separately
- [ ] Estimated **one-time total** excludes monthly retainer and hourly lines
- [ ] Mailto body includes estimated pages, extra-page line, breakdown + hourly/monthly notes
- [ ] `pricing-catalog.js` loads before `pricing-estimator.js` — no console errors
- [ ] URL `?service=&package=&addons=` preselects when present

---

## Competitive positioning check

- [ ] `pricing.html` and `services.html` include **Where Stone Industries fits** — no competitor names
- [ ] `pricing.html` and `services.html` include **Local First. Bigger Vision.** — no defense/enterprise/MSP/3PL maturity claims
- [ ] Copy does not claim full MSP, marketing agency, AI agency, freight broker, or 3PL
- [ ] Operations service titled **Operations & Logistics Coordination Setup** (URL slug may remain `logistics-coordination`)
- [ ] Logistics page includes freight broker / carrier / 3PL disclaimer
- [ ] Website copy: basic SEO in package; advanced SEO/ads = custom — no guaranteed marketing results
- [ ] AI copy: human approval, start one workflow — no employee replacement
- [ ] Grep public pages: no AMARQUEZ, Kotman, Loops, or other competitor names

---

## Static page background check

- [ ] `pricing.html`, `services.html`, all five service pages use `page-atmosphere--coastal`
- [ ] `stone-coastal-tech-bg.webp` visible but text readable (no STONE-001 over-darkening)
- [ ] Mobile 375px / 320px: no horizontal scroll; background `scroll` not broken
- [ ] Homepage hero unchanged

---

## Payment protection copy check

- [ ] `public/pricing.html` includes workflow, how payment works, scope protection, final delivery, approval, disputes/refunds
- [ ] Copy states no card data on site and no instant checkout
- [ ] Bluevine mentioned as near-term invoicing; no custom invoice generator implied on site
- [ ] Deposit tiers ($300 / $1,000+) and balance-before-handoff present
- [ ] Out-of-scope hourly range ($85–$125) and written change-order language present
- [ ] No unlimited-refund promise; no “all deposits non-refundable” without counsel
- [ ] [`SERVICE_AGREEMENT_BASELINE.md`](SERVICE_AGREEMENT_BASELINE.md) exists for operator use

---

## Secure-by-default packaging check

- [ ] Each `public/services/*.html` has “Secure-by-default” section with service-specific bullets
- [ ] `public/pricing.html` and `public/services.html` include global disclaimer (not hacker-proof; no PCI/HIPAA/SOC 2 unless scoped)
- [ ] No copy claims military-grade, hacker-proof, or formal PCI/HIPAA/SOC 2 compliance
- [ ] Website package mentions privacy/terms, secure inquiry, headers, Stripe **Payment Link** setup add-on — not embedded card forms; **no Stripe SDK in repo**
- [ ] AI package mentions human approval and no card handling by AI
- [ ] `src/data/site.ts` `securityIncluded` arrays align with static pages

---

## No fake claims check

- [ ] Services match deliverable scope in `site.ts`
- [ ] Future roadmap not sold as current product
- [ ] AI service copy includes human review — no “autonomous agent” promises
- [ ] Veteran-led / subcontracting claims honest — no invented wins

---

## Security pre-deploy (V2)

- [ ] No `SUPABASE_SERVICE_ROLE`, `sk_live`, `sk_test`, or real anon keys in repo or `dist/`
- [ ] `docs/supabase/stone-industries-inquiries.sql` applied in Supabase before first production submit
- [ ] RLS enabled on `public.inquiries`; anon has INSERT only (no SELECT/UPDATE/DELETE policies)
- [ ] Column-scoped INSERT grant; REST POST with `status: closed` fails
- [ ] Netlify env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` only — never service role in `VITE_*`
- [ ] `inquiry-config.js` in `dist/` exposes only public URL + anon key (expected when configured)
- [ ] Privacy page matches form fields + sensitive-data warning + retention note
- [ ] Security headers present in `netlify.toml` (X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy)
- [ ] CSP / CAPTCHA / rate limit: deferred — see [`PRODUCTION_READINESS.md`](PRODUCTION_READINESS.md) security backlog
- [ ] Browser Network tab: no PII in console logs on submit success/failure

---

## Pre-commit hygiene

```powershell
git status --short
```

- [ ] No untracked `*.webp` at repo root
- [ ] Only intended files modified
- [ ] Docs-only pass did not touch `src/` unless scoped

---

## Learning loop

After QA, note: new `STONE-NNN` lesson or reason code per [`LEARNING_LOOP.md`](LEARNING_LOOP.md).
