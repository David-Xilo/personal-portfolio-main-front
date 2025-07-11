FROM node:21.1.0-bookworm AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN if [ "$NODE_ENV" = "development" ] ; then npm run build:development ; else npm run build ; fi

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config for SPA routing
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
