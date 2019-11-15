const express = require('express');
const user = require('../../modules/user');

router = express.Router();

router.post('/general', async (request, response) => {

	let info = {
		user: request.decoded.user
	};

	try {
		userInfo = await user.getUserById(info.user);
		if (!userInfo)
			return response.json({ error: "Something is wrong!" });
		let userImgs = await user.getUserImgs(info.user);
		return response.json({
			username: userInfo.username,
			firstname: userInfo.firstname,
			lastname: userInfo.lastname,
			gender: userInfo.gender,
			age: userInfo.age,
			bio: userInfo.bio,
			fame_rate: userInfo.fame_rating,
			longitude: userInfo.longitude,
			latitude: userInfo.latitude,
			images: userImgs,
			orientation: userInfo.orientation
		});
	} catch (err) {
		console.log(err);
		return response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;