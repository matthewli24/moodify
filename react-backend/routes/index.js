var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index.html', { user: req.user });
});

router.get('/login', function (req, res) {
  res.render('login.html', { user: req.user });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
