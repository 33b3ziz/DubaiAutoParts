const express = require('express');
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');
// const purchaseRouter = require('./purchaseRoutes');

const router = express.Router();

// router.param('id', itemController.checkID);

// router.use('/:itemId/purchases', purchaseRouter);

router
  .route('/top-5-cheap')
  .get(itemController.aliasTopTours, itemController.getAllTours);
router.route('/item-stats').get(itemController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    itemController.getMonthlyPlan
  );

router
  .route('/items-within/:distance/center/:latlng/unit/:unit')
  .get(itemController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(itemController.getDistances);

router
  .route('/')
  .get(itemController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    itemController.createTour
  );

router
  .route('/:id')
  .get(authController.protect, itemController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    itemController.uploadTourImages,
    itemController.resizeTourImages,
    itemController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    itemController.deleteTour
  );

module.exports = router;
