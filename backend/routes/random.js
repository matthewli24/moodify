const express = require('express');
const request = require('request');
const router = express.Router();
const keys = require('../config/keys');

function getToken(callback) {
    const client_id = keys.spotify.clientID;
    const client_secret = keys.spotify.clientSecret;

    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        const status = response.statusCode;
        if (!error && (status === 200 || status === 201)) {
            callback(body.access_token);
        }
        else {
            console.log(error);
        }
    });
}

function getTracks(playlistId, callback, access_token, retry=3) {
    let options = {
        url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    request.get(options, (error, response, body) => {
        const status = response.statusCode;
        if (!error && (status === 200 || status === 201)) {
            let trackIds = new Set();
            for (let item of body.items) {
                trackIds.add(item.track.id);
            }
            callback(Array.from(trackIds));
        }
        else if (error && retry > 0) {
            getTracks(playlistId, callback, retry-1);
        }
    });
}



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

module.exports = router;