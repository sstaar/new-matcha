'use strict'
const express = require('express');
const db = require('../../modules/Database');

router = express.Router();

router.post('/reportuser', async (request, response) => {
    const sqlQuery = `INSERT INTO reports (user1, user2) VALUES (?, ?)`;
    const sqlQuery1 = `SELECT COUNT(*) AS count FROM reports WHERE user2  = ?`;
    let info = {
        user: request.decoded.user,
        target: request.body.target
    };

    try {
        if (info.user === info.target)
            return response.json({ error: "Seb7an lah...You can't report yourself." });
        await db.personalQuery(sqlQuery, [info.user, info.target]);
        console.log('A user is reported');
        return response.json({ success: 'You reported the user' });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'Something is wrong.'
        });
    }

});

module.exports = router;