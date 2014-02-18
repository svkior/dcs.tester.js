function MysqlReader(server, eventBus){
    var ed = $('.reader');
    ed.empty();
    var status = $('<strong>').text('Connecting to ' + server.ip);
    status.appendTo(ed);
    eventBus.send('dataserver.login',{ip:server.ip}, function(resp){
        console.log('server opened');
        status.text('Connected to ' + server.ip);
        $('.servers').empty();
        $('.logout').on('click', function(){
            eventBus.send('dataserver.logout', {}, function(res){
                console.log('Logout: ');
                console.log(res);
                ed.empty();
                refreshServers();
                return false;
            });
        });
        console.log(resp);
        eventBus.send('dataserver.getgroups', {}, function(response){
            //console.log('DATA from getgroups');
            //console.log(response);
            var ul = $('<ul></ul>').appendTo(ed);

            $.each(response.data, function(){
                if(this.DriveID){
                    var DriveID = this.DriveID;
                    var DriveName = this.Comment;
                    var showParams = function(){
                        new showDriveParams(DriveID, DriveName, eventBus);
                        new showDriveCtrl(DriveID, DriveName, eventBus);
                        return false;
                    };
                    var li = $('<li>').text(this.ID + '(' + this.DriveID + ')' + ' - ');
                    $('<a>').text(this.Comment).attr('href','#').on('click', showParams).appendTo(li);
                    li.appendTo(ul);
                }
            })
        });

        return false;
    });

}