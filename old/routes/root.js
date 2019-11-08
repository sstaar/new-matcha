'use strict'
const express = require('express');
const validateToken = require('../modules/token').validateToken;
const blockCheck = require('../modules/blockCheck').blockCheck;

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
const uploadimg = require('./info/uploadimg');
const removeimg = require('./info/removeimg');

const suggestion = require('./matching/suggestion');
const relation = require('./matching/relation');
const getmatches = require('./matching/getmatches');
const unlike = require('./matching/unlike');

const getconversation = require('./messages/getconversation');

const search = require('./search/search');
const getuser = require('./search/getuser');

const getnotifs = require('./notifications/getnotifs');
const gethistory = require('./notifications/gethistory');

const blockuser = require('./block/blockuser');
const reportuser = require('./block/reportuser');

router.use('', register);
router.use('', login);

router.use('/info', validateToken);
router.use('/info', blockCheck);
router.use('/info', generalInfo);
router.use('/info', editInfo);
router.use('/info', addtag);
router.use('/info', removetag);
router.use('/info', getusertags);
router.use('/info', getalltags);
router.use('/info', uploadimg);
router.use('/info', removeimg);

router.use('/matching', validateToken);
router.use('/matching', blockCheck);
router.use('/matching', suggestion);
router.use('/matching', relation);
router.use('/matching', getmatches);
router.use('/matching', unlike);

router.use('/messages', validateToken);
router.use('/messages', blockCheck);
router.use('/messages', getconversation);

router.use('/search', validateToken);
router.use('/search', blockCheck);
router.use('/search', search);
router.use('/search', getuser);

router.use('/notifications', validateToken);
router.use('/notifications', getnotifs);
router.use('/notifications', gethistory);

router.use('/block', validateToken);
router.use('/block', blockCheck);
router.use('/block', blockuser);
router.use('/block', reportuser);

module.exports = router;