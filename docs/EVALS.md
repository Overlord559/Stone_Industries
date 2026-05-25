# Stone Industries — Evals (Pass/Fail Rubrics)

**Last updated:** 2026-05-25  
**Load when:** QA, critic pass, post-change validation

---

## Site eval (runtime)

| ID | Check | Pass |
|----|-------|------|
| E1 | `npm run build` | Exit 0 |
| E2 | `npm run lint` | Exit 0 |
| E3 | Homepage loads prod base | Assets 200 |
| E4 | Primary CTA visible 375px | ≤1 scroll |
| E5 | Mailto subject correct | Per service |
| E6 | tel: link works | Mobile |
| E7 | Console clean | No uncaught errors |
| E8 | Future roadmap labeled | Vision section |
| E9 | No fake proof | Manual scan |

Full steps: [`QA_CHECKLIST.md`](QA_CHECKLIST.md)

---

## Copy / AI eval

| ID | Check | Pass |
|----|-------|------|
| C1 | AI service name practical | “AI Workflow Automation” |
| C2 | Human review stated | In AI service scope |
| C3 | No agentic overclaim | Hero + Services |
| C4 | Tagline honest | Today = services; Tomorrow = Vision |

---

## Visual eval

| ID | Check | Pass |
|----|-------|------|
| V1 | Lower background visible | Not uniform black |
| V2 | Orb avoids signage | STONE-002 |
| V3 | CTA contrast | Light btn = dark text |
| V4 | Mobile parallax OK | No fixed-attach jank |

---

## Doc / process eval (Standard/Major)

| ID | Check | Pass |
|----|-------|------|
| D1 | Startup header used | In prompt |
| D2 | PROJECT_OS_INDEX routed docs loaded | Listed in report |
| D3 | Handoff Update present | End of pass |
| D4 | Learning reason code | Present |

---

## Scoring

- **Ship:** All E* P0 pass + no BLOCK on C1–C3, V1–V3
- **Fix first:** Any E4–E6 fail (conversion)
- **Block:** Fake claims (E9/C* fail) or build fail
