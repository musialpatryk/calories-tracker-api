const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authToken');
const User = require('../models/user');

/**
 * Get all users
 */
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find({ name: 'Patryk' });
    res.json(allUsers);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

/**
 * Get user from jwt and return his meals.
 */
router.get('/meals/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user === null) return res.sendStatus(404);
    res.json(user.days[0].meals);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

/**
 * Post meals to the user.
 */
router.post('/meals/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user === null) return res.sendStatus(404);
    if (req.body) {
      user.days[0].meals = req.body;
      await user.save();
      return res.status(200).json({});
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
