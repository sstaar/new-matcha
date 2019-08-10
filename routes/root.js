'use strict'
const express       = require('express');
const validateToken = require('../modules/token').validateToken;

const router = express.Router();

//Routes
const register = require('./auth/register/register');
const login = require('./auth/login/login');
const generalInfo = require('./info/general');
const editInfo = require('./info/edit');
const addtag = require('./info/addtag');


router.use('', register);
router.use('', login);
router.use('/info', validateToken);
router.use('/info', generalInfo);
router.use('/info', editInfo);
router.use('/info', addtag);

module.exports = router;