'use strict'
const express = require('express');
const db = require('../../helpers/Database');

router = express.Router();

router.post('/getusertags', async (request, response) => {

    let info = {
        user: request.decoded.user
    };

    try {
        let result = await db.personalQuery('SELECT tagname, tagid FROM users INNER JOIN usertags ON users.id = usertags.userid INNER JOIN tags ON usertags.tagid = tags.id WHERE users.id LIKE ?', [info.user]);
        response.json(result);
    } catch (err) {
        console.log(err);
        response.json({
            error: 'Something is wrong.'
        });
    }
});

module.exports = router;