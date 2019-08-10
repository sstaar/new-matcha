'use strict'
const express		= require('express');
const db			= require('../../modules/Database');
const jwt			= require('jsonwebtoken');

router = express.Router();

const verifyTag = (tag) => {
	let reg = /^[a-zA-Z-_]+$/;
	return (reg.test(tag));
}

router.post('/addtag', async (request, response) => {
	let info = {
		user		: request.decoded.user,
		tag			: (request.body.tag).trim()
	};

	let resp = {};

	if (!info.tag || !verifyTag(info.tag))
		resp = { error: "Something is wrong!" };
	if (!resp.error) {
		try {
			let tags = await db.personalQuery('SELECT * FROM tags WHERE `name` LIKE ?', [ info.tag ]);
			if (tags.length === 0) {
				console.log("new Tag");
			} else {
				console.log("old Tag");
			}
		} catch(err) {

		}
	}
});

module.exports = router;