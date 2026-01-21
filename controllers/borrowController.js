const Borrow = require('../models/Borrow');

// Borrow a book
const borrowBook = async (req, res) => {
  try {
    const borrow = await Borrow.create({
      user: req.user._id,
      book: req.body.book,
      borrowDate: new Date(),
      status: 'borrowed',
    });
    res.status(201).json(borrow);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Get all borrows for logged-in user
const getUserBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user._id }).populate('book');
    res.json(borrows);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Update borrow
const updateBorrow = async (req, res) => {
  try {
    const borrow = await Borrow.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!borrow) return res.status(404).json({ err: 'Borrow record not found' });
    res.json(borrow);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { borrowBook, getUserBorrows, updateBorrow };
