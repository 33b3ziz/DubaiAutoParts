const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  number: {
    type: Number,
    unique: true,
    required: [true, 'A Purchases Invoice must have a Number'],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  buyer: {
    type: String,
    enum: ['Tamer', 'Wissam'],
    required: [true, 'A Purchases Invoice must have a Buyer'],
  },
  total: {
    type: Number,
    required: [true, 'A Purchases Invoice must have a Total'],
    default: 0,
  },
  items: [
    {
      name: {
        type: String,
        required: [true, 'A Spare Part must have a Name'],
      },
      car: {
        type: String,
        required: [true, 'A Spare Part must have a Car Type'],
      },
      quantity: {
        type: Number,
        required: [true, 'A Spare Part must have a Quantity'],
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
        required: [true, 'A Spare Part must have a Price'],
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
        required: [true, 'A Spare Part must have a Total'],
        default: 0,
      },
    },
  ],
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
