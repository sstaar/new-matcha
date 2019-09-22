const express = require('express');
const db = require('../../../modules/Database');
const hash = require('../../../modules/bcrypt');
const jwt = require('jsonwebtoken');

router = express.Router();

router.post('/login', async (request, response) => {
	let info = {
		username: request.body.username,
		password: request.body.password,
		longitude: request.body.longitude,
		latitude: request.body.latitude
	};

	let errors = {
		error_username: null,
		error_password: null
	};

	let resp = {};

	if (!info.username)
		errors.error_username = 'Please enter your username.';
	if (!info.password)
		errors.error_password = 'Please enter your password.';

	if (!errors.error_password && !errors.error_username) {
		try {
			let res = await db.personalQuery('SELECT * FROM users WHERE username LIKE ?', [info.username]);
			let match = false;
			if (res.length !== 0)
				match = await hash.comparing(info.password, res[0].password);
			if (res.length === 0 || match === false) {
				errors.error_password = 'Username or password is incorect.';
				errors.error_username = 'Username or password is incorect.';
			}
			else {
				await db.personalQuery('UPDATE users SET longitude = ?, latitude = ? WHERE username LIKE ?', [ info.longitude, info.latitude, info.username ]);
				const payload = { user: res[0].id }
				//const options = { expiresIn: '2d' }
				const result = await jwt.sign(payload, /*process.env.JWT_SECRET*/ "GALATA");
				resp = {
					id: res[0].id,
					username: res[0].username,
					firstname: res[0].firstname,
					lastname: res[0].lastname,
					token: result
				}
			}
		}catch(err) {
			errors.error_password = 'Something went wrong.';
			errors.error_username = 'Something went wrong.';
		}
	}

	if (errors.error_password || errors.error_username)
		resp = errors;
	response.json(resp);
});

module.exports = router;