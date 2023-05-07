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
    res.status(400).send(`there's and existing trainer with id ${newTrainer.id}`);
  } else if (newTrainer.id.length === 0) {
    res.status(400).send('id cannot be empty');
  } else {
    trainers.push(newTrainer);
    fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (error) => {
      if (error) {
        res.status(400).send('User cannot be created');
      } else {
        res.status(201).send('User created');
      }
    });
  }
});

trainerRouter.post('/:id', (req, res) => {
  const idTrainer = parseInt(req.params.id, 10);
  const changeTrainer = req.body;
  const flag = trainers.some((trainer) => trainer.id === idTrainer);
  if (flag) {
    trainers.forEach((trainer) => {
      if (trainer.id === idTrainer) {
        const updateTrainer = trainer;
        // validate if the attribute is on the postman body and then validate
        // if an attribute is empty so it would not change the attr in json file
        if (changeTrainer.name !== undefined) {
          if (changeTrainer.name.trim().length !== 0) {
            updateTrainer.name = changeTrainer.name;
          }
        }
        if (changeTrainer.last_name !== undefined) {
          if (changeTrainer.last_name.trim().length !== 0) {
            updateTrainer.last_name = changeTrainer.last_name;
          }
        }
        if (changeTrainer.phone !== undefined) {
          if (changeTrainer.phone.trim().length !== 0) {
            updateTrainer.phone = changeTrainer.phone;
          }
        }
        if (changeTrainer.hourly_wage !== undefined) {
          if (changeTrainer.hourly_wage.trim().length !== 0) {
            updateTrainer.hourly_wage = changeTrainer.hourly_wage;
          }
        }
        if (changeTrainer.activity !== undefined) {
          if (changeTrainer.activity.trim().length !== 0) {
            updateTrainer.activity = changeTrainer.activity;
          }
        }
        if (changeTrainer.email !== undefined) {
          if (changeTrainer.email.trim().length !== 0) {
            updateTrainer.email = changeTrainer.email;
          }
        }
        if (changeTrainer.password !== undefined) {
          if (changeTrainer.password.trim().length !== 0) {
            updateTrainer.password = changeTrainer.password;
          }
        }
        fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (error) => {
          if (error) {
            res.status(400).send('User cannot be updated');
          } else {
            res.status(200).send('User updated');
          }
        });
      }
    });
  } else {
    res.status(400).send(`Trainer with id ${idTrainer} NOT FOUND`);
  }
});

module.exports = trainerRouter;
