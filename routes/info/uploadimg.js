'use strict'
const express = require('express');
const db = require('../../modules/Database');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

router = express.Router();

const createImage = (path, data) => {
    return new Promise ((resolve, reject) => {
        fs.writeFile(path, data, {encoding: 'base64'}, (error) => {
            if (error)
                return reject(error);
            return resolve();
        });
    })
}

router.post('/uploadimg', async (request, response) => {

    let info = {
        user: request.decoded.user,
        img: request.body.img
    };

    const sqlQuery = 'INSERT INTO images (user, path) VALUES (?, ?)';

    try {
        let imgsCount = await db.personalQuery('SELECT count(*) as count FROM images WHERE user = ?', [ info.user ]);
        if (imgsCount[0].count >= 5)
            return response.json({ warning: "You exceed 5 images." })
        
        if (!fs.existsSync('/var/www/html/client/public/imgs/' + info.user))
            await fs.mkdirSync('/var/www/html/client/public/imgs/' + info.user);
        let imgData = info.img.split(';base64,').pop();
        let clientPath = '/imgs/' + info.user + '/' + uuidv1() + '.png';
        let imgPath = '/var/www/html/client/public' + clientPath;
        await createImage(imgPath, imgData);
        await  db.personalQuery(sqlQuery, [ info.user, clientPath ]);
        let temp = await db.personalQuery('SELECT LAST_INSERT_ID() as id');
        temp = await db.personalQuery('SELECT * FROM images WHERE id LIKE ?', [ temp[0].id ]);
        console.log(temp);
        response.json(temp[0]);
    } catch (err) {
        console.log(err);
        response.json({
            error: 'Something is wrong.'
        });
    }

});

module.exports = router;