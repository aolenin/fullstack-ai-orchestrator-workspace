# Project Layout

## Repository structure

```
ai-orchestrator-workspace/
├── .claude/
│   ├── agents/          # Subagent role contracts (14 agents)
│   ├── process/         # Portable workflow core (routing, gates, guardrails, templates)
│   ├── stack/           # Engineering standards for active stack
│   ├── project/         # Project-specific bindings
│   └── skills/          # Domain reference packs
├── backend/             # Django application
│   ├── apps/
│   │   ├── health/      # Health check endpoint
│   │   └── rules/       # Phase 1 detection flags (1–4, live)
│   └── config/          # Django settings, URLs, WSGI/ASGI
├── web/                 # React + TypeScript + Vite frontend
├── infra/
│   ├── k8s/             # Kubernetes manifests (Kustomize)
│   ├── helm/            # Helm chart skeleton
│   └── argocd/          # ArgoCD app definitions
├── docs/                # Architecture docs, runbooks, agent matrix
├── scripts/             # Setup and check scripts
├── prompts/             # Reusable orchestration prompts
├── user-docs/           # Business docs (roadmap pptx)
├── docker-compose.yml   # Local dev stack
├── .env.example         # Env var template
├── .mcp.json            # MCP server config
└── CLAUDE.md            # Project-wide Claude guidance
```

## Backend app inventory

| App | Status | Description |
|---|---|---|
| `health` | ✅ Live | Health check endpoint |
| `rules` | 🔧 In progress | Flags 1–4 evaluation engine |
| `ingestion` | ❌ Not created | TSYS/Mreports/ACH data ingestion |
| `cases` | ❌ Not created | Case management queue |
| `notifications` | ❌ Not created | SendGrid/Twilio dispatch |
| `audit` | ❌ Not created | Tamper-evident audit log |
| `ml_scoring` | ❌ Not created | ML confidence scoring |
| `compliance` | ❌ Not created | VAMP/VIRP/ECP/BRAM monitoring |
| `mainframe` | ❌ Not created | wc3270/Py3270 hold/release |
| `hierarchy` | ❌ Not created | Portfolio→Merchant override resolution |

## Key docs

| File | Purpose |
|---|---|
| `docs/architecture.md` | Full service map, gap inventory, infra gaps |
| `docs/agent-matrix.md` | Agent responsibility by domain |
| `docs/local-development.md` | Local setup guide |
| `docs/deployment.md` | Deployment runbook |
