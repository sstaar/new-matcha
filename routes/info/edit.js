const express = require('express');
const db = require('../../helpers/Database');
const sv = require('../../helpers/validators/validator');
const hash = require('../../helpers/bcrypt');


router = express.Router();

router.post('/edit', async (request, response) => {

	let userSchema = {
		firstname: sv.string().required(),
		lastname: sv.string().required(),
		orientation: sv.string().required().match(/^(male|female|both)$/),
		gender: sv.string().required().match(/^(male|female)$/),
		newUsername: sv.string().required(),
		newPassword: sv.string().required(),
		oldPassword: sv.string().required()

	}

	let info = {
		user: request.decoded.user,
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		gender: request.body.gender,
		bio: request.body.bio,
		orientation: request.body.orientation,
		newUsername: request.body.newUsername,
		newPassword: request.body.newPassword,
		oldPassword: request.body.oldPassword
	};

	console.log(info);

	try {
		await sv.validate(info, userSchema);
		console.log(info);

		let oldPass = await db.personalQuery(`SELECT password FROM users WHERE id = ?`, [info.user]);
		console.log(oldPass[0].password, info.oldPassword)
		let match = await hash.comparing(info.oldPassword, oldPass[0].password);
		if (match === false)
			return response.json({ errors: { oldPassword: 'Old password is not correct.' } })

		let newPass = await hash.hashing(info.newPassword);

		await db.personalQuery(`UPDATE users SET
					username = ?, password =?, firstname = ?, lastname = ?, gender = ?, bio = ?, orientation = ?
					WHERE id LIKE ? `, [
				info.newUsername,
				newPass,
				info.firstname,
				info.lastname,
				info.gender,
				info.bio,
				info.orientation,
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