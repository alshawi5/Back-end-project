const Review = require('../models/Review');

// Create a review
const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      user: req.user._id,
      book: req.body.book,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Get all reviews for a book
const getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { createReview, getBookReviews };
