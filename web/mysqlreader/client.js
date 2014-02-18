refreshServers = function(){
    var renderListItem = function(server){
        var li = $('<li>');
        var openServer = function(){
            new MysqlReader(server, eb);
            return false;
        };

        $('<a>').text(server.ip).attr('href','#').on('click', openServer).appendTo(li);
        $('<strong>').text(' -  '+ server.name).appendTo(li);
        li.appendTo('.servers');
    };

    eb.send('dataserver.getservers',{}, function(res){
        $('.servers').empty();
        $.each(res.data, function(){ renderListItem(this)});
    });
};


var eb = new vertx.EventBus(window.location.protocol + '//' +window.location.hostname + ':' +window.location.port + '/eventbus');
eb.onopen = refreshServers;
