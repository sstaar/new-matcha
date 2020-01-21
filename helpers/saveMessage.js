'use strict'
const db = require('../helpers/Database');
const tokenToId = require('./tokenToId').tokenToId;

module.exports = async (senderToken, receiver, message) => {
	let sender = tokenToId(senderToken);

	try {
		await db.personalQuery('INSERT INTO messages (sender, receiver, message) VALUE (?, ?, ?)', [
			sender,
			receiver,
			message
		]);
		let temp = await db.personalQuery('SELECT LAST_INSERT_ID() as id');
		temp = await db.personalQuery('SELECT * FROM messages WHERE id LIKE ?', [temp[0].id]);
		return temp[0];
	} catch (error) {
		return { error: 'Something is wrong.' };
	}
};