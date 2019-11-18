const db = require('../helpers/Database');

const getConversation = async (userId, targetId) => {
	let messages = await db.personalQuery(`SELECT messages.*, users.username as connected_username, users.id as connected_id FROM messages INNER JOIN users ON users.id = ? WHERE sender IN (?, ?) AND receiver IN (?, ?);`, [
		userId,
		userId,
		targetId,
		userId,
		targetId
	])
	return messages;
}

module.exports = {
	getConversation
}