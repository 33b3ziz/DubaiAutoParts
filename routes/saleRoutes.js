const express = require('express');
const saleController = require('../controllers/saleController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// router.use(authController.restrictTo('admin', 'lead-guide'));
router.use(authController.protect);

router.route('/last').get(saleController.readNumOfLastInvoice);

router.route('/invoice').post(saleController.createInvoice);

router
  .route('/invoice/:invoiceNumber')
  .get(saleController.readInvoice)
  .patch(saleController.updateInvoice);

router.route('/:from/:to').get(saleController.readAllInvoices);

module.exports = router;
