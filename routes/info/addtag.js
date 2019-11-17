'use strict'
const express = require('express');
const tags = require('../../modules/tags')

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
		let userTags = await tags.getUserTags(info.user);
		if (userTags.length >= 5)
			return response.json({ error: 'You can only have 5 tags.' });
		let tag = await tags.getTagByName(info.tag);
		if (!tag) {
			tag = await tags.addTagToBoth(info.user, info.tag);
			return response.json({
				success: 'A new tag has been added to our database and added to your tag list.',
				id: tag.id
			});
		} else {
			let newTag = await tags.addTagToUser(info.user, tag.id)
			if (!newTag)
				return response.json({
					error: 'You already have this tag please enter another one.'
				});
			return response.json({
				success: 'This tag has been added to you.',
				id: newTag
			})
		}
	} catch (err) {
		console.log(err);
		return response.json({
			error: 'Something is wrong.'
		});
	}
});

module.exports = router;