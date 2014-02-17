/*
var = Libc {
   lib: java.com.sun.jna.NativeLibrary.getInstance('c');
};

Libc.printf("Hello %s, from printf", "World")
*/

var console  = require('vertx/console');

console.log('Launching dcs_tester');

var container = require('vertx/container');

//container.deployVerticle('dcs_tester.js');


container.deployModule('io.vertx~mod-web-server~2.0.0-final',{
    port: 8080,
    host: "localhost"
});


//container.deployVerticle('tester/suits.js');

container.deployVerticle('ecs/ecs_worker.js');