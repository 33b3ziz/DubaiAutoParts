const Item = require('../models/itemModel');
const catchAsync = require('../utils/catchAsync');

// Get all items as options for datalist tag
exports.getOptions = catchAsync(async (req, res, next) => {
  const items = await Item.distinct('name');

  let options = '';

  for (let i = 0; i < items.length; i++) {
    options += `<option value='${items[i]}'></option>`;
  }

  res.status(200).json({
    status: 'success',
    data: options,
  });
});

// Get Cars Avaliable For Current Item
exports.getCarOptions = catchAsync(async (req, res, next) => {
  const carOptions = await Item.find(
    {
      name: req.params.name,
    },
    { car: 1 }
  );

  let options = '';

  options += `<option disabled selected>Select...</option>`; // to disable auto selection
  for (let i = 0; i < carOptions.length; i++) {
    options += `<option value='${carOptions[i].car}'>${carOptions[i].car}</option>`;
  }

  res.status(200).json({
    status: 'success',
    data: options,
  });
});

// Read Item
exports.getItem = catchAsync(async (req, res, next) => {
  const item = await Item.findOne(
    { name: req.params.name, car: req.params.car },
    { quantity: 1, averagePrice: 1, total: 1 }
  );

  res.status(200).json({
    status: 'success',
    data: item,
  });
});

// Get All Invoice
exports.readAllItems = catchAsync(async (req, res, next) => {
  const doc = await Item.find();
  res.status(201).json({
    status: 'success',
    data: doc,
  });
});

// Update Item
exports.updateItem = catchAsync(async (req, res, next) => {
  const { body } = req;

  const item = await Item.updateOne(
    {
      name: req.params.name,
      car: req.params.car,
    },
    {
      quantity: body.quantity,
      averagePrice: body.averagePrice,
      total: body.total,
    }
  );

  res.status(200).json({
    status: 'success',
    data: item,
  });
});

// exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
//   const year = req.params.year * 1;

//   const plan = await Item.aggregate([
//     {
//       $unwind: '$startDates',
//     },
//     {
//       $match: {
//         startDates: {
//           $gte: new Date(`${year}-01-01`),
//           $lte: new Date(`${year}-12-31`),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { $month: '$startDates' },
//         numItemStarts: { $sum: 1 },
//         tours: { $push: '$name' },
//       },
//     },
//     {
//       $addFields: { month: '$_id' },
//     },
//     {
//       $project: {
//         _id: 0,
//       },
//     },
//     {
//       $sort: { numItemStarts: -1 },
//     },
//     {
//       $limit: 12,
//     },
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       plan,
//     },
//   });
// });

// exports.getItemStats = catchAsync(async (req, res, next) => {
//   const stats = await Item.aggregate([
//     {
//       $match: { ratingsAverage: { $gte: 4.5 } },
//     },
//     {
//       $group: {
//         _id: { $toUpper: '$difficulty' },
//         numItems: { $sum: 1 },
//         numRatings: { $sum: '$ratingsQuantity' },
//         avgRating: { $avg: '$ratingsAverage' },
//         avgPrice: { $avg: '$price' },
//         minPrice: { $min: '$price' },
//         maxPrice: { $max: '$price' },
//       },
//     },
//     {
//       $sort: { avgPrice: 1 },
//     },
//     // {
//     //   $match: { _id: { $ne: 'EASY' } },
//     // },
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       stats,
//     },
//   });
// });

// exports.getItemsWithin = catchAsync(async (req, res, next) => {
//   const { distance, latlng, unit } = req.params;
//   const [lat, lng] = latlng.split(',');

//   const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

//   if (!lat || !lng) {
//     next(
//       new AppError(
//         'Please provide latitutr and longitude in the format lat,lng.',
//         400
//       )
//     );
//   }

//   const tours = await Item.find({
//     startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
//   });

//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       data: tours,
//     },
//   });
// });
