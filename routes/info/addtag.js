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
		response.json({ error: "Something is wrong with your tag!" });
	
	if (!resp.error) {
		try {
			
			let tags = await db.personalQuery("SELECT * FROM tags WHERE `tagname` LIKE ?", [ info.tag ]);
			if (tags.length == 0) {
				await db.personalQuery('INSERT INTO tags (tagname) VALUES (?)', [ info.tag ])
				let tagid = await db.personalQuery('SELECT LAST_INSERT_ID() as id');
				await db.personalQuery('INSERT INTO usertags (userid, tagid) VALUE (?, ?)', [info.user, tagid[0].id])
				response.json({
					ALLO:tagid[0].id,
					ALLO2:tags.length
				});
			} else {
				console.log('ALLA');
				response.json("old Tag");
			}
		} catch(err) {
			console.log(err);
		}
	}
});

module.exports = router;