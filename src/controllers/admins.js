<<<<<<< HEAD
const Admin = require('../models/admins');
=======
const Admin = require('../models/Admin');
>>>>>>> master

const createAdmin = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;
  Admin.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(400).json({
        message: 'An error ocurred!',
        error,
      });
    });
};

const getAllAdmins = (req, res) => {
  Admin.find()
    .then((admins) => res.status(200).json({
      data: admins,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const getAdminById = (req, res) => {
  const { id } = req.params;

  Admin.findById(id, 'firstName lastName')
    .then((admin) => res.status(200).json({
      message: `Admin found! It was ${admin.firstName}`,
      data: admin,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;
  Admin.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Admin with id: ${id} was not found!`,
        });
      }
      return res.status(204).end();
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

const updateAdmin = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;

  Admin.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
    },
    {
      new: true,
    },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Admin with id: ${id} was not found!`,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  createAdmin,
  deleteAdmin,
};
