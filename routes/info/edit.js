const express = require('express');
const sv = require('../../helpers/validators/validator');
const hash = require('../../helpers/bcrypt');
const user = require('../../modules/user');


router = express.Router();

router.post('/edit', async (request, response) => {

	let userSchema = {
		firstname: sv.string().required(),
		lastname: sv.string().required(),
		orientation: sv.string().required().match(/^(male|female|both)$/),
		gender: sv.string().required().match(/^(male|female)$/),
		newUsername: sv.string().required(),
		newPassword: sv.string().required().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,50})/, "Password not stront enough."),
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

	try {
		await sv.validate(info, userSchema);

		let userInfo = await user.getUserById(info.user);
		let match = await hash.comparing(info.oldPassword, userInfo.password);
		if (match === false)
			return response.json({ errors: { oldPassword: 'Old password is not correct.' } })
		let newPass = await hash.hashing(info.newPassword);
		await user.updateUserInfo([
			info.newUsername,
			newPass,
			info.firstname,
			info.lastname,
			info.gender,
			info.bio,
			info.orientation,
			info.user,
		])
		return response.json({ success: 'Your informations have been updated.' })
	} catch (error) {
		if (error.customErrors)
			return response.json({ errors: error.customErrors });
		return;
	}
});

module.exports = router;