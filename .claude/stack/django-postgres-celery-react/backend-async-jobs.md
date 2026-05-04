# Backend Async Jobs Standards — Celery + Redis

## Broker and backend

- Broker: Redis.
- Result backend: Redis or `django-celery-results` (PostgreSQL).
- Do not use the database as the broker.

## Task conventions

- Every task must be idempotent.
- Use `name="domain.verb"` — never rely on auto-generated names.
- Use `bind=True` for tasks that need `self.retry()`.
- Set explicit `max_retries` and `default_retry_delay` on every retryable task.
- Wrap body with project's logging context helper.
- Keep task functions thin — delegate to `services/`.

## Beat scheduling

- All periodic tasks defined in the central Beat schedule config (`CELERY_BEAT_SCHEDULE` in settings).
- Do not define schedules inline in task modules.
- Use `django-celery-beat` for DB-backed dynamic schedules.

## Serialization

- Default serializer: JSON (not pickle — security risk).
- Pass only primitive types and IDs as task arguments. Never pass model instances.

## Concurrency

- Default worker concurrency: 4 (tune per deployment).
- Use `select_for_update()` + `transaction.atomic()` when task mutates shared state.
- Use Redis-based distributed lock for cross-worker coordination.

## Monitoring

- Expose Flower or integrate with existing observability stack.
- Failed tasks must be visible — use dead letter queue or result backend with `CELERY_TASK_TRACK_STARTED=True`.
