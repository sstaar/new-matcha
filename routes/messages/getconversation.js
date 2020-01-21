'use strict'
const express = require('express');
const messages = require('../../modules/messages');

router = express.Router();

router.post('/getconversation', async (request, response) => {
	let info = {
		user: request.decoded.user,
		target: request.body.target,
	};

	try {
		let convo = await messages.getConversation(info.user, info.target);
		return response.status(200).json(convo);
	} catch (error) {
		return response.status(500).json({
			error: 'Something is wrong.'
		});
	}
});

module.exports = router;