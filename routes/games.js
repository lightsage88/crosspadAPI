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
        console.log(req.body);
        let { type, fieldOptions, gameId, collectionOfIds, searchValue } = req.body;
        let response = await requestFromGames(res, type, fieldOptions, gameId, collectionOfIds, searchValue, gamesConfigData);
        console.log('what we send to client:', response);
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
        console.log('proxy req from games running', gamesConfig);
        const igdbClient = igdb(process.env.IGDB_CLIENT_ID, gamesConfig.accessToken);
        console.log(fieldOptions);
        let fieldData = fieldOptions.length > 0 ? join(fieldOptions) : '';
        // let fieldData = 'name,id';
        switch (type) {
            case 'search':
                response = await igdbClient 
                .fields(fieldData)
                .search(searchValue)
                .request('/games')
                console.log('the fucking response!', response);
                break;
                //TODO: See if these ones work, actually.
            case 'specificGame':
                response = await igdbClient
                .fields(fieldData)
                .where(`id = ${gameID}`)
                .request('/games')
                // data = `\nfields ${fieldData}; where id=${gameId};`;
                console.log('specificGameResponse:', specificGameResponse);
                break;
            case 'franchiseGames':
                response = await igdbClient
                .fields(fieldData)
                .where(`id = (${collectionOfIds.toString()})`)
                .request('/games')
                // data = `\nfields ${fieldData}; where id=(${collectionOfIds.toString()});`;
                break;
            default:
                return;
        }
        return response.data;
    }
    return router;
}

module.exports = wrapper;