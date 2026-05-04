# Project Layer — AI Risk Platform Bindings

Project-specific context that overrides or extends the portable process and stack layers.

## Files

| File | Purpose |
|---|---|
| `layout.md` | Repository structure and app inventory |
| `business-non-negotiables.md` | Audit, compliance, hold, and PII rules that cannot be traded off |
| `escalation-triggers.md` | When any agent must stop and ask before continuing |
| `operational-notes.md` | Known constraints, current phase status, gotchas |

## Role deltas (`role-deltas/`)

Per-role overrides for this project. An agent must read its delta before acting.

| File | Overrides for |
|---|---|
| `backend-api.md` | Auth defaults, audit requirements, serializer conventions |
| `backend-processing.md` | Nightly run sequence, task naming, false-positive flow |
| `schema.md` | Hierarchy tables, audit table, PII fields |
