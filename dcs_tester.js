/**
 * Created by svkior on 13.02.14.
 */
var console = require('vertx/console');
var serLnx = require('samfpga/ser_lnxer.js');

var lnx = serLnx.getLnx('/dev/ttyUSB0');
lnx.start(
    function(result) {
    console.log('CallBack');
    lnx.close();
});
