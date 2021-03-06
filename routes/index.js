var express = require('express');
var router = express.Router();
const i18n = require('i18n');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET create page. */
router.get('/create', function(req, res, next) {
  res.render('create');
});

router.get('/lang/:locale', function(req, res, next) {
  
  const locale = req.params.locale;
  const referer = req.query.redir || req.get('referer');
  console.log(locale);

  res.cookie('nodepopAvanzado-lang', locale, {maxAge:90000, httpOnly:true});
  res.redirect(referer);
});

module.exports = router;
