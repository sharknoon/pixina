FROM node:21-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:21-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/.output /app
EXPOSE 3000
CMD [ "node", "/app/server/index.mjs" ]