var obj_json;

var tareasCliente=[];
var sucursal = [];

var operaciones = [];
var usuarios = [];

//var server = 'juridicosoto.sytes.net';
var server = 'localhost';
//var urlTareas = "http://juridicosoto.sytes.net:3000/API/tareas";
//var urlTareas = "http://192.168.1.70:3000/API/tareas";
// var urlTareas = "http://192.168.1.70/API/tareas";
var urlUsuarios = "http://"+ server +"/API/moneyExpress/usuarios";
var urlSucursal = "http://"+ server +"/API/moneyExpress/sucursal";
var urlOperaciones = "http://"+ server +"/API/moneyExpress/operaciones";

$(document).ready(function(){
    console.log("Se inicio Money Express");
    //getTasksFromServer();
    // cargarTemplate();
//    getUsuarios();

    $("#btnPrueba").click(function(){
        getSucursal('A1','123456');

        // sendTask();
        // $("#txtDetalle").val('');
        // $('#txtDescripcion').val('');
    });

/*    $("#IDtbody").on('click','button',function (){

        var cadenaId = $(this).parent().parent().attr('id');
        var indice = cadenaId.substring(4,cadenaId.length);
        if(tareasCliente[indice].estado==="Pendiente")
        {
            tareasCliente[indice].estado="Finalizado";
            updateTaskOnServer(indice);
            printTable();
        }

    });*/

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
        url: urlUsuarios,
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

/*Regresa todos los usarios*/
function getUsuarios(){
    $.ajax({
        url: urlUsuarios,
        type: "GET",
        contentType: "application/json",
        success:function(res){
            obj_json = res;
            usuarios = obj_json.data;

  //          printTable();
            console.log(res);
        },
        error: function(err){
            console.log(err);
        }
    });
}

/*Regresa todos el usuarios especificado*/
function getUsuario(username, paswd){
    var usuarioPassword = {
        usuario: username,
        password: paswd,
    };
    $.ajax({
        url: urlUsuarios,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(usuarioPassword),
        success:function(res){
            obj_json = res;
            usuarios = obj_json.data;
            // printTable();
            console.log('respuesta');
            console.log(res);
//            alert(usuarios[0].username);
        },
        error: function(err){
            console.log(err);
        }
    });
}

/*Regresa todos el usuarios especificado*/
function getSucursal(username, paswd){
    var usuarioPassword = {
        usuario: username,
        password: paswd,
    };
    $.ajax({
        url: urlSucursal,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(usuarioPassword),
        success:function(res){
            obj_json = res;
            sucursal = obj_json.data;
            // printTable();
            console.log('respuesta');
            console.log(res);
            $('#lblSucursal').text('La sucursal es: '+sucursal[0].sucursal);
        },
        error: function(err){
            console.log(err);
        }
    });
}


function addOperacion(id_sucursal, id_cajero, tipo_operacion, num_folio, t_cambio, cant_dolares, cant_pesos, cant_recibido, cant_cambio){
    var operacion = {
        sucursal_id: id_sucursal,
        cajero_id: id_cajero,
        tipo: tipo_operacion,
        folio: num_folio,
        tc: t_cambio,
        dolares: cant_dolares,
        pesos: cant_pesos,
        recibido: cant_recibido,
        cambio:cant_cambio
    };
    $.ajax({
        url: urlOperaciones + '/add',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(operacion),
        success:function(res){
            obj_json = res;
            //tareasCliente.push(obj_json.data);
            //getTasksFromServer();
            //printTable();
            console.log(obj_json.data);
        },
        error: function(err){
            console.log(err);
        }
    });
}

function getOperacionesPorDia(fecha){
    //var dia = {fecha};
    //console.log(dia);
    $.ajax({
        url: urlOperaciones,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({fecha}),
        success:function(res){
            obj_json = res;
            tareasCliente = obj_json.data;
            // printTable();
            console.log('respuesta');
            console.log(res);
        },
        error: function(err){
            console.log(err);
        }
    });
}