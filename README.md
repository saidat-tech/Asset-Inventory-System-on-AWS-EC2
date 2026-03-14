# Asset-Inventory-System-on-AWS-EC2
# Executive Summary
This project demonstrates the deployment and operational management of a cloud-hosted asset inventory system on AWS EC2. It showcases the full lifecycle of building, deploying, and maintaining a production-style application using modern cloud and DevOps practices.

This application - InventoryOS, is designed as an internal infrastructure tracking tool that allows teams to manage and monitor IT assets efficiently.

Beyond application development, the project focuses on reliability, implementing process management with PM2 and automated disaster recovery through Cron-based backups. This approach shows real-world operational environments where system uptime, resilience, and data protection are critical.

# Architectural Overview

The system follows a Monolithic Application Architecture, where the backend service handles both API operations and frontend asset delivery.

## Core Components

- **Runtime:** Node.js (V8 Engine)

- **Backend:** Express.js REST API

- **Frontend:** React 18 Single Page Application

- **Styling:** Custom CSS (DevOps Dark Mode theme)

- **Process Management:** PM2 for application daemonization and resilience

- **Cloud Infrastructure:** AWS EC2

- **Automation:** Cron jobs for scheduled backups

The Express.js backend acts as both the API provider and the static file server for the React frontend, allowing the entire system to run as a unified appliance on a single EC2 instance.
