# Deployment Instructions

## Overview
This document provides step-by-step instructions to deploy the Best Buy Cloud-Native Application to Azure Kubernetes Service (AKS).

---

## Prerequisites

Make sure you have the following installed:

- Azure CLI
- Docker
- kubectl
- Git
- Access to an Azure subscription
- AKS cluster already created

---

## Step 1: Login to Azure

```bash
az login
```

---

## Step 2: Connect to AKS Cluster

```bash
az aks get-credentials --resource-group <your-resource-group> --name <your-cluster-name>
```

Verify connection:

```bash
kubectl get nodes
```

---

## Step 3: Deploy MongoDB (StatefulSet)

```bash
kubectl apply -f deployment-files/mongodb/
```

Check pods:

```bash
kubectl get pods
```

---

## Step 4: Deploy Application Services

```bash
kubectl apply -f deployment-files/
```

---

## Step 5: Verify Deployment

```bash
kubectl get pods
kubectl get services
```

Optional:

```bash
kubectl get ingress
```

---

## Step 6: Access the Application

Use the external IP from:

```bash
kubectl get services
```

or Ingress URL (if configured).

---

## Step 7: Update Application (CI/CD)

Each microservice is deployed using GitHub Actions:

1. Push code changes to GitHub
2. Pipeline builds Docker image
3. Image is pushed to Docker Hub
4. Kubernetes deployment is updated automatically

---

## Troubleshooting

Check logs:

```bash
kubectl logs <pod-name>
```

Describe resources:

```bash
kubectl describe pod <pod-name>
```

Restart deployment:

```bash
kubectl rollout restart deployment <deployment-name>
```

---

## Notes

- Ensure all environment variables are correctly configured using ConfigMaps and Secrets
- MongoDB uses persistent storage via PersistentVolumeClaims
- This deployment is designed for demonstration purposes

---

## Author

Diniz Rodrigues

