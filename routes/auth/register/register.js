const express = require('express');
const db = require('../../../modules/Database');
const hash = require('../../../modules/bcrypt');
const sv = require('../../../modules/validators/validator');
const DateDiff = require('date-diff');

router = express.Router();

router.post('/register', async (request, response) => {

	let userSchema = {
		username: sv.string().required(),
		password1: sv.string().required(),
		password2: sv.string().required(),
		firstname: sv.string().required(),
		lastname: sv.string().required(),
		email: sv.string().required().email(),
		birthday: sv.string().required().date(),
		gender: sv.string().required().match(/^(male|female)$/),
	}

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
		console.log('HAHA');
		let info = await sv.validate(request.body, userSchema);
		let res = await db.personalQuery('SELECT * FROM users WHERE username LIKE ?', [info.username]);
		
		if (res.length > 0)
			errors['username'] = 'Username already exists.';
		if (info.password1 && info.password2 && info.password1 !== info.password2) {
			errors['password1'] = 'Passwords do not match.';
			errors['password2'] = 'Passwords do not match.';
		}
		
		let age = new DateDiff(new Date(), new Date(info.birthday));
		age = age.years();

		console.log(age);
		if (age < 18)
			errors['birthday'] = 'You have to be older than 18 years old.';

		if (Object.keys(errors).length > 0)
			return response.json({ errors });
			
		let hashedPass = await hash.hashing(info.password1);
		await db.personalQuery(
			"INSERT INTO users (`username`, `password`, `email`, `firstname`, `lastname`, `age`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?)", [
				info.username,
				hashedPass,
				info.email,
				info.firstname,
				info.lastname,
				age,
				info.gender
			]);
		return response.json({ success: 'Account has been created please chech your mail for activation.' });
	} catch (error) {
		console.log(error);
		if (error.customErrors)
			return response.json({ errors: error.customErrors });
		console.log(error.customErrors);
		return;
	}
});

module.exports = router;