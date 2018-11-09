const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('./keys');
const User = require('../models').User;

//TODO: will be changed later
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(
    new SpotifyStrategy(
        {
            clientID: keys.spotify.clientID,
            clientSecret: keys.spotify.clientSecret,
            callbackURL: '/auth/spotify/redirect'
        },
        (accessToken, refreshToken, expires_in, profile, done) => {
            const id = profile.id;
            User.findOne({
                where: { spotifyId: id },
            }).then( (user) => {
                if (user) {
                    console.log('user already exists');
                    return done(null, profile);
                }
                else {
                    const email = profile.emails[0].value;

                    new User({
                        spotifyId: profile.id,
                        email: email
                    }).save()
                    .then((newUser) => {
                        console.log(`new user created: ${newUser}`);
                        return done(null, profile);
                    });
                }
            })
            // return done(null,profile);
        }
    )
);