const Books = require('../models/book');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find().populate('owner', 'username');
    res.json(books);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Get single book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id).populate('owner', 'username');
    if (!book) return res.status(404).json({ err: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Create book (admin only)
const createBook = async (req, res) => {
  try {
    const book = await Books.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Update book (admin only)
const updateBook = async (req, res) => {
  try {
    const book = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ err: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Delete book (admin only)
const deleteBook = async (req, res) => {
  try {
    const book = await Books.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ err: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
