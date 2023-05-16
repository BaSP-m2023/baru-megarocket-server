const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: String,
  description: String,
  isActive: Boolean,
});

module.exports = mongoose.model('Activity', activitySchema);
