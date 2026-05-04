# Role Delta: schema — AI Risk Platform

Overrides for the `schema` agent specific to this project.

## Hierarchy tables

Tables implementing the Portfolio → MCC → ISO Office → Agent → Merchant hierarchy are high-traffic and used in every rule evaluation. Any index or schema change on these tables requires explicit review and must be applied with `CREATE INDEX CONCURRENTLY`.

## Audit table

The `audit` app table is append-only. Schema changes must preserve this constraint:
- No UPDATE or DELETE permissions on audit rows.
- Any new column must be nullable or have a safe default (existing rows must not break).

## Rules tables

The `rules` app stores active rule definitions and thresholds. Threshold values must remain DB-configurable (not hardcoded). Schema changes here affect real-time evaluation performance.

## Sensitive fields

Fields containing PII (merchant name, contact info, tax ID) must be noted in the migration comment. Consider encryption at rest for PII fields per compliance requirements.
