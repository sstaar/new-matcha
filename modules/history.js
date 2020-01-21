const db = require('../helpers/Database');

const getUserHistory = async (userId) => {
	let res = await db.personalQuery(`SELECT history.id, user, invoker, content, username, date FROM history
                        INNER JOIN users ON history.invoker = users.id
						WHERE user = ? ORDER BY date desc`, [userId]);
	return res;
}

const getUserNotifs = async (userId) => {
	let res = await db.personalQuery(`SELECT * FROM notifications
										WHERE userid = ? ORDER BY date desc`,
		[userId]);
	await db.personalQuery(`UPDATE notifications SET \`read\` = 1 WHERE userid = ?`, [userId])
	return res;
}

module.exports = {
	getUserHistory,
	getUserNotifs
}