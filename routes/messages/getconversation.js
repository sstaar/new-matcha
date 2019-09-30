'use strict'
const express = require('express');
const db = require('../../modules/Database');

router = express.Router();

router.post('/getconversation', async (request, response) => {
    let info = {
        user: request.decoded.user,
        target: request.body.target,
    };

    try {
        let messages = await db.personalQuery('SELECT messages.*, users.username as connected_username, users.id as connected_id FROM messages INNER JOIN users ON users.id = ? WHERE sender IN (?, ?) AND receiver IN (?, ?);', [
            info.user,
            info.user,
            info.target,
            info.user,
            info.target
        ])
        return response.status(200).json(messages);
    } catch (error) {
        console.log(error);
		return response.status(500).json({
			error: 'Something is wrong.'
		});
    }
});

module.exports = router;