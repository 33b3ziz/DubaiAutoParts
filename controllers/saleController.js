const Sale = require('../models/saleModel');
const catchAsync = require('../utils/catchAsync');

// Create Invoice
exports.createInvoice = catchAsync(async (req, res, next) => {
  await Sale.create(req.body);
  res.status(201).json({
    status: 'success',
  });
});

// Get Invoice
exports.readInvoice = catchAsync(async (req, res, next) => {
  const doc = await Sale.findOne({ number: req.params.invoiceNumber });
  res.status(201).json({
    status: 'success',
    data: doc,
  });
});

// Get All Invoice
exports.readAllInvoices = catchAsync(async (req, res, next) => {
  const doc = await Sale.find();
  res.status(201).json({
    status: 'success',
    data: doc,
  });
});

// Update Invoice
exports.updateInvoice = catchAsync(async (req, res, next) => {
  const { body } = req;

  await Sale.updateOne(
    { number: req.params.invoiceNumber },
    {
      total: body.total,
      totalProfit: body.totalProfit,
      items: body.items,
    }
  );

  res.status(201).json({
    status: 'success',
  });
});

// Get Number Of Last Invoice
exports.readNumOfLastInvoice = catchAsync(async (req, res, next) => {
  const doc = await Sale.findOne({}, { number: 1 }).sort({
    number: -1,
  });
  res.status(201).json({
    status: 'success',
    data: doc,
  });
});
