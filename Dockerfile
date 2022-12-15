FROM node:latest

LABEL author="EL HUSSEIN BELAIFA"

ENV PORT=3000

COPY . /var/www

WORKDIR /var/www

VOLUME ["/var/www"]

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node","app"]