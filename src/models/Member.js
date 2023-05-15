const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: 'string',
  lastName: 'string',
  dni: 'number',
  phone: 'string',
  email: 'string',
  city: 'string',
  dob: 'Date',
  zip: 'number',
  isActive: 'boolean',
  membership: ['classic', 'only-classes', 'black'],
  password: 'string',
});

module.exports = mongoose.model('Member', memberSchema);
