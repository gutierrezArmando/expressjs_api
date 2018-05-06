const  mysql = require('mysql');

const dbContection = mysql.createConnection({
    // host: 'juridicosoto.sytes.net',
    host: 'localhost',
    user: 'armando',
    password: 'jagn@plexy',
    database: 'dbtareas'
});

module.exports = dbContection;