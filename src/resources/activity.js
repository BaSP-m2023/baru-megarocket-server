const express = require('express');
const fs = require('fs');

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

router.post('/post', (req, res) => {
  const newActivity = req.body;
  activities.push(newActivity);
  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (err) => {
    if (err) {
      res.send('Error. Activity cannot be created!');
    } else {
      res.send('User created');
    }
  });
});

module.exports = router;
