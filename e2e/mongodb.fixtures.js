/**
 * Author: Luis Rosales
 **/
'use strict';
const mongoose = require('mongoose');
const Advertisement = require('../models/Advertisement');
const Tag = require('../models/Tag');

module.exports.initAdvertisements = async function(){
    await Advertisement.remove({});
    await Advertisement.insertMany([
        {
            "name": "Bicicleta",
            "isSale": true,
            "price": 230.15,
            "photo": "bici.png",
            "tags": [ "lifestyle", "motor"]
        },
        {
            "name": "iPhone 3GS",
            "isSale": false,
            "price": 50.00,
            "photo": "iphone.png",
            "tags": [ "lifestyle", "mobile"]
        },
        {
            "name": "Samsung S7",
            "isSale": true,
            "price": 700.00,
            "photo": "samsung.png",
            "tags": [ "lifestyle", "mobile"]
        },
        {
            "name": "MacBook Pro",
            "isSale": false,
            "price": 900.00,
            "photo": "macbook.png",
            "tags": [ "lifestyle", "work"]
        }
    ]);
}

module.exports.initTags = async function(){
    await Tag.remove({});
    await Tag.insertMany([
        {
            "name": "Work"
        },
        {
            "name": "Lifestyle"
        },
        {
            "name": "Motor"
        },
        {
            "name": "Mobile"
        }
    ]);
}