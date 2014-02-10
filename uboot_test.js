var console  = require('vertx/console');
var vertx = require('vertx');

var System = Packages.System;

console.log('Press reset on ARM9+FPGA Board');

var SerialPort = Packages.jssc.SerialPort;
var SerialPortException = Packages.jssc.SerialPortException;

var sp = SerialPort("/dev/cu.usbserial");

sp.openPort();
sp.setParams(115200, 8, 1, 0);
var count = 0;

var state_m = 'boot';


var commands = [];


commands.push({
    command :'md 0xffffec00 4\n',
    times: 1
});
commands.push({
    command: 'mw 0xffffec00 0x00000000\n',
    times: 1
});
commands.push({
    command: 'mw 0xffffec04 0x0b080b08\n',
    times: 1
});
commands.push({
    command: 'mw 0xffffec08 0x000b000b\n',
    times: 1
});
commands.push({
    command: 'mw 0xffffec0c 0x00000000\n',
    times: 1
});

commands.push({
    command: 'mw.b 0x10000000 1\n',
    times: 1
});

commands.push({
    command: 'mw.b 0x10000001 2\n',
    times: 1
});


commands.push({
   command: 'md.b 0x10000000 2\n',
    times: 1
});


var cmd_idx = 0;

vertx.setPeriodic(100, function(id){
    //console.log("Tick " + count);
    count++;

   var bc = sp.getInputBufferBytesCount();
   if(bc > 0){
       //console.log("Get " + bc + " bytes.");
       var strr = sp.readString(bc,1);
       console.log("Got: " + strr);

       switch(state_m){
           case 'boot':
               if(strr.search('autoboot') > 0){
                   //console.log(strr.search('autoboot'));
                   console.log("GOT ANY KEY");
                   sp.writeString("\n");
                   state_m = 'wait_prompt'
               }
                break;
           case 'wait_prompt':
               if(strr.search('oot>')>0){
                   console.log('GOT PROMPT');
                   if(cmd_idx < commands.length){
                       sp.writeString(commands[cmd_idx].command);
                       if(commands[cmd_idx].times > 1){
                           commands[cmd_idx].times--;
                       } else {
                           cmd_idx++;
                       }
                   } else {
                       console.log('Finish');
                   }
               }
       }


   }


    if(count == 1000){
        vertx.cancelTimer(id);
        console.log("Done.");
    }
});
