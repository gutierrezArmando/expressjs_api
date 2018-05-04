// Bibliografia
// https://arjunphp.com/creating-restful-api-express-js-node-js-mysql/
// https://www.youtube.com/watch?v=pz_4UOHq594&list=PLEw4347lfIFG8mL96p2metxqBa0LsL8MC&index=2
// https://www.youtube.com/watch?v=FBguazxFbVo&index=3&list=PLEw4347lfIFG8mL96p2metxqBa0LsL8MC

const express = require('express');
const bodyParser = require('body-parser');

const privilegios = require('./rutas/privilegios');
const usuarios = require('./rutas/usuarios');


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

app.use('/privilegios', privilegios);
app.use('/API/usuarios', usuarios);

/*app.get('/', function (req, res) {
    return res.send('<h1>Titulo 1</h1><p>Este es un parrafo 1</p>')
});*/


app.all('*', function (req, res, next) {
    res.send('<h1>Pagina no encontrada</h1>')
});

app.listen(app.get('port'), function () {
    console.log('Servidor iniciado ', app.get('port'));
});