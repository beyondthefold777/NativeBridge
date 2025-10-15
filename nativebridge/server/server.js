const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // your auth.js file
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://anthonybell67ab:Yankees18!@barberworld.4bjgh.mongodb.net/NativeBridge?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected to NativeBridge database'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Server listening
const PORT = 3000; // hardcoded port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
