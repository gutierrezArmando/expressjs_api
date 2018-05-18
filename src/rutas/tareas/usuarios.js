const express = require('express');
const conection = require('../../../database/dbConf');
const app = express.Router();

/*Para desplegar todos los usuarios*/
app.get('/', function (req, res) {
    conection.query('select * from prueba_persona', function (error, result, fields) {
        if(error)
            throw error;
        return res.send({error: false, data: result, message: 'lista (estructura correcta)'});
        //res.json(result);
    })
});

module.exports = app;

/*Para insertar un nuevo usuario*/
app.post('/', function (req, res) {
    var persona = req.body;
    if(!persona) {
        return res.status(400).send({error: true, message: 'Por favor ingrese un usuario'});
    }
    var query = conection.query("INSERT INTO prueba_persona SET ?",persona, function (error, results, fields) {
        if(error)
            throw error;
        return res.send({error: false, data: results, message: 'Usuario agregado exitosamente (estructura correcta)'});
    });
});

app.put('/', function (req, res) {
    var usuario = req.body;

    if(!usuario.idprueba) {
        res.status(409);
        res.send("No exite valor a modificar");
    }
    conection.query("UPDATE prueba_persona SET edad = ? WHERE idprueba = ?", [usuario.edad, usuario.idprueba], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Usuario actualizado exitosamente!! (estructura correcta)' });
    });
    // res.status(404);
    // res.send("Id no encontrado");
});

/*app.delete('/API/usuarios', function (req, res) {
    var id = req.body;
    console.log('el id es: ');
    console.log(id);
    if(!id) {
        res.status(409);
        res.send("No exite valor a modificar");
    }
    conection.query("delete from prueba_persona WHERE idprueba = ?", [id], function (error, results, fields) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Usuario eliminado exitosamente' });
    });
    // res.status(404);
    // res.send("Id no encontrado");
});*/