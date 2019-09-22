const express		= require('express');
const db			= require('../../modules/Database');
const jwt			= require('jsonwebtoken');

router = express.Router();

router.post('/general', async (request, response) => {
	let resp = {};
	let user = null;

	if (!request.body.token)
		resp = { error: "Something is wrong!" };

	// console.log(request.decoded.user);

	let info = {
		token:	request.body.token
	};

	token = jwt.verify(info.token, "GALATA");

	if (!resp.error && !token.user)
		resp = { error: "Something is wrong!" };

	if (!resp.error) {
		try {
			user = await db.personalQuery('SELECT * FROM users WHERE id LIKE ?', [ token.user ]);
		if (user.length === 0)
			resp = { error: "Something is wrong!" };
		else
			resp = {
				username		: user[0].username,
				firstname		: user[0].firstname,
				lastname		: user[0].lastname,
				gender			: user[0].gender,
				age				: user[0].age,
				bio				: user[0].bio
			};
		}catch(err) {
			resp = { error:err };
		}
	}
	response.json(resp);

});

module.exports = router;