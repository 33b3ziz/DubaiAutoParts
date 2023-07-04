const express = require('express');
const expenseController = require('../controllers/expenseController');
const authController = require('../controllers/authController');
// const purchaseRouter = require('./purchaseRoutes');

const router = express.Router();

// router.param('id', expenseController.checkID);

// router.use('/:tourId/reviews', reviewRouter);

// router.route('/top-5-cheap');
// // .get(expenseController.aliasTopTours, expenseController.getAllTours);
// // router.route('/tour-stats').get(expenseController.getTourStats);
// router
//   .route('/monthly-plan/:year')
//   .get(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
//     expenseController.getMonthlyPlan
//   );

// router
//   .route('/tours-within/:distance/center/:latlng/unit/:unit')
//   .get(expenseController.getToursWithin);

// router
//   .route('/')
//   .get(expenseController.getAllTours)
//   .post(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
//     expenseController.createTour
//   );

// router
//   .route('/:id')
//   .get(authController.protect, expenseController.getTour)
//   .patch(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
//     expenseController.uploadTourImages,
//     expenseController.resizeTourImages,
//     expenseController.updateTour
//   )
//   .delete(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
//     expenseController.deleteTour
//   );

module.exports = router;
