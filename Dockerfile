FROM mongo

RUN apt-get update
RUN apt-get install -y netcat

COPY dataset/ /db-backup
COPY docker-setup.sh /home/docker-setup.sh

RUN chmod 755 /home/docker-setup.sh
CMD /home/docker-setup.sh

EXPOSE 27017
