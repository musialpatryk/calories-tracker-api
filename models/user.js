const mongoose = require('mongoose')
const ingredientListSchema = require('./ingredientList')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        isSuperUser: {
            type: Boolean,
            required: true,
            default: false
        },
        ingredientsLists: {
            type: [ingredientListSchema],
            required: false,
            default: []
        }
    }
)

module.exports = mongoose.model('User', userSchema)
