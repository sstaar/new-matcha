'use strict'
const express = require('express');
const db = require('../../helpers/Database');
const tags = require('../../modules/tags');

router = express.Router();

router.post('/getusertags', async (request, response) => {

	let info = {
		user: request.decoded.user
	};

	try {
		let result = await tags.getUserTags(info.user);
		response.json(result);
	} catch (err) {
		response.json({
			error: 'Something is wrong.'
		});
	}
});

module.exports = router;