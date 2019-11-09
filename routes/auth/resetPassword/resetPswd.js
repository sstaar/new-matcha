"use strict";
const express = require("express");
const db = require("../../../modules/Database");
const hash = require("../../../modules/bcrypt");
const sv = require("../../../modules/validators/validator");
const mail = require("../../../modules/mail");
const crypto = require("crypto");

router = express.Router();

router.post("/resetPassword", async (req, res) => {
  //get email from body
  const email = req.body.email;
  const username = req.body.username;
  // check email

  const infoSchema = {
    email: sv
      .string()
      .required()
      .email(),
    username: sv.string().required()
  };

  try {
    await sv.validate(req.body, infoSchema);
    // check if the user exists
    const user = await db.personalQuery(
      "SELECT * FROM users where email = ? AND username = ?",
      [email, username]
    );
    if (user.length === 0)
      return res.json({
        errors: {
          username: "Informations are not correct.",
          email: "Informations are not correct."
        }
      });
    var resetToken = await crypto.randomBytes(32).toString("hex");
    await db.personalQuery(
      "UPDATE users SET resetToken = ? WHERE email = ? and username = ?",
      [resetToken, email, username]
    );
    await mail.sendEmail(
      email,
      "resetPass",
      `
				<h1>Hello !</h1>
				<p>Here is your link to reset the password http://localhost:3000/resetPassword/${resetToken}</p>
			`
    );
    return res.json({ success: "Action Done Please check your email" });
  } catch (error) {
    console.log(error);
    if (error.customErrors) return res.json({ errors: error.customErrors });
    return;
  }
});

router.post("/resetChangePassword", async (req, res) => {
  const newPassword = req.body.newPassword;
  const token = req.body.resetToken;

  //check token in database
  const infoSchema = {
    resetToken: sv.string().required(),
    newPassword: sv.string().required()
  };

  try {
    await sv.validate(req.body, infoSchema);
    const user = await db.personalQuery(
      "SELECT * FROM users WHERE resetToken = ?",
      [token]
    );
    if (user.length !== 1)
      return res.json({
        errors: { general: "something went wrong please try again later." }
      });
    let hashedPass = await hash.hashing(newPassword);
    // update the password
    await db.personalQuery(
      "UPDATE users SET password = ? WHERE resetToken = ?",
      [hashedPass, token]
    );
    return res.json({ success: "password updated successfully!" });
  } catch (error) {
    console.log(error);
    if (error.customErrors)
      return response.json({ errors: error.customErrors });
    return;
  }
});

module.exports = router;
