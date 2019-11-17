'use strict'
const tags = require('../modules/tags');
const images = require('../modules/images');
const distance = require("./distance");

const mapTagsToUsers = async (user, users) => {
	let usersIds = users.map(item => item.id);
	let connectedUserTags = await tags.getUserTags(user);
	let usersTags = await tags.getUsersTags(usersIds);
	let res = users.map(item => {
		let tags = [];
		let tagsIds = [];
		usersTags.forEach(tag => {
			if (tag.userid === item.id) {
				tags.push(tag);
				tagsIds.push(tag.tagid)
			}
		});
		item.tags = tags
		item.commonTagsCount = connectedUserTags.filter(tag =>
			tagsIds.includes(tag.tagid)
		).length;
		return item;
	});
	return res;
};

const mapDistanceToUsers = (user, targetedUsers) => {
	let res = targetedUsers.map(item => {
		item.distance = distance(
			user.latitude,
			user.longitude,
			item.latitude,
			item.longitude
		);
		return item;
	});
	return res;
}

const sortUsersByDistance = (users) => {
	let res = users.sort((user1, user2) => user1.distance - user2.distance);
	return res;
}

const mapImagesToUsers = async (users) => {
	let imgs = await images.getAllImgs();
	for (let item of users) {
		var img = imgs.find((img) => img.user === item.id);
		if (img)
			item.imageId = img.id;
	}
	return users;
}

const usersFilterByDistance = (users, distance) => {
	let res = users.filter(item => item.distance <= distance)
	return res;
}

const usersFilterByOrientation = (users, orientation) => {
	let res = users.filter(item => (orientation === item.gender || orientation === "both"));
	return res;
}

const usersFilterByAge = (users, userAge, ageGap) => {
	let res = users.filter(item => Math.abs(userAge - item.age) <= ageGap);
	return res;
}

const getBiggestAge = (users) => {
	let ages = users.map((item) => item.age);
	let res = Math.max.apply(null, ages);
	return res;
}

const getBiggestDistance = (users) => {
	let distances = users.map((item) => item.distance);
	let res = Math.max.apply(null, distances);
	return res;
}

const getBiggestFame = (users) => {
	let fames = users.map((item) => item.fame_rating);
	let res = Math.max.apply(null, fames);
	return res;
}

module.exports = {
	mapTagsToUsers,
	sortUsersByDistance,
	mapDistanceToUsers,
	mapImagesToUsers,
	usersFilterByDistance,
	usersFilterByOrientation,
	usersFilterByAge,
	getBiggestAge,
	getBiggestDistance,
	getBiggestFame
}
