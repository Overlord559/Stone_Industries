# Stone Industries — Project OS Index

**Last updated:** 2026-05-25  
**Purpose:** Route every task to the right docs — avoid repeating huge prompts.

**Startup:** Read [`AGENTS.md`](../AGENTS.md) first, then this file.

---

## Mandatory tiny header (paste on every serious prompt)

```text
MANDATORY PROJECT OS STARTUP:
Before editing, read AGENTS.md and docs/PROJECT_OS_INDEX.md. Follow the Project OS Startup Protocol. Load any required engineering, founder judgment, customer validation, distribution, ship, production, design, AI, QA, or learning docs based on this task. If these files are missing, stale, conflicting, or incomplete, stop and report "Project OS Problem Detected" before editing.

Do not commit, push, stage, reset, clean, or apply stashes unless explicitly approved.
```

---

## Project OS Startup Protocol

1. Read `AGENTS.md` + this index
2. Classify task type (table below) → load listed docs only
3. Run **Pre-Build Decision Gate** (if building/changing product)
4. Run PHASE 0 git snapshot
5. If docs missing/stale/conflicting → **Project OS Problem Detected** — stop
6. Execute scoped work; end with Handoff Update + learning reason code

---

## Pre-Build Decision Gate

Before non-trivial work, pick one:

| Decision | When |
|----------|------|
| **BUILD** | Clear customer value, scoped paths, validation defined |
| **SIMPLIFY** | Scope too big — reduce to Micro/Standard slice |
| **VALIDATE** | Need customer/operator check before code |
| **DEFER** | Blocked by budget, deploy, or missing info |
| **KILL** | Low value vs risk — do not proceed |

Document decision in final report.

---

## Task routing

### Any task (always)

| Doc | Why |
|-----|-----|
| [`AGENTS.md`](../AGENTS.md) | Rules, council, git safety |
| [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) | Live state, services, roadmap |
| [`CHATGPT_CURSOR_BRIDGE.md`](CHATGPT_CURSOR_BRIDGE.md) | Cross-tool protocol |
| [`PROMPT_TEMPLATE.md`](PROMPT_TEMPLATE.md) | Prompt size + council block |

### Technical change

| Doc | Why |
|-----|-----|
| [`ENGINEERING_JUDGMENT.md`](ENGINEERING_JUDGMENT.md) | Tradeoffs, deps, debt |
| [`PRODUCTION_READINESS.md`](PRODUCTION_READINESS.md) | Ship bar |
| [`QA_CHECKLIST.md`](QA_CHECKLIST.md) | Validation |
| [`DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md) | Regression lessons |

### Visual / design work

| Doc | Why |
|-----|-----|
| [`VISUAL_SYSTEM.md`](VISUAL_SYSTEM.md) | Backgrounds, scrims, motion |
| [`ASSET_GUIDELINES.md`](ASSET_GUIDELINES.md) | WebP paths, commit hygiene |
| [`VISUAL_PRIMITIVES.md`](VISUAL_PRIMITIVES.md) | Orb/orbit patterns |
| [`CONVERSION_NOTES.md`](CONVERSION_NOTES.md) | CTA vs spectacle |
| [`DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md) | STONE-001–006 |

### Service / copy / conversion work

| Doc | Why |
|-----|-----|
| [`CONVERSION_NOTES.md`](CONVERSION_NOTES.md) | CTA hierarchy |
| [`CUSTOMER_VALIDATION.md`](CUSTOMER_VALIDATION.md) | Offer clarity checks |
| [`FOUNDER_JUDGMENT.md`](FOUNDER_JUDGMENT.md) | Prioritization |
| [`SAFETY_BOUNDARIES.md`](SAFETY_BOUNDARIES.md) | No fake claims |

### AI workflow work

| Doc | Why |
|-----|-----|
| [`AI_BEHAVIOR.md`](AI_BEHAVIOR.md) | Service naming, scope |
| [`AGENT_ARCHITECTURE.md`](AGENT_ARCHITECTURE.md) | ChatGPT ↔ Cursor roles |
| [`EVALS.md`](EVALS.md) | Quality checks for AI copy |

### Deployment / runtime work

| Doc | Why |
|-----|-----|
| [`DEPLOYMENT.md`](DEPLOYMENT.md) | GitHub Pages / Vercel |
| [`PRODUCTION_READINESS.md`](PRODUCTION_READINESS.md) | Smoke tests, rollback |
| [`QA_CHECKLIST.md`](QA_CHECKLIST.md) | Post-deploy QA |

### Launch / outreach work

| Doc | Why |
|-----|-----|
| [`DISTRIBUTION_PLAN.md`](DISTRIBUTION_PLAN.md) | Local SEO, channels |
| [`SHIP_PLAN.md`](SHIP_PLAN.md) | Finish line, blockers |
| [`CUSTOMER_VALIDATION.md`](CUSTOMER_VALIDATION.md) | Message fit |

### Learning / backfill work

| Doc | Why |
|-----|-----|
| [`LEARNING_LOOP.md`](LEARNING_LOOP.md) | Reason codes |
| [`DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md) | Project lessons |
| Factory [`DESIGN_MISTAKE_LEDGER.md`](../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md) | DESIGN-NNN promotion |

---

## SaaS Factory reference rule

When reusing factory patterns (orb, parallax, frame-scroll):

- Read: `../priv-saas-factory/docs/project-baselines/`, `docs/visual-primitives/`, `packages/visual-world/`
- Promote reusable lessons to factory DESIGN-NNN
- **Do not** edit factory apps (`snocialclub-demo`, `saas-starter`) from Stone tasks unless explicitly scoped

---

## Project OS Problem Detected

Emit and stop when:

- `PROJECT_OS_INDEX.md` or required routed doc missing
- Docs contradict `src/data/site.ts` without operator resolution
- Prompt skips startup header on Standard/Major work
- Task needs runtime edit but scope lists docs only (or reverse)

```markdown
## Project OS Problem Detected

**Issue:** [missing doc | stale | conflict]
**Checked:** [paths]
**Fix:** [create doc | operator decision | narrow scope]
```

---

## Full doc map

| Doc | Role |
|-----|------|
| `AGENTS.md` | Persistent startup brain (with this index) |
| `PROJECT_CONTEXT.md` | State + services + roadmap |
| `ENGINEERING_JUDGMENT.md` | Technical tradeoffs |
| `FOUNDER_JUDGMENT.md` | Prioritization |
| `CUSTOMER_VALIDATION.md` | Offer/message checks |
| `DISTRIBUTION_PLAN.md` | SEO + outreach |
| `SHIP_PLAN.md` | Finishing discipline |
| `PRODUCTION_READINESS.md` | Prod bar + smoke tests |
| `VISUAL_SYSTEM.md` | Site visual rules |
| `ASSET_GUIDELINES.md` | Asset paths |
| `VISUAL_PRIMITIVES.md` | Orb/orbit |
| `CONVERSION_NOTES.md` | Funnel |
| `AI_BEHAVIOR.md` | AI service scope |
| `AGENT_ARCHITECTURE.md` | Tool roles |
| `EVALS.md` | Pass/fail rubrics |
| `SAFETY_BOUNDARIES.md` | Legal/trust limits |
| `DESIGN_MISTAKE_LEDGER.md` | Lessons |
| `LEARNING_LOOP.md` | Process |
| `QA_CHECKLIST.md` | QA |
| `DEPLOYMENT.md` | Deploy |
| `PROMPT_TEMPLATE.md` | Prompts |
| `CHATGPT_CURSOR_BRIDGE.md` | Bridge |
