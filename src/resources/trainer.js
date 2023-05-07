const express = require('express');
const fs = require('fs');

const trainerRouter = express.Router();
const trainers = require('../data/trainer.json');

trainerRouter.get('/', (req, res) => res.json(trainers));

trainerRouter.post('/', (req, res) => {
  const newTrainer = req.body;
  let flag = false;
  // validate if there is a trainer with an existing id
  trainers.forEach((trainer) => {
    if ((trainer.id === newTrainer.id)) {
      flag = true;
    }
  });
  if (flag) {
    res.send(`there's and existing trainer with id ${newTrainer.id}`);
  } else if (newTrainer.id.length === 0) {
    res.send('id cannot be empty');
  } else {
    trainers.push(newTrainer);
    fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (error) => {
      if (error) {
        res.send('User cannot be created');
      } else {
        res.send('User created');
      }
    });
  }
});

module.exports = trainerRouter;
