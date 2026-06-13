# Stone Industries — Design Mistake Ledger

**Last updated:** 2026-05-25 · **Project OS v2**  
**Routing:** [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md)  
**Factory cross-ref:** [`../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md`](../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md) (DESIGN-024–030)

---

## STONE-001 — No over-darkening generated backgrounds

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-026 |
| **Status** | ACTIVE |

**Problem:** Stacked global scrims made `stone-coastal-tech-bg.webp` nearly invisible.

**Rule:** Lower parallax scrim stays ~10% darker than hero readable zone. Use local glass cards for text — not full-page near-black overlays.

---

## STONE-002 — No 3D overlays over important image focal points

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-026 |
| **Status** | ACTIVE |

**Problem:** Interactive orb accents can block embedded signage, logos, or hero art — especially the Stone Industries sign in `stone-main-dalrm-bg.webp`.

**Rule:** Place orbs in section **empty space** only. Hero orb sits **upper-right** in a mapped clear zone — not centered over embedded signage. Inspect focal points before placing WebGL accents. Hide/minimize below `lg`. Reduce scale/opacity on hero variant when near art.

**QA check:** Full-page desktop scroll at 1440px — orb does not overlap embedded sign; sign remains readable.

---

## STONE-003 — No root generated asset commits

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-027 |
| **Status** | ACTIVE |

**Problem:** Draft `ChatGPT Image*.webp` at repo root risks accidental staging.

**Rule:** Production assets live in `public/assets/`. Stage exact paths — never `git add .` on visual passes.

---

## STONE-004 — Tailwind class validity

| Field | Value |
|-------|-------|
| **Severity** | WARNING |
| **Factory link** | DESIGN-028 |
| **Status** | ACTIVE |

**Problem:** Invalid utilities (e.g. `py-22`) compile with no CSS output.

**Rule:** Use scale tokens or bracket syntax. Grep build output when spacing looks wrong.

---

## STONE-005 — Conversion before spectacle

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029, DESIGN-003 |
| **Status** | ACTIVE |

**Problem:** Cinematic backgrounds passed visual QA while service inquiry was secondary to capability brief; phone buried on mobile.

**Rule:** Service inquiry/call primary. Capability brief secondary. Visual upgrades ship only after funnel clarity.

---

## STONE-007 — Service CTAs need pricing/detail pages before backend

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029 |
| **Status** | ACTIVE |

**Problem:** Premium service sites with mailto-only CTAs dead-end without package context — buyers bounce before quoting.

**Rule:** Every current service gets a static pricing/detail page. Homepage card **Compare** → `pricing.html?service=<slug>`. Homepage card **Request** → Supabase inquiry form with `?service=<slug>#contact` preselect — not mailto-only. Per-service detail pages remain at `public/services/*.html`.

**QA check:** No service card mailto-only without working inquiry or pricing path.

---

## STONE-006 — Practical AI service naming

| Field | Value |
|-------|-------|
| **Severity** | WARNING |
| **Factory link** | DESIGN-030 |
| **Status** | ACTIVE |

**Problem:** Vague “agentic” labels overclaim and blur future vs current services.

**Rule:** Use **AI Automation & Digital Assistant Systems** (or equivalent practical naming) with human review in scope. “Agentic-style” is OK when paired with approval gates—not unsupervised autonomy. Future roadmap items stay in Vision section — not Current Services.

---

## STONE-009 — Static pricing pages must inherit homepage visual system before deploy

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-003, DESIGN-008 |
| **Status** | ACTIVE |

**Problem:** Static pricing/service HTML felt like a separate basic site—Segoe UI, flat cards, weak CTA bands—while the React homepage used premium glass, typography, and conversion hierarchy.

**Rule:** `public/static-pages.css` must share fonts, glass cards, hero bands, and CTA styling with the homepage before Netlify deploy. HTML CTAs stay primary; motion stays L3 (CSS hover) only on static pages.

**QA check:** Pricing + all five service pages visually match homepage tone at 375px.

---

## STONE-010 — L3 Advanced Motion is the safe pre-deploy visual tier

| Field | Value |
|-------|-------|
| **Severity** | WARNING |
| **Factory link** | DESIGN-008, DESIGN-014 |
| **Status** | ACTIVE |

**Problem:** Full L7 WebGL, frame-scroll, or visual-world migration before deploy risks conversion regression and deploy delay.

**Rule:** Pre-Netlify polish = CSS glass, card hover, restrained framer-motion, existing orb accents only. Defer frame-scroll and Real 3D until after production is live and smoke-tested.

---

## STONE-008 — Commercial sites need hosting-platform compliance before “free” production

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | — |
| **Status** | ACTIVE |

**Problem:** Vercel Hobby and GitHub Pages were documented as interchangeable free production options for a commercial service site with pricing pages — Hobby is non-commercial per platform terms; GitHub Pages is a poor canonical URL for local business SEO.

**Rule:** **Netlify Free** is the recommended commercial production host. GitHub Pages = mirror/preview only. **Vercel Hobby = not for production** — Vercel Pro only if operator upgrades. Set `VITE_BASE_PATH=/` on Netlify. Update `og:url` after Netlify URL is live.

**QA check:** Post-deploy smoke on Netlify root paths before adding backend (Supabase/Stripe).

---

## STONE-009 — Minimal lead capture: anon insert + RLS + mailto fallback

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | — |
| **Status** | ACTIVE |

**Problem:** Mailto-only intake loses structured leads and makes follow-up harder; overbuilt backend (auth, dashboard, Stripe) slows first-customer shipping.

