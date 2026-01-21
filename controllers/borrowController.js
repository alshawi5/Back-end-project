const Books = require('../models/book');
const Borrow = require('../models/Borrow');

const borrowBook = async (req, res) => {
  try {
    const borrow = await Borrow.create({
      user: req.user._id,
      book: req.body.book,
      borrowDate: new Date(),
      status: 'borrowed',
    });
    await Books.findByIdAndUpdate(req.body.book,{isAvailable:false})
    res.status(201).json(borrow);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getUserBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user._id }).populate('book');
    res.json(borrows);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateBorrow = async (req, res) => {
  try {
    const borrow = await Borrow.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await Books.findByIdAndUpdate(borrow.book,{isAvailable:true})
    if (!borrow) return res.status(404).json({ err: 'Borrow record not found' });
    res.json(borrow);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { borrowBook, getUserBorrows, updateBorrow };
