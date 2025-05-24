# ---------- Base ----------
FROM node:22-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# ---------- Dependencies ----------
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock* ./
RUN corepack enable && yarn install --frozen-lockfile

# ---------- Build ----------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# ---------- Production Runner ----------
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/drizzle ./drizzle

# Install only prod deps
RUN yarn install --prod

CMD ["node", "server.js"]
