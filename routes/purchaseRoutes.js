const express = require('express');
const purchaseController = require('../controllers/purchaseController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

// router
//   .route('/')
//   .get(purchaseController.getAllReviews)
//   .post(
//     authController.restrictTo('user'),
//     purchaseController.setTourUserIds,
//     purchaseController.createReview
//   );

// router
//   .route('/:id')
//   .get(purchaseController.getReview)
//   .patch(
//     authController.restrictTo('user', 'admin'),
//     purchaseController.updateReview
//   )
//   .delete(
//     authController.restrictTo('user', 'admin'),
//     purchaseController.deleteReview
//   );

module.exports = router;
