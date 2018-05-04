const  mysql = require('mysql');

const dbContection = mysql.createConnection({
    host: 'localhost',
    user: 'armando',
    password: 'jagn@plexy',
    database: 'despacho'
});

module.exports = dbContection;