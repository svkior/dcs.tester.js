#!/bin/sh

while [ 1 ]
do
sync
git pull
vertx run server_uboot.js -cp lib/jssc.jar:lib/mysql-connector-java-5.1.28.jar:lib/grmech.jar:lib/groovy-all-2.2.0.jar:lib/commons-net-2.0.jar
echo You have a chance to press Ctrl + C
echo 1
sleep 1
echo 2 
sleep 1
echo 3
echo restarting...
done