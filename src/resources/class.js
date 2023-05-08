const express = require('express');

const fs = require('fs');

const routerClass = express.Router();

const activities = require('../data/activity.json');
const classes = require('../data/class.json');
const trainers = require('../data/trainer.json');

routerClass.get('/all', (req, res) => res.send(classes));

routerClass.delete('/delete/:id', (req, res) => {
  const foundClass = classes.find((element) => element.id === parseInt(req.params.id, 10));

  if (foundClass) {
    classes[req.params.id - 1] = {};
    fs.writeFile('./src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
      if (err) {
        res.send(`Error! Class with id ${req.params.id} can't be deleted: ${err}`);
      } else {
        res.status(200).send({
          msg: 'Class deleted',
          classes: classes.filter((element) => element.id !== parseInt(req.params.id, 10)),
        });
      }
    });
  } else {
    res.status(404).send({ msg: `Class with id: ${req.params.id} doesn't exist.` });
  }
});

routerClass.put('/assign/trainer/:id', (req, res) => {
  const foundClass = classes.find((element) => element.id === parseInt(req.params.id, 10));

  if (foundClass) {
    const foundTrainer = trainers.find((act) => act.id === parseInt(req.body.id, 10));
    if (foundTrainer) {
      const trainer = req.body;
      classes[req.params.id - 1].trainer = trainer.name;
      fs.writeFile('./src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
        if (err) {
          res.send(`Error! Class with id ${req.params.id} can't be modified: ${err}`);
        } else {
          res.status(200).send({
            msg: 'Trainer added successfully!',
            trainer: `${trainer.name} ${trainer.last_name}`,
          });
        }
      });
    } else {
      res.status(404).send({ msg: `Trainer with id: ${req.body.id} doesn't exist.` });
    }
  } else {
    res.status(404).send({ msg: `Class with id: ${req.params.id} doesn't exist.` });
  }
});

routerClass.put('/assign/activity/:id', (req, res) => {
  const foundClass = classes.find((element) => element.id === parseInt(req.params.id, 10));

  if (foundClass) {
    const foundActivity = activities.find((act) => act.id === parseInt(req.body.id, 10));
    if (foundActivity) {
      const activity = req.body;
      classes[req.params.id - 1].activity = activity.name;
      fs.writeFile('./src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
        if (err) {
          res.send(`Error! Class with id ${req.params.id} can't be updated: ${err}`);
        } else {
          res.status(200).send({
            msg: 'Activity added successfully!',
            activity: activity.name,
          });
        }
      });
    } else {
      res.status(404).send({ msg: `Activity with id: ${req.body.id} doesn't exist.` });
    }
  } else {
    res.status(404).send({ msg: `Class with id: ${req.params.id} doesn't exist.` });
  }
});

module.exports = routerClass;
