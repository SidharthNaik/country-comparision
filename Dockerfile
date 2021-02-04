FROM node:12

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV=dev

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i

# Bundle app source
COPY . .

CMD [ "node", "./src/server.js" ]