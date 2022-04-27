(async () => {

    require('dotenv').config();
    const express = require('express');
    const moment = require('moment');
    const cors = require('cors');
    const axios = require('axios');
    const bodyParser = require('body-parser');
    const gamesRouter = require('./routes/games');
    const coversRouter = require('./routes/covers');
    const collectionsRouter = require('./routes/collections');
    let port = process.env.PORT || 8888;
    let accessToken;
    let expiresIn;
    let expiry;
    generateAccessToken = async () => {
        let accessTokenResponse;
        let response = await axios.post(
            `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`
        );
        accessToken = response.data.access_token;
        expiresIn = response.data.expires_in;
        expiry = moment().add(expiresIn, 'ms');
        return accessToken;
    }
    accessToken = await generateAccessToken();
    const app = express();
    
    app.use(cors());
    app.use(express.json());
    app.use('/games', gamesRouter({ accessToken }));
    app.use('/collections', collectionsRouter({ accessToken }));
    app.use('/covers', coversRouter({ accessToken }));
    app.listen(port, () => {
        console.log(`crosspad API listening on ${port}`);
        setInterval(async () => {
            if (!accessToken || new Date() > expiry) {
                await generateAccessToken();
            }
        }, 5000);
    });
})();