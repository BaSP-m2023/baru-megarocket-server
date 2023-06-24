const mongoose = require('mongoose');

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  fireBaseUid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
