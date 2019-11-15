const db = require('../helpers/Database');

const createUser = async (info) => {
	await db.personalQuery(
		`INSERT INTO users
        (username, password, email, firstname, lastname, age, gender, emailHash)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)`,
		info
	);
};

const usernameExists = async (username) => {
	let user = await db.personalQuery(
		"SELECT * FROM users WHERE username LIKE ?",
		[username]
	);

	if (user.length === 0)
		return false;
	return true
};

const activateAccount = async (token) => {
	var checkToken = await db.personalQuery(
		"select * from users where emailHash = ?",
		[token]
	);
	if (checkToken.length === 0)
		return { error: "Invalid token." }
	if (checkToken[0].activated == 0 && checkToken[0].emailHash == token) {
		await db.personalQuery(
			"UPDATE users SET activated = 1 where emailHash = ?",
			[token]
		);
		return { success: "Your account is now activated" };
	} else if (checkToken[0].activated == 1)
		return { error: "Your account is already verified" };
	return { error: "Something is wrong." };

};

const getUserById = async (id) => {
	let user = await db.personalQuery('SELECT * FROM users WHERE id = ?', [id]);
	if (user.length === 0)
		return null;
	return user[0];
};

const getUserByUsername = async (username) => {
	let user = await db.personalQuery('SELECT * FROM users WHERE username LIKE ?', [username]);
	if (user.length === 0)
		return null;
	return user[0];
};

const setResetToken = async (info) => {
	await db.personalQuery(
		"UPDATE users SET resetToken = ? WHERE email = ? and username = ?",
		info
	);
};

const resetPassword = async (token, newPass) => {
	const user = await db.personalQuery(
		"SELECT * FROM users WHERE resetToken = ?",
		[token]
	);
	if (user.length !== 1)
		return {
			errors: { general: "something went wrong please try again later." }
		};
	await db.personalQuery(
		"UPDATE users SET password = ? WHERE resetToken = ?",
		[newPass, token]
	);
	return { success: "password updated successfully!" };
};

const updateLocation = async (info) => {
	await db.personalQuery(`UPDATE users SET longitude = ?, latitude = ? WHERE username LIKE ?`, info);
};

const blockUser = async (info) => {
	await db.personalQuery(`INSERT INTO block (user1, user2) VALUES (?, ?)`, info);
};

const reportUser = async (info) => {
	await db.personalQuery(`INSERT INTO reports (user1, user2) VALUES (?, ?)`, info);
};

const updateUserInfo = async (info) => {
	await db.personalQuery(`UPDATE users SET
					username = ?, password =?, firstname = ?, lastname = ?, gender = ?, bio = ?, orientation = ?
					WHERE id LIKE ? `, info);
};

const getUserImgs = async (userId) => {
	let userImgs = await db.personalQuery('SELECT path, id from images WHERE user = ?', [userId]);
	return userImgs;
};
const getUsersInfo = async (users) => {
	usersInfo = await db.personalQuery('SELECT id, username, firstname, lastname FROM users WHERE id IN (?)', [users]);
	return usersInfo;
}

const updateFameRating = async (userId, newFame) => {
	await db.personalQuery(
		"UPDATE users SET fame_rating = ? WHERE id LIKE ?",
		[newFame, userId]
	);
}

module.exports = {
	createUser,
	usernameExists,
	activateAccount,
	getUserById,
	getUserByUsername,
	updateLocation,
	setResetToken,
	resetPassword,
	blockUser,
	reportUser,
	updateUserInfo,
	getUserImgs,
	getUsersInfo,
	updateFameRating
}