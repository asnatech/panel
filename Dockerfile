
# ------------------------------------------- Builder

FROM node:26.3.1-alpine3.23 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV VITE_API_BASE_URL=https://api.fobex.ir
RUN npm run build

# ------------------------------------------- Runtime

FROM nginx:1.31.2-alpine3.23-slim AS runtime
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
