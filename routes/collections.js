require('dotenv').config();
const igdb = require('igdb-api-node').default;
const express = require('express');
const axios = require('axios');
const { apiUrl, apiKey } = require('../config');

var wrapper = function (collectionsConfig) {
    let collectionsConfigData = collectionsConfig;
    const router = express.Router();
    router.use(express.json());
    router.post('/', async (req, res) => {
        const igdbClient = igdb(process.env.IGDB_CLIENT_ID, collectionsConfigData.accessToken);
        let { collectionID } = req.body;
        let response = await igdbClient
            .fields('name,games')
            .where(`id = ${collectionID}`)
            .request('/collections')
        res.json(response.data);
    });
    return router;
}

module.exports = wrapper;