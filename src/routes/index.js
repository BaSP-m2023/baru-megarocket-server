const express = require('express');

const router = express.Router();
const trainers = require('./trainer');

router.use('/trainer', trainers);

module.exports = router;
