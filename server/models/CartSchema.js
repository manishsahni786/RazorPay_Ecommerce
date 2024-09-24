const mongoose = require('mongoose');
const { Schema } = mongoose;

// Cart item schema with product details fetched from the database
const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true }, // Reference to product ID
  name: { type: String,  },  // Product name from Category
  amount: { type: Number, }, // Product amount from Category
  quantity: { type: Number, default: 1 } // Quantity of the product in the cart
});

// Cart schema for storing items related to a user
const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User reference
  items: [cartItemSchema] // Array of cart items
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
