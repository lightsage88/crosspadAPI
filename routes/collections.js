require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { apiUrl, apiKey } = require('../config');

var wrapper = function (collectionsConfig) {
    const router = express.Router();
    router.use(express.json());
    router.post('/', (req, res) => {
        let { collectionID } = req.body;

        axios({
            method: "POST",
            url: `${apiUrl}/collections`,
            headers: {
                            'Accept': 'application/json',
            'Authorization': `Bearer ${gamesConfig.accessToken}`,
            'Client-ID': process.env.TWITCH_CLIENT_ID
            },
            data: `\nfields name, games; where id = ${collectionID};`
        })
            .then(response => {
                res.json(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    });
    return router;
}

module.exports = wrapper;