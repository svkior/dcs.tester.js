/**
 * Created by svkior on 14/02/14.
 */

var console = require('vertx/console');
var eventBus = require('vertx/event_bus');
console.log('ECS Worker');

var channel;
if(!channel){
    channel = Packages.java.nio.channels.DatagramChannel.open();
    channel.socket().bind(Packages.java.net.InetSocketAddress(1701));
}
var ecsAddr = Packages.java.net.InetSocketAddress("192.168.100.98", 1350);

function SendUDPPacket(cmd, params){
    var parLen = params.length;
    var pultId = 5;
    var pktSize = 12 + parLen*4;

    var buf = Packages.java.nio.ByteBuffer.allocate(pktSize);
    buf.putInt(pultId);
    buf.putInt(cmd);
    buf.putInt(parLen*4);
    for(var i=0; i< parLen; i++){
        buf.putInt(params[i]);
    }
    channel.send(buf, ecsAddr);

}


eventBus.registerHandler('ecs.go', function(args, responder){

    var driveNumber = 7;
    var groupNumber = 4;
    var delayTime = 7000;

    var maxL = 1000;
    var maxV = 200;
    var maxA = 200;
    SendUDPPacket(2000,[driveNumber, 0]); //Перезаливка параметров в привод
    SendUDPPacket(320,[0,0]); // Активация Общего ручного режима
    SendUDPPacket(321,[groupNumber]);   // Ввод в группу привода
    SendUDPPacket(510,[groupNumber]);  // Активировать привод
    SendUDPPacket(312, [groupNumber]);
    SendUDPPacket(330,[maxV,maxA,maxL,groupNumber]); // Движение V/1000, A/1000, L/1000
    SendUDPPacket(313,[1000]);
    console.log('YOHOHO!');
});

