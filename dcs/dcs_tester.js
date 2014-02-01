/**
 * Created by svkior on 01/02/14.
 */

var console = require('vertx/console');
var vertx = require('vertx');
var ftd2xx = require('dcs/ftd2xx.js');

console.log('DCS Tester deployed.');

console.log('Try to Call ftd2xx');
var port = ftd2xx.getD2XX(); // Получили объект общения с драйвером
// Пробуем открыть порт
if( port.open(0)== 0) {
    //Открыли порт
    var checkSetLatency = 2;
    port.setLatencyTimer(checkSetLatency); // Внутренний таймаут чипа ставим в минимум (2мс)
    if(port.getLatencyTimer() != checkSetLatency){
        console.log("Latency Timer is not set");
    }

    port.setTimeouts(1,1);
    port.setUSBParameters(16384, 16384);
    port.purge(3);

    var count = 0;
    var trueCount = 0;
    var locked = false;
    var proe = 0;
    vertx.setPeriodic(1, function(id){
        //console.log('Periodic ' + count);
        count++;
        var bytes = port.getQueueStatus();

        if(locked){
            if(bytes >= 747) {
                var buffer = port.read(bytes);
            }

            // TODO: Change to actual readed buffer length
            if(bytes == 747){
                trueCount++;
                //console.log('Pkt: ' + trueCount);
                //
            } else {
                if(bytes > 747){
                    locked = false;
                    proe++;
                    console.log('Proe:  ' + proe);
                    console.log('Bytes: ' + bytes);
                    console.log('Curr:  ' + trueCount);
                }
            }

        } else {
            if(bytes > 0) {
                console.log('Not locked, reading ' + bytes + ' bytes');
                port.read(bytes);
            } else {
                locked = true;
                console.log('Buffer is empty. Locking alrogithm');
            }
        }


        if(count === 1000000) {
            vertx.cancelTimer(id);
            console.log('Done:       ' + (count/trueCount) + ' ms');
            console.log('Proe:       ' + proe);
            console.log('TrueCounts: ' + trueCount);
            console.log('%:          ' + (proe/trueCount*100));
        }
    });


}

