'use strict'
const express = require('express');
const db = require('../../helpers/Database');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

router = express.Router();

router.post('/uploadimg', async (request, response) => {

    let info = {
        user: request.decoded.user,
        img: request.file
    };

    const sqlQuery = 'INSERT INTO images (user, path) VALUES (?, ?)';

    try {
        let imgsCount = await db.personalQuery('SELECT count(*) as count FROM images WHERE user = ?', [info.user]);
        if (imgsCount[0].count >= 5)
            return response.json({ warning: "You exceeded 5 images." })
        await db.personalQuery(sqlQuery, [info.user, info.img.path]);
        let temp = await db.personalQuery('SELECT LAST_INSERT_ID() as id');
        temp = await db.personalQuery('SELECT * FROM images WHERE id LIKE ?', [temp[0].id]);
        return response.json(temp[0]);
    } catch (err) {
        console.log(err);
        response.json({
            error: 'Something is wrong.'
        });
    }

});

module.exports = router;