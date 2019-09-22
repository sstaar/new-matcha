'use strict'
const express = require('express');
const db = require('../../modules/Database');

router = express.Router();

router.post('/suggestion', async (request, response) => {
    let info = {
        user: request.decoded.user,
        longitude: 0,
		latitude: 0
    };
    try {
        let res = await db.personalQuery('SELECT latitude, longitude  FROM users WHERE id LIKE ?', [ info.user ]);
        info = { ...info, ...res[0] };
        const dist = 50;
        // res = await db.personalQuery(`SELECT * from users WHERE (latitude >= ? - ${dist} AND longitude <= ? + ${dist}) AND (longitude >= ? - ${dist} AND longitude <= ? + ${dist})`, [ info.latitude, info.latitude, info.longitude, info.longitude ]);
        res = await db.personalQuery(`SELECT * FROM users WHERE (id NOT LIKE ?) AND id NOT IN (SELECT id FROM relations WHERE primaryuser = ?) AND id NOT IN (SELECT user1 FROM matches WHERE user2 LIKE ?) AND id NOT IN (SELECT user2 FROM matches WHERE user1 LIKE ?) AND (latitude >= ? - ${dist} AND longitude <= ? + ${dist}) AND (longitude >= ? - ${dist} AND longitude <= ? + ${dist})`,[ 
            info.user,
            info.user,
            info.user,
            info.user,
            info.latitude,
            info.latitude,
            info.longitude,
            info.longitude
        ])
        response.json(res);
    } catch (error) {
        console.log(error);
		return response.json({
			error: 'Something is wrong.'
		});
    }
});

module.exports = router;