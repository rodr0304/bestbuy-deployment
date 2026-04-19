# 🛒 Best Buy Cloud-Native Application

## 📌 Overview

This project demonstrates the design and implementation of a
cloud-native microservices-based application inspired by a Best Buy
retail system.

The application was developed using modern DevOps practices, including
containerization with Docker and CI/CD automation with GitHub Actions.

The system is composed of independent services that communicate through
REST APIs and are designed to be deployed in a Kubernetes environment.

------------------------------------------------------------------------

## 🏗️ System Architecture

The application follows a microservices architecture pattern with the
following components:

### Microservices

-   Store-Front (Customer-facing web application)
-   Store-Admin (Admin interface for managing operations)
-   Product-Service (Manages product catalog)
-   Order-Service (Handles order creation)
-   Makeline-Service (Processes pending orders)
-   MongoDB (Database)

------------------------------------------------------------------------

## 📊 Architecture Diagram

    [ Store-Front ] ---> [ Order-Service ] ---> [ Makeline-Service ]
            |                      |
            v                      v
    [ Store-Admin ] ---> [ Product-Service ]
                             |
                             v
                         [ MongoDB ]

------------------------------------------------------------------------

## ⚙️ Technologies Used

-   Node.js
-   Express.js
-   Docker
-   Docker Hub
-   GitHub Actions
-   MongoDB
-   Kubernetes

------------------------------------------------------------------------

## 🚀 CI/CD Pipeline

Each microservice includes a GitHub Actions workflow that: - Builds
Docker images - Pushes them to Docker Hub - Runs automatically on push

------------------------------------------------------------------------

## 🐳 Docker Images

-   https://hub.docker.com/r/rodr0304/store-front
-   https://hub.docker.com/r/rodr0304/store-admin
-   https://hub.docker.com/r/rodr0304/product-service
-   https://hub.docker.com/r/rodr0304/order-service
-   https://hub.docker.com/r/rodr0304/makeline-service

------------------------------------------------------------------------

## 📦 Project Structure

bestbuy-deployment/ - store-front/ - store-admin/ - product-service/ -
order-service/ - makeline-service/ - deployment-files/ - README.md

------------------------------------------------------------------------

## 💻 Running Locally

``` bash
cd store-front
npm install
PORT=3001 node server.js
```

Open: http://localhost:3001

------------------------------------------------------------------------

## ☸️ Kubernetes Deployment

``` bash
kubectl apply -f deployment-files/
```

------------------------------------------------------------------------

## 🎥 Demo Video

https://youtu.be/djBXzP_m0XM

------------------------------------------------------------------------

## 👨‍💻 Author

Diniz Martins
