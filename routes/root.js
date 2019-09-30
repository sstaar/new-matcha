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
const getusertags = require('./info/getusertags');
const getalltags = require('./info/getalltags');

const suggestion = require('./matching/suggestion');
const relation = require('./matching/relation');
const getmatches = require('./matching/getmatches');

const getconversation = require('./messages/getconversation');

const search = require('./search/search');
const getuser = require('./search/getuser');

const getallnotifs = require('./notifications/getallnotifs');

router.use('', register);
router.use('', login);

router.use('/info', validateToken);
router.use('/info', generalInfo);
router.use('/info', editInfo);
router.use('/info', addtag);
router.use('/info', removetag);
router.use('/info', getusertags);
router.use('/info', getalltags);

router.use('/matching', validateToken);
router.use('/matching', suggestion);
router.use('/matching', relation);
router.use('/matching', getmatches);

router.use('/messages', validateToken);
router.use('/messages', getconversation);

router.use('/search', validateToken);
router.use('/search', search);
router.use('/search', getuser);

router.use('/notifications', validateToken);
router.use('/notifications', getallnotifs);

module.exports = router;