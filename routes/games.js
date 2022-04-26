require('dotenv').config();
const igdb = require('igdb-api-node').default;
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');
const { apiUrl, apiKey } = require('../config');

var wrapper = function (gamesConfig) {
    const router = express.Router();
    router.use(express.json());
    router.post('/', async (req, res) => {
        let gamesConfigData = gamesConfig;
        let { type, fieldOptions, gameId, collectionOfIds, searchValue } = req.body;
        let response = await requestFromGames(
            res,
            type,
            fieldOptions,
            gameId,
            collectionOfIds,
            searchValue,
            gamesConfigData
        );
        res.json(response);
    });

    const join = (array) => {
        let string = '';
        for (let i = 0; i <= array.length - 1; i++) {
            string += array[i];
            if (array[i + 1]) {
                string += ','
            } else {

            }
        }
        return string;
    }

    const requestFromGames = async (res, type, fieldOptions, gameId, collectionOfIds, searchValue, gamesConfig) => {
        let response;
        const igdbClient = igdb(process.env.IGDB_CLIENT_ID, gamesConfig.accessToken);
        let fieldData = fieldOptions.length > 0 ? join(fieldOptions) : '';
        switch (type) {
            case 'search':
                response = await igdbClient
                    .fields(fieldData)
                    .search(searchValue)
                    .request('/games');
                break;
            case 'specificGame':
                response = await igdbClient
                    .fields(fieldData)
                    .where(`id = ${gameId}`)
                    .request('/games')
                break;
            case 'franchiseGames':
                response = await igdbClient
                    .fields(fieldData)
                    .where(`id = (${collectionOfIds.toString()})`)
                    .request('/games')                
                break;
            default:
                return;
        }
        return response.data;
    }
    return router;
}

module.exports = wrapper;