'use strict'
const express = require('express');
const db = require('../../helpers/Database');
const distance = require('../../helpers/distance');

router = express.Router();

router.post('/search', async (request, response) => {
    const sqlQuery = `SELECT * FROM users WHERE
                        id != ? AND
                        id IN (SELECT userid FROM usertags INNER JOIN tags ON usertags.tagid = tags.id WHERE tags.id IN (?))`;
    let info = {
        user: request.decoded.user,
        ageGap: request.body.ageGap,
        distanceGap: request.body.distanceGap,
        tags: request.body.tags
    };

    try {
        if (info.tags.length === 0)
            return response.json({ error: 'You need to choose at least one tag.' })
        let res = await db.personalQuery(sqlQuery, [info.user, info.tags]);

        let user = await db.personalQuery('SELECT * FROM users WHERE id = ?', [info.user]);
        user = user[0];

        console.log(res);

        res = res.filter((item) => {
            let dis = distance(user.latitude, user.longitude, item.latitude, item.longitude);

            return dis <= info.distanceGap && Math.abs(user.age - item.age) <= info.ageGap;
        });

        res.forEach((item) => {
            item.distance = distance(user.latitude, user.longitude, item.latitude, item.longitude);
        });

        if (res.length === 0)
            return response.json({ error: 'No user meets your conditions.' })
        response.json(res);
    } catch (error) {
        console.log(error);
        return response.json({
            error: 'Something is wrong.'
        });
    }

});

module.exports = router;