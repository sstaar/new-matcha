'use strict'
const express = require('express');
const db = require('../../../modules/Database');
const hash = require('../../../modules/bcrypt');
const jwt = require('jsonwebtoken');
const sv = require('../../../modules/validators/validator');
const mail = require('../../../modules/mail');
const crypto = require('crypto');


router = express.Router();

router.post('/resetPassword', async (req, res) => {
	//get email from body
	const email = req.body.email;
	const username = req.body.username;
	// check email
	//const checkEmail = await sv.validate(email,sv.string().required().email());
	//console.log(checkEmail);
	// check if the user exists
	const user = await db.personalQuery("SELECT * FROM users where email = ? AND username = ?",[email,username]);
	if(user.length > 0)
	{
		try
		{	
			var resetToken = await crypto.randomBytes(32).toString('hex');
			await db.personalQuery("UPDATE users SET resetToken = ? WHERE email = ? and username = ?",[resetToken,email,username]);
			await mail.sendEmail(email,"resetPass",`
				<h1>Hello !</h1>
				<p>Here is your link to reset the password http://localhost:5000/api/resetPassword/${resetToken}</p>
			`);
			res.json({success: "Action Done Please check your email" });
		}
		catch(err)
		{
			console.log(err);
		}
	}
	else
		res.json({errors: "not account found with that username,email"});
});

router.get('/resetPassword/:resetToken', async (req,res) => {
	const resetToken = req.params.resetToken;
	if(resetToken)
		res.json({token : resetToken});
	else
		res.json({errors: "token not valide"});
});

router.post('/resetChangePassword' , async (req,res) => {
	const newPassword = req.body.newPassword;
	// check password
		// 3afak dir hna check dial pass ma3reftx kifax ndir b module dialk
	const token = req.body.resetToken;
	
	//check token in database
	const user = await db.personalQuery("SELECT * FROM users WHERE resetToken = ?",[token]);
	console.log(token);
	if(user.length == 1)
	{
		// hash the new password
		let hashedPass = await hash.hashing(newPassword);
		// update the password
		await db.personalQuery("UPDATE users SET password = ? WHERE resetToken = ?",[hashedPass,token]);
		res.json({success: "password updated successfully!"});
	}
	else
	{
		res.json({error: "something went wrong please try again later."});
	}
	
	

});



module.exports = router;
