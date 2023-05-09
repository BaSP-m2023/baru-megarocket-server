const express = require('express');
const fs = require('fs');
const subscriptions = require('../data/subscription.json');

const router = express.Router();

router.post('/', (req, res) => {
  const newSub = req.body;
  subscriptions.push(newSub);
  fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (e) => {
    if (e) {
      res.send('Error, can not be created');
    } else {
      res.send('Subscription created');
    }
  });
});

router.delete('/:id', (req, res) => {
  const subId = req.params.id;
  const filteredSubs = subscriptions.filter((sub) => sub.id.toString() !== subId);
  fs.writeFile('src/data/subscription.json', JSON.stringify(filteredSubs, null, 2), (e) => {
    if (e) {
      res.send('Error, can not be deleted');
    } else {
      res.send('Subscription deleted');
    }
  });
});

router.put('/:id', (req, res) => {
  const subId = req.params.id;
  const found = subscriptions.some((sub) => sub.id.toString() === subId);
  if (found) {
    const updSub = req.body;
    subscriptions.forEach((sub) => {
      if (sub.id.toString() === subId) {
        // eslint-disable-next-line no-param-reassign
        sub.class = updSub.class;
      }
    });
    fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (e) => {
      if (e) {
        res.status(500).send('Error, can not be modified');
      } else {
        res.status(200).send('Subscription updated');
      }
    });
  } else {
    res.status(404).send('Subscription does not exist');
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
