'use strict'
const express = require('express');
const tags = require('../../modules/tags');
const user = require('../../modules/user');
const usersManipulation = require('../../helpers/usersManipulation');

router = express.Router();

router.post('/getsearchoptions', async (request, response) => {

	let info = {
		user: request.decoded.user
	};

	try {
		let userstags = await tags.getAllTags();
		let users = await user.getAllUsers();
		let userInfo = await user.getUserById(info.user);
		users = usersManipulation.mapDistanceToUsers(userInfo, users);
		let maxAge = usersManipulation.getBiggestAge(users);
		let maxDistance = usersManipulation.getBiggestDistance(users);
		let maxFame = usersManipulation.getBiggestFame(users);
		return response.json({
			tags: userstags,
			maxAge,
			maxDistance,
			maxFame
		});
	} catch (err) {
		response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;