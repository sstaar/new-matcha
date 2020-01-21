const express = require('express');
const fs = require('fs');
const images = require('../../modules/images');

router = express.Router();

router.post('/removeimg', async (request, response) => {

	let info = {
		user: request.decoded.user,
		imageId: request.body.imageId
	};

	try {
		let img = await images.getImgById(info.imageId);
		if (!img)
			return response.json({
				error: 'Something is wrong.'
			});
		imgPath = img.path;
		if (fs.existsSync(imgPath))
			await fs.unlinkSync(imgPath);
		await images.deleteImg(info.imageId);
		return response.json({ success: 'You have deleted the images successfully.' });
	} catch (err) {
		return response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;