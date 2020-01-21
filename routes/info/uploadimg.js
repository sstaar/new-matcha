'use strict'
const express = require('express');
const images = require('../../modules/images');

router = express.Router();

router.post('/uploadimg', async (request, response) => {

	let info = {
		user: request.decoded.user,
		img: request.file
	};

	try {
		if (!info.img || info.img.size < 100)
			return response.json({ error: "Please upload an image." });
		let imgsCount = await images.getUserImages(info.user);
		if (imgsCount && imgsCount[0].count >= 5)
			return response.json({ warning: "You exceeded 5 images." });
		let newImg = await images.addImage(info.user, info.img.path);
		return response.json(newImg);
	} catch (err) {
		return response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;
