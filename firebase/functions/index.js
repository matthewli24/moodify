const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const authRoutes = require('./routes/authRoutes');
const passportSetup = require('./config/passportSetup');

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

//setting up auth routes
app.use('/api/v1/auth', authRoutes);


exports.api = functions.https.onRequest(app);