const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Import auth routes
const protect = require('./middleware/authMiddleware'); // Import protect middleware

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  
}).then(() => console.log('Database connected'));

// Use the auth routes
app.use('/api/auth', authRoutes);

app.use('/api/orders', protect, require('./routes/orderRoutes'));  // Protect order routes
app.use('/api/payment', protect, require('./routes/paymentRoutes'));  // Protect payment routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
