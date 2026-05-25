# ChatGPT ↔ Cursor Bridge

**Last updated:** 2026-05-25 · **Project OS v2**  
**Purpose:** Clear roles, handoffs, and recovery when context is split across tools.  
**Routing:** [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md)

---

## Roles

| Tool | Owns |
|------|------|
| **ChatGPT** | Strategy, prompt architecture, critic review, memory summaries, operator interpretation, “what should we do next” |
| **Cursor** | Read repo, edit files, run validation commands, report dirty git state, refuse unsafe scope |

**Rule:** ChatGPT plans; Cursor verifies against the repo. Neither should guess missing facts.

---

## Context Request for ChatGPT

Cursor must emit this block when requirements, paths, or live state are unclear:

```markdown
## Context Request for ChatGPT

**Task blocked because:**
- [specific gap — e.g. “Vercel project name unknown”]

**What Cursor checked:**
- [files/commands run]

**Questions for operator / ChatGPT:**
1. [exact question]
2. [exact question]

**Safe default if unanswered:**
- [smallest no-risk action — usually docs-only or stop]
```

Do not implement speculative fixes when this block is required.

---

## Prompt Risk Detected

Cursor must emit this when a prompt is too broad, unsafe, or missing guardrails:

```markdown
## Prompt Risk Detected

**Risk:**
- [e.g. “git add . implied”, “runtime + docs mixed without scope”]

**Safer scoped plan:**
1. [step]
2. [step]

**Protected paths to avoid:**
- [list]

**Validation before merge:**
- [commands]
```

Propose the safer plan and wait for operator approval before editing.

---

## Project OS Problem Detected

Cursor must emit when Project OS docs are missing, stale, or conflicting:

```markdown
## Project OS Problem Detected

**Issue:** [missing PROJECT_OS_INDEX | stale PROJECT_CONTEXT | doc vs site.ts conflict]

**What Cursor checked:**
- [paths read]

**Fix before editing:**
- [create/update doc | operator decision | narrow scope]
```

Do not proceed with Standard/Major work until resolved or operator explicitly overrides.

---

## Handoff Update

After any major pass, append or update a handoff block (in chat or `docs/PROJECT_CONTEXT.md` “Agent handoff” section):

```markdown
## Handoff Update — YYYY-MM-DD

**Branch / HEAD:** [branch] @ [short sha]  
**Dirty files:** [summary or “docs only”]

**Completed:**
- [bullet]

**Not done / blocked:**
- [bullet]

**Next recommended prompt:** [one-line Micro or Standard prompt]

**Project OS files loaded:** [list from PROJECT_OS_INDEX routing]

**Pre-Build Gate:** [BUILD | SIMPLIFY | VALIDATE | DEFER | KILL]

**Lessons:** [STONE-xxx | reason_code: already_covered]
```

---

## New ChatGPT Chat Recovery

1. Paste mandatory tiny header from [`PROJECT_OS_INDEX.md`](PROJECT_OS_INDEX.md)
2. Paste link or summary of last Handoff Update
3. State current goal in one sentence
4. Attach: `AGENTS.md`, `docs/PROJECT_OS_INDEX.md`, `docs/PROJECT_CONTEXT.md`, git status
5. Declare prompt size: Micro / Standard / Major
6. Include operating council from [`PROMPT_TEMPLATE.md`](PROMPT_TEMPLATE.md)
6. List **allowed file paths** explicitly
7. Repeat git safety rules: no `git add .`, no commit unless approved

---

## New Cursor Agent Recovery

1. Read `AGENTS.md`, `docs/PROJECT_OS_INDEX.md`, route and load task docs
2. Read `docs/PROJECT_CONTEXT.md`
2. Run: `git status --short`, `git branch --show-current`, `git rev-parse --short HEAD`
3. Confirm task scope vs dirty files — docs-only vs runtime
4. Check [`DESIGN_MISTAKE_LEDGER.md`](DESIGN_MISTAKE_LEDGER.md)
5. If ChatGPT prompt missing scope, emit **Context Request** or **Prompt Risk Detected**
6. End with Handoff Update + learning reason code

---

## Missing-context protocol

| Situation | Action |
|-----------|--------|
| Conflicting docs vs code | Trust `src/data/site.ts` for live copy; report doc drift |
| Unknown deploy target | Read `docs/DEPLOYMENT.md` + `vite.config.ts`; ask if still ambiguous |
| Unclear “fix the site” | Request specific section, viewport, or acceptance criteria |
| Budget / legal constraints | Flag; do not add paid services or fake compliance claims |

---

## File-finding protocol

1. **Site copy / services:** `src/data/site.ts`
2. **Layout / sections:** `src/components/sections/`, `src/App.tsx`
3. **Visuals / CSS:** `src/index.css`, `public/assets/`
4. **Legal:** `public/privacy.html`, `public/terms.html`, `public/capability-brief.html`
5. **Deploy:** `vite.config.ts`, `.github/workflows/deploy.yml`, `docs/DEPLOYMENT.md`
6. **Factory patterns:** `../priv-saas-factory/docs/project-baselines/`

Use repo search before asking the operator for file locations.
