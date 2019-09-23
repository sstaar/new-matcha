'use strict'
const express = require('express');
const db = require('../../modules/Database');

router = express.Router();

router.post('/getmatches', async (request, response) => {
    let info = {
        user: request.decoded.user
    };

    try {
        let res1 = await db.personalQuery('SELECT user2 FROM matches WHERE user1 LIKE ?', [ info.user ]);
        let res2 = await db.personalQuery('SELECT user1 FROM matches WHERE user2 LIKE ?', [ info.user ]);

        let res = [ ...res1, ...res2 ];
        // response.json(res);
        let matches = {};
        let ids = []
        let key = 0;

        Object.keys(res).forEach((item) => {
            ids[key++] = res[item].user1?res[item].user1:res[item].user2;
        });
        matches = await db.personalQuery('SELECT id, username, firstname, lastname FROM users WHERE id IN (?)',[ ids ]);
        response.json(matches);
    } catch (error) {
        console.log(error);
        return response.status(200).json({
            error: error
        });
    }
});

module.exports = router;