**Rule:** Use **Supabase anon key + RLS insert-only** on `public.inquiries`. No service role in client. Use **fetch** (no supabase-js) when only INSERT is needed. Inject `inquiry-config.js` at build for static pages. **Always keep mailto/tel fallback** when env vars missing or submit fails. No auth, dashboard, or Stripe in v1.

**QA check:** Test insert with Netlify env set; verify fallback UX with env unset; confirm no SELECT policy for anon.

---

## STONE-010 — Privacy copy must track data-collection changes

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | — |
| **Status** | ACTIVE |

**Problem:** Adding inquiry forms or backend intake while `privacy.html` still claims “no on-site forms” creates legal/trust drift and launch risk.

**Rule:** When forms, analytics, or third-party data storage are added, update **`public/privacy.html`** in the same pass with plain-language fields collected, purpose, storage (e.g. Supabase), fallback paths, and “do not submit sensitive data” guidance. Add QA check for privacy accuracy before deploy.

**QA check:** Privacy page lists inquiry fields; no claim of “no forms” when forms exist.

---

## STONE-011 — Anon lead INSERT must be column-scoped + status locked

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | — |
| **Status** | ACTIVE |

**Problem:** `GRANT INSERT ON TABLE` + permissive RLS lets clients POST `status`, `id`, or timestamps if columns are writable — weak integrity for public lead forms.

**Rule:** For public inquiry tables: **column-level INSERT grant** for lead fields only; RLS `WITH CHECK (status = 'new')`; server defaults own `id` and `created_at`. Never expose service role in frontend.

**QA check:** Direct REST POST with `status: closed` fails; normal form insert succeeds.

---

## STONE-013 — Payment protection copy without scary legal or fake checkout

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | — |
| **Status** | ACTIVE |

**Problem:** Small operators either skip payment/scope language (chargebacks, scope creep, unpaid handoff) or add aggressive legal copy / fake checkout that erodes trust.

**Rule:** On `pricing.html`: practical workflow (quote → Bluevine invoice → deposit → balance before handoff), tiered deposits, scope protection, delivery policy, mild dispute language. **No** card collection on site, **no** instant checkout, **no** unlimited-refund promise, **no** “all deposits non-refundable” without counsel. Internal [`SERVICE_AGREEMENT_BASELINE.md`](SERVICE_AGREEMENT_BASELINE.md) for operator quotes — not a published contract.

**QA check:** Pricing page sections present; grep finds no “hacker-proof”-style payment guarantees.

---

## STONE-017 — Competitor-aware positioning without overclaiming

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029 |
| **Status** | ACTIVE |

**Problem:** Small vendors get compared to agencies, MSPs, AI shops, and freight/3PL providers — vague copy causes buyers to expect the wrong service class or triggers regulated-logistics misread.

**Rule:** Position Stone as **fast fixed-scope** for Fresno/Central Valley SMBs. Public `#where-stone-fits` section: lead with **what Stone delivers** (positive capability bullets); close with **one bounded sentence** for enterprise compliance, freight brokerage, full MSP, advanced paid ads, or full custom software — not repeated “Not a full…” bullets. Operations service = coordination systems (intake, handoffs, SOPs) with **freight broker/carrier/3PL disclaimer**. No competitor names, trade dress, or guaranteed marketing/security/logistics outcomes on public pages.

**QA check:** Grep competitor names on `public/`; logistics disclaimer present; no MSP/compliance/incident-response claims.

---

## STONE-019 — Simplify explanation-heavy estimator; platform and ads scope boundaries

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029 |
| **Status** | ACTIVE |

**Problem:** Add-on education pass made the estimator visually busy; standalone secure-lead-capture callout duplicated add-on details; customer-facing “Post-launch QA” implied websites might ship without basic delivery checks; Tech Cleanup scope was too broad (phones/Linux/macOS).

**Rule:** Keep add-on explanations in collapsed **Details** on each row only — no standalone lead-capture callout. Group add-ons (one-time / hourly / monthly). Remove customer-facing Post-launch QA; use “launch-ready handoff” as delivery standard. Tech Cleanup = **Windows only**; no phones/Linux; macOS case-by-case. Paid ads = setup/guidance only — not campaign management or guaranteed results. AI = models/APIs/n8n + AI-agent-style workflows with human approval.

**QA check:** Estimator Website package — no top lead-capture block; Premium included list has no Post-launch QA; Tech Cleanup page shows Windows scope.

---

## STONE-018 — Add-on education via catalog detail blocks and `<details>` UI

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029 |
| **Status** | ACTIVE |

**Problem:** Buyers confuse secure lead capture with cybersecurity tiers, monthly care with one-time totals, and AI/security add-ons without plain-English scope — especially on mobile estimator UI.

**Rule:** Every catalog add-on gets a `detail` block (`whatThisIs`, `includes`, `notIncluded`, optional `bestFor`) in `addOnExplanations.ts`. Estimator and service pages render native `<details>` accordions — no tooltip-only hints. Distinguish basic SEO/meta from deeper SEO/ads/campaigns; AI copy names models/APIs/n8n-style automation with human-approval guardrails.

**QA check:** Estimator Website → Tier 1 details open; Premium included lead-capture shows details; service pages load `service-addon-details.js` without console errors.

---

## STONE-017 — Page-count control tied to website package; local-first before enterprise claims

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029 |
| **Status** | ACTIVE |

**Problem:** Separate “extra page” add-on on Starter only blocked Business/Premium buyers from estimating over-limit pages; mission copy did not emphasize local conquest before larger expansion; “Premium Local Website” naming was redundant.

**Rule:** Website estimator uses one **page-count control** per selected package (included pages default). Extra pages beyond included = +$125/page line item; 10+ pages show final-quote note. Rename package to **Premium Website**. Public **Local First. Bigger Vision.** section on pricing/services — grounded future path, no premature agency/MSP/3PL/enterprise AI claims.

