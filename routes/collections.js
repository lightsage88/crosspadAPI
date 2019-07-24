require('dotenv').config();
const express = require('express');
const axios = require('axios');
const {apiUrl, apiKey} = require('../config');


const router = express.Router();
router.use(express.json());
router.post('/', (req, res) => {
    let {collectionID} = req.body;

    axios({
        method: "POST",
        url: `${apiUrl}/collections`,
        headers: {
            "accept": "application/json",
            "user-key": `${apiKey}`
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



  


module.exports = router;