#!/usr/bin/env bash
set -euo pipefail
(cd backend && python manage.py check)
(cd web && npm run build)
kubectl apply --dry-run=client -k infra/k8s/base >/dev/null || true