**QA check:** Estimator Business 8 pages → 3 × $125; Premium 9 pages → 2 × $125; mailto includes page count; grep no “Premium Local Website”.

---

## STONE-016 — Secure lead capture ≠ cybersecurity; page-count packages

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029 |
| **Status** | ACTIVE |

**Problem:** Buyers confuse “secure lead capture” with antivirus/MSP security; website tiers hide page limits; extra-page add-ons on multi-page packages double-charge pages already included.

**Rule:** Document lead capture (form + Supabase + RLS) separately from Tier 1/2 cybersecurity layers. Price websites by page count via estimator page control; extra pages beyond included = +$125/page. Premium Website `includedAddOnIds` bundles one-time add-ons except monthly care. See STONE-017 for page-count UX.

**QA check:** Estimator — Website → Business hides extra page; Premium marks cyber + lead included; mailto lists page count.

---

## STONE-015 — Estimator double-charges included add-ons

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029 |
| **Status** | ACTIVE |

**Problem:** Package estimators that list all add-ons for a service let buyers select items already bundled in a higher tier — inflating estimates and eroding trust.

**Rule:** `pricingCatalog.ts` declares `includedAddOnIds` per package and `kind` (`one-time` / `hourly` / `monthly`) per add-on. Estimator hides included add-ons, lists them separately, and only sums one-time selections into the project total. Hourly/monthly items are notes or mailto lines — not false one-time totals.

**QA check:** Business Website package hides Secure lead capture add-on; Premium hides lead capture + Stripe link; estimator breakdown separates monthly/hourly lines.

---

## STONE-014 — Inquiry-only pricing hides buyers

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029 |
| **Status** | ACTIVE |

**Problem:** Quote-only or “email for price” pages increase friction for local buyers who need a ballpark before calling — especially on mobile.

**Rule:** Show **fixed package tiers** and **add-on prices** on `pricing.html` and each `public/services/*.html`. Use lightweight estimator (no checkout) when helpful. Keep mailto/tel/Supabase inquiry fallback. Mark custom/unclear work as quote-based in writing.

**QA check:** Each service page shows 3 packages with $ labels; pricing overview matches `pricingCatalog.ts`; estimator updates total and mailto subject; no “instant checkout” copy.

---

## STONE-012 — Sell security without overclaiming

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-033 |
| **Status** | ACTIVE |

**Problem:** Service pages either omit security (buyers assume no care) or overclaim “military-grade,” compliance, or hacker-proof protection — both hurt trust and create legal drift.

**Rule:** Package **practical secure-by-default bullets** per service (device safety, secure launch, Wi-Fi/POS guidance, handoffs, guarded AI). Add global disclaimer: included where applicable, **not** hacker-proof; **no** PCI/HIPAA/SOC 2/government compliance claims unless separately contracted. Stripe = hosted Payment Link readiness, not custom card capture.

**QA check:** Service pages have secure-by-default section; pricing/services index has disclaimer; grep finds no hacker-proof / military-grade / false compliance claims.

---

## STONE-013 — Dead homepage CTAs and wrong nav targets

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-003, DESIGN-029 |
| **Status** | ACTIVE |
| **First observed** | Live Netlify QA (2026-05-25) |

**Problem:** Homepage service card **Request This Package** used `mailto:` links — dead clicks when no mail client is configured. Top nav **Services** pointed to `#services` instead of the full `/services.html` catalog page.

**Why it hurts:**

- Buyers think the site is broken after clicking Request
- Services page and package context never reached from primary nav
- Supabase inquiry funnel bypassed on the highest-intent card action

**Rule:**

1. **Request This Package** on homepage cards → `/?service=<slug>#contact` with inquiry dropdown preselect (React + static `inquiry-form.js` read `?service=` slug).
2. **Compare packages** on homepage cards → `/pricing.html?service=<slug>` (estimator already supports query preselect).
3. Top nav **Services** → `/services.html`; keep `#services` only for in-page hero scroll CTAs.
4. Never ship card CTAs as `<button>` without handlers or mailto-only when Supabase inquiry is live.

**QA check:** Click every homepage service card button on live Netlify; verify pricing URL, contact scroll, preselected service, and successful Supabase submit.

---

## STONE-014 — SPA hash scroll race on first inquiry deep link

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-003 |
| **Status** | ACTIVE |
| **First observed** | Homepage Request CTA QA (2026-05-25) |

**Problem:** Links like `/?service=<slug>#contact` triggered a full navigation/reload on the React homepage. Browser hash scroll ran before `#contact` mounted → first click landed at hero/top; second click worked.

**Rule:** Same-page **Request This Package** must use `navigateToContactInquiry()` (`pushState` + custom event + `scrollIntoView`). On cold load with `#contact`, defer scroll until after React mount (`syncContactHashScroll` in `App.tsx`).

**QA check:** Homepage Request works on first click; direct `/?service=business-websites#contact` lands on inquiry with service preselected.

---

## STONE-020 — Mailto-only email fallback fails without a configured client

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029 |
| **Status** | ACTIVE |
| **First observed** | Final site audit (2026-05-25) |

**Problem:** “Email instead” buttons and mailto-only links dead-end when no desktop mail client is configured — buyers assume the site is broken even though the address is correct.

**Rule:** Always show visible `edward@stoneindustriesusa.com` plus **Copy email** (clipboard with “Email copied.” status) and **Open email app** (`mailto:` with subject). Never use Gmail web compose / Google login URLs without copy fallback. Keep inquiry form primary; email is secondary fallback.

