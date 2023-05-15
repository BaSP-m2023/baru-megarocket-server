const express = require('express');
const subscriptions = require('./subscription');
const members = require('./members');
const admins = require('./admins');
const classes = require('./class');

const router = express.Router();

router.use('/subscription', subscriptions);
router.use('/member', members);
router.use('/admins', admins);
router.use('/class', classes);

module.exports = router;
