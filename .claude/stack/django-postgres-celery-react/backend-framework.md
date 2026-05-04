# Backend Framework Standards — Django + DRF

## Django conventions

- Apps are the unit of domain separation. One domain = one app.
- `models.py` for data shape. `services/` for business logic. `views.py` for HTTP concerns. `serializers.py` for I/O contracts. `urls.py` for routing.
- Settings split by environment (`base.py`, `local.py`, `production.py`) or via env vars.
- Use `django-environ` or equivalent for env var loading.
- Never use `django.conf.settings` directly in domain logic — wrap in a settings helper.
- `AUTH_USER_MODEL` must be set to a custom user model from project start.

## DRF conventions

- Use generic views and ViewSets by default (see `backend-api` agent for hierarchy).
- Register ViewSets with `DefaultRouter`.
- Use `drf-spectacular` for OpenAPI/Swagger generation — annotate with `@extend_schema`.
- Pagination: always set a default pagination class in `REST_FRAMEWORK` settings.
- Throttling: configure per-view or globally — never leave public endpoints unthrottled.
- Versioning: use URL versioning (`/api/v1/`) if the API is externally consumed.

## Testing

- Use Django's built-in test runner or pytest-django.
- Use `APIClient` for endpoint tests.
- Use `factory-boy` for model creation in tests.
- Use `freezegun` for time-dependent logic.
- Tests live in `<app>/tests/` — one file per view/serializer/service module.
