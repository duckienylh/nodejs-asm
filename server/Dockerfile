FROM node:20.11.1 AS srv-development
WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY jsconfig.json ./
EXPOSE 4000
CMD npm start
