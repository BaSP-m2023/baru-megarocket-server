const { default: firebaseApp } = require('../helper/firebase');
const SuperAdmin = require('../models/SuperAdmin');

const createSuperAdmin = (req, res) => {
  const {
    name, lastName, email,
  } = req.body;

  let firebaseUid;

  firebaseApp
    .auth()
    .createUser({
      email: req.body.email,
      password: req.body.password,
    })
    .then((newFireBaseUser) => {
      firebaseUid = newFireBaseUser.uid;

      return firebaseApp.auth().setCustomUserClaims(newFireBaseUser.uid, { role: 'SUPER_ADMIN' });
    })
    .then(() => SuperAdmin.create({
      firebaseUid,
      name,
      lastName,
      email,
    }))
    .then((result) => {
      res.status(201).json({
        message: 'Super Admin created',
        data: result,
        error: false,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error.toString(),
        data: undefined,
        error: true,
      });
    });
};
const deleteSuperAdmin = (req, res) => {
  const { id } = req.params;
  SuperAdmin.findByIdAndDelete(id)
    .then((superAdmin) => {
      if (superAdmin) {
        firebaseApp.auth().deleteUser(superAdmin.firebaseUid);
        return res.status(200).json({
          message: 'Super Admin deleted',
          data: superAdmin,
          error: false,
        });
      }
      return res.status(404).json({
        message: `Super Admin with id: ${id} was not found`,
        data: undefined,
        error: true,
      });
    })
    .catch((error) => res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
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
      message: error.toString(),
      data: undefined,
      error: true,
    }));
};

const getSuperAdminById = (req, res) => {
  const { id } = req.params;

  SuperAdmin.findById(id, 'name lastName email')
    .then((superAdmin) => {
      if (!superAdmin) {
        return res.status(404).json({
          message: `Super Admin with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Super Admin found',
        data: superAdmin,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
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
          message: `Super Admin with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Super Admin with id: ${id} updated`,
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
    }));
};

module.exports = {
  createSuperAdmin,
  deleteSuperAdmin,
  getAllSuperAdmins,
  getSuperAdminById,
  updateSuperAdmin,
};
