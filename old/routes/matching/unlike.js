'use strict'
const express = require('express');
const db = require('../../modules/Database');

router = express.Router();

router.post('/unlike', async (request, response) => {
    let info = {
        user: request.decoded.user,
        target: request.body.target
    };

    let sqlQuery1 = `SELECT * FROM matches WHERE user1 IN (?, ?) AND user2 IN (?, ?)`;
    let sqlQuery2 = `SELECT * FROM relations WHERE primaryuser = ? AND secondaryuser = ?`;
    let sqlQuery3 = `DELETE FROM matches WHERE user1 IN (?, ?) AND user2 IN (?, ?)`;
    let sqlQuery4 = `DELETE FROM relations WHERE primaryuser = ? AND secondaryuser = ?`;

    try {
        let match = await db.personalQuery(sqlQuery1, [
            info.user,
            info.target,
            info.user,
            info.target
        ]);
        let relation = await db.personalQuery(sqlQuery2, [
            info.user,
            info.target
        ]);
        console.log(match);
        if (match.length > 0) {
            await db.personalQuery(sqlQuery3, [
                info.user,
                info.target,
                info.user,
                info.target
            ]);
        }
        if (relation.length > 0) {
            await db.personalQuery(sqlQuery4, [
                info.user,
                info.target
            ]);
        }
        return response.json({ success: 'You have unliked this person.' })
    } catch (error) {
        console.log(error);
        return response.status(200).json({
            error: error
        });
    }

});

module.exports = router;