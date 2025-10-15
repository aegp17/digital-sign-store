# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/shared-types/package*.json ./packages/shared-types/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY packages/shared-types ./packages/shared-types
COPY apps/api ./apps/api

# Build shared types
WORKDIR /app/packages/shared-types
RUN npm run build

# Build API
WORKDIR /app/apps/api
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/package*.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership
RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 8080

CMD ["node", "dist/main.js"]
