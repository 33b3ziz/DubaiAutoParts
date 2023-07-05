const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item can not be empty!'],
  },
  car: {
    type: String,
    enum: ['Malibu', 'Equinox'],
    required: [true, 'Spare Part can not be empty! Must belong to a Car'],
  },
  quantity: {
    type: Number,
    default: 0,
  },
  averagePrice: {
    type: Number,
    default: 0,
  },
});

// itemSchema.post('save', function () {

// });

// itemSchema.pre(/^findOneAnd/, async function (next) {
//   next();
// });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
