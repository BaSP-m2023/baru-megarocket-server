const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: 'string',
  lastName: 'string',
  dni: 'number',
  phone: 'number',
  email: 'string',
  city: 'string',
  dob: 'date',
  zip: 'number',
  isActive: 'boolean',
  membership: ['classic', 'only-classes', 'black'],
  password: 'string',
});

module.exports = mongoose.model('member', memberSchema);
