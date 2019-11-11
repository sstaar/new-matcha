'use strict'
const express = require('express');
const hash = require('../../../helpers/bcrypt');
const jwt = require('jsonwebtoken');
const sv = require('../../../helpers/validators/validator');
const iplocation = require("iplocation").default;
const user = require('../../../modules/user');

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

		if (info.latitude === 0 && info.longitude === 0) {
			let loc = await iplocation(request.body.ip);
			info.longitude = loc.longitude;
			info.latitude = loc.latitude;
		}

		let userInfo = await user.getUserByUsername(info.username);
		let match = false;
		if (userInfo !== null)
			match = await hash.comparing(info.password, userInfo.password);
		if (userInfo === null || match === false) {
			return response.json({
				errors: {
					password: 'Username or password is incorect.',
					username: 'Username or password is incorect.'
				}
			});
		}
		await user.updateLocation([info.longitude, info.latitude, info.username]);
		const payload = { user: userInfo.id }
		//const options = { expiresIn: '2d' }
		const result = await jwt.sign(payload, /*process.env.JWT_SECRET*/ "GALATA");
		return response.json({
			id: userInfo.id,
			username: userInfo.username,
			firstname: userInfo.firstname,
			lastname: userInfo.lastname,
			token: result
		});
	} catch (error) {
		console.log(error);
		if (error.customErrors)
			return response.json({ errors: error.customErrors });
		console.log(error.customErrors);
		return;
	}
});

module.exports = router;