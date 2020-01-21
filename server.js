"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

var http = require("http").createServer(app);
var io = require("socket.io")(http);

const db = require("./helpers/Database");
const notify = require("./helpers/notify");
const tokenToId = require("./helpers/tokenToId").tokenToId;
const saveMessage = require("./helpers/saveMessage");
const multer = require('multer');


app.use(cors());
app.disable("x-powered-by");

db.init({
	host: "localhost",
	user: "matcha",
	password: "toor",
	database: "db_helbouaz"
});

//Configuration for multer
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + "-" + file.originalname);
	}
});
// to filter type of files
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
		cb(null, true);
	else
		cb(new Error('invalid image type.'), false);
}

// Used to parse the post data of the body.
app.use(bodyParser.json({ limit: "10mb" })); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false })); // to support URL-encoded bodies

var sockets = {};

app.use((request, response, next) => {
	request.sockets = sockets;
	next();
});

app.use(multer({
	storage: fileStorage,
	fileFilter: fileFilter
}).single('image')) // we did here this Middleware to use it in any incoming req to see if the is a file with image name

app.use((err, request, response, next) => {
	return response.json({
		message: "You're doing this on purpose huh?"
	});
});

const api = require("./routes/root");
app.use("/api", api);



io.on("connection", function (socket) {
	let token = socket.request._query["token"];
	let id = tokenToId(token);
	sockets[id] = socket;
	db.personalQuery("UPDATE users SET is_online = 1 WHERE id = ? ", [id]);

	socket.on("disconnect", () => {
		db.personalQuery(
			"UPDATE users SET is_online = 0, last_connection = NOW() WHERE id = ?",
			[id]
		);
	});

	socket.on("message", async msg => {
		try {
			let response = await saveMessage(msg.token, msg.receiver, msg.message);
			notify(
				msg.receiver,
				"You have recieved a message",
				sockets[msg.receiver]
			);
			if (sockets[msg.receiver]) {
				sockets[msg.receiver].emit('message', response);
			}
			socket.send(response);
		} catch (error) {
		}
	});
});

const port = 5000;
http.listen(port, () => console.log(`Example app listening on port ${port}!`));
