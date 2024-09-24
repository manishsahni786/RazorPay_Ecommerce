const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [productSchema],
});

const Category = mongoose.model('Category', categorySchema, 'catgories');

module.exports = Category;