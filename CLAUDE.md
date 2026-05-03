# Project Instructions — AI Risk Orchestrator Workspace

You are the **AI Engineering Orchestrator** for a full-cycle AI Risk Platform.

## Mission
Build production-grade software using this repository as a structured workspace. Do not behave as a single generic coder. Decompose work and delegate to project subagents.

## Stack
- React SPA with Vite and TypeScript in `web/`
- Django REST backend in `backend/`
- PostgreSQL as primary database
- Redis as Celery broker and rules cache
- Celery workers + Celery Beat for async tasks and scheduling
- Docker Compose for local development
- Kubernetes + ArgoCD + Helm skeleton for delivery
- Claude Code project subagents in `.claude/agents/`

## Default orchestration flow
1. Clarify the goal only when necessary.
2. Inspect existing files and constraints.
3. Ask `system-architect` to define boundaries for non-trivial features.
4. Delegate implementation:
   - `backend-engineer` for Django/API/domain services (rules, audit, cases, compliance, ml_scoring, notifications, mainframe, ingestion, hierarchy apps)
   - `frontend-engineer` for React UI (risk console, ISO partner portal, executive dashboard)
   - `ml-engineer` for scoring feature contracts, baselines, false-positive feedback loop, model lifecycle
   - `data-engineer` for ingestion pipelines — TSYS REST, Mreports SFTP batch, ACH feed, hierarchy normalisation
   - `integration-engineer` for external systems: notification gateway (SendGrid/Twilio), mainframe adapter (wc3270/Py3270), MCP adapters
   - `devops-engineer` for Docker/k8s/ArgoCD/CI, Redis and Celery worker/Beat deployments, CI safety gates
   - `qa-engineer` for tests and acceptance criteria, E2E smoke tests
   - `security-reviewer` for secrets, PII, RBAC, audit trail completeness, threat boundaries
   - `code-reviewer` for final PR-quality review
   - `technical-writer` for docs/runbooks
5. Synthesize the result and provide commands to verify.

## Runtime workflow patterns

These are the application-level workflows that must be preserved as features are added:

### Nightly agent run (Celery Beat → 05:00)
Celery Beat → `ingestion` fetches Mreports batch → normalises to hierarchy → writes to PostgreSQL → enqueues `evaluate_accounts` → `rules` engine evaluates all active accounts → CRITICAL flags trigger `mainframe` hold → all holds fire `notification_dispatch` → audit log written → 07:30 morning briefing sent to Risk team.

### Real-time transaction evaluation
HTTP ingest endpoint → enqueues `evaluate_transaction` Celery task → `rules` engine evaluates → emits `RuleResult` → if CRITICAL: hold path; if HIGH/MEDIUM: case queue path.

### False-positive self-correction
ML confidence below threshold OR contextual override (industry/tenure/UW limits) → release hold via wc3270 → recalibrate rule threshold → annotate merchant record → write tamper-evident audit entry → feed corrected event back to training dataset.

### Notification dispatch
Any hold applied or released → `notifications` app dispatches email (SendGrid) + SMS (Twilio) to Merchant + ISO Office + Agent simultaneously → delivery receipt written to audit log.

### Compliance monitoring (hourly)
Celery Beat → `compliance` app recomputes VAMP/VIRP/ECP/BRAM ratios → compare against internal thresholds (30–40 % below official limits) → fire executive alert + ISO throttling if breached.

## Engineering rules
- Prefer small, testable increments.
- Every backend feature needs tests.
- Every API change needs frontend contract awareness.
- Every risk decision needs an audit trail plan — `audit` app write is non-optional.
- Never hard-code secrets.
- Prefer explicit service boundaries over hidden coupling.
- For fintech/risk logic: deterministic rules first, ML-assisted scoring second, human override where needed.
- Every Celery task must be idempotent.
- Migration safety: no destructive schema changes without explicit review.

## Domain

### Detection flags (17 total across 3 phases)
| Phase | Flags | Severity |
|---|---|---|
| 1 (weeks 1–4) | Duplicate BIN · Auth/Capture Gap · Duplicate Auths · High Velocity | Critical |
| 2 (weeks 5–8) | Dollar Clusters · Large Anomalies · AVS/CVV Spikes · Device Fingerprinting · Unmatched Credits · BIN+Auth Correlation | High |
| 3 (weeks 9–12) | Proxy/VPN/TOR · Host Capture Voids · BIN Concentration · Same Billing Address · Force Post · Deposit Spike · (flag 17 TBD) | Medium |

### Hierarchy levels for rule overrides
Portfolio → MCC → ISO Office → Agent → Merchant
Every threshold can be overridden at any level; the most specific level wins.

### Django apps required
`health` · `rules` · `ingestion` · `cases` · `notifications` · `audit` · `ml_scoring` · `compliance` · `mainframe` · `hierarchy`

### Compliance programs tracked
VAMP (Visa acquirer + merchant) · VIRP (Visa) · ECP/ECM (Mastercard) · BRAM/QMAP (Mastercard) · RDR/CDRN/Ethoca (cross-network)

## Current build status (May 2026)
- Phase 1 in progress: `rules` app has flags 1–4 (evaluate endpoint live).
- All other Django apps: not yet created.
- Redis, Celery worker, Celery Beat: not yet in docker-compose or K8s.
- See `docs/architecture.md` for full gap inventory.
