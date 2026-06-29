# ------------------------------------------- Builder

FROM node:26.3.1-alpine3.23 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG API_BASE_URL
ENV VITE_API_BASE_URL=$API_BASE_URL

RUN npm run build

# ------------------------------------------- Runtime

FROM nginx:1.31.2-alpine3.23-slim AS runtime
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
