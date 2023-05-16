const Activity = require('../models/Activity');

const createActivity = (req, res) => {
  const { name, description, isActive } = req.body;

  Activity.create({
    name,
    description,
    isActive,
  })
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    }));
};

const deleteActivity = (req, res) => {
  const { id } = req.params;

  Activity.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          msg: `Activity with id ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Activity deleted!',
        data: Activity,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      data: undefined,
      error,
    }));
};

const getAllActivity = (req, res) => {
  Activity.find()
    .then((activity) => res.status(200).json(
      activity,
    ))
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred!',
        error,
      });
    });
};

const getActivityById = (req, res) => {
  const { id } = req.params;

  Activity.findById(id, 'name')
    .then((activity) => res.status(200).json({
      message: `Activity found! it was ${activity.name}`,
      data: activity,
      error: false,
    }))
    .catch((error) => res.status(404).json({
      message: 'An error ocurred',
      error,
    }));
};

const updateActivity = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  Activity.findByIdAndUpdate(
    id,
    {
      name,
      description,
    },
    { new: true },
  )
    .then((activity) => {
      if (!activity) {
        return res.status(404).json({
          message: `Activity with id: ${id} was not found`,
        });
      }
      return res.status(200).json(activity);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

module.exports = {
  getAllActivity,
  getActivityById,
  updateActivity,
  createActivity,
  deleteActivity,
};
