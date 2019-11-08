'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

const db = require('./modules/Database');
const notify = require('./modules/notify');
const tokenToId = require('./helpers/tokenToId').tokenToId;
const saveMessage = require('./helpers/saveMessage');

app.use(cors());
app.disable('x-powered-by');

db.init({
	host: 'localhost',
	user: 'matcha',
	password: 'toor',
	database: 'db_helbouaz'
});

// Used to parse the post data of the body.
app.use(bodyParser.json({ limit: '10mb' }));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false })); // to support URL-encoded bodies

app.use((err, request, response, next) => {
	if (err !== null)
		return response.json({
			message: "You're doing this on purpose huh?"
		});
})

app.use('/test', (request, response) => {
	console.log('AAAA');
	var base64Data = request.body.img.split(';base64,').pop();
	console.log(base64Data);
	require("fs").writeFile("imgs/out.png", base64Data, { encoding: 'base64' }, function (err) {
		console.log(err);
	});
	response.json(request.body.img)
});


const api = require('./routes/root');
app.use('/api', api);


var sockets = {};

io.on('connection', function (socket) {
	let token = socket.request._query['token'];
	let id = tokenToId(token);
	console.log("A user is connected, User id :" + id);
	sockets[id] = socket;
	db.personalQuery('UPDATE users SET is_online = 1 WHERE id = ? ', [id]);
	socket.on('disconnect', () => {
		console.log(id);
		db.personalQuery('UPDATE users SET is_online = 0, last_connection = NOW() WHERE id = ?', [id]);
	});
	socket.on('message', async (msg) => {
		try {
			console.log(msg);
			let response = await saveMessage(msg.token, msg.receiver, msg.message);
			console.log(response);
			notify(msg.receiver, 'You have recieved a message');

			if (sockets[msg.receiver]) {
				sockets[msg.receiver].send(response)
			}
			socket.send(response)

		} catch (error) {
			console.log(error);
		}
	});
});

const port = 5000;
http.listen(port, () => console.log(`Example app listening on port ${port}!`))