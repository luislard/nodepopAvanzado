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

// module.exports.initUsers = async function(){
//     await User.remove({});
//     populateUsers(data);
// }

// function populateUsers(data) {
//     for (let i = 0; i < data.users.length; i++) {
//         console.log(data.users[i].password);
//         data.users[i].password = User.hashPassword(data.users[i].password);

//         let user = new User(data.users[i]);
//         user.save(function (err,savedUser) {
//             if (err) throw err;
//             console.log('User '+ savedUser.name+' was created');
//         });
//     }
// }