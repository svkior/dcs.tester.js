/**
 * Created by svkior on 11/02/14.
 */
var console = require('vertx/console');
var ubootIf = require('samfpga/uboot_if.js');


var osName = Packages.java.lang.System.getProperty("os.name");
console.log('Press reset on ARM9+FPGA Board. Running on ' + osName);

switch(osName){
    case 'Linux':
        ubootIf.getUboot('/dev/ttyUSB0');
        break;
    // TODO: case 'macos x' /*"/dev/cu.usbserial"*/
    default:
        console.log('Unsupported OS');
}