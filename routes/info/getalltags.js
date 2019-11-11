'use strict'
const express = require('express');
const db = require('../../helpers/Database');

router = express.Router();

router.post('/getalltags', async (request, response) => {

    let info = {
        user: request.decoded.user
    };

    try {
        let result = await db.personalQuery('SELECT * FROM tags');
        response.json(result);
    } catch (err) {
        console.log(err);
        response.json({
            error: 'Something is wrong.'
        });
    }

});

module.exports = router;