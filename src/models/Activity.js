const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: String,
  description: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Activity', activitySchema);
