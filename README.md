# Azure Pipelines Demo — Multi-Stage CI/CD to AKS

A reference multi-stage Azure Pipelines setup for building, testing, containerizing,
and deploying a sample app to Azure Kubernetes Service (AKS), with environment
gates and reusable pipeline templates.

## What this demonstrates

- Multi-stage YAML pipelines (`Build` → `Test` → `Docker Build/Push` → `Deploy`)
- Reusable pipeline templates under `templates/` (build, docker, deploy)
- Environment-based deployment with approval gates (`dev` → `staging` → `prod`)
- Container image build/push to Azure Container Registry (ACR)
- Helm-based deployment to AKS
- Minimal Terraform under `infra/` for the ACR + AKS backing resources

## Layout

```
azure-pipelines.yml        # entry pipeline, wires stages + templates together
templates/
  build-test.yml           # restore, build, unit test, publish test results
  docker-build-push.yml     # build image, push to ACR, tag with build ID
  deploy-aks.yml            # helm upgrade --install against the target env
app/                        # sample Node.js service + Dockerfile + unit test
infra/                       # Terraform for ACR + AKS (reference only)
```

## Pipeline flow

1. **Build & Test** — restore deps, run unit tests, publish results/coverage.
2. **Docker Build & Push** — build the image, tag with `$(Build.BuildId)`, push to ACR.
3. **Deploy: dev** — auto-deploy to the `dev` AKS namespace on every `main` build.
4. **Deploy: staging** — requires the `dev` stage to succeed.
5. **Deploy: prod** — gated behind an Azure DevOps environment approval check.

## Variables / service connections expected

| Name | Purpose |
|---|---|
| `acrServiceConnection` | ARM service connection with push rights to ACR |
| `aksServiceConnection` | ARM service connection with access to the AKS cluster |
| `acrName` | Azure Container Registry name |
| `imageRepository` | Repository name within the ACR |
