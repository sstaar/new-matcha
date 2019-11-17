"use strict";
const express = require("express");
const distance = require("../../helpers/distance");
const user = require('../../modules/user');
const matching = require('../../modules/matching');
const images = require('../../modules/images');
const usersManipulation = require('../../helpers/usersManipulation');

router = express.Router();

router.post("/suggestion", async (request, response) => {
	let info = {
		user: request.decoded.user,
		longitude: 0,
		latitude: 0
	};
	try {
		let userInfo = await user.getUserById(info.user);
		info = { ...info, ...userInfo };
		let res = await matching.getPossibleSuggestions(info.user);

		res = usersManipulation.usersFilterByOrientation(res, info.orientation);

		//This function will map tags to each user
		//Each user in the res will contain the distance between him and the connected user
		res = usersManipulation.mapDistanceToUsers(userInfo, res);
		res = usersManipulation.usersFilterByDistance(res, 10000);
		res = usersManipulation.sortUsersByDistance(res);

		if (res.length === 0) return response.json({ res });

		//This function will map tags to each user
		//Each user in the res will contain his own tags
		//And will contain a count of commun tags between him and the connected user
		res = await usersManipulation.mapTagsToUsers(info.user, res);

		//This function will map tags to each user
		//Each user in the res will contain his own profile image
		res = await usersManipulation.mapImagesToUsers(res);

		return response.json(res);
	} catch (error) {
		console.log(error);
		return response.json({
			error: "Something is wrong."
		});
	}
});

module.exports = router;
