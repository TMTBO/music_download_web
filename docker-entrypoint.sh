#!/bin/sh
SERVER_IP=${SERVER_IP:-127.0.0.1}
SERVER_PORT=${SERVER_PORT:-5050}
echo "========== 服务启动中 =========="
echo "SERVER_IP: $SERVER_IP"
echo "SERVER_PORT: $SERVER_PORT"
sed -i "s|__SERVER_IP__|$SERVER_IP|g" /etc/nginx/conf.d/nginx.conf
sed -i "s|__SERVER_PORT__|$SERVER_PORT|g" /etc/nginx/conf.d/nginx.conf
echo "========== 服务已启动 =========="
exec "$@"