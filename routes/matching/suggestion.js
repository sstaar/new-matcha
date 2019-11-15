"use strict";
const express = require("express");
const distance = require("../../helpers/distance");
const user = require('../../modules/user');
const matching = require('../../modules/matching');
const tags = require('../../modules/tags');
const images = require('../../modules/images');

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
		const dist = 10000;
		let res = await matching.getPossibleSuggestions(info.user);

		res = res.filter(item => {
			let distanceBetween = distance(
				info.latitude,
				info.longitude,
				item.latitude,
				item.longitude
			);
			return (
				distanceBetween < dist &&
				(info.orientation === item.gender || info.orientation === "both")
			);
		});
		res = res.sort((user1, user2) => {
			let distance1 = distance(
				info.latitude,
				info.longitude,
				user1.latitude,
				user1.longitude
			);
			let distance2 = distance(
				info.latitude,
				info.longitude,
				user2.latitude,
				user2.longitude
			);
			return distance1 - distance2;
		});

		if (res.length === 0) return response.json({ res });

		//------------
		let existingUsers = res.map(item => item.id);
		let connectedUserTags = await tags.getUserTags(info.user);
		let suggestionUsersTags = await tags.getUsersTags(existingUsers);
		res.forEach(user => {
			let tags = [];
			console.log(user.username);
			suggestionUsersTags.forEach(item => {
				if (item.userid === user.id) tags.push(item.tagid);
			});
			console.log(tags);
			user.commonTagsCount = connectedUserTags.filter(tag =>
				tags.includes(tag.tagid)
			).length;
		});
		//------------

		res.forEach(item => {
			item.distance = distance(
				info.latitude,
				info.longitude,
				item.latitude,
				item.longitude
			);
		});

		let imgs = await images.getAllImgs();
		for (let item of res) {
			var img = imgs.find((img) => img.user === item.id);
			if (img)
				item.imageId = img.id;
		}

		response.json(res);
	} catch (error) {
		console.log(error);
		return response.json({
			error: "Something is wrong."
		});
	}
});

module.exports = router;
