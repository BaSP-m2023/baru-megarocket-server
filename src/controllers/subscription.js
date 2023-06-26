/* eslint-disable arrow-body-style */
const Subscription = require('../models/Subscription');

const createSubs = async (req, res) => {
  await Subscription.create(req.body)
    .then((result) => {
      Subscription.findById(result.id)
        .populate('classes')
        .populate('members')
        .then((resu) => {
          res.status(201).json(resu);
        });
    })
    .catch((error) => res.status(400).json({ message: 'Invalid request: incorrect parameters provided!', error }));
};

const deleteSubs = (req, res) => {
  const { id } = req.params;
  Subscription.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Subscription with ${id} not found`,
        });
      }
      return res.status(200).json({
        message: 'Subscription deleted',
      });
    })
    .catch((error) => res.status(400).json({ message: 'Invalid request: incorrect parameters provided!', error }));
};

const getAllSubs = (req, res) => {
  Subscription.find()
    .populate('classes')
    .populate('members')
    .then((subscriptions) => {
      return res.status(200).json({
        message: 'All subscriptions list',
        data: subscriptions,
        error: false,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: 'Internal error',
        error,
      });
    });
};

const getSubById = (req, res) => {
  const { id } = req.params;

  Subscription.findById(id)
    .populate('classes')
    .populate('members')
    .then((subscription) => {
      if (!subscription) {
        return res.status(404).json({
          message: `Subscription ${id} not found`,
        });
      }
      return res.status(200).json({
        message: 'Subscription found',
        data: subscription,
        error: false,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        message: `Bad ID requests with: ${id}`,
        error,
      });
    });
};

const updateSub = (req, res) => {
  const { id } = req.params;
  const { classes, members, date } = req.body;

  Subscription.findByIdAndUpdate(
    id,
    {
      classes,
      members,
      date,
    },
    { new: true },
  )
    .populate('classes')
    .populate('members')
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `${id} Subscription was not found`,
        });
      }
      return res.status(200).json({
        message: 'Subscription Updated',
        data: result,
        error: false,
      });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

module.exports = {
  getAllSubs,
  getSubById,
  updateSub,
  createSubs,
  deleteSubs,
};
