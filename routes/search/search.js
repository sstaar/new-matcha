'use strict'
const express = require('express');
const distance = require('../../helpers/distance');
const user = require('../../modules/user');
const matching = require('../../modules/matching');

router = express.Router();

router.post('/search', async (request, response) => {
	const sqlQuery = `SELECT * FROM users WHERE
                        id != ? AND
                        id IN (SELECT userid FROM usertags INNER JOIN tags ON usertags.tagid = tags.id WHERE tags.id IN (?))`;
	let info = {
		user: request.decoded.user,
		ageGap: request.body.ageGap,
		distanceGap: request.body.distanceGap,
		tags: request.body.tags
	};
	console.log(info)

	try {
		if (info.tags.length === 0)
			return response.json({ error: 'You need to choose at least one tag.' })
		let res = await matching.search([info.user, info.tags]);


		let userInfo = await user.getUserById(info.user);

		res = res.filter((item) => {
			let dis = distance(userInfo.latitude, userInfo.longitude, item.latitude, item.longitude);

			return dis <= info.distanceGap && Math.abs(userInfo.age - item.age) <= info.ageGap;
		});


		res.forEach((item) => {
			item.distance = distance(userInfo.latitude, userInfo.longitude, item.latitude, item.longitude);
		});

		if (res.length === 0)
			return response.json({ error: 'No user meets your conditions.' })
		response.json(res);
	} catch (error) {
		console.log(error);
		return response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;