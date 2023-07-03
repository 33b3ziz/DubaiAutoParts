const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema(
  {
    sale: {
      type: String,
      required: [true, 'Sale can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Sale must belong to a tour.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Sale must belong to a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

saleSchema.index({ tour: 1, user: 1 }, { unique: true });

saleSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

saleSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});

saleSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

saleSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
