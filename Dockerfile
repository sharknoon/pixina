FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
COPY .npmrc /root/.npmrc
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
