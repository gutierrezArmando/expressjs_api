const express = require('express');
const app = express.Router();

app.get('/',function (req, res) {
    console.log('privilegios iniciado');
    res.send('<h1>Privilegios iniciados desde archivo estructurado</h1>');
});

app.get('/segunda', function (req, res) {
    res.send('<h1 style="color: #1b6d85">Privilegios iniciados desde archivo estructurado 2</h1>')
})

app.get('/tercera', function (req, res) {
    res.send('<h1 style="color: #ac2925">Privilegios iniciados desde archivo estructurado 3</h1>')
})

module.exports = app;