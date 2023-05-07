const express = require('express');

const routerClass = express.Router();

const classes = require('../data/class.json');

routerClass.get('/all', (req, res) => res.send(classes));

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
