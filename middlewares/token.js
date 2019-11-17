'use strict'
const jwt = require('jsonwebtoken');
const db = require('../helpers/Database')

exports.validateToken = async (request, res, next) => {

	const authorizationBody = request.body.token;
	// return res.json( request.body);
	let result;
	if (authorizationBody) {
		const token = authorizationBody; // Bearer <token>
		const options = {
			expiresIn: '2d'
		};
		try {

			// Verify makes sure that the token hasn't expired and has been issued by us.
			result = jwt.verify(token, process.env.JWT_SECRET || "GALATA", options);

			// Let's pass back the decoded token to the request object.
			request.decoded = result;
			const user = await db.personalQuery('SELECT * FROM users WHERE id = ?', [result.user]);
			if (user.length != 1)
				return res.status(401).json({ error: `Authentication error.7mar.` })
			// We call next to pass execution to the subsequent middleware.
			return next();
		} catch (err) {
			// Throw an error just in case anything goes wrong with verification.
			return res.status(500).json({
				error: "PORN"
			})
		}
	}
	else {
		console.log("HAHA");
		result = {
			error: `Authentication error. Token required al7mar.`,
		};
		return res.status(200).send(result);
	}
};