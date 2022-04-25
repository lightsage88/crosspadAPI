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
        console.log('you are making a request of the post type to /games');
        console.log('here is your request body:');
        console.log(req.body);
        let { type, fieldOptions, gameId, collectionOfIds, searchValue } = req.body;

        requestFromGames(res, type, fieldOptions, gameId, collectionOfIds, searchValue, gamesConfigData);
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
        console.log('proxy req from games running', gamesConfig);
        const igdbClient = igdb(process.env.IGDB_CLIENT_ID, gamesConfig.accessToken);
        console.log(fieldOptions);
        let url = `${apiUrl}/games/`;
        let data = '';
        let headers = { 'user-key': `${apiKey}`, 'accept': 'application/json' };
        let fieldData = fieldOptions.length > 0 ? join(fieldOptions) : '';
        // let fieldData = 'name,id';
        switch (type) {
            case 'search':
                url += `?search=${searchValue}&fields=${fieldData}`;
                const response = await igdbClient 
                .fields(fieldData)
                .search(searchValue)
                .request('/games')
                console.log('the fucking response!', response);
                break;
            case 'specificGame':
                data = `\nfields ${fieldData}; where id=${gameId};`;
                break;
            case 'franchiseGames':
                data = `\nfields ${fieldData}; where id=(${collectionOfIds.toString()});`;
                break;
            default:
                return;
        }

        // axios({
        //     method: "POST",
        //     url,
        //     headers,
        //     data
        // })
        //     .then(response => {
        //         res.json(response.data);
        //     })

        //     .catch(err => {
        //         console.log('shit');
        //         // handleSearchResponse('', 'error')
        //         console.error(err);
        //     });
    }
    return router;
}

module.exports = wrapper;