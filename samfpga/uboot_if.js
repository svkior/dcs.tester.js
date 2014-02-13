/**
 * Created by svkior on 11/02/14.
 */
var vertx = require('vertx');
var console = require('vertx/console');



exports.getUboot = function(iPortName) {
    var uboot = {};

    uboot.sp = Packages.jssc.SerialPort(iPortName);
    uboot.sp.openPort();
    uboot.sp.setParams(115200, 8, 1, 0);
    var bc1 = uboot.sp.getInputBufferBytesCount();
    if(bc1>0){
        uboot.sp.readString(bc1,0);
    }
    uboot.sp.writeString("1\n");
    uboot.state_m = 'program';
    uboot.commands = [];

    uboot.dumpDword = function(addr, size){
        var cmdString = 'md 0x' + addr.toString(16) + ' 0x' + size.toString(16) +'\n';
        console.log('Push Command: ' + cmdString);
        uboot.commands.push({
            command: cmdString,
            times: 1
        });
        //uboot.needNext = true;
    };

    uboot.dumpByte = function(addr, size){
        var cmdString = 'md.b 0x' + addr.toString(16) + ' 0x' + size.toString(16) +'\n';
        console.log('Push Command: ' + cmdString);
        uboot.commands.push({
            command: cmdString,
            times: 1
        });
    };

    uboot.writeDword = function(addr, value){
        var cmdString = 'mw 0x' + addr.toString(16) + ' 0x' + value.toString(16) +'\n';
        console.log('Push Command: ' + cmdString);
        uboot.commands.push({
            command: cmdString,
            times: 1
        });
    };

    uboot.writeByte = function(addr, value){
        var cmdString = 'mw.b 0x' + addr.toString(16) + ' 0x' + value.toString(16) +'\n';
        console.log('Push Command: ' + cmdString);
        uboot.commands.push({
            command: cmdString,
            times: 1
        });
    };


    uboot.needNext = false;

    uboot.tmr = vertx.setPeriodic(100, function(id){

        if(uboot.state_m == 'program'){
            uboot.dumpDword(0xffffec00, 4);
            uboot.writeDword(0xffffec00, 0x00000000);
            uboot.writeDword(0xffffec04, 0x0b080b08);
            uboot.writeDword(0xffffec08, 0x000b000b);
            uboot.writeDword(0xffffec0c, 0x00000000);
            uboot.dumpDword(0xffffec00, 4);
            var adr = 0x10000000;
            for(var val = 0x00; val <= 0xff; val ++){
                uboot.writeByte(adr+val,val);
            }
            uboot.dumpByte(0x10000000, 0x100);
            uboot.state_m = 'detect';
        }
        //console.log('TTT ' + uboot.needNext);
        var bc = uboot.sp.getInputBufferBytesCount();
        var strr;
        if((bc > 0) || uboot.needNext){
            //console.log("Get " + bc + " bytes.");
            if(bc >0) strr = uboot.sp.readString(bc,1);
            else strr = '';
            console.log("Got: " + strr);

            switch(uboot.state_m){
                case 'detect':
                    if(strr.search("oot>")>0){
                        // Got Prompt like U-Boot>
                        console.log("Already at U-Boot");
                        uboot.sp.writeString("\n");
                        uboot.state_m = 'wait_prompt';
                    } else if(strr.search("gin:")>0) {
                        // Got Prompt like Login:
                        // We @ login:
                        // Rebooting
                        uboot.sp.writeString("root\n");
                        uboot.state_m = 'rebooting';
                    } else if(strr.search("#")>0){
                        // GOT # prompt
                        uboot.sp.writeString("reboot\n");
                        uboot.state_m = 'boot';
                    } else if(strr.search("sword:")>0){
                        uboot.sp.writeString('1\n');

                    }
                    break;
                case 'rebooting':
                    if(strr.search("#")>0){
                        // GOT # prompt
                        uboot.sp.writeString("reboot\n");
                        uboot.state_m = 'boot';
                    }
                    break;
                case 'boot':
                    if(strr.search('autoboot') > 0){
                        //console.log(strr.search('autoboot'));
                        console.log("GOT ANY KEY");
                        uboot.sp.writeString("\n");
                        uboot.state_m = 'wait_prompt'
                    }
                    break;
                case 'wait_prompt':
                    if(strr.search('oot>')>0){
                        console.log('GOT PROMPT');
                        if(uboot.commands.length > 0){

                            uboot.sp.writeString(uboot.commands[0].command);
                            if(uboot.commands[0].times > 1){
                                uboot.commands[0].times--;
                            } else {
                                uboot.commands.shift();
                            }

                        } else {
                            console.log('Empty commands');
                            uboot.state_m = 'finite';
                        }
                    }
                    break;
                case 'finite':
                    if(uboot.needNext){
                        console.log('WAIT!!!!')
                        uboot.state_m = 'wait_prompt';
                        uboot.sp.writeString('\n');
                        uboot.needNext = false;
                    }
                    console.log('Finish');
            }
        }
    });

    return uboot;
};