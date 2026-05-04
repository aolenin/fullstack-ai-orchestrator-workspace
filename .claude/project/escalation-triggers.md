# Escalation Triggers

Any agent that encounters one of these triggers MUST stop, surface it, and wait for instruction before continuing.

## Hard stops — always escalate

- [ ] The task requires dropping or nullifying a column on a table with live data
- [ ] The task requires changes to auth, JWT, session, or OTP logic
- [ ] The task requires a new external provider integration (new API key, new service)
- [ ] The task requires changes to `general/` or `main/` shared modules
- [ ] A migration would lock a table that receives concurrent writes
- [ ] The task requires changing permission classes used by more than one endpoint
- [ ] A data migration requires a network call or external service
- [ ] The blast radius of the change touches 3+ apps unexpectedly
- [ ] An irreversible operation is required (data delete, schema drop)

## Conditional stops — escalate if uncertain

- [ ] You are about to modify a file you did not create and cannot confirm is safe to change
- [ ] You discover that the task is higher level than originally classified
- [ ] You find conflicting rules across `CLAUDE.md`, `AGENTS.md`, and the process layer
- [ ] The task requires a decision between two valid approaches with different risk profiles
- [ ] You are about to introduce a new dependency

## How to escalate

1. Stop current work immediately.
2. State which trigger fired and why.
3. Describe exactly what you were about to do.
4. Ask a specific yes/no or choice question — do not leave the decision open-ended.
5. Wait for response before continuing.

## Not an escalation trigger

- Linter warnings on unrelated code (flag in handoff, don't stop)
- Missing tests on pre-existing code (flag in handoff)
- Style inconsistencies outside scope (flag in handoff)
