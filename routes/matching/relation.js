'use strict'
const express = require('express');
const db = require('../../modules/Database');
const notify = require('../../modules/notify');
const fameRate = require('../../helpers/fameRate').fameRate;
const addToHistory = require('../../modules/history').addToHistory;

router = express.Router();

router.post('/relation', async (request, response) => {
    if (!request.body.target || !request.body.relation)
        return response.status(400).json({ error: 'Bad request.' });
    let info = {
        user: request.decoded.user,
        target: request.body.target,
        relation: request.body.relation
    };
    
    try {
        let res = await db.personalQuery('SELECT * FROM matches WHERE (user1 LIKE ? AND user2 LIKE ?) OR (user1 LIKE ? AND user2 LIKE ?)', [ info.user, info.target, info.target, info.user ]);
        if (res.length != 0) {
            return response.status(400).json({
                error: 'Something is wrong, You are already matched with that user.'
            });
        }
        res = await db.personalQuery('SELECT * FROM relations WHERE primaryuser LIKE ? AND secondaryuser LIKE ?', [info.user, info.target]);
        if (res.length != 0)
            return response.status(400).json({
                error: 'Something is wrong, You already interacted with that person.'
            });
        res = await db.personalQuery('SELECT * FROM relations WHERE primaryuser LIKE ? AND secondaryuser LIKE ?', [info.target, info.user]);
        if (res.length == 0 || res[0].relation == -1) {
            await db.personalQuery('INSERT INTO relations ( primaryuser, secondaryuser, relation ) VALUES (?, ?, ?)', [ info.user, info.target, info.relation ]);
            let fameRating = await fameRate(info.target);
            await db.personalQuery('UPDATE users SET fame_rating = ? WHERE id LIKE ?', [ fameRating, info.target ]);
            if (info.relation == 1) {
                notify(info.target, 'You have received a like');
                addToHistory(info.target, info.user, ' has liked you.');//In the front-end we will display for example "Test has liked you."
            }
            return response.status(200).json({
                success: 'You have interacted with that person successfully.',
                match: false
            });
        }
        else if (res[0].relation == 1) {
            await db.personalQuery('INSERT INTO matches ( user1, user2 ) VALUES (?, ?)', [ info.user, info.target ]);
            await db.personalQuery('DELETE FROM relations WHERE primaryuser LIKE ? AND secondaryuser LIKE ? AND relation = 1', [info.target, info.user])
            let fameRating = await fameRate(info.target);
            await db.personalQuery('UPDATE users SET fame_rating = ? WHERE id LIKE ?', [ fameRating, info.target ]);
            notify(info.target, 'You have a new match');
            notify(info.user, 'You have a new match');
            addToHistory(info.target, info.user, ' has liked you.');
            return response.status(200).json({
                success: 'You have matched with that person.',
                match: true
            });
        }
    } catch (error) {
        console.log(error);
        return response.status(200).json({
            error: error
        });
    }

});

module.exports = router;