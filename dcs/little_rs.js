/**
 * Created by svkior on 12/02/14.
 */
var console = require('vertx/console');

exports.getLUSB = function() {
    var lusb = {};

    lusb.open = function(iPort){
        console.log('Try to open LittleUSB on port '+ iPort);
        this.sp = Packages.jssc.SerialPort(iPort);//"/dev/cu.usbserial"
        this.sp.openPort();
        this.sp.setParams(921600, 8 ,1 ,0);

        var bc1 = this.sp.getInputBufferBytesCount();
        //if(bc1>0){
        //    this.sp.readString(bc1,0);
        //}
        return 0;
    };

    lusb.setLatencyTimer = function(iTimeout){
        console.log('Nerealizovano');
        return 0;
    };

    lusb.getLatencyTimer = function(){
        console.log('Get Latency timer');
        return 0;
    };

    lusb.setTimeouts = function(iReadTimeout, iWriteTimeout) {
        return 0;
    };

    lusb.setUSBParameters = function(lInTransferSize, lOutTransferSize){
        return 0;
    };

    lusb.purge = function(lMask) {
        return 0;
    };

    lusb.getQueueStatus = function() {
        return this.sp.getInputBufferBytesCount();
    };

    lusb.read = function(iNumBytes){
       return this.sp.readBytes(iNumBytes);
    };

    return lusb;
};