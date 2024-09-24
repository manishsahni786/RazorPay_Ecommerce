const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Cart = require('../models/CartSchema'); // The Cart model
const Category = require('../models/Category'); // The Category model (where products are stored)
const router = express.Router();

// Add or update items in the cart
router.post('/add', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Find user by email (assuming req.user is set by middleware)
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      cart = new Cart({ user: user._id, items: [] });
    }

    // Convert productId to ObjectId
    const objectIdProductId = new mongoose.Types.ObjectId(productId);

    // Find the category containing the product
    const category = await Category.findOne({ 'product._id': objectIdProductId });
    if (!category) return res.status(404).json({ message: 'Product not found in category' });

    // Get the product details
    const product = category.product.id(objectIdProductId);

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.equals(objectIdProductId));

    if (itemIndex > -1) {
      // If the product exists, update the quantity
      cart.items[itemIndex].quantity += quantity; // Increment quantity
    } else {
      // If the product does not exist, add it to the cart
      cart.items.push({
        productId: objectIdProductId,
        name: product.name,
        amount: product.amount,
        quantity
      });
    }

    // Save the cart
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding or updating item in cart', error: error.message });
  }
});

// Get the user's cart
router.get('/', async (req, res) => {
  try {
    // Find user by email (assuming req.user is set by middleware)
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find the user's cart
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

// Delete an item from the cart
router.delete('/delete/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    // Find user by email
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find the user's cart
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Check if the item exists in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex === -1) return res.status(404).json({ message: 'Product not found in cart' });

    // Remove the product from the cart by filtering out the item
    cart.items = cart.items.filter(item => !item.productId.equals(productId));

    // Save the updated cart
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item from cart', error: error.message });
  }
});


module.exports = router;
