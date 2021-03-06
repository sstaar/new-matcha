const express = require("express");
const hash = require("../../../helpers/bcrypt");
const sv = require("../../../helpers/validators/validator");
const DateDiff = require("date-diff");
const crypto = require("crypto");
const mail = require("../../../helpers/mail");
const user = require('../../../modules/user');

router = express.Router();

router.post("/register", async (request, response) => {
	let userSchema = {
		username: sv.string().required().match(/^[a-zA-Z0-9_-]{6,20}$/, "A username must be character and numbers only."),
		password1: sv.string().required().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,50})/, "Password not stront enough."),
		password2: sv.string().required().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,50})/, "Password not stront enough."),
		firstname: sv.string().required(),
		lastname: sv.string().required(),
		email: sv.string().required().email(),
		birthday: sv.string().required().date(),
		gender: sv.string().required().match(/^(male|female)$/)
	};

	let info = {
		username: request.body.username,
		password1: request.body.password1,
		password2: request.body.password2,
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		email: request.body.email,
		birthday: request.body.birthday,
		gender: request.body.gender
	};

	let errors = {};

	console.log(info);

	try {
		console.log("HAHA");
		let info = await sv.validate(request.body, userSchema);

		let usernameExists = await user.usernameExists(info.username);

		if (usernameExists === true)
			errors["username"] = "Username already exists.";
		if (info.password1 && info.password2 && info.password1 !== info.password2) {
			errors["password1"] = "Passwords do not match.";
			errors["password2"] = "Passwords do not match.";
		}

		let age = new DateDiff(new Date(), new Date(info.birthday));
		age = age.years();

		console.log(age);
		if (age < 18)
			errors["birthday"] = "You have to be older than 18 years old.";
		if (age > 100)
			errors["birthday"] = "PEDO.";

		if (Object.keys(errors).length > 0) return response.json({ errors });

		let hashedPass = await hash.hashing(info.password1);
		var token = await crypto.randomBytes(32).toString("hex");
		await user.createUser(
			[
				info.username,
				hashedPass,
				info.email,
				info.firstname,
				info.lastname,
				age,
				info.gender,
				token
			]
		)
		await mail.sendEmail(
			info.email,
			"your account is created",
			"<h1>Hello</h1>" +
			info.username +
			`<p>click here to validate your account <a href="${mail.host}/validateEmail/${token}">link</a></p>`
		);
		return response.json({
			success: "Account has been created please chech your mail for activation."
		});
	} catch (error) {
		if (error.customErrors)
			return response.json({ errors: error.customErrors });
		return;
	}
});

router.get("/validateEmail/:token", async (request, response) => {
	const token = request.params.token;

	try {
		var accountActivationResponse = await user.activateAccount(token);
		response.json(accountActivationResponse);
	} catch (error) {
		if (error.customErrors)
			return response.json({ errors: error.customErrors });
		return;
	}
});

module.exports = router;
