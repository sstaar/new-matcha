const nodemailer = require('nodemailer');

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

exports.sendEmail = (to, subject, text) => {
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

