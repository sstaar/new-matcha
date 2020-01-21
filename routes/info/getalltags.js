'use strict'
const express = require('express');
const tags = require('../../modules/tags');

router = express.Router();

router.post('/getalltags', async (request, response) => {

	let info = {
		user: request.decoded.user
	};

	try {
		let result = await tags.getAllTags();
		response.json(result);
	} catch (err) {
		response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;