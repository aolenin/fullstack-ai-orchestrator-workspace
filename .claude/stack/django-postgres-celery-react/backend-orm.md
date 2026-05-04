# Backend ORM Standards — Django ORM + PostgreSQL

## General rules

- Use the Django ORM by default. Raw SQL only for queries the ORM cannot express or for performance-critical paths — isolate in a service and document why.
- Always use `select_related` / `prefetch_related` to prevent N+1 queries in list views.
- Use `only()` / `defer()` when fetching large models with unused fields.
- Use `iterator()` for processing large querysets to avoid memory pressure.
- Use `bulk_create` / `bulk_update` for batch writes.

## Transactions

- Wrap multi-model state changes in `transaction.atomic()`.
- Use `select_for_update()` when reading-then-writing a record that may be concurrently modified.
- Avoid long-running transactions — keep the atomic block as small as possible.
- Do not call external services inside an open transaction.

## Indexes

- Add a DB index on every foreign key (Django does this automatically with `ForeignKey`).
- Add indexes on any field used in `filter()`, `order_by()`, or `get()` in hot paths.
- Use `db_index=True` for single-column indexes.
- Use `Meta.indexes` for composite or partial indexes.
- Add indexes concurrently in migrations on large tables (`CREATE INDEX CONCURRENTLY`).

## Migrations

- One logical change per migration file.
- Prefer backward-compatible changes (add nullable → backfill → make non-null).
- Never edit a migration that has been applied in any environment.
- Data migrations: use `apps.get_model`, no network calls, keep idempotent.
- Long-running backfills: management commands, not migration code.
