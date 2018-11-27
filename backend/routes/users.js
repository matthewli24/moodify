const express = require('express');
const router = express.Router();
const User = require('../models').User;

//TODO: Protect Access to These Endpoints

router.get('/:userid', (req, res, next) => {
  const userid = req.params.userid;
  User.findByPk(userid).then((user) => {
    res.json(user);
  });
});

router.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const user = req.user;
  if (user) {
    res.json({
      id: user.spotifyId,
      email: user.email
    });
  }
  else {
    res.json({ error: 'no user' });
  }
});

module.exports = router;
