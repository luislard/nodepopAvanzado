/**
 * Author: Luis Rosales
 **/
'use strict';

require('../lib/connectMongoose');

const Advertisement = require('../models/Advertisement');
const Tag = require('../models/Tag');
const data = require('../lib/data.json');


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


Tag.deleteAll(function(){
    console.log('Borramos todos los tags existentes.');
});

console.log('/*************/');
console.log(data.tags.length);
console.log('/*************/');

for (let i = 0; i < data.tags.length; i++) {
    const tag = new Tag(data.tags[i]);

    tag.save(function (err,savedTag) {
        if (err) throw err;
        console.log('Tag '+ savedTag.name+' was created');
    });
}


