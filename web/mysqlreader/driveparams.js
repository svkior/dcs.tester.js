function showDriveParams(DriveID, DriveName, eventBus){
    eventBus.send('dataserver.getdriveparam',{DriveID:DriveID},
        function(resp){
            var params = $(".params");
            params.empty();
            var status = $('<h3>').text('Двигатель: ' + DriveName);
            status.appendTo(params);
            var ul = $('<ul>');


            var addToList = function(text, id, key){
                var editCallback = function(){
                    console.log('TRY TO EDIT ' + id);
                    var nameInput = $('[name=' + id + ']', this);
                    nameInput.prop('readonly', true);
                    //TODO: MAKE NOT EDITABLE
                    eventBus.send('datasever.driveparameterupdate',{
                        DriveID: DriveID,
                        param: id,
                        value: nameInput.val()
                    }, function(resp){
                        console.log(resp);
                        //TODO: MAKE EDITABLE
                        nameInput.prop('readonly', false);
                    });
                    return false;
                };
                var form = $('<form>').on('submit',editCallback);
                var lab = $('<label>');
                $('<input>').attr('name', id).attr('value',key).addClass('edit').appendTo(lab);
                $('<strong>').text(text + ' (' + id + ')').appendTo(lab);
                lab.appendTo(form);
                var li = $('<li>');
                form.appendTo(li);
                li.appendTo(ul);
            };
            var values = resp.data[0];

            addToList('Подставка', 'D5', values.D5);
            addToList('РучнойР', 'D12', values.D12);
            addToList('Ппрям', 'D22', values.D22);
            addToList('Доезд 5с', 'D4', values.D4);
            addToList('Min ', 'D10', values.D10);
            addToList('Max', 'D11', values.D11);
            //addToList('Спиральная', 'D', values.D);
            addToList('Пос ', 'D1', values.D1);
            addToList('Иос', 'D2', values.D2);
            addToList('Дос', 'D3', values.D3);
            addToList('sp_k1', 'sp_k1', values.sp_k1);
            addToList('sp_k2', 'sp_k2', values.sp_k2);
            addToList('sp_k3', 'sp_k3', values.sp_k3);
            addToList('sp_k4', 'sp_k4', values.sp_k4);
            addToList('sp_invk1', 'sp_invk1', values.sp_invk1);
            addToList('sp_invk2', 'sp_invk2', values.sp_invk2);
            addToList('sp_invk3', 'sp_invk3', values.sp_invk3);
            addToList('sp_invk4', 'sp_invk4', values.sp_invk4);

            ul.appendTo(params);
        });
}
