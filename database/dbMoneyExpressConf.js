const  mysql = require('mysql');

const dbContection = mysql.createConnection({
    // host: 'juridicosoto.sytes.net',
    host: '104.238.82.226',
    user: 'dexpress_dev',
    password: 'pBWxtOqgColK11mDrZ',
    database: 'dexpress_pruebas'
});

module.exports = dbContection;