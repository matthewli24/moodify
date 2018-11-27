# moodify

Currently, `frontend` and `backend` run separately.

**First Run**:<br />
Install dependencies:
* `cd frontend`
* `npm install`
* `cd backend`
* `npm install`

Setup a local Postgres Database:
* Create an admin user and password for your DB: <br />```createuser -P -s -e <SOME_USERNAME_like_'moodifyadmin'>```
* Create the DB:
<br />```createdb -h localhost -U <USERNAME_FROM_ABOVE> <DB_NAME_like_'moodifydb'>```

Setup keys, client id/secret, and passwords:
* Make copies of `config-template.json` (rename it to `config.json`) and `keys-template.js` (rename it to `keys.js`)
* In `config.json`, under `development`, put in your Postgres database credentials, leaving `host` and `dialect` the same.
* In `keys.js`, put in your client ID and client secret that you got from Spotify Developer.

**Start Servers**
* `cd backend`
* `npm start`: currently runs `nodemon` and will restart the server when changes are detected. In production, this will be changed.
* Runs on `localhost:8000`
* There's a simple tester site that lets you login at `localhost:8000` so that you can test endpoints from a browser.
* `cd frontend`
* `npm start`
