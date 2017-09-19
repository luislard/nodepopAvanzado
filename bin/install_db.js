/**
 * Author: Luis Rosales
 **/
'use strict';

require('../lib/connectMongoose');

const Advertisement = require('../models/Advertisement');
const data = require('../lib/advertisements.json');

Advertisement.deleteAll(function(){
    console.log('Borramos todos los advertisements existentes.');
});

console.log('/*************/');
console.log(data.anuncios.length);
console.log('/*************/');

for (let i = 0; i < data.anuncios.length; i++) {
    const advertisement = new Advertisement(data.anuncios[i]);

    advertisement.save(function (err,savedAdvertisement) {
        if (err) throw err;
        console.log('Advertisement '+ savedAdvertisement.name+' was created');
    });
}


