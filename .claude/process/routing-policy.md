# Routing Policy — Task Classification

Every task must be classified before any agent is launched. The orchestrator assigns a level based on blast radius, risk, and scope.

## Classification levels

### L0 — Fast lane
**Criteria (ALL must be true):**
- Single file change or trivial multi-file (rename, copy-paste fix)
- No migrations, no schema changes
- No auth / permission / session logic
- No Celery task additions or modifications
- No external integration changes
- No shared/core module changes
- Fully reversible with one revert

**Flow:** 1 primary agent → done. No review required.

---

### L1 — Standard
**Criteria:**
- 1–5 files, single app
- Low risk: new endpoint on existing model, serializer tweak, minor service addition
- No cross-app impact
- No plan-first areas touched

**Flow:** 1 primary agent → `code-reviewer`

---

### L2 — Feature
**Criteria:**
- Cross-app changes OR new Celery task OR new external integration OR new model
- Medium risk: new API resource, background job, notification flow
- Touches ≤ 2 plan-first areas

**Flow:** `system-architect` (if boundaries unclear) → primary agents → `security-reviewer` (if auth/PII touched) → `code-reviewer`

---

### L3 — Complex
**Criteria (ANY triggers L3):**
- Architecture change or new app/service boundary
- Schema migration on a table with concurrent writes
- Auth, JWT, session, or OTP changes
- New external provider integration
- Shared/core module restructure
- Cross-cutting changes affecting 3+ apps
- Irreversible or high-blast-radius operations

**Flow:** `system-architect` → plan approval → full agent roster → `security-reviewer` → `qa-engineer` → `code-reviewer`
**Mandatory:** plan must be stated and confirmed before any implementation starts.

---

## Role matrix

| Task type | Primary agent |
|---|---|
| REST endpoint, serializer, model | `backend-api` |
| Celery task, Beat schedule, worker logic | `backend-processing` |
| DB schema, migration, index | `schema` |
| React screen, API client, state | `frontend-engineer` |
| External API adapter, MCP | `integration-engineer` |
| Ingestion pipeline, SFTP, normalisation | `data-engineer` |
| ML scoring, feature contract | `ml-engineer` |
| Docker, K8s, CI/CD | `devops-engineer` |
| Spec, requirements, acceptance criteria | `spec-steward` |
| Tests written before implementation | `test-writer` |
| Docs, runbooks, CLAUDE.md | `technical-writer` |
| Security, PII, RBAC, audit | `security-reviewer` |
| Final PR review | `code-reviewer` |
| Architecture, boundaries, ADRs | `system-architect` |

## Ambiguous tasks

If classification is unclear between L1 and L2, default to L2.
If classification is unclear between L2 and L3, default to L3.
When in doubt, escalate.
