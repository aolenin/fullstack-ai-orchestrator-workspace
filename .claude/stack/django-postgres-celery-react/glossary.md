# Glossary

Domain and technical terms used across this stack.

## Architecture terms

| Term | Definition |
|---|---|
| **Service layer** | Python modules in `services/` that contain business logic. Called by views, tasks, and management commands. Never called across app boundaries directly. |
| **App** | A Django application — a domain unit with its own models, views, services, and tests. |
| **Task** | A Celery unit of work. Entry point only — delegates to service layer. |
| **Beat** | Celery Beat — the periodic task scheduler. Defines what runs and when. |
| **ViewSet** | DRF class that groups related endpoint handlers. Registered with a Router. |
| **Generic view** | DRF base class that handles common CRUD patterns automatically. |
| **Guardrail profile** | A cross-cutting rule set applied to a domain of work (schema, security, etc.). |
| **L0/L1/L2/L3** | Task classification levels. See `routing-policy.md`. |
| **Fast lane** | L0 task flow — single agent, no review. |
| **Workflow gate** | Mandatory checkpoint before agent delegation. |
| **Source of truth** | The highest-priority file for a given type of rule. See `source-of-truth-pattern.md`. |
| **Plan-first area** | A domain where design must precede implementation (migrations, auth, Celery, integrations). |

## Domain terms (AI Risk Platform)

| Term | Definition |
|---|---|
| **Detection flag** | A rule that identifies suspicious transaction behavior (17 total across 3 phases). |
| **Hierarchy** | Portfolio → MCC → ISO Office → Agent → Merchant — the override resolution chain. |
| **Hold** | A mainframe action that blocks a merchant account. |
| **False positive** | A hold incorrectly applied. Triggers self-correction flow. |
| **VAMP / VIRP** | Visa compliance programs tracked by the compliance app. |
| **ECP / ECM** | Mastercard compliance programs. |
| **BRAM / QMAP** | Mastercard risk programs. |
| **RDR / CDRN / Ethoca** | Cross-network dispute resolution programs. |
| **Nightly run** | Celery Beat job at 05:00 that evaluates all active accounts. |
