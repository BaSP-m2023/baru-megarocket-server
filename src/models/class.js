const mongoose = require('mongoose');

const { Schema } = mongoose;
const classSchema = new Schema({
  activity: {
    type: String,
    required: true,
  },
  trainer: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('Class', classSchema);
