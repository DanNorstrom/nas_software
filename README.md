# Docker + Node.js

# Run all containers
docker-compose up

# restart containers during dev
docker-compose up --force-recreate --build -d
docker image prune -f
docker-compose down -v

# build
docker build -t <user>/nasapp:0.1 .

# run container:port8080 on pc:port5000 using image
docker run -p 5000:8080 <image-id>


# extras

# kill background nodes
taskkill -F -IM node.exe
