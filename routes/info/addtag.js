'use strict'
const express = require('express');
const db = require('../../helpers/Database');

router = express.Router();

const verifyTag = (tag) => {
	let reg = /^[a-zA-Z-_]+$/;
	return (reg.test(tag));
}

router.post('/addtag', async (request, response) => {

	let info = {
		user: request.decoded.user,
		tag: (request.body.tag).trim()
	};

	if (!info.tag || !verifyTag(info.tag)) {
		return response.json({ error: "Something is wrong with your tag!" });
	}
	try {
		let userTags = await db.personalQuery(`SELECT * FROM usertags WHERE userid= ?`, [info.user]);
		if (userTags.length >= 5)
			return response.json({ error: 'You can only have 5 tags.' });
		let tags = await db.personalQuery("SELECT * FROM tags WHERE `tagname` LIKE ?", [info.tag]);
		if (tags.length == 0) {
			await db.personalQuery('INSERT INTO tags (tagname) VALUES (?)', [info.tag])
			let tagid = await db.personalQuery('SELECT LAST_INSERT_ID() as id');
			await db.personalQuery('INSERT INTO usertags (userid, tagid) VALUE (?, ?)', [info.user, tagid[0].id])
			return response.json({
				success: 'A new tag has been added to our database and added to your tag list.',
				id: tagid[0].id
			});
		} else {
			let tagid = tags[0].id;
			let already = await db.personalQuery('SELECT * FROM users INNER JOIN usertags ON users.id = usertags.userid WHERE users.id LIKE ? AND usertags.tagid LIKE ? ', [info.user, tagid]);
			if (already.length == 0) {
				await db.personalQuery('INSERT INTO usertags (userid, tagid) VALUES (?, ?)', [info.user, tagid]);
				return response.json({
					success: 'This tag has been added to you.',
					id: tagid
				})
			} else {
				return response.json({
					error: 'You already have this tag please enter another one.'
				});
			}
		}
	} catch (err) {
		console.log(err);
		return response.json({
			error: 'Something is wrong.'
		});
	}
});

module.exports = router;