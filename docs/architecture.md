# Architecture — AI Risk Platform

## Stack (current)
| Layer | Technology |
|---|---|
| Frontend | React SPA · Vite · TypeScript |
| API | Django REST Framework |
| Database | PostgreSQL 17 |
| Async workers | Celery workers + Celery Beat |
| Cache / broker | Redis |
| Delivery | Kubernetes + ArgoCD (GitOps) + Helm |
| CI/CD | GitHub Actions |

---

## Runtime service map

```
┌─────────────────────────────────────────────────────────────────┐
│  External inputs                                                 │
│  TSYS REST API · Mreports SFTP batch · ACH reject feed          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Ingestion layer  (Django app: ingestion)                        │
│  · Normalise Portfolio → MCC → ISO → Agent → Merchant hierarchy  │
│  · Write raw + normalised events to PostgreSQL                  │
│  · Enqueue evaluation tasks onto Celery                         │
└────────────────────────┬────────────────────────────────────────┘
                         │  Celery tasks (Redis broker)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Rules Engine  (Django app: rules)                               │
│  · Hierarchical threshold evaluation (flags 1–17)               │
│  · Per-level overrides: Portfolio/MCC/ISO/Agent/Merchant        │
│  · Emits RuleResult events → Celery                             │
└──────────┬──────────────────────────┬──────────────────────────┘
           │ CRITICAL flag             │ HIGH / MEDIUM flag
           ▼                           ▼
┌──────────────────────┐   ┌──────────────────────────────────────┐
│  Mainframe adapter   │   │  Case queue  (Django app: cases)     │
│  (Django app:        │   │  · Stores analyst review queue       │
│   mainframe)         │   │  · Priority: Critical/High/Medium    │
│  · Py3270/wc3270     │   └──────────────────────────────────────┘
│  · Hold / release    │
│    on TSYS terminal  │
└──────────┬───────────┘
           │ hold applied / released
           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Notification gateway  (Django app: notifications)              │
│  · SendGrid (email) + Twilio (SMS)                              │
│  · Recipients: Merchant · ISO Office · Agent                    │
│  · Payload: hold reason · timeline · secure upload link         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Audit log  (Django app: audit)                                  │
│  · Tamper-evident append-only writes                            │
│  · Captures: transaction ID · flag · AI confidence · hold status│
│    · parameter delta · system identity · timestamp              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  ML scoring layer  (Django app: ml_scoring)                      │
│  · Feature contract: 90-day behavioural baseline per merchant   │
│  · XGBoost inference via scoring interface (sync or async)      │
│  · False-positive detection → auto-release + recalibration      │
│  · Corrected events fed back to training dataset                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Compliance monitor  (Django app: compliance)                    │
│  · VAMP / VIRP / ECP / BRAM / QMAP tracking                    │
│  · Internal thresholds 30–40 % below official network limits    │
│  · Fires executive alert + ISO throttling when breached         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Scheduler  (Celery Beat)                                        │
│  · Nightly 05:00 agent run: ingest → evaluate → hold → brief    │
│  · Morning briefing delivered to Risk team by 07:30             │
│  · Hourly compliance ratio recalculation                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Presentation layer  (React SPA)                                 │
│  · Risk analyst console                                         │
│  · ISO Partner Portal (real-time hold status / reserves / CBs)  │
│  · Executive profitability dashboard                            │
│  All views gated by RBAC roles                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Django application map

| App | Responsibility | Status |
|---|---|---|
| `health` | Liveness / readiness probe | ✅ exists |
| `rules` | Flag definitions, threshold evaluation (flags 1–17) | ✅ flags 1–4 only |
| `ingestion` | TSYS REST + SFTP batch normalisation, hierarchy mapping | ❌ missing |
| `cases` | Case queue, analyst review, priority triage | ❌ missing |
| `notifications` | SendGrid / Twilio dispatch, template registry | ❌ missing |
| `audit` | Tamper-evident append-only audit log | ❌ missing |
| `ml_scoring` | Feature contracts, XGBoost scoring interface, feedback loop | ❌ missing |
| `compliance` | VAMP/VIRP/ECP/BRAM ratio tracking, alert dispatch | ❌ missing |
| `mainframe` | Py3270/wc3270 hold/release adapter | ❌ missing |
| `hierarchy` | Portfolio → MCC → ISO → Agent → Merchant override config | ❌ missing (threshold overrides partially in `rules`) |

---

## Infrastructure gaps

| Component | Local (docker-compose) | K8s (infra/k8s) | Notes |
|---|---|---|---|
| PostgreSQL | ✅ | ✅ | primary store |
| Redis | ❌ missing | ❌ missing | Celery broker + rules cache |
| Celery worker | ❌ missing | ❌ missing | async evaluation, notifications, audit writes |
| Celery Beat | ❌ missing | ❌ missing | nightly 05:00 scheduler |
| Backend | ✅ | ✅ | |
| Frontend | ✅ | ✅ | |
| Secret management | .env only | secret.example.yaml | no Vault / external secrets operator yet |
| Elasticsearch | — | — | deferred: use PostgreSQL FTS for v1 |

---

## CI/CD gaps

| Gate | Status | Notes |
|---|---|---|
| Backend lint + tests | ✅ backend-ci.yml | |
| Frontend lint + build | ✅ frontend-ci.yml | |
| Docker publish | ✅ docker-publish.yml | |
| Manifest check | ✅ manifests-check.yml | |
| Migration safety check | ❌ missing | detect destructive migrations before merge |
| Security scan (SAST) | ❌ missing | Bandit / Semgrep for Python |
| E2E smoke test | ❌ missing | post-deploy health + rules API sanity |
| ML model validation gate | ❌ missing | precision / recall threshold before model swap |

---

## Orchestration model

### Engineering orchestration (Claude Code agents)
Described in `CLAUDE.md`. Subagents decompose and implement work in this repo.

### Runtime orchestration (Celery Beat → Celery workers)
Scheduled and event-driven workflows inside the deployed application:

1. **Nightly ingestion run** — Celery Beat fires at 05:00 → `ingestion` fetches Mreports batch → normalises → writes to PostgreSQL → enqueues `evaluate_accounts` task.
2. **Real-time rule evaluation** — HTTP ingest endpoint enqueues `evaluate_transaction` task → `rules` engine evaluates → emits `RuleResult`.
3. **Hold execution** — `CRITICAL` flag → `mainframe` adapter issues wc3270 hold → confirms → fires `notification_dispatch` task.
4. **Notification dispatch** — `notifications` app sends email+SMS → writes delivery receipt to audit log.
5. **Audit write** — every flag, hold, release, parameter change writes a tamper-evident row via `audit` app.
6. **ML scoring** — `ml_scoring` scores transaction against 90-day baseline → returns confidence → feeds back false-positive corrections.
7. **Compliance recalculation** — hourly Celery Beat task recomputes VAMP/VIRP/ECP ratios → fires alerts if internal thresholds crossed.
8. **Morning briefing** — 07:30 Celery task aggregates overnight case queue → sends prioritised report to Risk team inbox.

---

## Data flow — false positive self-correction

```
Transaction → Rules Engine → ML scoring
                                │
                    confidence < hold threshold?
                         YES ──────────────────────┐
                                                   ▼
                                    Contextual override check
                                    (industry / tenure / UW limits)
                                           │
                                    override applies?
                                         YES ──────────────────┐
                                                               ▼
                                                   Release hold (wc3270)
                                                   Recalibrate threshold
                                                   Annotate merchant record
                                                   Write audit log entry
                                                   Feed event → training set
```

---

## Phased delivery (aligned to roadmap)

| Phase | Weeks | Scope |
|---|---|---|
| 1 | 1–4 | Infra foundation · ingestion pipeline · rules flags 1–4 · hold execution · notifications |
| 2 | 5–8 | Flags 5–10 · hierarchy overrides · ML scoring baseline · ACH SLA · chargeback accuracy |
| 3 | 9–12 | Autonomous nightly agent · flags 11–17 · compliance module · ISO portal · exec dashboard · go-live |
