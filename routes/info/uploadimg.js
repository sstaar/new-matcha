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
		let imgsCount = await images.getUserImages(info.user);
		if (imgsCount[0].count >= 5)
			return response.json({ warning: "You exceeded 5 images." })
		let newImg = await images.addImage(info.user, info.img.path);
		return response.json(newImg);
	} catch (err) {
		console.log(err);
		response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;