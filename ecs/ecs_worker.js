/**
 * Created by svkior on 14/02/14.
 */

var console = require('vertx/console');
var eventBus = require('vertx/event_bus');
var vertx = require('vertx');

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

var v = Packages.ru.scircus.mech.UDPWorker;

console.log(v);

var UDPWorker1 = new v("192.168.99.241");


eventBus.registerHandler('ecs.go', function(args, responder){

    var driveNumber = java.lang.Integer(7);
    var groupNumber = java.lang.Integer(4);
    var delayTime = java.lang.Integer(7000);

    var zero = java.lang.Integer(0);

    var maxL = java.lang.Integer(1000);
    var mmaxL = java.lang.Integer(-1000);
    var maxV = java.lang.Integer(200);
    var maxA = java.lang.Integer(200);
    var maxSpeed = java.lang.Integer(1000);

    UDPWorker1.SendPacket(2000,[driveNumber, zero]); //Перезаливка параметров в привод
    UDPWorker1.SendPacket(320,[zero,zero]); // Активация Общего ручного режима
    UDPWorker1.SendPacket(321,[groupNumber]);   // Ввод в группу привода
    UDPWorker1.SendPacket(510,[groupNumber]);  // Активировать привод
    UDPWorker1.SendPacket(312, [groupNumber]);
    UDPWorker1.SendPacket(504,[zero, groupNumber]); // Сброс позиции в 0
    vertx.setTimer(2000, function(){
        console.log('Going UP ...');
        UDPWorker1.SendPacket(330,[maxV,maxA,maxL,groupNumber]); // Движение V/1000, A/1000, L/1000
        UDPWorker1.SendPacket(313,[maxSpeed]);
        vertx.setTimer(16000, function() {
            console.log('Going DOWN ...');
            UDPWorker1.SendPacket(330,[maxV,maxA,mmaxL,groupNumber]); // Движение V/1000, A/1000, L/1000
            UDPWorker1.SendPacket(313,[maxSpeed]);
            vertx.setTimer(16000, function() {
                console.log('STOP');
                UDPWorker1.SendPacket(324,[groupNumber]); // Выключение питания привода
                responder({status: 'ok'});
            });
        });
    });
    console.log('YOHOHO!');
});