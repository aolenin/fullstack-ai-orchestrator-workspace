# AI Risk Orchestrator Workspace

Пустой, но runnable scaffold для разработки AI Risk Platform полного цикла на стеке:

- **Frontend:** React SPA + Vite + TypeScript
- **Backend:** Python Django + Django REST Framework
- **Database:** PostgreSQL
- **Async:** Celery workers + Celery Beat (Redis broker)
- **Infra:** Docker Compose, Kubernetes, ArgoCD, Helm skeleton
- **AI Engineering:** Claude Code project subagents, skills, prompts, MCP config

Цель репозитория — стартовая база, где главный AI-orchestrator делегирует работу специализированным sub-agents: backend, frontend, ML, QA, reviewer, DevOps, security, integration, data engineer и technical writer.

## Быстрый старт

### 1. Настройте переменные окружения

```bash
cp .env.example .env
```

Откройте `.env` и заполните необходимые параметры. Большинство значений уже заполнены для локальной разработки и ничего менять не нужно.

**Опциональные интеграции** — платформа запускается без них, но они расширяют возможности:

| Переменная | Назначение | Где получить |
|---|---|---|
| `AI_MCP_GITHUB_TOKEN` | GitHub MCP в Claude Code (issues, PRs, code search) | [github.com/settings/tokens](https://github.com/settings/tokens) — scopes: `repo`, `read:org` |
| `SENDGRID_API_KEY` | Email-уведомления Merchant/ISO/Agent | sendgrid.com |
| `TWILIO_*` | SMS-уведомления | twilio.com |
| `TSYS_*` | wc3270 hold/release на mainframe | внутренние учётные данные TSYS |

Если переменная не задана — соответствующая функция просто отключается без ошибок при старте.

### 2. Запустите платформу

```bash
docker compose up --build
```

После запуска:

```text
Frontend:  http://localhost:5173
Backend:   http://localhost:8000/api/health/
Rules API: http://localhost:8000/api/rules/catalog/
```

---

## Claude Code старт

```bash
claude --agent orchestrator
```

Пример задачи:

```text
Реализуй Dynamic Rules Engine flags 1-4: Duplicate BIN, Auth/Capture Gap, Duplicate Auths, High Velocity. Делегируй backend, frontend, QA, security и devops агентам.
```

---

## Структура

```text
.claude/agents/       # project subagents
.claude/skills/       # reusable workflows
backend/              # Django API
web/                  # React SPA
infra/k8s/            # Kubernetes manifests + overlays
infra/argocd/         # ArgoCD AppProject/Application
infra/helm/           # Helm chart placeholder
docs/                 # architecture, runbooks, roadmap notes
prompts/              # reusable prompts for orchestrator
scripts/              # bootstrap/check helpers
user-docs/            # product roadmap and specs
```

---

## Что уже работает

- Django health endpoint
- Rules catalog + evaluation endpoint (flags 1–4)
- React SPA dashboard
- Docker Compose с PostgreSQL + Redis + Celery worker/beat skeleton
- Kubernetes/ArgoCD skeleton
- GitHub Actions skeleton (backend CI, frontend CI, docker publish, manifests check)
- Claude project agents + skills
- GitHub MCP (активируется при наличии `AI_MCP_GITHUB_TOKEN` в `.env`)

---

## Важное

Это scaffold, не production fraud engine. Он предназначен как стартовая точка для инкрементальной разработки по роадмапу `user-docs/Netevia_AI_Risk_Platform_Roadmap_v4.0.pptx`.
