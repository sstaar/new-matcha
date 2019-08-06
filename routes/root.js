const express       = require('express');

router = express.Router();

//Routes
register = require('./auth/register/register');
login = require('./auth/login/login');
generalInfo = require('./info/general');


router.use('', register);
router.use('', login);
router.use('/info', generalInfo);

module.exports = router;