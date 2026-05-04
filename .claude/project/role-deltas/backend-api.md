# Role Delta: backend-api — AI Risk Platform

Overrides for the `backend-api` agent specific to this project. These take priority over stack defaults.

## Auth

- Default auth class: project's custom auth (check `config/settings.py` `REST_FRAMEWORK.DEFAULT_AUTHENTICATION_CLASSES`).
- Public endpoints require a comment: `# Public — no auth required because: [reason]`.

## App boundaries

- New endpoints belong in their domain app (`rules/`, `cases/`, etc.) — not in a generic `api/` app.
- Cross-app data access goes through the service layer — never import models from another app directly in a view.

## Audit requirement

- Any view that creates, updates, or deletes a risk-sensitive record MUST trigger an audit log write via the `audit` app service.
- This is non-optional. A view that skips the audit write is not done.

## Serializer conventions

- Risk scores and flag results are read-only — never accept them as input.
- Merchant hierarchy fields (portfolio, iso_office, agent) must be resolved server-side, not accepted from client.
