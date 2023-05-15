const mongoose = require('mongoose');

const { Schema } = mongoose;

const subsSchema = new Schema({
  classes: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  members: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model('Subscription', subsSchema);
