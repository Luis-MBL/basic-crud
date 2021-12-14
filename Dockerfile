FROM node:14

WORKDIR /usr/app

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 3020

CMD yarn typeorm migration:run && yarn start