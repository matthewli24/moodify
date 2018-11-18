const express = require('express');
const router = express.Router();
const passport = require('passport');

//get access token
router.get('/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-top-read', 'user-read-recently-played', 'playlist-modify-private', 'user-library-read', 'playlist-modify-public'],
    showDialog: true
})
);

router.get('/spotify/redirect', passport.authenticate('spotify', { failureRedirect: '/spotify' }),
    (req, res, next) => {
        const user = req.user;
        if (req.isAuthenticated() && user){
            res.json({
                id: user.spotifyId,
                email: user.email
            });
        }
        else {
            res.json({error: 'no user'});
        }
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.redirect('https://www.spotify.com/logout');
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;