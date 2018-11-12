const express = require('express');
const router = express.Router();
const passport = require('passport');

//get access token
router.get('/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-top-read', 'user-read-recently-played', 'playlist-modify-private', 'user-library-read', 'playlist-modify-public']
})
);

//got token, do passport callback, then respond 
router.get('/spotify/redirect', passport.authenticate('spotify', { failureRedirect: '/spotify' }),
    (req, res) => {
        res.redirect("/");
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;