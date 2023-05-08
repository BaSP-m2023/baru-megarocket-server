const express = require('express');
const fs = require('fs');
const subscriptions = require('../data/subscription.json');

const router = express.Router();

router.put('/:id', (req, res) => {
  const subId = req.params.id;
  const found = subscriptions.some((sub) => sub.id.toString() === subId);
  if (found) {
    const updSub = req.body;
    subscriptions.forEach((sub) => {
      if (sub.id.toString() === subId) {
        sub.class = updSub.class;
      }
    });
    fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (e) => {
      if (e) {
        res.send('Error, can not be modified');
      } else {
        res.send('Subscription updated');
      }
    });
  } else {
    res.status(400).send('Subscription does not exist');
  }
});

router.get('/', (req, res) => {
  try {
    res.send(subscriptions);
  } catch (e) {
    res.send('Error, can not get the element');
  }
});

module.exports = router;
