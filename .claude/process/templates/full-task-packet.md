# Template: Full Task Packet (L2/L3)

Use for feature-level and complex tasks. Requires plan approval before implementation.

---

## Task: [name]

**Level:** L[2|3]
**Requestor context:** [why this is being built]

---

## Spec

**Input:** [what comes in]
**Output:** [what goes out]
**Error cases:** [what can go wrong and how it's handled]
**Permissions:** [who can perform this action]
**Audit requirement:** [what must be logged]

---

## Proposed plan

1. [step — agent responsible]
2. [step — agent responsible]
3. [step — agent responsible]
...

**Plan-first areas touched:** [list]
**Migrations required:** [yes/no — describe]
**Schema changes:** [yes/no — describe]
**Celery changes:** [yes/no — describe]

---

## Agent sequence

```
[agent-1] → [agent-2] → [security-reviewer?] → [code-reviewer]
```

---

## Acceptance criteria

- [ ] [criterion]
- [ ] [criterion]

---

## Definition of done

- [ ] Tests pass
- [ ] Linter passes
- [ ] CLAUDE.md updated if behavior changed
- [ ] Audit trail written (if applicable)
- [ ] Risks and follow-ups stated

---

**Awaiting confirmation before proceeding:** yes
