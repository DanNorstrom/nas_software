# Docker + Node.js

Dockerize a Node.js app. 

Watch the full [Docker video](https://youtu.be/gAkwW2tuIqE) on YouTube or read the [Docker Tutorial](https://fireship.io/lessons/docker-basics-tutorial-nodejs/) on Fireship.io. 








# build
docker build -t incendra/nasapp:0.1 .

# run container:port8080 on pc:port5000 using image
docker run -p 5000:8080 <image-id>

# Run all containers
docker-compose up



# restart containers during dev
docker-compose up --force-recreate --build -d
docker image prune -f
docker-compose down -v




# extras

# kill background nodes
taskkill -F -IM node.exe