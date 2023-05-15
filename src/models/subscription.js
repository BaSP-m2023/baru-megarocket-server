const mongoose = require('mongoose');

const { Schema } = mongoose;

const subSchema = new Schema({
  classes: {
    type: Object,
  },
});

module.exports = mongoose.model('Subscription', subSchema);
