const  mysql = require('mysql');

const dbContection = mysql.createConnection({
    host: '192.168.1.70',
    user: 'armando',
    password: 'jagn@plexy',
    database: 'despacho'
});

module.exports = dbContection;