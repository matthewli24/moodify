const express = require('express');
const request = require('request');
const _ = require('underscore');
const axios = require('axios');
const router = express.Router();
const keys = require('../config/keys');
const bodyParser = require('body-parser');
const utils = require('./utils');
var createdPlaylistId;
var playlistId;
var songEnergy;
var songLoudness;
var songValence;
var artistId;
var artistIds = [];
var trackIdArr = [];
var trackIds;

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

router.get('/playlist', (req, res) => {
    //ex. http://localhost:8000/playlist?mood=0&energy=0.6
    const mood = req.query.mood;
    const energy = parseFloat(req.query.energy);
    const access_token = req.session.access_token;
    const user = req.user.spotifyId;

    utils.createPlaylist(user, access_token, (playlistId) => {
        utils.filteredTracks(mood, access_token, 'energy', val => {
            return val => energy-0.2 && val <= energy+0.2;
        })
        .then(tracks => {
            //add tracks
            const trackIds = (_.sample(tracks, 15)).join();
            let options = {
                url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackIds}`,
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            };

            request.post(options, trackIds, (error, response, body) => {
                const status = response.statusCode;
                if (!error && (status === 200 || status === 201)) {
                    const url = `https://api.spotify.com/v1/playlists/${playlistId}?fields=external_urls`;

                    const config = {
                        url: url,
                        headers: { 'Authorization': 'Bearer ' + access_token }
                    };

                    axios(config)
                        .then(response => {
                            let link = response.data.external_urls.spotify;
                            link = link.replace('/playlist/',`/embed/user/${user}/playlist/`);
                            res.json(link);
                        })
                        .catch(err => {
                            res.json(err);
                        })
                }
            });
        })
    })
});

//create playlist
router.get('/createplaylist', (req, res) => {
    const access_token = req.session.access_token;
    const user = req.user.spotifyId;
    const playlistDetails = {
        name: 'Moodify',
        public: false
    }
    let options = {
        url: `https://api.spotify.com/v1/users/${user}/playlists`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: playlistDetails
    };

   
    request.post(options, (error, response, body) => {
        //set the playlistId to the recently created playlist id
        createdPlaylistId = body.id;
        if (!error) {
            res.json(response);
        }
        else if (response.statusCode === 401) { //expired
            console.log('token expired, refreshing');
            refresh(req.session.refresh_token, (newToken => {
                req.session.access_token = newToken;
                options.headers.Authorization = 'Bearer ' + newToken;

                request.get(options, (error, response, body) => {
                    createdPlaylistId = body.id;
                    if (!error) {
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

// add tracks to the created playlist
router.get('/addtrack', (req, res) => {
    const access_token = req.session.access_token;
    const user = req.user.spotifyId;
    let options = {
        url: `https://api.spotify.com/v1/playlists/${createdPlaylistId}/tracks?uris=${trackIds}`,
        headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/json'},
        json: true
    };
   
   
    request.post(options, trackIds, (error, response, body) => {
        if (!error) {
            res.json(response);

        }
        else if (response.statusCode === 401) { //expired
            console.log('token expired, refreshing');
            refresh(req.session.refresh_token, (newToken => {
                req.session.access_token = newToken;
                options.headers.Authorization = 'Bearer ' + newToken;

                request.get(options, trackIds, (error, response, body) => {
                    if (!error) {
                        res.json(response);
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

//test playlist id
playlistId = "1Lo5eQOV3xxZPNb4XkOc46"
// get tracks from a playlist
router.get('/playlisttracks', (req, res) => {
    const access_token = req.session.access_token;
    let options = {
        url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    // use the access token to access the Spotify Web API
    request.get(options, (error, response, body) => {
        if (!error) {
            for(var i=0; i<body.items.length; i++){
           trackIdArr[i] = body.items[i].track.id;
            }
        //get the tracks id from tackIdArray and put them in a string
        for(var i=0; i<trackIdArr.length; i++){
            if(i === 0){
                trackIds = 'spotify:track:' + trackIdArr[i] + ',';
            }
            else if(i === trackIdArr.length-1){
                 trackIds = trackIds + 'spotify:track:' + trackIdArr[i];
             }
             else{
                trackIds = trackIds + 'spotify:track:' + trackIdArr[i] + ',';
            }
         }
         console.log(trackIds);
            res.json(response);
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


// get users followed artists
router.get('/followedartists', (req, res) => {
    const access_token = req.session.access_token;
    let options = {
        url: 'https://api.spotify.com/v1/me/following?type=artist',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    // use the access token to access the Spotify Web API
    request.get(options, (error, response, body) => {
        if (!error) {
            for(var i=0; i<body.artists.items.length; i++){
            artistIds[i] = body.artists.items[i].id;
            }
            res.json(body);
        }
        else if (response.statusCode === 401) { //expired
            console.log('token expired, refreshing');
            refresh(req.session.refresh_token, (newToken => {
                req.session.access_token = newToken;
                options.headers.Authorization = 'Bearer ' + newToken;

                request.get(options, (error, response, body) => {
                    if (!error) {
                        for(var i=0; i<body.artists.items.length; i++){
                            artistIds[i] = body.artists.items[i].id;
                            }
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


//get artists top tracks
router.get('/artiststoptracks', (req, res) => {
    const access_token = req.session.access_token;
    let options = {
        url: `https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=US`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    // use the access token to access the Spotify Web API
    request.get(options, (error, response, body) => {
        if (!error) {
            for(var i=0; i<10; i++){
            trackIdArr[i] = body.tracks[i].id;
            }
            res.json(body);
        }
        else if (response.statusCode === 401) { //expired
            console.log('token expired, refreshing');
            refresh(req.session.refresh_token, (newToken => {
                req.session.access_token = newToken;
                options.headers.Authorization = 'Bearer ' + newToken;

                request.get(options, (error, response, body) => {
                    if (!error) {
                        for(var i=0; i<10; i++){
                            trackIdArr[i] = body.tracks[i].id;
                            }
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