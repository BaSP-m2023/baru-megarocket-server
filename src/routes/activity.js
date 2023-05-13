const express = require('express');

const activityController = require('../controllers/activity');
const validations = require('../validations/activity');

const router = express.Router();

// const veryImportantMiddleware = (req, res, next) => {
//   next();
// };

router
  .get('/', validations.validateActivity, activityController.getAllActivity)
  .get('/:id', activityController.getActivityById)
  // .post('/', validations.validateCreateActivity, veryImportantMiddleware,
  // activityController.createActivity)
  // .delete('/:id', activityController.deleteActivity)
  .put('/:id', validations.validateUpdateActivity, activityController.updateActivity);

module.exports = router;