**QA check:** Copy email on homepage contact, pricing inquiry footer, and one service detail page; grep finds no `mail.google.com` or `accounts.google.com` compose URLs.

---

## STONE-021 — Inquiry-first conversion when structured capture is live

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029, DESIGN-036 |
| **Status** | ACTIVE |
| **First observed** | Final site audit (2026-05-25) |

**Problem:** After Supabase inquiry capture works, prominent Call/Text desktop buttons and mailto-only card CTAs still outrank the form — buyers skip the fastest structured path.

**Rule:** Primary CTAs = inquiry form, pricing context, or estimator. Phone = visible **fallback text** (`Prefer phone? 559-579-9376`), not a hero-sized button. Mobile sticky bar = **Inquiry + Pricing** (max 2), not Call-first.

**QA check:** Hero has no primary Call button; sticky bar matches inquiry-first pattern; Supabase submit succeeds on homepage + static pages.

---

## STONE-022 — CSS-L3 clickable conversion objects without WebGL

| Field | Value |
|-------|-------|
| **Severity** | WARNING |
| **Factory link** | DESIGN-003, DESIGN-026, DESIGN-036 |
| **Status** | ACTIVE |
| **First observed** | Final site audit (2026-05-25) |

**Problem:** Teams defer all “3D” polish to WebGL/R3F and miss lightweight conversion affordances — or add WebGL that distracts from CTAs.

**Rule:** Service and vision **CSS-L3 objects** (glass, halo, focus ring, reduced-motion safe) may link to **estimator**, **inquiry**, or **vision page** anchors. No new WebGL deps for marketing CTAs. Objects must not nest invalid links or cause horizontal scroll at 320px.

**QA check:** Service objects → `pricing.html?service=<slug>`; vision objects → `vision.html#<anchor>`; keyboard focus visible; `prefers-reduced-motion` acceptable.

---

## STONE-023 — Serious Stone passes must load SaaS Factory reference material

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-031, DESIGN-036 |
| **Status** | ACTIVE |
| **First observed** | Operator correction (2026-05-25) — audit prompt skipped factory agents/engines/conversion docs |

**Problem:** Stone-only prompts rediscover conversion, scope, and visual rules already documented in SaaS Factory — and skip agent selection, learning promotion, and engine doctrine.

**Rule:** Standard/Major Stone passes load factory `MASTER.md`, source-of-truth map, learning loop, factory ledger, conversion intelligence, visual import policy, and task-relevant `prompts/agents/*.md`. Final report lists **both** Stone and factory docs loaded.

**QA check:** Final report includes factory paths; reusable lessons promoted to `DESIGN-NNN`.

---

## STONE-024 — New service additions must update the full funnel together

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-036, DESIGN-037 |
| **Status** | ACTIVE |
| **First observed** | Custom PC Builds & Upgrades service add (2026-05-25) |

**Problem:** Adding a service to `pricingCatalog.ts` alone leaves dead inquiry preselects, missing static pages, stale “five services” docs, and homepage cards that never appear.

**Rule:** Any new sold service must update in one pass: `pricingCatalog.ts` + `buildServices.ts` + add-on details + homepage cards/CSS-3D object + `services.html` + `pricing.html` + `public/services/<slug>.html` + `inquiry-form.js` slug map + QA/docs + factory promotion if reusable.

**QA check:** Grep slug across catalog, static pages, inquiry map; `/services/<slug>.html` returns 200; estimator and inquiry preselect work.

---

## STONE-025 — Hardware / PC build services need parts-fee separation and warranty boundaries

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-037 |
| **Status** | ACTIVE |
| **First observed** | Custom PC Builds & Upgrades service add (2026-05-25) |

**Problem:** PC build copy that bundles parts into service fees, promises benchmarks, or mimics national builder warranties creates margin risk, buyer confusion, and overclaiming.

**Rule:** Separate **parts cost** from **service fee** on all public pages. State supported platforms (Windows towers only), excluded work (laptops, Linux, open-loop, consoles), and non-guarantees (FPS, defective parts, shipping speed, data recovery). Compete on local planning/upgrades/handoff — not “cheaper than [online builder]” or certification claims.

**QA check:** Service page + catalog disclaimers present; grep finds no competitor names, “certified builder,” or “guaranteed FPS.”

---

## STONE-026 — Productized packages need differentiation and package-aware add-ons

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-037 |
| **Status** | ACTIVE |
| **First observed** | Custom PC Builds package-logic audit (2026-05-25) |

**Problem:** Package names and prices alone read like the same add-ons at different tiers. Customers cannot tell Simple vs Core upgrade or Basic vs Standard vs Gaming vs Showcase. Optional add-ons that duplicate included package work create double-charge confusion.

**Rule:** Every productized package must expose **best for / includes / not included** (estimator + static page). Hardware upgrade tiers must separate drop-in upgrades from platform/power/cooling work — **Simple = drop-in part install; Core = platform/power/cooling/multi-part work** (not price alone). Estimator add-ons must use `includedAddOnIds` + `showForPackages` — included items move to “Included in this package,” are not checkable, and do not increase totals. Planning-only packages hide optional add-ons. **Package dropdown labels stay short** (name + price only); detailed guidance belongs in the context panel below the dropdown, not inside `<option>` text.

**QA check:** Select each PC package in estimator — dropdown options do not overflow; context panel shows differentiation; Windows/cable/RGB/AIO included per tier; no double-charge on included add-ons; `parts-plan` hides add-on checkboxes; Simple vs Core contrast is obvious.

---

## Recent Operator Corrections Backfill (2026-05-25)

Index of operator corrections from pricing/estimator/nav/email/vision passes. Extend cited IDs — do not duplicate full lessons.

