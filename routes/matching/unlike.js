"use strict";
const express = require("express");
const notify = require("../../helpers/notify");
const matching = require('../../modules/matching');
const user = require('../../modules/user');


router = express.Router();

router.post("/unlike", async (request, response) => {
	let info = {
		user: request.decoded.user,
		target: request.body.target
	};

	let sqlQuery2 = `SELECT * FROM relations WHERE primaryuser = ? AND secondaryuser = ?`;
	let sqlQuery4 = `DELETE FROM relations WHERE primaryuser = ? AND secondaryuser = ?`;

	try {
		let match = await matching.userMatchedWith(info.user, info.target);
		let relation = await matching.userRelationWith(info.user, info.target);
		if (match !== null)
			await matching.removeMatch(info.user, info.target);
		if (relation === 1)
			await matching.removeRelation(info.user, info.target);
		let username = await user.getUserById(info.user);
		username = username.username;
		notify(
			info.target,
			username[0].username + " unlicked you",
			request.sockets[info.target]
		);
		return response.json({ success: "You have unliked this person." });
	} catch (error) {
		console.log(error);
		return response.status(200).json({
			error: error
		});
	}
});

module.exports = router;
