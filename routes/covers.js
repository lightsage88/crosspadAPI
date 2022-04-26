require('dotenv').config();
const igdb = require('igdb-api-node').default;
const express = require('express');
const axios = require('axios');
const { apiUrl, apiKey } = require('../config');

var wrapper = function (coversConfig) {
    const router = express.Router();
    router.use(express.json());
    router.post('/', async (req, res) => {
        let coversConfigData = coversConfig;
        const igdbClient = igdb(process.env.IGDB_CLIENT_ID, coversConfigData.accessToken);
        let { gameID } = req.body;
        let response = await igdbClient
            .fields('image_id,url')
            .where(`game = ${gameID}`)
            .request('/covers');
        res.json(response.data);
    });
    return router;
}

module.exports = wrapper;