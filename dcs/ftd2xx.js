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


exports.getD2XX = function() {

    var d2x = {};
    var lib = getD2xx();
    d2x.jna = Packages.com.sun.jna;
    d2x.FT_Open = lib.getFunction("FT_Open");
    d2x.FT_SetLatencyTimer = lib.getFunction("FT_SetLatencyTimer");
    d2x.FT_SetTimeouts = lib.getFunction("FT_SetTimeouts");
    d2x.FT_SetUSBParameters = lib.getFunction("FT_SetUSBParameters");
    d2x.FT_Purge = lib.getFunction("FT_Purge");
    d2x.FT_Close = lib.getFunction("FT_Close");
    d2x.FT_GetQueueStatus = lib.getFunction("FT_GetQueueStatus");
    d2x.FT_Read = lib.getFunction("FT_Read");
    d2x.FT_Write = lib.getFunction("FT_Write");

    d2x.open = function(iPort) {
        console.log('D2x Opened on port ' + iPort);
        var devNumber = this.jna.NativeLong(0);
        var pftHandle = this.jna.Memory(8);
        var status = this.FT_Open.invokeInt([devNumber, pftHandle]);
        console.log('Device return status: ');
        console.log(status);
        return status;
    };

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

