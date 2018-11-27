const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('./keys');
const User = require('../models').User;

passport.serializeUser((userSession, done) => {
    const session = {
        id: userSession.user.id, 
        tokens: userSession.tokens
    } 
    //token info is extracted by 'redirect' endpoint
    done(null, session);
});

passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
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
            }).then((user) => {
                const tokens = {
                    access: accessToken,
                    refresh: refreshToken,
                    expires: expires_in
                };
                if (user) {
                    console.log('user already exists');
                    return done(null, {
                        user: user, 
                        tokens: tokens
                    });
                }
                else {
                    const email = profile.emails[0].value;

                    new User({
                        spotifyId: profile.id,
                        email: email
                    }).save()
                    .then((newUser) => {
                        console.log(`new user created: ${newUser}`);
                        return done(null, {
                            user: newUser,
                            tokens: tokens
                        });
                    });
                }
            })
        }
    )
);