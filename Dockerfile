FROM node:18
WORKDIR /usr/src/cat-breed
COPY package.json .
RUN npm install
COPY . .