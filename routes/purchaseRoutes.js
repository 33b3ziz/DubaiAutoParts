const express = require('express');
const purchaseController = require('../controllers/purchaseController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// router.use(authController.restrictTo('admin', 'lead-guide'));
router.use(authController.protect);

router.route('/last').get(purchaseController.readNumOfLastInvoice);

router.route('/invoice').post(purchaseController.createInvoice);

router.route('/invoice/:invoiceNumber').get(purchaseController.readInvoice);

router.route('/:from/:to').get(purchaseController.readAllInvoices);

module.exports = router;

// router
//   .route('/tours-within/:distance/center/:latlng/unit/:unit')
//   .get(expenseController.getToursWithin);
