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

## Steps to Launch an Instance 

- **Login to AWS Console. Type EC2 in the search bar. Click on EC2.**

<img width="726" height="358" alt="Image" src="https://github.com/user-attachments/assets/ccc613bc-5bcd-4830-b8ca-56cdc88c381b" />

- **Then click on Launch instance.**


<img width="930" height="756" alt="Image" src="https://github.com/user-attachments/assets/1522e08b-fd45-4bd5-bfa3-a981b5c2bf8b" />

- **Name the Server and select a Machine image**


<img width="749" height="617" alt="Image" src="https://github.com/user-attachments/assets/f6b4228d-e36a-4616-9b09-e06d2b8e03c6" /> 

- **Select your ***Instance type*** and create a new keypair**

<img width="782" height="378" alt="Image" src="https://github.com/user-attachments/assets/6e433829-0688-4efa-8db9-1fcf683b2151" /> 


<img width="603" height="597" alt="Image" src="https://github.com/user-attachments/assets/7d70082a-58a3-45f2-a330-d06066fe92ad" />



<img width="689" height="528" alt="Image" src="https://github.com/user-attachments/assets/31adaa70-46ea-48e9-89d2-d3325f85f6a8" />


- **Scroll down and click on** ***"Launch istance"*** **and then click on** ***"View all instance".***



<img width="860" height="666" alt="Image" src="https://github.com/user-attachments/assets/fda5a314-d15b-43ac-a025-bbce077577c5" />


<img width="891" height="466" alt="Image" src="https://github.com/user-attachments/assets/d8154a19-d72c-419c-ac12-9906a8e7061f" />

<img width="1205" height="318" alt="Image" src="https://github.com/user-attachments/assets/c32273a3-1489-4787-82e7-bcbdf4af2795" />


<img width="1346" height="327" alt="Image" src="https://github.com/user-attachments/assets/1d88b75c-2a4e-4b82-b73a-b19f29927105" />


<img width="1353" height="223" alt="Image" src="https://github.com/user-attachments/assets/caf1ccc9-8462-4dd1-bfeb-6d24f0c09e8c" />


## Environment Preparation


Connect via SSH and install the Node.js runtime from below website, ensure to select linux as shown below https://nodejs.org/en/download
The environment is prepared by installing the Node.js runtime, enabling the system to execute the backend application and serve frontend assets.


















