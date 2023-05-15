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
const getAllSuperAdmins = (req, res) => {
  SuperAdmin.find()
    .then((superAdmins) => res.status(200).json({
      message: 'Super Admins list',
      data: superAdmins,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

const getSuperAdminById = (req, res) => {
  const { id } = req.params;

  SuperAdmin.findById(id, 'name lastName email')
    .then((superAdmin) => {
      if (!superAdmin) {
        return res.status(404).json({
          msg: `Super Admin with id: ${id} was not found`,
        });
      }
      return res.status(200).json({
        message: 'Super Admin found',
        data: superAdmin,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};
const updateSuperAdmin = (req, res) => {
  const { id } = req.params;
  const {
    name, lastName, email, password,
  } = req.body;

  SuperAdmin.findByIdAndUpdate(
    id,
    {
      name,
      lastName,
      email,
      password,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Super Admin with id: ${id} was not found`,
        });
      }
      return res.status(200).json({
        message: `Super Admin with id: ${id} updated`,
        data: result,
        error: false,
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
  getAllSuperAdmins,
  getSuperAdminById,
  updateSuperAdmin,
};
