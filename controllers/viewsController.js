const catchAsync = require('../utils/catchAsync');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res) => {
  res.status(200).render('overview', {
    title: 'Home',
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into you account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Account',
  });
};

exports.getExpense = catchAsync(async (req, res, next) => {
  res.status(200).render('expense', {
    title: 'Expenses',
  });
});

exports.getPurchase = catchAsync(async (req, res, next) => {
  res.status(200).render('purchase', {
    title: 'Purchases',
  });
});

exports.getSale = catchAsync(async (req, res, next) => {
  res.status(200).render('sale', {
    title: 'Sales',
  });
});

exports.getItem = catchAsync(async (req, res, next) => {
  res.status(200).render('item', {
    title: 'Items',
  });
});
