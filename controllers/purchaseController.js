const Purchase = require('../models/purchaseModel');
// const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {});

exports.createBooking = factory.createOne(Purchase);
exports.getBooking = factory.getOne(Purchase);
exports.getAllBookings = factory.getAll(Purchase);
exports.updateBooking = factory.updateOne(Purchase);
exports.deleteBooking = factory.deleteOne(Purchase);
