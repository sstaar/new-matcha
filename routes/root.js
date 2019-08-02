const express       = require('express');

router = express.Router();

//Routes
register = require('./auth/register/register');
login = require('./auth/login/login');


router.use('', register);
router.use('', login);

module.exports = router;