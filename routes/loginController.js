'use strict';

const User = require('../models/User');
const i18n = require('../lib/i18nConfigure')();
const jwt = require('jsonwebtoken');

class LoginController {
  index(req, res, next) {
    res.locals.email = 'user@example.com'; // para que la vista tenga el email
    res.locals.error = '';
    res.render('login');
  }

  // POST /login
  post(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    // hacemos un hash de la password
    const hashedPassword = User.hashPassword(password);

    const user = User.findOne({ email: email, password: hashedPassword }, (error, user)=>{
      if (!user) {
        // Mantenemos al usuario en esta página
        res.locals.email = email; // para que la vista tenga el email que me mandó
        res.locals.error = i18n.__('Invalid credentials');
        res.render('login');
        return;
      }

      // el usuario está y coincide la password

      console.log('aqui ando 2',user);
      // creamos el token
      jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
      }, (err, token) => {
        if (err) {
          return next(err);
        }
        console.log('aqui ando 3',token);

        // agregamos el userId al request
        // req.userId = decoded._id;

        // le mandamos a la home
        res.redirect('/'); // no me funciona

      });
    });
      
  }


  // POST /api/authenticate
  async postLoginJWT(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body);
    // hacemos un hash de la password
    const hashedPassword = User.hashPassword(password);

    const user = await User.findOne({ email: email, password: hashedPassword });

    if (!user) {
      // Respondemos que no son validas las credenciales
      res.json({ok: false, error: 'invalid credentials'});
      return;
    }

    // el usuario está y coincide la password
    
    // creamos el token
    jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d'
    }, (err, token) => {
      if (err) {
        return next(err);
      }
      // respondemos con un JWT
      res.json({ok: true, token: token});

    });
  }

  logout(req, res, next) {
    delete req.session.authUser;
    req.session.regenerate(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }
}

module.exports = new LoginController();
