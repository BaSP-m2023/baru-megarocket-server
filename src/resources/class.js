const express = require('express');

const routerClass = express.Router();

const fs = require('fs');
const classes = require('../data/class.json');

routerClass.get('/all', (req, res) => res.send(classes));

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
  const foundClass = classes.some((element) => element.id === parseInt(req.params.id, 10));

  if (foundClass) {
    res.send({
      msg: 'Class deleted',
      class: classes.filter((element) => element.id === parseInt(req.params.id, 10)),
    });
    classes[req.params.id - 1] = {};
  } else {
    res.status(400).send({ msg: `Class with id: ${req.params.id} doesn't exist.` });
  }
});

module.exports = routerClass;
