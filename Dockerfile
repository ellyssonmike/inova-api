FROM node:22-slim AS environment
RUN apt-get update && apt-get install -y --no-install-recommends
RUN npm install -g @nestjs/cli

FROM environment AS builder
WORKDIR /app
COPY package*.json tsconfig.json tsconfig.paths.json tsconfig.build.json nest-cli.json ./
RUN npm ci

COPY src ./src
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json /app/nest-cli.json ./
RUN npm ci --only=production

CMD ["node", "dist/main.js"]