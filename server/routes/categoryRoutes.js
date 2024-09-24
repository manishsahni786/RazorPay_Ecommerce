const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Adjust path as needed

// @route   GET /api/categories

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});
router.get('/:categoryName', async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Limit the number of products to 4
    const products = category.product.slice(0, 4);

    res.json({ products }); // Wrap products in an object
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;

