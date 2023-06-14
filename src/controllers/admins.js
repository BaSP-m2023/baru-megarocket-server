const Admin = require('../models/Admin');
const { validateUpdate } = require('../validations/admins');

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
      res.status(201).json({
        message: 'Admin created',
        data: result,
        error: false,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: 'An error ocurred!',
        error: error.message,
      });
    });
};

const getAllAdmins = (req, res) => {
  Admin.find({ deleted: false })
    .then((admins) => res.status(200).json({
      data: admins,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error: error.message,
    }));
};

const getAdminById = (req, res) => {
  const { id } = req.params;

  Admin.findById(id)
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({
          message: 'Admin not found',
        });
      }
      if (admin.deleted === true) {
        return res.status(200).json({
          message: 'Admin was deleted',
        });
      }
      return res.status(200).json({
        message: `Admin found! It was ${admin.firstName}`,
        data: admin,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error occurred',
      error: error.message,
    }));
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;

  Admin.findByIdAndUpdate(id, { deleted: true })
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({
          message: `Admin with id: ${id} was not found!`,
        });
      }
      if (admin.deleted) {
        return res.status(400).json({
          message: `Admin with id: ${id} has already been deleted!`,
        });
      }
      return res.status(200).json({
        message: 'Admin deleted',
        deleted: true,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error: error.message,
    }));
};

const updateAdmin = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;

  if (!firstName && !lastName && !dni && !phone && !email && !city && !password) {
    return res.status(400).json({
      message: 'At least one field should be modified',
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
        return res.status(200).json({
          message: 'Admin updated',
          data: result,
          error: false,
        });
      })
      .catch((error) => res.status(400).json({
        message: 'An error occurred',
        error: error.message,
      }));
  });
};

const recoverAdmin = (req, res) => {
  const { id } = req.params;

  Admin.findByIdAndUpdate(id, { deleted: false })
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({
          message: `Admin with id: ${id} was not found!`,
        });
      }
      if (!admin.deleted) {
        return res.status(400).json({
          message: `Admin with id: ${id} has never been deleted!`,
        });
      }
      return res.status(200).json({
        message: `Admin with id: ${id} was successfully recovered!`,
        data: admin,
        deleted: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error: error.message,
    }));
};

const cleanAdmins = (req, res) => {
  Admin.deleteMany({ deleted: true })
    .then((result) => {
      if (result.n === 0) {
        return res.status(404).json({
          message: 'The DB have not admins to clean',
        });
      }
      return res.status(204).end();
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error: error.message,
    }));
};

module.exports = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  createAdmin,
  deleteAdmin,
  recoverAdmin,
  cleanAdmins,
};
