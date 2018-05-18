const express = require('express');
const conection = require('../../../database/dbTareasConf');
const app = express.Router();


/*Para desplegar todos los usuarios*/
app.get('/', function (req, res) {
    conection.query('select * from tareas', function (error, result, fields) {
        if(error)
            throw error;
        return res.json({error: false, data: result, message: 'Lista de tareas'});
        res.status(404);
        res.send("Error al buscar en base de datos");
    })
});

/*Para insertar un nuevo usuario*/
app.post('/', function (req, res) {
    var tarea = req.body;
    if(!tarea) {
        return res.status(400).send({error: true, message: 'Por favor ingrese un usuario'});
    }
    var query = conection.query("INSERT INTO tareas SET ?", tarea, function (error, results, fields) {
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