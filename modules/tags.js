const db = require('../helpers/Database');

const getUserTags = async (userId) => {
	let userTags = await db.personalQuery(`SELECT tagname, tagid FROM users INNER JOIN usertags ON users.id = usertags.userid
											INNER JOIN tags ON usertags.tagid = tags.id
											WHERE users.id LIKE ?`, [userId]);
	return userTags;
};

const getTagByName = async (tagName) => {
	let tags = await db.personalQuery("SELECT * FROM tags WHERE `tagname` LIKE ?", [tagName]);
	if (tags.length === 0)
		return null;
	return tags[0];
};

const addTagToBoth = async (user, tagName) => {
	await db.personalQuery('INSERT INTO tags (tagname) VALUES (?)', [tagName]);
	let tagid = await db.personalQuery('SELECT LAST_INSERT_ID() as id');
	await db.personalQuery('INSERT INTO usertags (userid, tagid) VALUE (?, ?)', [user, tagid[0].id]);
	return tagid[0];
};

const addTagToUser = async (user, tagId) => {
	let already = await db.personalQuery(`SELECT * FROM users INNER JOIN usertags ON users.id = usertags.userid
											WHERE users.id LIKE ? AND usertags.tagid LIKE ? `, [user, tagId]);
	if (already.length !== 0)
		return null;
	await db.personalQuery('INSERT INTO usertags (userid, tagid) VALUES (?, ?)', [user, tagId]);
	return tagId
};

const getAllTags = async () => {
	let result = await db.personalQuery('SELECT * FROM tags');
	return result;
};

const getUserTag = async (userId, tagId) => {
	let result = await db.personalQuery('SELECT * FROM usertags WHERE userid LIKE ? AND tagid LIKE ?', [userId, tagId]);
	if (result.length === 0)
		return null
	return result[0];
};

const deleteUserTag = async (userId, tagId) => {
	await db.personalQuery('DELETE FROM usertags WHERE userid LIKE ? AND tagid LIKE ?', [userId, tagId]);
}

const getUsersTags = async (users) => {
	let tags = await db.personalQuery(
		"SELECT usertags.userid as userid, usertags.tagid, tags.tagname as tagname FROM usertags INNER JOIN tags ON usertags.tagid = tags.id WHERE usertags.userid IN (?)",
		[users]
	);
	return tags;
}

module.exports = {
	getUserTags,
	getTagByName,
	addTagToBoth,
	addTagToUser,
	getAllTags,
	getUserTag,
	deleteUserTag,
	getUsersTags
}