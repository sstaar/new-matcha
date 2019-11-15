const db = require('../helpers/Database');

const getImgById = async (id) => {
	let img = await db.personalQuery('SELECT path FROM images WHERE id = ?', [id]);
	if (img.length === 0)
		return null;
	return img[0];
};

const deleteImg = async (imageId) => {
	await db.personalQuery('DELETE FROM images WHERE id = ?', [imageId]);
};

const getUserImages = async (userId) => {
	let imgs = await db.personalQuery('SELECT * FROM images WHERE user = ?', [userId]);
	if (imgs.length === 0)
		return null;
	return imgs;
};

const addImage = async (userId, imgPath) => {
	await db.personalQuery('INSERT INTO images (user, path) VALUES (?, ?)', [userId, imgPath]);
	let temp = await db.personalQuery('SELECT LAST_INSERT_ID() as id');
	temp = await db.personalQuery('SELECT * FROM images WHERE id LIKE ?', [temp[0].id]);
	return temp[0];
}

const getAllImgs = async () => {
	let imgs = await db.personalQuery(`SELECT * FROM images`);
	return imgs;
}

module.exports = {
	getImgById,
	deleteImg,
	getUserImages,
	addImage,
	getAllImgs
}