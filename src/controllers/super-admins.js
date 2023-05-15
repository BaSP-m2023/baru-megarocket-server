const SuperAdmin = require('../models/SuperAdmin');

const createSuperAdmin = (req, res) => {
  const {
    name, lastName, email, password,
  } = req.body;

  SuperAdmin.create({
    name,
    lastName,
    email,
    password,
  })
    .then((result) => res.status(201).json({
      message: 'Super Admin created',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  createSuperAdmin,
};
