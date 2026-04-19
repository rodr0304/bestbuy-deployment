# Best Buy Cloud-Native Application

## Overview
This project is a cloud-native microservices-based application developed as part of the CST8915 Final Project. The application simulates a simplified Best Buy system using a modern architecture deployed on Azure Kubernetes Service (AKS).

The system consists of multiple microservices, frontend applications, and a MongoDB database, all containerized and deployed using Kubernetes.

---

## Architecture

The application is composed of the following components:

- Store-Front: Customer-facing web application
- Store-Admin: Employee/admin web application
- Product-Service: Manages product data
- Order-Service: Handles order processing
- Makeline-Service: Background worker for order fulfillment
- MongoDB: Stateful database

---

## Technologies Used

- Docker
- Kubernetes (AKS)
- MongoDB
- Node.js (Microservices)
- GitHub Actions (CI/CD)
- Azure CLI

---

## Deployment Instructions

### Prerequisites

- Azure CLI installed
- Docker installed
- kubectl installed
- Access to an AKS cluster

### Steps

1. Clone the repository:
git clone https://github.com/rodr0304/CST8915/FinalProject/bestbuy-deployment.git

2. Connect to your AKS cluster:
az login
az aks get-credentials --resource-group <your-rg> --name <your-cluster>

3. Deploy MongoDB:
kubectl apply -f deployment-files/mongodb/

4. Deploy microservices:
kubectl apply -f deployment-files/

5. Verify deployments:
kubectl get pods
kubectl get services

---

## CI/CD Pipeline

Each microservice has its own GitHub repository with a CI/CD pipeline configured using GitHub Actions.

Pipeline steps:
- Build Docker image
- Push to Docker Hub
- Deploy to AKS cluster

---

## Repositories and Docker Images

| Service            | Repository Link | Docker Image |
|-------------------|----------------|--------------|
| Store-Front       | Link           | yourdockerhub/store-front |
| Store-Admin       | Link           | yourdockerhub/store-admin |
| Product-Service   | Link           | yourdockerhub/product-service |
| Order-Service     | Link           | yourdockerhub/order-service |
| Makeline-Service  | Link           | yourdockerhub/makeline-service |

---

## Kubernetes Configuration

All Kubernetes manifests are located in:
deployment-files/

---

## Demo Video

---YouTube link---

---

## Author

Diniz Rodrigues
Algonquin College
