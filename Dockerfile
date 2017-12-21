FROM mongo:latest

COPY dataset /dataset
RUN mongorestore -d pasta-pizza /dataset

EXPOSE 27017

CMD ["/usr/bin/mongod", "--config", "/etc/mongodb.conf"]
