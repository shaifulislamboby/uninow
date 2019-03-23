FROM node:10-alpine

RUN mkdir -p /var/app

WORKDIR /var/app

ADD package.json .

RUN npm install --production && npm cache clean -f

ADD . /var/app

# expose port 8080
EXPOSE 8080

CMD npm run start

