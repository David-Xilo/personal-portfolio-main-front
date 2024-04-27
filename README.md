# safehouse-main-front
Main frontend for safehouse


# to start the servers:


npm run start:mock-server

npm start

# Docker

## start container

docker build -t safehouse-front .

docker run --name safehouse-front-container -p 3000:3000 -d safehouse-front

## stop container

docker stop safehouse-front-container

docker rm safehouse-front-container


## see logs

docker logs safehouse-front-container -f

## shell the container

docker exec -it safehouse-front-container /bin/bash
