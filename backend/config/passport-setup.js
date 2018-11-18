const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('./keys');
const User = require('../models').User;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        done(null, user);
    });
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
                    return done(null, user);
                }
                else {
                    const email = profile.emails[0].value;

                    new User({
                        spotifyId: profile.id,
                        email: email
                    }).save()
                    .then((newUser) => {
                        console.log(`new user created: ${newUser}`);
                        return done(null, newUser);
                    });
                }
            })
            // return done(null,profile);
        }
    )
);