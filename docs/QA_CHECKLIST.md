# Stone Industries — QA Checklist

**Last updated:** 2026-05-30 · **Project OS v2**  
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

- [ ] **Full viewport shell:** `#root`, `main`, and app wrapper span 100% width — no ~375px column stuck on the left with blank dark area
- [ ] **Navbar:** desktop links visible (`md:flex`); hamburger hidden at ≥768px
- [ ] **Hero:** full-width content column; no empty dark half-viewport; hero rocket accent in mapped sky zone (desktop `lg+` only)
- [ ] Hero: headline, subcopy, primary CTA readable
- [ ] Primary CTA contrast on light buttons (dark text visible)
- [ ] Services section: all **7** current services visible with inquiry links
- [ ] Vision section: future items labeled **not sold today**; direction tiles link to `/vision.html` anchors
- [ ] Contact: inquiry form primary; **Copy email** + **Open Gmail** in `EmailContactActions` (inside form); footer = plain email/phone links only — no duplicate email action stack
- [ ] Homepage navbar stays visible while scrolling (sticky; not broken by root `overflow-hidden`)
- [ ] Navbar: Services → `/services.html`; Pricing → `/pricing.html`; Vision → `/vision.html`
- [ ] Footer links: privacy, terms, capability brief
- [ ] **Certification trust (STONE-034):** Hero micro-row (VOSB/SDVOSB/SAM.gov, no disclaimer); About section full strip with short disclaimer; footer compact line only (no repeated long disclaimer); capability brief + terms retain short GovCon disclaimer; no contract-win claims
- [ ] **Credibility cleanup (2026-05-30):** No “Contact Edward”, Google Workspace setup copy, or “Online capture is not configured” on customer-facing pages; email actions are **Copy email** + **Open Gmail** (no “Open email app” / “Open Gmail draft”); pricing **Quotes and payment** + **Handoff, delivery, and changes** collapsible (default closed)
- [ ] **Recurring care (STONE-035):** Homepage `#recurring-care` block links to pricing anchors; pricing payment bullet mentions optional monthly care
- [ ] **Capability brief parity (STONE-035):** `capability-brief.html` + `.txt` list seven current services and bounded certification language
- [ ] Re-test at **1280px** and **1440px** after any mobile or service-copy pass — mobile QA alone is not enough
- [ ] **Full-page scroll:** no persistent bright cyan/blue vertical rail on right edge at 1440px (homepage + static pricing)
- [ ] **Hero rocket accent:** in clear sky zone above embedded sign — does not overlap Stone Industries sign in DALRM background; sign remains readable
- [ ] **Hero rocket shape:** vertical retro silhouette (nose, body, window, fins, exhaust) — not hovercraft/UFO (**STONE-032**)
- [ ] **Hero rocket interaction:** real browser QA — hover hitbox; pointer tilt; hold → plume; drag-off/window release stops; Tab + Space/Enter thrust (**STONE-033**)
- [ ] **Hero rocket stacking:** accent above hero copy layer — pointer not blocked by full-width `z-10` text column

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

## Mailto / tel / email copy checks

- [ ] Visible email `edward@stoneindustriesusa.com` on homepage contact, footer, pricing, services, all **six** service detail pages
- [ ] **Copy email** shows “Email copied.” on click (React + static `contact-email.js`)
- [ ] **Open email app** uses `mailto:edward@stoneindustriesusa.com?subject=Stone%20Industries%20Inquiry`
- [ ] No Gmail web compose / Google account picker URLs (`mail.google.com`, `accounts.google.com`)
- [ ] Each service inquiry mailto (estimator) includes correct subject when used
- [ ] Contact section mailto works when buyer has a mail client
- [ ] `tel:+15595799376` dialable on mobile test device or emulator

---

## Legal / capability checks

- [ ] `/privacy.html` loads — professional sections (effective date, collection, use, providers, retention, rights); no “simple baseline” / counsel disclaimer
- [ ] `/terms.html` loads — professional sections including GovCon disclaimer, payment rules, no-guarantee language
- [ ] `/capability-brief.html` loads — positioned as subcontracting, not primary local CTA
- [ ] No fake testimonials or contract logos

---

## Console check

- [ ] No uncaught errors on homepage happy path
- [ ] Note acceptable warnings (chunk size, dev-only)

---

## Asset path check

- [ ] Backgrounds served from `/assets/` on **Cloudflare Pages production** (`VITE_BASE_PATH=/`)
- [ ] GitHub Pages mirror (if enabled): `/Stone_Industries/assets/`
- [ ] No references to repo-root draft images
- [ ] `og-image.svg` and favicon load

---

## Homepage navigation + service card CTAs

