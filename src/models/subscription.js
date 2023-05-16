const mongoose = require('mongoose');

const { Schema } = mongoose;

const subSchema = new Schema({
  classes: {
    type: Schema.ObjectId,
  },
  members: [{
    type: Schema.ObjectId,
  }],
  date: {
    type: Date,
  },
});

module.exports = mongoose.model('Subscription', subSchema);
