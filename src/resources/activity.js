const express = require('express');
const fs = require('fs');

const activities = require('../data/activity.json');

const router = express.Router();

router.put('/:id', (req, res) => {
  const activityId = req.params.id;
  const foundActivity = activities.find((activity) => activity.id.toString() === activityId);
  if (foundActivity) {
    const newActivity = req.body;
    activities.forEach((activity, index) => {
      if (activity.id.toString() === activityId) {
        activities[index] = {
          ...activity,
          id: newActivity.id ? newActivity.id : activity.id,
          name: newActivity.name ? newActivity.name : activity.name,
          description: newActivity.description ? newActivity.description : activity.description,
        };
      }
    });
    fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (err) => {
      if (err) {
        res.send('Error. Activity cannot be updated!');
      } else {
        res.send('Activity updated!');
      }
    });
  } else {
    res.send('Activity not found!');
  }
});

router.delete('/:id', (req, res) => {
  const activityId = req.params.id;
  const filteredActivity = activities.filter((activity) => activity.id.toString() !== activityId);
  fs.writeFile('src/data/activity.json', JSON.stringify(filteredActivity, null, 2), (err) => {
    if (err) {
      res.send('Error! Activity cannot be deleted!');
    } else {
      res.send('Activity deleted!');
    }
  });
});

module.exports = router;
