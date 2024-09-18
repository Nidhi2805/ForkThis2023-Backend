import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import authRoutes from './controllers/authController'; // Adjust the path as necessary
import envHandler from './managers/envHandler.js'; // Adjust the path as necessary

const app = express();
const PORT = envHandler('PORT') || 3020;
const mongoUri = envHandler('MONGO_URI');

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Set up session middleware
app.use(session({
  secret: envHandler('SESSION_SECRET'),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true for HTTPS
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

