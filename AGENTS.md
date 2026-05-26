# Stone Industries — Project OS (Agent Baseline)

**Last updated:** 2026-05-25 · **Project OS v2**  
**Audience:** ChatGPT (strategy), Cursor (implementation), operator

**Routing hub:** [`docs/PROJECT_OS_INDEX.md`](docs/PROJECT_OS_INDEX.md) — read on every serious task.

---

## Project purpose

Marketing site for **Stone Industries LLC** — veteran-led local tech support, fast business websites, logistics coordination, and practical AI workflow setup for small businesses in the Central Valley (Fresno area).

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

| Service | Summary |
|---------|---------|
| Same-Day Tech Cleanup | Device cleanup, virus/pop-up fixes |
| 24-Hour Business Websites | One-page local business sites |
| Wi-Fi, Printer & POS Support | Small-business network/POS support |
| Logistics Coordination | Planning, documentation, coordination |
| AI Workflow Automation | Guarded automation, human review |

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

- **Live (production):** https://stoneindustries.netlify.app/ (Netlify Free, `VITE_BASE_PATH=/`)
- **Mirror / fallback:** https://overlord559.github.io/Stone_Industries/ (GitHub Pages, base `/Stone_Industries/`)
- **Deploy runbook:** [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

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

Reuse factory visual/engine patterns from `../priv-saas-factory/` docs and `packages/visual-world/` — promote lessons to factory DESIGN-NNN. Do not edit factory apps from Stone tasks unless scoped.

Templates: [`../priv-saas-factory/docs/project-baselines/`](../priv-saas-factory/docs/project-baselines/)

---

## Protected runtime files

Do not edit without explicit scope: `src/**`, `public/**`, `vite.config.ts`, `package.json`, `.github/**`

---

## Learning loop

Check [`docs/DESIGN_MISTAKE_LEDGER.md`](docs/DESIGN_MISTAKE_LEDGER.md) + factory ledger. Reason code if no new lesson — [`docs/LEARNING_LOOP.md`](docs/LEARNING_LOOP.md)
