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

//app.use( function (req, res, next) {
    //en vez de * se puede definir SÓLO los orígenes que permitimos
  //  res.header('Access-Control-Allow-Origin', "*");
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //metodos http permitidos para CORS

    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.header('Access-Control-Allow-Headers', 'Content-Type');
    //next();
//})



// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     /*Linea agregada para que aceptara el metodo PUT*/
//     res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE");
//     next();
// });

function perimitirCrossDomain(req, res, next) {
    //en vez de * se puede definir SÓLO los orígenes que permitimos
    res.header('Access-Control-Allow-Origin', '*');
    //metodos http permitidos para CORS
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.listen(app.get('port'), function () {
    console.log('Servidor iniciado ', app.get('port'));
});

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

    let persona = req.body;
    if(!persona) {
       return res.status(400).send({error: true, message: 'Por favor ingrese un usuario'});
   }
   var query = conection.query("INSERT INTO prueba_persona SET ?",persona, function (error, results, fields) {
       if(error)
           throw error;
       return res.send({error: false, data: results, message: 'Usuario agregado'});
   });
});

/*Para eliminar*/
app.delete('/API/usuarios', function (req, res) {
    let id = req.body;
    console.log(id);
    if(!id)
        return res.status(400).send({error: true, message: 'No existe id'});
    conection.query('delete from prueba_persona where id = ?',[id], function (error, result, fields) {
        if(error)
            throw error;
        return res.send({error: false, data: result, message: 'Registro eliminado exitosamente'});
    });
});