const express = require('express');

const router = express.Router();
const members = require('./members');
const activity = require('./activity');

router.use('/members', members);
router.use('/activity', activity);

module.exports = router;
