'use strict'
const express = require('express');
const history = require('../../modules/history');
const db = require('../../helpers/Database');

router = express.Router();

router.post('/gethistory', async (request, response) => {
	let info = {
		user: request.decoded.user
	};

	try {
		let userHistory = await history.getUserHistory(info.user);
		return response.json(userHistory);
	} catch (error) {
		return response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;