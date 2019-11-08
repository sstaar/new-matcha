'use strict'
const express = require('express');
const db = require('../../../modules/Database');
const hash = require('../../../modules/bcrypt');
const jwt = require('jsonwebtoken');
const sv = require('../../../modules/validators/validator');
const iplocation = require("iplocation").default;

router = express.Router();

router.post('/login', async (request, response) => {

	let userSchema = {
		username: sv.string().required(),
		password: sv.string().required(),
		longitude: sv.number().required(),
		latitude: sv.number().required()
	}

	try {

		let info = await sv.validate(request.body, userSchema);

		console.log(info)

		if (info.latitude === 0 && info.longitude === 0) {
			let loc = await iplocation(request.body.ip);
			info.longitude = loc.longitude;
			info.latitude = loc.latitude;
		}
		console.log("Connect")

		let res = await db.personalQuery('SELECT * FROM users WHERE username LIKE ?', [info.username]);
		let match = false;
		if (res.length !== 0)
			match = await hash.comparing(info.password, res[0].password);
		if (res.length === 0 || match === false) {
			response.json({
				errors: {
					password: 'Username or password is incorect.',
					username: 'Username or password is incorect.'
				}
			})
		}
		else {
			await db.personalQuery('UPDATE users SET longitude = ?, latitude = ? WHERE username LIKE ?', [info.longitude, info.latitude, info.username]);
			const payload = { user: res[0].id }
			//const options = { expiresIn: '2d' }
			const result = await jwt.sign(payload, /*process.env.JWT_SECRET*/ "GALATA");
			response.json({
				id: res[0].id,
				username: res[0].username,
				firstname: res[0].firstname,
				lastname: res[0].lastname,
				token: result
			});
		}
		return;
	} catch (error) {
		console.log(error);
		if (error.customErrors)
			return response.json({ errors: error.customErrors });
		console.log(error.customErrors);
		return;
	}
});

module.exports = router;