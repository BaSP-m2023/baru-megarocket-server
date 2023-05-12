const express = require('express');
const subscriptions = require('./subscription');

const router = express.Router();

router.use('/subscription', subscriptions);

module.exports = router;