# Deployment

## Kubernetes dry run

```bash
kubectl apply --dry-run=client -k infra/k8s/base
```

## ArgoCD

Update repoURL in `infra/argocd/app-dev.yaml`, then:

```bash
kubectl apply -f infra/argocd/appproject.yaml
kubectl apply -f infra/argocd/app-dev.yaml
```

Replace `secret.example.yaml` with a real secret management approach before production.
