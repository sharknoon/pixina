FROM nginx
RUN pwd
RUN ls
COPY * /usr/share/nginx/html/
