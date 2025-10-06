# Use Node.js 20 Alpine as base image
FROM node:20-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm@10.17.1

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build stage for production
FROM base AS build

# Build the Vite frontend
RUN pnpm run build

# Production stage
FROM node:20-alpine AS production

# Install pnpm globally
RUN npm install -g pnpm@10.17.1

# Create app directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/public ./public
COPY --from=build /app/types ./types
COPY --from=build /app/tsconfig.json ./tsconfig.json

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
