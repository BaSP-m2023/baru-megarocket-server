/* eslint-disable consistent-return */
const express = require('express');

const Class = require('../models/Class');

const routerClass = express.Router();

const getAllClass = (req, res) => {
  const { query } = req;

  Class.find(query)
    .populate('activity trainer')
    .then((allClass) => {
      res.status(200).json({
        message: 'Successful GET of classes',
        data: allClass,
        error: false,
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: 'An error ocurred',
        data: undefined,
        error,
      });
    });
};

const getClassById = (req, res) => {
  const { id } = req.params;

  Class.findById(id)
    .populate('activity trainer')
    .then((classId) => {
      if (!classId) {
        return res.status(404).json({
          message: `Class with id:${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Class with id:${id} found`,
        data: classId,
        error: false,
      });
    })
    .catch((error) => res.status(404).json({
      message: 'An error ocurred',
      data: undefined,
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
    .then((populatedResult) => res.status(201).json({
      message: 'Class created successfully',
      data: populatedResult,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      data: undefined,
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
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        msg: 'Class updated',
        data: result,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred. Update Rejected',
        data: undefined,
        error,
      });
    });
};

const deleteClass = (req, res) => {
  const { id } = req.params;

  Class.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Activity with id ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Activity deleted',
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      data: undefined,
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
};
