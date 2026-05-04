# Runtime Floors

Minimum versions required. Do not introduce code that requires higher versions without updating this file.

| Component | Minimum | Notes |
|---|---|---|
| Python | 3.11 | 3.12+ preferred for new work |
| Django | 4.2 LTS | 5.x acceptable |
| Django REST Framework | 3.14 | |
| PostgreSQL | 17 | |
| Redis | 7.0 | |
| Celery | 5.3 | |
| Node.js | 20 LTS | for frontend build |
| React | 19 | |
| TypeScript | 5.0 | |
| Docker Compose | 2.20 | `docker compose` (no hyphen) |

## Upgrade policy

- Security patches: apply within 2 weeks.
- Minor versions: evaluate quarterly.
- Major versions: require explicit decision and ADR.
- Do not pin to an EOL version without a documented reason and remediation plan.
