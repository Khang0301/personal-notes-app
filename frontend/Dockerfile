# --- Stage 1: build the static assets with Vite ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Vite bakes VITE_* env vars into the JS bundle at build time (not runtime),
# so it must be passed in as a build arg from docker-compose.yml.
ARG VITE_API_URL=http://localhost:8080/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# --- Stage 2: serve the built files with Nginx ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
