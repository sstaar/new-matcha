"use strict";
const express = require("express");
const hash = require("../../../helpers/bcrypt");
const sv = require("../../../helpers/validators/validator");
const mail = require("../../../helpers/mail");
const crypto = require("crypto");
const user = require('../../../modules/user');

router = express.Router();

router.post("/resetPassword", async (req, res) => {
	//get email from body
	const email = req.body.email;
	const username = req.body.username;
	// check email

	const infoSchema = {
		email: sv
			.string()
			.required()
			.email(),
		username: sv.string().required()
	};

	try {
		const info = await sv.validate(req.body, infoSchema);
		// check if the user exists
		const userInfo = await user.getUserByUsername(info.username);
		console.log(userInfo)
		if (!userInfo || userInfo.email !== info.email)
			return res.json({
				errors: {
					username: "Informations are not correct.",
					email: "Informations are not correct."
				}
			});
		var resetToken = await crypto.randomBytes(32).toString("hex");
		await user.setResetToken([resetToken, email, username]);
		await mail.sendEmail(
			email,
			"resetPass",
			`
				<h1>Hello !</h1>
				<p>Here is your link to reset the password http://localhost:3000/resetPassword/${resetToken}</p>
			`
		);
		return res.json({ success: "Action Done Please check your email" });
	} catch (error) {
		console.log(error);
		if (error.customErrors) return res.json({ errors: error.customErrors });
		return;
	}
});

router.post("/resetChangePassword", async (request, response) => {
	const newPassword = request.body.newPassword;
	const token = request.body.resetToken;

	//check token in database
	const infoSchema = {
		resetToken: sv.string().required(),
		newPassword: sv.string().required().match(/^ (?=.* [a - z])(?=.* [A - Z])(?=.* [0 - 9])(?=.{ 8, 50}) /, "Password not stront enough.")
	};

	try {
		await sv.validate(request.body, infoSchema);
		let hashedPass = await hash.hashing(newPassword);
		let res = await user.resetPassword(token, hashedPass);
		response.json(res);
	} catch (error) {
		console.log(error);
		if (error.customErrors)
			return response.json({ errors: error.customErrors });
		return;
	}
});

module.exports = router;
