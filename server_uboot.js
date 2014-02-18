/*
var = Libc {
   lib: java.com.sun.jna.NativeLibrary.getInstance('c');
};

Libc.printf("Hello %s, from printf", "World")
*/

var console  = require('vertx/console');
console.log('Launching dcs_tester');

var container = require('vertx/container');
container.deployModule('io.vertx~mod-web-server~2.0.0-final', {
    port: 8080,
    host: "0.0.0.0",
    bridge: true,
    inbound_permitted: [
        { address: 'ubtests.list' },
        { address: 'ubtests.save' },
        { address: 'ubtests.delete' },
        { address: 'ubtests.find' },
        { address: 'ubtests.run'},
        { address: 'ubtests.getports'},
        { address: 'dataserver.login'},
        { address: 'dataserver.logout'},
        { address: 'dataserver.getservers'},
        { address: 'dataserver.getgroups'},
        { address: 'dataserver.getdriveparam'},
        { address: 'datasever.driveparameterupdate'},
        { address: 'ecs.go'},
        { address: 'ftp.update'},
        { address: 'ftp.load'}
    ]
});
container.deployModule("io.vertx~mod-mongo-persistor~2.0.0-final",{
    address: "ubtests.persistor",
    db_name: "ub_tests"
});

container.deployVerticle('uboot_test2.js');
container.deployVerticle('ecs/mysql_dataserver.js');
container.deployVerticle('ecs/ecs_worker.js');
container.deployVerticle('ecs/ftp_worker.js');
