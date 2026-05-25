# Stone Industries — Agent Architecture

**Last updated:** 2026-05-25  
**Load when:** AI workflow tasks, ChatGPT ↔ Cursor setup, multi-agent prompts

---

## Tool roles

| Tool | Responsibility |
|------|----------------|
| **ChatGPT** | Strategy, prompt writing, critic, memory, operator interpretation |
| **Cursor** | Read repo, implement, validate, git snapshot, refuse unsafe scope |

Neither tool guesses missing context.

---

## Project OS as startup brain

| File | Role |
|------|------|
| `AGENTS.md` | Rules, council, git safety |
| `docs/PROJECT_OS_INDEX.md` | Task routing — **load every serious pass** |

Not a runtime agent system — documentation/process architecture only.

---

## Factory agents (reference only)

Stone site work does **not** invoke SaaS Factory stage agents unless working inside `priv-saas-factory`.

When referencing factory patterns, cite:

- `prompts/orchestrator.md` — pipeline doctrine
- `prompts/agents/conversion-intelligence.md` — funnel scoring
- `.claude/skills/` — support skills, not stage agents

---

## Bridge protocols

| Signal | When |
|--------|------|
| **Context Request for ChatGPT** | Missing requirements |
| **Prompt Risk Detected** | Unsafe/broad prompt |
| **Project OS Problem Detected** | Missing/stale OS docs |
| **Handoff Update** | End of Standard/Major pass |

Full spec: [`CHATGPT_CURSOR_BRIDGE.md`](CHATGPT_CURSOR_BRIDGE.md)

---

## Prompt size routing

Micro → Standard → Major — [`PROMPT_TEMPLATE.md`](PROMPT_TEMPLATE.md)

Always include mandatory tiny header from [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md) on serious passes.
