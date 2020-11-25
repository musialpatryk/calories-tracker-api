# docker build -t pm/backend:1.0 .
FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV PORT=8080
EXPOSE 8080

CMD [ "npm", "start" ]
