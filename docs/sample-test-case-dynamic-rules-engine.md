# Sample Test Case — Dynamic Rules Engine Flags 1-4

Implement and validate these initial critical flags:

1. Duplicate BIN — same BIN > 3x in 10 minutes
2. Auth/Capture Gap — >72h gap or >15% variance
3. Duplicate Auths — same amount/card >2x/hour
4. High Velocity — >200% of 30-day average in 24h

## Acceptance

- API exposes catalog and evaluation endpoints.
- Results include code, name, severity, triggered and reason.
- Backend tests cover trigger boundaries.
- UI can run demo payload and show results.
- Audit plan is documented before production use.
