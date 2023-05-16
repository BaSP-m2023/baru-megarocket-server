const express = require('express');
const subscriptions = require('./subscription');
const members = require('./members');
const superAdmins = require('./super-admins');
const trainers = require('./trainer');
const admins = require('./admins');
const activity = require('./activity');
const classes = require('./class');

const router = express.Router();

router.use('/subscription', subscriptions);
router.use('/trainer', trainers);
router.use('/admins', admins);
router.use('/activity', activity);
router.use('/class', classes);
router.use('/members', members);
router.use('/super-admins', superAdmins);
router.use('/subscription', subscriptions);

module.exports = router;
