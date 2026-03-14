# Asset-Inventory-System-on-AWS-EC2
# Executive Summary
This project demonstrates the deployment and operational management of a cloud-hosted asset inventory system on AWS EC2. It showcases the full lifecycle of building, deploying, and maintaining a production-style application using modern cloud and DevOps practices.

This application - InventoryOS, is designed as an internal infrastructure tracking tool that allows teams to manage and monitor IT assets efficiently.

Beyond application development, the project focuses on reliability, implementing process management with PM2 and automated disaster recovery through Cron-based backups. This approach shows real-world operational environments where system uptime, resilience, and data protection are critical.

# Architectural Overview

The system follows a Monolithic Application Architecture, where the backend service handles both API operations and frontend asset delivery.

## Core Components

- **Runtime:** Node.js (V8)

- **Backend:** Express.js REST API

- **Frontend:** React 18 Single Page Application

- **Styling:** Custom CSS3 (Obsidian/DevOps Dark Mode)

- **Process Management:** PM2 (Daemonization & Resilience)

- **Cloud Infrastructure:** AWS EC2 Service

- **Automation:** Cron jobs for scheduled backups

The Express.js backend acts as both the API provider and the static file server for the React frontend, allowing the entire system to run as a unified appliance on a single EC2 instance.

# Provisioning on CLoud to Implement both Backend and Frontend

## 1. Cloud Infrastructure: 

The application is deployed on AWS EC2, where the server environment is provisioned and configured for application hosting.

## Key Infrastructure Configuration

- **Instance Type:** t3.micro (Free Tier)

- **Operating System:** Amazon Linux 2023 / Ubuntu 22.04 LTS

- **Security Configuration:**

SSH (Port 22) restricted to trusted IP addresses

Custom application port exposed for web access - Port 3000 (Custom TCP)

## Instance Launch

[EC2](img width="730" height="353" alt="Image" src="https://github.com/user-attachments/assets/0a5b1255-45df-4971-af5e-c5f52d272252" /)

## Environment Preparation


Connect via SSH and install the Node.js runtime from below website, ensure to select linux as shown below https://nodejs.org/en/download
The environment is prepared by installing the Node.js runtime, enabling the system to execute the backend application and serve frontend assets.


















