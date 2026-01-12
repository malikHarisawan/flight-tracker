# Stage 1: Build the application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run the application
FROM node:22-alpine AS runner

WORKDIR /app

# Copy package files
COPY --from=builder /app/package*.json ./

# Install ONLY production dependencies
RUN npm ci --production

# Copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
