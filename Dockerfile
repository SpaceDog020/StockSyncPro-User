FROM node:20.10.0

WORKDIR /usr/src/app

COPY ["package.json","package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 5003

CMD ["npm", "run", "start:dev"]