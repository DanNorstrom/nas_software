
# stage 1: build react client
FROM node:12

# Working directory be app
WORKDIR /usr/src/app

# Install dependencies in /usr/app/node_modules
COPY package.json /usr/src/app/

RUN npm install 
#--allow-root

# install nodemon environment
# RUN npm install -g nodemon

# copy local files to app folder
COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]
