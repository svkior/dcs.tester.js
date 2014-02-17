/**
 * Created by svkior on 11/02/14.
 */
var console = require('vertx/console');
var ubootIf = require('samfpga/uboot_if.js');
var osName = Packages.java.lang.System.getProperty("os.name");
console.log('Press reset on ARM9+FPGA Board. Running on \'' + osName + '\'');

var eventBus = require('vertx/event_bus');

var tests = {
 test_mem: function(uboot){
     uboot.writeDword(0xffffec00, 0x00000000);
     uboot.writeDword(0xffffec04, 0x0b080b08);
     uboot.writeDword(0xffffec08, 0x000b000b);
     uboot.writeDword(0xffffec0c, 0x00000000);
     var adr = 0x10000000;
     for(var val = 0x00; val <= 0xff; val ++){
         uboot.writeByte(adr+val,val);
     }
     uboot.dumpByte(0x10000000, 0x100);
 }
};

function sendPersistorEvent(command, callback) {
    eventBus.send('ubtests.persistor', command, function(reply) {
        if (reply.status === "ok") {
            callback(reply);
        } else {
            console.log(reply.message);
        }
    });
}


eventBus.registerHandler('ubtests.list', function(args, responder) {
    sendPersistorEvent({
        action: 'find',
        collection: 'ub_tests',
        matcher: {}
    }, function(reply){
            responder({
                "ubtests": reply.results
            });
        }
    );
});

eventBus.registerHandler('ubtests.find', function(args, responder){
    sendPersistorEvent({
        action: 'findone',
        collection: 'ub_tests',
        matcher: {_id: args._id}
    }, function (reply){
        responder({ub_test: reply.result});
    });
});

eventBus.registerHandler('ubtests.save', function(ubtest, responder) {
    sendPersistorEvent({
        action: 'save',
        collection: 'ub_tests',
        document: ubtest
    }, function(reply){
        ubtest._id = reply._id;
        responder(ubtest);
    });
});


eventBus.registerHandler('ubtests.delete', function(args, responder) {
    sendPersistorEvent({
        action: 'delete',
        collection: 'ub_tests',
        matcher: {_id: args.id}
    }, function(reply){
        responder({});
    });
});


eventBus.registerHandler('ubtests.run', function(args, responder){
    console.log('Runing test:');
    var lines = args.test.split(/\r\n|\r|\n/);
    var response = 'Using Port: ' + args.port + '\n';
    var commands = [];
    for(var i=0; i< lines.length;i++){
        var line = lines[i];
        if(line.length > 3){
            response+= "Line" + i + ' => ' + line + '\n';
            commands.push(line);
        }
    }
    console.log('Commands:');
    for(var j=0; j< commands.length; j++){
        console.log(commands[j]);
    }
    ubootIf.getUboot(args.port, commands, function (res){
        response += res;
        console.log('response: \n'+response);
        responder({
            status: 'ok',
            response: response
        });
    });
});
