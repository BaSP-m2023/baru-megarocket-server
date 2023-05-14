const Admin = require('../models/admins');

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

module.exports = {
  createAdmin,
  deleteAdmin,
};
