const express = require('express');
const db = require('../../helpers/Database');
const sv = require('../../helpers/validators/validator');
const iplocation = require("iplocation").default;
const user = require('../../modules/user');


router = express.Router();

router.post('/resetloc', async (request, response) => {

	let userSchema = {
		longitude: sv.number().required(),
		latitude: sv.number().required(),
	}

	let info = {
		user: request.decoded.user,
		longitude: request.body.longitude,
		latitude: request.body.latitude,
		ip: request.body.ip
	};


	console.log(info);

	try {
		await sv.validate(info, userSchema);


		if (info.latitude === 0 && info.longitude === 0) {
			let loc = await iplocation(request.body.ip);
			info.longitude = loc.longitude;
			info.latitude = loc.latitude;
		}

		console.log(info);
		await user.updateLocation([
			info.longitude,
			info.latitude,
			info.user,
		]);
		return response.json({ success: 'Your informations have been updated.' })

	} catch (error) {
		console.log(error);
		if (error.customErrors)
			return response.json({ errors: error.customErrors });
		console.log(error.customErrors);
		return;
	}

	response.json(resp);
});

module.exports = router;