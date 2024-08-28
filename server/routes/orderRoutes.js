const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

  // @route   POST /api/orders
  // @desc    Create a new order
  router.post('/', async (req, res) => {
    const { productName, quantity, totalAmount, paymentId } = req.body;

    const newOrder = new Order({
      productName,
      quantity,
      totalAmount,
      paymentId,
    });

    try {
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // @route   GET /api/orders
  // @desc    Get all orders
  router.get('/', async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // @route   GET /api/orders/:id
  // @desc    Get an order by ID
  router.get('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // @route   PUT /api/orders/:id
  // @desc    Update an order
  router.put('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      const { productName, quantity, totalAmount, orderStatus } = req.body;

      if (productName) order.productName = productName;
      if (quantity) order.quantity = quantity;
      if (totalAmount) order.totalAmount = totalAmount;
      if (orderStatus) order.orderStatus = orderStatus;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // @route   DELETE /api/orders/:id
  // @desc    Delete an order
  router.delete('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      await order.remove();
      res.json({ message: 'Order removed' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  module.exports = router;
