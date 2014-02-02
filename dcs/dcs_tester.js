/**
 * Created by svkior on 01/02/14.
 */

var console = require('vertx/console');
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
}

console.log('Done');
