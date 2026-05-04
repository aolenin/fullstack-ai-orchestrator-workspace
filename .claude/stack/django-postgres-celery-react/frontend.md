# Frontend Standards — React + TypeScript + Vite

## Stack

- React 18, TypeScript 5, Vite.
- State: project's chosen library (check `package.json` before adding one).
- Styling: project's chosen approach (check existing components first).
- API client: project's existing fetch/axios wrapper — do not create a new one.

## Conventions

- Components: `PascalCase` filenames, one component per file.
- Hooks: `use` prefix, in `hooks/` directory.
- API clients: in `api/` or `services/` directory — not in components.
- Types: in `types/` or co-located with the module they belong to.
- No `any` without a comment explaining why.

## Async patterns

- Every async operation has loading, success, and error states.
- Use `AbortController` for cancellable requests.
- Do not store sensitive data (tokens, PII) in `localStorage` without encryption.
- Use `httpOnly` cookies for auth tokens when possible.

## Testing

- Unit tests for hooks and utility functions.
- Integration tests for key user flows using the project's test framework.
- Do not test implementation details — test behavior.

## Build

- `vite build` for production. Check `vite.config.ts` before modifying build config.
- Environment variables via `VITE_` prefix in `.env.example`.
- No secrets in frontend build artifacts.
