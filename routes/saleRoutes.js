const express = require('express');
const saleController = require('../controllers/saleController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:tourId', saleController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(saleController.getAllBookings)
  .post(saleController.createBooking);

router
  .route('/:id')
  .get(saleController.getBooking)
  .patch(saleController.updateBooking)
  .delete(saleController.deleteBooking);

module.exports = router;
