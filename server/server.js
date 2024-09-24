const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Import auth routes
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const paymentRoutes = require('./routes/paymentRoutes'); // Import payment routes
const categoryRoutes = require('./routes/categoryRoutes'); // Import category routes
const cartRoutes = require('./routes/cartRoutes');
const protect = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  
}).then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection error: ', err));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/orders',protect, orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/cart', protect, cartRoutes);
app.use('/api/catgories', categoryRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
