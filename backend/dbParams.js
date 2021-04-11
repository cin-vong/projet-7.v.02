const mysql = require('mysql');

const dbParams = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'groupomania'
});

module.exports = dbParams;
