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

**Problem:** Interactive orb accents can block embedded signage, logos, or hero art.

**Rule:** Place orbs in section **empty space** only. Inspect focal points before placing WebGL accents. Hide/minimize below `lg`.

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

**Rule:** Position Stone as **fast fixed-scope** for Fresno/Central Valley SMBs. Public `#where-stone-fits` section: not full agency/MSP/AI agency/freight broker. Operations service = coordination systems (intake, handoffs, SOPs) with **freight broker/carrier/3PL disclaimer**. No competitor names, trade dress, or guaranteed marketing/security/logistics outcomes on public pages.

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

**Rule:** Always show visible `stoneindustries0.llc@gmail.com` plus **Copy email** (clipboard with “Email copied.” status) and **Open email app** (`mailto:` with subject). Never use Gmail web compose / Google login URLs without copy fallback. Keep inquiry form primary; email is secondary fallback.

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
| 8 | Correct email address everywhere | STONE-020 | — | `stoneindustries0.llc@gmail.com` |
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

---

## How to add a lesson

1. Assign next `STONE-NNN` ID
2. Set severity and status
3. Link SaaS Factory `DESIGN-NNN` if reusable
4. Add QA check to [`QA_CHECKLIST.md`](QA_CHECKLIST.md) when applicable
5. Reference in final report Handoff Update
