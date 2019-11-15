const db = require('../helpers/Database');

const getUserHistory = async (userId) => {
	let res = await db.personalQuery(`SELECT user, invoker, content, username, date FROM history
                        INNER JOIN users ON history.user = users.id
						WHERE user = ? ORDER BY date desc`, [userId]);
	return res;
}

module.exports = {
	getUserHistory,
}