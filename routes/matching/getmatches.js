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
        let resFinal = {};
        let key = 0;
        res.forEach(async (element) => {
            console.log(element);
            resFinal[key] = element.user1?element.user1:element.user2;
            console.log(resFinal[key]);
            resFinal[key] = await db.personalQuery('SELECT * FROM users WHERE id LIKE ?', [ resFinal[key] ]);
            resFinal[key] = resFinal[key][0];
            console.log(resFinal[key]);
            key++;
        });
        response.json(resFinal);
    } catch (error) {
        console.log(error);
        return response.status(200).json({
            error: error
        });
    }
});

module.exports = router;