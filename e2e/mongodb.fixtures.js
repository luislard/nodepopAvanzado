/**
 * Author: Luis Rosales
 **/
'use strict';
const mongoose = require('mongoose');
const Advertisement = require('../models/Advertisement');
const Tag = require('../models/Tag');
const User = require('../models/User');
var data = require('../lib/data.json');

module.exports.initAdvertisements = async function(){
    await Advertisement.remove({});
    await Advertisement.insertMany(data.anuncios);
}

module.exports.initTags = async function(){
    await Tag.remove({});
    await Tag.insertMany(data.tags);
}

module.exports.initUsers = async function(){
    await User.remove({});
    await populateUsers(data);
}

module.exports.token = async function(){
    const email = 'user@example.com';
    const password = '1234';

    // hacemos un hash de la password
    const hashedPassword = User.hashPassword(password);

    const user = await User.findOne({ email: email, password: hashedPassword });

    if (!user) {
        // Respondemos que no son validas las credenciales
        return {ok: false, error: 'invalid credentials'};
    }

    // el usuario está y coincide la password
    
    // creamos el token
    jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '5m'
        }, (err, token) => {
        if (err) {
            return {ok: false, error: 'error on token creation'};
        }
        // respondemos con un JWT
        return {ok: true, token: token};

    });
}

function populateUsers(data){
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