const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'leisyleisy',
    database: 'test'
});

db.connect((err) => {
    if(err){
        console.log(err);
    }else{
        console.log('Conectado a MySQL');
    }
});

module.exports = db;