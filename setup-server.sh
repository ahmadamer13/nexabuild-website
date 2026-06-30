#!/usr/bin/env bash
# ============================================================
#  NexaBuild — ONE-TIME server setup
#  Run this ONCE before the first deploy.sh
#  Usage: bash setup-server.sh
# ============================================================
set -e

SERVER_IP="172.245.138.214"
SERVER_USER="root"

echo "🔧 Setting up NexaBuild on server..."

ssh -o StrictHostKeyChecking=no "${SERVER_USER}@${SERVER_IP}" << 'REMOTE'
set -e

# Create app directory
mkdir -p /var/www/nexabuild

# Write .env.local — UPDATE the Formspree ID before running!
cat > /var/www/nexabuild/.env.local << 'ENV'
NEXT_PUBLIC_FORMSPREE_ID=YOUR_FORMSPREE_ID_HERE
PORT=3002
ENV

# Write Nginx config
cat > /etc/nginx/sites-available/nexabuild << 'NGINX'
server {
    listen 80;
    server_name nexabuild.cloud www.nexabuild.cloud;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

# Enable the site
ln -sf /etc/nginx/sites-available/nexabuild /etc/nginx/sites-enabled/nexabuild
nginx -t && systemctl reload nginx

echo "✅ Server setup done!"
echo ""
echo "Next steps:"
echo "  1. Edit /var/www/nexabuild/.env.local — set your real Formspree ID"
echo "  2. Run: bash deploy.sh  (from your Mac)"
echo "  3. Run SSL: certbot --nginx -d nexabuild.cloud -d www.nexabuild.cloud"
REMOTE
