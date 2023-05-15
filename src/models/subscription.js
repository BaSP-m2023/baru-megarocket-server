const mongoose = require('mongoose');

const subsSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  members: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  id: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Subscription', subsSchema);
