# Security Notes

- Do not commit real secrets.
- Replace example Kubernetes Secret with External Secrets, Sealed Secrets, SOPS or cloud secret manager.
- Add audit logging before automated financial holds/releases.
- Add RBAC and object-level permissions before partner portal features.
- Treat transaction and merchant data as sensitive.
