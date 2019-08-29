const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.send("hitting auth routes");
});

//auth login with spotify
router.get('/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private', 'user-top-read', 'user-read-recently-played', 'playlist-modify-private', 'user-library-read', 'playlist-modify-public', 'user-follow-read'],
  showDialog: true
  })
);

//redirect URI
router.get('/spotify/redirect', (req, res) => {
    res.send("you reached the callback URI");
  }
);

//logging out 
router.get('/logout', (req, res) => {
  //handle with passport???
  // req.logout();
  // req.session.destroy((err) => {
  //     res.redirect('https://www.spotify.com/logout');
  // });
});


module.exports = router;