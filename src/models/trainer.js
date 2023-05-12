const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  dni: String,
  phone: String,
  email: String,
  password: String,
  salary: String,
  is_active: Boolean,
});

module.exports(mongoose.model('Trainer', trainerSchema));
