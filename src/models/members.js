const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  id: 'number',
  name: 'string',
  lastName: 'string',
  dni: 'number',
  phone: 'number',
  email: 'string',
  city: 'string',
  dob: 'date',
  zip: 'any',
  isActive: 'boolean',
  membership: ['classic', 'only-classes', 'black'],
  password: 'any',
});

module.exports = mongoose.model('member', memberSchema);
