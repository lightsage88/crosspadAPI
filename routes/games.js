require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');
const {apiUrl, apiKey} = require('../config');



const router = express.Router();
router.use(express.json());
router.post('/', (req, res) => {
    console.log('you are making a request of the post type to /games');
    console.log('here is your request body:');
    console.log(req.body);
    let {type, fieldOptions, gameId, collectionOfIds, searchValue} = req.body;

    requestFromGames(res, type, fieldOptions, gameId, collectionOfIds, searchValue);


    // axios({
    //     url: `${apiUrl}/games/?search=mario&fields='id'`,
    //     method: "POST",
    //     data: '',
    //     headers: {
    //         'user-key' : `${apiKey}`,
    //         'accept' : 'application/json'
    //     },
    // })
    // .then(response => {
    //     console.log(response);
    //     res.json(response.data);
    // })
    // .catch(err => {
    //     console.error(err);
    // })

});


const join = (array) => {
    let string='';
    for(let i = 0; i <= array.length-1; i++) {
        string += array[i];
        if(array[i + 1]) {
            string += ','
        } else {

        }
    }
    return string;
}
  
const requestFromGames = (res, type, fieldOptions, gameId, collectionOfIds, searchValue) => {
    console.log('proxy req from games running'); 
    console.log(fieldOptions);
    let url = `${apiUrl}/games/`;
    let data = '';
    let headers = {'user-key': `${apiKey}`, 'accept': 'application/json'};
    let fieldData = fieldOptions.length > 0 ? join(fieldOptions) : '';
    // let fieldData = 'name,id';
    switch(type) {
        case 'search' :
          url += `?search=${searchValue}&fields=${fieldData}`;
         break;
        case 'specificGame':
          data = `\nfields ${fieldData}; where id=${gameId};`;
        break;
        case 'franchiseGames':
         data =  `\nfields ${fieldData}; where id=(${collectionOfIds.toString()});`;
        break;
         default:
          return;
    }

    axios({
        method: "POST",
        url,
        headers,
        data
    })
    .then(response => {
    res.json(response.data);
    })
  
    .catch(err => {
        console.log('shit');
        // handleSearchResponse('', 'error')
        console.error(err);
    });
}

module.exports = router;