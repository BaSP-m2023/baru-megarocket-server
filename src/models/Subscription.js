const mongoose = require('mongoose');

const { Schema } = mongoose;

const subsSchema = new Schema({
  classes: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Class',
  },
  members: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Member',
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model('Subscription', subsSchema);
