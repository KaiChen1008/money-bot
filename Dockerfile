FROM node:14.17.6-alpine3.12

WORKDIR /app

COPY ./bot/ /app

RUN npm install -y

CMD ["npm", "run", "dev"]
