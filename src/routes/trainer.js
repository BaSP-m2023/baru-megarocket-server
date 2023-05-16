const express = require('express');

const trainerRouter = express.Router();

const trainerController = require('../controllers/trainer');

const trainerValidation = require('../validations/trainer');

trainerRouter.get('/', trainerController.getTrainers)
  .post('/', trainerValidation.validateTrainerCreate, trainerController.createTrainer)
  .put('/:id', trainerValidation.validateTrainerUpdate, trainerController.updateTrainer)
  .delete('/:id', trainerController.deleteTrainer)
  .get('/:id', trainerController.getTrainerById);

module.exports = trainerRouter;