| # | Correction | Stone ID | Factory | QA hint |
|---|------------|----------|---------|---------|
| 1 | Dead homepage service-card CTAs | STONE-013 | DESIGN-036 | Click every card Request/Compare |
| 2 | Nav Services → real catalog page | STONE-013 | DESIGN-036 | Nav opens `/services.html` |
| 3 | Request first-click hash/query race | STONE-014 | DESIGN-036 | First click lands on `#contact` |
| 4 | Inquiry-first after Supabase live | STONE-021 | DESIGN-036 | Form primary; phone fallback text |
| 5 | Phone not huge desktop CTA | STONE-021 | DESIGN-029 | No hero Call button |
| 6 | Mailto-only email dead-end | STONE-020 | DESIGN-036 | Copy + mailto on contact pages |
| 7 | Visible email + copy + mailto | STONE-020 | DESIGN-036 | “Email copied.” status |
| 8 | Correct email address everywhere | STONE-020 | — | `edward@stoneindustriesusa.com` |
| 9 | Secure lead capture ≠ cybersecurity | STONE-016 | DESIGN-033 | Lead capture details vs Tier 1/2 |
| 10 | No standalone estimator clutter blocks | STONE-019 | DESIGN-036 | No top lead-capture callout |
| 11 | Add-on education stays compact | STONE-018, STONE-019 | DESIGN-036 | `<details>` per row only |
| 12 | Post-launch QA not a paid SKU | STONE-019 | DESIGN-036 | Not in public catalog |
| 13 | Tech Cleanup Windows-only scope | STONE-019 | DESIGN-036 | No phones/Linux on page |
| 14 | Paid ads setup/guidance only | STONE-019 | DESIGN-036 | No guaranteed ROI |
| 15 | AI practical scope + human approval | STONE-006, STONE-019 | DESIGN-030 | No employee replacement |
| 16 | Premium Local Website → Premium Website | STONE-017 | — | Grep old name |
| 17 | Page-count avoids double-charging pages | STONE-015, STONE-017 | DESIGN-036 | Estimator included add-ons |
| 18 | Premium bundles one-time add-ons | STONE-015 | DESIGN-036 | Monthly care separate |
| 19 | Cyber add-ons need detail blocks | STONE-018 | DESIGN-036 | Details open on service pages |
| 20 | CSS-3D service/vision objects, no WebGL | STONE-022 | DESIGN-036 | Links route to conversion |
| 21 | Visual polish serves conversion | STONE-005 | DESIGN-003, DESIGN-029 | CTA readable without motion |
| 22 | Grounded future vision page | STONE-017, STONE-022 | DESIGN-036 | `/vision.html` guardrails |
| 23 | No full agency/MSP/3PL/enterprise AI claims | STONE-017 | DESIGN-029, DESIGN-030 | `#where-stone-fits` present |
| 24 | Logistics ≠ freight broker/carrier/3PL | STONE-017 | DESIGN-036 | Disclaimer on logistics page |
| 25 | Load SaaS Factory docs on serious Stone prompts | STONE-023 | DESIGN-031, DESIGN-036 | Report lists factory paths |
| 26 | Every correction → learning engine | LEARNING_LOOP | SAAS_FACTORY_LEARNING_LOOP | Entry or reason_code |
| 27 | PC packages need best-for/includes/not-included | STONE-026 | DESIGN-037 | Estimator context per package |
| 28 | Package-aware add-ons prevent double-charge | STONE-026, STONE-015 | DESIGN-037 | Included list not summed again |
| 29 | Estimator dropdown labels stay short | STONE-026 | DESIGN-037 | No best-for text in `<option>` |
| 30 | Simple vs Core defined by job complexity | STONE-026 | DESIGN-037 | Drop-in vs platform/power/cooling |
| 31 | Real business plan replaces tool-only planning | STONE-027 | DESIGN-040 | `STONE_INDUSTRIES_BUSINESS_PLAN.md` exists |
| 32 | Service stack reorder — PC + Tier 1 IT first | STONE-027 | DESIGN-040 | Homepage/catalog order matches |
| 33 | Logistics downgraded to operations coordination | STONE-027 | DESIGN-040 | Secondary card + not-included freight |
| 34 | Public/private vision separation | STONE-027 | DESIGN-040 | Vision page ≠ current services |
| 35 | Vendor-powered services = managed outcomes | STONE-027 | DESIGN-040 | No Ulio/Rork public resale copy |
| 36 | Mobile MVP added as productized service | STONE-027 | DESIGN-040 | `mobile-app-mvp.html` + catalog slug |
| 37 | Duplicate contact modules near footer | STONE-029 | DESIGN-036 | One email fallback cluster per zone |
| 38 | Pricing policy wall hurts scan speed | STONE-029 | DESIGN-029 | Progressive disclosure on pricing.html |
| 39 | Hero orb overlapped embedded sign | STONE-002, STONE-030 | DESIGN-026 | Orb upper-right clear zone |
| 40 | Persistent blue right-side rail on scroll | STONE-030 | DESIGN-026 | No 82% cyan glow; edge vignette |

---

## STONE-027 — Business plan sync: revenue-first service stack and public/private separation

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-040 |
| **Status** | ACTIVE |
| **First observed** | Multi-repo business plan sync (2026-05-26) |

**Problem:** Tool-budget docs and stale six-service copy caused agents to mis-order services, over-emphasize logistics, omit mobile MVP, and blur public offers with founder vision or internal vendor tools (Ulio, Rork).

**Rule:**

