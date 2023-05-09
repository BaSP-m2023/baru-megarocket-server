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

router.get('/filter', (req, res) => {
  const param = req.query.class;
  const filteredSubs = subscriptions.filter((sub) => sub.class.name === param);
  try {
    if (param) {
      res.status(200).send(filteredSubs);
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(400).send('Error, can not get the element');
  }
});

router.get('/search/:memberships', (req, res) => {
  const memberSubs = req.params.memberships;
  const filteredSubs = subscriptions.filter((sub) => {
    if (typeof sub.class === 'string') {
      return sub.class === memberSubs;
    }
    return sub.class.name === memberSubs;
  });
  if (!filteredSubs.length) {
    res.send('Could not find the membership');
  } else {
    res.send(filteredSubs);
  }
});

router.post('/', (req, res) => {
  const newSubscription = req.body;
  subscriptions.push(newSubscription);
  fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (err) => {
    if (err) {
      res.send('Error: subscription could not be created!');
    } else {
      res.send('Subscription created successfully!');
    }
  });
});

router.delete('/:id', (req, res) => {
  const deleteSub = req.params.id;
  // eslint-disable-next-line max-len
  const filteredSubscriptions = subscriptions.filter((sub) => sub.id && sub.id.toString() !== deleteSub);
  fs.writeFile('src/data/subscription.json', JSON.stringify(filteredSubscriptions, null, 2), (err) => {
    if (err) {
      res.send('Error: subscription could not be deleted!');
    } else {
      res.send('Subscription deleted successfully');
    }
  });
});

module.exports = router;
