/*
var = Libc {
   lib: java.com.sun.jna.NativeLibrary.getInstance('c');
};

Libc.printf("Hello %s, from printf", "World")
*/

var console  = require('vertx/console');

console.log('Launching dcs_tester');

var container = require('vertx/container');

container.deployVerticle('dcs/dcs_tester2.js');
