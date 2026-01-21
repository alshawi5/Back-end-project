const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Controllers
const authController = require('./controllers/auth');
const booksController = require('./controllers/booksController');
const borrowController = require('./controllers/borrowController');
const reviewController = require('./controllers/reviewController');

// Middleware
const verifyToken = require('./middleware/verify-Token');
const verifyAdmin = require('./middleware/verifyAdmin');

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB: ${mongoose.connection.name}`))
  .catch((err) => console.error('MongoDB connection error:', err));

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Auth Endpoints
app.post('/auth/sign-up', authController.signUp);
app.post('/auth/sign-in', authController.signIn);

// Books Endpoints
// Public endpoints
app.get('/books', booksController.getAllBooks);
app.get('/books/:id', booksController.getBookById);

// Admin-only endpoints
app.post('/books', verifyToken, verifyAdmin, booksController.createBook);
app.put('/books/:id', verifyToken, verifyAdmin, booksController.updateBook);
app.delete('/books/:id', verifyToken, verifyAdmin, booksController.deleteBook);

// Borrow Endpoints
app.post('/borrow', verifyToken, borrowController.borrowBook);
app.get('/borrow/my-borrows', verifyToken, borrowController.getUserBorrows);
app.put('/borrow/:id', verifyToken, borrowController.updateBorrow);

// Review Endpoints
app.post('/review', verifyToken, reviewController.createReview);
app.get('/review/:bookId', reviewController.getBookReviews);

// Test Route
app.get('/test', verifyToken, (req, res) => {
  res.status(200).json({ message: 'You are logged in!', user: req.user });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
