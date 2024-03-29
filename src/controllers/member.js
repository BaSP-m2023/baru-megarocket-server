const Member = require('../models/Member');
const { default: firebaseApp } = require('../helper/firebase');

const regexObjectId = /^[0-9a-fA-F]{24}$/;

const getAllMembers = (req, res) => {
  Member.find()
    .then((member) => res.status(200).json({
      message: 'Complete members list',
      data: member,
      error: false,
    }))
    .catch(() => res.status(500).json({
      message: 'Unexpected error. Please try again later.',
      data: undefined,
      error: true,
    }));
};

// eslint-disable-next-line consistent-return
const getMemberById = (req, res) => {
  const { id } = req.params;

  if (!id.match(regexObjectId)) {
    return res.status(404).json({
      message: 'Please put a valid ID',
      data: undefined,
      error: true,
    });
  }

  Member.findById(id)
    .then((member) => {
      res.status(200).json({
        message: 'Member found',
        data: member,
        error: false,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: `The member with the id ${id} does not exist`,
        data: undefined,
        error: true,
      });
    });
};

const createMember = async (req, res) => {
  const {
    name,
    lastName,
    phone, dni,
    avatar,
    city,
    dob,
    zip,
    isActive,
    membership,
    email,
  } = req.body;
  const memberDNIExists = await Member.findOne({ dni });
  const memberEmailExists = await Member.findOne({ email });
  if (memberDNIExists) {
    return res.status(400).json({
      message: 'There is another Member with that dni.',
      data: undefined,
      error: true,
    });
  }
  if (memberEmailExists) {
    return res.status(400).json({
      message: 'There is another Member with that email.',
      data: undefined,
      error: true,
    });
  }
  const newFirebaseUser = await firebaseApp.auth().createUser({
    email: req.body.email,
    password: req.body.password,
  });

  const firebaseUid = newFirebaseUser.uid;
  await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'MEMBER' });

  return Member.create({
    firebaseUid,
    name,
    lastName,
    avatar,
    phone,
    dni,
    city,
    dob,
    zip,
    isActive,
    membership,
    email,
  })
    .then((result) => res.status(201).json({
      message: 'Member created',
      data: result,
      error: false,
    }))
    .catch(() => res.status(500).json({
      message: 'Invalid Request: Internal error',
      data: undefined,
      error: true,
    }));
};

// eslint-disable-next-line consistent-return
const updateMember = async (req, res) => {
  const { id } = req.params;

  if (!id.match(regexObjectId)) {
    return res.status(404).json({
      message: 'Please put a valid ID',
      data: undefined,
      error: true,
    });
  }

  const {
    name,
    lastName,
    dni,
    avatar,
    phone,
    city,
    dob,
    zip,
    isActive,
    membership,
  } = req.body;

  const memberExists = await Member.findOne({ dni });
  // eslint-disable-next-line no-underscore-dangle
  if (memberExists && memberExists._id.toString() !== id) {
    return res.status(400).json({
      message: 'There is another Member with that DNI.',
      data: undefined,
      error: true,
    });
  }
  Member.findByIdAndUpdate(
    id,
    {
      name,
      lastName,
      dni,
      avatar,
      phone,
      city,
      dob,
      zip,
      isActive,
      membership,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Member with id ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Member updated',
        data: result,
        error: false,
      });
    })
    .catch(() => res.status(500).json({
      message: 'Something went wrong',
      data: undefined,
      error: true,
    }));
};

const deleteMember = (req, res) => {
  const { id } = req.params;

  if (!id.match(regexObjectId)) {
    res.status(404).json({
      message: 'Please put a valid ID',
      data: undefined,
      error: true,
    });
  }

  Member.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Member with id ${id} not found`,
          data: undefined,
          error: true,
        });
      }
      firebaseApp.auth().deleteUser(result.firebaseUid);
      return res.status(200).json({
        message: 'Member deleted',
        data: result,
        error: false,
      });
    })
    .catch(() => res.status(500).json({
      message: 'Something went wrong',
      data: undefined,
      error: true,
    }));
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  deleteMember,
  updateMember,
};
