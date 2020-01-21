'use strict'
const express = require('express');
const user = require('../../modules/user');
router = express.Router();

router.post('/blockuser', async (request, response) => {
	let info = {
		user: request.decoded.user,
		target: request.body.target
	};

	try {
		if (info.user === info.target)
			return response.json({ error: "Seb7an lah...You can't block yourself." });
		await user.blockUser([info.user, info.target]);
		return response.json({ success: 'You blocked the user' });
	} catch (error) {
		return response.status(500).json({
			error: 'Something is wrong.'
		});
	}

});

module.exports = router;