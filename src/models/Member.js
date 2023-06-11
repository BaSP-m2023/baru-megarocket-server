const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: 'string',
  lastName: 'string',
  dni: 'string',
  phone: 'string',
  email: 'string',
  city: 'string',
  dob: 'Date',
  zip: 'number',
  isActive: 'boolean',
  membership: {
    type: String,
    enum: ['classic', 'only_classes', 'black'],
  },
  password: 'string',
});

module.exports = mongoose.model('Member', memberSchema);
