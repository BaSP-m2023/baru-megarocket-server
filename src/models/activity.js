const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model('Activity', activitySchema);
