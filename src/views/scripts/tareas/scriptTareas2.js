/*Este escrip deb se exactamente igual, el scriptTareas, solo que la diferencia existe
* en el url, ya que debe contener la url con el nombre de dns y no por IP,
* o local host*/

var obj_json;

var tareasCliente=[];

var urlTareas = "http://juridicosoto.sytes.net/API/tareas";
//var urlTareas = "http://juridicosoto.sytes.net:3000/API/tareas";
//var urlTareas = "http://192.168.1.70:3000/API/tareas";
//var urlTareas = "http://192.168.1.70/API/tareas";

$(document).ready(function(){
    console.log("Se inicio");
    getTasksFromServer();
    // cargarTemplate();

    $("#btnNuevaTarea").click(function(){
        sendTask();
        $("#txtDetalle").val('');
        $('#txtDescripcion').val('');
    });

    $("#IDtbody").on('click','button',function (){

        var cadenaId = $(this).parent().parent().attr('id');
        var indice = cadenaId.substring(4,cadenaId.length);
        if(tareasCliente[indice].estado==="Pendiente")
        {
            tareasCliente[indice].estado="Finalizado";
            updateTaskOnServer(indice);
            printTable();
        }

    });

});

// function cargarTemplate(){
//     $("#miTemplate").load('template.html');
// }

function sendTask(){
    var tarea = {
        descripcion: $("#txtDescripcion").val(),
        detalle: $("#txtDetalle").val(),
        estado:"Pendiente"
    };

    $.ajax({
        url: urlTareas,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(tarea),
        success:function(res){
            //obj_json = res;
            //tareasCliente.push(obj_json.data);
            getTasksFromServer();
            printTable();
            console.log(obj_json.data);
        },
        error: function(err){
            console.log(err);
        }
    });
}

function printTable(){
    var cadena='';
    for(var i=0;i<tareasCliente.length;i++){
        if(tareasCliente[i].estado==="Pendiente"){
            cadena += '<tr id="fila'+ i +'">' +
                '<td>' + tareasCliente[i].descripcion+ '</td>' +
                '<td>' + tareasCliente[i].detalle + '</td>' +
                '<td>' + tareasCliente[i].estado + '</td>' +
                '<td>' +
                '<button class="btn btn-primary btn-warning active">' +
                'Finalizar <span class="glyphicon glyphicon-ok"></span>' +
                '</button>' +
                '</td>' +
                '</tr>';
        }
    }

    for(var i=0;i<tareasCliente.length;i++){
        if(tareasCliente[i].estado!="Pendiente"){
            cadena += '<tr id="fila'+ i +'">' +
                '<td>' + tareasCliente[i].descripcion+ '</td>' +
                '<td>' + tareasCliente[i].detalle + '</td>' +
                '<td>' + tareasCliente[i].estado + '</td>' +
                '<td>' +
                '<button class="btn btn-success disabled">' +
                'Finalizado <span class="glyphicon glyphicon-ok-circle"></span>' +
                '</button>' +
                '</td>' +
                '</tr>';
        }
    }

    document.getElementById('IDtbody').innerHTML = cadena;
}

function getTasksFromServer(){
    $.ajax({
        url: urlTareas,
        type: "GET",
        contentType: "application/json",
        success:function(res){
            obj_json = res;
            tareasCliente = obj_json.data;
            printTable();
            console.log(res);
        },
        error: function(err){
            console.log(err);
        }
    });
}

function updateTaskOnServer(indice){
    console.log('modificar el id: ', tareasCliente[indice]);
    $.ajax({
        url: urlTareas,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(tareasCliente[indice]),
        success:function(res){console.log(res)},
        error:function(err){console.log(err)}
    });
}