const express = require('express');
const db = require('../../modules/Database');
const jwt = require('jsonwebtoken');
const sv = require('../../modules/validators/validator');

router = express.Router();

router.post('/edit', async (request, response) => {

	let userSchema = {
		firstname: sv.string().required(),
		lastname: sv.string().required(),
		orientation: sv.string().required().match(/^(male|female|both)$/),
		gender: sv.string().required().match(/^(male|female)$/),
		longitude: sv.number().required(),
		latitude: sv.number().required(),
	}

	let info = {
		user: request.decoded.user,
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		gender: request.body.gender,
		bio: request.body.bio,
		orientation: request.body.orientation,
		longitude: request.body.longitude,
		latitude: request.body.latitude
	};

	console.log(info);

	try {
		await sv.validate(info, userSchema);
		console.log(info);

		await db.personalQuery(`UPDATE users SET
					firstname = ?, lastname = ?, gender = ?, bio = ?, orientation = ?, longitude = ?, latitude = ?
					WHERE id LIKE ? `, [
				info.firstname,
				info.lastname,
				info.gender,
				info.bio,
				info.orientation,
				info.longitude,
				info.latitude,
				info.user,
			]);
		return response.json({ success: 'You informations have been updated.' })

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