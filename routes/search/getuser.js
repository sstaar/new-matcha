"use strict";
const express = require("express");
const db = require("../../helpers/Database");
const distance = require("../../helpers/distance");
const addToHistory = require("../../helpers/history").addToHistory;

router = express.Router();

router.post("/getuser", async (request, response) => {
  const sqlQuery1 = `SELECT * FROM users WHERE id = ?`;
  const sqlQuery2 = `SELECT * FROM relations WHERE primaryuser = ? AND secondaryuser = ?`;
  const sqlQuery3 = `SELECT * FROM matches WHERE user1 IN (?, ?) AND user2 IN (?, ?)`;
  let info = {
    user: request.decoded.user,
    target: request.body.target
  };

  try {
    let res = await db.personalQuery(sqlQuery1, [info.target]);
    let likes = await db.personalQuery(sqlQuery2, [info.user, info.target]);
    let matches = await db.personalQuery(sqlQuery3, [
      info.user,
      info.target,
      info.user,
      info.target
    ]);

    if (res.length === 0)
      return response.json({ error: "Error 404 user not found." });
    // for relation 1=> matched|0=>liked|-1=>no relation
    let relation = -1;
    res = res[0];
    if (likes.length > 0) relation = 0;
    else if (matches.length > 0) relation = 1;
    let user = await db.personalQuery(sqlQuery1, [info.user]);
    user = user[0];
    let dist = await distance(
      user.latitude,
      user.longitude,
      res.latitude,
      res.longitude
    );
    addToHistory(
      info.target,
      info.user,
      " has visited you.",
      request.sockets[info.target]
    ); //In the front-end we will display for example "Test has visited you."
    let userImgs = await db.personalQuery(
      "SELECT path from images WHERE user = ?",
      [info.target]
    );
    let tags = await db.personalQuery(
      "select tagname, userid, tagid from usertags INNER JOIN tags ON usertags.tagid = tags.id WHERE userid = ?",
      [info.target]
    );
    return response.json({
      id: res.id,
      username: res.username,
      firstname: res.firstname,
      lastname: res.lastname,
      gender: res.gender,
      age: res.age,
      bio: res.bio,
      distance: dist,
      relation,
      is_online: res.is_online,
      last_connection: res.last_connection,
      fame_rate: res.fame_rating,
      images: userImgs,
      tags
    });
  } catch (error) {
    console.log(error);
    return response.json({
      error: "Something is wrong."
    });
  }
});

module.exports = router;
