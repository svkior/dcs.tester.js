#!/bin/sh

echo Hello, World!
while [ 1 ]
do
sync
git pull
UBOOTVERSION=`git log -n 1 --pretty=format:'%aD, Hash: %h'`
echo '{' >config.json
echo "\"ubootVersion\":\"$UBOOTVERSION\"" >>config.json
echo "}" >>config.json
mkdir -p ./working
vertx run server_uboot.js -cp lib/jssc.jar:lib/mysql-connector-java-5.1.28.jar:lib/grmech.jar:lib/groovy-all-2.2.0.jar:lib/commons-net-2.0.jar:lib/jsch-0.1.50.jar:lib/jsh-connector-1.0.jar -conf config.json
echo You have a chance to press Ctrl + C
echo 1
sleep 1
echo 2 
sleep 1
echo 3
echo restarting...
done
