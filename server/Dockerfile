#  Dockerfile for Node Express Backend api (development)

FROM node:12

# ARG NODE_ENV=development

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --allow-root
#npm ci --unsafe-perm=true

# install nodemon environment
RUN npm install -g nodemon

# Copy app source code
COPY . .

# Exports
EXPOSE 8080

CMD ["npm","start"]
