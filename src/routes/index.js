const express = require('express');

const router = express.Router();
const members = require('./members');
const admins = require('./admins');

const subscription = require('./subscription');

router.use('/members', members);
router.use('/admins', admins);
router.use('/subscription', subscription);

module.exports = router;
