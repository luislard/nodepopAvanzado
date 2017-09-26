/**
 * Author: Luis Rosales
 **/
'use strict';


const mongoose = require('mongoose');

// definir un programa
const tagSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    }
});

// Añadimos el metodo estático
tagSchema.statics.list = function(filter, skip, limit, callback){
    const query = Advertisement.find(filter); // aqui todavia no ejecuta la consulta
    query.skip(skip);
    query.limit(limit);
    return query.exec(callback);
}


tagSchema.statics.deleteAll = function(callback){
    Tag.remove({}, function (err) {
        if (err) return callback(err);
        callback(null);
    });
}


// crear el modelo


// no es necesario exportar el modelo
// ya que mongoose ya lo conoce

// mongoose.model('Agente', agenteSchema);
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;