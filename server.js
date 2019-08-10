'use strict'
require('dotenv').config();
const express = require('express');
const db = require('./modules/Database')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

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

const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))