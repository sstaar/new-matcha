'use strict'
const express = require('express');
const fs = require('fs');
const images = require('../../modules/images');

router = express.Router();

router.post('/serveimg', async (request, response) => {

	// response.sendFile(, { root: 'images' });
	const info = {
		imgId: request.body.imgId,
		user: request.decoded.user
	}

	try {
		let img = await images.getImgById(info.imgId);
		if (img === null)
			return response.json({ error: "Something is wrong." });
		img = fs.readFileSync(img.path, { encoding: 'base64' });
		img = "data:" + "image/jpg" + ";base64," + img;
		response.json({ img })
	} catch (error) {
		console.log(error);
		response.json({
			error: 'Something is wrong.'
		});
	}
});

module.exports = router;