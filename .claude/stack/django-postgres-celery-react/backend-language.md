# Backend Language Standards — Python

## Style

- Follow PEP 8. Enforce with flake8 or ruff.
- Max line length: 79 characters (or project's `.flake8` config — read it first).
- `snake_case` for modules, functions, variables.
- `PascalCase` for classes.
- `UPPER_SNAKE_CASE` for constants.
- Type hints where the surrounding code already uses them; enforce on new public interfaces.

## Patterns

- Prefer explicit over implicit.
- Prefer composition over inheritance for domain logic.
- Use dataclasses or Pydantic for structured data transfer between layers.
- Use `@dataclass(frozen=True)` for value objects.
- Avoid mutable default arguments.

## Exceptions

- Define custom exceptions per domain — never raise bare `Exception`.
- Catch the most specific exception type possible.
- Never silently swallow exceptions.
- Log before re-raising when the exception needs a trace.

## Imports

- Standard library → third-party → local, separated by blank lines.
- No wildcard imports (`from x import *`).
- No circular imports — if they appear, it signals a layer violation.

## Dependencies

- Managed via `requirements.txt` or `pyproject.toml` / `poetry.lock`.
- Pin to minor versions in production (`==X.Y.*` or `~=X.Y`).
- No new dependencies without explicit approval.
