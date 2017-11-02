/**
 * Author: Luis Rosales
 **/
'use strict';


const mongoose = require('mongoose');

const conn = mongoose.connection;

// colocamos unas funciones a ejecutar por un evento.
conn.on('error', err => {
    console.log('Error de conexión', err);
    process.exit('1');
});

// colocamos unas funciones a ejecutar por un evento.
conn.once('open', () => {
    console.log('Conectado a mongo Db on', mongoose.connection.name);
});

// esta es la conexion como tal
// la cadena de conexion es como una URL pero con protocolo mongodb
// conn.connect('mongodb://localhost:1234/cursonode'); si la conexion no esta en el puerto por defecto
mongoose.connect('mongodb://localhost/cursonode', {
    useMongoClient: true // para que no salga el Deprecation Warning
}); // si la conexion esta en el puerto por defecto

// no necesitamos exportar la conexión ya que mongoose se encarga de mantenerla internamente