const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A expense must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A expense must have less or equal 40 characters'],
      minlength: [10, 'A expense must have more or equal 10 characters'],
      // validate: [validator.isAlpha, 'Expense name must only contain characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A expense must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A expense must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A expense must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A expense must be above 1.0'],
      max: [5, 'A expense must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A expense must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A expense must have an cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretExpense: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

expenseSchema.index({ price: 1, ratingsAverage: -1 });
expenseSchema.index({ slug: 1 });
expenseSchema.index({ startLocation: '2dsphere' });

expenseSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

expenseSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'expense',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
expenseSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
expenseSchema.pre(/^find/, function (next) {
  this.find({ secretExpense: { $ne: true } });
  this.start = Date.now();
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

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
