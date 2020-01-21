const db = require("./Database");

module.exports = notify = async (user, message, socket) => {
	try {
		await db.personalQuery(
			"INSERT INTO notifications (userid, content) VALUES (?, ?)",
			[user, message]
		);
		if (socket)
			socket.emit("notification", message);
	} catch (error) {
	}
};
