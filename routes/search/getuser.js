"use strict";
const express = require("express");
const distance = require("../../helpers/distance");
const addToHistory = require("../../helpers/history").addToHistory;
const user = require('../../modules/user');
const matching = require('../../modules/matching');
const images = require('../../modules/images');
const tags = require('../../modules/tags');

router = express.Router();

router.post("/getuser", async (request, response) => {
	let info = {
		user: request.decoded.user,
		target: request.body.target
	};

	try {
		let target = await user.getUserById(info.target);
		let likes = await matching.userRelationWith(info.user, info.target);
		let matches = await matching.userMatchedWith(info.user, info.target);

		if (target === null)
			return response.json({ error: "Error 404 user not found." });
		// for relation 1=> matched|0=>liked|-1=>no relation|-2=>disliked
		let relation = -1;
		if (likes === 0)
			relation = 0;
		else if (matches !== null)
			relation = 1;
		let userInfo = await user.getUserById(info.user);
		let dist = await distance(
			userInfo.latitude,
			userInfo.longitude,
			target.latitude,
			target.longitude
		);
		addToHistory(
			info.target,
			info.user,
			" has visited you.",
			request.sockets[info.target]
		); //In the front-end we will display for example "Test has visited you."
		let userImgs = await images.getUserImages(info.target);
		let userTags = await tags.getUserTags(info.taget)
		return response.json({
			id: target.id,
			username: target.username,
			firstname: target.firstname,
			lastname: target.lastname,
			gender: target.gender,
			age: target.age,
			bio: target.bio,
			distance: dist,
			relation,
			is_online: target.is_online,
			last_connection: target.last_connection,
			fame_rate: target.fame_rating,
			images: userImgs,
			tags: userTags
		});
	} catch (error) {
		console.log(error);
		return response.json({
			error: "Something is wrong."
		});
	}
});

module.exports = router;
