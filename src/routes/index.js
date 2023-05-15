const express = require('express');

const router = express.Router();
const members = require('./members');
const admins = require('./admins');
const classes = require('./class');
const subscriptions = require('./subscription');

router.use('/member', members);
router.use('/admins', admins);
router.use('/class', classes);
router.use('/subscription', subscriptions);

module.exports = router;
