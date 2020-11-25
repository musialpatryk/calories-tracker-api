const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authenticateToken = require('../middleware/authToken')
const User = require('../models/user')

/**
 * Get all users
 */
router.get(
    '/',
    async (req, res) => {
        try{
            const allUsers = await User.find()
            res.json(allUsers)
        } catch(err) {
            console.log(err.message)
            res.sendStatus(500)
        }
    }
)
/**
 * Delete all users
 */
router.delete(
    '/',
    async (req, res) => {
        try {
            await User.deleteMany({})
            return res.status(200).json( {message: 'All users deleted.'})
        } catch (err) {
            console.log(err.message)
            return res.sendStatus(500)
        }
    }
)


/**
 * Get user info.
 */
router.get(
    '/:id',
    authenticateToken,
    async (req, res) => {
        if(req.user.id === null) return res.sendStatus(403)

        try{
            const currentUser = await User.findOne({_id: req.user._id})
            const userToShow = await User.findOne({_id: req.params.id})

            if(currentUser._id.toString() === userToShow._id.toString() || currentUser.isSuperUser === true) {
                return res.status(200).json(userToShow)
            }
            return res.sendStatus(403)
        } catch (err) {
            console.log(err.message)
            res.sendStatus(404)
        }
    }
)

/**
 * Check with user can login with specific name and password and return JWT.
 */
router.post(
    '/login',
    async (req, res) => {

        try{
            const currentUser = await User.findOne({username: req.body.name})

            if(currentUser == null) return res.sendStatus(404)

            if( await bcrypt.compare(req.body.password, currentUser.password)) {
                const accessToken = jwt.sign({_id: currentUser._id}, process.env.ACCESS_TOKEN_SECRET)
                return res.status(200).json({accessToken: accessToken})
            }

        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
)

/**
 * Add new user.
 * This api checks if user already exists before creating new one. Add new user id to path.
 */
router.post(
    '/',
    async (req, res) => {
        try{
            const hashedPassword = await bcrypt.hash(req.body.password,10)
            const newUser = new User({username: req.body.name, password: hashedPassword, isSuperUser: req.body.isSuperUser})
            if(await User.exists({ username: newUser.name })) {
                return res.status(400).json({ message: 'User already exists.'})
            }
            await newUser.save()
            return res.sendStatus(201)
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
)

/**
 * Delete users with specific id.
 */
router.delete(
    '/:id',
    authenticateToken,
    async (req, res) => {
        if(req.user.id === null) return res.sendStatus(403)

        try{
            const currentUser = await User.findOne({_id: req.user._id})
            const userToDelete = await User.findOne({_id: req.params.id})

            if(currentUser._id.toString() === userToDelete._id.toString() || currentUser.isSuperUser === true) {
                await userToDelete.delete()
                return res.sendStatus(200)
            }
            return res.sendStatus(403)
        } catch (err) {
            console.log(err.message)
            res.sendStatus(404)
        }
    }
)

module.exports = router
