# 使用官方 Node 镜像作为构建环境
FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 生产环境使用 nginx
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 5055
CMD ["nginx", "-g", "daemon off;"]