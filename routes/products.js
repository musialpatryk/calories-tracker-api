const express = require('express')
const router = express.Router()

const authenticateToken = require('../middleware/authToken')
const User = require('../models/user')


/**
 * Get user from jwt and return his products.
 */
router.get(
    '/',
    authenticateToken,
    async (req, res) => {
        try{
            const user = await User.findOne({ _id: req.user._id })
            if(user === null) return res.sendStatus(404)
            res.json(user.products)
        } catch(err) {
            console.log(err.message)
            res.sendStatus(500)
        }
    }
)

/**
 * Post products to the user.
 */
router.post(
    '/',
    authenticateToken,
    async (req, res) => {
        try{
            const user = await User.findOne({ _id: req.user._id })
            if(user === null) return res.sendStatus(404)
            if(req.body){
                if ( user.products.some(({name}) => name === req.body.name) )  return res.status(406).json({})
                user.products.push(req.body);
                await user.save()
                return res.status(200).json({})
            }

        } catch(err) {
            console.log(err.message)
            res.sendStatus(500)
        }
    }
)


module.exports = router
