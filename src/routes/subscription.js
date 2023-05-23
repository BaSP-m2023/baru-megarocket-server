const express = require('express');
const subsController = require('../controllers/subscription');
const subsValidations = require('../validations/subscription');

const subscriptionsRouter = express.Router();

subscriptionsRouter
  .get('/', subsController.getAllSubs)
  .get('/:id', subsController.getSubById)
  .put('/:id', subsValidations.validateUpdate, subsController.updateSub)
  .post('/', subsValidations.validateCreation, subsController.createSubs)
  .delete('/:id', subsController.deleteSubs);

module.exports = subscriptionsRouter;
