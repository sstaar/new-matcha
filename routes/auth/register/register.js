const express = require('express');
const db = require('../../../modules/Database');
const hash = require('../../../modules/bcrypt');
const sv = require('../../../modules/validators/validator');

router = express.Router();

router.post('/register', async (request, response) => {

	let userSchema = {
		username: sv.string().required(),
		password1: sv.string().required(),
		password2: sv.string().required(),
		firstname: sv.string().required(),
		lastname: sv.string().required(),
		email: sv.string().required().email()
	}

	let info = {
		username: request.body.username,
		password1: request.body.password1,
		password2: request.body.password2,
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		email: request.body.email
	};

	let errors = {};

	try {
		let info = await sv.validate(request.body, userSchema);
		let res = await db.personalQuery('SELECT * FROM users WHERE username LIKE ?', [info.username]);
		if (res.length > 0)
			errors['username'] = 'Username already exists.';
		if (info.password1 && info.password2 && info.password1 !== info.password2) {
			errors['password1'] = 'Passwords do not match.';
			errors['password2'] = 'Passwords do not match.';
		}
		console.log(Object.keys(errors).length);
		if (Object.keys(errors).length > 0)
			return response.json({ errors });
			
		let hashedPass = await hash.hashing(info.password1);
		await db.personalQuery(
			"INSERT INTO users (`username`, `password`, `email`, `firstname`, `lastname`) VALUES (?, ?, ?, ?, ?)", [
				info.username,
				hashedPass,
				info.email,
				info.firstname,
				info.lastname
			]);
		return response.json({ success: 'Account has been created please chech your mail for activation.' });
	} catch (error) {
		console.log('error : ');
		if (error.customErrors)
			return response.json({ errors: error.customErrors });
		console.log(error.customErrors);
		return;
	}

	// let errors = {
	// 	username: null,
	// 	email: null,
	// 	password1: null,
	// 	password2: null,
	// 	firstname: null,
	// 	lastname: null
	// };

	let resp = {
		errors: null,
		success: null
	};

	if (!info.username)
		errors.username = 'Please enter a username.';
	else {
		let res = await db.personalQuery('SELECT * FROM users WHERE username LIKE ?', [info.username]);
		if (res.length > 0)
			errors.username = 'Username already exists.';
	}
	if (info.password1 && info.password2 && info.password1 !== info.password2) {
		errors.password1 = 'Passwords do not match.';
		errors.password2 = 'Passwords do not match.';
	}
	if (!info.password1) {
		errors.password1 = 'Please enter a password.';
		errors.password2 = 'Please enter a password.';
	}
	else if (!info.password2)
		errors.password2 = 'Please repeat your password.';
	if (!info.email)
		errors.email = 'Please enter an E-Mail.';
	if (!info.firstname)
		errors.firstname = 'Please enter your first name'
	if (!info.lastname)
		errors.lastname = 'Please enter your last name'

	if (!errors.email && !errors.password1 && !errors.password2 &&
		!errors.username && !errors.firstname && !errors.lastname) {
		let hashedPass = await hash.hashing(info.password1);
		await db.personalQuery(
			"INSERT INTO users (`username`, `password`, `email`, `firstname`, `lastname`) VALUES (?, ?, ?, ?, ?)", [
				info.username,
				hashedPass,
				info.email,
				info.firstname,
				info.lastname
			]);
		resp.success = 'Account has been created please chech your mail for activation.';
	}
	else
		resp.errors = errors;
	response.json(resp);
});

module.exports = router;