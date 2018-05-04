// Bibliografia
// https://arjunphp.com/creating-restful-api-express-js-node-js-mysql/

const express = require('express');
const bodyParser = require('body-parser');
const conection = require('../database/dbConf');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

// app.use( function (req, res, next) {
//     //en vez de * se puede definir SÓLO los orígenes que permitimos
//    res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     //metodos http permitidos para CORS
//
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.get('/', function (req, res) {
    return res.send('<h1>Titulo 1</h1><p>Este es un parrafo 1</p>')
});

/*Para desplegar todos los usuarios*/
app.get('/API/usuarios', function (req, res) {
    conection.query('select * from prueba_persona', function (error, result, fields) {
        if(error)
            throw error;
        return res.send({error: false, data: result, message: 'lista'});
        //res.json(result);
    })
});

/*Para insertar un nuevo usuario*/
app.post('/API/usuarios', function (req, res) {
    var persona = req.body;
    if(!persona) {
       return res.status(400).send({error: true, message: 'Por favor ingrese un usuario'});
   }
   var query = conection.query("INSERT INTO prueba_persona SET ?",persona, function (error, results, fields) {
       if(error)
           throw error;
       return res.send({error: false, data: results, message: 'Usuario agregado'});
   });
});


app.put('/API/usuarios', function (req, res) {
    var usuario = req.body;

    if(!usuario.idprueba) {
        res.status(409);
        res.send("No exite valor a modificar");
    }
    conection.query("UPDATE prueba_persona SET edad = ? WHERE idprueba = ?", [usuario.edad, usuario.idprueba], function (error, results, fields) {
        if (error) throw error;
            res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });
    // res.status(404);
    // res.send("Id no encontrado");
});


app.delete('/API/usuarios', function (req, res) {
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
});

app.all('*', function (req, res, next) {
    res.send('<h1>Pagina no encontrada</h1>')
})


app.listen(app.get('port'), function () {
    console.log('Servidor iniciado ', app.get('port'));
});