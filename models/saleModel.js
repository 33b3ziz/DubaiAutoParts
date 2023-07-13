const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  number: {
    type: Number,
    unique: true,
    required: [true, 'A Sales Invoice must have a Number'],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  seller: {
    type: String,
    enum: ['Tamer', 'Wissam'],
    required: [true, 'A Sales Invoice must have a Seller'],
  },
  total: {
    type: Number,
    required: [true, 'A Sales Invoice must have a Total'],
    default: 0,
  },
  totalProfit: {
    type: Number,
    required: [true, 'A Sales Invoice must have a Total Profit'],
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
            return val <= this.stockQuantity && val >= 0;
          },
          message: 'Quantity should be smaller than or equal stock quantity',
        },
      },
      price: {
        type: Number,
        required: [true, 'A Spare Part must have a Price'],
        default: 0,
        validate: {
          validator: function (val) {
            return val > this.averagePrice;
          },
          message: 'Price should be bigger than average price',
        },
      },
      total: {
        type: Number,
        required: [true, 'A Spare Part must have a Total'],
        default: 0,
      },
      stockQuantity: {
        type: Number,
        default: 0,
      },
      averagePrice: {
        type: Number,
        default: 0,
      },
      stockTotal: {
        type: Number,
        default: 0,
      },
      profit: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
