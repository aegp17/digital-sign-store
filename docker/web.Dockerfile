# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/shared-types/package*.json ./packages/shared-types/

# Install dependencies
RUN npm ci

# Copy source code
COPY packages/shared-types ./packages/shared-types
COPY apps/web ./apps/web

# Build shared types
WORKDIR /app/packages/shared-types
RUN npm run build

# Build web app
WORKDIR /app/apps/web
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built assets
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
