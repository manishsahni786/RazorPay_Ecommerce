const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Adjust path as needed

// @route   GET /api/categories
// @desc    Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});



module.exports = router;