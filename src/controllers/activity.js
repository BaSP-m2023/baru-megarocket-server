const Activity = require('../models/Activity');

const createActivity = (req, res) => {
  const { name, description, isActive } = req.body;

  Activity.create({
    name,
    description,
    isActive,
  })
    .then((newActivity) => res.status(201).json({
      message: 'Activity created',
      data: newActivity,
      error: false,
    }))
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
        return res.status(404).json({
          msg: `Activity with id ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Activity deleted',
        data: Activity,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
      error,
    }));
};

const getAllActivity = (req, res) => {
  Activity.find()
    .then((activities) => res.status(200).json({
      message: 'Complete Activities list',
      data: activities,
      error: false,
    }))
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred',
        data: undefined,
        error,
      });
    });
};

const getActivityById = (req, res) => {
  const { id } = req.params;

  Activity.findById(id)
    .then((activity) => res.status(200).json({
      message: 'Activity found',
      data: activity,
      error: false,
    }))
    .catch((error) => res.status(404).json({
      message: 'An error ocurred',
      data: undefined,
      error,
    }));
};

const updateActivity = (req, res) => {
  const { id } = req.params;
  const { name, description, isActive } = req.body;

  Activity.findByIdAndUpdate(
    id,
    {
      name,
      description,
      isActive,
    },
    { new: true },
  )
    .then((activity) => {
      if (!activity) {
        return res.status(404).json({
          message: `Activity with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Activity updated',
        data: activity,
        error: false,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: 'An error ocurred.',
        data: undefined,
        error,
      });
    });
};

module.exports = {
  getAllActivity,
  getActivityById,
  updateActivity,
  createActivity,
  deleteActivity,
};
