const express		= require('express');
const db			= require('../../../modules/Database');
const hash			= require('../../../modules/bcrypt');
const jwt			= require('jsonwebtoken');

router = express.Router();

router.post('/login', async (request, response) => {
	let info = {
		username: request.body.username,
		password: request.body.password
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
		let res = await db.personalQuery('SELECT * FROM users WHERE username LIKE ?', [ info.username ]);
		let match = false;
		if (res.length !== 0)
			match = await hash.comparing(info.password, res[0].password);
		if (res.length === 0 || match === false) {
			errors.error_password = 'Username or password is incorect.';
			errors.error_username = 'Username or password is incorect.';
		}
		else {
			//resp = res[0];
			const payload = { user: request.user }
			const options = { expiresIn: '2d' }
			const result = jwt.sign(payload, process.env.JWT_SECRET, options);
			resp = {
				username: res[0].username,
				firstname: res[0].firstname,
				lastname: res[0].lastname,
				token: result
			}
		}		
	}

	if (errors.error_password || errors.error_username)
		resp = errors;
	response.json(resp);
});

module.exports = router;