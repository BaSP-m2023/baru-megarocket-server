const express = require('express');

const router = express.Router();

const trainers = require('./trainer');
const members = require('./members');
const admins = require('./admins');

router.use('/trainer', trainers);
router.use('/members', members);
router.use('/admins', admins);

module.exports = router;
