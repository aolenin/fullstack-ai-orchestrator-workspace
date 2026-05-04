# Deprecations

Patterns that are no longer acceptable in new code. Existing usages should be migrated opportunistically.

| Pattern | Reason | Replace with |
|---|---|---|
| `pickle` Celery serializer | Security risk (arbitrary code execution) | JSON serializer |
| Raw `APIView` for CRUD | Unnecessary boilerplate | DRF generic views |
| `django.utils.six` | Removed in Django 3.0 | Python 3 builtins |
| `ugettext` / `ugettext_lazy` | Removed in Django 4.0 | `gettext` / `gettext_lazy` |
| `request.is_ajax()` | Removed in Django 4.0 | Check `Accept` header |
| `on_delete=DO_NOTHING` on FK | Leaves orphaned records | Use `CASCADE`, `PROTECT`, or `SET_NULL` with intent |
| Hardcoded `settings.SECRET_KEY` in tests | Leaks into CI logs | Use `override_settings` or test-specific value |
| `manage.py runserver` in production | Not a production server | gunicorn / uvicorn behind nginx |
| jQuery in new frontend code | Project uses React | React + fetch API |

## Adding to this list

When a pattern is deprecated: add it here, add a linter rule if possible, open a backlog item for migration.
