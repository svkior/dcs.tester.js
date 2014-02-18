function showDriveCtrl(DriveID, DriveName, eventBus){

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

    console.log('Drive Controls');
    var pp = $('.pp');
    pp.empty();
    var ul = $('<ul>');

    var addButton = function(text,cb){
        var li = $('<li>');
            $('<button>').text(text).appendTo(li).on('click', cb);
        li.appendTo(ul);
    };

    addButton('ВСЁ', cbPing);
    addButton('Поехать', DriveGO);
    addButton('с FTP-пить', cbPing);
    addButton('Постоить', cbPing);
    addButton('Позиция', cbPing);
    addButton('Скорость', cbPing);
    addButton('Ускорение', cbPing);
    addButton('Ошибка', cbPing);
    addButton('Управление', cbPing);
    ul.appendTo(pp);
}