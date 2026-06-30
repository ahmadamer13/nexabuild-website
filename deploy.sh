#!/usr/bin/env bash
# ============================================================
#  NexaBuild — LOCAL deploy script
#  Site: nexabuild.cloud
#  Server: /var/www/nexabuild (port 3002)
#  Usage: bash deploy.sh
# ============================================================
set -e

SERVER_IP="172.245.138.214"
SERVER_USER="root"
APP_DIR="/var/www/nexabuild"

# ── 1. Rsync code to server ──────────────────────────
echo ""
echo "🚀 [1/2] Syncing code to server..."
rsync -az --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.env.local' \
  --exclude='logs' \
  . "${SERVER_USER}@${SERVER_IP}:${APP_DIR}/"
echo "   ✅ Code synced"

# ── 2. SSH into server and rebuild ───────────────────
echo ""
echo "🚀 [2/2] Building and restarting on server..."
ssh -o StrictHostKeyChecking=no "${SERVER_USER}@${SERVER_IP}" << 'REMOTE'
set -e
cd /var/www/nexabuild

echo "  → Installing dependencies..."
npm install

echo "  → Building Next.js app..."
npm run build

echo "  → Restarting PM2..."
pm2 restart nexabuild --update-env || pm2 start npm --name "nexabuild" -- start -- -p 3002
pm2 save

echo "  → Done!"
REMOTE

echo ""
echo "✅ Deployment complete!"
echo "   Site:     https://nexabuild.cloud"
echo "   PM2 logs: ssh root@172.245.138.214 'pm2 logs nexabuild'"
echo ""
