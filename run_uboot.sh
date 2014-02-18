#!/bin/sh
sync
vertx run server_uboot.js -cp lib/jssc.jar:lib/mysql-connector-java-5.1.28.jar
