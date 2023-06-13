const Member = require('../models/Member');

const getAllMembers = (req, res) => {
  Member.find()
    .then((member) => res.status(200).json({
      message: 'Complete members list',
      data: member,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'Unexpected error. Please try again later.',
      error,
    }));
};

const getMemberById = (req, res) => {
  const { id } = req.params;

  Member.findById(id)
    .then((member) => {
      res.status(200).json({
        message: 'Member found',
        data: member,
        error: false,
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: `The member with the id ${id} does not exist`,
        error,
      });
    });
};

const createMember = (req, res) => {
  const {
    name, lastName, phone, dni, city, dob, zip, isActive, membership, email, password,
  } = req.body;

  Member.create({
    name, lastName, phone, dni, city, dob, zip, isActive, membership, email, password,
  })
    .then((result) => res.status(201).json({
      message: 'Member created',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'Invalid Request: Incorrect parameters provided.',
      error,
    }));
};

const deleteMember = (req, res) => {
  const { id } = req.params;
  Member.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Member with id ${id} not found`,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Member deleted',
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'Something went wrong',
      error,
    }));
};
const updateMember = (req, res) => {
  const { id } = req.params;
  const {
    name, lastName, dni, phone, email, city, dob, zip, isActive, membership, password,
  } = req.body;
  Member.findByIdAndUpdate(
    id,
    {
      name,
      lastName,
      dni,
      phone,
      email,
      city,
      dob,
      zip,
      isActive,
      membership,
      password,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Member with id ${id} was not found`,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Member updated',
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'Something went wrong',
      error,
    }));
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  deleteMember,
  updateMember,
};
