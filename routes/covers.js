require('dotenv').config();
const express = require('express');
const axios = require('axios');
const {apiUrl, apiKey} = require('../config');


const router = express.Router();
router.use(express.json());
router.post('/', (req, res) => {
    let {gameID} = req.body;

    axios({
        method: "POST",
        url: `${apiUrl}/covers/`,
        headers: {
            'user-key': `${apiKey}`,
            'accept': 'application/json'
        },
        data: `\nfields image_id, url; where game=${gameID};`
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(err => {
        console.error(err);
    });
});



  


module.exports = router;