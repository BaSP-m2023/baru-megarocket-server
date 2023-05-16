const express = require('express');
const subsController = require('../controllers/subscription');
const subsValidations = require('../validations/subscription');

const router = express.Router();

router
  .post('/', subsValidations.validateCreation, subsController.createSubs)
  .delete('/:id', subsController.deleteSubs);

module.exports = router;
