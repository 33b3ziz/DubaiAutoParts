const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require('validator');

const expenseSchema = new mongoose.Schema({
  expenseNumber: {
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
        required: [true, 'A expense must have a name'],
      },
      quantity: {
        type: Number,
        required: [true, 'A expense must have a quantity'],
        default: 1,
      },
      price: {
        type: Number,
        required: [true, 'A expense must have a price'],
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

// Calculate total for each expense
expenseSchema.pre('save', function (next) {
  this.total = this.quantity * this.price;
  next();
});

/////////////////////////////////////////////////////////////////////////////////////////////////

// expenseSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// expenseSchema.pre(/^find/, function (next) {
//   this.find({ secretExpense: { $ne: true } });
//   this.start = Date.now();
//   this.populate({
//     path: 'guides',
//     select: '-__v -passwordChangedAt',
//   });
//   next();
// });

// expenseSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   next();
// });

// AGGREGATION MIDDLEWARE
// expenseSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretExpense: { $ne: true } } });
//   console.log(this.pipeline());
//   next();
// });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
