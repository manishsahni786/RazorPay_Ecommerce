const express = require('express');
const protect = require('../middleware/authMiddleware'); // Import the protect middleware
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const router = express.Router();

// @route   POST /api/payment/order
// @desc    Create a new Razorpay order and save it to the database
router.post('/order',protect, async (req, res) => {
  try {
    const { amount } = req.body; // Amount received in paise
    console.log(`Amount received from client: ${amount}`); 

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: amount, // Amount in paise, no conversion needed
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    });

    // Save the order to the database
    const newOrder = new Order({
      razorpay_order_id: order.id,
      amount: order.amount,  // Store the amount as received from Razorpay
      currency: order.currency,
      receipt: order.receipt,
    });

    await newOrder.save();
    console.log(`Order stored in database with amount: ${order.amount} paise`); 

    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

// @route   POST /api/payment/verify
// @desc    Verify Razorpay payment signature
router.post('/verify',protect, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    console.log("Received Signature:", razorpay_signature);
    console.log("Computed Signature:", digest);

    if (digest === razorpay_signature) {
      const updatedOrder = await Order.findOneAndUpdate(
        { razorpay_order_id: razorpay_order_id },
        { status: 'Paid' },
        { new: true }
      );

      if (updatedOrder) {
        res.status(200).json({ success: true, message: 'Payment verified successfully', order: updatedOrder });
      } else {
        res.status(400).json({ success: false, message: 'Order not found or update failed' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
});


module.exports = router;