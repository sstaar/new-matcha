'use strict'
const express = require('express');
const db = require('../../modules/Database');

router = express.Router();

router.post('/getnotifs', async (request, response) => {
    const sqlQuery = `SELECT * FROM notifications WHERE userid = ? ORDER BY date desc`;
    let info = {
        user: request.decoded.user
    };

    try {
        let res = await db.personalQuery(sqlQuery, [ info.user ]);
        response.json(res);
    } catch (error) {
        console.log(error);
		return response.json({
			error: 'Something is wrong.'
		});
    }

});

module.exports = router;