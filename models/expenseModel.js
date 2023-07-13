const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  number: {
    type: Number,
    unique: true,
    required: [true, 'A Expenses Invoice must have a Number'],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  spender: {
    type: String,
    enum: ['Tamer', 'Wissam'],
    required: [true, 'A Expenses Invoice must have a Buyer'],
  },
  total: {
    type: Number,
    required: [true, 'A Expenses Invoice must have a Total'],
    default: 0,
  },
  items: [
    {
      name: {
        type: String,
        required: [true, 'A Expense must have a Name'],
      },
      quantity: {
        type: Number,
        required: [true, 'A Expense must have a Quantity'],
        default: 0,
        validate: {
          validator: function (val) {
            return val > 0;
          },
          message: 'Quantity should be bigger than zero',
        },
      },
      price: {
        type: Number,
        required: [true, 'A Expense must have a Price'],
        default: 0,
        validate: {
          validator: function (val) {
            return val > 0;
          },
          message: 'Price should be bigger than zero',
        },
      },
      total: {
        type: Number,
        required: [true, 'A Expense must have a Total'],
        default: 0,
      },
    },
  ],
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
