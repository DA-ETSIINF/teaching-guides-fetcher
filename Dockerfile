FROM node:20.13.1

WORKDIR /srv

COPY . .

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start" ]