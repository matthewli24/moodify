const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const Keys = require('./keys');

passport.use(
  new SpotifyStrategy(
    {
      clientID: Keys.spotify.clientID,
      clientSecret: Keys.spotify.clientSecret,
      callbackURL: 'https://moodifysongs.firebaseapp.com/api/v1/auth/spotify/redirect'
    },
    (accessToken, refreshToken, expires_in, profile, done) => { 
      console.log("----------- using spotify strategy ----------- ");
      console.log(profile);
    }
  )
);