# Template: Sub-Agent Task Packet

Use this when the orchestrator delegates to a subagent. Provide all context the agent needs — it has no memory of prior conversation.

---

## Task packet for: [agent name]

**Goal:** [what to build or fix — one paragraph]

**Context:**
- Project: [project name]
- Relevant files: [list known files]
- Related agents already run: [list or none]
- Output from prior agents: [paste relevant findings or none]

**Constraints:**
- Level: L[1|2|3]
- Do NOT touch: [list out-of-scope areas]
- Plan-first areas in scope: [list or none]
- Guardrail profiles to apply: [list from `.claude/process/guardrail-profiles/`]

**Acceptance criteria:**
1. [criterion]
2. [criterion]

**Verification command:** `[command]`

**Handoff to:** [next agent or done]
