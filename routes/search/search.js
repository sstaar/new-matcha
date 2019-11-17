'use strict'
const express = require('express');
const distance = require('../../helpers/distance');
const user = require('../../modules/user');
const matching = require('../../modules/matching');
const images = require('../../modules/images');
const usersManipulation = require('../../helpers/usersManipulation');

router = express.Router();

router.post('/search', async (request, response) => {
	let info = {
		user: request.decoded.user,
		ageGap: request.body.ageGap,
		distanceGap: request.body.distanceGap,
		tags: request.body.tags
	};

	try {
		if (info.tags.length === 0)
			return response.json({ error: 'You need to choose at least one tag.' })
		let res = await matching.search([info.user, info.tags]);

		console.log(res);
		let userInfo = await user.getUserById(info.user);

		res = usersManipulation.mapDistanceToUsers(userInfo, res);
		res = usersManipulation.usersFilterByDistance(res, info.distanceGap);

		res = usersManipulation.usersFilterByAge(res, userInfo.age, info.distanceGap);

		res = await usersManipulation.mapImagesToUsers(res);

		if (res.length === 0)
			return response.json({ error: 'No user meets your conditions.' })
		return response.json(res);
	} catch (error) {
		console.log(error);
		return response.json({
			error: 'Something is wrong.'
		});
	}
});

module.exports = router;