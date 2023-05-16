const express = require('express');

const Class = require('../models/class');

const routerClass = express.Router();

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

const deleteClass = (req, res) => {
  const { id } = req.params;

  Class.findByIdAndUpdate(id, { deleted: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Class with id: ${id} not found`,
        });
      }
      if (result.deleted) {
        return res.status(404).json({
          msg: `Class with id: ${id} was already deleted`,
        });
      }
      return Class.find({ deleted: true })
        .then((filter) => res.status(200).json({
          msg: 'Deleted classes',
          filter,
        }));
    })
    .catch((error) => res.status(400).json({
      message: 'There was an error',
      error,
    }));
};

module.exports = {
  routerClass, getAllClass, getClassById, createClass, updateClass, deleteClass,
};
