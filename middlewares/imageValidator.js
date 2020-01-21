'use strict'
const db = require('../helpers/Database')

exports.imageValidator = async (request, response, next) => {

	try {
		const userImages = await db.personalQuery('SELECT * FROM images WHERE user = ?', [request.decoded.user])
		if (userImages.length === 0)
			return response.json({ error: `You need at least one picture.` });
		return next();
	} catch (err) {
		// Throw an error just in case anything goes wrong with verification.
		return response.status(500).json({
			error: "PORN"
		})
	}
};