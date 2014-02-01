/**
 * Created by svkior on 01/02/14.
 */

var console = require('vertx/console');
var ftd2xx = require('dcs/ftd2xx.js');

console.log('DCS Tester deployed.');

console.log('Try to Call ftd2xx');

ftd2xx.doHello();

var port = ftd2xx.getD2XX();

port.open(0);

console.log('Done');