1. **Real business plan doc** — `docs/STONE_INDUSTRIES_BUSINESS_PLAN.md` is operator reference; public catalog stays in `pricingCatalog.ts` / `buildServices.ts`.
2. **Service priority** — PC builds + Tier 1 IT first; operations coordination last/secondary; slug `logistics-coordination` may remain for URLs only.
3. **Public/private split** — Vision page and internal docs may describe larger ambition; homepage/pricing/services sell practical local services today.
4. **Vendor-powered offers** — AI receptionist and mobile MVP sell managed outcomes; do not publicly lead with Ulio/Rork as the product.
5. **Cross-repo notes only** — govcontractapp and Opslayer get minimal operator-direction docs; no Stone marketing in unrelated runtime repos.
6. **Funnel completeness** — new/changed services update catalog, estimator, inquiry preselect, static pages, homepage, and Project OS docs together.

**QA check:** Grep public pages for Ulio/Rork/guaranteed claims; verify seven-service order on homepage, pricing, services, inquiry dropdown; operations page states not freight/3PL.

---

## STONE-028 — Desktop full-width QA after mobile/service passes

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-036 (extend) |
| **Status** | ACTIVE |
| **First observed** | Desktop layout regression after 7-service sync (2026-05-26) |

**Problem:** Hero desktop grid reserved a right column but shipped an empty placeholder — content read as a narrow left strip with a blank dark viewport. Prior QA checked 375px mobile only and missed desktop hamburger/full-width failures.

**Rule:**

1. **Hero desktop column must earn its space** — use `InteractiveOrbAccent` (`variant="hero"`) or remove the second column; never ship an empty `lg:grid-cols` slot.
2. **Shell width explicit** — `html`, `body`, `#root`, and `main` stay `width: 100%` / `max-width: none`; section containers use `max-w-7xl mx-auto`, not a global mobile-width shell.
3. **Breakpoint QA mandatory** — after mobile or copy passes, re-test **1280px + 1440px** desktop: full nav, no hamburger, no empty hero half-viewport, no horizontal scroll.
4. **Mobile styles stay scoped** — `#root` bottom padding and sticky bar only inside `@media (max-width: 768px)`.

**QA check:** At 1440px, `#root` width ≈ viewport; desktop nav links visible; hero right column shows orb accent; services grid uses full `max-w-7xl` container.

---

## STONE-029 — Progressive disclosure for policy copy; one email fallback cluster per page zone

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-029, DESIGN-036 (extend) |
| **Status** | ACTIVE |
| **First observed** | Final readability / duplication cleanup (2026-05-26) |

**Problem:** Duplicate `EmailContactActions` near contact + footer + inquiry form eroded trust and added scroll. Pricing pages stacked 8+ full policy boxes — contract-wall feel — while commercial protections still matter.

**Rule:**

1. **One strong email/phone fallback cluster** per page zone — keep copy + mailto with the inquiry form; footer = plain email/phone links only.
2. **No standalone email box** after pages that already render `data-si-inquiry` (inquiry form includes fallback).
3. **Pricing policy sections** — keep payment/scope/deposit guardrails visible in 2 compact sections; collapse positioning, disputes, service area, and security into `<details>` (`si-policy-details`).
4. **Preserve premium visuals** — trim copy/cards, not parallax, orb, or 3D objects.
5. **Full-page QA** must scroll contact → footer on homepage and pricing after any contact-module edit.

**QA check:** Homepage contact shows one email fallback block (inside form); footer has links only; `pricing.html` has ≤3 visible policy sections before inquiry; `#how-payment-works` anchor still resolves.

---

## STONE-030 — Map background clear zones; kill persistent side-rail scrims

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-026 (extend) |
| **Status** | ACTIVE |
| **First observed** | Pre-launch visual QA (2026-05-26) |

**Problem:** Fixed parallax + weak right-edge scrim + cyan `radial-gradient` at `82% 18%` on `html`/`.page-atmosphere` read as a persistent bright blue vertical rail beside centered content. Hero cyan overlays at `78%` compounded the issue. Hero orb sat in the sign zone on `stone-main-dalrm-bg.webp`.

**Rule:**

1. **No right-biased global cyan glows** — keep atmospheric gradients center/top only.
2. **Right-edge vignette** — scrims end at ~0.38–0.52 opacity, not ~0.1; optional fixed viewport edge gradient on React shell.
3. **Background-position** — tune hero image (`~56% 24%`) so embedded signage stays in art zone without exposing bare cyan body fill.
4. **Hero orb clear zone** — upper-right, slightly smaller/reduced opacity; never centered on embedded sign (**STONE-002**).
5. **Full-page scroll QA** — desktop 1280px/1440px after any background/scrim pass.

**QA check:** Scroll homepage + pricing at 1440px — no bright cyan rail on right; sign readable; orb not on sign; cinematic depth preserved.

---

## STONE-031 — Hero accents need mapped clear zones; avoid repeating orbital motifs

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-026, DESIGN-029 (extend) |
| **Status** | ACTIVE |
| **First observed** | Pre-launch hero visual pass (2026-05-26) |

**Problem:** Hero WebGL orb sat in a fixed glass panel with `justify-end` + `origin-top-right` scaling — orb looked off-center inside the square and repeated the same orbital motif used in Services/Contact. Operator-visible QA missed full first-viewport balance.

**Rule:**

1. **Map clear zones** — hero interactive accents sit in sky/landscape above embedded signage on `stone-main-dalrm-bg.webp`, never over logos/signs (**STONE-002**).
2. **Distinct hero motif** — use a lightweight hero-only accent (SVG/CSS shuttle) instead of duplicating orb/network visuals.
3. **No misaligned glass traps** — center accent in its container or free-float; do not shrink-scale into a corner box.
4. **Lightweight interaction** — pointer tilt via CSS variables + `requestAnimationFrame`; hold-to-thrust only while pointer down; `prefers-reduced-motion` = static craft, no plume animation.
5. **Full viewport QA** — desktop 1280px/1440px must inspect entire first viewport (background fill, sign readability, accent zone), not only nav width or orb rail.

