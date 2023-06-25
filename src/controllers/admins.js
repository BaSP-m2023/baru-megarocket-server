const mongoose = require('mongoose');
const { default: firebaseApp } = require('../helper/firebase/index');

const Admin = require('../models/Admin');
const { validateUpdate } = require('../validations/admins');

const createAdmin = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city,
  } = req.body;
  let firebaseUid;

  try {
    const adminExists = await Admin.findOne({ dni });
    if (adminExists) {
      return res.status(400).json({
        message: 'There is another admin with that dni.',
        data: undefined,
        error: true,
      });
    }

    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });

    const admin = new Admin({
      firebaseUid,
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
    });

    const adminsaved = await admin.save();

    return res.status(201).json({
      message: 'Admin created',
      data: adminsaved,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error ocurred!',
      error: error.message,
    });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();

    if (admins.length > 0) {
      res.status(200).json({
        message: 'Admins list',
        data: admins,
        error: false,
      });
    }

    if (admins.length === 0) {
      res.status(404).json({
        message: 'There are not admins yet.',
        data: [],
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error has ocurred',
      error,
    });
  }
};

const getAdminById = (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid id',
      data: id,
      error: true,
    });
  }

  return Admin.findById(id)
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({
          message: 'Admin not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Admin found! It was ${admin.firstName}`,
        data: admin,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    }));
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid id',
        data: id,
        error: true,
      });
    }
    const adminToDelete = await Admin.findById(id);

    if (!adminToDelete) {
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }

    await firebaseApp.auth().deleteUser(adminToDelete.firebaseUid);

    const adminDeleted = await Admin.deleteOne({ id });
    return res.status(200).json({
      message: 'Admin deleted',
      data: adminDeleted,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error has ocurred',
      error: error.message,
    });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, city,
  } = req.body;

  if (!firstName && !lastName && !dni && !phone && !city) {
    return res.status(400).json({
      message: 'At least one field should be modified',
      data: req.body,
      error: true,
    });
  }

  const adminExists = await Admin.findOne({ dni });
  if (adminExists) {
    return res.status(400).json({
      message: 'There is another admin with that DNI.',
      data: undefined,
      error: true,
    });
  }

  return validateUpdate(req, res, () => {
    Admin.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dni,
        phone,
        city,
      },
      {
        new: true,
      },
    )
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            message: `Admin with id: ${id} was not found!`,
            data: undefined,
            error: true,
          });
        }
        return res.status(200).json({
          message: 'Admin updated',
          data: result,
          error: false,
        });
      })
      .catch((error) => res.status(500).json({
        message: 'An error occurred',
        error: error.message,
      }));
  });
};

module.exports = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  createAdmin,
  deleteAdmin,
};
