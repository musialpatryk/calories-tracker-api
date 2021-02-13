const mongoose = require('mongoose')

const daySchema = new mongoose.Schema(
    {
        date:  Date,
        meals: [
            {
                products: [ {
                    name: {
                        type: String,
                        required: false
                    },
                    grams: {
                        type: Number,
                        required: false,
                    }
                } ],
                caloriesSummary: {
                    type: Number,
                    required: false,
                    default: null
                }
            }
        ]
    }
)

module.exports = daySchema
