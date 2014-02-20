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
    }

})();