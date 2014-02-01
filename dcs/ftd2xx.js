/**
 * Created by svkior on 01/02/14.
 */


// Этот вертикл должен содержать объект
// Который взаимодейсвтует с FTD2XX
//
// Список функций, которые этот объект должен поддерживать

var console = require('vertx/console');

var d2xx;

var getD2xx = function() {
    var jna = Packages.com.sun.jna;
    d2xx = jna.NativeLibrary.getInstance("ftd2xx");
    getD2xx = function() {
        return d2xx;
    };
    return d2xx;
};


exports.openD2xx = function() {
    var d2x = getD2xx();
    console.log('openD2x');
    return d2x;
};


exports.doHello = function() {
    console.log("Hello, World");

};


//  p = open(Number)  - открытие порта с определенным номером, p - это ссылка на объект
//  p.setLattencyTimer(iLattency) - установка таймера летенси
//  p.setTimeouts(iReadTimeout, iWriteTimeout) - Установка таймаута на чтение и таймаута на запись
//  p.setUSBParameters(iInBufferSize, iOutBufferSize) - Установка размеров входного и выходного буферов
//  p.purge(iBuffers) - Purge (1 - Rx, 2 -Tx, 3 - All) Buffers
//  p.close() -  Закрыть порт
//  p.getQueueStatus() - забрать статус входной очереди
//  p.read(iNumOfBytes) - прочитать число байт
//  p.write(sBytes2Write) - записать строку в  USB

