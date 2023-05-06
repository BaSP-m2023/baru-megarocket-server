const express = require('express');

const router = express.Router();

const classes = require('../data/class.json');

router.get('/all', (req, res) => res.send(classes));

router.delete('/delete/:id', (req, res) => {
  const found = classes.some((element) => element.id === parseInt(req.params.id, 10));

  if (found) {
    res.send({
      msg: 'Class deleted',
      class: classes.filter((element) => element.id === parseInt(req.params.id, 10)),
    });
    classes[req.params.id - 1] = {};
  } else {
    res.status(400).send({ msg: `Class with id: ${req.params.id} doesn't exist.` });
  }
});

module.exports = router;
