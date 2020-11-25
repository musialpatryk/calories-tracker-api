const mongoose = require('mongoose')
const DaysSchema = require('./Day')

const userSchema = new mongoose.Schema(
    {
        username: {
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
        days: {
            type: [DaysSchema],
            required: false,
            default: [
                {
                    date: Date.now(),
                    meals: {
                        products: [
                            {
                                name: 'Kurczak',
                                grams: 0
                            }
                        ],
                        caloriesSummary: null
                    }
                }
            ]
        },
        products: {
            type: [Object],
            required: false,
            default: [
                {
                    name: 'Kurczak',
                    kcal: 100
                },
                {
                    name: 'Kanapka',
                    kcal: 200
                },
                {
                    name: 'API',
                    kcal: 200
                }
            ]
        }
    }
)

module.exports = mongoose.model('User', userSchema)
