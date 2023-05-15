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
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  time: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model('Class', classSchema);
