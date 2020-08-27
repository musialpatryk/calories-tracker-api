const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get(
    '/',
    (req, res) => {
    res.status(200).json({ message: 'Working on ingredients lists. ' })
})

module.exports = router
