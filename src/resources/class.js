const express = require('express');

const fs = require('fs');

const routerClass = express.Router();

const activities = require('../data/activity.json');
const classes = require('../data/class.json');
const trainers = require('../data/trainer.json');

routerClass.get('/search/:filter', (req, res) => {
  const filterCall = req.params.filter;

  if (filterCall !== 'all') {
    const found = classes.filter((element) => element.activity === filterCall
        || element.trainer === filterCall
        || element.day === filterCall
        || element.time === filterCall
        || element.capacity === parseInt(filterCall, 10));

    if (found.length !== 0) {
      res.status(200).send({
        msg: `Listing all Classes with ${filterCall}`,
        classes: found,
      });
    } else {
      res.status(404).send({
        msg: `Classes with ${filterCall} doesn't exists`,
      });
    }
  } else {
    res.status(200).send({
      msg: 'Listing all Classes',
      class: classes,
    });
  }
});

routerClass.get('/find/:id', (req, res) => {
  // read the json file and convert it to an array
  const data = JSON.parse(fs.readFileSync('./src/data/class.json', 'utf8'));

  // create id variable and assign the id from the request
  const id = parseInt(req.params.id, 10);

  // find the index of the element with the id from the request
  const classIndex = data.findIndex((element) => element.id === id);

  // if the element doesn't exists, return an error
  if (classIndex === -1) {
    return res
      .status(404)
      .json({ msg: `Class with id: ${req.params.id} doesn't exist.` }); // if the element doesn't exists, return an error
  }

  return res.json({ msg: 'Class finded', class: data[classIndex] }); // return a message and the updated element
});

// create a new class
routerClass.post('/create', (req, res) => {
  // read the json file and convert it to an array
  const data = JSON.parse(fs.readFileSync('./src/data/class.json', 'utf8'));

  // create the new user
  const newClass = {
    id: data.length + 1,
    activity: req.body.activity,
    trainer: req.body.trainer,
    day: req.body.day,
    time: req.body.time,
    capacity: req.body.capacity,
  };

  // if any of the fields is missing, return an error
  if (
    !newClass.activity
    || !newClass.trainer
    || !newClass.day
    || !newClass.time
    || !newClass.capacity
  ) {
    res.status(400).send({ msg: 'Please include all fields' });
  }

  // create new array with previous data and the new user
  const newData = [...data, newClass];

  // save the new array in the file
  fs.writeFile(
    './src/data/class.json',
    JSON.stringify(newData, null, 2),
    (err) => {
      if (err) {
        res.status(500).send({ msg: err });
      }
      res.send(newClass);
    },
  );
});

// update a class
routerClass.put('/update/:id', (req, res) => {
  // read the json file and convert it to an array

  const data = JSON.parse(fs.readFileSync('./src/data/class.json', 'utf8'));

  // create id variable and assign the id from the request
  const id = parseInt(req.params.id, 10);

  // find the index of the element with the id from the request
  const classIndex = data.findIndex((element) => element.id === id);

  // if the element doesn't exists, return an error
  if (classIndex === -1) {
    res
      .status(404)
      .send({ msg: `Class with id: ${req.params.id} doesn't exist.` }); // if the element doesn't exists, return an error
  }

  const updateClass = req.body; // create variable with the body of the request
  const updatedElement = {
    ...data[classIndex], // spread operator to copy the previous data of the element
    ...updateClass, // spread operator to copy the body of the request
    id, // assign the id from the request
  };

  data[classIndex] = updatedElement; // update the element
  fs.writeFile(
    './src/data/class.json',
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) {
        res.status(500).send({ msg: err });
      }
      res.send({ msg: 'Class updated', updatedElement }); // return a message and the updated element
    },
  );
});

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
