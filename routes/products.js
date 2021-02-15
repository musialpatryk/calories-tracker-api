const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authToken');
const User = require('../models/user');

/**
 * Get user from jwt and return his products.
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user === null) return res.sendStatus(404);
    res.json(user.products);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

/**
 * Post products to the user.
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user === null) return res.sendStatus(404);
    if (req.body) {
      if (user.products.some(({ name }) => name === req.body.name)) return res.status(406).json({});
      user.products.push(req.body);
      await user.save();
      return res.status(200).json({});
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

/**
 * Delete products with name.
 */
router.delete('/:name', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user === null) return res.sendStatus(404);
    if (req.body) {
      if (req.params.name === null) return res.status(400).json({});
      const productIndex = user.products.findIndex((product) => product.name === req.params.name);
      if (productIndex === -1) return res.status(400).json({});
      user.products.splice(productIndex, 1);
      await user.save();
      return res.status(200).json(user.products);
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
