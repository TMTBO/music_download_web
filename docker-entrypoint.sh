#!/bin/sh
SERVER_IP=${SERVER_IP:-127.0.0.1}
SERVER_PORT=${SERVER_PORT:-5055}
echo "========== 服务启动中 =========="
echo "SERVER_IP: $SERVER_IP"
echo "SERVER_PORT: $SERVER_PORT"
sed -i "s/__SERVER_IP__/$SERVER_IP/g" /usr/share/nginx/html/index.html
sed -i "s/__SERVER_PORT__/$SERVER_PORT/g" /usr/share/nginx/html/index.html
echo "========== 服务已启动 =========="
exec "$@"