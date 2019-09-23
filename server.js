'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

var	http = require('http').createServer(app);
var io = require('socket.io')(http);

const db = require('./modules/Database');
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

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // to support URL-encoded bodies

app.use((err, request, response, next) => {
	if (err !== null)
		return response.json({
			message: "You're doing this on purpose huh?"
		});
})

const api = require('./routes/root');
app.use('/api', api);


var sockets = {};

io.on('connection', function(socket){
	let token = socket.request._query['token'];
	let id = tokenToId(token);
	console.log("A user is connected, User id :" + id);
	sockets[id] = socket;
	socket.on('message', async (msg) => {
		try {
			await saveMessage(msg.token, msg.receiver, msg.message);
			sockets[msg.receiver].send(msg.message)
		} catch (error) {
			console.log(error)
		}
	});
});





const port = 5000;
http.listen(port, () => console.log(`Example app listening on port ${port}!`))