**QA check:** 1440px homepage — rocket/shuttle in upper-right sky zone; embedded Stone sign readable; hold pointer shows propulsion; release stops; mobile hides accent; Services/Contact orbs unchanged.

---

## STONE-032 — Hero accent shape and interaction must match intent before ship

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-026 (extend) |
| **Status** | ACTIVE |
| **First observed** | Hero rocket correction pass (2026-05-26) |

**Problem:** Replacing hero orb with a horizontal shuttle SVG + rotation read as UFO/hovercraft; propulsion plume misaligned; operator reported missing cursor/hold interaction despite partial wiring.

**Rule:**

1. **Shape-appropriate accents** — hero rocket = vertical retro-futuristic silhouette (nose cone, rounded body, port window, landing fins, exhaust); not generic hovercraft blobs.
2. **Original reference-inspired art** — recreate silhouette in inline SVG/CSS; never copy watermarked reference assets.
3. **Interaction must work** — pointer tilt (CSS vars + RAF), idle bob on separate layer, hold-to-thrust with visible plume, release/leave stops thrust; verify in runtime QA before claiming complete.
4. **Stone palette** — slate/silver-blue body, cyan/teal window glow, cyan-white propulsion (no cartoon orange).
5. **Plume alignment** — exhaust centered under vertical rocket (CSS plume + optional SVG flame group).

**QA check:** Desktop 1280/1440 — vertical rocket in sky clear zone; move pointer → tilt; hold → plume + lift; release → stops; sign readable; reduced-motion static.

---

## STONE-033 — Hero interactive accents must win pointer stacking

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-026 (extend) |
| **Status** | ACTIVE |
| **First observed** | Hero rocket pointer QA failure (2026-05-26) |

**Problem:** Rocket handlers were wired but hero copy column (`z-10`, full-width block) sat above rocket mount (`z-6`), swallowing all pointer events. Automated DOM `dispatchEvent` falsely suggested handlers worked.

**Rule:**

1. **Stacking** — interactive hero accents mount at `z-index` above hero copy (e.g. `z-20`) and after copy in DOM, OR copy uses `pointer-events-none` with `pointer-events-auto` only on real CTAs/links.
2. **Hit target** — use `<button type="button">` (or equivalent) with padded hitbox larger than visible art; `pointer-events: auto` on accent, `none` on mount shell.
3. **Release safety** — `setPointerCapture` + window `pointerup`/`pointercancel`/`blur` so thrust stops when dragging off.
4. **QA** — real browser pointer/hold QA mandatory; synthetic DOM events are insufficient for React pointer handlers.

**QA check:** Desktop — hover hitbox glow; move → tilt; hold → plume; drag off → stops; Tab + Space/Enter → thrust; CTAs still clickable.

---

## STONE-034 — Certification trust signals must stay compact and bounded

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-033 (extend) |
| **Status** | ACTIVE |
| **First observed** | Final launch certification pass after Cursor crash (2026-05-26) |

**Problem:** VOSB/SDVOSB/SAM.gov registration can build trust for subcontracting partners, but full trust blocks in the hero crowd conversion CTAs; unwired components after a crash create false “done” state; missing disclaimers imply awarded contracts or agency endorsement.

**Rule:**

1. **Factual only** — public copy may state certified VOSB, certified SDVOSB, SAM.gov-registered contractor, and certified LLC when operator-confirmed.
2. **Bounded disclaimer** — always pair certification signals with language that they do not imply awarded federal contracts, agency endorsement, DoD approval, or federal past performance.
3. **Compact placement** — hero micro-row (`heroCertificationsMicro`) near veteran-led badge only — no full strip or card in hero; full strip in About (`TrustCertificationsStrip`); one-line footer + tiny disclaimer; optional short line on pricing/services static pages.
4. **Crash recovery** — audit untracked components and `git status` before commit; wire or delete orphan UI.
5. **No government seals / fake badges** — text chips only unless operator supplies licensed assets.

**QA check:** Homepage hero shows compact certification micro-row (no disclaimer); About + footer show certifications with disclaimer; hero CTAs and rocket unchanged; pricing/services footer trust line present; no contract-win or past-performance claims anywhere.

---

## STONE-035 — Final launch critic pass discipline

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-036 (extend) |
| **Status** | ACTIVE |
| **First observed** | Multi-agent launch critic pass (2026-05-26) |

**Problem:** Pre-launch passes can score well visually while stale static pages (capability brief), unused recurring-revenue data, and duplicate hero copy hide conversion and legal gaps. Broad redesigns delay ship.

**Rule:**

1. **Scorecard before scope** — rate trust, conversion, legal, and technical readiness; backlog A–F before coding.
2. **High-confidence only** — implement small copy, CTA, dedup, and wiring fixes; defer Stripe, redesign, and new backend.
3. **Recurring paths visible** — surface `recurringCarePaths` compactly after services; do not bloat hero.
4. **Static page parity** — capability brief and `.txt` must match current seven services and bounded certification language.
5. **Hero length** — remove duplicate posture blocks; keep micro-row + CTAs + rocket.
6. **Defer with reason_code** — CAPTCHA, CSP, domain email, Stripe, Supabase hardening until operator-ready.

**QA check:** Capability brief lists seven current services + bounded certs; homepage `#recurring-care` links to pricing; hero has no duplicate operating-posture card.

---

## STONE-036 — Customer-facing credibility: company voice, mailto, no setup/status leaks

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-036 (extend) |
| **Status** | ACTIVE |
| **First observed** | Live QA credibility cleanup pass (2026-05-30) |

