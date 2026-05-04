# Operational Notes

Known behaviors, constraints, and gotchas that affect day-to-day development.

## Local development

- `docker compose up` requires `.env` (copy from `.env.example`).
- The `rules` app is the only fully functional app. All other apps are stubs or not yet created.
- Redis and Celery worker/beat services exist in `docker-compose.yml` but are not yet wired to any tasks.
- Frontend (`web/`) is a Vite scaffold — no real UI screens yet.

## Database

- PostgreSQL is the source of truth for all domain data.
- Redis is broker + cache only — never the authoritative store for financial or risk data.
- Migrations must be run manually after pulling new code: `./manage.py migrate`.

## Celery

- Beat schedule is empty — no periodic tasks defined yet.
- Workers are configured but have no registered tasks beyond health.
- Nightly 05:00 run is planned (see architecture.md) but not implemented.

## External integrations

- No live external integrations yet. All integration apps are placeholders.
- TSYS REST API, Mreports SFTP, SendGrid, Twilio, wc3270 — all pending implementation.
- GitHub MCP is live (see `.mcp.json`).

## Phase status (as of May 2026)

- **Phase 1 (weeks 1–4):** `rules` app — flags 1–4 evaluate endpoint live. Flags 5–17 not yet implemented.
- **Phase 2 (weeks 5–8):** Not started.
- **Phase 3 (weeks 9–12):** Not started.

## Known gaps

See `docs/architecture.md` for the full gap inventory table.
