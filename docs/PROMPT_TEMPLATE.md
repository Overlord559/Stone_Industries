# Stone Industries — Prompt Templates

**Last updated:** 2026-05-25 · **Project OS v2**  
**Routing:** [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md)

---

## Mandatory tiny header (every serious prompt)

```text
MANDATORY PROJECT OS STARTUP:
Before editing, read AGENTS.md and docs/PROJECT_OS_INDEX.md. Follow the Project OS Startup Protocol. Load any required engineering, founder judgment, customer validation, distribution, ship, production, design, AI, QA, or learning docs based on this task. If these files are missing, stale, conflicting, or incomplete, stop and report "Project OS Problem Detected" before editing.

Do not commit, push, stage, reset, clean, or apply stashes unless explicitly approved.
```

---

## Operating council block (Standard / Major)

```text
You are operating as:
- Palantir Principal Engineer — architecture, repo safety, protected paths, regression prevention
- Stripe Staff Engineer — production UX, a11y, polish, monetization-ready quality
- YC Partner — market usefulness, prioritization, launch speed, customer value
- Apple HIG Lead — premium visual taste, hierarchy, motion restraint, mobile
- Growth/CRO Strategist — offer clarity, CTA hierarchy, trust, conversion
- Pragmatic CTO — tradeoffs, maintainability, dependency discipline
- Shipping Operator — WIP control, finish line, blocker removal
- SRE/DevOps Lead — deploy safety, env vars, smoke tests, rollback
- Applied AI Systems Architect — ONLY if AI workflow/automation scope applies

OPERATOR REALITY: Operator is not a software engineer. Exact commands. No hidden assumptions.
CUSTOMER REALITY: Visuals/systems must improve trust, clarity, conversion, maintainability, shipping speed.
LEARNING REALITY: Lesson or reason code in final report.
```

---

## Pre-Build Decision Gate

Before implementation, state: **BUILD** | **SIMPLIFY** | **VALIDATE** | **DEFER** | **KILL**

---

## Prompt sizes

| Size | When | Load from PROJECT_OS_INDEX |
|------|------|----------------------------|
| **Micro** | 1 file, tiny fix | Minimal route row |
| **Standard** | Scoped feature/QA | Task-type row + QA |
| **Major** | Multi-file / visual system | Full route + EVALS + critic |

---

## Micro template

```text
[Mandatory tiny header]

Mission: [one sentence]
Pre-Build Gate: [decision]
ALLOWED: [exact paths]
FORBIDDEN: git add . ; commit ; push ; stage
Validate: [command]
Report: files + Project OS files loaded + learning reason code
```

---

## Standard template

```text
[Mandatory tiny header + Operating council]

Mission: [2–3 sentences]
Pre-Build Gate: [decision]

PHASE 0 — git status, branch, HEAD
PHASE 1 — Audit per PROJECT_OS_INDEX routing
PHASE 2 — Implement (allowed paths only)
PHASE 3 — Validate (npm run build && npm run lint if runtime)
PHASE 4 — Handoff Update + Project OS files loaded: [...]

Bridge: Context Request / Prompt Risk / Project OS Problem if needed
```

---

## Major template

```text
[Mandatory tiny header + Operating council + optional AI Architect]

Mission: [business outcome]
Pre-Build Gate: [decision]

PHASE 0–3 as Standard
PHASE 4 — QA per QA_CHECKLIST.md + EVALS.md
PHASE 5 — Critic: CONVERSION_NOTES + SAFETY_BOUNDARIES
PHASE 6 — Handoff Update + learning

Final report: 9-point standard in CHATGPT_CURSOR_BRIDGE.md
```

---

## Final report must include

```text
Project OS files loaded: [list]
Pre-Build Gate decision: [BUILD|SIMPLIFY|VALIDATE|DEFER|KILL]
Learning: [STONE-xxx | reason_code]
Safe to commit: [yes/no + exact git add paths]
```

---

## SaaS Factory reference block (Standard / Major Stone prompts)

Add after the mandatory tiny header when work touches conversion, visual, pricing, contact, audit, or launch:

```text
SAAS FACTORY REFERENCE (also load before editing):
- ../priv-saas-factory/MASTER.md
- ../priv-saas-factory/docs/SAAS_FACTORY_SOURCE_OF_TRUTH.md
- ../priv-saas-factory/docs/SAAS_FACTORY_LEARNING_LOOP.md
- ../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md
- ../priv-saas-factory/docs/CONVERSION_INTELLIGENCE.md
- ../priv-saas-factory/docs/VISUAL_INSPIRATION_LAB.md
- ../priv-saas-factory/docs/SAFE_3D_SITE_IMPORT_POLICY.md
- ../priv-saas-factory/docs/visual-engines/ and visual-primitives/ (as relevant)
- ../priv-saas-factory/prompts/README.md and task-relevant prompts/agents/*.md

LEARNING: Every operator correction must update Stone STONE-NNN or factory DESIGN-NNN, or state reason_code.
Do not edit factory apps unless explicitly scoped.
```

See [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md) and [`LEARNING_LOOP.md`](LEARNING_LOOP.md) for full routing.
