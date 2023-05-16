const express = require('express');
const subscriptions = require('./subscription');
const trainers = require('./trainer');
const members = require('./members');
const admins = require('./admins');
const classes = require('./class');

const router = express.Router();

router.use('/subscription', subscriptions);
router.use('/trainer', trainers);
router.use('/member', members);
router.use('/admins', admins);
router.use('/class', classes);

module.exports = router;
