const express		= require('express');
const db			= require('../../modules/Database');
const jwt			= require('jsonwebtoken');

router = express.Router();

const validateInfo = (info) => {
	if (info)
		return (info);
	return ('none');
};

const validateGender = (gender) => {
	if (gender && (gender === "male" || gender === "female"))
		return (gender);
	return ('none')
};

router.post('/edit', async (request, response) => {
	let resp = {};
	let regex = /^[0-9]+$/;

	if (!request.body.token)
		resp = { error: "Something is wrong!" };
	let info = {
		token		: validateInfo(request.body.token),
		firstname	: validateInfo(request.body.firstname),
		lastname	: validateInfo(request.body.lastname),
		gender		: validateGender(request.body.gender),
		age			: regex.test(request.body.age) ? request.body.age : 0,
		bio			: validateInfo(request.body.bio)
	};

	token = jwt.verify(info.token, "GALATA");

	if (!token.user)
		resp = { error: "Something is wrong!" };

	try {
		if (!resp.error) {
			await db.personalQuery("UPDATE users SET firstname = ?, lastname = ?, gender = ?, age = ?, bio = ? WHERE id LIKE ?", [
				info.firstname,
				info.lastname,
				info.gender,
				info.age,
				info.bio,
				token.user
			]);
		}
	} catch (err) {
		resp = { error: "Something is wrong!" };
	}
	
	response.json(resp);
});

module.exports = router;