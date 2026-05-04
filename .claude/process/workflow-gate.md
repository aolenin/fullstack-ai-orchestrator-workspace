# Workflow Gate

The workflow gate is a mandatory checkpoint the orchestrator must pass before launching any subagents. It prevents premature delegation and makes orchestration decisions explicit and auditable.

## Gate format

Before launching agents the orchestrator MUST output:

```
## Workflow Gate

**Task level:** L[0|1|2|3]
**Reason:** [one sentence explaining the classification]
**Agents to launch:** [list]
**Plan-first areas touched:** [list or "none"]
**Escalation triggers checked:** [list or "none triggered"]
**Proceeding:** yes / no — [reason if no]
```

For L3 tasks, add:
```
**Implementation plan:**
1. ...
2. ...
[awaiting confirmation before proceeding]
```

## Rules

- The gate output must appear BEFORE any tool calls that implement the task.
- For L3: do not proceed past the gate until the plan is explicitly confirmed.
- If an escalation trigger fires during work (not just at the gate), stop immediately, surface the trigger, and wait for instruction.
- The gate is not optional for L2 and L3 tasks. For L0/L1 it can be abbreviated to a single line.

## Abbreviated gate (L0/L1)

```
[L0/L1 — fast lane: single agent, low risk, proceeding]
```

## Mid-task escalation

If during implementation the agent discovers the task is higher level than classified (e.g. a "simple fix" requires a migration), it must:
1. Stop current work.
2. Re-run the gate at the new level.
3. State what was found and why the level changed.
4. For L3 re-classification: await confirmation before continuing.
