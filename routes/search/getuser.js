'use strict'
const express = require('express');
const db = require('../../modules/Database');
const distance = require('../../helpers/distance');

router = express.Router();

router.post('/getuser', async (request, response) => {
    const sqlQuery1 = `SELECT * FROM users WHERE id = ?`;
    const sqlQuery2 = `SELECT * FROM relations WHERE primaryuser = ? AND secondaryuser = ?`;
    const sqlQuery3 = `SELECT * FROM matches WHERE user1 IN (?, ?) AND user2 IN (?, ?)`;
    let info = {
        user: request.decoded.user,
        target: request.body.target
    };

    try {
        let res = await db.personalQuery(sqlQuery1, [ info.target ]);
        // for relation 1=> matched|0=>liked|-1=>no relation
        let relation = -1;
        res = res[0];
        let likes = await db.personalQuery(sqlQuery2, [ info.user, info.target ])
        let matches = await db.personalQuery(sqlQuery3, [ info.user, info.target, info.user, info.target ]);
        if (likes.length > 0)
            relation = 0;
        else if (matches.length > 0)
            relation = 1;
        let user = await db.personalQuery(sqlQuery1, [ info.user ]);
        user = user[0];
        let dist = await distance(user.latitude, user.longitude, res.latitude, res.longitude);
        response.json({
            id: res.id,
            username: res.username,
            firstname: res.firstname,
            lastname: res.lastname,
            gender: res.gender,
            age: res.age,
            bio: res.bio,
            distance:dist,
            relation
        });
    } catch (error) {
        console.log(error);
		return response.json({
			error: 'Something is wrong.'
		});
    }

});

module.exports = router;