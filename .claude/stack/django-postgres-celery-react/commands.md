# Commands Reference

All commands assume Docker Compose local environment unless noted.

## Local development

```bash
# First time setup
cp .env.example .env
docker compose up --build

# Daily start
docker compose up

# Stop (keep volumes)
docker compose stop

# Stop + remove containers/network
docker compose down

# DESTRUCTIVE — also removes volumes/data
docker compose down -v
```

## Backend (inside container)

```bash
docker exec -it <backend-container> bash

# Django checks
./manage.py check

# Linter
flake8
# or
ruff check .

# Migrations
./manage.py makemigrations
./manage.py migrate

# Tests with coverage
coverage run manage.py test
coverage report

# Single test class
./manage.py test <app>.tests.<module>.<TestClass>

# Load fixtures
./manage.py loaddata <fixture_name>

# Create superuser
./manage.py createsuperuser
```

## Celery (inside container)

```bash
# Worker
celery -A config worker -l info

# Beat scheduler
celery -A config beat -l info

# Inspect active tasks
celery -A config inspect active
```

## Frontend

```bash
cd web
npm install
npm run dev        # development server
npm run build      # production build
npm run typecheck  # TypeScript check
npm run lint       # ESLint
npm test           # run tests
```

## CI test stack (from host)

```bash
docker compose -f docker-compose-tests.yml up --build \
  --abort-on-container-exit --exit-code-from backend-test
docker compose -f docker-compose-tests.yml down
```

## Git

```bash
git status
git log --oneline -10
git diff HEAD
```
