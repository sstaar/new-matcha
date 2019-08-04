require('dotenv').config();
const express		= require('express');
const db			= require('./modules/Database')
const cors			= require('cors')

const app			= express();

app.use(cors());

db.init({
	host        : 'localhost',
	user        : 'matcha',
	password    : 'toor',
	database    : 'db_helbouaz'
});

// Used to parse the post data of the body.
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

const api           = require('./routes/root');
app.use('/api', api);

const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))