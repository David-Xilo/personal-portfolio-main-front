FROM node:21.1.0-bookworm AS build

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN if [ "$NODE_ENV" = "development" ] ; then npm run build:development NODE_ENV=${NODE_ENV} REACT_APP_API_URL=${REACT_APP_API_URL} ; else npm run build NODE_ENV=${NODE_ENV} REACT_APP_API_URL=${REACT_APP_API_URL} ; fi

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
