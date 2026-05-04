# Process Layer — Portable Workflow Core

This layer contains the workflow rules, routing policy, and templates that are portable across any project. It does not contain project-specific details.

## Files

| File | Purpose |
|---|---|
| `routing-policy.md` | Task classification (L0–L3) and role matrix |
| `workflow-gate.md` | Mandatory checkpoint before launching agents |
| `fast-lane-policy.md` | Rules for L0 simple tasks |
| `tdd-policy.md` | TDD contract: tests before implementation |
| `source-of-truth-pattern.md` | Priority order when rules conflict |

## Templates (`templates/`)

| Template | Use for |
|---|---|
| `sub-agent-task-packet.md` | Delegating to a subagent |
| `full-task-packet.md` | L2/L3 feature or complex task |
| `final-output.md` | Orchestrator final response |
