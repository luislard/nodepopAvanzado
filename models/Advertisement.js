/**
 * Author: Luis Rosales
 **/
'use strict';


const mongoose = require('mongoose');

// definir un programa
const advertisementSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    age: {
        type: Number,
        index: true
    }
});

// Añadimos el metodo estático
advertisementSchema.statics.list = function(filter, skip, limit, callback){
    const query = Agente.find(filter); // aqui todavia no ejecuta la consulta
    query.skip(skip);
    query.limit(limit);
    return query.exec(callback);
}


// crear el modelo


// no es necesario exportar el modelo
// ya que mongoose ya lo conoce

// mongoose.model('Agente', agenteSchema);
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;