const express       = require('express');

router = express.Router();

//Routes
register = require('./auth/register/register');
login = require('./auth/login/login');
generalInfo = require('./info/general');
editInfo = require('./info/edit');


router.use('', register);
router.use('', login);
router.use('/info', generalInfo);
router.use('/info', editInfo);

module.exports = router;