- [ ] Top nav **Services** opens `/services.html` (not `#services` scroll only)
- [ ] Top nav **Pricing** opens `/pricing.html`
- [ ] Top nav **Contact** scrolls to `/#contact`
- [ ] Hero “View services” (or equivalent) may still use `#services` internal anchor
- [ ] Each homepage service card **Compare** button → `/pricing.html?service=<slug>` (estimator preselect)
- [ ] Each homepage service card **Request This Package** → contact form on **first click** (no jump to hero/top)
- [ ] Repeated Request clicks stay on contact section with correct service preselected
- [ ] Each homepage **3D service object** → `/pricing.html?service=<slug>` with keyboard focus ring
- [ ] Each homepage **3D vision object** / direction tile → `/vision.html#<anchor>` with keyboard focus ring
- [ ] Hero has no prominent Call button — phone is plain text near inquiry path
- [ ] Mobile sticky bar shows **Inquiry** + **Pricing** (not Call + Pricing)
- [ ] Mobile nav opens Services/Pricing pages; inquiry CTA in menu

---

## Inquiry form check (Supabase + lead router)

- [ ] Homepage Contact section form loads without console errors
- [ ] `/?service=business-websites#contact` preselects **24-Hour Business Websites** in service dropdown
- [ ] `/pricing.html` and `/services.html` inquiry sections render
- [ ] Client validation: name + message required; email **or** phone required
- [ ] Honeypot field hidden; filled honeypot rejects submit
- [ ] With Supabase env configured: test submit creates row in `public.inquiries`; success shows **Inquiry received** only after save
- [ ] Production submit hits `POST /api/inquiries` (Network tab) when deployed on Cloudflare Pages
- [ ] With `RESEND_API_KEY` + `RESEND_FROM` set: Edward receives notification email; customer success still works if email fails
- [ ] With `HUBSPOT_PRIVATE_APP_TOKEN` set: contact appears in HubSpot; customer success still works if HubSpot fails
- [ ] Success panel: **Book free consultation** → Calendly general consultation URL
- [ ] Submit does **not** auto-open Gmail or mailto on success
- [ ] Production QA uses **canonical URL** (`https://stoneindustriesusa.com/`) — not `?v=` cache-bust params
- [ ] After deploy: Cloudflare **Purge Everything** + hard refresh + Incognito test on normal URL
- [ ] `dist/_headers` sets `no-cache` on `/`, `/*.html`, and lead-capture JS (`inquiry-form.js`, etc.)
- [ ] `dist/assets/*` remains `immutable` (hashed Vite bundles)
- [ ] Success fallback buttons: **Book free consultation**, Call/text, Copy inquiry details, **Email instead** — manual only
- [ ] Submit failure shows **Inquiry was not sent automatically** + copy/email draft/call fallbacks (no fake success)
- [ ] With env unset: submit attempts show failure panel with manual fallbacks (not mailto-first success)
- [ ] No service role key in repo, build output, or client bundle

---

## Cloudflare Pages post-deploy smoke (production)

Run on live production URL after deploy — https://stoneindustriesusa.com/ — see [`CLOUDFLARE_MIGRATION.md`](CLOUDFLARE_MIGRATION.md) (Netlify rollback: [`DEPLOYMENT.md`](DEPLOYMENT.md)):

- [ ] `/`, `/ai-revenue-leak-audit`, `/pricing.html`, `/services.html`, `/vision.html` — 200
- [ ] All **six** `/services/*.html` detail pages — 200
- [ ] `/capability-brief.html`, `/privacy.html`, `/terms.html` — 200
- [ ] Hero primary CTA → `/pricing.html`
- [ ] Top nav Services → `/services.html`; Pricing → `/pricing.html`; Vision → `/vision.html`
- [ ] Copy email works on pricing + one service detail page
- [ ] `tel:+15595799376` on hero, contact, static pages
- [ ] Mobile sticky bar (Inquiry + Pricing) at 375px and 320px
- [ ] No horizontal scroll; sticky bar does not cover contact CTAs

---

## AI Revenue Leak Audit landing (2026-05-30)

- [ ] `/ai-revenue-leak-audit` loads — hero, checklist, form, after-audit options, final CTA
- [ ] Top nav **Audit** → `/ai-revenue-leak-audit`
- [ ] Homepage `#revenue-leak-audit` teaser — **See Audit Details** and **Book Audit Call** → `/ai-revenue-leak-audit` (not Calendly)
- [ ] Hero primary audit CTA, navbar Book Audit, mobile sticky Book Audit, contact/footer/services promo audit CTAs → `/ai-revenue-leak-audit`
- [ ] No Starter/Growth/Operator ($199/$499/$999 setup) cards on audit landing or homepage audit section
- [ ] $497 audit price visible on landing page
- [ ] **Book AI Revenue Leak Audit Call** → `https://calendly.com/edward-stoneindustriesusa/30min`
- [ ] Audit form: business name, website, GBP link, contact name, email, phone, biggest problem, permission; optional city + notes
- [ ] **Request Audit Review** submit + **Copy email** + **Open Gmail** on audit form
- [ ] Off-landing audit links use `data-cta="view-ai-revenue-leak-audit"` where applicable
- [ ] Landing: `data-cta="book-ai-revenue-leak-audit"` on Calendly buttons; `data-cta="request-audit-review"` on form scroll CTA
- [ ] `data-page="ai-revenue-leak-audit"` on landing root
- [ ] 375px / 320px — form usable; no horizontal scroll

