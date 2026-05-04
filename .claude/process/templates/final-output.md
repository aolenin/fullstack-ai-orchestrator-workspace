# Template: Final Output

Use this format for the orchestrator's final response after all agents have completed.

---

## Result: [task name]

**Level:** L[0|1|2|3]
**Status:** ✅ Complete / ⚠️ Complete with caveats / ❌ Blocked

---

## What was done

[2–5 sentences describing the changes]

**Files changed:**
- `path/to/file.py` — [what changed]
- `path/to/test.py` — [what changed]

---

## Verification

```bash
[command to verify the change works]
```

---

## Checks run

- [ ] Linter: [passed / skipped — reason]
- [ ] Tests: [passed / skipped — reason]
- [ ] Security review: [done / not required]
- [ ] CLAUDE.md updated: [yes / not required]

---

## Risks and follow-ups

- [risk or follow-up item]
- [risk or follow-up item]

---

## What was NOT verified

[explicit list — never leave this blank if anything was skipped]
