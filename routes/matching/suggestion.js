"use strict";
const express = require("express");
const db = require("../../helpers/Database");
const distance = require("../../helpers/distance");
const fs = require('fs')

router = express.Router();

// const getBase64 = (file) => {
//   // read binary data
//   var bitmap = ;
//   console.log(bitmap);
//   // convert binary data to base64 encoded string
// }

router.post("/suggestion", async (request, response) => {
  let info = {
    user: request.decoded.user,
    longitude: 0,
    latitude: 0
  };
  try {
    let res = await db.personalQuery(
      "SELECT latitude, longitude  FROM users WHERE id LIKE ?",
      [info.user]
    );
    info = { ...info, ...res[0] };
    const dist = 50;
    res = await db.personalQuery(
      `SELECT * FROM users WHERE (id NOT LIKE ?)
                                        AND id NOT IN (SELECT secondaryuser FROM relations WHERE primaryuser = ?)
                                        AND id NOT IN (SELECT user1 FROM matches WHERE user2 LIKE ?)
                                        AND id NOT IN (SELECT user2 FROM matches WHERE user1 LIKE ?)
                                        AND id NOT IN (SELECT user2 FROM block WHERE user1 LIKE ?)`,
      [info.user, info.user, info.user, info.user, info.user]
    );
    let userOrientation = await db.personalQuery(
      "SELECT orientation FROM users WHERE id = ?",
      [info.user]
    );
    userOrientation = userOrientation[0].orientation;
    res = res.filter(item => {
      let distanceBetween = distance(
        info.latitude,
        info.longitude,
        item.latitude,
        item.longitude
      );
      return (
        distanceBetween < 10000 &&
        (userOrientation === item.gender || userOrientation === "both")
      );
    });
    res = res.sort((user1, user2) => {
      let distance1 = distance(
        info.latitude,
        info.longitude,
        user1.latitude,
        user1.longitude
      );
      let distance2 = distance(
        info.latitude,
        info.longitude,
        user2.latitude,
        user2.longitude
      );
      return distance1 - distance2;
    });

    if (res.length === 0) return response.json({ res });

    //------------
    let existingTags = res.map(item => item.id);
    let connectedUserTags = await db.personalQuery(
      "SELECT tagid FROM usertags WHERE userid = ?",
      [info.user]
    );
    let suggestionUsersTags = await db.personalQuery(
      "SELECT * FROM usertags WHERE userid IN (?)",
      [existingTags]
    );
    console.log(connectedUserTags);
    res.forEach(user => {
      let tags = [];
      console.log(user.username);
      suggestionUsersTags.forEach(item => {
        if (item.userid === user.id) tags.push(item.tagid);
      });
      console.log(tags);
      user.commonTagsCount = connectedUserTags.filter(tag =>
        tags.includes(tag.tagid)
      ).length;
    });
    //------------

    res.forEach(item => {
      item.distance = distance(
        info.latitude,
        info.longitude,
        item.latitude,
        item.longitude
      );
    });

    let imgs = await db.personalQuery(`SELECT * FROM images`);
    console.log(imgs)
    let i = 0;
    for (let item of res) {

      var img = imgs.find((img) => img.user === item.id);
      if (img)
        item.imageId = img.id;
    }

    response.json(res);
  } catch (error) {
    console.log(error);
    return response.json({
      error: "Something is wrong."
    });
  }
});

module.exports = router;
