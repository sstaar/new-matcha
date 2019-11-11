var mysql = require('mysql');

class Database {

	constructor() {
		this.con = null;
	}

	init(connectionInfo) {
		console.log('ALLO');
		if (this.con)
			return this.con;
		let temp = mysql.createConnection(connectionInfo);
		temp.connect(function (err) {
			if (err) {
				temp = null;
				return;
			}
		})
		if (temp)
			this.con = temp;
		return temp;
	}

	personalQuery(query, values = []) {
		let temp = mysql.format(query, values);
		return new Promise((resolve, reject) => {
			this.con.query(temp, (error, results) => {
				if (error)
					return reject(error);
				return resolve(results);
			});
		});
	}

}

var db = new Database();

module.exports = db;