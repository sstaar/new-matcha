const bcrypt = require('bcrypt');

module.exports = {
	hashing: (password) => {
		return new Promise((resolve, reject) => {
			bcrypt.hash(password, 5, (error, result) => {
				if (error)
					return reject(error);
				return resolve(result);
			});
		});
	},

	comparing: (password, hashed) => {
		return new Promise((resolve, reject) =>{
			bcrypt.compare(password, hashed, (error, result) => {
				if (error)
					return reject(error);
				return resolve(result);
			});
		});
	}
};