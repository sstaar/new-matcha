'use strict';
const express = require('express');
const matching = require('../../modules/matching');
const user = require('../../modules/user');

router = express.Router();

router.post('/getmatches', async (request, response) => {
	let info = {
		user: request.decoded.user
	};

	try {

		let res = await matching.getUserMatches(info.user);
		// response.json(res);
		let matches = {};
		let ids = []
		let key = 0;

		Object.keys(res).forEach((item) => {
			ids[key++] = res[item].user1 ? res[item].user1 : res[item].user2;
		});
		if (ids.length === 0)
			return response.json({ error: 'You have no matches.' });
		matches = await user.getUsersInfo(ids);
		response.json(matches);
	} catch (error) {
		return response.status(200).json({
			error: error
		});
	}
});

module.exports = router;