const express = require('express');
const request = require('request');
const router = express.Router();
const keys = require('../config/keys');

//just to test that session saved access_token works
router.get('/me', (req, res) => {
    const access_token = req.session.access_token;
    let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    // use the access token to access the Spotify Web API
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        }
        else if (response.statusCode === 401) { //expired
            console.log('token expired, refreshing');
            refresh(req.session.refresh_token, (newToken => {
                req.session.access_token = newToken;
                options.headers.Authorization = 'Bearer ' + newToken;

                request.get(options, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        res.json(body);
                    }
                    else {
                        res.json(error);
                    }
                });
            }));
        }
        else {
            res.json(error);
        }
    });
})

function refresh(refresh_token, callback) {
    //use the token received in the `callback` function
    const client_id = keys.spotify.clientID;
    const client_secret = keys.spotify.clientSecret;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(body.access_token);
        }
        else {
            console.log(error);
        }
    });
}

router.get('/refresh_token', (req, res) => {
    // requesting access token from refresh token
    const client_id = keys.spotify.clientID;
    const client_secret = keys.spotify.clientSecret;
    const refresh_token = req.session.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            //save access_token to session
            req.session.access_token = access_token;
        }
        res.send({
            'access_token': access_token
        });
    });
});

module.exports = router;