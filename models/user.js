const mongoose = require('mongoose');
const DaysSchema = require('./Day');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSuperUser: {
    type: Boolean,
    required: true,
    default: false,
  },
  days: {
    type: [DaysSchema],
    required: false,
    default: [
      {
        date: Date.now(),
        meals: {
          products: [],
          caloriesSummary: null,
        },
      },
    ],
  },
  products: {
    type: [Object],
    required: false,
  },
});

module.exports = mongoose.model('User', userSchema);
