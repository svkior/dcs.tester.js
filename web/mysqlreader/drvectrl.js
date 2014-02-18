function showDriveCtrl(DriveID, DriveName, eventBus){

    console.log('Drive Controls');
    var pp = $('.pp');
    pp.empty();
    var ul = $('<ul>');
    var graph = $('<div>');
    var curData = [];
    var options = {
        series: {
            lines: { show: true },
            points: { show: false }
        }
    };

    var cbPing = function(){
        return false;
    };

    var DriveGO = function(){
        console.log('DRIVE');
        eventBus.send('ecs.go',{DriveID:DriveID}, function(res){
            console.log('GOT RESPAWN!');
        });
        cbPing();
    };

    var GetFTP = function(){
        console.log('Get FTP');
        eventBus.send('ftp.update',{}, function(res){
            console.log(res);
        });
        cbPing();
    };

    var PlotGraph = function() {
        console.log('Plot Graph');
        eventBus.send('ftp.load', {}, function(res){
           console.log(res);
            curData = res.data;
            PlotPos();
        });
        cbPing();
    };

    var PlotPos = function(){
        graph.width(619).height(400);
        var data =[
            { label: "Позиция", data: [  ] }
        ];
        for(var i=0; i<curData.length; i++){
            data[0].data[i] = [i, curData[i]];
        }


        $.plot(graph, data, options);
        cbPing();
    };

    var PlotSpeed = function(){
        graph.width(619).height(400);
        var data =[
            { label: "Позиция", data: [  ] }
        ];
        var pred = curData[0];
        data[0].data[0] = 0;
        for(var i=1; i<curData.length; i++){
            var speed = (curData[i] - pred)/0.025;
            data[0].data[i] = [i, speed];
            pred = curData[i];
        }
        $.plot(graph, data, options);
        cbPing();
    };

    var addButton = function(text,cb){
        var li = $('<li>');
            $('<button>').text(text).appendTo(li).on('click', cb);
        li.appendTo(ul);
    };

    addButton('ВСЁ', cbPing);
    addButton('Поехать', DriveGO);
    addButton('с FTP-пить', GetFTP);
    addButton('Постоить', PlotGraph);
    addButton('Позиция', PlotPos);
    addButton('Скорость', PlotSpeed);
    addButton('Ускорение', cbPing);
    addButton('Ошибка', cbPing);
    addButton('Управление', cbPing);
    ul.appendTo(pp);
    graph.appendTo(pp);
}