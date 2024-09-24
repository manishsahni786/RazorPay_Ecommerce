const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true, // Amount in paise
  },
  currency: {
    type: String,
    default: 'INR',
  },
  receipt: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Created',
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  product: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    },
  ],
  orderStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  shippingDetails: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt`

module.exports = mongoose.model('Order', orderSchema);
