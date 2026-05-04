# TDD Policy

For L1+ tasks involving new functionality, tests are written before implementation.

## Flow

```
test-writer → [backend-api | backend-processing] → code-reviewer
```

1. `test-writer` receives the task description and writes failing tests that define the contract.
2. Primary implementation agent receives the failing tests and makes them pass.
3. `code-reviewer` verifies tests were not weakened to pass.

## When TDD applies

- New API endpoint (any level)
- New Celery task or Beat schedule
- New service-layer function with domain logic
- Bug fix with a regression path (test must fail before fix, pass after)

## When TDD is skipped

- L0 fast-lane tasks
- Pure refactors with no behavior change (tests already exist)
- Docs, config, or infra-only changes

## test-writer contract

`test-writer` must deliver:
- Tests that currently FAIL (no implementation yet)
- Tests covering: happy path, edge cases, permission enforcement, error/rejection paths
- No implementation code — only tests
- A brief note on what each test group is asserting

## Implementation agent contract

- Must not modify tests to make them pass (except fixing test setup bugs)
- Must not skip or mark tests as `skip`/`xfail` without explicit approval
- If a test is wrong, flag it — do not silently change it

## Reviewer contract

`code-reviewer` must verify:
- Tests existed before implementation (check diff order)
- Tests were not weakened (removed assertions, loosened checks)
- Coverage of the new behavior is meaningful, not trivial
