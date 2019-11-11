'use strict'
const express = require('express');
const db = require('../../helpers/Database');

router = express.Router();

router.post('/blockuser', async (request, response) => {
    const sqlQuery = `INSERT INTO block (user1, user2) VALUES (?, ?)`;
    let info = {
        user: request.decoded.user,
        target: request.body.target
    };

    try {
        if (info.user === info.target)
            return response.json({ error: "Seb7an lah...You can't block yourself." });
        await db.personalQuery(sqlQuery, [info.user, info.target]);
        return response.json({ success: 'You blocked the user' });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'Something is wrong.'
        });
    }

});

module.exports = router;