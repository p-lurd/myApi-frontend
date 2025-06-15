FROM node:23.11-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Add build arguments
ARG VITE_API_URL
ARG VITE_SUPPORT_EMAIL
ARG VITE_FRONTEND_URL

# Debug: Print the ARG values during build
RUN echo "========== BUILD-TIME DEBUG =========="
RUN echo "VITE_API_URL ARG: '$VITE_API_URL'"
RUN echo "VITE_SUPPORT_EMAIL ARG: '$VITE_SUPPORT_EMAIL'"
RUN echo "VITE_FRONTEND_URL ARG: '$VITE_FRONTEND_URL'"

# Set environment variables
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SUPPORT_EMAIL=$VITE_SUPPORT_EMAIL
ENV VITE_FRONTEND_URL=$VITE_FRONTEND_URL

# Debug: Print the ENV values
RUN echo "VITE_API_URL ENV: '$VITE_API_URL'"
RUN echo "VITE_SUPPORT_EMAIL ENV: '$VITE_SUPPORT_EMAIL'"
RUN echo "VITE_FRONTEND_URL ENV: '$VITE_FRONTEND_URL'"
RUN echo "======================================"


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