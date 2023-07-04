const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  discount: {
    type: Number,
    default: 0,
  },
  details: [
    {
      name: {
        type: String,
        required: [true, 'A sale must have a name'],
      },
      car: {
        type: String,
        enum: ['Malibu', 'Equinox'],
        required: [true, 'A Spare Part must have a car type'],
      },
      quantity: {
        type: Number,
        required: [true, 'A sale must have a quantity'],
        default: 0,
      },
      price: {
        type: Number,
        required: [true, 'A sale must have a price'],
        default: 0,
      },
      total: Number,
      profit: Number,
    },
  ],
});

// Calculate total for each expense
saleSchema.pre('save', function (next) {
  this.total = this.quantity * this.price;
  next();
});

saleSchema.pre('save', function (next) {
  this.profit = this.total - this.quantity * this.price;
  next();
});

// saleSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'user',
//     select: 'name photo',
//   });
//   next();
// });

// saleSchema.post('save', function () {
//   this.constructor.calcAverageRatings(this.tour);
// });

// saleSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.findOne();
//   next();
// });

// saleSchema.post(/^findOneAnd/, async function () {
//   await this.r.constructor.calcAverageRatings(this.r.tour);
// });

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
