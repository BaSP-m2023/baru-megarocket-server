const express = require('express');

const router = express.Router();

const trainers = require('./trainer');
const members = require('./members');

router.use('/trainer', trainers);
router.use('/members', members);

module.exports = router;
