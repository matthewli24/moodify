const request = require('request');
const axios = require('axios');
const _ = require('underscore');
const playlists = require('./data/playlists.json');

// For testing only //
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
// End testing code //

function getTracks(playlistId, access_token) {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    let config = {
        method: 'get',
        url: url,
        headers: { 'Authorization': 'Bearer ' + access_token }
    };
    return axios(config)
        .then(response => {
            const body = response.data;
            let trackIds = new Set();
            for (const item of body.items) {
                trackIds.add(item.track.id);
            }
            return Array.from(trackIds);
        })
}

function getAudioFeatures(trackIds, access_token) {
    const query = trackIds.join();
    let config = {
        method: 'get',
        url: `https://api.spotify.com/v1/audio-features/?ids=${query}`,
        headers: { 'Authorization': 'Bearer ' + access_token },
    };

    return axios(config)
        .then(response => {
            const body = response.data;
            const audioFeatures = body.audio_features;
            let features = new Array();
            for (let feat of audioFeatures) {
                if (feat) {
                    const audioFeature = {
                        id: feat.uri,
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
            }
            return features
        })
}

function filterBy(features, key, condition) {
    if (features) {
        let filtered = new Array();
        for (let track of features) {
            const featureVal = track[key];
            if (condition(featureVal)) {
                filtered.push(track.id)
            }
        }
        return filtered;
    }
}

module.exports = {
    filteredTracks: function (index, access_code, key, condition) {
        const lists = playlists[index];
        let promises = new Array();
        for (let id of lists) {
            promises.push(getTracks(id, access_code));
        }

        // tracks in playlists
        return axios.all(promises)
            .then(axios.spread((...responses) => {
                let allTracks = new Array();
                for (let playlistTracks of responses) {
                    allTracks.push(...playlistTracks);
                }
                const result = Array.from(new Set(allTracks));
                const n = (result.length > 60) ? 60 : result.length
                return _.sample(result, n);
            }))
            .then(tracks => {
                const floatNum = tracks.length;
                const numLists = (floatNum % 10 !== 0) ? parseInt(floatNum) + 1 : floatNum;

                let featPromises = new Array();
                for (let i = 0; i < numLists; i++) {
                    let sliced = [];
                    if (i + 10 < floatNum) {
                        sliced = tracks.slice(i, i + 10);
                    }
                    else {
                        sliced = tracks.slice(i);
                    }
                    featPromises.push(getAudioFeatures(sliced, access_code));
                }
                return axios.all(featPromises)
                    .then(axios.spread((...featResponses) => {
                        let filteredTracks = new Array();
                        for (let featResponse of featResponses) {
                            let filtered = filterBy(featResponse, key, condition);
                            if (filtered) {
                                filteredTracks.push(...filtered);
                            }
                        }
                        return filteredTracks;
                    }))
            })
    },
    createPlaylist: function (user, access_token, callback, retry = 3) {
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
                console.log(error);
            }
        });
    }
}




//Testy Test
/*
const playlistId = "37i9dQZF1DXaK0O81Xtkis";
const access_code = "BQAkOIt5BEznpTHsEN8WKhb-7V5ihjCW2alw9wGK2F5ouJABUmNTFHmRLr8f6yPd_rM0QRcF0qwvwzDk9L8";

// getToken(response => console.log(response))

filteredTracks(2, access_code, 'energy', value => {
    return (value > 0.9);
})
    .then(response => console.log(response))
  // .catch(err => console.log(err))

// getTracks(playlistId, access_code)
//   .then(tracks => getAudioFeatures(tracks, access_code))
//   .then(features => filterBy(features, 'energy', value => {
//     return (value > 0.9);
//   }))
//   .then(response => console.log(response))
//   .catch(err => console.log(err))
*/