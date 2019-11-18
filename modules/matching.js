const db = require('../helpers/Database');

const getUserMatches = async (userId) => {
	let res1 = await db.personalQuery('SELECT user2 FROM matches WHERE user1 LIKE ?', [userId])
	let res2 = await db.personalQuery('SELECT user1 FROM matches WHERE user2 LIKE ?', [userId]);
	return [...res1, ...res2];
};

const userMatchedWith = async (userId, targetId) => {
	let res = await db.personalQuery(
		"SELECT * FROM matches WHERE user1 IN (?, ?) AND user2 IN (?, ?)",
		[userId, targetId, targetId, userId]
	);
	if (res.length === 0)
		return null;
	return res[0];
};

const userRelationWith = async (userId, targetId) => {
	res = await db.personalQuery(
		"SELECT * FROM relations WHERE primaryuser LIKE ? AND secondaryuser LIKE ?",
		[userId, targetId]
	);
	if (res.length === 0)
		return null;
	return res[0].relation;
};

const createRelation = async (userId, targetId, relation) => {
	await db.personalQuery(
		"INSERT INTO relations ( primaryuser, secondaryuser, relation ) VALUES (?, ?, ?)",
		[userId, targetId, relation]
	);
};

const matchUserWith = async (userId, targetId) => {
	await db.personalQuery(
		"INSERT INTO matches ( user1, user2 ) VALUES (?, ?)",
		[userId, targetId]
	);
	await db.personalQuery(
		"DELETE FROM relations WHERE primaryuser LIKE ? AND secondaryuser LIKE ? AND relation = 1",
		[targetId, userId]
	);
};

const getPossibleSuggestions = async (userId) => {
	let res = await db.personalQuery(
		`SELECT * FROM users WHERE (id NOT LIKE ?)
                                        AND id NOT IN (SELECT secondaryuser FROM relations WHERE primaryuser = ?)
                                        AND id NOT IN (SELECT user1 FROM matches WHERE user2 LIKE ?)
                                        AND id NOT IN (SELECT user2 FROM matches WHERE user1 LIKE ?)
                                        AND id NOT IN (SELECT user2 FROM block WHERE user1 LIKE ?)`,
		[userId, userId, userId, userId, userId]
	);
	if (res.length === 0)
		return null;
	return res;
};

const removeMatch = async (userId, targetId) => {
	await db.personalQuery(`DELETE FROM matches WHERE user1 IN (?, ?) AND user2 IN (?, ?)`, [
		userId,
		targetId,
		userId,
		targetId
	]);
};

const removeRelation = async (userId, targetId) => {
	await db.personalQuery(`DELETE FROM relations WHERE primaryuser = ? AND secondaryuser = ?`, [
		userId,
		targetId
	]);
};

const search = async (info) => {
	console.log(info)
	let res = await db.personalQuery(`SELECT * FROM users WHERE
                        id != ? AND
						id IN (SELECT userid FROM usertags WHERE tagid IN (?)) AND
						id NOT IN (SELECT user2 FROM block WHERE user1 LIKE ?)`,
		info);
	return res;
}

module.exports = {
	getUserMatches,
	userMatchedWith,
	userRelationWith,
	createRelation,
	matchUserWith,
	getPossibleSuggestions,
	removeMatch,
	removeRelation,
	search
}