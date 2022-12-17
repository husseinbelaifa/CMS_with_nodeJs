#FROM node:latest

FROM node:16.15.1-alpine3.16

LABEL author="EL HUSSEIN BELAIFA"

ENV PORT=3000

ENV MONGODB_URL="mongodb://mongo:27017/cms"

COPY . /var/www

WORKDIR /var/www

VOLUME ["/var/www"]

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node","app.js"]