---

## Custom PC Builds & Upgrades check (2026-05-25)

- [ ] `/services/custom-pc-builds.html` loads with coastal background and readable packages
- [ ] Homepage service card + CSS-3D object routes to `/pricing.html?service=custom-pc-builds`
- [ ] Estimator preselects **Custom PC Builds & Upgrades** from `?service=custom-pc-builds`
- [ ] Homepage **Request This Package** preselects service in inquiry dropdown
- [ ] Static + React inquiry submit with `service_requested = Custom PC Builds & Upgrades`
- [ ] Copy states **parts cost separate** from service fee; no “certified builder” or benchmark guarantees
- [ ] Scope excludes laptops, phones, consoles, Linux, open-loop liquid cooling
- [ ] No competitor names; no “cheaper than [brand]” claims
- [ ] Mobile 375px / 320px — 7 package cards wrap cleanly; no horizontal scroll
- [ ] **Which package should I choose?** guide section present on service page
- [ ] Estimator shows **Best for / Includes / Not included** context after package selection
- [ ] Package dropdown options are **name + price only** — no long text in `<option>` labels
- [ ] Estimator grid/select uses `min-width: 0` / `max-width: 100%` — no horizontal overflow at 375px/320px
- [ ] Simple vs Core upgrade differentiation clear in context panel and service page
- [ ] Basic vs Standard vs Gaming vs Showcase differentiation clear
- [ ] `parts-plan` hides optional add-ons (planning only)
- [ ] Included add-ons (Windows, cable mgmt, RGB/AIO on Showcase) show in “Included in this package” — not summed again
- [ ] Failed-build diagnostic only on Simple/Core upgrade packages

---

## Productized pricing check

- [ ] `public/pricing.html` package overview shows website tiers from $399 / $799 / $1,199+
- [ ] All **six** `public/services/*.html` show fixed packages + add-on list with $ labels
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
- [ ] Service pages with `data-si-service-addons` render catalog-driven add-on accordions (**7** service pages incl. `mobile-app-mvp.html`)
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

- [ ] `pricing.html` and `services.html` include **Built for practical local execution** (`#where-stone-fits`) — positive bullets + one bounded scope sentence; no competitor names
- [ ] `pricing.html` and `services.html` include **Local First. Bigger Vision.** — no defense/enterprise/MSP/3PL maturity claims
- [ ] Copy does not claim full MSP, marketing agency, AI agency, freight broker, or 3PL
- [ ] Operations service titled **Operations & Technology Project Coordination** (URL slug may remain `logistics-coordination`)
- [ ] Mobile MVP service page exists at `public/services/mobile-app-mvp.html`
- [ ] Homepage + catalog order: PC builds and Tier 1 IT before operations coordination
- [ ] Logistics page includes freight broker / carrier / 3PL disclaimer
- [ ] Website copy: basic SEO in package; advanced SEO/ads = custom — no guaranteed marketing results
- [ ] AI copy: human approval, start one workflow — no employee replacement
- [ ] Grep public pages: no AMARQUEZ, Kotman, Loops, or other competitor names

---

## Static page background check

- [ ] `pricing.html`, `services.html`, all **seven** service pages use `page-atmosphere--coastal`
- [ ] `stone-coastal-tech-bg.webp` visible but text readable (no STONE-001 over-darkening)
- [ ] Mobile 375px / 320px: no horizontal scroll; background `scroll` not broken
- [ ] Homepage hero unchanged

---

## Payment protection copy check

- [ ] `public/pricing.html` includes consolidated quotes/payment + scope/handoff sections; secondary policy copy in `<details class="si-policy-details">`
- [ ] `#how-payment-works` anchor resolves (service pages link here)
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
- [ ] Cloudflare Pages build env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` only — never service role in `VITE_*`
- [ ] Cloudflare Functions env: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` for lead router; optional `RESEND_*`, `HUBSPOT_PRIVATE_APP_TOKEN`
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

After QA, note: new `STONE-NNN` lesson, factory `DESIGN-NNN` promotion, or reason code per [`LEARNING_LOOP.md`](LEARNING_LOOP.md).

- [ ] Operator corrections backfill table reviewed when auditing conversion/pricing/contact (`DESIGN_MISTAKE_LEDGER.md` → 26-item index)
- [ ] Serious passes report factory docs loaded (`STONE-023` / `DESIGN-036`)
