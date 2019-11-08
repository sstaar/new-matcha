const express = require('express');
const db = require('../../../modules/Database');
const hash = require('../../../modules/bcrypt');
const sv = require('../../../modules/validators/validator');
const DateDiff = require('date-diff');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: 'matcha469@gmail.com',
    pass: 'Youssef123#'
  },
  tls: {
    rejectUnauthorized: false
  }
});

var sendEmail = (to, subject, text) => {
	var HelperOptions = {
	  from: '"youssef" <matcha469@gmail.com',
	  to: to,
	  subject: subject,
	  text: text
	};
	return new Promise((resolve, reject) => {
	  if (transporter.sendMail(HelperOptions)) {
		resolve("Mail Sent !");
	  } else {
		reject(Error("It broke"));
	  }
	});
  }

router = express.Router();

router.post('/register', async (request, response) => {

	let userSchema = {
		username: sv.string().required(),
		password1: sv.string().required(),
		password2: sv.string().required(),
		firstname: sv.string().required(),
		lastname: sv.string().required(),
		email: sv.string().required().email(),
		birthday: sv.string().required().date(),
		gender: sv.string().required().match(/^(male|female)$/),
	}

	let info = {
		username: request.body.username,
		password1: request.body.password1,
		password2: request.body.password2,
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		email: request.body.email,
		birthday: request.body.birthday,
		gender: request.body.gender
	};

	let errors = {};

	console.log(info);

	try {
		console.log('HAHA');
		let info = await sv.validate(request.body, userSchema);
		let res = await db.personalQuery('SELECT * FROM users WHERE username LIKE ?', [info.username]);
		
		if (res.length > 0)
			errors['username'] = 'Username already exists.';
		if (info.password1 && info.password2 && info.password1 !== info.password2) {
			errors['password1'] = 'Passwords do not match.';
			errors['password2'] = 'Passwords do not match.';
		}
		
		let age = new DateDiff(new Date(), new Date(info.birthday));
		age = age.years();

		console.log(age);
		if (age < 18)
			errors['birthday'] = 'You have to be older than 18 years old.';

		if (Object.keys(errors).length > 0)
			return response.json({ errors });
			
		let hashedPass = await hash.hashing(info.password1);
		var token = await crypto.randomBytes(32).toString('hex');
		await db.personalQuery(
			"INSERT INTO users (`username`, `password`, `email`, `firstname`, `lastname`, `age`, `gender`,`emailHash`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
				info.username,
				hashedPass,
				info.email,
				info.firstname,
				info.lastname,
				age,
				info.gender,
				token,
			]);
		await sendEmail(info.email, "your account is created","Hello " + info.username + "click here to validate your account http://localhost:5000/api/validateEmail/" + token );
		return response.json({ success: 'Account has been created please chech your mail for activation.' });
	} catch (error) {
		console.log(error);
		if (error.customErrors)
			return response.json({ errors: error.customErrors });
		return;
	}
});

router.get('/validateEmail/:token', async (req, res) => {
	const token = req.params.token;
	// Check if token exists
	var checkToken = await db.personalQuery("select * from users where emailHash = ?",[token]);
	if(checkToken.length > 0)
	{
		if(checkToken[0].activated == 0 && checkToken[0].emailHash == token)
		{
			await db.personalQuery("UPDATE users SET activated = 1 where emailHash = ?",[token]);
			res.redirect('http://localhost:3000/login');
		}
		else if(checkToken[0].activated == 1)
			res.redirect('http://alreadyactivated');
		else
			res.redirect('http://localhost:3000/register');
	}
	console.log(checkToken);

	// User.checkTokenEmail(token)
	//   .then(([data]) => {
	// 	// if the is token in db do update
	// 	console.log(data);
	// 	if (data.length > 0) {
	// 	  if (data[0].emailToken == token && data[0].accStat == "not active") {
	// 		// activate account
	// 		User.activateAccount(token)
	// 		  .then(() => {
	// 			req.flash('successMsg', 'your account is activated You can login now!');
	// 			return res.redirect('/auth/login');
	// 		  })
	// 	  } // redirect if account is already verified
	// 	  else if (data[0].accStat == "active") {
	// 		req.flash('successMsg', 'your account is already verified');
	// 		return res.redirect('/auth/login');
	// 	  } else {
	// 		return res.redirect('/auth/login');
	// 	  }
	// 	} else { // redirect because it's not found
	// 	  return res.render('auth/login', {
	// 		errors: [{
	// 		  msg: "invalid Token"
	// 		}],
	// 		successMsg: null
	// 	  });
	// 	}
	//   })
	//   .catch(err => console.log(err));
  }
);

module.exports = router;