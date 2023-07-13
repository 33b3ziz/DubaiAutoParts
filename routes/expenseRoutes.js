const express = require('express');
const expenseController = require('../controllers/expenseController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// router.use(authController.restrictTo('admin', 'lead-guide'));
router.use(authController.protect);

router.route('/last').get(expenseController.readNumOfLastInvoice);

router.route('/invoice').post(expenseController.createInvoice);

router.route('/invoice/:invoiceNumber').get(expenseController.readInvoice);

router.route('/:from/:to').get(expenseController.readAllInvoices);

module.exports = router;
