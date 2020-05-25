FROM nginx
RUN ls
COPY dist /usr/share/nginx/html
