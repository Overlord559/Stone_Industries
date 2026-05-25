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

## STONE-006 — Practical AI service naming

| Field | Value |
|-------|-------|
| **Severity** | WARNING |
| **Factory link** | DESIGN-030 |
| **Status** | ACTIVE |

**Problem:** Vague “agentic” labels overclaim and blur future vs current services.

**Rule:** Use **AI Workflow Automation** with human review in scope. Future roadmap items stay in Vision section — not Current Services.

---

## How to add a lesson

1. Assign next `STONE-NNN` ID
2. Set severity and status
3. Link SaaS Factory `DESIGN-NNN` if reusable
4. Add QA check to [`QA_CHECKLIST.md`](QA_CHECKLIST.md) when applicable
5. Reference in final report Handoff Update
