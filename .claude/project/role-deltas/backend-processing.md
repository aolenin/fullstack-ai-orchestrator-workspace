# Role Delta: backend-processing — AI Risk Platform

Overrides for the `backend-processing` agent specific to this project.

## Nightly run (05:00 Celery Beat)

Sequence: ingestion fetch → normalise → evaluate_accounts → CRITICAL flags → mainframe hold → notification_dispatch → audit log → 07:30 morning briefing.

Each step is a separate idempotent Celery task. A failure in one step must not silently skip downstream steps — use chords with error callbacks.

## Task naming convention

`<app>.<verb>_<noun>` e.g. `rules.evaluate_account`, `mainframe.apply_hold`, `notifications.dispatch_hold_alert`.

## Audit writes in tasks

Any task that applies or releases a hold, changes a risk score, or modifies compliance state MUST write an audit log entry before returning. Audit write failure is a hard error — do not swallow it.

## False-positive self-correction flow

`release_hold` → `recalibrate_threshold` → `annotate_merchant` → `write_audit_entry` → `feed_training_dataset`

These must run as a linked sequence (chain or chord), not independently.

## Real-time evaluation

HTTP ingest → `evaluate_transaction` task → `RuleResult` emit → if CRITICAL: hold path; if HIGH/MEDIUM: case queue path. The task must complete within 500ms P95.
