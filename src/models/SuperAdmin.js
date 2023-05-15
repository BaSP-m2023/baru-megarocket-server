const mongoose = require('mongoose');

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
