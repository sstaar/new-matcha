const express = require('express');
const db = require('../../helpers/Database');
const fs = require('fs');

router = express.Router();

router.post('/removeimg', async (request, response) => {

	let info = {
		user: request.decoded.user,
		imageId: request.body.imageId
	};

	try {
		let imgPath = await db.personalQuery('SELECT path FROM images WHERE id = ?', [info.imageId]);
		imgPath = imgPath[0].path;
		if (fs.existsSync(imgPath))
			await fs.unlinkSync(imgPath);
		await db.personalQuery('DELETE FROM images WHERE id = ?', [info.imageId]);
		return response.json({ success: 'You have deleted the images successfully.' });
	} catch (err) {
		console.log(err);
		return response.json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;