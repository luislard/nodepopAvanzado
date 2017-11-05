'use strict';

const mongoose = require('mongoose');
var hash = require('hash.js')

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

userSchema.statics.hashPassword = function(plain) {
  return hash.sha256().update(plain).digest('hex');
}

userSchema.statics.deleteAll = function(callback){
    User.remove({}, function (err) {
        if (err) return callback(err);
        callback(null);
    });
}

userSchema.statics.fixNotHashedPassword = function(userWithNotHasehPassword){
    
    const hashedPassword = User.hashPassword(userWithNotHasehPassword.password);

    const userWithHashedPassword = {
        name: userWithNotHasehPassword.name,
        email: userWithNotHasehPassword.email,
        password: hashedPassword
    };

    return userWithHashedPassword;
}

var User = mongoose.model('User', userSchema);

module.exports = User;
