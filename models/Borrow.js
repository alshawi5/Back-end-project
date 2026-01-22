const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Books',
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    default: Date.now,

    },
    status: {
      type: String,
      enum: ['borrowed', 'returned', 'overdue'],
      default: 'borrowed',
    },
  },
  {
    timestamps: true,
  }
);

const Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
