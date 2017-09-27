/**
 * Author: Luis Rosales
 **/
'use strict';


const mongoose = require('mongoose');

// definir un programa
const advertisementSchema = mongoose.Schema({
    name: { type: String, index: true },
    isSale: { type: Boolean, index: true },
    price: { type: Number, index: true },
    photo: { type: String, index: false },
    tags: { type: [String], index: true }
});

// Añadimos el metodo estático
advertisementSchema.statics.list = function(filter, skip, limit, callback){
    const query = Advertisement.find(filter); // aqui todavia no ejecuta la consulta
    query.skip(skip);
    query.limit(limit);
    return query.exec(callback);
}


advertisementSchema.statics.deleteAll = function(callback){
    Advertisement.remove({}, function (err) {
        if (err) return callback(err);
        callback(null);
    });
}


// crear el modelo


// no es necesario exportar el modelo
// ya que mongoose ya lo conoce

// mongoose.model('Agente', agenteSchema);
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;