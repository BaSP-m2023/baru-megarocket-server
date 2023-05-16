const express = require('express');
const subsController = require('../controllers/subscription');
const subValidation = require('../validations/subscription');

const router = express.Router();

router
  .get('/', subsController.getAllSubs)
  .get('/:id', subsController.getSubById)
  .put('/:id', subValidation.validateUpdate, subsController.updateSub);

module.exports = router;
