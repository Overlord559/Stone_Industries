# Stone Industries — Project OS (Agent Baseline)

**Last updated:** 2026-05-26 · **Project OS v2**  
**Audience:** ChatGPT (strategy), Cursor (implementation), operator

**Routing hub:** [`docs/PROJECT_OS_INDEX.md`](docs/PROJECT_OS_INDEX.md) — read on every serious task.

---

## Project purpose

Marketing site for **Stone Industries LLC** — veteran-led local technology services for Fresno and the Central Valley: custom PC builds, Tier 1 IT support, Wi-Fi/POS help, business websites (including 3D/interactive sections), AI receptionist workflows, mobile MVP prototyping, and narrow operations coordination.

**Tagline:** *Reliable Today. Autonomous Tomorrow.* — current services deliver today; autonomous/future items stay in Vision only.

**Goal:** Trust, clarity, conversion, maintainability, and shipping speed — not spectacle for its own sake.

---

## Operating council (use on Standard/Major prompts)

| Operator | Delivers |
|----------|----------|
| **Palantir Principal Engineer** | Architecture, repo safety, protected paths, regression prevention |
| **Stripe Staff Engineer** | Production UX, a11y, polish, monetization-ready quality |
| **YC Partner** | Prioritization, launch speed, customer value |
| **Apple HIG Lead** | Visual hierarchy, motion restraint, mobile |
| **Growth/CRO Strategist** | CTA hierarchy, trust, conversion |
| **Pragmatic CTO** | Tradeoffs, maintainability, dependency discipline |
| **Shipping Operator** | WIP control, finish line, blocker removal |
| **SRE / DevOps Lead** | Deploy safety, env vars, smoke tests, rollback |
| **Applied AI Systems Architect** | *Optional* — AI workflow scope/naming only |

Full prompt blocks: [`docs/PROMPT_TEMPLATE.md`](docs/PROMPT_TEMPLATE.md)

---

## Project OS Startup Protocol

Every serious Cursor/ChatGPT pass:

1. Paste **mandatory tiny header** from [`docs/PROJECT_OS_INDEX.md`](docs/PROJECT_OS_INDEX.md)
2. Read this file + PROJECT_OS_INDEX → load routed docs for task type
3. Run Pre-Build Decision Gate: BUILD / SIMPLIFY / VALIDATE / DEFER / KILL
4. PHASE 0: `git status --short`, branch, HEAD
5. If OS docs missing/stale → **Project OS Problem Detected** — stop
6. Final report: Handoff Update + learning reason code + `Project OS files loaded: [...]`

---

## Current services (sold today)

Canonical operator business plan: [`docs/STONE_INDUSTRIES_BUSINESS_PLAN.md`](docs/STONE_INDUSTRIES_BUSINESS_PLAN.md)  
Public catalog source: [`src/data/pricingCatalog.ts`](src/data/pricingCatalog.ts)

| # | Service | Summary |
|---|---------|---------|
| 1 | Custom PC Builds & Upgrades | Windows tower planning, upgrades, assembly, handoff — parts separate |
| 2 | Tier 1 IT Support & Tech Cleanup | Windows cleanup, virus/pop-up fixes, same-day when scheduling allows |
| 3 | Wi-Fi, Printer & POS Support | Quick fixes and setup visits — not full MSP |
| 4 | Business Websites & 3D Interactive Websites | Page-count packages, optional interactive sections, secure lead capture |
| 5 | AI Receptionist & Workflow Automation | Managed outcomes via third-party tools — human handoff required |
| 6 | Mobile App / MVP Prototyping | Clickable concepts before full custom development |
| 7 | Operations & Technology Project Coordination | Secondary — scheduling, vendor follow-up — **not** freight/3PL |

**Future only:** DALRM, AI-assisted operations, autonomous logistics, resilient infrastructure → [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md)

---

## No fake claims

No fake clients, certifications, contracts, or SDVOSB status unless actually obtained. No unsupervised “agentic” AI promises. Copy source: [`src/data/site.ts`](src/data/site.ts).

---

## Validation commands

```powershell
cd "C:\dev\stone_industries website"
npm run build
npm run lint
```

Runtime QA: desktop, 375px, 320px — [`docs/QA_CHECKLIST.md`](docs/QA_CHECKLIST.md)

---

## Git safety (mandatory)

| Rule | Why |
|------|-----|
| **No `git add .`** | Prevents junk + unrelated WIP |
| **Exact-path staging only** | Operator-safe |
| **No commit/push/stage/reset/clean/stash** unless explicitly approved | Agent asks first |
| **Docs-only passes** stay in allowed doc paths when runtime is dirty |

---

## Deployment

- **Live (production):** https://stoneindustriesusa.com/ (Cloudflare Pages + DNS, `VITE_BASE_PATH=/`)
- **Rollback mirror:** https://stoneindustries.netlify.app/ (Netlify — keep until CF smoke-tested)
- **GitHub Pages preview:** https://overlord559.github.io/Stone_Industries/ (base `/Stone_Industries/`)
- **Deploy runbooks:** [`docs/CLOUDFLARE_MIGRATION.md`](docs/CLOUDFLARE_MIGRATION.md) · [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) (Netlify legacy)

---

## ChatGPT ↔ Cursor bridge

| Tool | Role |
|------|------|
| **ChatGPT** | Strategy, prompts, critic, memory |
| **Cursor** | Repo, edits, validation |

Protocol: [`docs/CHATGPT_CURSOR_BRIDGE.md`](docs/CHATGPT_CURSOR_BRIDGE.md)  
Missing context → Context Request · Unsafe prompt → Prompt Risk Detected

---

## SaaS Factory reference rule

**Also load relevant SaaS Factory docs, prompt agents, visual engines, conversion intelligence, and learning doctrine before major Stone work.**

Reuse factory visual/engine patterns from `../priv-saas-factory/` — promote lessons to factory `DESIGN-NNN`. Do not edit factory apps from Stone tasks unless scoped.

| Load on Standard/Major passes | Paths |
|-------------------------------|-------|
| Factory brain + learning | `MASTER.md`, `docs/SAAS_FACTORY_SOURCE_OF_TRUTH.md`, `docs/SAAS_FACTORY_LEARNING_LOOP.md`, `docs/DESIGN_MISTAKE_LEDGER.md` |
| Conversion + commercial | `docs/CONVERSION_INTELLIGENCE.md`, `docs/COMMERCIAL_PROTECTION_BASELINE.md` |
| Visual doctrine | `docs/VISUAL_INSPIRATION_LAB.md`, `docs/SAFE_3D_SITE_IMPORT_POLICY.md`, `docs/visual-engines/`, `docs/visual-primitives/` |
| Agent prompts | `prompts/README.md`, `prompts/agents/` (task-relevant) |

Templates: [`../priv-saas-factory/docs/project-baselines/`](../priv-saas-factory/docs/project-baselines/)

Every operator correction → Stone ledger or reason code; promote reusable patterns to factory (**DESIGN-036**).

---

## Protected runtime files

Do not edit without explicit scope: `src/**`, `public/**`, `vite.config.ts`, `package.json`, `.github/**`

---

## Learning loop

Check [`docs/DESIGN_MISTAKE_LEDGER.md`](docs/DESIGN_MISTAKE_LEDGER.md) + factory ledger. Reason code if no new lesson — [`docs/LEARNING_LOOP.md`](docs/LEARNING_LOOP.md)
