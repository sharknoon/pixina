FROM node:14 as build-stage
ARG FONTAWESOME_NPM_AUTH_TOKEN
WORKDIR /app
COPY package*.json ./
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" "${FONTAWESOME_NPM_AUTH_TOKEN}"
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
