const express = require('express');
const router = express.Router();
const User = require('../models').User;

router.get('/:userid', (req, res, next) => {
  const userid = req.params.userid;
  User.findByPk(userid).then((user) => {
    res.json(user);
  });
});

module.exports = router;
