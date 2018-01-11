sudo service docker start
docker kill $(docker ps -aq)
docker rm $(docker ps -aq)
docker build -t ppa:latest ./
docker run --name ppa -d -t -p 27017:27017 ppa
