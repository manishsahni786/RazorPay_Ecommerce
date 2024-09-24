const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const protect = require('../middleware/authMiddleware');

// Fetch all orders for authenticated user
router.get('/',  async (req, res) => {
  try {
    // Fetch orders for the authenticated user by email
    const orders = await Order.find({ email: req.user.email });
    res.json(orders); // No need to populate as product details are directly stored
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch order by ID
router.get('/:id',  async (req, res) => {
  try {
    // Find order by its ID
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order); // Return the order including product details (name and quantity)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
