const mongoose = require('mongoose')
const ingredientSchema = require('./ingredient')

const ingredientListSchema = mongoose.Schema({
    name: {
      type: String,
      require: false
    },
    ingredients: {
        type: [ingredientSchema],
        required: false,
        default: []
    }
})

module.exports = ingredientListSchema
