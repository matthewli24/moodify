const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  console.log(req.user);
  res.render('index.html', { user: req.user });
});

router.get('/login', function (req, res) {
  console.log(req.user);
  res.render('login.html', { user: req.user });
});

router.get('/logout', function (req, res) {
  console.log(req.user);
  req.logout();
  res.redirect('/');
});

router.get('/playlist', (req, res) => {
  //ex. http://localhost:8000/playlist?mood=happy&energy=0.6
  const mood = req.query.mood;
  const energy = req.query.energy;
  if (!mood || !energy) {
    res.json({
      'error': 'please send mood and energy values'
    });
  }
  else {
    res.json({
      'playlist': 'https://open.spotify.com/embed/user/supermattmatt/playlist/4ONG7Bh2U9VneMkMdjGCL7'
    });
  }
});

module.exports = router;
