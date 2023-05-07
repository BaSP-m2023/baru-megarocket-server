const express = require('express')

const activity = require('../data/activity.json')
const activityRouter = express.router()


activityRouter.get('/', (req, res) => {
    res.send(activity)
});

module.exports = activityRouter