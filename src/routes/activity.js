const express = require('express');

const activityController = require('../controllers/activity');
const validations = require('../validations/activity');

const activityRouter = express.Router();

activityRouter
  .post('/', validations.validateCreation, activityController.createActivity)
  .delete('/:id', activityController.deleteActivity);

module.exports = activityRouter;
