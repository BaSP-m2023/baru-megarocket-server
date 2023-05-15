const express = require('express');

const fs = require('fs');
const Class = require('../models/Class');

const routerClass = express.Router();
const activities = require('../data/activity.json');
const classes = require('../data/class.json');
const trainers = require('../data/trainer.json');

const getAllClass = (req, res) => {
  const { query } = req;

  Class.find(query)
    .then((allClass) => {
      res.status(200).json({
        message: 'Complete class list',
        data: allClass,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred',
        error,
      });
    });
};

const getClassById = (req, res) => {
  const { id } = req.params;

  Class.findById(id)
    .then((classId) => res.status(200).json({
      message: `Class ${classId.activity} found! `,
      data: classId,
      error: false,
    }))
    .catch((error) => res.json({
      message: 'An error ocurred',
      error,
    }));
};

const createClass = (req, res) => {
  const {
    activity, trainer, day, time, capacity,
  } = req.body;
  Class.create({
    activity, trainer, day, time, capacity,
  })
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

const updateClass = (req, res) => {
  const { id } = req.params;
  const {
    activity,
    trainer,
    day,
    time,
    capacity,
  } = req.body;

  Class.findByIdAndUpdate(
    id,
    {
      activity,
      trainer,
      day,
      time,
      capacity,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Class with id: ${id} doesn't exist.`,
        });
      }
      return res.status(200).json({
        msg: 'Class updated',
        result,
      });
    })
    .catch((error) => res.status(400).json(error));
};

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

module.exports = {
  routerClass, getAllClass, getClassById, createClass, updateClass,
};
