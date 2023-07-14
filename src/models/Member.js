const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  name: 'string',
  lastName: 'string',
  avatar: 'string',
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
});

module.exports = mongoose.model('Member', memberSchema);
