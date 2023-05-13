const express = require('express');

const trainerRouter = express.Router();

const trainerController = require('../controllers/trainer');

const trainerValidation = require('../validations/trainer');

trainerRouter.get('/', trainerController.getTrainers)
  .post('/', trainerValidation.validateTrainerCreate, trainerController.createTrainer);
// .put();

module.exports = trainerRouter;
