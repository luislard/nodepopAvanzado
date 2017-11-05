/**
 * Author: Luis Rosales
 **/
'use strict';

require('../lib/connectMongoose');

const Advertisement = require('../models/Advertisement');
const Tag = require('../models/Tag');
const User = require('../models/User');
var data = require('../lib/data.json');


Advertisement.deleteAll(()=>{
    console.log('Borramos todos los advertisements existentes.');
    populateAdvertisements(data);
});

function populateAdvertisements(data) {

    for (let i = 0; i < data.anuncios.length; i++) {
        const advertisement = new Advertisement(data.anuncios[i]);

        advertisement.save(function (err,savedAdvertisement) {
            if (err) throw err;
            console.log('Advertisement '+ savedAdvertisement.name+' was created');
        });
    }
}


Tag.deleteAll(()=>{
    console.log('Borramos todos los tags existentes.');
    populateTags(data);
});

function populateTags(data) {
    for (let i = 0; i < data.tags.length; i++) {
        const tag = new Tag(data.tags[i]);

        tag.save(function (err,savedTag) {
            if (err) throw err;
            console.log('Tag '+ savedTag.name+' was created');
        });
    }
}

User.deleteAll(()=>{
    console.log('Borramos todos los users existentes.');
    populateUsers(data);
});

function populateUsers(data) {
    for (let i = 0; i < data.users.length; i++) {
        console.log(data.users[i].password);
        data.users[i].password = User.hashPassword(data.users[i].password);

        let user = new User(data.users[i]);
        user.save(function (err,savedUser) {
            if (err) throw err;
            console.log('User '+ savedUser.name+' was created');
        });
    }
}


