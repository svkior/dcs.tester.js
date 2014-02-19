/*
var = Libc {
   lib: java.com.sun.jna.NativeLibrary.getInstance('c');
};

Libc.printf("Hello %s, from printf", "World")
*/

var console  = require('vertx/console');

var container = require('vertx/container');

var config = container.config;
console.log(config);
var ubootVersion = config.ubootVersion;

console.log('Launching Server ' + ubootVersion);


container.deployModule('io.vertx~mod-web-server~2.0.0-final', {
    port: 8080,
    host: "0.0.0.0",
    bridge: true,
    inbound_permitted: [
        { address: 'ubtests.list'},
        { address: 'ubtests.save'},
        { address: 'ubtests.delete'},
        { address: 'ubtests.find'},
        { address: 'ubtests.run'},
        { address: 'ubtests.getports'},
        { address: 'dataserver.login'},
        { address: 'dataserver.logout'},
        { address: 'dataserver.getservers'},
        { address: 'dataserver.getgroups'},
        { address: 'dataserver.getdriveparam'},
        { address: 'datasever.driveparameterupdate'},
        { address: 'ecs.go'},
        { address: 'ecs.login'},
        { address: 'ftp.login'},
        { address: 'ftp.update'},
        { address: 'ftp.load'},
        { address: 'server.reboot'},
        { address: 'server.getver'}
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

var eventBus = require('vertx/event_bus');

eventBus.registerHandler('server.getver', function(args, responder){
  responder({version: ubootVersion});
});

eventBus.registerHandler('server.reboot', function(args, responder){
    responder({status: "ok"});
    console.log('System is going to shutdown now!!!');
    container.exit();
});