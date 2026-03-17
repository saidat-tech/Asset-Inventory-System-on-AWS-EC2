#!/bin/bash
BACKUP_DIR="/home/ec2-user/backups"
mkdir -p $BACKUP_DIR
# Pull data from the local API
curl -s http://localhost:3000/api/inventory > "$BACKUP_DIR/inv_$(date +%F).json"
# Retention Policy: Delete backups older than 7 days
find $BACKUP_DIR -type f -mtime +7 -delete
