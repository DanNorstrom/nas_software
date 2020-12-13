
# stage 1: build react client
FROM node:12

# Working directory be app
WORKDIR /usr/app

COPY package*.json ./

# Install dependencies in /usr/app/node_modules
RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
