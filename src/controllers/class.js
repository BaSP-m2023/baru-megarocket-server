/* eslint-disable consistent-return */
const express = require('express');

const Class = require('../models/Class');

const routerClass = express.Router();

const getAllClass = (req, res) => {
  const { query } = req;

  Class.find(query)
    .populate('activity')
    .populate('trainer')
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
    .populate('activity trainer')
    .then((classId) => res.status(200).json({
      message: `Class ${classId.activity} found! `,
      data: classId,
      error: false,
    }))
    .catch((error) => res.status(404).json({
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
    .then((result) => Class.findById(result.id)
      .populate('activity trainer'))
    .then((populatedResult) => res.status(201).json(populatedResult))
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
    .populate('activity trainer')
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Class with id: ${id} doesn't exist.`,
        });
      }
      return res.status(200).json({
        msg: 'Class updated',
        class: result,
      });
    })
    .catch((error) => res.status(400).json(error));
};

const deleteClass = (req, res) => {
  const { id } = req.params;

  Class.findById(id, { deleted: true })
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
      return Class.findByIdAndUpdate(id, { deleted: true }, { new: true })
        .populate('activity trainer')
        .then((deleted) => res.status(200).json({
          msg: 'Deleted class',
          deleted_class: deleted,
        }));
    })
    .catch((error) => res.status(400).json({
      message: 'There was an error',
      error,
    }));
};

const assignTrainer = (req, res) => {
  const { id } = req.params;
  const { trainer } = req.body;

  Class.findByIdAndUpdate(
    id,
    { trainer },
    { new: true },
  )
    .populate('activity trainer')
    .then((response) => {
      if (!response) {
        return res.status(404).json({
          msg: `Class with id: ${id} not found`,
        });
      }
      return res.status(200).json({
        msg: 'Trainer updated successfully',
        class: response,
      });
    })
    .catch((error) => res.status(400).json({
      error,
    }));
};

const assignActivity = (req, res) => {
  const { id } = req.params;
  const { activity } = req.body;

  Class.findByIdAndUpdate(
    id,
    { activity },
    { new: true },
  )
    .populate('activity trainer')
    .then((response) => {
      if (!response) {
        return res.status(404).json({
          msg: `Class with id: ${id} not found`,
        });
      }
      return res.status(200).json({
        msg: 'Activity updated successfully',
        class: response,
      });
    })
    .catch((error) => res.status(400).json({
      error,
    }));
};

const restoreClass = (req, res) => {
  const { id } = req.params;

  Class.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Class with id: ${id} not found`,
        });
      }
      if (!result.deleted) {
        return res.status(404).json({
          msg: `Class with id: ${id} was not deleted`,
        });
      }
      return Class.findByIdAndUpdate(id, { deleted: false }, { new: true })
        .populate('activity trainer')
        .then((restored) => res.status(200).json({
          msg: 'Class Restored',
          restored_class: restored,
        }));
    })
    .catch((error) => res.status(400).json({
      message: 'There was an error',
      error,
    }));
};

module.exports = {
  routerClass,
  getAllClass,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  assignTrainer,
  assignActivity,
  restoreClass,
};
