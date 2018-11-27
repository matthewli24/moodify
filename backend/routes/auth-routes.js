const express = require('express');
const router = express.Router();
const passport = require('passport');
const request = require('request');

//get access token
router.get('/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-top-read', 'user-read-recently-played', 'playlist-modify-private', 'user-library-read', 'playlist-modify-public'],
    showDialog: true
})
);

router.get('/spotify/redirect', passport.authenticate('spotify', { failureRedirect: '/spotify' }),
    (req, res, next) => {
        const user = req.user.user;
        if (req.isAuthenticated() && user){
            //extract tokens & save to sessions instead
            req.session.access_token = req.user.tokens.access;
            req.session.refresh_token = req.user.tokens.refresh;

            //restore passport's session info to just user id
            //(no more tokens in passport.session)
            req.session.passport.user = user.id;

            res.redirect('http://localhost:3000');
            // res.json({
            //     id: user.spotifyId,
            //     email: user.email
            // });
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

router.get('/get_session', (req, res) => {
    res.json(req.session);
});

router.get('/get_user', (req, res) => {
    res.json(req.user);
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;