const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

admin.initializeApp();
const firestore = admin.firestore();

const app = express();
app.use(cors());

/**********************************************************
 *                    API ENDPOINTS
 **********************************************************/

app.get('/api/v1', (req, res) => {
  res.send("Welcome to Moodify's API");
});


exports.api = functions.https.onRequest(app);