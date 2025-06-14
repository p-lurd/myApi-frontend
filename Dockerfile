FROM node:23.11-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:23.11-slim

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 8080

ENV PORT=8080

CMD ["serve", "-s", "dist", "-l", "8080"]







# FROM node:23.11-slim AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# FROM nginx:alpine

# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 8080

# # CMD ["nginx", "-g", "daemon off;"]
# CMD ["serve", "-s", "dist", "-l", "8080", "-H", "0.0.0.0"]