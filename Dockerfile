FROM node:15.0.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src

EXPOSE 3000

CMD ["node", "src/server.js"]