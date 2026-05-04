# Source of Truth Pattern

When rules or facts conflict across files, this priority order resolves them.

## Priority order (highest → lowest)

1. **`CLAUDE.md`** in the project root — project-wide overrides, always wins
2. **`AGENTS.md`** in the project root — agent-specific guidance for this project
3. **`.claude/project/`** layer — project bindings (layout, non-negotiables, escalation triggers)
4. **`.claude/stack/`** layer — engineering standards for the active stack
5. **`.claude/process/`** layer — portable workflow core
6. **Agent file defaults** — the agent's own `## Project context rule` section
7. **General AI defaults** — last resort

## Rules

- An agent that finds a conflict must apply the higher-priority source and note the conflict in its output.
- Agents must not infer project structure from memory — always read the current files.
- If `CLAUDE.md` is absent from a project, treat `AGENTS.md` as highest priority.
- Stack layer files describe the general standard; project layer `role-deltas/` override them per role.

## Staleness

Memory and cached knowledge decay. Before acting on a remembered fact about project structure:
- Verify the file still exists at the expected path.
- Verify the rule hasn't been superseded in `CLAUDE.md`.

A stale memory applied with confidence causes more damage than admitting uncertainty.
