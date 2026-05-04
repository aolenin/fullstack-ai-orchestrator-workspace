# Fast Lane Policy

Fast lane (L0) skips full orchestration overhead for low-risk, single-scope tasks.

## When fast lane applies

ALL of the following must be true:

- [ ] Change is confined to a single file (or trivially 2 files, e.g. view + test)
- [ ] No Django migration required
- [ ] No auth, permission, or session logic touched
- [ ] No Celery task created or modified
- [ ] No external integration changed
- [ ] No shared/core module changed
- [ ] No new dependency introduced
- [ ] Fully reversible: one `git revert` restores previous state
- [ ] No PII or security-sensitive data handling changed

## Fast lane flow

1. Orchestrator outputs abbreviated gate: `[L0 — fast lane: proceeding]`
2. Single most appropriate agent executes the task
3. Agent returns output with verification command
4. Done — no `code-reviewer` pass required

## Fast lane is NOT a shortcut for lazy classification

If any checklist item above is false or uncertain, escalate to L1 minimum.
Fast lane abuse leads to unreviewed changes in risky areas — the cost of a wrong call is higher than the overhead of L1.

## Examples

| Task | Level |
|---|---|
| Fix a typo in an error message | L0 |
| Add a missing field to an existing serializer | L0/L1 (check if migration needed) |
| Add a new API endpoint | L1 minimum |
| Add a Celery task | L2 minimum |
| Change auth middleware | L3 |
