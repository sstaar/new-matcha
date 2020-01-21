'use strict'
const express = require('express');
const db = require('../../helpers/Database');
const tags = require('../../modules/tags');

router = express.Router();

router.post('/removetag', async (request, response) => {

	let info = {
		user: request.decoded.user,
		tag: request.body.tagid
	};

	try {
		let tag = await tags.getUserTag(info.user, info.tag);
		if (!tag)
			return response.json({
				error: 'You do not have this tag.'
			})
		tags.deleteUserTag(info.user, info.tag);
		return response.json({
			error: 'The tag has been removed successfuly.'
		});
	} catch (err) {
		return response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;