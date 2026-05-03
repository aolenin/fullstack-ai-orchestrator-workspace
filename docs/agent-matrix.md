# Agent Matrix

## Engineering agents (Claude Code subagents)

| Agent | Responsibility | Trigger |
|---|---|---|
| `orchestrator` | Delegates and synthesises work across all agents | Entry point for any feature request |
| `system-architect` | Defines service boundaries, data contracts, ADRs | Non-trivial features, cross-service changes |
| `backend-engineer` | Django apps, models, services, migrations, tests | API, domain logic, rules engine, audit |
| `frontend-engineer` | React SPA screens, API clients, state, UX flows | UI features, partner portal, dashboards |
| `ml-engineer` | Feature contracts, scoring interfaces, baselines, model lifecycle | ML scoring layer, false-positive loop |
| `data-engineer` | Ingestion pipelines, SFTP/REST adapters, data normalisation, hierarchy mapping | TSYS/Mreports ingest, batch processing |
| `integration-engineer` | External APIs, MCP adapters, message contracts, legacy boundaries | Notification gateway (SendGrid/Twilio), mainframe adapter (wc3270/Py3270) |
| `devops-engineer` | Docker, Kubernetes, ArgoCD, Helm, CI/CD | Infra changes, Redis/Celery deployments, CI gates |
| `qa-engineer` | Test strategy, acceptance criteria, E2E smoke tests | Every feature, pre-release |
| `security-reviewer` | Secrets, PII, RBAC, audit trails, threat boundaries | Pre-merge review, compliance scope changes |
| `code-reviewer` | PR-quality review: correctness, maintainability, risk | Final review before merge |
| `technical-writer` | README, runbooks, API docs, deployment guides | New apps, infra changes, go-live |
| `codebase-search` | Read-only repo navigation, symbol lookup | Exploration, dependency analysis |

## Agent responsibilities by domain area

| Domain area | Primary agent | Supporting agents |
|---|---|---|
| Dynamic rules engine (flags 1–17) | `backend-engineer` | `system-architect`, `qa-engineer` |
| Data ingestion (TSYS/Mreports/ACH) | `data-engineer` | `backend-engineer`, `integration-engineer` |
| Mainframe automation (wc3270) | `integration-engineer` | `backend-engineer`, `security-reviewer` |
| ML scoring + false-positive loop | `ml-engineer` | `backend-engineer`, `qa-engineer` |
| Notification gateway (SendGrid/Twilio) | `integration-engineer` | `backend-engineer` |
| Audit log | `backend-engineer` | `security-reviewer` |
| Case queue + triage | `backend-engineer` | `frontend-engineer` |
| Compliance monitoring (VAMP/VIRP/ECP) | `backend-engineer` | `ml-engineer`, `security-reviewer` |
| Celery workers + Beat scheduler | `devops-engineer` | `backend-engineer` |
| Redis (broker + cache) | `devops-engineer` | `backend-engineer` |
| ISO Partner Portal | `frontend-engineer` | `backend-engineer` |
| Executive dashboard | `frontend-engineer` | `backend-engineer` |
| RBAC across all views | `security-reviewer` | `backend-engineer`, `frontend-engineer` |
| CI gates (migration safety, SAST, E2E) | `devops-engineer` | `qa-engineer`, `security-reviewer` |
