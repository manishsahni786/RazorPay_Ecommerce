const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
 
}).then(() => console.log('Database connected'));

app.use('/api/orders', require('./routes/orderRoutes'));  // This will be used for order CRUD operations
app.use('/api/payment', require('./routes/paymentRoutes'));  // This handles payment related routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
