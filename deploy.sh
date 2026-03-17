#!/bin/bash
# Install PM2 Globally
sudo npm install -g pm2

# Install local dependencies
npm install

# Start the application as a background daemon
pm2 start app.js --name "inventory-os"

# Configure PM2 to start on system boot
pm2 save
pm2 startup | tail -n 1 | bash

echo "✅ Deployment Successful"
