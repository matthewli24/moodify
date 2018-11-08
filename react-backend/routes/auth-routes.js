var express = require('express');
var router = express.Router();

router.post('/spotify', (req, res) => {
  res.send('login with spotify');
});

router.get('/logout', (req, res) => {
  res.send('logged out');
});

module.exports = router;
