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
    host: "localhost",
    bridge: true,
    inbound_permitted: [
        { address: 'ubtests.list' },
        { address: 'ubtests.save' },
        { address: 'ubtests.delete' }
    ]
});


container.deployVerticle('dcs/dcs_tester2.js');
