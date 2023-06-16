FROM node:18.16.0

COPY package.json /srv/package.json
COPY yarn.lock /srv/yarn.lock

WORKDIR /srv
RUN yarn install

COPY bin /srv/bin
COPY controllers /srv/controllers
COPY public /srv/public
COPY routes /srv/routes
COPY views /srv/views
COPY app.js /srv/app.js

EXPOSE 3000

CMD [ "yarn", "start" ]