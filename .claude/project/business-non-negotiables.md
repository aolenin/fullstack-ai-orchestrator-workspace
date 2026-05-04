# Business Non-Negotiables

Rules derived from business and compliance requirements that cannot be traded off for convenience or speed.

## Audit trail

- Every risk decision (flag evaluation, hold apply, hold release) MUST write an audit log entry.
- Audit writes are not optional. A feature that skips the audit log is not done.
- Audit entries must be tamper-evident — do not allow update or delete on audit records.

## Compliance thresholds

- Internal thresholds are set 30–40% below official Visa/Mastercard limits to provide a safety margin.
- Threshold values must not be hardcoded — they belong in the configuration layer (Constance or DB-backed config).
- Exceeding a threshold must trigger an alert before the official limit is reached.

## Hold actions

- A merchant hold must be applied via the mainframe adapter (wc3270/Py3270) — not directly in the DB.
- A hold release must follow the false-positive self-correction flow: release → recalibrate → annotate → audit.
- No hold may be applied or released without a corresponding audit trail entry.

## Notification

- Every hold or release must dispatch notifications to: Merchant + ISO Office + Agent simultaneously.
- Notification delivery receipt must be written to the audit log.
- Notification failure must not block the hold/release action — decouple via async.

## Data integrity

- Financial balances and risk scores are the source of truth in PostgreSQL.
- Redis is cache/broker only — never the authoritative store for financial data.
- Hierarchy resolution (Portfolio → MCC → ISO Office → Agent → Merchant) must always use the most specific override.

## PII

- Merchant PII must not appear in application logs.
- PII must not be returned in error responses.
- PII fields in API responses require explicit permission checks.
