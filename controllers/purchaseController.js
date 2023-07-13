const Purchase = require('../models/purchaseModel');
const catchAsync = require('../utils/catchAsync');

// Create Invoice
exports.createInvoice = catchAsync(async (req, res, next) => {
  await Purchase.create(req.body);
  res.status(201).json({
    status: 'success',
  });
});

// Get Invoice
exports.readInvoice = catchAsync(async (req, res, next) => {
  const doc = await Purchase.findOne({ number: req.params.invoiceNumber });
  res.status(201).json({
    status: 'success',
    data: doc,
  });
});

// Get All Invoice
exports.readAllInvoices = catchAsync(async (req, res, next) => {
  const doc = await Purchase.find();
  res.status(201).json({
    status: 'success',
    data: doc,
  });
});

// Get Number Of Last Invoice
exports.readNumOfLastInvoice = catchAsync(async (req, res, next) => {
  const doc = await Purchase.findOne({}, { number: 1 }).sort({
    number: -1,
  });
  res.status(201).json({
    status: 'success',
    data: doc,
  });
});
