const express = require('express');

const router = express.Router();
const members = require('./members');
const admins = require('./admins');
const activity = require('./activity');

router.use('/members', members);
router.use('/admins', admins);
router.use('/activity', activity);

module.exports = router;
