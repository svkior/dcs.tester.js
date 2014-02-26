/**
 * Created by svkior on 18/02/14.
 */

var console = require('vertx/console');
var eventBus = require('vertx/event_bus');

var FtpWorker = Packages.ru.scircus.mech.GetFTPTelemetry;

var ftpTelemetry = undefined;


eventBus.registerHandler('ftp.login', function(args, responder){
    ftpTelemetry = new FtpWorker(args.ip);
    responder({status: 'ok'});
});


eventBus.registerHandler('ftp.update', function(args, responder){


    ftpTelemetry.updateTelemetry(
        java.lang.Integer(args.DriveID), // Drive Number
        java.lang.Integer(args.Bus),
        java.lang.Integer(args.Addr)
    );

    responder({status: 'ok'});
});

eventBus.registerHandler('ftp.load', function(args, responder){

    ftpTelemetry.loadTelemetry(
        java.lang.Integer(args.DriveID), // Drive Number
        java.lang.Integer(args.Bus),
        java.lang.Integer(args.Addr)
    );

    var vals = ftpTelemetry.getSensVal();
    var trajv = ftpTelemetry.getTrgenVal();
    var ustv   = ftpTelemetry.getRegVal();
    

    var telem = [];
    var traj = [];
    var ust = [];
    for(var i=0; i<vals.size(); i++){
        telem[i] = vals.get(i);
        traj[i] = trajv.get(i);
        ust[i] = ustv.get(i);
    }

    responder({
        status: 'ok',
        data: telem,
        traj: traj,
        ust: ust
    });

});


console.log('FTP Worker Vertex launched');
