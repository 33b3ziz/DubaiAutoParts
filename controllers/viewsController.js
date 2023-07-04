const User = require('../models/userModel');
const Expense = require('../models/expenseModel');
const Purchase = require('../models/purchaseModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Expense.find();

  res.status(200).render('overview', {
    title: 'All Expenses',
    tours,
  });
});

exports.getExpense = catchAsync(async (req, res, next) => {
  const tour = await Expense.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Expense`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into you account',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign Up For Free',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyExpenses = catchAsync(async (req, res, next) => {
  const bookings = await Purchase.find({ user: req.user.id });

  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Expense.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Expenses',
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
