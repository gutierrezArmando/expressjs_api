const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('Servidor iniciado ', app.get('port'));
});

app.get('/', function (req, res) {
    return res.send('<h1>Titulo 1</h1><p>Este es un parrafo 1</p>')
});