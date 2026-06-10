const express = require('express');
const path = require('path');
const db = require('../conexion');
const methodOverride = require('method-override');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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

/* Mostrar registros */
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM personas';

    db.query(sql, (err, resultados) => {
        if (err) {
            console.log('ERROR AL CONSULTAR');
            console.log(err);
            return res.send('Error al consultar');
        }

        res.render('home', {
            personas: resultados
        });
    });
});

app.post('/personas', (req, res) => {
    const { nombre, correo, edad } = req.body;

    const sql =
        'INSERT INTO personas(nombre, correo, edad) VALUES (?, ?, ?)';

    db.query(sql, [nombre, correo, edad], (err) => {
        if (err) {
            console.log('ERROR AL GUARDAR');
            console.log(err);
            return res.send('Error al guardar');
        }

        console.log('REGISTRO GUARDADO');
        res.redirect('/');
    });
});
/* Actualizar */
app.post('/actualizar', (req, res) => {

    const { id, nombre, correo, edad } = req.body;

    const sql =
        'UPDATE personas SET nombre = ?, correo = ?, edad = ? WHERE id = ?';

    db.query(sql, [nombre, correo, edad, id], (err) => {

        if (err) {
            console.log(err);
            return res.send('Error al actualizar');
        }

        res.redirect('/');

    });

});

/* Eliminar uno */
app.delete('/personas/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM personas WHERE id = ?';

    db.query(sql, [id], (err) => {
        if (err) {
            console.log('ERROR AL ELIMINAR');
            console.log(err);
            return res.send('Error al eliminar');
        }

        console.log('REGISTRO ELIMINADO');
        res.redirect('/');
    });
});

/* Eliminar todos */
app.delete('/personas', (req, res) => {
    const sql = 'DELETE FROM personas';

    db.query(sql, (err) => {
        if (err) {
            console.log(err);
            return res.send('Error al eliminar todos');
        }

        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});