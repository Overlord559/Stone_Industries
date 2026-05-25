# Stone Industries — Learning Loop

**Last updated:** 2026-05-25 · **Project OS v2**  
**Routing:** [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md) → learning/backfill row  
**Related:** SaaS Factory [`docs/SAAS_FACTORY_LEARNING_LOOP.md`](../../priv-saas-factory/docs/SAAS_FACTORY_LEARNING_LOOP.md)

---

## Purpose

Capture mistakes once so ChatGPT and Cursor do not repeat them across sessions.

---

## When to add a lesson

Add to [`DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md) when:

- Operator corrects the same issue twice
- Visual pass hides conversion or contact paths
- Generated assets staged at repo root
- Invalid Tailwind utilities silently fail
- AI service naming overclaims capability
- Background/scrim tuning blocks focal art

If the pattern applies to **all factory projects**, also reference or extend SaaS Factory `DESIGN-NNN` entries.

---

## Reason codes when no lesson is added

| Code | When |
|------|------|
| `already_covered` | Existing ledger entry fully covers it — cite ID |
| `one_off_fix` | Single typo/bug, no reusable pattern |
| `out_of_scope` | Read-only, docs-only baseline, or task excluded learning |
| `needs_operator_review` | Operator may disagree — schedule backfill |

**Mandatory:** Every Standard/Major agent final report includes one of the above if no new lesson was written.

---

## Operator disagreement rule

If the operator says a pass should have produced a lesson, run a **learning backfill** — extend an existing entry or add `STONE-NNN`. Do not dismiss because visual QA passed.

---

## Where lessons go

| Location | Owns |
|----------|------|
| `docs/DESIGN_MISTAKE_LEDGER.md` | Stone-specific and site-proven patterns |
| `../../priv-saas-factory/docs/DESIGN_MISTAKE_LEDGER.md` | Factory-wide DESIGN-NNN doctrine |
| Handoff Update in chat | Session continuity until doc updated |

---

## Relationship to SaaS Factory

Stone Industries is a **proof site** for factory visual patterns (parallax, orb accents, conversion discipline). Lessons discovered here should:

1. Land in Stone ledger first (plain language)
2. Promote to SaaS Factory DESIGN-NNN when reusable (see DESIGN-024–030 for examples)

Agents working in Stone should read **both** ledgers before visual or conversion passes.
