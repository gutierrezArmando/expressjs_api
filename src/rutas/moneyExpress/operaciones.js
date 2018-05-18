const express = require('express');
const conection = require('../../../database/dbMoneyExpressConf');
const app = express.Router();



/*Para desplegar las operaciones segun la fecha
* con formato aaaa-mm-dd*/
app.post('/', function (req, res) {

    var strQuery =
        "select id, CAST(fecha as DATE) fecha, CAST(fecha as time) hora, folio, cajero_id, usuario_id, tipo, dolares, tc, pesos " +
        "from operacion " +
        "where CAST(fecha as date) = ? ";
    var query2 = 'select * from user where username = ? and password = ?';
    conection.query( strQuery, req.body.fecha ,function (error, result, fields) {
        if(error)
            throw error;
        return res.json({error: false, data: result, message: 'Datos de usuario'});
        res.status(404);
        res.send("Error al buscar en base de datos");
    })
});

/*Para insertar un nuevo usuario*/
app.post('/add', function (req, res) {
    var operacion = req.body;
    var strQuery =
        "insert into " +
        "operacion(sucursal_id,cajero_id,tipo,folio,fecha,fecha_completada,tc,dolares,pesos, recibido,cambio) " +
        "values(?,?,?,?,current_timestamp(),current_timestamp(), ?, ?, ?, ?, ?)";
    if(!operacion) {
        return res.status(400).send({error: true, message: 'Por favor ingrese un usuario'});
    }
    var query = conection.query(strQuery,[
        operacion.sucursal_id,
        operacion.cajero_id,
        operacion.tipo,
        operacion.folio,
        operacion.tc,
        operacion.dolares,
        operacion.pesos,
        operacion.recibido,
        operacion.cambio
    ], function (error, results, fields) {
        if(error)
            throw error;
        return res.send({error: false, data: results, message: 'Tarea agregada exitosamente'});
        res.status(404);
        res.send("Id no encontrado");
    });

});

app.put('/', function (req, res) {
    var tarea = req.body;

    if(!tarea.id) {
        res.status(409);
        res.send("No exite valor a modificar");
    }
    conection.query("UPDATE tareas SET estado = ? WHERE id = ?", [tarea.estado, tarea.id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Usuario actualizado exitosamente!! (estructura correcta)' });
        res.status(404);
        res.send("Id no encontrado");
    });

});

module.exports = app;