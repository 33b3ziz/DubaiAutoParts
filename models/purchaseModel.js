const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  purchaseNumber: {
    type: Number,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  items: [
    {
      name: {
        type: String,
        required: [true, 'A purchase must have a name'],
      },
      car: {
        type: String,
        enum: ['Malibu', 'Equinox'],
        required: [true, 'A Spare Part must have a car type'],
      },
      quantity: {
        type: Number,
        required: [true, 'A purchase must have a quantity'],
        default: 1,
      },
      price: {
        type: Number,
        required: [true, 'A purchase must have a price'],
        default: 0,
      },
    },
  ],
  total: {
    type: Number,
    required: [true, 'A expense must have a total'],
    default: 0,
  },
});

// // Calculate total for each expense
// purchaseSchema.pre('save', function (next) {
//   this.total = this.quantity * this.price;
//   next();
// });

// purchaseSchema.pre(/^find/, function (next) {
//   this.populate('user').populate({
//     path: 'tour',
//     select: 'name',
//   });
//   next();
// });

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
