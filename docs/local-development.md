# Local Development

```bash
cp .env.example .env
docker compose up --build
```

Backend migrations run automatically in the compose command.

Run backend tests:

```bash
docker compose exec backend pytest
```

Run frontend build:

```bash
docker compose exec web npm run build
```
