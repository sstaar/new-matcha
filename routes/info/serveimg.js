'use strict'
const express = require('express');
const db = require('../../helpers/Database');
const fs = require('fs');

router = express.Router();

router.post('/serveimg', async (request, response) => {
    // response.sendFile(, { root: 'images' });
    const info = {
        imgId: request.body.imgId,
        user: request.decoded.user
    }

    try {
        let img = await db.personalQuery(`SELECT * from images WHERE id = ?`, [info.imgId]);
        if (img.length !== 1)
            return response.json({ error: "Something is wrong." });
        // var body = fs.readFileSync(img[0].path);
        // img = body.toString('base64');
        // response.sendFile(img[0].path, { root: 'images' });
        img = fs.readFileSync(img[0].path, { encoding: 'base64' });
        img = "data:" + "image/jpg" + ";base64," + img;
        response.json({ img })
    } catch (error) {
        console.log(error);
        response.json({
            error: 'Something is wrong.'
        });
    }
});

module.exports = router;