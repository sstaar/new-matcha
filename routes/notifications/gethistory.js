'use strict'
const express = require('express');
const db = require('../../helpers/Database');

router = express.Router();

router.post('/gethistory', async (request, response) => {
    const sqlQuery = `SELECT user, invoker, content, username, date FROM history
                        INNER JOIN users ON history.user = users.id
                        WHERE user = ? ORDER BY date desc`;
    let info = {
        user: request.decoded.user
    };

    try {
        let res = await db.personalQuery(sqlQuery, [info.user]);
        response.json(res);
    } catch (error) {
        console.log(error);
        return response.json({
            error: 'Something is wrong.'
        });
    }

});

module.exports = router;