/**
 * Created by svkior on 14/02/14.
 */

var console = require('vertx/console');


console.log('ECS Worker');


var channel = Packages.java.nio.channels.DatagramChannel.open();

channel.socket().bind(Packages.java.net.InetSocketAddress(1701));

var ecsAddr = Packages.java.net.InetSocketAddress("192.168.99.177", 1350);

function putInteger(buf, val){

    var bytes = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4);

    iVal = java.lang.Integer(val);

    bytes[0] = val & 0xff;
    bytes[1] = (val >> 8) && 0xff;
    bytes[2] = (val >> 16) && 0xff;
    bytes[3] = (val >> 24) && 0xff;
    buf.put(bytes);
}


var buf = Packages.java.nio.ByteBuffer.allocate(48);
buf.clear();

putInteger(buf, 1000);

