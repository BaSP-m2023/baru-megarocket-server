const Member = require('../models/members');

const deleteMember = (req, res) => {
  const { id } = req.params;
  Member.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Member with id ${id} not found`,
        });
      }
      return res.status(204);
    })
    .catch((error) => res.tatus(400).json({
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
          msg: `Member with id ${id} was not found`,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => res.status(400).json(error));
};

module.exports = {
  deleteMember,
  updateMember,
};
