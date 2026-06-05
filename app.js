const express = require('express');
const path = require('path');
const db = require('../conexion');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

app.set(
    'views',
    path.join(__dirname, '..', 'layouts', 'views')
);

app.use(
    express.static(
        path.join(__dirname, '..', 'public')
    )
);

/* Mostrar formulario y registros */
app.get('/', (req, res) => {

    const sql = 'SELECT * FROM personas';

    db.query(sql, (err, resultados) => {

        if (err) {
            console.log('ERROR AL CONSULTAR:');
            console.log(err);
            return res.send('Error al consultar');
        }

        console.log('DATOS ENCONTRADOS:');
        console.log(resultados);

        res.render('home', {
            personas: resultados
        });

    });

});

/* Guardar */
app.post('/guardar', (req, res) => {

    const { nombre, correo, edad } = req.body;

    const sql =
        'INSERT INTO personas (nombre, correo, edad) VALUES (?, ?, ?)';

    db.query(sql, [nombre, correo, edad], (err, result) => {

        if (err) {
            console.log('ERROR AL GUARDAR:');
            console.log(err);
            return res.send('Error al guardar');
        }

        console.log('REGISTRO GUARDADO');

        res.redirect('/');

    });

});

/* Eliminar */
app.post('/eliminar/:id', (req, res) => {

    const id = req.params.id;

    const sql =
        'DELETE FROM personas WHERE id = ?';

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log('ERROR AL ELIMINAR:');
            console.log(err);
            return res.send('Error al eliminar');
        }

        console.log('REGISTRO ELIMINADO');

        res.redirect('/');

    });

});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});