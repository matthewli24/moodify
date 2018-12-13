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

function getTracks(playlistId, access_token, callback, retry = 3) {
    let options = {
        url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    request.get(options, (error, response, body) => {
        const status = response.statusCode;
        if (!error && (status === 200 || status === 201)) {
            let trackIds = new Set();
            for (const item of body.items) {
                trackIds.add(item.track.id);
            }
            callback(Array.from(trackIds));
        }
        else if (error && retry > 0) {
            getTracks(playlistId, access_token, callback, retry - 1);
        }
    });
}

function getAudioFeatures(trackIds, access_token, callback, retry = 3) {
    const query = trackIds.join();
    let options = {
        url: `https://api.spotify.com/v1/audio-features/?ids=${query}`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    request.get(options, (error, response, body) => {
        const status = response.statusCode;
        if (!error && (status === 200 || status === 201)) {
            const audioFeatures = body.audio_features;
            let features = new Array();
            for (let feat of audioFeatures) {
                const audioFeature = {
                    id: feat.id,
                    danceability: feat.danceability,
                    energy: feat.energy,
                    key: feat.key,
                    loudness: feat.loudness,
                    mode: feat.mode,
                    speechiness: feat.speechiness,
                    acousticness: feat.acousticness,
                    instrumentalness: feat.instrumentalness,
                    liveness: feat.liveness,
                    valence: feat.valence,
                    tempo: feat.tempo
                }
                features.push(audioFeature);
            }
            callback(features);
        }
        else if (error && retry > 0) {
            getAudioFeatures(trackIds, access_token, callback, retry - 1);
        }
        else {
            console.log(error);
        }
    });
}

//*******************testing stuff ********************************
var tracks = ['2VjtYe7gpfUi2OkGxR2O2z', '4yweVeiVhklj00DRKcQi9z']

//filterBy should be object { property: conditionFunc }
function filterFeatures(audioFeatures, filterBy) {
    const filtered = audioFeatures.filter(track => {
        const features = Objects.keys(track);
        const conditionFunc = filterBy[feature];
        return conditionFunc(featureVal);
    });
    return filtered;
}

var filter = {
    energy: (val) => { val > 0.7 && val < 0.9 }
}

function filterByEnergy(playlistId, energy, access_token) {
    getTracks(playlistId, access_token, tracks)
}

getToken(access_token => {
    getTracks("37i9dQZF1DXaK0O81Xtkis", access_token, tracks => {
        let token = access_token;
        // console.log(token);

        // getAudioFeatures (tracks, token, features => {
        //     console.log(token);
        //     // console.log(features);
        // });
    });
})
//************************* refresh function ****************************
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

//**************************************************************** 

function createPlaylist(user, access_token, callback, retry = 3) {
    const playlistDetails = {
        name: 'Moodify',
        description: 'Created playlist based on mood!',
        public: false
    }
    let options = {
        url: `https://api.spotify.com/v1/users/${user}/playlists`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: playlistDetails
    };

    request.post(options, (error, response, body) => {
        const status = response.statusCode;
        if (!error && (status === 200 || status === 201)) {
            callback(body.id)
        }
        else if (error && retry > 0) {
            createPlaylist(user, access_token, callback, retry - 1);
        }
        else {
            res.json(error);
        }
    });
};

//******** testing createPlaylist *********/
const username = req.user.spotifyId;
getToken(access_token => {
    createPlaylist(username, access_token, playlistId => {
        let token = access_token;
        console.log(token)
    });
})

module.exports = router;