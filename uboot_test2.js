/**
 * Created by svkior on 11/02/14.
 */
var console = require('vertx/console');
var ubootIf = require('samfpga/uboot_if.js');

console.log('Press reset on ARM9+FPGA Board');

var uboot = ubootIf.getUboot();


