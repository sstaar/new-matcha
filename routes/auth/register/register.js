const express		= require('express');
const db			= require('../../../modules/Database');
const hash			= require('../../../modules/bcrypt'); 

router = express.Router();

router.post('/register', async (request, response) => {
	let info = {
		username: request.body.username,
		password1: request.body.password1,
		password2: request.body.password2,
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		email: request.body.email
	};

	let errors = {
		error_username: null,
		error_email: null,
		error_password1: null,
		error_password2: null,
		error_firstname: null,
		error_lastname: null
	};

	let resp = {
		errors: null,
		success: null
	};

	if (!info.username)
		errors.error_username = 'Please enter a username.';
	else {
		let res = await db.personalQuery('SELECT * FROM users WHERE username LIKE ?', [info.username]);
		if (res.length > 0)
			errors.error_username = 'Username already exists.';
	}
	if (info.password1 && info.password2 && info.password1 !== info.password2) {
		errors.error_password1 = 'Passwords do not match.';
		errors.error_password2 = 'Passwords do not match.';
	}
	if (!info.password1) {
		errors.error_password1 = 'Please enter a password.';
		errors.error_password2 = 'Please enter a password.';
	}
	else if (!info.password2)
		errors.error_password2 = 'Please repeat your password.';
	if (!info.email)
		errors.error_email = 'Please enter an E-Mail.';
	if (!info.firstname)
		errors.error_firstname = 'Please enter your first name'
	if (!info.lastname)
		errors.error_lastname = 'Please enter your last name'

	if (!errors.error_email && !errors.error_password1 && !errors.error_password2 &&
		!errors.error_username && !errors.error_firstname && !errors.error_lastname) {
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