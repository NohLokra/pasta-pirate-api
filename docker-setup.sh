#!/bin/bash

# Initialize a mongo data folder and logfile
mkdir -p /data/db
touch /var/log/mongodb.log
chmod 777 /var/log/mongodb.log

# Start mongodb with logging
# --logpath    Without this mongod will output all log information to the standard output.
# --logappend  Ensure mongod appends new entries to the end of the logfile. We create it first so that the below tail always finds something
mongod --logpath /var/log/mongodb.log --logappend --bind_ip 0.0.0.0 &

# Wait until mongo accepts connections on 27017
echo "En attente de MongoDB"

COUNTER=0
nc -z localhost 27017
while [[ $? -ne 0 && $COUNTER -lt 60 ]] ; do
    sleep 1
    let COUNTER+=1
    echo "$COUNTER"
    nc -z localhost 27017
done

echo "MongoDB Lancé"

# Restore from dump
mongorestore /db-backup

echo "Restauration OK"

tail -f /dev/null
