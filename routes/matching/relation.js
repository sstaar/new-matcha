"use strict";
const express = require("express");
const notify = require("../../helpers/notify");
const fameRate = require("../../helpers/fameRate").fameRate;
const addToHistory = require("../../helpers/history").addToHistory;
const imageValidator = require("../../middlewares/imageValidator").imageValidator;
const matching = require('../../modules/matching');
const user = require('../../modules/user');

router = express.Router();

router.post("/relation", imageValidator, async (request, response) => {
	if (!request.body.target || !request.body.relation)
		return response.status(400).json({ error: "Bad request." });

	let info = {
		user: request.decoded.user,
		target: request.body.target,
		relation: request.body.relation
	};

	try {

		let matched = await matching.userMatchedWith(info.user, info.target);
		if (matched !== null) {
			return response.status(400).json({
				error: "Something is wrong, You are already matched with that user."
			});
		}

		let relation = await matching.userRelationWith(info.user, info.target);
		if (relation !== null)
			return response.status(200).json({
				error: "Something is wrong, You already interacted with that person."
			});
		relation = await matching.userRelationWith(info.target, info.user);
		if (relation === null || relation === -1) {
			await matching.createRelation(info.user, info.target, info.relation);
			let fameRating = await fameRate(info.target);
			await user.updateFameRating(info.target, fameRating);
			if (info.relation == 1) {
				notify(
					info.target,
					"You have received a like",
					request.sockets[info.target]
				);
				addToHistory(info.target, info.user, " has liked you."); //In the front-end we will display for example "Test has liked you."
			}
			return response.status(200).json({
				success: "You have interacted with that person successfully.",
				match: false
			});
		} else if (relation === 1) {
			await matching.matchUserWith(info.user, info.target);
			let fameRating = await fameRate(info.target);
			await user.updateFameRating(info.user, fameRating);
			notify(info.target, "You have a new match", request.sockets[info.target]);
			notify(info.user, "You have a new match", request.sockets[info.user]);
			addToHistory(info.target, info.user, " has liked you.");
			return response.status(200).json({
				success: "You have matched with that person.",
				match: true
			});
		}
	} catch (error) {
		return response.status(200).json({
			error: error
		});
	}
});

module.exports = router;
