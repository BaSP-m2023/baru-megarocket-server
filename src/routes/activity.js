const express = require('express');
const activityController = require('../controllers/activity');
const validations = require('../validations/activity');

const router = express.Router();

router
  .get('/', activityController.getAllActivity)
  .get('/:id', activityController.getActivityById)
  .post('/', validations.validateCreation, activityController.createActivity)
  .delete('/:id', activityController.deleteActivity)
  .put('/:id', validations.validateUpdateActivity, activityController.updateActivity);

module.exports = router;
