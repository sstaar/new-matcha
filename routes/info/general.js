const express = require('express');
const db = require('../../helpers/Database');

router = express.Router();

router.post('/general', async (request, response) => {

	let info = {
		user: request.decoded.user
	};

	try {
		user = await db.personalQuery('SELECT * FROM users WHERE id LIKE ?', [info.user]);
		if (user.length === 0)
			return response.json({ error: "Something is wrong!" });
		let userImgs = await db.personalQuery('SELECT path, id from images WHERE user = ?', [info.user]);
		return response.json({
			username: user[0].username,
			firstname: user[0].firstname,
			lastname: user[0].lastname,
			gender: user[0].gender,
			age: user[0].age,
			bio: user[0].bio,
			fame_rate: user[0].fame_rating,
			longitude: user[0].longitude,
			latitude: user[0].latitude,
			images: userImgs,
			orientation: user[0].orientation
		});
	} catch (err) {
		console.log(err);
		return response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;