# safehouse-main-front
Main frontend for safehouse


# to start the servers:


npm run start:mock-server

npm start

# Docker

docker build -t safehouse-front .

docker run --name safehouse-front-container -p 3000:3000 safehouse-front

docker stop safehouse-front-container

docker rm safehouse-front-container
