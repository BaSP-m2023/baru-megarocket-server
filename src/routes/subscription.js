const express = require('express');
const subsController = require('../controllers/subscription');
const subsValidations = require('../validations/subscription');

const router = express.Router();

router
  .get('/', subsController.getAllSubs)
  .get('/:id', subsController.getSubById)
  .put('/:id', subsValidations.validateUpdate, subsController.updateSub)
  .post('/', subsValidations.validateCreation, subsController.createSubs)
  .delete('/:id', subsController.deleteSubs);

module.exports = router;
