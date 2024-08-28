const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Import auth routes
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const paymentRoutes = require('./routes/paymentRoutes'); // Import payment routes
const categoryRoutes = require('./routes/categoryRoutes'); // Import category routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection error: ', err));

// Use the auth routes
app.use('/api/auth', authRoutes);

// Use the protected routes
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Use the category routes
app.use('/api/categories', categoryRoutes);
// Fetch products by category

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
