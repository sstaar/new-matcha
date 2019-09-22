'use strict'
const express = require('express');
const validateToken = require('../modules/token').validateToken;

const router = express.Router();

//Routes
const register = require('./auth/register/register');
const login = require('./auth/login/login');
const generalInfo = require('./info/general');
const editInfo = require('./info/edit');
const addtag = require('./info/addtag');
const removetag = require('./info/removetag');
const gettags = require('./info/gettags');
const suggestion = require('./matching/suggestion');
const relation = require('./matching/relation');
const getmatches = require('./matching/getmatches');

router.use('', register);
router.use('', login);

router.use('/info', validateToken);
router.use('/info', generalInfo);
router.use('/info', editInfo);
router.use('/info', addtag);
router.use('/info', removetag);
router.use('/info', gettags);

router.use('/matching', validateToken);
router.use('/matching', suggestion);
router.use('/matching', relation);
router.use('/matching', getmatches);

module.exports = router;