const  mysql = require('mysql');

const dbContection = mysql.createConnection({
    // host: 'juridicosoto.sytes.net',
    // host: 'localhost',
    host: '192.168.1.70',
    user: 'armando',
    password: 'jagn@plexy',
    database: 'dbtareas'
});

module.exports = dbContection;