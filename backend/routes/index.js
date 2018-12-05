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
  
  //hardcoded playlists must be embed urls
  const happyPlaylist = 'https://open.spotify.com/embed/user/supermattmatt/playlist/00JVXC1Hl6sQh1PrWYnoCY';
  const someWhatHappyPlaylist = 'https://open.spotify.com/embed/user/supermattmatt/playlist/5RnCtWnC9fNxzxLJdZKUr8';
  const neutralPlaylist = 'https://open.spotify.com/embed/user/supermattmatt/playlist/7vXljQJ60INKMt2fGyv824';
  const sadPlaylist = 'https://open.spotify.com/embed/user/supermattmatt/playlist/7g2bvPqfuxkHAZxHxXeWvc';
  const angryPlaylist = 'https://open.spotify.com/embed/user/supermattmatt/playlist/1PBCcBhKBSmNcS9KrvKaRp';
  if (!mood || !energy) {
    res.json({
      'error': 'please send mood and energy values'
    });
  }
  else if (mood == 0) {
    res.json({
      'playlistURL': angryPlaylist
    });
  }
  else if (mood == 1) {
    res.json({
      'playlistURL': sadPlaylist
    });
  }
  else if (mood == 2) {
    res.json({
      'playlistURL': neutralPlaylist
    });
  }
  else if (mood == 3) {
    res.json({
      'playlistURL': someWhatHappyPlaylist
    });
  }
  else if (mood == 4) {
    res.json({
      'playlistURL': happyPlaylist
    });
  }
});

module.exports = router;