**Problem:** “Contact Edward”, Google Workspace/Gmail setup copy, and environment fallback messages make Stone look like a solo founder finishing tooling — not a serious LLC. Broken or JS-only email UX erodes trust. Long GovCon disclaimers repeated on every static page footer add scroll fatigue.

**Rule:**

1. **Company CTAs** — public copy uses “Contact Stone Industries” / “Contact Our Team”; Edward only in founder/about context if needed.
2. **Professional contact blurb** — `siteContactBlurb` replaces setup/status language; no “Gmail activated” or “live on Google Workspace” on customer pages.
3. **Gmail contact row** — visible email + **Copy email** + **Open Gmail** (Gmail web compose in new tab); no unreliable mail-app button.
4. **No environment leaks** — never show “Online capture is not configured in this environment” to customers; use email/phone fallback copy instead.
5. **Short GovCon disclaimer** — full text only on capability brief, About/GovCon sections, and terms; remove from pricing/services footers.
6. **Legal pages** — privacy/terms are professional plain-English baselines without “simple baseline / not reviewed by counsel” footers.
7. **Pricing collapsibles** — quotes/payment and handoff/delivery sections use `<details>` default closed.

**QA check:** Grep clean for Contact Edward, setup copy, environment fallback; build passes; mailto opens from visible email; Calendly CTAs preserved.

---

## STONE-037 — Inquiry forms must capture first; email drafts are fallback only

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-036 (extend) |
| **Status** | ACTIVE |
| **First observed** | Inquiry capture repair pass (2026-06-13) |

**Problem:** Homepage and static inquiry forms auto-opened mailto/Gmail on submit and showed “Email draft opened” — a lead-capture leak. If the customer lacks Gmail, closes the tab, or never clicks Send, Stone loses the lead.

**Rule:**

1. **Capture first** — POST to Supabase `public.inquiries` via `submitInquiry` / `SI_submitInquiryWithFallback` before any success UI.
2. **No auto mailto** — never call `openInquiryMailto` or `openMailto` on normal submit.
3. **Success honesty** — show **Inquiry received** only after save succeeds.
4. **Failure honesty** — show **Inquiry was not sent automatically** when save fails or env is unset; offer copy + manual email draft + call.
5. **Email fallback is manual** — **Email instead** / **Open email draft** buttons only; remind customer to click Send.
6. **Keep fallbacks** — do not remove copy/email/call buttons from success or failure panels.

**QA check:** Submit valid inquiry with env configured → row in Supabase + success panel; no mailto tab auto-opens; failure path shows amber panel with fallbacks.

---

## STONE-038 — Lead-capture JS cannot rely on query-string cache busting

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-036 (extend) |
| **Status** | ACTIVE |
| **First observed** | Inquiry works on `/?v=inquiry-fix-2` but not canonical `/` (2026-06-13) |

**Problem:** Cloudflare cached stale `index.html` (old hashed React bundle refs) and/or fixed-name `inquiry-form.js` while a query-string URL bypassed HTML cache. Real visitors use `https://stoneindustriesusa.com/` — not cache-bust params.

**Rule:**

1. **`public/_headers`** — `no-cache, must-revalidate` on HTML and lead-capture JS; `immutable` only on `/assets/*`.
2. **Build stamp** — bump `LEAD_CAPTURE_ASSET_VERSION` in `vite.config.ts` when inquiry/pricing static JS changes; dist HTML gets `?v=` on script tags.
3. **Production QA** — canonical URL, Incognito, after **Purge Everything** — never accept `?v=` as proof of fix.
4. **No query-param logic** — inquiry behavior must not branch on `location.search` except `?service=` preselect.

**QA check:** After deploy + purge, `/` and `/pricing.html` inquiry save to Supabase without any `?v=` param; Response headers show `Cache-Control: no-cache` on `/` and `/inquiry-form.js`.

---

## STONE-039 — Lead capture layers: Supabase truth, email inbox, HubSpot backup

| Field | Value |
|-------|-------|
| **Severity** | STRONG_RULE |
| **Factory link** | DESIGN-036 (extend) |
| **Status** | ACTIVE |
| **First observed** | Lead router pass (2026-06-13) |

**Problem:** Edward checks email more than HubSpot or Supabase Table Editor. Direct browser Supabase insert saved leads but did not notify the operator inbox. HubSpot was not synced.

**Rule:**

1. **Supabase is source of truth** — customer success requires saved row in `public.inquiries`.
2. **Email is operator inbox** — `POST /api/inquiries` sends Resend notification to `STONE_NOTIFY_EMAIL` when configured; failures must not fail customer success.
3. **HubSpot is CRM backup** — contact + note sync when token configured; failures must not fail customer success.
4. **Calendly is optional post-capture** — success panel offers **Book free consultation**; never require booking before save.
5. **No secrets in frontend** — `RESEND_*`, `HUBSPOT_*`, service role keys are Functions-only env vars.
6. **API first, anon fallback** — frontend tries `/api/inquiries`; direct anon insert only when API unavailable (local Vite dev).

**QA check:** Submit on production → Supabase row + success panel; Edward email when Resend configured; HubSpot contact when token configured; no auto mailto; Calendly CTA on success only.

Detail: [`CRM_HUBSPOT_LEAD_ROUTING.md`](CRM_HUBSPOT_LEAD_ROUTING.md).

---

## How to add a lesson

1. Assign next `STONE-NNN` ID
2. Set severity and status
3. Link SaaS Factory `DESIGN-NNN` if reusable
4. Add QA check to [`QA_CHECKLIST.md`](QA_CHECKLIST.md) when applicable
5. Reference in final report Handoff Update
