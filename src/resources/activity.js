const express = require('express');

const activities = require('../data/activity.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(activities);
});

router.get('/:id', (req, res) => {
  const activityId = req.params.id;
  const foundActivity = activities.find((activity) => activity.id.toString() === activityId);
  if (foundActivity) {
    res.send(foundActivity);
  } else {
    res.send('Activity not found!');
  }
});

module.exports = router;
