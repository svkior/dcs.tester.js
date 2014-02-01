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
    d2x.fh = 0;
    d2x.FT_Open = lib.getFunction("FT_Open");
    d2x.FT_SetLatencyTimer = lib.getFunction("FT_SetLatencyTimer");
    d2x.FT_GetLatencyTimer = lib.getFunction("FT_GetLatencyTimer");
    d2x.FT_SetTimeouts = lib.getFunction("FT_SetTimeouts");
    d2x.FT_SetUSBParameters = lib.getFunction("FT_SetUSBParameters");
    d2x.FT_Purge = lib.getFunction("FT_Purge");
    d2x.FT_Close = lib.getFunction("FT_Close");
    d2x.FT_GetQueueStatus = lib.getFunction("FT_GetQueueStatus");
    d2x.FT_Read = lib.getFunction("FT_Read");
    d2x.FT_Write = lib.getFunction("FT_Write");

    // Открыть порт по индексу устройства
    // Возвращает статусы
    // 0 - открыт
    // 2 - не дали доступ к девайсу (или не воткнут девайс)
    // 3 - не дали доступ к девайсу (потому что ftdi_sio)
    d2x.open = function(iPort) {
        console.log('D2x Opened on port ' + iPort);
        var devNumber = this.jna.NativeLong(0);
        var pfH = this.jna.Memory(8);
        pfH.clear();
        console.log('Current pfH ' + pfH.getLong(0));
        var status = this.FT_Open.invokeInt([devNumber, pfH]);

        if(status > 0) {
            console.log('Device return status: ' + status);
        } else {
            this.fh = this.jna.NativeLong(pfH.getLong(0));
            console.log('Device opened with handler ' +  this.fh);
        }

       return status;
    };

    // Установка Latency Таймера
    // Значение в милисекундах
    d2x.setLatencyTimer = function (iTimeout){
      console.log('D2x setLatency Timer to ' + iTimeout + ' with fhandle ' + this.fh);
      var ltm = Packages.java.lang.Byte(iTimeout);
      var status = this.FT_SetLatencyTimer.invokeInt([this.fh, ltm]);

        if(status > 0) {
            console.log('Device return status: ' + status);
        }
        return status;

    };

    // Получение значения Latency Таймера
    // -1 - Ошибка
    // Либо число в милисекундах
    d2x.getLatencyTimer = function(){
        console.log('Try to get Latency Timer from fhandle' + this.fh);
        var ltv = this.jna.Memory(1);
        var status = this.FT_GetLatencyTimer.invokeInt([this.fh, ltv]);
        if(status >0){
            console.log('Device return status:' + status);
            return -1;
        } else {
            console.log('Latency = ' + ltv.getByte(0));
            return ltv.getByte(0);
        }
    };

    d2x.setTimeouts = function(iReadTimeout, iWriteTimeout) {
        console.log('set Read Timeout to ' + iReadTimeout + ', Set Write Timeout to ' + iWriteTimeout);
        var status = this.FT_SetTimeouts.invokeInt([this.fh, this.jna.NativeLong(iReadTimeout),  this.jna.NativeLong(iWriteTimeout)]);
        if(status > 0) {
            console.log('FT_SetTimeouts return status: ' + status);
        }
        return status;
    };

    d2x.setUSBParameters = function(lInTransferSize, lOutTransferSize) {
        console.log('Set USB Parameters to ' + lInTransferSize + ', ' + lOutTransferSize);
        var status = this.FT_SetUSBParameters.invokeInt(
            [
                this.fh,
                this.jna.NativeLong(lInTransferSize),
                this.jna.NativeLong(lOutTransferSize)
            ]
        );
        if(status > 0) {
            console.log('FT_SetUSBParameters return status: ' + status);
        }
        return status;
    };

    d2x.purge = function(lMask) {
        console.log('Purge port with mask' + lMask);
        var status = this.FT_Purge.invokeInt([
            this.fh,
            this.jna.NativeLong(lMask)
        ]);
        if(status > 0) {
            console.log('FT_Purge return status: ' + status);
        }
        return status;
    };

    d2x.getQueueStatus = function() {
        //console.log('Get Queue Status');
        var qst = this.jna.Memory(8);
        qst.clear();
        var status = this.FT_GetQueueStatus.invokeInt([
            this.fh,
            qst
        ]);
        if(status > 0) {
            console.log('FT_GetQueueStatus return status: ' + status);

        } else {
            //console.log('FT_GetQueueStatus: ' + qst.getLong(0));
            return qst.getLong(0);
        }
        return -1;
    };

    d2x.read = function(iNumBytes) {
        //console.log('Read ' + iNumBytes);
        var buf = this.jna.Memory(iNumBytes);
        buf.clear();
        var bytesWritten = this.jna.Memory(8);
        bytesWritten.clear();

        var status = this.FT_Read.invokeInt([
            this.fh,
            buf,
            this.jna.NativeLong(iNumBytes),
            bytesWritten
        ]);

        if(status > 0 ) {
            console.log('Error Reading Stream ' + status);
            return undefined;
        } else {
            //console.log('Readed ' + bytesWritten.getInt(0) + ' Bytes');
            var charbuf = buf.getByteBuffer(0, bytesWritten.getInt(0));
            //console.log(charbuf);
            return charbuf;
        }
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

