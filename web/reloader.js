/**
 * Created by svkior on 20/02/14.
 */
(function(){
    var state = 'wait';

    var onConect = function(){
        if(state == 'reconnect'){
            state = 'reload';
            eb.close();
        } else {
            state = 'wait';
            console.log('CONNECTED');
            if(runApp){
                runApp();
            } else {
                console.log('There is no application')
            }
        }
    };

    var forceReconnect;
    forceReconnect = function () {
        if(state=='reload'){
            state = 'canreload';
            location.reload(true);
        }else {
            state = 'reconnect';
            console.log('DISCONNECT!!!!!!');
            var ppp = $('.servers').empty();
            $('.status').empty();
            ppp.empty();
            $('<h1>').text('Reconnecting...').appendTo(ppp);

        }
    };

    var eb = new vertx.EventBus(window.location.protocol + '//' +window.location.hostname + ':' +window.location.port + '/eventbus');
    eb.onopen = refreshServers;
    eb.onclose = forceReconnect;



    var idx = 0;
    (function worker() {
        switch(state){
            case 'reconnect':
                if(eb.readyState() == 3){
                    eb = new vertx.EventBus(window.location.protocol + '//' +window.location.hostname + ':' +window.location.port + '/eventbus');
                    eb.onopen = onConect;
                    eb.onclose = forceReconnect;
                }
                break;
        }
        setTimeout(worker, 5000);
    })();

})();