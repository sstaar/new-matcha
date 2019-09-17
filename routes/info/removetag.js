'use strict'
const express = require('express');
const db = require('../../modules/Database');

router = express.Router();

router.post('/removetag', async (request, response) => {

    let info = {
        user: request.decoded.user,
        tag: request.body.tagid
    };

    try {
        let result = await db.personalQuery('SELECT * FROM usertags WHERE userid LIKE ? AND tagid LIKE ?', [info.user, info.tag]);
        //response.json(info);
        if (result.length == 0) {
            response.json({
                error: 'You do not have this tag.'
            })
        } else {
            await db.personalQuery('DELETE FROM usertags WHERE userid LIKE ? AND tagid LIKE ?', [ info.user, info.tag ]);
            response.json({
                error: 'The tag has been removed successfuly.'
            });
        }
    } catch (err) {
        console.log(err);
        response.json({
            error: 'Something is wrong.'
        });
    }

});

module.exports = router;