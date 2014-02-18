/**
 * Created by svkior on 18/02/14.
 */

var console = require('vertx/console');
var eventBus = require('vertx/event_bus');

var FtpWorker = Packages.ru.scircus.mech.GetFTPTelemetry;

var ftpTelemetry = new FtpWorker("192.168.99.241");

eventBus.registerHandler('ftp.update', function(args, responder){

    ftpTelemetry.updateTelemetry(
        java.lang.Integer(7), // Drive Number
        java.lang.Integer(2),
        java.lang.Integer(0)
    ); // ToDo: fix drive number

    responder({status: 'ok'});
});

eventBus.registerHandler('ftp.load', function(args, responder){

    ftpTelemetry.loadTelemetry(java.lang.Integer(7));

    var vals = ftpTelemetry.getSensVal();
    console.log(vals);
    console.log(vals.size());
    var telem = [];
    for(var i=0; i<vals.size(); i++){
        telem[i] = vals.get(i);
    }

    responder({
        status: 'ok',
        data: telem
    });

});


console.log('FTP Worker Vertex launched');
