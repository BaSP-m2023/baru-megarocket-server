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
const deleteSuperAdmin = async (req, res) => {
  const { id } = req.params;
  await SuperAdmin.findByIdAndDelete(id)
    .then((superAdmin) => {
      if (superAdmin) {
        return res.status(204).end();
      }
      return res.status(404).json({
        msg: `Super Admin with id: ${id} was not found`,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  createSuperAdmin,
  deleteSuperAdmin,
};
