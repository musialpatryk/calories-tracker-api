const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
});

module.exports = ingredientSchema;
