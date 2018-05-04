// Bibliografia
// https://arjunphp.com/creating-restful-api-express-js-node-js-mysql/
// https://www.youtube.com/watch?v=pz_4UOHq594&list=PLEw4347lfIFG8mL96p2metxqBa0LsL8MC&index=2
// https://www.youtube.com/watch?v=FBguazxFbVo&index=3&list=PLEw4347lfIFG8mL96p2metxqBa0LsL8MC

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');/*Necesario para la configuracion del view engine*/


const privilegios = require('./rutas/privilegios');
const usuarios = require('./rutas/usuarios');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*Configuracion de puerto*/
app.set('port', process.env.PORT || 3000);


/*Configuracion para el soporte de request*/
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

/*setup engine view*/
app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/privilegios', privilegios);
app.use('/API/usuarios', usuarios);

app.get('/', function (req, res) {
    res.render('index');
});


app.all('*', function (req, res, next) {
    res.send('<h1>Pagina no encontrada</h1>')
});

app.listen(app.get('port'), function () {
    console.log('Servidor iniciado ', app.get('port'));
});