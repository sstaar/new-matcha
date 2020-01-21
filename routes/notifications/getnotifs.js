'use strict'
const express = require('express');
const db = require('../../helpers/Database');
const history = require('../../modules/history');

router = express.Router();

router.post('/getnotifs', async (request, response) => {
	let info = {
		user: request.decoded.user
	};

	try {
		let res = await history.getUserNotifs(info.user);
		response.json(res);
	} catch (error) {
		return response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;